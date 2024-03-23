// import Product from "@/Models/Products";
// import { mongooseConnect } from "@/lib/mongoose";

// export const GET = async (req, { params }) => {
//   try {
//     await mongooseConnect();
//     const product = await Product.find({ category: params.id });
//     return new Response(JSON.stringify(product), { status: 201 });
//   } catch (error) {
//     return new Response("Unable to get particular category product", {
//       status: 500,
//     });
//   }
// };
import Product from "@/Models/Products";
import { Category } from "@/Models/categories";
import { mongooseConnect } from "@/lib/mongoose";

export const GET = async (req, { params }) => {
  try {
    await mongooseConnect();
    const sproduct = await Product.find({ category: params.id });
    const allCategories = await Category.find();
    const matchingCategories = allCategories.filter(
      (category) => category.parent && category.parent.toString() === params.id
    );
    const matchingCategoryIds = matchingCategories.map(
      (category) => category._id
    );
    const cproducts = await Product.find({
      category: { $in: matchingCategoryIds },
    });
    const allproducts = [...sproduct, ...cproducts];

    return new Response(JSON.stringify(allproducts), { status: 201 });
  } catch (error) {
    return new Response("Unable to get products for matching categories", {
      status: 500,
    });
  }
};
