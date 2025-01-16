# API Documentation

This document outlines the available API endpoints in SoftStacker.

## Authentication

All authenticated endpoints require a valid session cookie obtained through GitHub OAuth.

## Templates

### Get Templates
```http
GET /api/templates
```

Query Parameters:
- `os` (string): Filter by operating system (windows, macos, linux)
- `category` (string): Filter by category
- `search` (string): Search templates by title or description

Response:
```json
[
  {
    "id": "string",
    "title": "string",
    "description": "string",
    "category": "string",
    "target_os": "string",
    "apps": Array,
    "votes": number,
    "author_name": "string",
    "author_avatar": "string"
  }
]
```

### Get Template by ID
```http
GET /api/templates/{id}
```

Response: Single template object

### Create Template
```http
POST /api/templates
```

Request Body:
```json
{
  "title": "string",
  "description": "string",
  "category": "string",
  "target_os": "string",
  "apps": [
    {
      "name": "string",
      "description": "string",
      "website": "string",
      "category": "string",
      "isRequired": boolean,
      "packageName": "string"
    }
  ]
}
```

### Save Draft
```http
POST /api/templates/draft
```

Request Body: Same as Create Template

### Load Draft
```http
GET /api/templates/draft
```

## Voting System

### Get Vote Status
```http
GET /api/templates/{id}/vote/check
```

Response:
```json
{
  "voteType": "up" | "down" | null,
  "votes": number
}
```

### Cast Vote
```http
POST /api/templates/{id}/vote
```

Request Body:
```json
{
  "voteType": "up" | "down"
}
```

Response:
```json
{
  "message": "Vote added" | "Vote updated" | "Vote removed",
  "votes": number
}
```

## User Management

### Get User Profile
```http
GET /api/user/profile
```

Response:
```json
{
  "id": "string",
  "name": "string",
  "email": "string",
  "avatar_url": "string"
}
```

### Get User Analytics
```http
GET /api/user/analytics
```

Response:
```json
{
  "total_templates": number,
  "total_votes_received": number,
  "most_popular_template": Template
}
```

### Delete User Data
```http
DELETE /api/user/data
```

Response:
```json
{
  "message": "User data deleted successfully"
}
```

## Error Responses

All endpoints may return the following error responses:

- 400 Bad Request: Invalid input
- 401 Unauthorized: Authentication required
- 403 Forbidden: Insufficient permissions
- 404 Not Found: Resource not found
- 500 Internal Server Error: Server error

Error Response Format:
```json
{
  "error": "Error message"
}
``` 