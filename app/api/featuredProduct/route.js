import Product from "@/Models/Products";
import { mongooseConnect } from "@/lib/mongoose";

export const GET = async (req, { params }) => {
  const featuredId = "65b1f9f65d69bff40e645206";
  try {
    await mongooseConnect();
    const product = await Product.findById(featuredId);
    return new Response(JSON.stringify(product), { status: 201 });
  } catch (error) {
    console.log(error)
    return new Response("Failed to Load Featured product", { status: 500 });
  }
};
