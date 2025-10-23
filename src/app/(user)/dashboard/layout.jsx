"use client";

import { auth } from "@/firebase/config";
import { clearUser, setUser } from "@/store/userSlice";
import { onAuthStateChanged } from "firebase/auth";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import React, { useState, useRef } from "react";
import {
  Users,
  TextSelect,
  TextSearch,
  Bot,
  FileSliders,
  CircleFadingArrowUpIcon,
  Settings,
  Menu,
  X,
  Cloud,
  HardDriveUpload,
  BrainCircuitIcon,
  Brain,
} from "lucide-react";
import Link from "next/link";
import UserDropdown from "@/components/UserDropdown";
import { useSelector } from "react-redux";
import DashNav from "@/components/DashNav";

import { DynamicBreadcrumb } from "@/components/DynamicBreadcrumb";

const DashboardLayout = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const drawerRef = useRef(null);
  const user = useSelector((state) => state.user);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();

  const handleClickOutside = (event) => {
    if (drawerRef.current && !drawerRef.current.contains(event.target)) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMenuOpen]);

  const menuItems = [
    {
      link: "/dashboard",
      id: "Dashboard",
      label: "Dashboard",
      icon: Users,
    },
    {
      link: "/dashboard/upload-resume",
      id: "UploadResume",
      label: "Upload Resume",
      icon: Cloud,
    },
    {
      link: "/dashboard/upload-internships",
      id: "UploadInternships",
      label: "Upload Internships",
      icon: HardDriveUpload,
    },
    {
      link: "/dashboard/internship-suggestions",
      id: "internshipSuggestions",
      label: "Internships Suggestions",
      icon: BrainCircuitIcon,
    },
    {
      link: "/dashboard/chatbot",
      id: "chatbot",
      label: "Chatbot",
      icon: Brain,
    },
  ];

  // Function to determine if a menu item is active based on current path
  const isActive = (itemLink) => {
    // Exact match for dashboard home
    if (itemLink === "/dashboard" && pathname === "/dashboard") {
      return true;
    }
    // Partial match for sub-routes (excluding the exact dashboard match)
    if (itemLink !== "/dashboard" && pathname.startsWith(itemLink)) {
      return true;
    }
    return false;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside
        ref={drawerRef}
        className={`
          fixed top-0 left-0 z-40 h-screen transition-transform
          ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 w-68 bg-white border-r border-gray-200
        `}
      >
        <div className="flex items-center justify-center h-16 px-4">
          <Link href={`/`}>
            <div className="flex items-center gap-2 ">
              <img src="/logo.png" className="w-10 h-10"/>
            </div>
          </Link>
          <button className="md:hidden" onClick={toggleMenu}>
            <X className="w-6 h-6 text-gray-800" />
          </button>
        </div>

        <nav className="px-4 mt-8">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.link);
            
            return (
              <button
                key={item.id}
                onClick={() => {
                  router.push(`${item.link}`);
                  setIsMenuOpen(false);
                }}
                className={`
                  flex items-center w-full px-4 py-3 mb-2 rounded-lg
                  ${
                    active
                      ? "bg-theme-primary/[0.6] text-white"
                      : "text-gray-600 hover:bg-gray-100"
                  }
                `}
              >
                <Icon className="w-5 h-5 mr-3" />
                {item.label}
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="md:ml-68 pt-16">
        {/* Top Navigation */}
        <DashNav toggleMenu={toggleMenu} />

        {/* Main Content Area */}
        <DynamicBreadcrumb/>
        <div className="">
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;