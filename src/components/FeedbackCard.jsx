import React, { useState } from "react";
import { FaHeart, FaRegHeart, FaComment } from "react-icons/fa";

const FeedbackCard = ({ feedback }) => {
  const [likes, setLikes] = useState(0);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  const handleLike = () => setLikes(likes + 1);

  const handleComment = () => {
    if (comment.trim()) {
      setComments([...comments, comment]);
      setComment("");
    }
  };

  return (
    <div
      className="p-6 bg-gradient-to-br from-[#2A2B3A] to-[#1E1E2E] 
rounded-lg shadow-lg border border-gray-700 hover:scale-105 
transition-transform duration-300 hover:shadow-blue-500/30"
    >
      {/* Feedback Title & Description */}
      <h3 className="text-xl font-semibold text-blue-400">{feedback.title}</h3>
      <p className="text-gray-300 mt-2">{feedback.description}</p>

      {/* Additional Details */}
      <div className="mt-3 text-sm text-gray-400 flex justify-between">
        <span>📍 {feedback.location}</span>
        <span>🕒 {feedback.createdAt}</span>
      </div>

      {/* Status Tag */}
      <span
        className={`inline-block px-3 py-1 mt-3 text-xs font-bold uppercase rounded-full ${
          feedback.status === "Resolved"
            ? "bg-green-600"
            : "bg-yellow-600 text-gray-100"
        }`}
      >
        {feedback.status}
      </span>

      {/* Like & Comment Section */}
      <div className="mt-4 flex items-center gap-4">
        {/* Like Button */}
        <button
          onClick={handleLike}
          className="flex items-center gap-2 text-gray-400 hover:text-red-400 transition"
        >
          {likes > 0 ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
          <span>{likes}</span>
        </button>

        {/* Comment Button */}
        <button className="flex items-center gap-2 text-gray-400 hover:text-blue-400 transition">
          <FaComment />
          <span>{comments.length}</span>
        </button>
      </div>

      {/* Comment Input */}
      <div className="mt-4">
        <input
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write a comment..."
          className="w-full p-2 bg-gray-800 border border-gray-700 rounded-md text-white"
        />
        <button
          onClick={handleComment}
          className="mt-2 w-full bg-blue-600 py-2 rounded-md text-white hover:bg-blue-700 transition"
        >
          Add Comment
        </button>
      </div>

      {/* Display Comments */}
      {comments.length > 0 && (
        <div className="mt-4 border-t border-gray-700 pt-4">
          <h4 className="text-sm font-semibold text-gray-400">Comments</h4>
          <ul className="mt-2 space-y-2">
            {comments.map((cmt, index) => (
              <li
                key={index}
                className="text-gray-300 text-sm bg-gray-800 p-2 rounded-md"
              >
                {cmt}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FeedbackCard;
