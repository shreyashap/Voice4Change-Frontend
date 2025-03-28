import React from "react";
import Home from "./pages/Home";
import Registration from "./components/Registeration";
import Login from "./components/Login";
import { Routes, Route } from "react-router-dom";
import CivilianDashboard from "./pages/Civilian";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/civilian" element={<CivilianDashboard />} />
      </Routes>
    </>
  );
}
