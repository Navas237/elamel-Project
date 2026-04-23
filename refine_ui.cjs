const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    if (isDirectory) {
      walkDir(dirPath, callback);
    } else {
      if (dirPath.endsWith('.jsx')) {
        callback(dirPath);
      }
    }
  });
}

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;

  // 1. Reduce scale extremes
  content = content.replace(/\bhover:scale-110\b/g, 'hover:scale-105');

  // 2. Reduce large shadows
  content = content.replace(/\bhover:shadow-2xl\b/g, 'hover:shadow-xl');
  content = content.replace(/\bshadow-2xl\b/g, 'shadow-xl');

  // 3. Reduce extreme movement
  content = content.replace(/\bhover:-translate-y-2\b/g, 'hover:-translate-y-1');
  content = content.replace(/\bhover:-translate-y-3\b/g, 'hover:-translate-y-1');

  // 4. Tone down constant distractions
  content = content.replace(/\banimate-bounce\b/g, 'animate-pulse');

  // 5. Tone down gradient text in SelectLang
  const gradientClasses = 'group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[var(--teal-500)] group-hover:to-[var(--teal-700)]';
  if (content.includes(gradientClasses)) {
    content = content.replace(new RegExp(' ?' + gradientClasses.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&') + ' ?', 'g'), ' ');
    // Clean up multiple spaces that might have been left
    content = content.replace(/  +/g, ' ');
  }

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated: ${filePath}`);
  }
}

walkDir(srcDir, processFile);
console.log('Finished updating UI classes.');
