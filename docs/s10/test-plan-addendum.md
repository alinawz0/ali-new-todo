# S10 – Feature Test Plan Addendum

**Status:** Template; no feature tests have been run for S10.

## Scope
Define the feature's approved acceptance criteria and map each to tests.

| Acceptance criterion | Unit | API/integration | E2E | Manual | Result |
|---|---|---|---|---|---|
| To be confirmed by teacher | TBD | TBD | TBD | TBD | Not run |

## Test environment
Use isolated test database and test users. Do not run destructive tests on production. Record deployment URL and database isolation evidence before executing.

## Entry criteria
- Teacher brief and user stories approved
- Design note and OpenAPI changes reviewed
- Test data and test environment prepared
- Security and migration risks assessed

## Exit criteria
- All feature unit, API and E2E tests passing in CI
- Authorization, invalid input, and error cases verified
- Accessibility and regression checks completed
- Reviewer approval and production deployment confirmed
- Teacher/customer acceptance recorded

## Risks
Cross-user access, migration safety, environment isolation, broken existing invoice/customer flows, incomplete E2E coverage.

## Evidence
Link actual test run IDs, coverage reports, screenshots, and defects here; never claim tests passed without execution evidence.
