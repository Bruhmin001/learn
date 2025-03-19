import { connectToDatabase } from "@/lib/mongo";
import Stock from "@/models/Stock";

export async function GET(req) {
  await connectToDatabase();
  return Response.json(await Stock.find({}));
}

export async function POST(req) {
  await connectToDatabase();
  const { branch, stock } = await req.json();

  if (!branch || stock === undefined) {
    return Response.json({}, { status: 400 });
  }

  return Response.json(await new Stock({ branch, stock }).save(), { status: 201 });
}

export async function PATCH(req) {
  await connectToDatabase();
  const { id, stock } = await req.json();

  if (!id || stock === undefined) {
    return Response.json({}, { status: 400 });
  }

  return Response.json(await Stock.findByIdAndUpdate(id, { stock }, { new: true }) || {}, { status: (await Stock.findById(id)) ? 200 : 404 });
}

export async function DELETE(req) {
  await connectToDatabase();
  const { id } = await req.json();
  
  return Response.json(await Stock.findByIdAndDelete(id) || {}, { status: (await Stock.findById(id)) ? 200 : 404 });
}