# Next.js + MongoDB GlobalThis Demo

This demo shows how to persist a MongoDB connection across API routes in Next.js using `globalThis` to prevent connection overloads — especially important in serverless environments like Vercel.

## 🔧 Setup

1. Clone this repo
2. Add `.env.local` with your MongoDB URI
3. Run the app:

```bash
npm install
npm run dev

# globalThisExampleNext
