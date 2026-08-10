const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'frontend', 'src');

function fixFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;

  // Replace unquoted vars in React style objects
  // e.g. color: var(--text-primary) -> color: "var(--text-primary)"
  content = content.replace(/color:\s*var\(([^)]+)\)/g, 'color: "var($1)"');
  content = content.replace(/background:\s*var\(([^)]+)\)/g, 'background: "var($1)"');

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Fixed JSX: ${filePath}`);
  }
}

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walkDir(fullPath);
    } else if (fullPath.endsWith('.jsx')) {
      fixFile(fullPath);
    }
  }
}

walkDir(directoryPath);
console.log('Fixed JSX syntax.');
