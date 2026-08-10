const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'frontend', 'src');

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;

  const isJSX = filePath.endsWith('.jsx');
  const isCSS = filePath.endsWith('.css');

  if (filePath.includes('index.css')) {
    content = content.replace('--bg: #0B0F14;', '--bg: #FAFAF7;\n  --highlight: #C9A66B;');
    content = content.replace('--border: #1E2733;', '--border: #DCDDD6;');
    content = content.replace('--text-primary: #E6E9EF;', '--text-primary: #1A2233;');
    content = content.replace('--card: #131922;', '--card: #F0F1EA;');
    content = content.replace('--accent: #F5A623;', '--accent: #1E3A5F;');
    content = content.replace('--accent-2: #3DDC97;', '--accent-2: #3B6E91;');
    content = content.replace('--muted: #8A93A3;', '--muted: #6B7280;'); // standard gray for light mode
    
    // Glass/Glows
    content = content.replace('--glass: rgba(255, 255, 255, 0.02);', '--glass: rgba(255, 255, 255, 0.6);');
    content = content.replace('--glass-border: rgba(255, 255, 255, 0.05);', '--glass-border: rgba(0, 0, 0, 0.08);');
    content = content.replace('--glow: rgba(245, 166, 35, 0.15);', '--glow: rgba(0, 0, 0, 0.05);');
    content = content.replace('--shadow-premium: 0 30px 60px rgba(0, 0, 0, 0.6), 0 0 40px rgba(245, 166, 35, 0.05);', '--shadow-premium: 0 10px 30px rgba(0, 0, 0, 0.06), 0 0 40px rgba(0, 0, 0, 0.02);');
    
    // Remove dark body gradients
    content = content.replace(/background-image:\s*radial-gradient\([\s\S]*?transparent 100%\);/m, '');
    
    // Convert dark transparent blacks/whites to light equivalents for borders/bg
    content = content.replace(/rgba\(255,\s*255,\s*255,\s*0\.01\)/g, 'rgba(0,0,0,0.01)');
    content = content.replace(/rgba\(255,\s*255,\s*255,\s*0\.02\)/g, 'rgba(0,0,0,0.02)');
    content = content.replace(/rgba\(255,\s*255,\s*255,\s*0\.03\)/g, 'rgba(0,0,0,0.04)');
    content = content.replace(/rgba\(255,\s*255,\s*255,\s*0\.04\)/g, 'rgba(0,0,0,0.05)');
    content = content.replace(/rgba\(255,\s*255,\s*255,\s*0\.05\)/g, 'rgba(0,0,0,0.06)');
    
    // Specific hardcoded replacements
    content = content.replace(/box-shadow:0 10px 40px rgba\(2,6,23,0\.6\)/g, 'box-shadow:0 10px 40px rgba(0,0,0,0.06)');
    content = content.replace(/box-shadow:0 10px 30px rgba\(245,166,35,0\.12\)/g, 'box-shadow:0 10px 30px rgba(30,58,95,0.2)');
    content = content.replace(/box-shadow:0 22px 80px rgba\(245,166,35,0\.08\)/g, 'box-shadow:0 22px 80px rgba(0,0,0,0.08)');
    content = content.replace(/box-shadow:0 8px 30px rgba\(245,166,35,0\.12\)/g, 'box-shadow:0 8px 30px rgba(30,58,95,0.2)');
    content = content.replace(/box-shadow:0 30px 80px rgba\(245,166,35,0\.08\)/g, 'box-shadow:0 30px 80px rgba(0,0,0,0.08)');
    
    content = content.replace(/background:linear-gradient\(90deg,var\(--accent\),var\(--accent-2\)\)/g, 'background:linear-gradient(90deg,var(--accent),var(--highlight))');
    
    content = content.replace(/#0077ff/g, 'var(--accent-2)');
    content = content.replace(/#666/g, 'var(--muted)');
  }
  
  if (isCSS && !filePath.includes('index.css')) {
     // replace any rgba(255,255,255,x) borders with dark borders
     content = content.replace(/rgba\(255,\s*255,\s*255,\s*0\.1\)/g, 'var(--border)');
     content = content.replace(/rgba\(255,\s*255,\s*255,\s*0\.2\)/g, 'var(--border)');
  }

  if (isJSX) {
    // replace `#E6E9EF` with `var(--text-primary)` just in case
    content = content.replace(/['"]#E6E9EF['"]/g, 'var(--text-primary)');
    // replace `color: '#fff'` in App.jsx
    content = content.replace(/color:\s*['"]#fff['"]/g, 'color: "var(--text-primary)"');
    // Button white text should be "#ffffff" so it isn't caught
    // Any remaining `color: "#fff"` in components not inside App.jsx?
    // Let's replace white text with text-primary generally, but leave "#ffffff" or "white" for button texts.
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
console.log('Light Mode Recoloring complete.');
