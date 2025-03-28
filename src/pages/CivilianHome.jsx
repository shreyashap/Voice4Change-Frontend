// pages/Home.jsx
import React from "react";
import FeedbackCard from "../components/FeedbackCard";

const feedbacks = [
  {
    title: "Road Repair Needed",
    description: "Huge potholes causing accidents",
    location: "Downtown",
    createdAt: "2 days ago",
    status: "Pending",
  },
  {
    title: "Streetlights Not Working",
    description: "Entire street is dark at night",
    location: "City Center",
    createdAt: "1 week ago",
    status: "Resolved",
  },
];

const CivilianHome = () => {
  return (
    <div className="p-10 bg-slate-800 rounded-lg">
      <h2 className="text-3xl font-bold text-white">Community Feedback</h2>
      <div className="mt-6 space-y-6">
        {feedbacks.map((feedback, index) => (
          <FeedbackCard key={index} feedback={feedback} />
        ))}
      </div>
    </div>
  );
};

export default CivilianHome;
