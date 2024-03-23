import Product from "@/Models/Products";
import { mongooseConnect } from "@/lib/mongoose";

export const GET = async (req, res) => {
  try {
    await mongooseConnect();
    const products = await Product.find({}, null, { sort: { _id: -1 } });
    return new Response(JSON.stringify(products), { status: 201 });
  } catch (error) {
    return new Response("Unabl eto get All Products", { status: 500 });
  }
};
