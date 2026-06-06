import React from 'react'
import { motion } from 'framer-motion'
import "../CSS/Home.css"
import '../index.css'


// 🖼️ Import Assets
const githubLogo = '/github.png'
const linkedinLogo = '/linkedin.png'
const gmailLogo = '/gmail.png'
const whatsappLogo = '/whatsapp.png'
const instagramLogo = '/insta.png'
const facebookLogo = '/facebook.png'

export default function Home() {
  const professions = [
    'Aspiring Software Engineer',
    'AI/ML Enthusiast',
    'Web Developer',
    'Problem Solver',
  ]

  const quickLinks = [
    { img: githubLogo, title: 'GitHub', link: 'https://github.com/DarshUpadhyay12' },
    { img: linkedinLogo, title: 'LinkedIn', link: 'https://www.linkedin.com/in/darsh-upadhyay-8a7246358/' },
    { img: gmailLogo, title: 'Email', link: 'mailto:darshupadhyay14@gmail.com' },
    { img: whatsappLogo, title: 'WhatsApp', link: 'https://wa.me/918866563899' },
    { img: instagramLogo, title: 'Instagram', link: 'https://www.instagram.com/darshupadhyay_12/' },
  ]

  // Variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } }
  };

  return (
    <section className="home-section">
      <div className="home-top">
        
        {/* Left: Info Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="home-info"
        >
          <motion.h1 variants={itemVariants} className="home-title">
            Engineering Innovative <br/>
            Software as <br/>
            <span className="home-name">Darsh Upadhyay.</span>
          </motion.h1>

          <motion.p variants={itemVariants} className="typing-effect">
            I am a BTech CSE 4th Year Student & Aspiring Software Engineer <br/> 
            passionate about building scalable applications and exploring AI.
          </motion.p>

          {/* Profession Tags */}
          <motion.div variants={itemVariants} className="profession-tags">
            {professions.map((role, i) => (
              <motion.div 
                key={i} 
                whileHover={{ scale: 1.05, background: 'rgba(0, 119, 255, 0.2)' }} 
                className="profession-tag"
              >
                {role}
              </motion.div>
            ))}
          </motion.div>

          {/* Info Cards */}
          <motion.div variants={itemVariants} className="info-cards">
            {[
              { label: '🎓 Education', value: '4th Year B.Tech CSE' },
              { label: '💼 Expertise', value: 'Software Engineering, AI/ML' },
              { label: '📧 Contact', value: 'darshupadhyay14@gmail.com' },
            ].map((info, i) => (
              <motion.div 
                key={i} 
                whileHover={{ y: -5, boxShadow: '0 15px 30px rgba(0, 119, 255, 0.1)' }} 
                className="info-card"
              >
                <strong>{info.label}</strong>
                <p>{info.value}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Bottom Quick Links */}
          <motion.div variants={itemVariants} className="quick-links">
            <h2 className="quick-links-title">Connect</h2>
            <div className="quick-links-list">
              {quickLinks.map((item, i) => (
                <motion.a
                  key={i}
                  href={item.link}
                  title={item.title}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <motion.img
                    src={item.img}
                    alt={item.title}
                    whileHover={{ filter: 'brightness(1) invert(0) drop-shadow(0 0 8px var(--accent-2))' }}
                    className="quick-link-img"
                  />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Right: Photo Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotateY: 15 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ duration: 1, type: "spring", stiffness: 80, delay: 0.2 }}
          className="photo-container"
        >
          <div className="photo-glow" />
          <motion.div
            whileHover={{ rotateY: -10, rotateX: 5 }}
            transition={{ type: "spring", stiffness: 100 }}
            className="photo-frame"
          >
            <img
              src="/photo.jpg"
              alt="Darsh Upadhyay"
              className="profile-photo"
            />
          </motion.div>
        </motion.div>

      </div>
    </section>
  )
}
