import { Orders } from "@/Models/orders";
import { mongooseConnect } from "@/lib/mongoose";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
  try {
    await mongooseConnect();
    const orders = await Orders.find({ orderBy: params.id });
    return new NextResponse(JSON.stringify(orders), { status: 201 });
  } catch (error) {
    return new NextResponse(JSON.stringify("Failed to get orders"), {
      status: 500,
    });
  }
};
