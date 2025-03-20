import { connectToDatabase } from "@/lib/mongo";
import User from "@/models/Users";


export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  try {
    await connectToDatabase();
    const { email, password, role = "user" } = req.body;
    await new User({ 
      email, 
      password,
      role 
    }).save();
    res.status(201).json({ message: "User created" });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ message: "Error creating user" });
  }
}
