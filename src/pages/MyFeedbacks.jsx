import React, { useState } from "react";
import FeedbackCard from "../components/FeedbackCard";
import { FiAlertCircle, FiCheckCircle, FiClock, FiPlus, FiSearch, FiFilter } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

const myFeedbacks = [
  {
    id: 1,
    title: "Garbage Collection Issue",
    description: "Garbage not picked up for weeks in our neighborhood, causing hygiene concerns and bad odor",
    location: "Sector 5, Green Valley",
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
    status: "Under Review",
    category: "Sanitation",
    upvotes: 12,
    comments: 3,
    attachments: 1,
  },
  {
    id: 2,
    title: "Park Maintenance Request",
    description: "Broken playground equipment and overgrown bushes in the community park",
    location: "Central Park, Sector 5",
    createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000), // 2 weeks ago
    status: "In Progress",
    category: "Public Spaces",
    upvotes: 24,
    comments: 7,
    attachments: 2,
  },
  {
    id: 3,
    title: "Street Light Repair",
    description: "Multiple street lights not working on Maple Street, creating safety issues at night",
    location: "Maple Street, Sector 5",
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    status: "Resolved",
    category: "Infrastructure",
    upvotes: 8,
    comments: 2,
    attachments: 0,
  },
];

// Helper function to format date as "X days ago"
const formatDate = (date) => {
  const diffInDays = Math.floor((Date.now() - date) / (1000 * 60 * 60 * 24));
  return `${diffInDays} day${diffInDays !== 1 ? 's' : ''} ago`;
};

const statusIcons = {
  "Under Review": <FiClock className="text-yellow-400" />,
  "In Progress": <FiAlertCircle className="text-blue-400" />,
  "Resolved": <FiCheckCircle className="text-green-400" />,
};

const statusColors = {
  "Under Review": "bg-yellow-500/10 text-yellow-400",
  "In Progress": "bg-blue-500/10 text-blue-400",
  "Resolved": "bg-green-500/10 text-green-400",
};

const MyFeedbacks = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [sortBy, setSortBy] = useState("Newest");
  const [showSortOptions, setShowSortOptions] = useState(false);

  const filters = ["All", "Under Review", "In Progress", "Resolved"];
  const sortOptions = ["Newest", "Oldest", "Most Upvoted"];

  const filteredFeedbacks = myFeedbacks
    .filter(feedback => 
      (activeFilter === "All" || feedback.status === activeFilter) &&
      (feedback.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
       feedback.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
       feedback.location.toLowerCase().includes(searchQuery.toLowerCase()))
    )
    .sort((a, b) => {
      if (sortBy === "Newest") return b.createdAt - a.createdAt;
      if (sortBy === "Oldest") return a.createdAt - b.createdAt;
      if (sortBy === "Most Upvoted") return b.upvotes - a.upvotes;
      return 0;
    });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="p-6 md:p-8 max-w-6xl mx-auto bg-gray-900/80 backdrop-blur-sm rounded-xl border border-gray-800 shadow-2xl"
    >
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <motion.h2 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
          >
            My Submitted Feedbacks
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 mt-2"
          >
            Track the status of your community feedback submissions
          </motion.p>
        </div>
        
        {/* Search Box */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative w-full md:w-64"
        >
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiSearch className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search your feedbacks..."
            className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </motion.div>
      </div>

      {/* Filter and Sort Controls */}
      <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
        <div className="flex flex-wrap gap-2">
          {filters.map(filter => (
            <motion.button
              key={filter}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-3 py-1 rounded-full text-xs transition-colors ${
                activeFilter === filter 
                  ? "bg-blue-600 text-white" 
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </motion.button>
          ))}
        </div>

        <div className="relative">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-3 py-1 bg-gray-800 rounded-lg text-sm text-gray-300 hover:bg-gray-700"
            onClick={() => setShowSortOptions(!showSortOptions)}
          >
            <FiFilter />
            <span>Sort by: {sortBy}</span>
          </motion.button>
          {showSortOptions && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute right-0 mt-1 w-40 bg-gray-800 rounded-lg shadow-lg z-10 border border-gray-700 overflow-hidden"
            >
              {sortOptions.map(option => (
                <button
                  key={option}
                  className={`block w-full text-left px-4 py-2 text-sm ${
                    sortBy === option 
                      ? "bg-blue-600 text-white" 
                      : "text-gray-300 hover:bg-gray-700"
                  }`}
                  onClick={() => {
                    setSortBy(option);
                    setShowSortOptions(false);
                  }}
                >
                  {option}
                </button>
              ))}
            </motion.div>
          )}
        </div>
      </div>

      {/* Feedback Cards */}
      <div className="space-y-4">
        <AnimatePresence>
          {filteredFeedbacks.length > 0 ? (
            filteredFeedbacks.map((feedback) => (
              <motion.div
                key={feedback.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <FeedbackCard 
                  feedback={{
                    ...feedback,
                    createdAt: formatDate(feedback.createdAt) // Format date for display
                  }}
                  statusIcon={statusIcons[feedback.status]}
                  statusColor={statusColors[feedback.status]}
                  showActions={true}
                />
              </motion.div>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12 text-gray-400"
            >
              <FiSearch className="mx-auto text-4xl mb-4" />
              <p>No feedbacks found matching your criteria</p>
              <button 
                className="mt-4 text-blue-400 hover:text-blue-300 text-sm"
                onClick={() => {
                  setSearchQuery("");
                  setActiveFilter("All");
                }}
              >
                Clear filters
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Submit New Feedback Button */}
      <motion.div 
        className="mt-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg text-white shadow-lg hover:from-blue-700 hover:to-purple-700 transition-all"
        >
          <FiPlus />
          Submit New Feedback
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default MyFeedbacks;