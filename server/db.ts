import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { MongoClient, ObjectId } from "mongodb";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Simple env file loader for local development if process.env.MONGODB_URI is not set
function loadEnv() {
  try {
    const envPath = path.resolve(__dirname, "..", ".env");
    if (fs.existsSync(envPath)) {
      const content = fs.readFileSync(envPath, "utf-8");
      content.split(/\r?\n/).forEach((line) => {
        const trimmed = line.trim();
        if (trimmed && !trimmed.startsWith("#") && trimmed.includes("=")) {
          const firstEq = trimmed.indexOf("=");
          const key = trimmed.substring(0, firstEq).trim();
          const val = trimmed.substring(firstEq + 1).trim().replace(/^['"]|['"]$/g, "");
          if (key && !process.env[key]) {
            process.env[key] = val;
          }
        }
      });
    }
  } catch (err) {
    console.error("Failed to load .env file:", err);
  }
}

// Load environment variables
loadEnv();

const uri = process.env.MONGODB_URI;

export interface User {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  isVerified: boolean;
  verificationToken: string | null;
  createdAt: string;
}

// Cached connection variables
let cachedClient: MongoClient | null = null;
let cachedDb: any = null;

export async function connectToDatabase() {
  // Return cached instances if already connected
  if (cachedDb) {
    return cachedDb;
  }

  if (!uri) {
    throw new Error(
      "MONGODB_URI is not defined in environment variables. Please check your .env file."
    );
  }

  try {
    cachedClient = new MongoClient(uri);
    await cachedClient.connect();
    cachedDb = cachedClient.db();
    console.log("Successfully connected to MongoDB");
    return cachedDb;
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    throw error;
  }
}

// Helper: Convert MongoDB document to User interface (mapping _id to id string)
function mapUser(doc: any): User | undefined {
  if (!doc) return undefined;
  return {
    id: doc._id.toString(),
    name: doc.name,
    email: doc.email,
    passwordHash: doc.passwordHash,
    isVerified: doc.isVerified,
    verificationToken: doc.verificationToken,
    createdAt: doc.createdAt instanceof Date ? doc.createdAt.toISOString() : doc.createdAt,
  };
}

export const db = {
  getUserByEmail: async (email: string): Promise<User | undefined> => {
    const database = await connectToDatabase();
    const collection = database.collection("users");
    const doc = await collection.findOne({ email: email.toLowerCase() });
    return mapUser(doc);
  },

  getUserByVerificationToken: async (token: string): Promise<User | undefined> => {
    const database = await connectToDatabase();
    const collection = database.collection("users");
    const doc = await collection.findOne({ verificationToken: token });
    return mapUser(doc);
  },

  createUser: async (user: Omit<User, "id" | "createdAt">): Promise<User> => {
    const database = await connectToDatabase();
    const collection = database.collection("users");
    
    const docToInsert = {
      name: user.name,
      email: user.email.toLowerCase(),
      passwordHash: user.passwordHash,
      isVerified: user.isVerified,
      verificationToken: user.verificationToken,
      createdAt: new Date().toISOString(),
    };
    
    const result = await collection.insertOne(docToInsert);
    return {
      id: result.insertedId.toString(),
      ...docToInsert,
    };
  },

  updateUser: async (id: string, updates: Partial<Omit<User, "id" | "createdAt">>): Promise<User | undefined> => {
    const database = await connectToDatabase();
    const collection = database.collection("users");
    
    let oid: ObjectId;
    try {
      oid = new ObjectId(id);
    } catch {
      console.error("Invalid ObjectId format:", id);
      return undefined;
    }

    const docUpdates: any = { ...updates };
    if (docUpdates.email) {
      docUpdates.email = docUpdates.email.toLowerCase();
    }

    const result = await collection.findOneAndUpdate(
      { _id: oid },
      { $set: docUpdates },
      { returnDocument: "after" }
    );
    
    const doc = result && (result.value !== undefined ? result.value : result);
    return mapUser(doc);
  },
};
