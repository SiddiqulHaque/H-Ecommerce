"use client";
import React from "react";
import { useEffect, useState } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
const Page = () => {
  const { data: session } = useSession();
  const [providers, setProviders] = useState(null);
  useEffect(() => {
    (async () => {
      const res = await getProviders();
      setProviders(res);
    })();
  }, []);
  return (
    <>
      {session?.user ? (
        <>
          <button
            type="button"
            onClick={() => {
              signOut();
              router.push("/");
            }}
            className="outline_btn"
          >
            Sign Out
          </button>
          <Link href={"/myorders"}>My orders</Link>
        </>
      ) : (
        <>
          {providers &&
            Object.values(providers).map((provider) => (
                <button
                  className="bg-black text-white p-4 rounded-md"
                  type="button"
                  key={provider.name}
                  onClick={() => {
                    signIn(provider.id);
                  }}
                >
                  Sign in
                </button>
            ))}
        </>
      )}
    </>
  );
};

export default Page;
