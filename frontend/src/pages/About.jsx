import React from "react";
import { motion } from "framer-motion";
import { FaUniversity, FaSchool, FaGraduationCap } from "react-icons/fa";

const AboutMe = () => {
  return (
    <section style={{
      minHeight: "100vh",
      width: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "5rem 2rem",
      position: "relative",
      overflow: "hidden"
    }}>
      
      {/* Background glow for About */}
      <div style={{
        position: "absolute",
        top: "20%",
        right: "-10%",
        width: "600px",
        height: "600px",
        background: "radial-gradient(circle, rgba(0, 119, 255, 0.05) 0%, transparent 60%)",
        borderRadius: "50%",
        filter: "blur(60px)",
        pointerEvents: "none",
        zIndex: 0
      }} />

      <div style={{ width: "100%", maxWidth: "1200px", zIndex: 10 }}>
        
        {/* Title */}
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <motion.h2
            className="text-gradient-accent"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{ fontSize: "3.5rem", fontWeight: "800", marginBottom: "1rem", letterSpacing: "-1px" }}
          >
            About Me.
          </motion.h2>
          <motion.div 
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ height: "4px", width: "60px", background: "var(--accent-2)", margin: "0 auto", borderRadius: "2px" }}
          />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "clamp(1.5rem, 5vw, 3rem)" }}>
          
          {/* Left Column: About Me Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="glass-panel"
            style={{ padding: "clamp(1.5rem, 5vw, 3rem)", display: "flex", flexDirection: "column", gap: "1.5rem" }}
          >
            <h3 style={{ fontSize: "1.8rem", color: "#fff", fontWeight: "700" }}>
              My Journey
            </h3>
            <p style={{ fontSize: "1.1rem", color: "var(--muted)", lineHeight: 1.8 }}>
              Hi, I’m <strong style={{ color: "var(--accent-2)" }}>Darsh Upadhyay</strong> — a{" "}
              <strong style={{ color: "#fff" }}>Computer Science Engineer</strong> and{" "}
              <strong style={{ color: "#fff" }}>Aspiring Software Engineer</strong> with a strong foundation in core CS subjects, programming languages, and system-level concepts.
            </p>
            <p style={{ fontSize: "1.1rem", color: "var(--muted)", lineHeight: 1.8 }}>
              My knowledge spans data structures, operating systems, DBMS, computer networks, and software engineering, along with practical experience in web development, AI/ML, and Android technologies. I actively participate in technical projects and hackathons, including the Google AI Developing Hackathon in Mumbai, and aim to build scalable, real-world software solutions.
            </p>
          </motion.div>

          {/* Right Column: Education Timeline */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
          >
            <h3 style={{ fontSize: "1.8rem", color: "#fff", fontWeight: "700", marginBottom: "0.5rem" }}>
              Experience & Education
            </h3>

            {/* Experience Card 1 */}
            <motion.div
              whileHover={{ x: 10, backgroundColor: "rgba(255,255,255,0.05)" }}
              className="glass-panel"
              style={{ padding: "clamp(1.2rem, 4vw, 2rem)", display: "flex", gap: "1rem", alignItems: "flex-start", borderLeft: "4px solid var(--accent-2)" }}
            >
              <div style={{ background: "rgba(0, 119, 255, 0.1)", padding: "10px", borderRadius: "12px", color: "var(--accent-2)" }}>
                <FaGraduationCap size={24} />
              </div>
              <div>
                <h4 style={{ color: "#fff", fontSize: "1.2rem", fontWeight: "600", marginBottom: "0.3rem" }}>
                  Python Development Intern
                </h4>
                <p style={{ color: "var(--accent-2)", fontWeight: "500", marginBottom: "0.5rem", fontSize: "0.95rem" }}>
                  December 2025 - March 2026
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: "4px", fontSize: "0.9rem", color: "var(--muted)" }}>
                  <span>Pandas & NumPy | Machine Learning Basics</span>
                  <span>Classification Models | Streamlit App Deployment</span>
                  <span>Google Colab | Jupyter Notebook</span>
                </div>
              </div>
            </motion.div>

            {/* Education Card 1 */}
            <motion.div
              whileHover={{ x: 10, backgroundColor: "rgba(255,255,255,0.05)" }}
              className="glass-panel"
              style={{ padding: "clamp(1.2rem, 4vw, 2rem)", display: "flex", gap: "1rem", alignItems: "flex-start", borderLeft: "4px solid var(--accent-2)" }}
            >
              <div style={{ background: "rgba(0, 119, 255, 0.1)", padding: "10px", borderRadius: "12px", color: "var(--accent-2)" }}>
                <FaUniversity size={24} />
              </div>
              <div>
                <h4 style={{ color: "#fff", fontSize: "1.2rem", fontWeight: "600", marginBottom: "0.3rem" }}>
                  B.Tech in Computer Science Engineering
                </h4>
                <p style={{ color: "var(--accent-2)", fontWeight: "500", marginBottom: "0.5rem", fontSize: "0.95rem" }}>
                  Asha M. Tarsadia
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: "4px", fontSize: "0.9rem", color: "var(--muted)" }}>
                  <span>Expected Graduation: 2026 | CGPA: 8.26</span>
                  <span>Google Developer Hackathon Participant</span>
                </div>
              </div>
            </motion.div>

            {/* Education Card 2 */}
            <motion.div
              whileHover={{ x: 10, backgroundColor: "rgba(255,255,255,0.05)" }}
              className="glass-panel"
              style={{ padding: "clamp(1.2rem, 4vw, 2rem)", display: "flex", gap: "1rem", alignItems: "flex-start", borderLeft: "4px solid var(--accent-2)" }}
            >
              <div style={{ background: "rgba(0, 119, 255, 0.1)", padding: "10px", borderRadius: "12px", color: "var(--accent-2)" }}>
                <FaGraduationCap size={24} />
              </div>
              <div>
                <h4 style={{ color: "#fff", fontSize: "1.2rem", fontWeight: "600", marginBottom: "0.3rem" }}>
                  Diploma in Computer Engineering
                </h4>
                <p style={{ color: "var(--accent-2)", fontWeight: "500", marginBottom: "0.5rem", fontSize: "0.95rem" }}>
                  NG Patel Polytechnic
                </p>
                <div style={{ fontSize: "0.9rem", color: "var(--muted)" }}>
                  <span>CGPA: 7.88 | Year of Completion: 2024</span>
                </div>
              </div>
            </motion.div>

            {/* Education Card 3 */}
            <motion.div
              whileHover={{ x: 10, backgroundColor: "rgba(255,255,255,0.05)" }}
              className="glass-panel"
              style={{ padding: "clamp(1.2rem, 4vw, 2rem)", display: "flex", gap: "1rem", alignItems: "flex-start", borderLeft: "4px solid var(--accent-2)" }}
            >
              <div style={{ background: "rgba(0, 119, 255, 0.1)", padding: "10px", borderRadius: "12px", color: "var(--accent-2)" }}>
                <FaSchool size={24} />
              </div>
              <div>
                <h4 style={{ color: "#fff", fontSize: "1.2rem", fontWeight: "600", marginBottom: "0.3rem" }}>
                  Secondary Education (10th Grade)
                </h4>
                <p style={{ color: "var(--accent-2)", fontWeight: "500", marginBottom: "0.5rem", fontSize: "0.95rem" }}>
                  Vasishtha School
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: "4px", fontSize: "0.9rem", color: "var(--muted)" }}>
                  <span>Year of Graduation: 2021 | Percentage: 76.00%</span>
                  <span>Percentile Rank: 86.71</span>
                </div>
              </div>
            </motion.div>

          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default AboutMe;
