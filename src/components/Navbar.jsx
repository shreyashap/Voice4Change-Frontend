import React, { useState } from "react";
import { FiLogOut, FiUser, FiBell, FiSettings, FiChevronDown } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";
import { motion } from "framer-motion";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";

const Navbar = ({ isAdmin = false, userData = {} }) => {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("userData");
    navigate("/login");
  };

  // Default user data if not provided
  userData = {
    name: "User Name",
    email: "user@example.com",
    profilePic: null,
    ...userData
  };

  return (
    <nav className="top-0 left-0 right-0 h-16 bg-gray-900/80 backdrop-blur-md shadow-md z-50 flex items-center px-6 border-b border-gray-700 z-50">
      {/* Logo Section */}
      <motion.div 
        className="flex items-center"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <img 
          src={logo} 
          alt="App Logo" 
          className="h-10 w-auto mr-3"
        />
      </motion.div>

      {/* Spacer */}
      <div className="flex-1"></div>

      {/* Right Side Controls */}
      <div className="flex items-center space-x-4">
        {/* Admin-specific controls */}
        {isAdmin && (
          <>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 text-gray-400 hover:text-white rounded-full hover:bg-gray-800 transition-colors"
            >
              <FiBell size={20} />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 text-gray-400 hover:text-white rounded-full hover:bg-gray-800 transition-colors"
            >
              <FiSettings size={20} />
            </motion.button>
          </>
        )}

        {/* Profile Dropdown */}
        <div className="relative">
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <div className="flex items-center space-x-3">
              {userData.profilePic ? (
                <img
                  src={userData.profilePic}
                  alt="Profile"
                  className="w-8 h-8 rounded-full object-cover border-2 border-blue-400"
                />
              ) : (
                <FaUserCircle className="text-blue-400 text-3xl" />
              )}
              <div className="text-right">
                <p className="font-medium text-sm">{userData.name}</p>
                <p className="text-gray-300 text-xs">{userData.email}</p>
              </div>
              <FiChevronDown
                className={`transition-transform ${
                  showDropdown ? "rotate-180" : ""
                }`}
              />
            </div>
          </motion.div>

          {/* Dropdown Menu */}
          {showDropdown && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg z-50 border border-gray-700"
            >
              <div className="py-1">
                <button
                  onClick={() => {
                    navigate(isAdmin ? "/admin/profile" : "/profile");
                    setShowDropdown(false);
                  }}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
                >
                  View Profile
                </button>
                <button
                  onClick={() => {
                    navigate(isAdmin ? "/admin/settings" : "/settings");
                    setShowDropdown(false);
                  }}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
                >
                  Account Settings
                </button>
                <div className="border-t border-gray-700"></div>
                <button
                  onClick={handleLogout}
                  className="flex items-center w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-gray-700 hover:text-red-300 transition-colors"
                >
                  <FiLogOut className="mr-2" />
                  Logout
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;