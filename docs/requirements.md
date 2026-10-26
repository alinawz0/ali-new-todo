# Requirements – Dashboard App

Status: working inventory, 26 October 2026. Implementation and deployment details must be confirmed against the reviewed release before being marked accepted.

## Functional requirements

| ID | Requirement | Evidence / verification |
|---|---|---|
| FR-01 | Users can sign in and sign out. | Authentication implemented; preview sign-in reported working; full auth regression tests outstanding. |
| FR-02 | Unauthenticated visitors cannot access protected dashboard pages. | Route protection present; automated redirect/security verification outstanding. |
| FR-03 | Users can list, search and view invoices. | Existing dashboard feature; E2E test coverage outstanding. |
| FR-04 | Users can create, edit and delete invoices through server-side actions. | S0 task marked complete; regression tests outstanding. |
| FR-05 | Invoice forms validate input and show accessible field errors. | S0 task marked complete; dedicated schema/a11y tests outstanding. |
| FR-06 | Invalid invoice IDs show a friendly not-found page and route errors are handled. | S0 task marked complete; automated tests outstanding. |
| FR-07 | Users can view and search customers. | Customer interface exists; E2E verification outstanding. |
| FR-08 | Users can delete a customer without invoices; a customer with invoices receives an explanatory error. | Fix implemented on feature branch and deployed to Preview; not merged into main. |
| FR-09 | The application has descriptive page metadata and titles. | S0 task marked complete. |
| FR-10 | Application can be deployed to Vercel. | Production URL and working Preview deployment exist. |

## Non-functional requirements

| ID | Quality attribute | Requirement | Verification plan |
|---|---|---|---|
| NFR-01 | Performance | Dashboard pages should remain responsive on normal desktop and mobile connections. | Measure key routes with Lighthouse; agree numerical budgets with customer. |
| NFR-02 | Accessibility | Forms and actions must be keyboard-operable, labeled and provide perceivable errors. | ESLint a11y rules, axe/Playwright, manual keyboard test. |
| NFR-03 | Security | Protected pages, mutations and APIs must authorize access; credentials never enter client bundles or Git history. | Auth/authorization tests and security review. |
| NFR-04 | Data protection | Use isolated test data and do not log personal or secret values; production data must not be used for destructive tests. | Environment review and log audit. |
| NFR-05 | Usability | Error states must be actionable; confirmation is required for destructive customer actions. | Manual exploratory tests and customer feedback. |

## Known gaps and risks

1. Team review partner, PR approvals and required branch-protection checks have not been confirmed.
2. Some documentation and CI changes exist only on unmerged branches.
3. Automated unit, API and E2E suites required by later sprints are not complete; the existing Node test runner is not Vitest.
4. Preview versus production database isolation requires explicit confirmation before migration or destructive tests.
5. Authentication/authorization regression and cross-user access tests remain outstanding.
6. Customer deletion change remains on a feature branch pending review and merge.
7. New feature requirements from the teacher/customer brief are not yet available; do not invent acceptance criteria.

## Acceptance

This document is a baseline for discussion, not customer approval. Have a review partner verify it against the current code and teacher brief before merging.
