import React, { act, useState } from "react";
import Sidebar from "../components/Sidebar";
import Home from "../pages/CivilianHome";
import CreateFeedback from "../pages/NewFeedback";
import MyFeedbacks from "../pages/MyFeedbacks";

const CivilianDashboard = () => {
  const [activeTab, setActiveTab] = useState("myfeedbacks");

  if (activeTab === "logout") {
    localStorage.removeItem("userData");
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-r from-blue-900 via-purple-800 to-indigo-900 text-white ">
      <Sidebar activeTab={activeTab} setActivePage={setActiveTab} />

      <main className="p-10 w-full animate-fadeIn flex justify-center items-center">
        <div className="w-full max-w-3xl bg-opacity-90 rounded-lg shadow-2xl">
          {activeTab === "home" && <Home />}
          {activeTab === "create" && <CreateFeedback />}
          {activeTab === "myfeedbacks" && <MyFeedbacks />}
        </div>
      </main>
    </div>
  );
};

export default CivilianDashboard;
