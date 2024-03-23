"use client";
import { auth } from "@/lib/firebase";
import React, { useState } from "react";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
const Page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setcPassword] = useState("");
  const [createUserWithEmailAndPassword] =
    useCreateUserWithEmailAndPassword(auth);
  const signup = async () => {
    try {
      const res = await createUserWithEmailAndPassword(email, password);
      // console.log(res);
      sessionStorage.setItem("user", true);
    } catch (err) {
      console.log(err);
      return err;
    }
  };
  return (
    <div className=" flex justify-center mt-5 ">
      <div className="bg-base-100  p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-3xl font-semibold text-primary  mb-4">Sign Up</h2>
        {/* <form className="space-y-4"> */}
        <div>
          <input
            className="w-full border-b-2 border-gray-300 bg-inherit focus:border-secondary   px-4 py-2 focus:outline-none"
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <input
            className="w-full border-b-2 border-gray-300 focus:border-secondary   px-4 py-2 focus:outline-none bg-inherit"
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <input
            className="w-full border-b-2 border-gray-300 focus:border-secondary  px-4 py-2 focus:outline-none bg-inherit"
            type="password"
            placeholder="Confirm Password"
            onChange={(e) => setcPassword(e.target.value)}
          />
        </div>
        <div>
          <button
            className="w-full btn btn-primary py-2 rounded-md  transition duration-300 mt-6"
            disabled={
              !email || !password || !cpassword || password !== cpassword
            }
            onClick={signup}
          >
            Sign Up
          </button>
        </div>
        <div className="text-center text-lg">
          Existing User? <a href="/signin">SignIn</a>
        </div>
        {/* </form> */}
      </div>
    </div>
  );
};

export default Page;
