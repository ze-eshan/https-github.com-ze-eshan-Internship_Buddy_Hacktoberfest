"use client";

import React, { useEffect } from "react";
import { Bell, Menu } from "lucide-react";
import UserDropdown from "@/components/UserDropdown";
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase/config";
import { addUser, clearUser } from "@/store/userSlice";

const DashNav = ({ toggleMenu }) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const tempUser = {
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
        };
        dispatch(addUser(tempUser));
      } else {
        dispatch(clearUser());
      }
    });
    return () => unsubscribe();
  }, [dispatch]);

  return (
    <header className="fixed top-0 right-0 z-30 w-full md:w-[calc(100%-16rem)] bg-white border-gray-200 border-b h-16">
      <div className="flex items-center justify-between h-full px-4">
        {/* Left side - Mobile menu button */}
        <button className="md:hidden" onClick={toggleMenu}>
          <Menu className="w-6 h-6 text-gray-800" />
        </button>

        {/* Right side - Icons and User dropdown */}
        <div className="flex items-center ml-auto space-x-4">
          <button className="p-2 rounded-lg hover:bg-gray-100">
            <Bell className="w-6 h-6 text-gray-800" />
          </button>
          {user && <UserDropdown user={user} />}
        </div>
      </div>
    </header>
  );
};

export default DashNav;