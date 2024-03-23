"use client";
import { CartContext } from "@/components/CartContext";
import axios from "axios";
import { usePathname } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";

const Page = () => {
  const location = usePathname();
  const id = location.split("/")[2];
  const [product, setProduct] = useState(null);

  const getProduct = async () => {
    axios.get(`/api/allProducts/${id}`).then((res) => {
      setProduct(res.data);
      setactiveImages(res.data.images[0])
    });
  };
  useEffect(() => {
    getProduct();
  }, []);

  const [activeImages, setactiveImages] = useState(product?.images[0]);
  const {  addToCart, removeFromCart } = useContext(CartContext);
  return (
    <div>
      {/* <Header /> */}

      {product && (
        <div className="hero bg-base-100   flex items-center justify-center  ">
          <div className="hero-content flex-col-reverse  md:flex-row ">
            <div className="md:max-w-[42rem] max-w-[25rem] md:ml-2">
              <h1 className="md:text-5xl text-3xl font-bold items-center">
                {product?.Pname}
              </h1>
              <p className="py-6">{product?.description}</p>
              <div className="flex flex-row gap-3  items-center ">
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    addToCart(product._id);
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-6 h-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                    />
                  </svg>
                  Add to cart
                </button>
                <span className="font-semibold text-2xl">₹{product.price}</span>
                {/* )} */}
              </div>
            </div>
            <div className="grid grid-rows-[0.8,0.2] bg-base-100 px-2 py-4 md:w-[30rem] rounded-md max-w-sm ">
              <div className="flex justify-center items-center rounded-md pb-2">
                <img
                  src={activeImages}
                  alt=""
                  className="h-[200px] md:max-w-[24rem] max-w-[20rem] rounded-md"
                />
              </div>
              <div className="carousel carousel-center max-w-md p-4 space-x-4 rounded-box flex justify-center">
                {product.images.map((i) => (
                  <div key={i}
                    className="carousel-item cursor-pointer"
                    onClick={() => setactiveImages(i)}
                  >
                    <img src={i} className="rounded-md h-16 w-20 bg-cover" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      {/* <Footer /> */}
    </div>
  );
};

export default Page;
