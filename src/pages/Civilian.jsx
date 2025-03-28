import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Home from "../pages/CivilianHome";
import CreateFeedback from "../pages/NewFeedback";
import MyFeedbacks from "../pages/MyFeedbacks";
import { FiLogOut, FiChevronDown } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";
import logo from "../assets/logo.png";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "../components/Navbar";

const CivilianDashboard = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  // Get user data from localStorage (replace with your actual user data structure)
  const userData = JSON.parse(localStorage.getItem("userData")) || {
    name: "John Doe",
    email: "john@example.com",
    profilePic: null,
  };

  const handleLogout = () => {
    localStorage.removeItem("userData");
    navigate("/login");
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-r from-blue-900 via-purple-800 to-indigo-900 text-white">
      {/* Top Navigation Bar */}
      <AdminNavbar></AdminNavbar>

      {/* Main Content Area with Sidebar */}
      <div className="flex flex-1">
        <Sidebar activeTab={activeTab} setActivePage={setActiveTab} />

        <main className="p-10 w-full animate-fadeIn flex justify-center items-center">
          <div className="w-full max-w-3xl bg-opacity-90 rounded-lg shadow-2xl">
            {activeTab === "home" && <Home />}
            {activeTab === "create" && <CreateFeedback />}
            {activeTab === "myfeedbacks" && <MyFeedbacks />}
          </div>
        </main>
      </div>
    </div>
  );
};

export default CivilianDashboard;
