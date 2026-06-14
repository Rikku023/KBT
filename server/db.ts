import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_FILE = path.resolve(__dirname, "db.json");

export interface User {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  isVerified: boolean;
  verificationToken: string | null;
  createdAt: string;
}

function readDb(): User[] {
  try {
    if (!fs.existsSync(DB_FILE)) {
      return [];
    }
    const data = fs.readFileSync(DB_FILE, "utf-8");
    return JSON.parse(data) as User[];
  } catch (err) {
    console.error("Error reading database file, returning empty array:", err);
    return [];
  }
}

function writeDb(users: User[]) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(users, null, 2), "utf-8");
  } catch (err) {
    console.error("Error writing database file:", err);
  }
}

export const db = {
  getUsers: (): User[] => {
    return readDb();
  },
  
  getUserByEmail: (email: string): User | undefined => {
    const users = readDb();
    return users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  },

  getUserByVerificationToken: (token: string): User | undefined => {
    const users = readDb();
    return users.find((u) => u.verificationToken === token);
  },

  createUser: (user: Omit<User, "id" | "createdAt">): User => {
    const users = readDb();
    const newUser: User = {
      ...user,
      id: Math.random().toString(36).substring(2, 11),
      createdAt: new Date().toISOString(),
    };
    users.push(newUser);
    writeDb(users);
    return newUser;
  },

  updateUser: (id: string, updates: Partial<Omit<User, "id" | "createdAt">>): User | undefined => {
    const users = readDb();
    const idx = users.findIndex((u) => u.id === id);
    if (idx === -1) return undefined;
    
    users[idx] = {
      ...users[idx],
      ...updates,
    };
    writeDb(users);
    return users[idx];
  },
};
