"use client";
import Link from "next/link";
import React, { useContext, useState } from "react";
import { CartContext } from "./CartContext";

const ProductBox = ({ _id, Pname, description, price, images }) => {
  const { items, addToCart,removeFromCart } = useContext(CartContext);
  const [exists, setExists] = useState(false);
  return (
    <div className="card card-compact w-[20rem] max-h-[22rem] bg-base-100  flex ">
      <figure>
        <img
          src={images?.[0]}
          alt="Shoes"
          className=" max-h-56  max-w-52   rounded-md "
        />
      </figure>
      <div className="card-body  max-h-[8rem] rounded-md ">
        <Link
          href={`/Products/${_id}`}
          className="card-title hover:cursor-pointer"
        >
          {Pname}
        </Link>
        <div className="flex justify-between  items-center">
          <h2 className="font-semibold text-xl inline-flex  ">₹{price}</h2>

          <div className="card-actions ">
            {/* {exists ? (
              <button className="btn btn-primary px-2"onClick={()=>{
                removeFromCart(_id)
                setExists(false)
              }} >
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
                Remove
              </button>
            ) : ( */}
              <button
                className="btn btn-primary px-2"
                onClick={() => {
                  addToCart(_id);
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
      </div>
    </div>
  );
};

export default ProductBox;
