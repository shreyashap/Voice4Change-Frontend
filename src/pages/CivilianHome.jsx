import React, { useState } from "react";
import FeedbackCard from "../components/FeedbackCard";
import { FiAlertCircle, FiCheckCircle, FiClock, FiMapPin, FiPlus, FiSearch } from "react-icons/fi";
import { motion } from "framer-motion";

const feedbacks = [
  {
    id: 1,
    title: "Road Repair Needed",
    description: "Multiple large potholes on Main Street between 5th and 7th avenues causing vehicle damage and safety hazards",
    location: "Downtown District",
    createdAt: "2 days ago",
    status: "Pending",
    category: "Infrastructure",
    upvotes: 24,
    comments: 8,
  },
  {
    id: 2,
    title: "Streetlights Not Working",
    description: "Entire block of Maple Street has been dark for 5 nights straight, creating safety concerns for pedestrians",
    location: "City Center",
    createdAt: "1 week ago",
    status: "Resolved",
    category: "Public Safety",
    upvotes: 42,
    comments: 15,
  },
  {
    id: 3,
    title: "Park Maintenance Required",
    description: "Playground equipment at Riverside Park is broken and grass needs cutting in the picnic areas",
    location: "Riverside Neighborhood",
    createdAt: "3 days ago",
    status: "In Progress",
    category: "Parks & Recreation",
    upvotes: 18,
    comments: 5,
  },
];

const statusIcons = {
  Pending: <FiClock className="text-yellow-400" />,
  Resolved: <FiCheckCircle className="text-green-400" />,
  "In Progress": <FiAlertCircle className="text-blue-400" />,
};

const CivilianHome = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All Issues");

  const filteredFeedbacks = feedbacks.filter(feedback => 
    feedback.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    feedback.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    feedback.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    feedback.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filters = ["All Issues", "Your Area", "Infrastructure", "Public Safety", "Parks & Recreation"];

  return (
    <div className="p-6 md:p-8 bg-gray-900/80 backdrop-blur-sm rounded-xl border border-gray-800 shadow-2xl">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Community Feedback Hub
          </h2>
          <p className="text-gray-400 mt-2">
            Track and engage with local issues that matter to you
          </p>
        </motion.div>
        
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
            placeholder="Search issues..."
            className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </motion.div>
      </div>

      {/* Filter Chips */}
      <div className="flex flex-wrap gap-2 mb-6">
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

      {/* Feedback List Header */}
      <div className="flex items-center justify-between mb-4 px-2">
        <h3 className="text-lg font-semibold text-white">
          {searchQuery ? "Search Results" : "Recent Community Issues"} 
          {searchQuery && (
            <span className="text-gray-400 text-sm ml-2">
              ({filteredFeedbacks.length} results)
            </span>
          )}
        </h3>
        <div className="flex gap-2">
          <button className="text-xs px-3 py-1 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors">
            Sort by: Newest
          </button>
        </div>
      </div>

      {/* Feedback Cards */}
      <div className="space-y-4">
        {filteredFeedbacks.length > 0 ? (
          filteredFeedbacks.map((feedback) => (
            <motion.div
              key={feedback.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <FeedbackCard 
                feedback={feedback}
                statusIcon={statusIcons[feedback.status]}
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
            <p>No issues found matching your search</p>
            <button 
              className="mt-4 text-blue-400 hover:text-blue-300 text-sm"
              onClick={() => setSearchQuery("")}
            >
              Clear search
            </button>
          </motion.div>
        )}
      </div>

      {/* View More Button */}
      {!searchQuery && (
        <div className="mt-8 flex justify-center">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-6 py-2 border border-gray-700 rounded-full text-sm hover:bg-gray-800/50 transition-colors"
          >
            View All Community Issues
          </motion.button>
        </div>
      )}
    </div>
  );
};

export default CivilianHome;