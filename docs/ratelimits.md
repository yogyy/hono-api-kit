## Changing ratelimits

Ratelimits are set in [`src/middleware/rateLimit.ts`](/src/middleware/rateLimit.ts)

To edit them, simply change the `getTierLimit` function in the ratelimit middleware.

```ts
export const getTierLimit = async (user: User) => {
	if (!user?.subscriptionId) {
		return { limit: 100, window: 60 * 60 }; // Free tier
	}
	return { limit: 1000, window: 60 * 60 }; // Paid tier
};
```

All the `window` values are in seconds.

We are using D1 with custom logic to ratelimit the requests. The schema can be found here - [`src/db/schema.ts`](/src/db/schema.ts)

```ts
export const rateLimit = sqliteTable("rateLimit", {
  id: text("id").primaryKey(),
  userId: text("userId").notNull().references(() => user.id),
  endpoint: text("endpoint").notNull(),
  count: integer("count").notNull().default(0),
  resetAt: integer("resetAt", { mode: "timestamp" }).notNull(),
  createdAt: integer("createdAt", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updatedAt", { mode: "timestamp" }).notNull()
});
```