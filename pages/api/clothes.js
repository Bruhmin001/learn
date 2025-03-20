import { connectToDatabase } from "@/lib/mongo";
import Clothes from "@/models/clothes";
import { verifyJWT } from "@/lib/middleware";

export default async function handler(req, res) {
  await connectToDatabase();
  const headers = new Headers(req.headers);
  const token = headers.get("authorization");
  const user = verifyJWT(token);
  console.log("User:", user);

  switch (req.method) {
    case 'GET':
      return res.status(200).json(await Clothes.find({}));

    case 'POST':
      if (!user || user.role !== "admin") {
        console.log("User:", user);
        return res.status(403).json({ error: "Forbidden" });
      }
      const { name, category, price, branch } = req.body;
      await new Clothes({ name, category, price, branch }).save();
      return res.status(201)

    case 'DELETE':
      if (!user || user.role !== "admin") {
        console.log("User:", user);
        return res.status(403).json({ error: "Forbidden" });
      }
      const { id } = req.body;
      console.log("ID:", id);
      const deletedItem = await Clothes.findByIdAndDelete(id);
      
      return res.status(deletedItem ? 200 : 404).json(deletedItem || {});

    case 'PUT':
      if (!user || user.role !== "admin") {
        return res.status(403).json({ error: "Forbidden" });
      }

      const { id: itemId, name: newName, category: newCategory, price: newPrice, branch: newBranch } = req.body;
      const updatedItem = await Clothes.findByIdAndUpdate(itemId, 
        { name: newName, category: newCategory, price: newPrice, branch: newBranch }, 
        { new: true }
      );
      return res.status(updatedItem ? 200 : 404).json(updatedItem || {});

    default:
      return res.status(405).json({ error: 'Method not allowed' });
  }
}
