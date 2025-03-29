import React, { useState, useEffect } from "react";
import { 
  FiActivity, 
  FiTrendingUp, 
  FiPieChart, 
  FiBarChart2,
  FiClock,
  FiDownload,
  FiRefreshCw,
  FiFilter,
  FiChevronDown
} from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

const AiInsights = () => {
  // Sample insights data
  const initialInsights = [
    {
      id: 1,
      title: "Top Policy Concerns",
      description: "Analysis of most frequently mentioned policy areas in feedback",
      data: [
        { name: "Infrastructure", value: 42 },
        { name: "Public Safety", value: 35 },
        { name: "Education", value: 22 },
        { name: "Healthcare", value: 18 },
        { name: "Environment", value: 15 }
      ],
      type: "pie",
      timeframe: "Last 30 days",
      updatedAt: new Date(Date.now() - 3600000 * 2)
    },
    {
      id: 2,
      title: "Sentiment Trend",
      description: "Average sentiment score of feedback over time",
      data: [
        { date: "Jan", value: 65 },
        { date: "Feb", value: 72 },
        { date: "Mar", value: 68 },
        { date: "Apr", value: 78 },
        { date: "May", value: 82 }
      ],
      type: "line",
      timeframe: "Last 6 months",
      updatedAt: new Date(Date.now() - 3600000 * 5)
    },
    {
      id: 3,
      title: "Response Time Analysis",
      description: "Average time to respond to feedback by category",
      data: [
        { category: "Infrastructure", days: 5.2 },
        { category: "Public Safety", days: 3.8 },
        { category: "Education", days: 7.1 },
        { category: "Healthcare", days: 6.5 },
        { category: "Environment", days: 4.9 }
      ],
      type: "bar",
      timeframe: "Last quarter",
      updatedAt: new Date(Date.now() - 3600000 * 24)
    }
  ];

  // State management
  const [insights, setInsights] = useState(initialInsights);
  const [activeFilter, setActiveFilter] = useState("All");
  const [timeframeFilter, setTimeframeFilter] = useState("All");
  const [sortBy, setSortBy] = useState("Recent");
  const [showSortOptions, setShowSortOptions] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Available filters and options
  const timeframes = [...new Set(initialInsights.map(i => i.timeframe))];
  const filters = ["All", "Trends", "Sentiment", "Performance"];
  const sortOptions = ["Recent", "Popular", "Alphabetical"];

  // Filter and sort insights
  useEffect(() => {
    let results = insights;
    
    if (activeFilter !== "All") {
      results = results.filter(i => {
        if (activeFilter === "Trends") return i.title.includes("Trend") || i.title.includes("Top");
        if (activeFilter === "Sentiment") return i.title.includes("Sentiment");
        if (activeFilter === "Performance") return i.title.includes("Time") || i.title.includes("Response");
        return true;
      });
    }
    
    if (timeframeFilter !== "All") {
      results = results.filter(i => i.timeframe === timeframeFilter);
    }
    
    results = results.sort((a, b) => {
      if (sortBy === "Recent") return b.updatedAt - a.updatedAt;
      if (sortBy === "Popular") return b.data.length - a.data.length;
      if (sortBy === "Alphabetical") return a.title.localeCompare(b.title);
      return 0;
    });
    
    setInsights(results);
  }, [activeFilter, timeframeFilter, sortBy]);

  const refreshData = () => {
    setIsRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setInsights([...initialInsights]);
      setIsRefreshing(false);
    }, 1000);
  };

  const exportToCSV = () => {
    alert("Exporting insights data to CSV...");
  };

  const formatDate = (date) => {
    const diffInHours = Math.floor((Date.now() - date) / 3600000);
    if (diffInHours < 24) return `${diffInHours} hour${diffInHours !== 1 ? 's' : ''} ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} day${diffInDays !== 1 ? 's' : ''} ago`;
  };

  const getChartIcon = (type) => {
    switch(type) {
      case "pie": return <FiPieChart className="text-purple-500" />;
      case "line": return <FiTrendingUp className="text-blue-500" />;
      case "bar": return <FiBarChart2 className="text-green-500" />;
      default: return <FiActivity className="text-gray-400" />;
    }
  };

  return (
    <div className="p-6 bg-gray-950 text-gray-100">
      {/* Header and Actions */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">AI Insights Dashboard</h1>
          <p className="text-gray-400">Powered by AI to analyze citizen feedback patterns</p>
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
            Export Data
          </button>
        </div>
      </div>

      {/* Filters Section */}
      <div className="bg-gray-900 rounded-xl p-4 mb-6 border border-gray-800">
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <div className="grid grid-cols-2 md:flex gap-3">
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
              value={timeframeFilter}
              onChange={(e) => setTimeframeFilter(e.target.value)}
            >
              <option value="All">All Timeframes</option>
              {timeframes.map(timeframe => (
                <option key={timeframe} value={timeframe}>{timeframe}</option>
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

      {/* Insights Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {insights.length > 0 ? (
          insights.map((insight) => (
            <motion.div 
              key={insight.id}
              whileHover={{ y: -5 }}
              className="bg-gray-900 rounded-xl border border-gray-800 p-5 hover:border-blue-500/50 transition-all"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-white">{insight.title}</h3>
                  <p className="text-sm text-gray-400">{insight.description}</p>
                </div>
                <div className="flex items-center">
                  {getChartIcon(insight.type)}
                </div>
              </div>

              {/* Chart Placeholder */}
              <div className="h-64 bg-gray-800/50 rounded-lg mb-4 flex items-center justify-center text-gray-400 border border-gray-700">
                <div className="text-center p-4">
                  <div className="text-xl mb-2">AI-Generated {insight.type} Chart</div>
                  <div className="text-sm">Visual representation of {insight.data.length} data points</div>
                </div>
              </div>

              <div className="flex justify-between items-center text-xs text-gray-500">
                <div className="flex items-center">
                  <FiClock className="mr-1" size={12} />
                  {formatDate(insight.updatedAt)}
                </div>
                <div className="bg-blue-500/10 text-blue-400 px-2 py-1 rounded">
                  {insight.timeframe}
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="col-span-2 py-12 text-center">
            <div className="flex flex-col items-center justify-center text-gray-400">
              <FiActivity className="text-4xl mb-3" />
              <p className="text-lg">No insights found matching your criteria</p>
              <button 
                className="mt-4 px-4 py-2 text-blue-400 hover:text-blue-300 text-sm bg-blue-500/10 rounded-lg"
                onClick={() => {
                  setActiveFilter("All");
                  setTimeframeFilter("All");
                }}
              >
                Clear all filters
              </button>
            </div>
          </div>
        )}
      </div>

      {/* AI Recommendations Section */}
      <div className="mt-8 bg-gray-900 rounded-xl border border-gray-800 p-5">
        <h2 className="text-xl font-semibold text-white mb-4">AI Recommendations</h2>
        <div className="space-y-4">
          <div className="p-4 bg-gray-800/50 rounded-lg border-l-4 border-blue-500">
            <h3 className="font-medium text-white mb-2">Prioritize Infrastructure Feedback</h3>
            <p className="text-sm text-gray-300">
              Analysis shows 42% of recent feedback relates to infrastructure issues with an average 
              sentiment score of 3.2/5. Consider allocating additional resources to this area.
            </p>
          </div>
          <div className="p-4 bg-gray-800/50 rounded-lg border-l-4 border-green-500">
            <h3 className="font-medium text-white mb-2">Improve Response Times</h3>
            <p className="text-sm text-gray-300">
              Education-related feedback has the longest average response time (7.1 days). 
              Implementing a dedicated team could reduce this by up to 40%.
            </p>
          </div>
          <div className="p-4 bg-gray-800/50 rounded-lg border-l-4 border-purple-500">
            <h3 className="font-medium text-white mb-2">Sentiment Improvement Opportunity</h3>
            <p className="text-sm text-gray-300">
              Public safety feedback shows improving sentiment (up 12% this quarter). 
              Highlight these successes in community communications.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiInsights;