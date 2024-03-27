"use client";
import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "./CartContext";

const Featured = ({ featuredProd }) => {
  const { items, addToCart, removeFromCart } = useContext(CartContext);
  const [exists, setExists] = useState(false);
  return (
    <>
      {featuredProd ? (
        <div className="hero bg-base-100  py-8  flex items-center justify-center  ">
          <div className="hero-content flex-col-reverse  md:flex-row ">
            <div className="md:max-w-[42rem] w-auto   md:ml-2">
              <h1 className="text-5xl font-bold items-center">
                {featuredProd?.Pname}
              </h1>
              <p className="py-6">{featuredProd?.description}</p>
              <div className="flex flex-row gap-2 ">
                <button className="btn   btn-secondary btn-outline ">
                  Know more..
                </button>
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    addToCart(featuredProd._id);
                    setExists(true);
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
                {/* )} */}
              </div>
            </div>
            <img
              // src="https://daisyui.com/images/stock/photo-1635805737707-575885ab0820.jpg"
              src={featuredProd?.images?.[0]}
              className=" md:max-w-md max-w-[20rem]  bg-cover   rounded-lg shadow-2xl"
            />
          </div>
        </div>
      ) : (
        <div className="flex gap-3 w-[full] justify-center items-center m-4">
          <div className="skeleton w-[90%] h-60 "></div>
        </div>
      )}
    </>
  );
};

export default Featured;
