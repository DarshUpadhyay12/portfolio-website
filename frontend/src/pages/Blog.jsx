import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ThumbsUp, ThumbsDown } from "lucide-react";
import "./blog.css";

export default function Blog() {
  const defaultPosts = [
    {
      id: 1,
      title: "My Journey into AI & Machine Learning",
      text: "As a BTech CSE student, diving into AI/ML has been transformative. My AI Agriculture System project opened my eyes to how technology can solve real-world problems in farming. The combination of Python, data analysis, and machine learning algorithms feels like the perfect blend of logic and creativity.",
    },
    {
      id: 2,
      title: "From Diploma to BTech: A Learning Odyssey",
      text: "Transitioning from my Diploma in Computer Engineering to BTech CSE has been challenging but rewarding. Each semester brings new concepts - from data structures to deep learning. The key lesson? Never stop learning, and always connect theory with practical applications.",
    },
    {
      id: 3,
      title: "Why I Love Competitive Programming",
      text: "Solving algorithmic problems on platforms like LeetCode has sharpened my problem-solving skills immensely. It's not just about writing code - it's about thinking efficiently, optimizing solutions, and learning from each challenge. Every solved problem is a victory!",
    },
    {
      id: 4,
      title: "The Future of Technology in Agriculture",
      text: "Working on AI-powered farming solutions has made me passionate about AgriTech. Imagine farmers using smartphone apps to get crop disease predictions or optimize irrigation. This is where my technical skills meet my desire to create meaningful impact in society.",
    },
    {
      id: 5,
      title: "Balancing Code and College Life",
      text: "Being a student developer means juggling assignments, projects, hackathons, and personal growth. Time management and consistent learning are key. Whether it's debugging code at 2 AM or presenting projects, every experience builds character and skills.",
    },
    {
      id: 6,
      title: "Open Source Contributions: Learning by Doing",
      text: "Contributing to open source projects has been invaluable. It's not just about code - it's about collaboration, code reviews, and learning from experienced developers. My GitHub repositories reflect my growth journey in software development.",
    },
  ];

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const savedVotes = JSON.parse(localStorage.getItem("du_blog_votes") || "{}");
    const votedByUser = JSON.parse(localStorage.getItem("du_blog_voted") || "{}");
    const withVotes = defaultPosts.map((p) => ({
      ...p,
      agree: savedVotes[p.id]?.agree || 0,
      disagree: savedVotes[p.id]?.disagree || 0,
      userVote: votedByUser[p.id] || null,
    }));
    setPosts(withVotes);
  }, []);

  function vote(id, type) {
    const votedByUser = JSON.parse(localStorage.getItem("kd_blog_voted") || "{}");
    if (votedByUser[id]) return;

    const next = posts.map((p) =>
      p.id === id ? { ...p, [type]: p[type] + 1, userVote: type } : p
    );
    setPosts(next);

    const votes = Object.fromEntries(
      next.map((p) => [p.id, { agree: p.agree, disagree: p.disagree }])
    );
    localStorage.setItem("du_blog_votes", JSON.stringify(votes));
    localStorage.setItem(
      "du_blog_voted",
      JSON.stringify({ ...votedByUser, [id]: type })
    );
  }

  return (
    <motion.section
      className="blog-section"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <motion.h2
        className="blog-title"
        initial={{ y: -15, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        📝 My Blog
      </motion.h2>
      <p className="blog-sub">
        Personal thoughts, experiences, and reflections — feel free to react!
      </p>

      <div className="blog-grid">
        {posts.map((p, idx) => (
          <motion.div
            key={p.id}
            className="blog-post"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: idx * 0.15 }}
            whileHover={{
              scale: 1.02,
              boxShadow: "0 0 20px rgba(255,255,255,0.1)",
            }}
          >
            <h3 className="post-title">{p.title}</h3>
            <p className="post-text">{p.text}</p>

            <div className="vote-container">
              <motion.button
                onClick={() => vote(p.id, "agree")}
                disabled={!!p.userVote}
                whileTap={{ scale: 0.85 }}
                whileHover={{ scale: 1.15 }}
                className={`vote-btn-circle agree ${
                  p.userVote === "agree" ? "active" : ""
                }`}
              >
                <ThumbsUp size={20} />
                <motion.span
                  key={p.agree}
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="vote-count"
                >
                  {p.agree}
                </motion.span>
              </motion.button>

              <motion.button
                onClick={() => vote(p.id, "disagree")}
                disabled={!!p.userVote}
                whileTap={{ scale: 0.85 }}
                whileHover={{ scale: 1.15 }}
                className={`vote-btn-circle disagree ${
                  p.userVote === "disagree" ? "active" : ""
                }`}
              >
                <ThumbsDown size={20} />
                <motion.span
                  key={p.disagree}
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="vote-count"
                >
                  {p.disagree}
                </motion.span>
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
