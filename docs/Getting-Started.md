# Getting Started with SoftStacker

This guide will help you set up SoftStacker for local development and understand its basic concepts.

## Prerequisites

- Node.js 20.x or later
- npm or yarn
- Git
- GitHub account (for authentication)
- Supabase account (for database)

## Local Development Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/BytexGrid/SoftStacker.git
   cd SoftStacker/softstacker
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the `softstacker` directory with the following variables:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   GITHUB_ID=your-github-oauth-client-id
   GITHUB_SECRET=your-github-oauth-secret
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Visit [http://localhost:3000](http://localhost:3000) in your browser

## Setting Up Authentication

1. Create a GitHub OAuth App:
   - Go to GitHub Developer Settings
   - Create a new OAuth App
   - Set the callback URL to `http://localhost:3000/api/auth/callback/github`
   - Copy the Client ID and Client Secret

2. Configure Supabase:
   - Create a new Supabase project
   - Enable GitHub Auth in Authentication settings
   - Add the GitHub OAuth credentials
   - Copy the project URL and anon key

## Basic Usage

### Browsing Templates
- Visit the homepage to see featured templates
- Use the OS-specific pages to find templates for your system
- Filter templates by category or search by keywords

### Creating Templates
1. Sign in with your GitHub account
2. Click "Submit Template" in the navigation
3. Fill in the template details:
   - Title and description
   - Target operating system
   - Required and optional applications
   - Package manager information

### Using Templates
1. Browse to a template you want to use
2. Review the included applications
3. Click "Install" to get package manager commands
4. Follow the installation instructions

## Next Steps

- Read the [User Guide](User-Guide) for detailed feature explanations
- Check out the [Developer Guide](Developer-Guide) to understand the codebase
- Visit [Contributing Guide](Contributing-Guide) to learn how to contribute 