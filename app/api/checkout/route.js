import Product from "@/Models/Products";
import { Orders } from "@/Models/orders";
import { mongooseConnect } from "@/lib/mongoose";
// import { set } from "mongoose";
const stripe = require("stripe")(process.env.stripe_SK);

export const POST = async (req, res) => {
  try {
    await mongooseConnect();
    // console.log(req.json())
    const { name, email, city, pCode, address, state, products } =
      await req.json();
    const productId = products?.split(",");
    const uniqueId = [...new Set(productId)];
    const productInfos = await Product.find({ _id: uniqueId });
    let line_items = [];
    // console.log(uniqueId)
    for (const pid of uniqueId) {
      const pInfo = productInfos.find((p) => p._id.toString() === pid);
      const quantity = productId.filter((p) => p === pid)?.length || 0;
      if (pInfo && quantity > 0) {
        line_items.push({
          quantity,
          price_data: {
            currency: "INR",
            product_data: { name: pInfo.Pname },
            unit_amount: pInfo.price * quantity * 100,
          },
        });
      }
    }
    const orderDoc = await Orders.create({
      line_items,
      name,
      email,
      city,
      pCode,
      address,
      state,
      paid: false,
    });
    const session = await stripe.checkout.sessions.create({
      line_items,
      payment_method_types:["card"],
      mode: "payment",
      customer_email:email,
      success_url: process.env.Public_url + "/cart?success=1",
      cancel_url: process.env.Public_url + "/cart?canceled=1",
      metadata: { orderId: orderDoc._id.toString() },
    });
    return new Response(JSON.stringify(session.url), { status: 201 });
  } catch (error) {
    console.log(error);
    return new Response("Failed to load cart products", { status: 500 });
  }
};
// 'https://checkout.stripe.com/c/pay/cs_test_a1ucoVfBZIWLQPjODT8i5B75m64MIniNgVi7DEXk6Alo4j9UMcbI9llog3#fidkdWxOYHwnPyd1blpxYHZxWjA0SmFnNUZWQmJ1Y3AxV309UTJVXWFnR09Rbko8aFxhcDVKf01fXUZBYWNjaU9Na2Y2M188fFVBZDJQXTR2QWBsSH1UTD1OS2dQcD1yYG1WMkhLQFE2dmh3NTVjVnVGa0A0bicpJ2N3amhWYHdzYHcnP3F3cGApJ2lkfGpwcVF8dWAnPyd2bGtiaWBabHFgaCcpJ2BrZGdpYFVpZGZgbWppYWB3dic%2FcXdwYHgl'
