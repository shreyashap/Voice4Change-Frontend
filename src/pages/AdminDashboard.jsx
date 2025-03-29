import React, { useState, useEffect } from "react";
import { 
  FiAlertCircle, 
  FiCheckCircle, 
  FiClock, 
  FiSearch, 
  FiFilter,
  FiMessageSquare
} from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import FeedbackCard from "../components/AdminFeedbackCard";
import AdminSidebar from "../components/AdminSidebar";
import AdminNavbar from "../components/Navbar";
import axios from "axios";

const statusIcons = {
  PENDING: <FiClock className="text-yellow-400" />,
  "IN PROGRESS": <FiAlertCircle className="text-blue-400" />,
  RESOLVED: <FiCheckCircle className="text-green-400" />,
};

const statusColors = {
  PENDING: "bg-yellow-500/10 text-yellow-400",
  "IN PROGRESS": "bg-blue-500/10 text-blue-400",
  RESOLVED: "bg-green-500/10 text-green-400",
};

const AdminDashboard = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [sortBy, setSortBy] = useState("Newest");
  const [showSortOptions, setShowSortOptions] = useState(false);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    inProgress: 0,
    resolved: 0,
  });

  const [user, setUser] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userData"));
    if (user) setUser(user);

    const fetchFeedbacks = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          "http://127.0.0.1:8000/api/feedback/admin/",
          {
            headers: {
              Authorization: `Bearer ${user?.access_token}`,
            },
          }
        );

        console.log(res.data);
        setFeedbacks(res.data);
        const newDate = formatDate(res.data.created_at);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchFeedbacks();
    updateStats();
  }, []);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userData"));
    if (user) setUser(user);

    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          "http://127.0.0.1:8000/api/admin-dashboard/dashboard",
          {
            headers: {
              Authorization: `Bearer ${user?.access_token}`,
            },
          }
        );

        console.log(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const updateStats = () => {
    setStats({
      total: feedbacks.length,
      pending: feedbacks.filter((f) => f.status === "Pending").length,
      inProgress: feedbacks.filter((f) => f.status === "In Progress").length,
      resolved: feedbacks.filter((f) => f.status === "Resolved").length,
    });
  };

  const filters = ["All", "Pending", "In Progress", "Resolved"];
  const sortOptions = ["Newest", "Oldest", "Most Urgent", "Most Popular"];

  const filteredFeedbacks = feedbacks
    .filter(
      (feedback) =>
        (activeFilter === "All" || feedback.status === activeFilter) &&
        (feedback.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          feedback.description
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          feedback.location.toLowerCase().includes(searchQuery.toLowerCase()))
    )
    .sort((a, b) => {
      if (sortBy === "Newest") return b.createdAt - a.createdAt;
      if (sortBy === "Oldest") return a.createdAt - b.createdAt;
      if (sortBy === "Most Urgent") {
        // Custom urgency logic (e.g., pending first, then by upvotes)
        if (a.status === "Pending" && b.status !== "Pending") return -1;
        if (b.status === "Pending" && a.status !== "Pending") return 1;
        return b.upvotes - a.upvotes;
      }
      if (sortBy === "Most Popular") return b.upvotes - a.upvotes;
      return 0;
    });

  const formatDate = (date) => {
    const diffInHours = Math.floor((Date.now() - date) / 3600000);
    if (diffInHours < 24)
      return `${diffInHours} hour${diffInHours !== 1 ? "s" : ""} ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} day${diffInDays !== 1 ? "s" : ""} ago`;
  };

  const updateStatus = (id, newStatus) => {
    setFeedbacks((prev) =>
      prev.map((f) => (f.id === id ? { ...f, status: newStatus } : f))
    );
    updateStats();
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-950 text-white">
      <AdminNavbar isAdmin={true} />

      <div className="flex flex-1 pt-16">
        {" "}
        {/* Changed mt-16 to pt-16 */}
        <AdminSidebar activeTab={activeTab} setActivePage={setActiveTab} />
        <main className="flex-1 p-6 md:ml-64 overflow-auto">
          {" "}
          {/* Added overflow-auto */}
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <StatCard
              icon={<FiMessageSquare className="text-blue-400" />}
              title="Total Feedback"
              value={stats.total}
              color="bg-blue-500/10"
            />
            <StatCard
              icon={<FiClock className="text-yellow-400" />}
              title="Pending"
              value={stats.pending}
              color="bg-yellow-500/10"
            />
            <StatCard
              icon={<FiAlertCircle className="text-blue-400" />}
              title="In Progress"
              value={stats.inProgress}
              color="bg-blue-500/10"
            />
            <StatCard
              icon={<FiCheckCircle className="text-green-400" />}
              title="Resolved"
              value={stats.resolved}
              color="bg-green-500/10"
            />
          </div>
          <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="relative w-full md:w-96"
            >
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search feedback..."
                className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </motion.div>

            <div className="flex gap-4">
              <div className="flex flex-wrap gap-2">
                {filters.map((filter) => (
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
                  <span>Sort: {sortBy}</span>
                </motion.button>
                <AnimatePresence>
                  {showSortOptions && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-1 w-48 bg-gray-800 rounded-lg shadow-lg z-10 border border-gray-700 overflow-hidden"
                    >
                      {sortOptions.map((option) => (
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
          {loading && <div className="tex-lg">Loading...</div>}
          <div className="space-y-4">
            <AnimatePresence>
              {feedbacks.length > 0 &&
                feedbacks.map((feedback) => (
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
                      }}
                      statusIcon={statusIcons[feedback.status]}
                      statusColor={statusColors[feedback.status]}
                      showActions={true}
                      adminView={true}
                      onStatusChange={(newStatus) =>
                        updateStatus(feedback.id, newStatus)
                      }
                    />
                  </motion.div>
                ))}
            </AnimatePresence>
          </div>
        </main>
      </div>
    </div>
  );
};


const StatCard = ({ icon, title, value, color }) => (
  <motion.div
    whileHover={{ y: -5 }}
    className={`p-4 rounded-xl border border-gray-800 ${color} backdrop-blur-sm`}
  >
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-300">{title}</p> {/* Changed text-gray-400 to text-gray-300 */}
        <p className="text-2xl font-bold text-white">{value}</p> {/* Added text-white */}
      </div>
      <div className="text-3xl">
        {icon}
      </div>
    </div>
  </motion.div>
);

export default AdminDashboard;