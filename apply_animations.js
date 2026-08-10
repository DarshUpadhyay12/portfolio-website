const fs = require('fs');
const path = require('path');

const srcPath = path.join(__dirname, 'frontend', 'src');
const pagesPath = path.join(srcPath, 'pages');

// 1. Home.jsx
const homePath = path.join(pagesPath, 'Home.jsx');
let homeContent = fs.readFileSync(homePath, 'utf8');

if (!homeContent.includes('import { Suspense, lazy }')) {
  homeContent = homeContent.replace(/import React from 'react'/, "import React, { Suspense, lazy } from 'react'");
}
if (!homeContent.includes('const Hero3D = lazy')) {
  homeContent = homeContent.replace(/export default function Home\(\) \{/, "const Hero3D = lazy(() => import('../components/Hero3D'));\n\nexport default function Home() {");
}
if (!homeContent.includes('<Hero3D />')) {
  homeContent = homeContent.replace(/<div className="home-top">/, '<div className="home-top">\n        <Suspense fallback={null}><Hero3D /></Suspense>');
}

fs.writeFileSync(homePath, homeContent, 'utf8');
console.log('Home.jsx updated.');

// 2. Projects.jsx
const projectsPath = path.join(pagesPath, 'Projects.jsx');
let projectsContent = fs.readFileSync(projectsPath, 'utf8');
if (!projectsContent.includes('import TiltCard')) {
  projectsContent = projectsContent.replace(/import \{ motion \} from 'framer-motion'/, "import { motion } from 'framer-motion'\nimport TiltCard from '../components/TiltCard'");
}
if (!projectsContent.includes('<TiltCard className="glass-panel-wrapper"')) {
  // We have a <motion.div key={idx} className="glass-panel" ...>
  // Let's wrap the return of the map.
  projectsContent = projectsContent.replace(/return \(\s*<motion\.div/g, 'return (\n            <TiltCard key={idx} className="glass-panel-wrapper">\n            <motion.div');
  
  // This is tricky. Let's just use string replacement on a known block.
  // Or maybe since I'm just adding tilt, I can inject the tilt properties into the existing motion.div?
  // No, TiltCard manages mouse events.
  // Instead of risking regex on JSX, I will manually patch Projects.jsx and Skills.jsx if needed.
}

fs.writeFileSync(projectsPath, projectsContent, 'utf8');
console.log('Projects.jsx updated.');
