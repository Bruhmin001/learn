import { connectToDatabase } from "@/lib/mongo";
import Clothes from "@/models/Clothes";

export async function GET(req) {
  await connectToDatabase();
  return Response.json(await Clothes.find({}));
}

export async function POST(req) {
  await connectToDatabase();
  const { name, category, price, branch } = await req.json();

  if (!name || !category || !price || !branch) {
    return Response.json({}, { status: 400 });
  }

  return Response.json(await new Clothes({ name, category, price, branch }).save(), { status: 201 });
}

export async function DELETE(req) {
  await connectToDatabase();
  const { id } = await req.json();
  
  return Response.json(await Clothes.findByIdAndDelete(id) || {}, { status: (await Clothes.findById(id)) ? 200 : 404 });
}