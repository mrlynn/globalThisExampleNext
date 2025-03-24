#  Next.js + MongoDB + globalThis Demo

This is a **Next.js demo app** that connects to MongoDB using the native driver and caches the connection using `globalThis` — perfect for avoiding **connection overloads in serverless environments like Vercel**.

> ✅ Built for developers hitting the "too many connections" issue when deploying MongoDB-backed apps on Next.js.

---

## Features

- Uses `globalThis` to cache MongoDB connections across function invocations
- Prevents re-connecting on every API call
- Great for local dev with hot module reloading (HMR)
- Vercel-ready — handles cold starts and minimizes connection bursts

---

##  Setup

### 1. Clone the repo

```bash
git clone https://github.com/your-username/next-mongo-globalthis-demo.git
cd next-mongo-globalthis-demo
```

### 2. Add your MongoDB URI
Create a .env.local file:

```bash
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/<dbname>?retryWrites=true&w=majority&maxPoolSize=10
```

### 3. Install dependencies

```bash
npm install
```

### 4. Run locally

```bash
npm run dev
```

### 5. Test the Connection

Visit:

```bash
http://localhost:3000/api/ping
```

And check your terminal logs — you should see one of:

```bash
🌱 New MongoDB client created (dev)
✅ Reusing existing MongoDB client (dev)
```


### 6. Deploy to Vercel
1. Push your project to GitHub
    
2. Import it to Vercel
    
3. Add your `MONGODB_URI` in Vercel's **Environment Variables** settings
    
4. Deploy!
    

### 🔍 Validate in Vercel

You can view your function logs in the Vercel dashboard (under Functions > Logs) to confirm caching behavior:

- Cold start logs will show: `🚀 Creating MongoDB client (prod/serverless)`
    
- Reused logs may not show anything (depending on platform re-use)

## Why use `globalThis`?

`globalThis` is the modern, cross-platform way to store and reuse variables across:

- Browser vs Node.js
- Serverless cold vs warm starts
- Local dev with hot reload

It ensures the MongoDB connection (or promise) sticks around **as long as the instance lives**, preventing new connections on every API hit.