import React from "react";
import Home from "./pages/Home";
import Registration from "./components/Registeration";
import Login from "./components/Login";
import { Routes, Route } from "react-router-dom";
import CivilianDashboard from "./pages/Civilian";
import CivilianAuthProvider from "./components/CivilianAuthProvider";
import FeedbackModal from "./components/FeedbackModel";
import AdminDashboard from "./pages/AdminDashboard"
import Admin from "./pages/Admin"
import FeedbackManagement from "./pages/FeedbackManagement"
import AIInsights from "./pages/AiInsights"
import Settings from "./pages/Settings"
import AllFeedback from "./components/AllFeedback";
import PendingFeedback from "./components/Pending";
import ResolvedFeedback from "./components/Resolved";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/civilian"
          element={
            <CivilianAuthProvider>
              <CivilianDashboard />
            </CivilianAuthProvider>
          }
        />
        <Route
          path="/civilian-update/:id"
          element={
            <CivilianAuthProvider>
              <FeedbackModal />
            </CivilianAuthProvider>
          }
        />
        <Route
          path="/admin"
          element={
            <Admin/>
          }
        />
        <Route path="/admin/feedback/all" element={<AllFeedback />} />
        <Route path="/admin/feedback/pending" element={<PendingFeedback />} />
        <Route path="/admin/feedback/resolved" element={<ResolvedFeedback />} />
        <Route path="/admin/feedback-management" element={<FeedbackManagement />} />
        <Route path="/admin/aiinsights" element={<AIInsights />} />
        <Route path="/admin/settings" element={<Settings />} />
        </Routes>
    </>
  );
}
