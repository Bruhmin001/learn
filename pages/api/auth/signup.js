import { connectToDatabase } from "@/lib/mongo";
import User from "@/models/Users";
import bcrypt from "bcryptjs";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  await connectToDatabase();
  const { email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  await new User({ email, password: hashedPassword }).save();
  res.status(201).json({ message: "User created" });
}
