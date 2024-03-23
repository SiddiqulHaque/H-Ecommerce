import { Category } from "@/Models/categories";
import { mongooseConnect } from "@/lib/mongoose";

export const GET = async (req, res) => {
  try {
    await mongooseConnect();
    const categories = await Category.find();
    return new Response(JSON.stringify(categories), { status: 201 });
  } catch (error) {
    return new Response("Unable to get categories", { status: 500 });
  }
};
