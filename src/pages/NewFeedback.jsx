import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import React from "react";

const feedbackSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  feedbackType: z.enum([
    "Complaint",
    "Suggestion",
    "General Comment",
    "Policy Idea",
  ]),
  category: z.enum([
    "INFRASTRUCTURE",
    "TRANSPORTATION",
    "EDUCATION",
    "HEALTHCARE",
    "SANITATION",
    "WATER",
    "ELECTRICITY",
    "PUBLIC_SAFETY",
    "ENVIRONMENT",
    "HOUSING",
    "TAXATION",
    "WELFARE",
    "EMPLOYMENT",
    "AGRICULTURE",
    "TOURISM",
    "CULTURE",
    "OTHER",
  ]),
  location: z.string().min(3, "Location must be at least 3 characters"),
  status: z.enum([
    "Submitted",
    "Pending",
    "Under Review",
    "Resolved",
    "Rejected",
  ]),
  isAnonymous: z.boolean(),
  urgency: z.enum(["Low", "Medium", "High"]),
  feedbackImage: z.any().optional(),
});

export default function CreateFeedback() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(feedbackSchema),
  });

  const onSubmit = (data) => {
    console.log("Submitted Feedback:", data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-10 rounded-lg">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="backdrop-blur-md bg-opacity-10 p-10 rounded-xl shadow-2xl w-full max-w-lg"
      >
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          📢 Submit Feedback
        </h2>

        {/* Title */}
        <div className="mb-4">
          <label className="block text-white">Title</label>
          <input
            {...register("title")}
            className="w-full p-3 bg-gray-700 rounded-lg outline-none text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500"
            placeholder="Enter title"
          />
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title.message}</p>
          )}
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="block text-white">Description</label>
          <textarea
            {...register("description")}
            className="w-full p-3 bg-gray-700 rounded-lg outline-none text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500"
            placeholder="Enter detailed feedback"
          />
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description.message}</p>
          )}
        </div>

        {/* Feedback Type */}
        <div className="mb-4">
          <label className="block text-white">Feedback Type</label>
          <select
            {...register("feedbackType")}
            className="w-full p-3 bg-gray-700 rounded-lg outline-none text-white focus:ring-2 focus:ring-blue-500"
          >
            {["Complaint", "Suggestion", "General Comment", "Policy Idea"].map(
              (type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              )
            )}
          </select>
        </div>

        {/* Category */}
        <div className="mb-4">
          <label className="block text-white">Category</label>
          <select
            {...register("category")}
            className="w-full p-3 bg-gray-700 rounded-lg outline-none text-white focus:ring-2 focus:ring-blue-500"
          >
            {[
              "INFRASTRUCTURE",
              "TRANSPORTATION",
              "EDUCATION",
              "HEALTHCARE",
              "SANITATION",
              "WATER",
              "ELECTRICITY",
              "PUBLIC_SAFETY",
              "ENVIRONMENT",
              "HOUSING",
              "TAXATION",
              "WELFARE",
              "EMPLOYMENT",
              "AGRICULTURE",
              "TOURISM",
              "CULTURE",
              "OTHER",
            ].map((category) => (
              <option key={category} value={category}>
                {category.replace("_", " ")}
              </option>
            ))}
          </select>
        </div>

        {/* Location */}
        <div className="mb-4">
          <label className="block text-white">Location</label>
          <input
            {...register("location")}
            className="w-full p-3 bg-gray-700 rounded-lg outline-none text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500"
            placeholder="Enter location"
          />
          {errors.location && (
            <p className="text-red-500 text-sm">{errors.location.message}</p>
          )}
        </div>

        {/* Status */}
        <div className="mb-4">
          <label className="block text-white">Status</label>
          <select
            {...register("status")}
            className="w-full p-3 bg-gray-700 rounded-lg outline-none text-white focus:ring-2 focus:ring-blue-500"
          >
            {[
              "Submitted",
              "Pending",
              "Under Review",
              "Resolved",
              "Rejected",
            ].map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        {/* Is Anonymous */}
        <div className="mb-4 flex items-center">
          <input
            type="checkbox"
            {...register("isAnonymous")}
            className="mr-2 accent-blue-500"
          />
          <label className="text-white">Submit as Anonymous</label>
        </div>

        {/* Urgency */}
        <div className="mb-4">
          <label className="block text-white">Urgency</label>
          <select
            {...register("urgency")}
            className="w-full p-3 bg-gray-700 rounded-lg outline-none text-white focus:ring-2 focus:ring-blue-500"
          >
            {["Low", "Medium", "High"].map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>
        </div>

        {/* Feedback Image Upload */}
        <div className="mb-4">
          <label className="block text-white">Upload Image</label>
          <input
            type="file"
            {...register("feedbackImage")}
            className="w-full p-3 bg-gray-700 rounded-lg outline-none text-white focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full p-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg text-white text-lg font-semibold shadow-md hover:opacity-90 transition-all duration-300"
        >
          🚀 Submit Feedback
        </button>
      </form>
    </div>
  );
}
