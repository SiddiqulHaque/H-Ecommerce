import { Orders } from "@/Models/orders";
import { mongooseConnect } from "@/lib/mongoose";

export const POST = async (req, res) => {
  try {
    await mongooseConnect();
    const {
      name,
      email,
      city,
      pCode,
      address,
      state,
      products,
      amount,
      orderBy,
    } = await req.json();
    const productId = products?.split(",");
    const orderDoc = await Orders.create({
      name,
      email,
      city,
      pCode,
      address,
      state,
      items: productId,
      amount,
      orderBy,
    });
    return new Response(JSON.stringify(orderDoc), { status: 201 });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify("Failed to place order"), {
      status: 500,
    });
  }
};
