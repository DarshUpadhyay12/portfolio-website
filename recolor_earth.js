const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'frontend', 'src');

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;

  if (filePath.includes('index.css')) {
    content = content.replace('--bg: #FAFAF7;', '--bg: #F5EFE6;');
    content = content.replace('--highlight: #C9A66B;', '--highlight: #C4622D;');
    content = content.replace('--border: #DCDDD6;', '--border: #DCD0BC;');
    content = content.replace('--text-primary: #1A2233;', '--text-primary: #2B2018;');
    content = content.replace('--card: #F0F1EA;', '--card: #EBE1D1;');
    content = content.replace('--muted: #6B7280;', '--muted: #6D594C;');
    content = content.replace('--accent: #1E3A5F;', '--accent: #4A3428;');
    content = content.replace('--accent-2: #3B6E91;', '--accent-2: #8B5E3C;');
    
    // Shadows & Glows using earthy tone (4A3428 is rgb(74, 52, 40))
    content = content.replace('--glow: rgba(0, 0, 0, 0.05);', '--glow: rgba(74, 52, 40, 0.08);');
    content = content.replace('--shadow-premium: 0 10px 30px rgba(0, 0, 0, 0.06), 0 0 40px rgba(0, 0, 0, 0.02);', '--shadow-premium: 0 10px 30px rgba(74, 52, 40, 0.08), 0 0 40px rgba(74, 52, 40, 0.04);');
  }

  // Double check buttons and nav-links in index.css
  if (filePath.includes('index.css')) {
    // Ensuring color is #ffffff for contrast instead of #fff just to be explicit if needed, but #fff is fine.
  }

  // Any remaining issues in components:
  // (We've already mapped text colors to var(--text-primary) in previous step)
  // Let's just make sure "var(--text-primary)" is used.

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
console.log('Earthy Light Mode Recoloring complete.');
