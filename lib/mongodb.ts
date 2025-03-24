// lib/mongodb.ts
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI as string;
const options = {};

// Track unique ID for each created MongoClient instance
const clientId = Math.random().toString(36).substring(2, 8);

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

// Safety check
if (!uri) {
  throw new Error('❌ Please define the MONGODB_URI environment variable');
}

// Declare the global type
declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
  var _mongoClientId: string | undefined;
}

// Development mode with HMR
if (process.env.NODE_ENV === 'development') {
  if (!globalThis._mongoClientPromise) {
    console.log(`🌱 [${clientId}] Creating NEW MongoClient instance (dev)`);
    client = new MongoClient(uri, options);
    globalThis._mongoClientPromise = client.connect();
    globalThis._mongoClientId = clientId;
  } else {
    console.log(`♻️ Reusing MongoClient [${globalThis._mongoClientId}] (dev)`);
  }
  clientPromise = globalThis._mongoClientPromise;
} else {
  // Production/serverless
  console.log(`🚀 [${clientId}] Creating MongoClient instance (prod/serverless)`);
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;
