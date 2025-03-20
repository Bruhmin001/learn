import { connectToDatabase } from "@/lib/mongo";
import User from "@/models/Users";
import jwt from "jsonwebtoken";


export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();
  await connectToDatabase();
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || password !== user.password) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET);
  res.json({ token });
}
