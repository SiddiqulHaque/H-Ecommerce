"use client";
import ProductBox from "@/components/ProductBox";
import axios from "axios";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [Products, setProducts] = useState([]);
  const [searchInput, setsearchInput] = useState("");
  useEffect(() => {
    const getAllProducts = async () => {
      axios.get("/api/allProducts").then((res) => {
        setProducts(res.data);
      });
    };
    getAllProducts();
  }, []);
  const [fproduct, setfproduct] = useState([]);
  useEffect(() => {
    const filteredProducts = Products.filter((product) => {
      if (
        product.Pname.toLowerCase().includes(searchInput) ||
        product.category.toLowerCase().includes(searchInput)
      ) {
        return product;
      }
    });
    setfproduct(filteredProducts);
  }, [searchInput]);

  return (
    <>
      {/* <Header /> */}
      <div className="w-full flex justify-center sticky top-16 z-10">
        <input
          type="text"
          placeholder="Search Products"
          className="input focus:outline-none focus:border-neutral input-md w-full md:max-w-xl max-w-xs shadow-md"
          onChange={(e) => setsearchInput(e.target.value.toLowerCase())}
        />
      </div>

      <h2 className="mx-14 my-2 text-2xl font-semibold    ">All Products</h2>

      <div className="grid grid-cols-1 md:grid-cols-3   justify-items-center  gap-y-12  py-4   ">
        {searchInput.length == 0 ? (
          <>
            {Products?.length ? (
              Products.map((product) => <ProductBox {...product} />)
            ) : (
              <>
                <div className="flex flex-col gap-4 w-52">
                  <div className="skeleton h-32 w-full"></div>
                  <div className="skeleton h-4 w-28"></div>
                  <div className="skeleton h-4 w-full"></div>
                  <div className="skeleton h-4 w-full"></div>
                </div>
                <div className="flex flex-col gap-4 w-52">
                  <div className="skeleton h-32 w-full"></div>
                  <div className="skeleton h-4 w-28"></div>
                  <div className="skeleton h-4 w-full"></div>
                  <div className="skeleton h-4 w-full"></div>
                </div>
                <div className="flex flex-col gap-4 w-52">
                  <div className="skeleton h-32 w-full"></div>
                  <div className="skeleton h-4 w-28"></div>
                  <div className="skeleton h-4 w-full"></div>
                  <div className="skeleton h-4 w-full"></div>
                </div>
              </>
            )}
          </>
        ) : (
          <>
            {fproduct?.length ? (
              fproduct.map((product) => <ProductBox {...product} />)
            ) : (
              <div>
                <h1 className="text-2xl font-semibold">NO matching Product</h1>
              </div>
            )}
          </>
        )}
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default Page;
