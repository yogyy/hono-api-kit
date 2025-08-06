import { Hono } from "hono";
import { authMiddleware, authRouter } from "./auth";
import type { User, Session } from "./db/schema";
import { paymentRouter } from "./payment/lemonsqueezy";
import { apiRouter } from "./api";
import { generateKey } from "./utils/key";
import { Landing } from "./ui/landing";

const app = new Hono<{
	Bindings: Env;
	Variables: {
		user: User;
		session: Session;
	};
}>()
	.use(authMiddleware)
	// main (signup) route
	.route("/", authRouter)
	// webhook handler
	.route("/", paymentRouter)
	// api routes
	.route("/api", apiRouter)
	.get("/", async (c) => {
		const user = c.get("user");

		const apiKey = await generateKey(
			user?.id,
			String(user?.lastKeyGeneratedAt?.getTime()),
			c.env.SECRET
		);

		const subscriptionLink = `${c.env.LEMONSQUEEZY_CHECKOUT_LINK}?checkout[email]=${user?.email}`;
		const subscriptionStatus = user?.subscriptionId 
			? "Premium"
			: `Free • <a href="${subscriptionLink}">Upgrade</a>`;

		return c.html(<Landing user={user} apiKey={apiKey} subscriptionLink={subscriptionLink} />);
	});

export default app;
