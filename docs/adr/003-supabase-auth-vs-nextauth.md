# ADR 003: Supabase Auth vs NextAuth

## Status
Proposed - requires confirmation

## Context
The project contains Supabase Auth integration in proxy.ts and Supabase client utilities. Legacy NextAuth configuration also exists in auth.ts and auth.config.ts.

## Options
1. Supabase Auth
2. NextAuth / Auth.js

## Proposed Decision
Use Supabase Auth as the primary authentication system, subject to verification of all login and logout flows.

## Consequences
- Dashboard routes can be protected using Supabase sessions.
- Authentication logic should use one consistent system.
- Legacy NextAuth code should be reviewed before removal.
- Authentication and authorization must be tested before production changes.
