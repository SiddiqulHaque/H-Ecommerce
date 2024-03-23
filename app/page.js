"use client";
import Featured from "@/components/Featured";
import Footer from "@/components/Footer";
import Newproduct from "@/components/Newproduct";
import Header from "@/components/Header";
import axios from "axios";
import { useEffect, useState } from "react";
// 65b1f9f65d69bff40e645206
export default function Home() {
  
  const [nProducts, setNProducts] = useState([]);
  const [featuredProd, setFeaturedProd] = useState(null);
  useEffect(() => {
    const getfeaturedProd = async () => {
      axios.get("/api/featuredProduct").then((response) => {
        setFeaturedProd(response.data);
      });
    };
    
    const getNproducts = async () => {
      await axios.get("/api/newProducts").then((response) => {
        setNProducts(response.data);
      });
    };

    getfeaturedProd();
    getNproducts();
  }, []);
  return (
    <>
      {/* <Header /> */}
      <Featured featuredProd={featuredProd} />
      <Newproduct nProducts={nProducts} />
      {/* <Footer/> */}
    </>
  );
}
