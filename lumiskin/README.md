# Lumiskin — personalized skincare store

A full-stack MERN starter with customer accounts, skin-profile recommendations, product catalogue, wishlist, cart, checkout/orders and admin tools.

## Requirements
- Node.js 20+ and npm
- MongoDB local instance or MongoDB Atlas database

## Run locally
1. Copy `server/.env.example` to `server/.env` and set `MONGO_URI` and a long random `JWT_SECRET`.
2. In the project root run `npm install` then `npm run install:all`.
3. Run `npm run dev`. Frontend: http://localhost:5173, API: http://localhost:5000.
4. Seed demo products and an admin account: `npm run seed --prefix server`.

Demo admin after seeding: `admin@lumiskin.in` / `LumiskinAdmin123!` — change this immediately.

## Deployment
- Deploy `server` as a Node web service (Render, Railway, etc.) and configure `MONGO_URI`, `JWT_SECRET`, `CLIENT_URL`.
- Deploy `client` as a static site (Vercel/Netlify), build command `npm run build`, output `dist`; set `VITE_API_URL` to your deployed API base URL (for example `https://your-api.example.com/api`).
- Configure CORS with the exact deployed frontend origin in `CLIENT_URL`.

## Notes
- Checkout creates real database orders; payment is configured for Cash on Delivery by default. Razorpay test integration is scaffolded and activates when `RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET` are configured. Never expose the secret in the frontend.
- Password reset issues a short-lived token. In development it is logged by the API; configure an email provider before using this flow with real customers.
- Product recommendations use product metadata (skin types, concerns and ingredients), not medical diagnosis.
