import Product from "@/Models/Products";
import { mongooseConnect } from "@/lib/mongoose"

export const GET=async(req,{params})=>{
    try {
        await mongooseConnect();
        const product=await Product.findById(params.id);
        return new Response(JSON.stringify(product),{status:201});
    } catch (error) {
        console.log(error)
        return new Response("Unable to get Single product",{status:500})
    }
}