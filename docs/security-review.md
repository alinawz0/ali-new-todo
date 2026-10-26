# Security Review

**Review date:** 26 October 2026
**Scope:** Next.js routes, Server Actions, authentication, redirects, and database access.

## Summary

Authentication checks were added to the reviewed data endpoints and six data-changing Server Actions. The authentication callback redirect was restricted to the same origin. A production guard was added to the database seed endpoint. The production build passed, and unauthenticated requests to `/query` and `/seed` returned HTTP 401 in the tested environment.

The review remains incomplete because database permissions, authenticated-user authorization boundaries, redirect behavior, secret history, and production behavior have not been fully verified.

## Findings

### SEC-01: Invoice data endpoint
- **Severity:** High
- **File:** `app/query/route.ts`
- **Risk:** Invoice amounts and customer names could be returned without verifying the current user.
- **Fix:** Added Supabase `auth.getUser()` verification. Unauthenticated requests receive HTTP 401.
- **Status:** Code updated; unauthenticated runtime test passed.

### SEC-02: Database seed endpoint
- **Severity:** High
- **File:** `app/seed/route.ts`
- **Risk:** A GET request could trigger table creation and sample-data inserts without appropriate restrictions.
- **Fix:** Added a production guard that returns HTTP 404 when `NODE_ENV` is `production`. Added Supabase `auth.getUser()` verification, returning HTTP 401 for unauthenticated requests.
- **Remaining concern:** The route still performs database writes through GET in non-production environments. Keep it restricted to a controlled development workflow. Authentication alone does not establish administrator authorization.
- **Status:** Production guard and authentication checks are present in local code. The production response has not been verified. The earlier unauthenticated runtime test returned HTTP 401 in the tested environment.

### SEC-03: Data-changing Server Actions
- **Severity:** High
- **File:** `app/lib/actions.ts`
- **Risk:** Invoice and customer mutations lacked explicit authentication checks.
- **Fix:** Added a shared `requireAuthenticatedUser()` helper to create, update, and delete actions for invoices and customers.
- **Status:** Code updated; production build passed. Runtime tests for unauthenticated mutations and authorization boundaries remain outstanding.

### SEC-04: Application database role privileges
- **Severity:** High (provisional; impact needs further assessment)
- **Files:** `app/seed/route.ts`, `app/query/route.ts`, `app/lib/actions.ts`
- **Evidence:** The configured `POSTGRES_URL` uses the `neondb_owner` role. Inspection indicated that this role has database-creation and role-creation capabilities.
- **Risk:** A compromised application endpoint could have a greater impact when connected with a broadly privileged database role.
- **Recommendation:** Assess a dedicated least-privilege application role and test required permissions before changing production credentials.
- **Status:** Identified; remediation pending.

### SEC-05: Authentication callback redirect
- **File:** `app/auth/callback/route.ts`
- **Risk:** An unvalidated `next` parameter could potentially redirect users to an external URL after authentication.
- **Fix:** Validate the resolved redirect URL's origin and fall back to `/dashboard` when the origin differs.
- **Status:** Code updated; production build passed. A dedicated redirect behavior test remains outstanding.

## Checks Still Required

- Verify effective Neon database privileges and assess a least-privilege application role.
- Separately verify Supabase Row Level Security (RLS) for data accessed through Supabase. RLS does not automatically protect queries made directly to Neon.
- Review all API routes and Server Actions for authentication and authorization.
- Test unauthenticated mutations, cross-user access, and redirect behavior.
- Review Git history for accidentally committed secrets. Current Git tracking status alone does not establish that secrets were never committed.
- Add automated security tests.
- Confirm the production deployment contains the reviewed security changes.
- Verify that the `/seed` endpoint returns HTTP 404 in production without triggering database writes.

## Runtime Test Results

**Test date:** 22 October 2026

| Test | Expected result | Actual result | Status |
|---|---|---|---|
| Unauthenticated GET `/query` | HTTP 401 | HTTP 401 Unauthorized | PASS |
| Unauthenticated GET `/seed` | HTTP 401 in the tested environment | HTTP 401 Unauthorized | PASS |
| Production GET `/seed` | HTTP 404, with no database writes | Not yet tested | PENDING |

## Build Verification

**Verification date:** 26 October 2026

- `pnpm build`: PASS
- Next.js compilation: successful
- TypeScript checks: successful
- Route generation: successful
- Outdated browser-data warnings were reported; they did not prevent the build from completing.

## Conclusion

**Status: Partially remediated; review incomplete.**

The reviewed authentication checks and callback redirect validation have been added to local code. The unauthenticated endpoint tests passed in the tested environment, and the production build succeeded. The seed endpoint also has a production guard in local code.

These results do not establish that the changes are deployed or that the application has full security approval. Outstanding authorization, database-permission, redirect, secret-history, and production checks must be completed before the review can be considered complete.

## Follow-up Changes (26 October 2026)
- The `/seed` HTTP route has been disabled and returns HTTP 404. This replaces the earlier non-production seeding behavior described above. Deployment and runtime verification remain pending.
- `deleteCustomer` now accepts the `useActionState` previous-state and form-data arguments. Type-check and runtime verification remain pending.
- These updates are committed only to the S2 pull-request branch; Production has not been changed.
