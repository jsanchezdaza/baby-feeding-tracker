# Development Guidelines

## Package Management
- **Always use `pnpm` instead of `npm`** for all package operations
- Install dependencies: `pnpm install`
- Add packages: `pnpm add <package>`
- Run scripts: `pnpm run <script>`

## Development Methodology
- **Pair Programming with TDD (Test-Driven Development)**
  - Write tests first, then implement code
  - Work in pairs to ensure code quality and knowledge sharing
  - Follow Red-Green-Refactor cycle

## Software Engineering Practices
- **Lean Development Principles**
  - Eliminate waste
  - Build quality in
  - Create knowledge
  - Defer commitment
  - Deliver fast
  - Respect people
  - Optimize the whole

- **Extreme Programming (XP) Practices**
  - Simple design
  - Refactoring
  - Collective code ownership
  - Continuous integration
  - Small releases
  - Sustainable pace

## Code Quality & Review Process
- **Pull Request (PR) Code Review**
  - All code changes must go through PR review
  - At least one approval required before merging
  - Review for code quality, test coverage, and adherence to guidelines

## Testing & Commits
- **Tests must pass before commits**
  - Run full test suite before committing
  - No exceptions - failing tests block commits
  - Maintain high test coverage
  - Tests should be fast and reliable

- **Commit Message Guidelines**
  - Use clear, descriptive commit messages
  - Follow conventional commit format when possible
  - Do NOT include AI assistant references (Claude, Co-Authored-By, etc.) unless explicitly requested
  - Keep commit messages professional and focused on the change

## Workflow Summary
1. Write failing test (Red)
2. Implement minimal code to pass (Green)
3. Refactor and improve (Refactor)
4. Ensure all tests pass
5. Create PR for code review
6. Merge only after approval and passing tests