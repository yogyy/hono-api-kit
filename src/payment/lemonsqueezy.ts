import { Hono } from "hono"
import { user } from "../db/schema"
import { db } from "../auth"
import { eq } from "drizzle-orm"

import type{ Subscription, WebhookPayload, DiscriminatedWebhookPayload } from "./types"
import type { User, Session } from "../db/schema";

export const paymentRouter = new Hono<{ Bindings: Env, Variables: {
    user: User,
    session: Session
} }>()

const SUPPORTED_EVENTS = [
    'subscription_created',
    'subscription_updated', 
    'subscription_cancelled',
    'subscription_expired'
]

const verifySignature = async (secret: string, signature: string, body: string) => {
    const encoder = new TextEncoder();
  
    const key = await crypto.subtle.importKey(
      'raw',
      encoder.encode(secret),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['sign', 'verify']
    );
  
    const hmac = await crypto.subtle.sign(
      'HMAC',
      key,
      encoder.encode(body)
    );
  
    const expectedSignature = Array.from(new Uint8Array(hmac))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');

      if (signature !== expectedSignature) {
        return false
      }

      return true
}

const updateUserSubscription = async (env: Env, userId: string, subscriptionId: string | null) => {
    await db(env).update(user)
        .set({ subscriptionId })
        .where(eq(user.id, userId))
}

paymentRouter.post("/webhook", async (c) => {
    if (c.req.method !== "POST") {
        return c.json({ error: "Method not allowed" }, 405)
    }

    const secret = c.env.SECRET
    const signature = c.req.header("x-signature")


    if (!signature || !secret) {
        return c.json({ error: "Unauthorized" }, 401)
    }

    const body = await c.req.text()
    
    const isValid = await verifySignature(secret, signature, body)

    if (!isValid) {
        return c.json({ error: "Unauthorized" }, 401)
    }

    const payload = JSON.parse(body) as DiscriminatedWebhookPayload<{email: string}>
    const { event_name: eventName } = payload.meta


    if (!SUPPORTED_EVENTS.includes(eventName)) {
        return c.json({ error: "Event not supported" }, 400)
    }

    if (!payload.data.attributes.user_email) {
        return c.json({ error: "Email not found" }, 400)
    }

    const users = await db(c.env)
        .select()
        .from(user)
        .where(eq(user.email, payload.data.attributes.user_email))
    
    if (!users.length) {
        return c.json({ error: "User not found" }, 404)
    }

    const isSubscriptionActive = ['subscription_created', 'subscription_updated'].includes(eventName)
    await updateUserSubscription(
        c.env,
        users[0].id,
        isSubscriptionActive ? payload.data.id : null
    )

    console.log('Webhook processed successfully')
    return c.json({ message: "Webhook received" }, 200)
})