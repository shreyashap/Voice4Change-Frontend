import React, { useState } from "react";
import { 
  FiHome, 
  FiMessageSquare, 
  FiUsers,
  FiSettings,
  FiBarChart2,
  FiMapPin,
  FiMenu,
  FiX,
  FiChevronDown,
  FiChevronRight
} from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { NavLink } from "react-router-dom";

const AdminSidebar = ({ activeTab, setActivePage }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedSection, setExpandedSection] = useState(null);

  const adminMenuItems = [
    {
      title: "Dashboard",
      icon: <FiHome size={20} />,
      path: "/admin",
      tab: "dashboard"
    },
    {
      title: "Feedback Management",
      icon: <FiMessageSquare size={20} />,
      tab: "feedback",
      subItems: [
        { title: "All Feedback", path: "/admin/feedback/all", tab: "all-feedback" },
        { title: "Pending Review", path: "/admin/feedback/pending", tab: "pending-feedback" },
        { title: "Resolved Issues", path: "/admin/feedback/resolved", tab: "resolved-feedback" }
      ]
    },
    {
      title: "AI Insights",
      icon: <FiBarChart2 size={20} />,
      path: "/admin/aiinsights",
      tab: "aiinsights"
    },
    {
      title: "Settings",
      icon: <FiSettings size={20} />,
      path: "/admin/settings",
      tab: "settings"
    }
  ];

  const toggleSection = (title) => {
    setExpandedSection(expandedSection === title ? null : title);
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="md:hidden fixed top-4 left-4 z-50 bg-blue-600 text-white p-3 rounded-full shadow-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </motion.button>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex fixed top-0 left-0 bottom-0 w-64 bg-gradient-to-b from-gray-900 to-gray-800 text-white p-6 backdrop-blur-lg border-r border-gray-700 z-40 overflow-y-auto">
        <div className="w-full">
          {/* Logo/Sidebar Header */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mt-16">
              Admin Panel
            </h2>
          </div>

          {/* Navigation Menu */}
          <nav className="space-y-2">
            {adminMenuItems.map((item) => (
              <div key={item.title}>
                {item.subItems ? (
                  <>
                    <motion.button
                      whileHover={{ x: 5 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => toggleSection(item.title)}
                      className={`w-full flex items-center justify-between py-3 px-4 rounded-xl transition-all ${
                        activeTab === item.tab || 
                        item.subItems.some(sub => activeTab === sub.tab)
                          ? "bg-blue-600/90 shadow-lg"
                          : "hover:bg-gray-700/50"
                      }`}
                    >
                      <div className="flex items-center space-x-4">
                        <span className={`transition-colors ${
                          activeTab === item.tab ? "text-white" : "text-blue-400"
                        }`}>
                          {item.icon}
                        </span>
                        <span className="font-medium">{item.title}</span>
                      </div>
                      {expandedSection === item.title ? (
                        <FiChevronDown className="text-blue-300" />
                      ) : (
                        <FiChevronRight className="text-blue-300" />
                      )}
                    </motion.button>

                    {expandedSection === item.title && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="pl-14 space-y-2 mt-1"
                      >
                        {item.subItems.map((subItem) => (
                          <NavLink
                            key={subItem.title}
                            to={subItem.path}
                            onClick={() => setActivePage(subItem.tab)}
                            className={({ isActive }) => 
                              `block py-2 px-4 rounded-lg text-sm transition-all ${
                                isActive
                                  ? "bg-blue-700/30 text-blue-300"
                                  : "text-gray-400 hover:bg-gray-800/30 hover:text-white"
                              }`
                            }
                          >
                            {subItem.title}
                          </NavLink>
                        ))}
                      </motion.div>
                    )}
                  </>
                ) : (
                  <NavLink
                    to={item.path}
                    onClick={() => setActivePage(item.tab)}
                    className={({ isActive }) => 
                      `flex items-center py-3 px-4 rounded-xl transition-all ${
                        isActive
                          ? "bg-blue-600/90 shadow-lg"
                          : "hover:bg-gray-700/50"
                      }`
                    }
                  >
                    <span className={`mr-4 ${
                      activeTab === item.tab ? "text-white" : "text-blue-400"
                    }`}>
                      {item.icon}
                    </span>
                    <span className="font-medium">{item.title}</span>
                  </NavLink>
                )}
              </div>
            ))}
          </nav>
        </div>
      </aside>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.aside
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 left-0 w-72 h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white p-6 backdrop-blur-lg border-r border-gray-700 z-40 md:hidden"
            >
              <div className="flex flex-col h-full">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    Admin Panel
                  </h2>
                  <button 
                    onClick={() => setIsOpen(false)}
                    className="text-gray-400 hover:text-white"
                  >
                    <FiX size={24} />
                  </button>
                </div>

                <nav className="space-y-2 flex-1">
                  {adminMenuItems.map((item) => (
                    <div key={item.title}>
                      {item.subItems ? (
                        <>
                          <button
                            onClick={() => toggleSection(item.title)}
                            className={`w-full flex items-center justify-between py-3 px-4 rounded-xl transition-all ${
                              activeTab === item.tab || 
                              item.subItems.some(sub => activeTab === sub.tab)
                                ? "bg-blue-600/90 shadow-lg"
                                : "hover:bg-gray-700/50"
                            }`}
                          >
                            <div className="flex items-center space-x-4">
                              <span className={`transition-colors ${
                                activeTab === item.tab ? "text-white" : "text-blue-400"
                              }`}>
                                {item.icon}
                              </span>
                              <span className="font-medium">{item.title}</span>
                            </div>
                            {expandedSection === item.title ? (
                              <FiChevronDown className="text-blue-300" />
                            ) : (
                              <FiChevronRight className="text-blue-300" />
                            )}
                          </button>

                          {expandedSection === item.title && (
                            <div className="pl-14 space-y-2 mt-1">
                              {item.subItems.map((subItem) => (
                                <NavLink
                                  key={subItem.title}
                                  to={subItem.path}
                                  onClick={() => {
                                    setActivePage(subItem.tab);
                                    setIsOpen(false);
                                  }}
                                  className={({ isActive }) => 
                                    `block py-2 px-4 rounded-lg text-sm transition-all ${
                                      isActive
                                        ? "bg-blue-700/30 text-blue-300"
                                        : "text-gray-400 hover:bg-gray-800/30 hover:text-white"
                                    }`
                                  }
                                >
                                  {subItem.title}
                                </NavLink>
                              ))}
                            </div>
                          )}
                        </>
                      ) : (
                        <NavLink
                          to={item.path}
                          onClick={() => {
                            setActivePage(item.tab);
                            setIsOpen(false);
                          }}
                          className={({ isActive }) => 
                            `flex items-center py-3 px-4 rounded-xl transition-all ${
                              isActive
                                ? "bg-blue-600/90 shadow-lg"
                                : "hover:bg-gray-700/50"
                            }`
                          }
                        >
                          <span className={`mr-4 ${
                            activeTab === item.tab ? "text-white" : "text-blue-400"
                          }`}>
                            {item.icon}
                          </span>
                          <span className="font-medium">{item.title}</span>
                        </NavLink>
                      )}
                    </div>
                  ))}
                </nav>
              </div>
            </motion.aside>

            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
              onClick={() => setIsOpen(false)}
            />
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default AdminSidebar;