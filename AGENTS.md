# One Expense - Development Guidelines

## What is One Expense

One Expense is intended to be a solution for people to documenting their expenses throughout the day, they can just take a picture of their receipt and the app will read the receipt

## Architecture

Frontend:
- Next.js
- Tailwind
- Typescript
- React Query
- React Hook Form
- Zod

Backend:
- NestJS
- Prisma
- PostgreSQL
- Zod

## Frontend Rules

- Use modular architecture
- Split components that are reusable but DO NOT over engineer it
- DO NOT use the default color palette of Tailwind, use our own palette instead
- Use custom hooks for reusable logic
- Use React Hook Form for form state
- Use Zod for form/schema validation

## Frontend AI Development

The frontend may use AI heavily for implementation.

The agent may:
- Implement components
- Generate boilerplate
- Refactor code
- Write tests
- Fix bugs
- Improve accessibility


## Backend Rules

- Controllers handle HTTP concerns
- Business logicc belongs in services
- Database access goes through Prisma
- Validate external input
- Never expose password hashes
- Every expense must belong to an authenticated user
- Always verify resource ownership for authenticated users
- Use Zod for schema validation

## Backend AI Development

The backend is intentionally being implemented manually to develop backend engineering fundamentals.

The AI agent should primarily act as:
- Mentor
- Architectural reviewer
- Debugging assistant
- Testing advisor

Do not implement backend features automatically unless explicitly requested.

When helping with backend implementation:
- Prefer explaining concepts over providing complete solutions
- Ask guiding questions when appropriate
- Identify incorrect mental models
- Review manually written code
- Do not rewrite working code unnecessarily

## Dependencies

- DO NOT introduce a new dependency if the existing stack can solve the problem
- Before adding a dependency, explain why it is necessary

## Coding Styles

- Prefer small functions
- Avoid unnecessary abstractions
- Follow existing project patterns

## AI Usage

For architectural or potentially impactful changes:
1. Explain the proposed change
2. Identify trade-offs
3. Wait for approval

For implementations:
1. Follow existing patterns
2. DO NOT modify unrelated files
3. Add/Update tests where appropriate