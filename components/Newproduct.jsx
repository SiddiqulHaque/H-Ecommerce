import React from "react";
import ProductBox from "./ProductBox";

const Newproduct = ({ nProducts }) => {
  return (
    <>
      <div className="pl-20 py-2 ">
        <h2 className="font-bold text-3xl ">New Products</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3    justify-items-center    gap-y-12  py-4   ">
        {nProducts?.length ? (
          nProducts.map((product) => <ProductBox key={product._id} {...product} />)
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
      </div>
    </>
  );
};

export default Newproduct;
