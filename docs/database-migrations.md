# Database Migration Workflow

## Purpose
Database schema changes are stored as version-controlled SQL files in supabase/migrations.

## Development Process
1. Create a new timestamped SQL migration file for each schema change.
2. Review the SQL and test it against a separate development database.
3. Verify that existing data remains intact.
4. Commit the migration file to the feature branch.
5. Open a pull request for review.

## Preview Environment
1. Verify that Preview uses a database separate from Production.
2. Back up the Preview database before applying changes.
3. Apply the reviewed migration using an approved PostgreSQL migration tool.
4. Test the application and confirm database compatibility.

## Production Environment
1. Obtain approval after Preview testing.
2. Create or verify a recent Production database backup.
3. Apply the approved migration using the database migration tool.
4. Check application logs and verify critical functionality.
5. Follow a documented recovery procedure if problems occur.

## Initial Migration
The file 20261026_initial_schema.sql describes the initial schema based on app/seed/route.ts. It has not been applied or verified against the live database.

## Safety
Never run unreviewed migrations against Production. Never commit database passwords or environment files. Record which migrations have been applied to each environment.
