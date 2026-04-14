const fs = require('fs');
const path = require('path');

function processDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            processDir(fullPath);
        } else if (fullPath.endsWith('.jsx') || fullPath.endsWith('.js')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            if (content.includes('transition-all')) {
                let index = 0;
                while ((index = content.indexOf('transition-all', index)) !== -1) {
                    // Check a window around it
                    let start = Math.max(0, index - 300);
                    let end = Math.min(content.length, index + 300);
                    let window = content.substring(start, end);
                    
                    let replacement = 'transition';
                    if (window.includes('max-h-')) {
                        if (window.includes('mt-') || window.includes('mb-') || window.includes('my-') || window.includes('m-') || window.includes('margin')) {
                            replacement = '[transition-property:max-height,opacity,margin]';
                        } else {
                            replacement = '[transition-property:max-height,opacity]';
                        }
                    }
                    
                    content = content.substring(0, index) + replacement + content.substring(index + 'transition-all'.length);
                    index += replacement.length;
                }
                fs.writeFileSync(fullPath, content, 'utf8');
                console.log('Updated', fullPath);
            }
        }
    }
}

processDir(path.join(process.cwd(), 'src'));
