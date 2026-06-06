import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Expected paths for result images inside the `public/results` folder
const RESULTS_DATA = {
  "10th": [
    {
      title: "10th Standard Marksheet",
      org: "State Board",
      date: "2021",
      img: "/results/10th.jpg",
      link: "/results/10th.jpg",
    },
  ],
  "diploma": [
    { title: "Diploma Semester 1", org: "GTU", date: "Sem 1", img: "/results/diploma-sem1.jpg", link: "/results/diploma-sem1.jpg" },
    { title: "Diploma Semester 2", org: "GTU", date: "Sem 2", img: "/results/diploma-sem2.jpg", link: "/results/diploma-sem2.jpg" },
    { title: "Diploma Semester 3", org: "GTU", date: "Sem 3", img: "/results/diploma-sem3.jpg", link: "/results/diploma-sem3.jpg" },
    { title: "Diploma Semester 4", org: "GTU", date: "Sem 4", img: "/results/diploma-sem4.jpg", link: "/results/diploma-sem4.jpg" },
    { title: "Diploma Semester 5", org: "GTU", date: "Sem 5", img: "/results/diploma-sem5.jpg", link: "/results/diploma-sem5.jpg" },
    { title: "Diploma Semester 6", org: "GTU", date: "Sem 6", img: "/results/diploma-sem6.jpg", link: "/results/diploma-sem6.jpg" },
  ],
  "btech": [
    { title: "BTech Semester 3", org: "University", date: "Sem 3", img: "/results/btech-sem3.jpg", link: "/results/btech-sem3.jpg" },
    { title: "BTech Semester 4", org: "University", date: "Sem 4", img: "/results/btech-sem4.jpg", link: "/results/btech-sem4.jpg" },
    { title: "BTech Semester 5", org: "University", date: "Sem 5", img: "/results/btech-sem5.jpg", link: "/results/btech-sem5.jpg" },
  ],
};

export default function Results() {
  const [tab, setTab] = useState("10th");
  const [selectedResult, setSelectedResult] = useState(null);

  return (
    <section className="container" style={{ padding: "40px 0" }}>
      <div className="card" style={{ background: "#111", borderRadius: 12, padding: 24 }}>
        <h2 style={{ fontSize: "1.8rem", color: "#fff", marginBottom: 4 }}>Academic Results 📊</h2>
        <p className="lead" style={{ color: "#aaa" }}>
          View my academic marksheets and performance over the years.
        </p>

        {/* Tabs */}
        <div style={{ display: "flex", gap: 10, marginTop: 16, flexWrap: "wrap" }}>
          {["10th", "diploma", "btech"].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={tab === t ? "tab active" : "tab"}
              style={{
                padding: "8px 18px",
                borderRadius: 8,
                border: "none",
                cursor: "pointer",
                background: tab === t ? "#007bff" : "#333",
                color: "#fff",
                fontWeight: 500,
                transition: "0.3s",
              }}
            >
              {t === "10th" ? "10th Grade" : t === "diploma" ? "Diploma (Sem 1-6)" : "BTech (Sem 3-5)"}
            </button>
          ))}
        </div>

        {/* Results Grid */}
        <div
          className="certs-grid"
          style={{
            marginTop: 28,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 20,
          }}
        >
          <AnimatePresence mode="wait">
            {RESULTS_DATA[tab].map((c, idx) => (
              <motion.div
                key={c.title}
                className="cert card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                whileHover={{
                  scale: 1.03,
                  boxShadow: "0 0 15px rgba(0, 123, 255, 0.4)",
                }}
                style={{
                  background: "#1a1a1a",
                  borderRadius: 12,
                  padding: 16,
                  color: "#fff",
                }}
              >
                <img
                  src={c.img}
                  alt={c.title}
                  style={{
                    width: "100%",
                    height: 160,
                    borderRadius: 10,
                    objectFit: "cover",
                    marginBottom: 12,
                    backgroundColor: "#222" // Fallback color while missing
                  }}
                  onError={(e) => { e.target.src = "https://via.placeholder.com/400x300/222222/cccccc?text=Image+Missing" }}
                />
                <strong style={{ fontSize: 16 }}>{c.title}</strong>
                <div className="muted" style={{ fontSize: 13, color: "#bbb" }}>
                  {c.org} • {c.date}
                </div>

                <div style={{ marginTop: 12 }}>
                  <button
                    className="btn"
                    onClick={() => setSelectedResult(c)}
                    style={{
                      background: "#007bff",
                      border: "none",
                      color: "white",
                      borderRadius: 6,
                      padding: "6px 14px",
                      cursor: "pointer",
                    }}
                  >
                    View
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Modal Preview */}
      <AnimatePresence>
        {selectedResult && (
          <motion.div
            className="modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "rgba(0,0,0,0.8)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 1000,
            }}
            onClick={() => setSelectedResult(null)}
          >
            <motion.img
              src={selectedResult.img}
              alt={selectedResult.title}
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              style={{
                maxWidth: "90%",
                maxHeight: "85%",
                borderRadius: 10,
                boxShadow: "0 0 25px rgba(255,255,255,0.2)",
              }}
              onClick={(e) => e.stopPropagation()}
              onError={(e) => { e.target.src = "https://via.placeholder.com/800x600/222222/cccccc?text=Image+Missing" }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
