import React from "react";
import FeedbackCard from "../components/FeedbackCard";

const myFeedbacks = [
  {
    title: "Garbage Collection Issue",
    description: "Garbage not picked up for weeks",
    location: "Sector 5",
    createdAt: "5 days ago",
    status: "Under Review",
  },
];

const MyFeedbacks = () => {
  return (
    <div className="p-10 max-w-4xl mx-auto bg-gray-800">
      <h2 className="text-3xl font-bold text-white">My Feedbacks</h2>
      <div className="mt-6 space-y-6">
        {myFeedbacks.length > 0 ? (
          myFeedbacks.map((feedback, index) => (
            <FeedbackCard key={index} feedback={feedback} />
          ))
        ) : (
          <p className="text-gray-400">No feedbacks submitted yet.</p>
        )}
      </div>
    </div>
  );
};

export default MyFeedbacks;
