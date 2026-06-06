import React, { useState } from "react";
import { motion } from "framer-motion";
import emailjs from 'emailjs-com';

const githubLogo = '/github.png'
const linkedinLogo = '/linkedin.png'
const gmailLogo = '/gmail.png'
const whatsappLogo = '/whatsapp.png'
const instagramLogo = '/insta.png'
const facebookLogo = '/facebook.png'

import "../CSS/Contact.css";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    contact: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.contact || !form.subject || !form.message) {
      setStatus("⚠️ Please fill in all fields.");
      return;
    }

    const emailPattern = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    const isEmail = emailPattern.test(form.contact);
    if (!isEmail && isNaN(form.contact)) {
      setStatus("⚠️ Please enter a valid email or phone number.");
      return;
    }

    setStatus("Sending...");

    try {
      await emailjs.send(
        "service_khqov8b", // User's service ID
        "template_zyg2g7n", // User's template ID
        {
          from_name: form.name,
          from_email: form.contact,
          subject: form.subject,
          message: form.message,
        },
        "PC_Cm5Nj4T_cpYkAv" // User's public key
      );

      setStatus("✅ Message sent successfully!");
      setForm({
        name: "",
        contact: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error("Error sending message via EmailJS:", error);
      // Display the actual EmailJS error text on the screen for debugging
      setStatus(`❌ Error: ${error.text || error.message || JSON.stringify(error)}`);
    }
  };

  const quickLinks = [
    { img: githubLogo, title: "GitHub", link: "https://github.com/DarshUpadhyay12" },
    { img: linkedinLogo, title: "LinkedIn", link: "https://www.linkedin.com/in/darsh-upadhyay-8a7246358/" },
    { img: gmailLogo, title: "Email", link: "mailto:darshupadhyay14@gmail.com" },
    { img: whatsappLogo, title: "WhatsApp", link: "https://wa.me/918866563899" },
    { img: instagramLogo, title: "Instagram", link: "https://www.instagram.com/darshupadhyay_12/" },
  ];

  return (
    <section className="contact-section" id="contact">
      {/* Background Glow */}
      <div style={{
        position: "absolute",
        bottom: "-10%",
        left: "-10%",
        width: "500px",
        height: "500px",
        background: "radial-gradient(circle, rgba(0, 119, 255, 0.1) 0%, transparent 60%)",
        borderRadius: "50%",
        filter: "blur(60px)",
        pointerEvents: "none",
        zIndex: 0
      }} />

      <div className="contact-layout">
        
        {/* Left Side: Info & Socials */}
        <motion.div
          className="contact-info"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h1 className="text-gradient-accent" style={{ fontSize: "3.5rem", fontWeight: "800", marginBottom: "1rem", letterSpacing: "-1px", lineHeight: 1.1 }}>
            Let's build <br/> something great.
          </h1>
          <p style={{ fontSize: "1.1rem", color: "var(--muted)", lineHeight: 1.6, marginBottom: "3rem", maxWidth: "450px" }}>
            Whether it’s a new project, a collaboration, or just to say hi — my inbox is always open. I'll try my best to get back to you!
          </p>

          <div className="social-grid">
            {quickLinks.map((item, i) => (
              <motion.a
                key={i}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="social-item"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <div className="social-icon-wrapper">
                  <img src={item.img} alt={item.title} className="social-icon-img" />
                </div>
                <span className="social-label">{item.title}</span>
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Right Side: Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <form onSubmit={handleSubmit} className="glass-panel" style={{ padding: "clamp(1.5rem, 5vw, 3rem)", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            <h3 style={{ fontSize: "1.5rem", fontWeight: "600", color: "#fff", marginBottom: "0.5rem", marginTop: 0 }}>
              Send me a message
            </h3>
            
            <div className="input-group">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={form.name}
                onChange={handleChange}
                required
                className="premium-input"
              />
            </div>
            
            <div className="input-group">
              <input
                type="text"
                name="contact"
                placeholder="Your Email or Phone"
                value={form.contact}
                onChange={handleChange}
                required
                className="premium-input"
              />
            </div>
            
            <div className="input-group">
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                value={form.subject}
                onChange={handleChange}
                required
                className="premium-input"
              />
            </div>
            
            <div className="input-group">
              <textarea
                name="message"
                placeholder="How can I help you?..."
                value={form.message}
                onChange={handleChange}
                required
                className="premium-input"
              />
            </div>
            
            <button type="submit" className="contact-btn">
              Send Message
            </button>

            {status && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="contact-status"
              >
                {status}
              </motion.div>
            )}
          </form>
        </motion.div>

      </div>
    </section>
  );
}