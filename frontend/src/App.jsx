import React, { Suspense, lazy } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Navbar from './components/Navbar'

// Lazy load route components for performance (Code Splitting)
const Home = lazy(() => import('./pages/Home'))
const Projects = lazy(() => import('./pages/Projects'))
const Gallery = lazy(() => import('./pages/Gallery'))
const Certificates = lazy(() => import('./pages/Certificates'))
const Resume = lazy(() => import('./pages/Resume'))
const About = lazy(() => import('./pages/About'))
const Contact = lazy(() => import('./pages/Contact'))
const NotFound = lazy(() => import('./pages/NotFound'))
const SkillNetwork = lazy(() => import('./pages/Skills'))
const Results = lazy(() => import('./pages/Results'))

export default function App() {
  const location = useLocation();

  return (
    <div className="app">
      <Navbar />
      <AnimatePresence mode="wait">
        <motion.main 
          key={location.pathname}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          style={{ flex: 1, position: 'relative' }}
        >
          <Suspense fallback={<div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: "var(--text-primary)" }}>Loading...</div>}>
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Home />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/skills" element={<SkillNetwork />} />
              <Route path="/results" element={<Results />} />
              <Route path="/certificates" element={<Certificates />} />
              <Route path="/resume" element={<Resume />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </motion.main>
      </AnimatePresence>
      <footer className="footer">
        © {new Date().getFullYear()} Darsh Upadhyay — Built with React
      </footer>
    </div>
  )
}
