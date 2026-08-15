# One Expense

One Expense is an AI-powered expense tracking application
that helps users record, organize, and understand their
personal expenses.

## Problem

Manually recording expenses is tedious, especially when
users have to enter information from receipts.

One Expense aims to make expense tracking faster by allowing
users to capture receipt information and automatically
extract relevant expense data.

## Core Features

- User authentication
- Create, view, update, and delete expenses
- Expense categorization
- Receipt upload
- OCR-based receipt text extraction
- AI-powered expense information extraction
- Expense dashboard and summaries

## How It Works

A user can manually create an expense or upload a receipt.

For a receipt:

Receipt image\
    ↓\
OCR\
    ↓\
Extracted text\
    ↓\
AI processing\
    ↓\
Structured expense data\
    ↓\
User confirmation\
    ↓\
Expense saved

## Tech Stack

### Frontend

- Next.js
- TypeScript
- Tailwind CSS
- React Query
- React Hook Form
- Zod

### Backend

- NestJS
- Prisma
- PostgreSQL

## Project Structure

frontend/   → Next.js application\
backend/    → NestJS API\
docs/       → Architecture and engineering documentation\
agent/      → AI Agent related config, including skills

<!-- ## Development

[setup instructions will go here] -->

## AI-Assisted Development

This project uses AI coding agents as part of the
development workflow.

AI is used for implementation assistance, code review,
debugging, testing, and architectural discussion while
the final engineering decisions remain human-owned.