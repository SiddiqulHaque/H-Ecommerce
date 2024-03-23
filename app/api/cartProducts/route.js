import Product from "@/Models/Products";
import { mongooseConnect } from "@/lib/mongoose"

export const POST=async(req,res)=>{
    try {
        await mongooseConnect();
        const {ids}=await req.json();
        const cartProducts=await Product.find({_id:ids})
        return new Response(JSON.stringify(cartProducts),{status:201})
    } catch (error) {
        return new Response("Failed to load cart Items",{status:500})
    }
}