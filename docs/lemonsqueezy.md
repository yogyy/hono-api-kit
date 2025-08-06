## Setting up lemonsqueezy store and webhooks

1. [Create a store](https://docs.lemonsqueezy.com/guides/getting-started) on lemonsqueezy 
2. Make sure you set up **Subscriptions** in the store

![Setting up subscriptions](https://imagedelivery.net/_Zs8NCbSWCQ8-iurXrWjBg/d997516e-bd3e-46e9-f962-15c331d85100/public)

3. Go to Settings -> Webhooks and set up a webhook, select *all events*

![Setting up webhook](https://imagedelivery.net/_Zs8NCbSWCQ8-iurXrWjBg/cd1eabd0-9981-4dfe-8ce9-2748cca76c00/public)

4. Make sure that the secret is the same as the one in your `.dev.vars` file

5. Copy the store URL and paste it in the `.env` file as `LEMONSQUEEZY_STORE_LINK`

... and you're done!