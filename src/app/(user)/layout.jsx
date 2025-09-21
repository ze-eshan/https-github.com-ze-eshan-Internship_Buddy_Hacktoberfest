"use client";
import NavBar from "@/components/Navbar";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const UserLayout = ({ children }) => {
  const user = useSelector((state) => state.user);
  const router = useRouter();
  // useEffect(()=>{
  //     if(!user){
  //       setTimeout(()=>{
  //         router.push('/login')
  //       },1000)
  //     }
  //   },[user])
  if (!user) {
    return (
      <>
        <NavBar />
        <div className="flex justify-center flex-col items-center text-5xl text-theme-purple w-full text-center py-16 h-screen">
          <img src="/svg/Login-bro.svg" width={500} className="aspect-square " />
          <h1>Please Login in First to Access Dashboard</h1>
        </div>
      </>
    );
  }
  return <>{children}</>;
};

export default UserLayout;