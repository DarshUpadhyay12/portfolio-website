const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'frontend', 'src');

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;

  if (filePath.includes('index.css')) {
    // Colors
    content = content.replace('--bg: #F5EFE6;', '--bg: #0B0F19;\n  --gradient-primary: linear-gradient(135deg, #6366F1, #8B5CF6, #A855F7);');
    content = content.replace('--highlight: #C4622D;', '--highlight: #3B82F6;');
    content = content.replace('--border: #DCD0BC;', '--border: #1E293B;');
    content = content.replace('--text-primary: #2B2018;', '--text-primary: #F1F5F9;');
    content = content.replace('--card: #EBE1D1;', '--card: #161B2E;');
    content = content.replace('--muted: #6D594C;', '--muted: #94A3B8;');
    content = content.replace('--accent: #4A3428;', '--accent: #6366F1;');
    content = content.replace('--accent-2: #8B5E3C;', '--accent-2: #A855F7;');

    // Shadows & Glass
    content = content.replace('--glass: rgba(255, 255, 255, 0.6);', '--glass: rgba(255, 255, 255, 0.02);');
    content = content.replace('--glass-border: rgba(0, 0, 0, 0.08);', '--glass-border: rgba(255, 255, 255, 0.05);');
    content = content.replace('--glow: rgba(74, 52, 40, 0.08);', '--glow: rgba(139, 92, 246, 0.15);'); // Using Violet for glow
    content = content.replace('--shadow-premium: 0 10px 30px rgba(74, 52, 40, 0.08), 0 0 40px rgba(74, 52, 40, 0.04);', '--shadow-premium: 0 30px 60px rgba(0, 0, 0, 0.6), 0 0 40px rgba(139, 92, 246, 0.05);');

    // Add back the radial gradient blobs
    content = content.replace('background-color: var(--bg);', 'background-color: var(--bg);\n  background-image:\n    radial-gradient(1000px 800px at 0% 0%, rgba(99, 102, 241, 0.08), transparent 100%),\n    radial-gradient(1200px 900px at 100% 100%, rgba(168, 85, 247, 0.08), transparent 100%);\n  background-attachment: fixed;');

    // Update buttons/links to use --gradient-primary
    content = content.replace(/linear-gradient\(90deg,var\(--accent\),var\(--highlight\)\)/g, 'var(--gradient-primary)');
    content = content.replace(/linear-gradient\(90deg, var\(--accent\), var\(--accent\)\)/g, 'var(--gradient-primary)');
    content = content.replace(/background:radial-gradient\(circle at top left, var\(--accent\), var\(--accent-2\)\);/g, 'background: var(--gradient-primary);');
  }

  // Update Skills orb gradients specifically
  if (filePath.includes('Skills.css')) {
     content = content.replace(/background: radial-gradient\(circle at top left, var\(--accent\), var\(--accent-2\)\);/g, 'background: var(--gradient-primary);');
  }

  // Fix Contact.jsx input focus border to use --highlight instead of dark blue
  if (filePath.includes('index.css') || filePath.includes('Contact.css')) {
     content = content.replace(/border-color: #0077ff;/g, 'border-color: var(--highlight);');
  }

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated: ${filePath}`);
  }
}

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walkDir(fullPath);
    } else if (fullPath.endsWith('.jsx') || fullPath.endsWith('.css')) {
      processFile(fullPath);
    }
  }
}

walkDir(directoryPath);
console.log('Dark Mode Recoloring complete.');
