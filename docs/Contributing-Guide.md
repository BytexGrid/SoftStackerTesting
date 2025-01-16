# Contributing to SoftStacker

Thank you for your interest in contributing to SoftStacker! This guide will help you get started with contributing to the project.

## Code of Conduct

By participating in this project, you agree to abide by our Code of Conduct. Please read it before contributing.

## How Can I Contribute?

### Reporting Bugs

1. Check if the bug has already been reported in the Issues section
2. If not, create a new issue with the following information:
   - Clear title and description
   - Steps to reproduce
   - Expected behavior
   - Actual behavior
   - Screenshots if applicable
   - Your environment (OS, browser, etc.)

### Suggesting Enhancements

1. Check if the enhancement has already been suggested
2. Create a new issue with:
   - Clear title and description
   - Use case for the enhancement
   - Any potential implementation details
   - Mock-ups or examples if applicable

### Pull Requests

1. Fork the repository
2. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Make your changes following our coding standards
4. Write or update tests as needed
5. Run the test suite:
   ```bash
   npm run test
   ```
6. Commit your changes:
   ```bash
   git commit -m "feat: add amazing feature"
   ```
7. Push to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```
8. Open a Pull Request

## Development Guidelines

### Coding Standards

- Use TypeScript for all new code
- Follow the existing code style
- Use meaningful variable and function names
- Add comments for complex logic
- Keep functions small and focused

### Component Guidelines

- Use functional components with hooks
- Keep components small and reusable
- Follow atomic design principles
- Use proper TypeScript types
- Add prop validation

### Testing

- Write unit tests for utilities
- Add integration tests for API routes
- Test components using React Testing Library
- Maintain good test coverage

### Git Commit Guidelines

Follow conventional commits:
- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes
- `refactor:` Code refactoring
- `test:` Adding or updating tests
- `chore:` Maintenance tasks

### Documentation

- Update README.md if needed
- Add JSDoc comments to functions
- Update API documentation for new endpoints
- Add inline comments for complex logic

## Project Structure

```
softstacker/
├── app/              # Next.js pages and API routes
├── components/       # React components
├── lib/             # Utility functions
├── types/           # TypeScript types
└── tests/           # Test files
```

### Key Directories

- `app/`: Contains all pages and API routes
- `components/`: Reusable UI components
- `lib/`: Helper functions and utilities
- `types/`: TypeScript type definitions
- `tests/`: Test files matching the source structure

## Setting Up Development Environment

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```

3. Set up pre-commit hooks:
   ```bash
   npm run prepare
   ```

4. Start development server:
   ```bash
   npm run dev
   ```

## Need Help?

- Check the [FAQ](FAQ)
- Join our Discord community
- Read the [Developer Guide](Developer-Guide)
- Contact the maintainers

## Recognition

Contributors will be added to our Contributors list in the README.md file. 