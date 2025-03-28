import React, { use, useEffect, useState } from "react";
import FeedbackCard from "../components/FeedbackCard";
import axios from "axios";
import FeedbackModal from "../components/FeedbackModel";

const MyFeedbacks = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userData"));

    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          "http://127.0.0.1:8000/api/feedback/user/",
          {
            headers: {
              Authorization: `Bearer ${user?.access_token}`,
            },
          }
        );
        setData(res.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleUpdateFeedback = (updatedFeedback) => {
    setFeedbacks((prev) =>
      prev.map((f) => (f.id === updatedFeedback.id ? updatedFeedback : f))
    );
  };

  console.log(data);
  return (
    <div className="p-10 max-w-4xl mx-auto bg-gray-800">
      <h2 className="text-3xl font-bold text-white">My Feedbacks</h2>
      {loading && <div className="mt-4">Loading...</div>}
      <div className="mt-6 space-y-6">
        {data.length > 0 ? (
          data.map((feedback, index) => (
            <>
              <FeedbackCard
                key={feedback.id}
                feedback={feedback}
                section="myfeedbacks"
              />
            </>
          ))
        ) : (
          <p className="text-gray-400">No feedbacks submitted yet.</p>
        )}
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
    </div>
  );
};

export default MyFeedbacks;