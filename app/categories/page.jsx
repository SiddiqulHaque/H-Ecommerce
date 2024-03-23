"use client";
import Footer from "@/components/Footer";
import ProductBox from "@/components/ProductBox";
import Header from "@/components/Header";
import axios from "axios";
import React, { useEffect, useState } from "react";

const page = () => {
  const [categories, setCategories] = useState([]);
  const [categoryId, setcategoryId] = useState("");
  const [categProduct, setcategProduct] = useState([]);
  const [categName, setcategName] = useState("");
  const [selected, setSelected] = useState(null);
  const [searchInput, setsearchInput] = useState("");
  const [allproducts, setallProducts] = useState([]);
  const [show, setShow] = useState(false);
  function onChange(i) {
    setSelected((prev) => (i === prev ? null : i));
  }

  const getCategories = async () => {
    axios.get("/api/categories").then((res) => {
      setCategories(res.data);
    });
  };
  const getAllProducts = async () => {
    axios.get("/api/allProducts").then((res) => {
      setallProducts(res.data);
    });
  };

  useEffect(() => {
    getAllProducts();
    getCategories();
  }, []);

  const getPartCateg = async () => {
    axios.get(`/api/categories/${categoryId}`).then((res) => {
      setcategProduct(res.data);
    });
  };

  useEffect(() => {
    categoryId && getPartCateg();
  }, [categoryId]);
  const [fcateg, setfcateg] = useState([]);
  useEffect(() => {
    const filteredcateg = categories.filter((categ) => {
      if (categ.name.toLowerCase().includes(searchInput)) {
        return categ;
      }
    });
    setfcateg(filteredcateg);
  }, [searchInput]);

  return (
    <>
      {/* <Header /> */}
      <div className="md:grid grid-cols-[25%,75%]">
        <div className=" max-h-[80%]  ">
          <div className={`drawer md:drawer-open fixed top-[4rem] left-0 z-10`}>
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div
              className="drawer-content flex flex-col items-center justify-center fixed right-[-5px] top-[5rem]  z-10"
              onClick={() => setShow(true)}
            >
              {/* Page content here */}
              <label
                htmlFor="my-drawer-2"
                className="btn btn-primary drawer-button md:hidden"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-8 h-8"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 6h.008v.008H6V6Z"
                  />
                </svg>
              </label>
            </div>
            <div className="drawer-side z-10 h-full w-full ">
              <div className="w-full flex justify-center py-2 px-1">
                <input
                  type="text"
                  placeholder="Search Category"
                  className="input focus:outline-none focus:border-neutral border  input-md   max-w-[16rem] shadow-sm"
                  value={searchInput}
                  onChange={(e) => setsearchInput(e.target.value.toLowerCase())}
                />
              </div>

              <label
                htmlFor="my-drawer-2"
                aria-label="close sidebar"
                className="drawer-overlay"
              ></label>
              <ul className="menu p-4 w-60 pt-20 md:pt-4   min-h-full bg-base-100  text-base-content">
                {/* Sidebar content here */}
                {searchInput.length == 0 ? (
                  <>
                    {categories?.length &&
                      categories.map((c, i) => (
                        <li onClick={() => setShow(false)}>
                          <label
                            className=" cursor-pointer flex gap-2"
                            onChange={() => {
                              setcategoryId((prev) => {
                                if (prev === c._id) {
                                  setSelected("");
                                  return "";
                                } else {
                                  setSelected(c._id);

                                  return c._id;
                                }
                              });
                              setcategName((prev) => {
                                if (prev === c.name) {
                                  return "";
                                } else {
                                  return c.name;
                                }
                              });
                            }}
                          >
                            <input
                              type="checkbox"
                              checked={c._id === selected}
                              onChange={() => onChange(c._id)}
                              className="checkbox checkbox-secondary  w-4 h-4 "
                            />
                            <span className="label-text text-lg">{c.name}</span>
                          </label>
                        </li>
                      ))}
                  </>
                ) : (
                  <>
                    {/* {!!!fcateg?.length && */}
                    {fcateg?.length != 0 &&
                      fcateg?.map((c, i) => (
                        <li>
                          <label
                            className=" cursor-pointer flex gap-2"
                            onChange={() => {
                              setcategoryId((prev) => {
                                if (prev === c._id) {
                                  setSelected("");
                                  return "";
                                } else {
                                  setSelected(c._id);
                                  return c._id;
                                }
                              });
                              setcategName((prev) => {
                                if (prev === c.name) {
                                  return "";
                                } else {
                                  return c.name;
                                }
                              });
                            }}
                          >
                            <input
                              type="checkbox"
                              checked={c._id == selected}
                              onChange={() => onChange(c._id)}
                              className="checkbox checkbox-secondary  w-4 h-4 "
                            />
                            <span className="label-text text-lg">{c.name}</span>
                          </label>
                        </li>
                      ))}
                  </>
                )}
                <li>
                  <label
                    className=" cursor-pointer flex gap-1 text-secondary"
                    onClick={() => {
                      setcategoryId("");
                      setSelected(null);
                      setcategName("");
                      setsearchInput("");
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
                        d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                      />
                    </svg>

                    <span className="label-text text-lg text-secondary">
                      Clear All
                    </span>
                  </label>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div>
          {categName.length === 0 ? (
            <>
              <h1 className="text-xl font-semibold p-4">All Products</h1>
            </>
          ) : (
            <>
              <h1 className="text-xl font-semibold p-4">{categName}</h1>
            </>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2   justify-items-center  gap-y-12 gap-x-4  py-4 w-full ">
            {categoryId.length == 0 ? (
              <>
                {allproducts?.length ? (
                  allproducts.map((product) => <ProductBox {...product} />)
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
                  </>
                )}
              </>
            ) : (
              <>
                {categProduct?.length ? (
                  categProduct.map((product) => <ProductBox {...product} />)
                ) : (
                  <>
                    <h1 className="text-xl font-semibold">
                      NO matching Product
                    </h1>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
