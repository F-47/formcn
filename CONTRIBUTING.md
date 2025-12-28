# Contributing to formcn

Thank you for your interest in contributing to formcn! This document provides guidelines and instructions for contributing to the project.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Project Structure](#project-structure)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Testing](#testing)
- [Submitting Changes](#submitting-changes)
- [Commit Message Guidelines](#commit-message-guidelines)
- [Areas for Contribution](#areas-for-contribution)

## Code of Conduct

By participating in this project, you agree to maintain a respectful and inclusive environment for all contributors.

## Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/formcn.git
   cd formcn
   ```
3. **Add the upstream repository**:
   ```bash
   git remote add upstream https://github.com/F-47/formcn.git
   ```

## Development Setup

### Prerequisites

- Node.js 18 or higher
- npm or yarn package manager
- Git

### Installation

1. Install dependencies:

   ```bash
   npm install
   ```

2. Link the package locally for testing:

   ```bash
   npm link
   ```

3. Test the CLI locally:

   ```bash
   formcn
   ```

   Or run directly:

   ```bash
   node bin/index.js
   ```

### Project Structure

```
formcn/
├── bin/
│   └── index.js              # CLI entry point
├── generators/
│   ├── form-generator.js     # Single-step form generation
│   ├── multi-form-generator.js # Multi-step form generation
│   ├── schema-generator.js   # Zod schema generation
│   └── form-ui-templates.js  # UI component templates
├── utils/
│   ├── ensurePackages.js     # Dependency checking
│   ├── lib.js                # Utility functions
│   ├── prompts.js            # CLI prompts
│   ├── tailwind-presets.js   # Style presets
│   ├── templates.js          # Form templates
│   └── test.js               # Test utilities
├── package.json
└── README.md
```

### Key Components

- **Generators**: Create form components, schemas, and related files
- **Utils**: Helper functions for prompts, package detection, and templates
- **CLI**: Interactive workflow using `@clack/prompts` and `inquirer`

## Development Workflow

1. **Create a feature branch**:

   ```bash
   git checkout -b feature/your-feature-name
   ```

   Or for bug fixes:

   ```bash
   git checkout -b fix/your-bug-description
   ```

2. **Make your changes**:

   - Write clean, maintainable code
   - Follow existing code style and patterns
   - Add comments for complex logic
   - Update documentation if needed

3. **Test your changes**:

   - Test the CLI with various inputs
   - Verify generated forms work correctly
   - Test edge cases and error handling

4. **Keep your branch updated**:

   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

5. **Commit your changes** (see [Commit Message Guidelines](#commit-message-guidelines))

6. **Push to your fork**:

   ```bash
   git push origin feature/your-feature-name
   ```

7. **Open a Pull Request** on GitHub

## Coding Standards

### Code Style

- Use **ES modules** (import/export syntax)
- Follow **consistent indentation** (2 spaces)
- Use **descriptive variable names**
- Keep functions **focused and single-purpose**
- Add **JSDoc comments** for public functions

### JavaScript Conventions

- Prefer `const` over `let`, avoid `var`
- Use async/await for asynchronous operations
- Handle errors appropriately
- Use template literals for string interpolation
- Prefer arrow functions for callbacks

### File Organization

- Keep related functionality together
- Separate concerns (generators, utilities, CLI logic)
- Use meaningful file and directory names
- Export functions explicitly

### Example

```javascript
/**
 * Generates a form component with the given configuration
 * @param {string} formName - The name of the form
 * @param {Array<Object>} fields - Array of field definitions
 * @param {string} presetKey - Style preset identifier
 * @returns {Promise<void>}
 */
export async function generateForm(formName, fields, presetKey) {
  // Implementation
}
```

## Testing

Currently, the project doesn't have automated tests. When contributing:

1. **Manually test your changes** in a real React project
2. **Test various form configurations**:
   - Single-step forms
   - Multi-step forms
   - Different field types
   - Different templates and presets
3. **Test edge cases**:
   - Invalid inputs
   - Missing dependencies
   - Existing form directories
   - Various project structures

### Testing Checklist

- [ ] CLI runs without errors
- [ ] Generated forms compile in TypeScript
- [ ] Form validation works correctly
- [ ] All field types render properly
- [ ] Templates generate expected output
- [ ] Presets apply correctly
- [ ] Error messages are clear and helpful

**Note**: Adding automated tests would be a valuable contribution!

## Submitting Changes

### Pull Request Process

1. **Update documentation** if you change functionality
2. **Keep PRs focused** - one feature or fix per PR
3. **Write a clear PR description**:

   - What changes were made
   - Why they were made
   - How to test them
   - Screenshots/examples if applicable

4. **Reference issues** if your PR closes them:

   ```
   Closes #123
   ```

5. **Wait for review** - maintainers will review and may request changes

### PR Checklist

- [ ] Code follows project style guidelines
- [ ] Changes are tested
- [ ] Documentation is updated (if needed)
- [ ] Commit messages follow guidelines
- [ ] No breaking changes (or clearly documented)

## Commit Message Guidelines

Follow conventional commit format:

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

### Examples

```
feat(generators): add support for file upload fields

Adds file upload field type to the form generator with
proper Zod schema validation and shadcn/ui component integration.

Closes #45
```

```
fix(prompts): handle cancelled form name input gracefully

Prevents the CLI from crashing when users cancel the form
name prompt. Now exits cleanly with a cancellation message.
```

## Areas for Contribution

We welcome contributions in the following areas:

### Features

- New field types (file upload, color picker, etc.)
- Additional form templates
- New style presets
- Custom validation rules
- Form builder improvements

### Improvements

- Better error handling and messages
- Enhanced CLI prompts and UX
- Performance optimizations
- Code refactoring
- Documentation improvements

### Testing

- Unit tests for generators
- Integration tests for CLI workflow
- Test utilities and helpers

### Documentation

- Code comments and JSDoc
- README improvements
- Usage examples
- Tutorial guides

### Bug Fixes

- Report bugs via GitHub Issues
- Include steps to reproduce
- Provide expected vs actual behavior
- Test environment details

## Questions?

- Open an issue for bugs or feature requests
- Check existing issues before creating new ones
- Be patient and respectful in discussions

Thank you for contributing to formcn! 🎉
