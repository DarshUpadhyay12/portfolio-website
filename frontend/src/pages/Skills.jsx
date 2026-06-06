import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import "./Skills.css";

const SKILLS = [
  { name: "C", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg" },
  { name: "C++", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" },
  { name: "Java", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
  { name: "Python", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  { name: "JavaScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
  { name: "PHP", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg" },
  { name: "C#", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg" },
  { name: "HTML", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
  { name: "CSS", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
  { name: "SQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
  { name: "Git", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
];

const ROWS = [
  [
    { title: "Programming Languages", items: ["C", "C++", "Java", "Python", "JavaScript", "PHP", "C#"] },
    { title: "Web Technologies", items: ["HTML", "CSS", "JavaScript", "PHP"] },
    { title: "Databases", items: ["SQL"] },
    { title: "Tools", items: ["Git", "Google Colab", "Jupyter Notebook", "Streamlit"] },
  ],
  [
    {
      title: "Core Computer Science",
      items: [
        "Data Structures & Algorithms",
        "Operating Systems",
        "DBMS",
        "Computer Networks",
        "Software Engineering",
      ],
    },
    {
      title: "AI & ML",
      items: [
        "Artificial Intelligence (Fundamentals)",
        "Machine Learning (Basics)",
        "Data Preprocessing",
        "Classification Models",
        "Pandas & NumPy",
      ],
    },
    {
      title: "Other Technologies",
      items: [
        "Android Development",
        "Flutter",
        "Cloud Computing",
        "Cybersecurity",
        "IoT",
      ],
    },
  ],
  [
    {
      title: "Professional Skills",
      items: [
        "Teamwork",
        "Time Management",
        "Quick Learning",
        "Discipline",
        "Communication"
      ]
    }
  ]
];

export default function Skills() {
  const stageRef = useRef();

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const circles = Array.from(stage.querySelectorAll(".skill-circle"));
    const rect = stage.getBoundingClientRect();
    const placed = [];

    const isOverlapping = (x, y, size) =>
      placed.some((p) => {
        const dx = p.x - x;
        const dy = p.y - y;
        return Math.sqrt(dx * dx + dy * dy) < p.size / 2 + size / 2 + 40;
      });

    circles.forEach((circle) => {
      const size = circle.offsetWidth;
      let x, y, tries = 0;
      do {
        x = Math.random() * (rect.width - size - 20);
        y = Math.random() * (rect.height - size - 20);
        tries++;
      } while (isOverlapping(x, y, size) && tries < 150);

      placed.push({ x, y, size });
      circle.style.left = `${x}px`;
      circle.style.top = `${y}px`;

      const dx = (Math.random() - 0.5) * 100;
      const dy = (Math.random() - 0.5) * 100;
      circle.animate(
        [{ transform: "translate(0, 0)" }, { transform: `translate(${dx}px, ${dy}px)` }],
        {
          duration: 5000 + Math.random() * 2000,
          direction: "alternate",
          iterations: Infinity,
          easing: "ease-in-out",
        }
      );
    });
  }, []);

  return (
    <section className="container" id="skills" style={{ paddingTop: "4rem", paddingBottom: "4rem" }}>
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "3rem" }}>
        <motion.h2
          className="text-gradient-accent"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ fontSize: "3.5rem", fontWeight: "800", marginBottom: "1rem", letterSpacing: "-1px" }}
        >
          My Arsenal.
        </motion.h2>
        <p style={{ color: "var(--muted)", fontSize: "1.1rem", maxWidth: "600px", margin: "0 auto" }}>
          The tools, technologies, and concepts I use to bring ideas to life.
        </p>
      </div>

      {/* Floating Orbs Stage */}
      <motion.div
        className="skills-stage"
        ref={stageRef}
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        {SKILLS.map((s, i) => (
          <motion.div
            key={s.name}
            className="skill-circle"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.08, duration: 0.6, ease: "easeOut" }}
          >
            <img src={s.logo} alt={s.name} />
            <span>{s.name}</span>
          </motion.div>
        ))}
      </motion.div>

      {/* Skills Grid */}
      <div className="skills-table">
        {ROWS.map((row, rowIndex) => (
          <div key={rowIndex} className="skills-row">
            {row.map((col, colIndex) => (
              <motion.div
                key={col.title}
                className="glass-panel"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                whileHover={{ y: -5, boxShadow: "0 20px 40px rgba(0,0,0,0.4), 0 0 20px rgba(0, 119, 255, 0.1)" }}
                transition={{ duration: 0.5, delay: colIndex * 0.1 }}
                style={{
                  padding: "2rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem"
                }}
              >
                <h3 style={{ fontSize: "1.3rem", fontWeight: "700", color: "var(--accent-2)", margin: 0 }}>
                  {col.title}
                </h3>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.8rem" }}>
                  {col.items.map((item, i) => (
                    <motion.li 
                      key={i} 
                      whileHover={{ x: 5, color: "#fff" }}
                      style={{ 
                        color: "var(--muted)", 
                        fontSize: "1rem",
                        display: "flex",
                        alignItems: "center",
                        gap: "8px"
                      }}
                    >
                      <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "var(--accent-2)" }} />
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
