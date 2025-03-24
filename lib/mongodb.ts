// lib/mongodb.ts
import { MongoClient } from 'mongodb';

if (!process.env.MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

const uri = process.env.MONGODB_URI;
const options = {
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

// Use cached connection in dev mode to support HMR
declare global {
  var _mongoClientPromise: Promise<MongoClient>;
}

if (process.env.NODE_ENV === 'development') {
  if (!globalThis._mongoClientPromise) {
    console.log('🌱 New MongoDB client created (dev)');
    client = new MongoClient(uri, options);
    globalThis._mongoClientPromise = client.connect();
  } else {
    console.log('✅ Reusing existing MongoDB client (dev)');
  }
  clientPromise = globalThis._mongoClientPromise;
} else {
  console.log('🚀 Creating MongoDB client (prod/serverless)');
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

// Handle connection errors
clientPromise.catch((error) => {
  console.error('MongoDB connection error:', error);
});

export default clientPromise;
