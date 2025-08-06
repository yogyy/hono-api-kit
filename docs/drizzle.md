## How to make changes to database schema

1. Make changes to the schema in `src/db/schema.ts`
2. Run `npx drizzle-kit generate` to generate the migration
3. Run `npx drizzle-kit migrate` to apply the migration
4. Run `npx drizzle-kit push` to push the migration to the database

For making changes to the prod database, you will need to change the NODE_ENV in `.env` to `production` and run `npx drizzle-kit migrate` or push the migration.

To learn more about Drizzle, see the [Drizzle docs](https://orm.drizzle.team/docs/introduction)