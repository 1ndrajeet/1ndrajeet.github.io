import { MongoClient, Db } from 'mongodb';

// Environment variables
const uri = process.env.DATABASE_URL;
const dbName = process.env.MONGODB_DB || 'portfolio';

if (!uri) {
  throw new Error('Please define the DATABASE_URL environment variable in .env.local');
}

// Augment global scope to include _mongoClientPromise
declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

let client: MongoClient | null = null;
let clientPromise: Promise<MongoClient> | null = null;

if (process.env.NODE_ENV === 'development') {
  // In development, reuse global connection to survive hot reloads
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production, create a new connection
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

export async function getDb(): Promise<Db> {
  if (!clientPromise) {
    throw new Error('MongoDB client promise is not initialized');
  }
  const client = await clientPromise;
  return client.db(dbName);
}

export async function getMongoClient(): Promise<MongoClient> {
  if (!clientPromise) {
    throw new Error('MongoDB client promise is not initialized');
  }
  return clientPromise;
}