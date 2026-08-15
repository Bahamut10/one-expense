# Database

## Database of Choice

PostgreSQL

## ORM

Prisma

## Entities

### User

Fields:
- id (required)
- email (required)
- name (optional)
- passwordHash (required)
- createdAt (required)
- updatedAt (required)

### Category

Fields:
- id (required)
- name (required)
- userId (required)
- createdAt (required)
- updatedAt (required)

### Expense

Fields:
- id (required)
- date (required)
- amount (required)
- description (required)
- receiptUrl (optional)
- userId (required)
- categoryId (required)
- createdAt (required)
- updatedAt (required)

## Relationships

1 user <-> many expenses
1 user <-> many categories
1 category <-> many expense
