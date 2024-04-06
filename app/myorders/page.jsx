"use client";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Page = () => {
  const { data: session } = useSession();
  const [orders, setOrders] = useState([]);
  const [particularOrder, setparticularOrder] = useState([]);
  const [selectedorder, setSelectedoder] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!session?.user) {
      router.push("/signin");
      return;
    }
    const getorders = async () => {
      const id = session.user.id;
      setLoading(true);
      const res = await axios.get(`/api/orders/${id}`);
      setOrders(res.data);
      setLoading(false);
      // console.log(res.data)
    };
    getorders();
  }, []);
  const getParticularOrder = async (ids) => {
    await axios.post("/api/cartProducts", { ids: ids }).then((response) => {
      setparticularOrder(response.data);
    });
  };
  return (
    <div>
      {loading ? (
        <div className="flex flex-col gap-6   px-4 py-6  mx-auto">
        <div className="skeleton h-8 w-full"></div>
        <div className="skeleton h-8 w-full"></div>
        <div className="skeleton h-8 w-full"></div>
        <div className="skeleton h-8 w-full"></div>
        </div>
      ) : (
        <>
          {orders.length ? (
            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr>
                    <th></th>
                    <th>Order ID</th>
                    <th>Order By</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {orders?.map((order, ind) => (
                    <tr key={order._id}>
                      <th>{ind + 1}</th>
                      <td>{order._id}</td>
                      <td>{order.name}</td>
                      <td>
                        <button
                          className="bg-secondary px-2 py-1 text-white rounded-md "
                          onClick={() => {
                            document.getElementById("my_modal_3").showModal();
                            setSelectedoder(order);
                            getParticularOrder(order.items);
                          }}
                        >
                          More Info
                        </button>
                        <dialog id="my_modal_3" className="modal">
                          <div className="modal-box">
                            <form method="dialog">
                              {/* if there is a button in form, it will close the modal */}
                              <button
                                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                                onClick={() => {
                                  setparticularOrder([]);
                                  setSelectedoder([]);
                                }}
                              >
                                ✕
                              </button>
                            </form>
                            {particularOrder.length !== 0 ? (
                              <>
                                <table className="table">
                                  <thead>
                                    <tr className="text-lg  ">
                                      <th>Product</th>
                                      <th className="text-center">Quantity</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {particularOrder.map((o) => {
                                      const quantity =
                                        selectedorder.items.filter(
                                          (id) => id === o._id
                                        ).length;
                                      return (
                                        <tr key={o._id} className="text-md">
                                          <td>
                                            <div className=" p-[5px] flex justify-start items-center ">
                                              <img
                                                src={o.images[0]}
                                                alt=""
                                                className=" h-16 max-w-full object-cover   "
                                              />
                                            </div>
                                            <a
                                              href={`/Products/${o._id}`}
                                              className="text-center text-md font-semibold   "
                                            >
                                              {" "}
                                              {o.Pname}
                                            </a>
                                          </td>
                                          <td className="text-center gap-1">
                                            {quantity}
                                          </td>
                                        </tr>
                                      );
                                    })}
                                    <tr>
                                      <td>
                                        <span className="font-semibold text-lg ">
                                          Total
                                        </span>
                                      </td>
                                      <td className="text-center gap-1 font-semibold">
                                        ₹{selectedorder.amount}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>
                                        <button className="btn btn-primary text-md  ">
                                          Proceed to payment
                                        </button>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </>
                            ) : (
                              <div className="flex justify-center items-center h-40">
                                <span className="loading loading-spinner loading-lg"></span>
                              </div>
                            )}
                          </div>
                        </dialog>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <>NO orders</>
          )}
        </>
      )}
    </div>
  );
};

export default Page;
