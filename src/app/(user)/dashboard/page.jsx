"use client";
import { getResume } from "@/firebase/users/read";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const user = useSelector((state) => state.user);
  useEffect( () => {
   (async()=>{
     const res = await getResume({ uid: user.uid });
    console.log(JSON.stringify(res));
   })();
  }, [user]);
  return <div>Dashboard</div>;
};

export default Dashboard;
