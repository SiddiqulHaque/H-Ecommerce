"use client";
import { CartContext } from "@/components/CartContext";
import axios from "axios";
import { redirect, useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";

const Page = () => {
  const { items, addToCart, removeFromCart } = useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [pCode, setPcode] = useState("");
  const [address, setAddress] = useState("");
  const [state, setState] = useState("");
  const [vis, setVis] = useState(false);
  const router = useRouter();
  const [user] = useAuthState(auth);
  // const session = sessionStorage.getItem("user");
  // if (!user && !session) {
  //   router.push("/signin");
  // }
  useEffect(() => {
    const getCartProducts = async () => {
      await axios.post("/api/cartProducts", { ids: items }).then((response) => {
        setProducts(response.data);
      });
    };
    getCartProducts();
  }, [items]);
  let total = 0;
  for (const pid of items) {
    const price = products.find((p) => p._id == pid)?.price || 0;
    total += price;
  }
  const orderFormSubmit = async () => {
    // const stripe = await loadStripe(process.env.stripe_PK);
    const products = items.join(",");
    const response = await axios.post("/api/checkout", {
      name,
      email,
      city,
      pCode,
      address,
      state,
      products,
    });
    const url = response.data;
    if (url) {
      router.push(url);
    }
  };
  return (
    <>
      {/* <Header /> */}
      <h2 className="mx-14 my-2 text-2xl font-semibold      ">
        Welcome to Cart
      </h2>
      <button
        className="md:hidden btn btn-secondary p-1 px-2 tooltip-top cursor-pointer fixed right-0 top-[5rem]  z-10 rounded-l-lg    "
        onClick={() =>
          setVis((prev) => {
            return !prev;
          })
        }
        data-tip="checkout"
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
            d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
          />
        </svg>
      </button>

      <div className="grid md:grid-cols-[1.2fr,0.8fr] grid-rows-2 gap-8 mx-12 my-4   ">
        {!items.length ? (
          <div className="bg-base-200  flex justify-center items-center text-2xl ">
            {" "}
            OOPs! Your cart is empty
          </div>
        ) : (
          <div className="overflow-x-auto bg-base-100 md:px-4 px-1 py-4 sticky top-20 ">
            <table className="table">
              <thead>
                <tr className="text-lg  ">
                  <th>Product</th>
                  <th className="text-center">Quantity</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product._id} className="text-md">
                    <td>
                      <div className=" p-[5px] flex justify-start items-center ">
                        <img
                          src={product.images[0]}
                          alt=""
                          className=" h-16 max-w-full object-cover   "
                        />
                      </div>
                      <a
                        href={`/Products/${product._id}`}
                        className="text-center text-md font-semibold   "
                      >
                        {" "}
                        {product.Pname}
                      </a>
                    </td>
                    <td className="text-center gap-1">
                      <button
                        className="bg-base-200 rounded-sm px-1 mx-1"
                        onClick={() => removeFromCart(product._id)}
                      >
                        -
                      </button>
                      {items.filter((id) => product._id === id).length}
                      <button
                        className="bg-base-200 rounded-sm px-1 mx-1"
                        onClick={() => {
                          addToCart(product._id);
                        }}
                      >
                        +
                      </button>
                    </td>
                    <td className="font-semibold text-md">
                      <div className="w-16  ">
                        ₹
                        {items.filter((id) => product._id === id).length *
                          product.price}
                      </div>
                    </td>
                  </tr>
                ))}
                <tr>
                  <td></td>
                  <td></td>
                  <td className="font-semibold text-md w-16"> ₹{total}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {items.length > 0 && (
          <div
            className={`${
              vis
                ? "bg-base-100  px-4 md:max-h-[22rem]  shadow-md rounded-sm pt-4 pb-8 md:sticky md:top-20 top-36   fixed left-0 z-10 transition-all "
                : "bg-base-100  px-4 max-h-[22rem]  shadow-md rounded-sm pt-4 pb-8 md:sticky md:top-20 fixed left-[-200%]"
            }`}
          >
            <h2 className=" text-2xl font-semibold pb-1 ">Order Information</h2>
            <div className="flex flex-col gap-y-3">
              <input
                type="text"
                placeholder="Name"
                className="input input-bordered input-sm w-full max-w-lg focus:outline-none focus:border-neutral"
                onChange={(e) => setName(e.target.value)}
                name="name"
                value={name}
              />
              <input
                type="text"
                placeholder="Email"
                className="input input-bordered input-sm w-full max-w-lg focus:outline-none focus:border-neutral"
                onChange={(e) => setEmail(e.target.value)}
                name="email"
                value={email}
              />
              <div className="flex gap-1">
                <input
                  type="text"
                  placeholder="city"
                  className="input input-bordered input-sm w-full max-w-xs focus:outline-none focus:border-neutral"
                  onChange={(e) => setCity(e.target.value)}
                  name="city"
                  value={city}
                />
                <input
                  type="text"
                  placeholder="Postal Code"
                  className="input input-bordered input-sm w-full max-w-xs focus:outline-none focus:border-neutral"
                  onChange={(e) => setPcode(e.target.value)}
                  name="pCode"
                  value={pCode}
                />
              </div>

              <input
                type="text"
                placeholder="Address"
                className="input input-bordered input-sm w-full max-w-lg focus:outline-none focus:border-neutral"
                onChange={(e) => setAddress(e.target.value)}
                name="address"
                value={address}
              />
              <input
                type="text"
                placeholder="State"
                className="input input-bordered input-sm w-full max-w-lg focus:outline-none focus:border-neutral  "
                onChange={(e) => setState(e.target.value)}
                name="state"
                value={state}
              />
              {/* <input type="hidden" name="products" value={items.join(",")} />  */}
              <button
                className="btn btn-primary text-lg  "
                onClick={orderFormSubmit}
              >
                Continue to Payment
              </button>
              {/* <button
                className="btn btn-primary text-lg  "
                onClick={() => {
                  signOut(auth);
                  sessionStorage.removeItem("user");
                }}
              >
                logout
              </button> */}
            </div>
          </div>
        )}
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default Page;
