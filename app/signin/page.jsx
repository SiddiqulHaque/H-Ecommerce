"use client";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import {useSignInWithEmailAndPassword} from "react-firebase-hooks/auth" 
const page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signInWithEmailAndPassword]=useSignInWithEmailAndPassword(auth)
  const router=useRouter();
  const signin=async()=>{
    try{
      const res=await signInWithEmailAndPassword(email,password);
      // console.log(res);
      sessionStorage.setItem('user',true);
      router.push("/cart");
    }catch(e){
      console.log(e);
      return e;
    }
  }
  return (
    <div className="flex justify-center mt-10  items-center  ">
      <div className="bg-base-100  p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-3xl font-semibold text-primary  mb-4">Sign In</h2>
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
            <button className="w-full btn btn-primary py-2 rounded-md  transition duration-300 mt-6" 
                disabled={!email || !password}
                onClick={signin}
            >
              Sign In
            </button>
          </div>
          <div className="text-center text-lg">
            New User? <a href="/signup">SignUp</a>
          </div>
        
      </div>
    </div>
  );
};

export default page;
