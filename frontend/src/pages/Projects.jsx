import React from 'react'
import { motion } from 'framer-motion'
import { Github, ExternalLink } from 'lucide-react'

const PROJECTS = [
  {
    title: '🌾 AI Agriculture System',
    desc: 'An AI-based agriculture solution designed to assist farmers in data-driven decision making using machine learning techniques.',
    ss: '/gallery/AI AGRICULTURE.jpg', // Updated with actual project image
    tech: ['Python', 'Machine Learning', 'Data Analysis', 'AI Concepts'],
    live: '#',
    code: 'https://github.com/DarshUpadhyay12/AI-Agriculture' // Update with actual link
  },
  {
    title: '🐱🐶 Cats vs Dogs Image Classifier',
    desc: 'Deep learning powered image recognition model designed to classify cats and dogs with high confidence.',
    ss: '/gallery/classifier.jpg', // Updated with actual project image
    tech: ['Python', 'Deep Learning', 'Image Classification', 'Streamlit'],
    live: 'https://dogs-vs-cats-classifier-nvj4s7zj7whtzkq2sedaqe.streamlit.app/',
    code: 'https://github.com/DarshUpadhyay12/dogs-vs-cats-classifier'
  },
  {
    title: '📅 Smart Attendance System',
    desc: 'An automated attendance management system using modern web technologies to streamline tracking and reporting.',
    ss: '/gallery/smart-attendance.jpg', // Replace with your uploaded image name
    tech: ['React', 'Node.js', 'Express', 'MongoDB'],
    live: 'https://smart-attendance-system-1yyl.vercel.app/',
    code: 'https://github.com/DarshUpadhyay12/Smart-Attendance-System'
  },
  {
    title: '✋ Hand Gesture Control',
    desc: 'An innovative application that uses computer vision to map hand gestures to system commands. Check HOW_TO_RUN.txt in the repo to run it locally.',
    ss: '/gallery/Hand Gesture.jpg', // Updated image
    tech: ['Python', 'OpenCV', 'MediaPipe', 'Computer Vision'],
    live: '',
    code: 'https://github.com/DarshUpadhyay12/Hand-Gesture-Control'
  },
  {
    title: '📄 AI Resume Analyzer',
    desc: 'An intelligent tool that analyzes resumes using AI to provide actionable feedback, parsing, and scoring.',
    ss: '/gallery/darsh photo-1.jpg', // Placeholder, user should upload actual image
    tech: ['React', 'Python', 'NLP', 'Machine Learning'],
    live: 'https://ai-resume-analyzer-sooty-nine.vercel.app/',
    code: 'https://github.com/DarshUpadhyay12/ai-resume-analyzer'
  },
]

export default function Projects() {

  return (
    <motion.section
      className="container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      id="projects"
      style={{
        paddingTop: "4rem",
        paddingBottom: "4rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}
    >
      <div style={{ textAlign: "center", marginBottom: "4rem" }}>
        <motion.h2
          className="text-gradient-accent"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ fontSize: "3.5rem", fontWeight: "800", marginBottom: "1rem", letterSpacing: "-1px" }}
        >
          Selected Projects.
        </motion.h2>
        <p style={{ color: "var(--muted)", fontSize: "1.1rem", maxWidth: "600px", margin: "0 auto" }}>
          A collection of my major works blending AI innovation, research, and seamless web experiences.
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "3rem", width: "100%", maxWidth: "1000px" }}>
        {PROJECTS.map((p, idx) => {
          const isEven = idx % 2 === 0;
          return (
            <motion.div
              key={idx}
              className="glass-panel"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
              whileHover={{ y: -5, boxShadow: "0 30px 60px rgba(0,0,0,0.6), 0 0 40px rgba(0, 119, 255, 0.1)" }}
              style={{
                display: "flex",
                flexDirection: isEven ? "row" : "row-reverse",
                overflow: "hidden",
                padding: "0",
                height: "auto",
                minHeight: "340px",
                flexWrap: "wrap"
              }}
            >
              {/* Image Side */}
              <div style={{ flex: "1 1 400px", position: "relative", overflow: "hidden" }}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  style={{ width: "100%", height: "100%" }}
                >
                  <img
                    src={p.ss}
                    alt={p.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      minHeight: "300px",
                      objectFit: "cover",
                    }}
                  />
                  <div style={{
                    position: "absolute",
                    inset: 0,
                    background: isEven 
                      ? "linear-gradient(90deg, transparent 60%, rgba(10, 12, 16, 0.8) 100%)"
                      : "linear-gradient(-90deg, transparent 60%, rgba(10, 12, 16, 0.8) 100%)",
                    pointerEvents: "none"
                  }} />
                </motion.div>
              </div>

              {/* Content Side */}
              <div style={{ 
                flex: "1 1 350px", 
                padding: "2.5rem", 
                display: "flex", 
                flexDirection: "column", 
                justifyContent: "center",
                background: "rgba(10, 12, 16, 0.6)"
              }}>
                <h3 style={{ fontSize: "1.8rem", color: "#fff", marginBottom: "1rem", fontWeight: "700" }}>
                  {p.title}
                </h3>
                <p style={{ fontSize: "1rem", color: "var(--muted)", marginBottom: "1.5rem", lineHeight: 1.6 }}>
                  {p.desc}
                </p>

                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem", marginBottom: "2rem" }}>
                  {p.tech.map((t) => (
                    <span
                      key={t}
                      style={{
                        background: "rgba(0, 119, 255, 0.1)",
                        border: "1px solid rgba(0, 119, 255, 0.2)",
                        padding: "6px 14px",
                        borderRadius: "20px",
                        fontSize: "0.85rem",
                        color: "var(--accent-2)",
                        fontWeight: "500"
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div style={{ display: "flex", gap: "1rem", marginTop: "auto" }}>
                  {p.live && p.live !== '#' && (
                    <motion.a
                      href={p.live}
                      target="_blank"
                      rel="noreferrer"
                      whileHover={{ scale: 1.05, background: "var(--accent)" }}
                      whileTap={{ scale: 0.95 }}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "0.5rem",
                        background: "var(--accent-2)",
                        color: "#fff",
                        padding: "10px 20px",
                        borderRadius: "12px",
                        fontSize: "0.95rem",
                        fontWeight: "600",
                        textDecoration: "none",
                        boxShadow: "0 10px 20px rgba(0, 119, 255, 0.2)",
                        flex: 1
                      }}
                    >
                      <ExternalLink size={18} /> Live Demo
                    </motion.a>
                  )}
                  
                  <motion.a
                    href={p.code}
                    target="_blank"
                    rel="noreferrer"
                    whileHover={{ scale: 1.05, background: "rgba(255,255,255,0.1)" }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "0.5rem",
                      background: "rgba(255,255,255,0.05)",
                      color: "#fff",
                      padding: "10px 20px",
                      borderRadius: "12px",
                      fontSize: "0.95rem",
                      fontWeight: "600",
                      border: "1px solid var(--glass-border)",
                      textDecoration: "none",
                      flex: 1
                    }}
                  >
                    <Github size={18} /> Source
                  </motion.a>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.section>
  )
}
