# ADR 002: PostgreSQL with Neon

## Status
Accepted

## Context
The application needs persistent storage for customers, invoices, revenue, and users. The existing implementation uses PostgreSQL with a Neon database connection.

## Options
1. PostgreSQL hosted on Neon
2. PostgreSQL hosted on Supabase
3. SQLite

## Decision
Continue using PostgreSQL hosted on Neon.

## Consequences
- Relational tables support invoice and customer data.
- SQL queries are managed through app/lib/data.ts.
- Database credentials must remain in environment variables.
- Database migrations and backup procedures must be maintained.
