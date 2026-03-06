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
    <section className="contact-section">
      <motion.h1
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="contact-title"
      >
        Let’s Connect & Collaborate
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="contact-subtitle"
      >
        Whether it’s a new project, a collaboration, or just to say hi  I’d love to hear from you!
      </motion.p>

      <motion.div
        className="contact-links"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8 }}
      >
        {quickLinks.map((item, i) => (
          <motion.a
            key={i}
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
            whileHover={{ scale: 1.15, rotate: 5 }}
            transition={{ type: "spring", stiffness: 250 }}
          >
            <motion.img
              src={item.img}
              alt={item.title}
              className="social-icon"
              animate={{ y: [0, -6, 0] }}
              transition={{
                duration: 3 + i * 0.3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.a>
        ))}
      </motion.div>

      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.9 }}
        className="contact-form"
      >
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="contact"
          placeholder="Your Email or Phone"
          value={form.contact}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="subject"
          placeholder="Subject"
          value={form.subject}
          onChange={handleChange}
          required
        />
        <textarea
          name="message"
          placeholder="Your Message..."
          value={form.message}
          onChange={handleChange}
          rows="5"
          required
        />
        <motion.button
          type="submit"
          className="contact-btn"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Send Message
        </motion.button>

        {status && (
          <motion.p
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="contact-status"
          >
            {status}
          </motion.p>
        )}
      </motion.form>
    </section>
  );
}