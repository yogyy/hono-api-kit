## Backend API kit

Easily create scalable, monetisable backend APIs with Hono + Cloudflare workers

Why?
While buildling [supermemory](https://api.supermemory.ai), [markdowner](https://md.dhr.wtf), [reranker](https://reranker.dhr.wtf), i found myself solving all the same problems again and again - there's a lot of starter kits for frontend / full stack stuff, but almost none if you just want to build and monetise a small API.

## Features
- API Key provisioning
- Rate Limiting
- Authentication with [better-auth](https://better-auth.com) (both session based and Bearer token based)
- Database with [Drizzle](https://orm.drizzle.team) + [Cloudflare D1](https://developers.cloudflare.com/d1)
- Subscriptions with [Lemonsqueezy](https://www.lemonsqueezy.com)
- Landing page for API
- Linting with [Biome](https://biomejs.dev)
- Integration tests with [Vitest](https://vitest.dev)
- and more...

## Getting set up

### Quick Setup

1. Clone & set up the repo
```bash
git clone https://github.com/dhravya/backend-api-kit.git
cd backend-api-kit
npm i -g bun
bun install
```

2. Run the setup script
```bash
bun run setup
```

The setup script will:
- Create a D1 database and configure it in `wrangler.jsonc`
- Set up environment variables in `.dev.vars`
- Run database migrations
- Optionally deploy the worker

[See guide for setting up lemonsqueezy](docs/lemonsqueezy.md)

[How to make changes to database schema](docs/drizzle.md)

[Writing and running tests](docs/tests.md)

[Changing ratelimits](docs/ratelimits.md)

If the quick setup script fails, you can [manually set up](#manual-setup) the database and environment variables.


## Development

Start the development server:
```bash
bun run dev
```

Now, write your business logic inside [api](src/api.ts) 

Congrats! You're all set for shipping your backend API!


### Manual Setup

1. Clone & set up the repo
```bash
git clone https://github.com/dhravya/backend-api-kit.git
cd backend-api-kit
npm i -g bun
bun install
```

2. Create a D1 database
```bash
bunx wrangler d1 create <your-database-name>
```

3. Update `wrangler.jsonc` with your database configuration
```jsonc
{
  // ... other config
  "d1_databases": [
    {
      "binding": "DATABASE",
      "database_name": "<your-database-name>",
      "database_id": "<your-database-id>",
      "migrations_dir": "./drizzle"
    }
  ]
}
```

4. Set up environment variables
- Copy `.dev.vars.example` to `.dev.vars`
- Fill in the required environment variables:
  - `AUTH_GITHUB_ID` and `AUTH_GITHUB_SECRET`: GitHub OAuth credentials
  - `BETTER_AUTH_URL`: Your auth URL (default: http://localhost:8787)
  - `SECRET`: A secure random string
  - `LEMONSQUEEZY_CHECKOUT_LINK`: Your Lemonsqueezy checkout link

5. Run database migrations
```bash
bunx drizzle-kit generate --name setup
bunx wrangler d1 migrations apply <your-database-name>
bunx wrangler d1 migrations apply <your-database-name> --remote
```

6. Deploy (optional)
```bash
bunx wrangler deploy
```

## License

This project is open-sourced under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contributing

Contributions are welcome! Please feel free to submit a PR.

These are some things that contributions would be helpful for:
- Adding or improving documentation
- Adding or improving tests
- More configurations (for eg, adding more auth providers, payment providers, database providers, etc)
- Usage based pricing

## Acknowledgements 

This project is built thanks to these open source projects 🙏:

- [better-auth](https://better-auth.com) for authentication
- [Drizzle](https://orm.drizzle.team) for database
- [Hono](https://hono.dev) for the web framework
- [Vitest](https://vitest.dev) for testing
- [Biome](https://biomejs.dev) for linting
