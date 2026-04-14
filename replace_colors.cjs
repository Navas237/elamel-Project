const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

const replacements = [
  // Gradients first
  { regex: /linear-gradient\(\s*135deg\s*,\s*#4EC4BD\s*,\s*#2E9E98\s*\)/gi, replacement: 'var(--gradient-brand)' },
  { regex: /linear-gradient\(\s*135deg\s*,\s*#4EC4BD\s*,\s*#1D7A75\s*\)/gi, replacement: 'var(--gradient-brand)' },
  { regex: /linear-gradient\(\s*135deg\s*,\s*#2E9E98\s*,\s*#1D7A75\s*\)/gi, replacement: 'var(--color-primary-button)' },
  
  // Hex colors
  { regex: /#4EC4BD/gi, replacement: 'var(--teal-400)' },
  { regex: /#2E9E98/gi, replacement: 'var(--teal-500)' },
  { regex: /#1D7A75/gi, replacement: 'var(--teal-600)' },
  { regex: /#135C58/gi, replacement: 'var(--teal-700)' },
  { regex: /#0D4A47/gi, replacement: 'var(--teal-800)' },
  { regex: /#FFD43B/gi, replacement: 'var(--brand-accent)' },
  { regex: /#F0B800/gi, replacement: 'var(--brand-accent-dark)' },
  { regex: /#F0FBFA/gi, replacement: 'var(--teal-50)' },
  { regex: /#CCEEE9/gi, replacement: 'var(--teal-100)' },
  { regex: /#99DDD3/gi, replacement: 'var(--teal-200)' },
  { regex: /#66CBBD/gi, replacement: 'var(--teal-300)' },
  { regex: /#EF4444/gi, replacement: 'var(--brand-danger)' },
  { regex: /#FEE2E2/gi, replacement: 'var(--brand-danger-light)' },
  { regex: /#22C55E/gi, replacement: 'var(--brand-success)' },
  { regex: /#E6F7F6/gi, replacement: 'var(--color-surface-muted)' },
  { regex: /#6B9E9B/gi, replacement: 'var(--teal-300)' },
];

function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      processDirectory(fullPath);
    } else if (stat.isFile() && (fullPath.endsWith('.jsx') || fullPath.endsWith('.js'))) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let originalContent = content;
      
      for (const { regex, replacement } of replacements) {
        content = content.replace(regex, replacement);
      }
      
      if (content !== originalContent) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Updated: ${fullPath}`);
      }
    }
  }
}

processDirectory(srcDir);
console.log('Done.');
