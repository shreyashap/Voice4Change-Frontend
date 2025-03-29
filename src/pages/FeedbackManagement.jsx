import React, { useState, useEffect } from "react";
import { 
  FiAlertCircle, 
  FiCheckCircle, 
  FiClock, 
  FiSearch, 
  FiFilter,
  FiEdit2,
  FiSave,
  FiX,
  FiChevronDown,
  FiMessageSquare,
  FiUser,
  FiMapPin,
  FiDownload,
  FiRefreshCw
} from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

const statusIcons = {
  "Pending": <FiClock className="text-yellow-500" />,
  "In Progress": <FiAlertCircle className="text-blue-500" />,
  "Resolved": <FiCheckCircle className="text-green-500" />,
};

const statusColors = {
  "Pending": "bg-yellow-500/10 text-yellow-500 border-yellow-500/30",
  "In Progress": "bg-blue-500/10 text-blue-500 border-blue-500/30",
  "Resolved": "bg-green-500/10 text-green-500 border-green-500/30",
};

const FeedbackManagement = () => {
  // Sample feedback data
  const initialFeedbacks = [
    {
      id: 1,
      title: "Road Repair Needed",
      description: "Multiple potholes on Main Street causing safety hazards",
      location: "Downtown District",
      category: "Infrastructure",
      policy: "Urban Mobility Plan",
      createdAt: new Date(Date.now() - 3600000 * 2),
      status: "Pending",
      upvotes: 24,
      comments: 8,
      user: { name: "John D.", email: "john@example.com" },
      response: "",
      isEditing: false
    },
    {
      id: 2,
      title: "Streetlights Out",
      description: "Entire block of Maple Street has no lighting",
      location: "Residential Zone",
      category: "Public Safety",
      policy: "Neighborhood Safety Initiative",
      createdAt: new Date(Date.now() - 3600000 * 5),
      status: "In Progress",
      upvotes: 42,
      comments: 15,
      user: { name: "Sarah M.", email: "sarah@example.com" },
      response: "Work order created with public works department",
      isEditing: false
    },
    {
      id: 3,
      title: "Park Maintenance",
      description: "Broken playground equipment at Riverside Park",
      location: "Riverside Area",
      category: "Public Spaces",
      policy: "Parks Improvement Program",
      createdAt: new Date(Date.now() - 3600000 * 24),
      status: "Resolved",
      upvotes: 18,
      comments: 5,
      user: { name: "Mike T.", email: "mike@example.com" },
      response: "Equipment repaired and inspected for safety",
      isEditing: false
    },
  ];

  // State management
  const [feedbacks, setFeedbacks] = useState(initialFeedbacks);
  const [filteredFeedbacks, setFilteredFeedbacks] = useState(initialFeedbacks);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [policyFilter, setPolicyFilter] = useState("All");
  const [sortBy, setSortBy] = useState("Newest");
  const [showSortOptions, setShowSortOptions] = useState(false);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    inProgress: 0,
    resolved: 0
  });
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Get unique categories and policies for filters
  const categories = [...new Set(initialFeedbacks.map(f => f.category))];
  const policies = [...new Set(initialFeedbacks.map(f => f.policy))];
  const filters = ["All", "Pending", "In Progress", "Resolved"];
  const sortOptions = ["Newest", "Oldest", "Most Urgent", "Most Popular"];

  // Filter and sort feedbacks
  useEffect(() => {
    let results = feedbacks;
    
    if (activeFilter !== "All") results = results.filter(f => f.status === activeFilter);
    if (categoryFilter !== "All") results = results.filter(f => f.category === categoryFilter);
    if (policyFilter !== "All") results = results.filter(f => f.policy === policyFilter);
    
    if (searchQuery) {
      const term = searchQuery.toLowerCase();
      results = results.filter(f => 
        f.title.toLowerCase().includes(term) || 
        f.description.toLowerCase().includes(term) ||
        f.location.toLowerCase().includes(term) ||
        f.user.name.toLowerCase().includes(term) ||
        (f.response && f.response.toLowerCase().includes(term))
      );
    }
    
    results = results.sort((a, b) => {
      if (sortBy === "Newest") return b.createdAt - a.createdAt;
      if (sortBy === "Oldest") return a.createdAt - b.createdAt;
      if (sortBy === "Most Urgent") {
        if (a.status === "Pending" && b.status !== "Pending") return -1;
        if (b.status === "Pending" && a.status !== "Pending") return 1;
        return b.upvotes - a.upvotes;
      }
      if (sortBy === "Most Popular") return b.upvotes - a.upvotes;
      return 0;
    });
    
    setFilteredFeedbacks(results);
    updateStats(results);
  }, [feedbacks, searchQuery, activeFilter, categoryFilter, policyFilter, sortBy]);

  const updateStats = (feedbacksToCount = feedbacks) => {
    setStats({
      total: feedbacksToCount.length,
      pending: feedbacksToCount.filter(f => f.status === "Pending").length,
      inProgress: feedbacksToCount.filter(f => f.status === "In Progress").length,
      resolved: feedbacksToCount.filter(f => f.status === "Resolved").length
    });
  };

  const refreshData = () => {
    setIsRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setFeedbacks([...initialFeedbacks]);
      setIsRefreshing(false);
    }, 1000);
  };

  const toggleEdit = (id) => {
    setFeedbacks(feedbacks.map(f => 
      f.id === id ? { ...f, isEditing: !f.isEditing } : f
    ));
  };

  const handleFieldChange = (id, field, value) => {
    setFeedbacks(feedbacks.map(f => 
      f.id === id ? { ...f, [field]: value } : f
    ));
  };

  const changeStatus = (id, newStatus) => {
    setFeedbacks(feedbacks.map(f => 
      f.id === id ? { ...f, status: newStatus } : f
    ));
  };

  const formatDate = (date) => {
    const diffInHours = Math.floor((Date.now() - date) / 3600000);
    if (diffInHours < 24) return `${diffInHours} hour${diffInHours !== 1 ? 's' : ''} ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} day${diffInDays !== 1 ? 's' : ''} ago`;
  };

  const exportToCSV = () => {
    // Implement CSV export functionality
    alert("Exporting data to CSV...");
  };

  return (
    <div className="p-6 bg-gray-950 text-gray-100">
      {/* Header and Stats */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Feedback Management</h1>
          <p className="text-gray-400">Monitor and respond to citizen feedback</p>
        </div>
        <div className="flex space-x-3 mt-4 md:mt-0">
          <button 
            onClick={refreshData}
            className="flex items-center px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm transition-colors"
          >
            <FiRefreshCw className={`mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh
          </button>
          <button 
            onClick={exportToCSV}
            className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm transition-colors"
          >
            <FiDownload className="mr-2" />
            Export CSV
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {Object.entries(stats).map(([key, value]) => (
          <StatCard 
            key={key}
            title={key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
            value={value}
            status={key === 'total' ? null : key}
          />
        ))}
      </div>

      {/* Search and Filter Section */}
      <div className="bg-gray-900 rounded-xl p-4 mb-6 border border-gray-800">
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search feedback by title, description, location..."
              className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex flex-col md:flex-row gap-3">
            <div className="grid grid-cols-2 md:flex gap-2">
              <select
                className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={activeFilter}
                onChange={(e) => setActiveFilter(e.target.value)}
              >
                {filters.map(filter => (
                  <option key={filter} value={filter}>{filter}</option>
                ))}
              </select>

              <select
                className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                <option value="All">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>

              <select
                className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={policyFilter}
                onChange={(e) => setPolicyFilter(e.target.value)}
              >
                <option value="All">All Policies</option>
                {policies.map(policy => (
                  <option key={policy} value={policy}>{policy}</option>
                ))}
              </select>
            </div>

            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm text-white"
                onClick={() => setShowSortOptions(!showSortOptions)}
              >
                <FiFilter />
                <span>Sort: {sortBy}</span>
                <FiChevronDown className={`transition-transform ${showSortOptions ? 'rotate-180' : ''}`} />
              </motion.button>
              <AnimatePresence>
                {showSortOptions && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 mt-1 w-48 bg-gray-800 rounded-lg shadow-lg z-10 border border-gray-700 overflow-hidden"
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
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* Feedback Table */}
      <div className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden shadow-lg">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-800">
            <thead className="bg-gray-800">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Feedback</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Category/Policy</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">User</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Response</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-gray-900 divide-y divide-gray-800">
              {filteredFeedbacks.length > 0 ? (
                filteredFeedbacks.map((feedback) => (
                  <tr key={feedback.id} className="hover:bg-gray-800/50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-800 flex items-center justify-center group-hover:bg-blue-500/10 transition-colors">
                          <FiMessageSquare className="text-blue-400 group-hover:text-blue-300" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-white">{feedback.title}</div>
                          <div className="text-sm text-gray-400 line-clamp-2">{feedback.description}</div>
                          <div className="text-xs text-gray-500 mt-1 flex items-center">
                            <FiMapPin className="mr-1" size={12} />
                            {feedback.location} • {formatDate(feedback.createdAt)}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-white">{feedback.category}</div>
                      <div className="text-xs text-blue-400">{feedback.policy}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gray-800 flex items-center justify-center group-hover:bg-blue-500/10 transition-colors">
                          <FiUser className="text-gray-400 group-hover:text-blue-300" size={14} />
                        </div>
                        <div className="ml-3">
                          <div className="text-sm text-white">{feedback.user.name}</div>
                          <div className="text-xs text-gray-400">{feedback.user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {feedback.isEditing ? (
                        <select
                          className="bg-gray-800 border border-gray-700 rounded px-3 py-1 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                          value={feedback.status}
                          onChange={(e) => handleFieldChange(feedback.id, 'status', e.target.value)}
                        >
                          <option value="Pending">Pending</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Resolved">Resolved</option>
                        </select>
                      ) : (
                        <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${statusColors[feedback.status]} border`}>
                          {statusIcons[feedback.status]}
                          <span className="ml-1 capitalize">{feedback.status}</span>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 max-w-xs">
                      {feedback.isEditing ? (
                        <textarea
                          className="w-full p-2 bg-gray-800 border border-gray-700 rounded text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                          value={feedback.response}
                          onChange={(e) => handleFieldChange(feedback.id, 'response', e.target.value)}
                          placeholder="Enter official response..."
                          rows={3}
                        />
                      ) : (
                        <div className="text-sm text-gray-300">
                          {feedback.response || <span className="text-gray-500 italic">No response yet</span>}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        {feedback.isEditing ? (
                          <>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => toggleEdit(feedback.id)}
                              className="text-green-500 hover:text-green-400 p-1.5 rounded-lg hover:bg-green-500/10"
                              title="Save"
                            >
                              <FiSave />
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => toggleEdit(feedback.id)}
                              className="text-gray-400 hover:text-gray-300 p-1.5 rounded-lg hover:bg-gray-700"
                              title="Cancel"
                            >
                              <FiX />
                            </motion.button>
                          </>
                        ) : (
                          <>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => toggleEdit(feedback.id)}
                              className="text-blue-400 hover:text-blue-300 p-1.5 rounded-lg hover:bg-blue-500/10"
                              title="Edit"
                            >
                              <FiEdit2 />
                            </motion.button>
                            <div className="flex items-center space-x-1">
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => changeStatus(feedback.id, 'Pending')}
                                className={`p-1.5 rounded-lg ${feedback.status === 'Pending' ? 'bg-yellow-500/20 text-yellow-400' : 'hover:bg-gray-700 text-gray-400'}`}
                                title="Set to Pending"
                              >
                                <FiClock size={14} />
                              </motion.button>
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => changeStatus(feedback.id, 'In Progress')}
                                className={`p-1.5 rounded-lg ${feedback.status === 'In Progress' ? 'bg-blue-500/20 text-blue-400' : 'hover:bg-gray-700 text-gray-400'}`}
                                title="Set to In Progress"
                              >
                                <FiAlertCircle size={14} />
                              </motion.button>
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => changeStatus(feedback.id, 'Resolved')}
                                className={`p-1.5 rounded-lg ${feedback.status === 'Resolved' ? 'bg-green-500/20 text-green-400' : 'hover:bg-gray-700 text-gray-400'}`}
                                title="Set to Resolved"
                              >
                                <FiCheckCircle size={14} />
                              </motion.button>
                            </div>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center justify-center text-gray-400">
                      <FiSearch className="text-4xl mb-3" />
                      <p className="text-lg">No feedback found matching your criteria</p>
                      <button 
                        className="mt-4 px-4 py-2 text-blue-400 hover:text-blue-300 text-sm bg-blue-500/10 rounded-lg"
                        onClick={() => {
                          setSearchQuery("");
                          setActiveFilter("All");
                          setCategoryFilter("All");
                          setPolicyFilter("All");
                        }}
                      >
                        Clear all filters
                      </button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, status }) => {
  const iconMap = {
    "total": <FiMessageSquare className="text-blue-500" />,
    "pending": <FiClock className="text-yellow-500" />,
    "inProgress": <FiAlertCircle className="text-blue-500" />,
    "resolved": <FiCheckCircle className="text-green-500" />,
  };

  const colorMap = {
    "total": "bg-blue-500/10 border-blue-500/30",
    "pending": "bg-yellow-500/10 border-yellow-500/30",
    "inProgress": "bg-blue-500/10 border-blue-500/30",
    "resolved": "bg-green-500/10 border-green-500/30",
  };

  return (
    <motion.div
      whileHover={{ y: -3 }}
      className={`p-4 rounded-xl border ${colorMap[status] || 'bg-gray-800/50 border-gray-700'} transition-all`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-300">{title}</p>
          <p className="text-2xl font-bold text-white">{value}</p>
        </div>
        <div className="text-2xl">
          {iconMap[status] || <FiMessageSquare className="text-gray-400" />}
        </div>
      </div>
    </motion.div>
  );
};

export default FeedbackManagement;