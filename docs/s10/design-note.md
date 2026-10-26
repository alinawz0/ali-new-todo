# S10 – Näyttö Feature Design Note

**Status:** Preparation only. Teacher's feature brief has not been provided; no feature design or implementation is approved.

## Customer brief and clarifying questions
Record the teacher's exact brief here. Before coding, ask:
1. Who will use the feature, and what problem must it solve?
2. What are the required user actions and expected results?
3. What are the authorization and privacy rules?
4. What should happen on invalid input, missing records, or errors?
5. What existing pages or API clients must remain compatible?
6. How will the customer accept the feature?

## User stories and acceptance criteria
For each confirmed story:
- As a [role], I want [capability], so that [value].
- Given [starting state], when [action], then [observable outcome].
- Estimate: [hours after clarification]; actual: [tracked hours].

## Design impact matrix
| Layer | Expected decision | Status |
|---|---|---|
| Client UI | Pages, forms, accessible interactions | TBD after brief |
| Server Components | Data fetching and rendering | TBD |
| Server Actions / API | Authenticated mutations and route handlers | TBD |
| Data layer | Queries and ownership checks | TBD |
| Database | Migration and rollback, if schema changes | TBD |
| Security | Authentication, authorization, validation | TBD |
| Lifecycle | Backups, monitoring, updates, retirement | TBD |

## Architecture decision
Add an ADR if the feature requires a material technical choice. Record context, alternatives, decision, and consequences.

## Release gates
No production migration, deployment or customer acceptance claim before the feature brief, reviewed API spec, green tests, approved PR and real customer demo.
