import React, { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { label: "Home", to: "/" },
  { label: "Projects", to: "/projects" },
  { label: "Gallery", to: "/gallery" },
  { label: "Skills", to: "/skills" },
  { label: "Results", to: "/results" },
  { label: "Certificates", to: "/certificates" },
  { label: "Resume", to: "/resume" },
  { label: "About Me", to: "/about" },
  { label: "Contact", to: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const navRef = useRef(null);
  const linksRef = useRef(null);

  // Check if links overflow nav width (to show hamburger)
  const checkOverflow = () => {
    if (!navRef.current || !linksRef.current) return;
    setShowButton(linksRef.current.scrollWidth > navRef.current.offsetWidth);
  };

  useEffect(() => {
    checkOverflow();
    window.addEventListener("resize", checkOverflow);
    return () => window.removeEventListener("resize", checkOverflow);
  }, []);

  return (
    <div style={{ display: "flex", justifyContent: "center", width: "100%", position: "sticky", top: "20px", zIndex: 100, padding: "0 20px" }}>
      {/* --- Floating Navbar --- */}
      <motion.nav
        ref={navRef}
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0.8rem 1.5rem",
          border: "1px solid var(--glass-border)",
          background: "rgba(10, 12, 16, 0.65)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderRadius: "50px",
          width: "100%",
          maxWidth: "1100px",
          boxShadow: "0 20px 40px rgba(0,0,0,0.4), 0 0 20px rgba(0, 119, 255, 0.05)",
        }}
      >
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <motion.div
            className="logo"
            whileHover={{ scale: 1.1, rotate: 5 }}
            style={{
              fontWeight: "800",
              fontSize: "1.2rem",
              background: "linear-gradient(135deg, var(--accent-2), var(--accent))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              cursor: "pointer"
            }}
          >
            DU.
          </motion.div>
          <div style={{ display: "flex", flexDirection: "column", justifySelf: "center" }}>
            <h1 style={{ margin: 0, fontSize: 14, fontWeight: "600", letterSpacing: "0.5px" }}>Darsh</h1>
          </div>
        </div>

        {/* Desktop links */}
        <div
          ref={linksRef}
          style={{
            display: showButton ? "none" : "flex",
            justifyContent: "center",
            gap: "1.5rem",
            alignItems: "center",
          }}
        >
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end
              style={{
                position: "relative",
                fontSize: "0.9rem",
                textDecoration: "none",
                color: "var(--muted)",
                fontWeight: 500,
                letterSpacing: "0.3px",
                padding: "0.4rem 0.6rem",
              }}
            >
              {({ isActive }) => (
                <motion.div
                  whileHover={{ color: "#fff" }}
                  transition={{ duration: 0.2 }}
                  style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
                >
                  <motion.span animate={{ color: isActive ? "#fff" : "var(--muted)" }}>
                    {l.label}
                  </motion.span>
                  {isActive && (
                    <motion.div
                      layoutId="nav-indicator"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      style={{
                        position: "absolute",
                        bottom: "-4px",
                        width: "6px",
                        height: "6px",
                        borderRadius: "50%",
                        backgroundColor: "var(--accent-2)",
                        boxShadow: "0 0 10px var(--accent-2)",
                      }}
                    />
                  )}
                </motion.div>
              )}
            </NavLink>
          ))}
        </div>

        {/* Mobile Hamburger Button */}
        {showButton && (
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid var(--glass-border)",
              color: "#fff",
              fontSize: "1.2rem",
              cursor: "pointer",
              borderRadius: "50%",
              width: "40px",
              height: "40px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 10000,
            }}
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? "✕" : "☰"}
          </motion.button>
        )}
      </motion.nav>

      {/* --- Premium Mobile Dropdown Menu --- */}
      <AnimatePresence>
        {isOpen && showButton && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            style={{
              position: "fixed",
              top: "80px",
              left: "5%",
              width: "90%",
              maxHeight: "80vh",
              background: "rgba(10, 12, 16, 0.85)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              border: "1px solid var(--glass-border)",
              borderRadius: "24px",
              display: "flex",
              flexDirection: "column",
              padding: "1.5rem 0",
              overflowY: "auto",
              zIndex: 9999,
              boxShadow: "0 30px 60px rgba(0,0,0,0.6)",
            }}
          >
            {links.map((l, i) => (
              <motion.div
                key={l.to}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <NavLink
                  to={l.to}
                  onClick={() => setIsOpen(false)}
                  style={({ isActive }) => ({
                    color: isActive ? "#fff" : "var(--muted)",
                    textDecoration: "none",
                    padding: "1rem 2rem",
                    display: "block",
                    fontSize: "1.1rem",
                    fontWeight: isActive ? 600 : 400,
                    borderLeft: isActive ? "3px solid var(--accent-2)" : "3px solid transparent",
                    background: isActive ? "linear-gradient(90deg, rgba(0,119,255,0.1), transparent)" : "transparent",
                  })}
                >
                  {l.label}
                </NavLink>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
