# ADR 001: Next.js App Router

## Status
Accepted

## Context
The dashboard needs server-rendered pages, interactive forms, routing, and database access. The project currently uses Next.js App Router.

## Options
1. Next.js App Router
2. Next.js Pages Router
3. React with a separate backend

## Decision
Use Next.js App Router for the dashboard application.

## Consequences
- Server Components support server-side data fetching.
- Server Actions simplify invoice and customer operations.
- File-based routing keeps the application organized.
- Developers must understand server and client component boundaries.
