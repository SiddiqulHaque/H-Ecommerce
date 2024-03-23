import Product from "@/Models/Products";
import { mongooseConnect } from "@/lib/mongoose";

export const GET = async (req, { params }) => {
  try {
    await mongooseConnect();
    const nProduct = await Product.find({}, null, {
      sort: { _id: -1 },
      limit: 8,
    });
    return new Response(JSON.stringify(nProduct), { status: 201 });
  } catch (error) {
    return new Response("Failed to get new Producs", { status: 500 });
  }
};
