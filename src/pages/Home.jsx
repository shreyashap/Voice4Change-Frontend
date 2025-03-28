import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  FaUsers,
  FaChartBar,
  FaGlobe,
  FaCogs,
  FaRobot,
  FaCommentDots,
  FaBrain,
  FaThumbsUp,
} from "react-icons/fa";
import FeatureCard from "../components/FeatureCard";
import { Link } from "react-router-dom";

function Home() {
  const particleRef = useRef(null);

  useEffect(() => {
    const moveParticles = () => {
      if (particleRef.current) {
        const particles = particleRef.current.children;
        for (let i = 0; i < particles.length; i++) {
          const x = Math.random() * window.innerWidth;
          const y = Math.random() * window.innerHeight;
          particles[i].style.transform = `translate(${x}px, ${y}px)`;
        }
      }
    };

    const interval = setInterval(moveParticles, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gray-950 text-white min-h-screen font-sans">
      {/* 🚀 Navbar */}
      <nav className="flex justify-between items-center p-6  bg-gradient-to-r from-blue-900 via-purple-800 to-indigo-900 shadow-lg">
        <h1 className="text-2xl font-bold tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-purple-300">
          CivicAI
        </h1>

        <div className="flex gap-4">
          <Link to="/login">
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition">
              Login
            </button>
          </Link>
          <Link to="/register">
            <button className="px-6 py-2 bg-transparent text-white rounded-lg shadow-lg transition outline-2 outline-white hover:bg-white hover:text-blue-600">
              Register
            </button>
          </Link>
        </div>
      </nav>
      {/* 🚀 Hero Section */}

      <section className="relative flex flex-col md:flex-row items-center justify-between text-center md:text-left py-32 px-8 bg-gradient-to-r from-blue-900 via-purple-800 to-indigo-900 shadow-lg overflow-hidden">
        {/* 🚀 Floating Particles */}
        <div className="absolute inset-0 overflow-hidden" ref={particleRef}>
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white rounded-full opacity-20"
              initial={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
              }}
              animate={{
                x: [null, Math.random() * window.innerWidth],
                y: [null, Math.random() * window.innerHeight],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
          ))}
        </div>

        {/* 🚀 Moving Gradient Light Overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-blue-300 via-transparent to-purple-300 opacity-10"
          animate={{ opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 6, repeat: Infinity }}
        ></motion.div>

        {/* 🚀 Left Side - Text Content */}
        <motion.div
          className="max-w-2xl z-10"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight text-white">
            AI-Powered <span className="text-blue-300">Civic Feedback</span>
          </h1>
          <p className="mt-4 text-lg text-gray-300">
            Leverage AI-driven insights to bridge the gap between citizens and
            policymakers.
          </p>
          <div className="mt-6 flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6">
            <motion.button
              className="px-8 py-3 bg-white text-blue-900 font-semibold rounded-lg shadow-lg hover:bg-gray-200 transition"
              whileHover={{ scale: 1.05 }}
            >
              Get Started
            </motion.button>
            <motion.button
              className="px-8 py-3 border border-white text-white font-semibold rounded-lg shadow-lg hover:bg-white hover:text-blue-900 transition"
              whileHover={{ scale: 1.05 }}
            >
              Learn More
            </motion.button>
          </div>
        </motion.div>

        {/* 🚀 Right Side - Hero Illustration */}
        <motion.div
          className="w-full md:w-1/2 mt-10 md:mt-0 z-10"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <img
            src="https://images.pexels.com/photos/3184428/pexels-photo-3184428.jpeg"
            alt="Civic AI Feedback"
            className="w-full rounded-lg shadow-lg"
          />
        </motion.div>
      </section>

      {/* 🚀 Why AI-Powered Feedback Matters? */}
      <section className="relative flex flex-col items-center justify-center text-center py-32 px-8 bg-gradient-to-r from-blue-900 via-purple-800 to-indigo-900 shadow-lg">
        <motion.div
          className="max-w-3xl"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-5xl font-extrabold leading-tight text-white">
            Why <span className="text-blue-300">AI-Powered Feedback</span>{" "}
            Matters?
          </h2>
          <p className="mt-4 text-lg text-gray-300">
            AI bridges the gap between policymakers and citizens by analyzing
            large-scale feedback, ensuring transparency, and driving better
            decisions.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-6">
            <FeatureCard
              icon={<FaUsers className="text-blue-400 text-5xl" />}
              title="Public Engagement"
              description="Making citizen participation effortless and impactful."
            />
            <FeatureCard
              icon={<FaChartBar className="text-purple-400 text-5xl" />}
              title="Real-time Data Insights"
              description="Providing structured analytics for policymakers."
            />
            <FeatureCard
              icon={<FaGlobe className="text-green-400 text-5xl" />}
              title="Transparency & Trust"
              description="Bringing trust between governments & citizens with AI."
            />
          </div>
        </motion.div>
      </section>

      {/* 🚀 AI-Powered Insights */}
      <section className="relative flex flex-col items-center justify-center text-center py-32 px-8 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 shadow-lg">
        <motion.div
          className="max-w-3xl"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-5xl font-extrabold leading-tight text-white">
            How <span className="text-blue-300">It Works?</span>
          </h2>
          <p className="mt-4 text-lg text-gray-300">
            Our AI-driven platform streamlines public feedback, making
            governance more efficient and responsive.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-6">
            <FeatureCard
              icon={<FaCommentDots className="text-yellow-400 text-5xl" />}
              title="Collect Data"
              description="Gather citizen feedback from multiple sources."
            />
            <FeatureCard
              icon={<FaBrain className="text-pink-400 text-5xl" />}
              title="Analyze with AI"
              description="Process and categorize data for policymakers."
            />
            <FeatureCard
              icon={<FaThumbsUp className="text-green-400 text-5xl" />}
              title="Make Better Decisions"
              description="Use insights to shape impactful policies."
            />
          </div>
        </motion.div>
      </section>

      {/* 🚀 Footer */}
      <footer className="bg-gradient-to-r from-blue-800 to-purple-900 text-white text-center py-16">
        <h2 className="text-3xl font-semibold">
          Join the Future of Policy Making
        </h2>
        <p className="mt-3 text-gray-300">
          Start using AI for better governance.
        </p>

        <p className="mt-6 text-gray-300">
          © 2025 CivicAI. All Rights Reserved.
        </p>
      </footer>
    </div>
  );
}

export default Home;
