const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'frontend', 'src');

const colorMap = {
  // CSS variables replacement regexes for index.css
  '--bg: #050509;': '--bg: #0B0F14;\n  --border: #1E2733;\n  --text-primary: #E6E9EF;',
  '--card: rgba(15, 17, 20, 0.4);': '--card: #131922;',
  '--muted: #9aa0a6;': '--muted: #8A93A3;',
  '--accent: #004c99;': '--accent: #F5A623;',
  '--accent-2: #0077ff;': '--accent-2: #3DDC97;',
  '--glow: rgba(0, 119, 255, 0.15);': '--glow: rgba(245, 166, 35, 0.15);',
  'rgba(0, 119, 255, 0.05)': 'rgba(245, 166, 35, 0.05)',
  'rgba(0, 119, 255, 0.08)': 'rgba(245, 166, 35, 0.08)',
  'rgba(0, 76, 153, 0.08)': 'rgba(61, 220, 151, 0.08)',
  'rgba(124,58,237,': 'rgba(245,166,35,',
  'color: #e6eef8;': 'color: var(--text-primary);',
  '#00b4ff': 'var(--accent)',
  '"#00b4ff"': '"#F5A623"',
  '#00ffe0': 'var(--accent-2)',
  '"#00ffe0"': '"#3DDC97"',
  '#aaa': 'var(--muted)',
  '"#aaa"': '"#8A93A3"',
  '#ccc': 'var(--muted)',
  '"#ccc"': '"#8A93A3"',
  '#111': 'var(--card)',
  '"#111"': '"#131922"',
  '#080808': 'var(--bg)',
  '#0f0f0f': 'var(--card)',
  '#003366': 'var(--accent)',
  '#004c99': 'var(--accent)',
  '#0066cc': 'var(--accent-2)',
  '#0d0d0d': 'var(--card)',
  '#0b0b0b': 'var(--bg)',
  '#050505': 'var(--bg)',
  '#0b0e14': 'var(--bg)',
  '#000': 'var(--bg)',
  '#151515': 'var(--card)',
  '#0d111a': 'var(--card)',
  '#1b2233': 'var(--card)',
  '#cfd3e0': 'var(--text-primary)',
  '#a0a6b8': 'var(--muted)',
  '#6e7b99': 'var(--muted)',
  '#b6bdd3': 'var(--muted)',
  '#c9c9c9': 'var(--muted)',
  '#4c7bff': 'var(--accent)',
  '#e4e7ec': 'var(--text-primary)',
  '#ffffff': 'var(--text-primary)',
  '#eee': 'var(--text-primary)',
  '#ddd': 'var(--text-primary)',
  '#222': 'var(--border)',
  'rgba(0, 255, 255,': 'rgba(61, 220, 151,',
  'rgba(0, 120, 255,': 'rgba(245, 166, 35,',
  'rgba(0, 100, 255,': 'rgba(245, 166, 35,',
  'rgba(80, 100, 160,': 'rgba(30, 39, 51,',
  'rgba(20, 25, 40,': 'rgba(19, 25, 34,'
};

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;

  // Manual fixes for specific files to use CSS variables if possible
  // For JSX inline styles, we need to map to hex strings instead of var() unless it's a CSS file
  const isJSX = filePath.endsWith('.jsx');

  for (const [key, value] of Object.entries(colorMap)) {
    if (isJSX) {
       // In JSX, replace exact quoted strings
       if (key.includes('var(')) continue; // skip var replacements for generic text replacement in JSX if not quoted properly, wait, we handled quoted ones like '"#00b4ff"': '"#F5A623"'
    }
    // global string replace
    content = content.split(key).join(value);
  }

  // specific JSX replacements for inline colors
  if (isJSX) {
    content = content.replace(/color:\s*['"]#fff['"]/g, 'color: "#E6E9EF"');
    content = content.replace(/color:\s*['"]white['"]/g, 'color: "#E6E9EF"');
    content = content.replace(/background:\s*['"]#111['"]/g, 'background: "#131922"');
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
console.log('Recoloring complete.');
