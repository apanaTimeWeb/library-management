const fs = require('fs');
const path = require('path');

function walk(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    const dirPath = path.join(dir, f);
    const isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walk(dirPath, callback) : callback(dirPath);
  });
}

const targetDir = path.join(__dirname, 'src', 'app', 'admin');

walk(targetDir, (filePath) => {
  if (!filePath.endsWith('.tsx') && !filePath.endsWith('.ts')) return;

  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  // Replace relative imports like: from '../admin_system_components/...'
  // We need to resolve the absolute path and make it relative to src/
  content = content.replace(/from\s+['"](\.\.\/[^'"]+)['"]/g, (match, relPath) => {
    const fileDir = path.dirname(filePath);
    const resolvedAbsPath = path.resolve(fileDir, relPath);
    // Find the relative path from src/
    const srcDir = path.join(__dirname, 'src');
    
    // If it's outside src, don't touch it
    if (!resolvedAbsPath.startsWith(srcDir)) return match;

    const relToSrc = path.relative(srcDir, resolvedAbsPath);
    // Replace backslashes with forward slashes for imports
    const newImport = `@/${relToSrc.replace(/\\/g, '/')}`;
    changed = true;
    return `from '${newImport}'`;
  });
  
  // Also handle './' if any
  content = content.replace(/from\s+['"](\.\/[^'"]+)['"]/g, (match, relPath) => {
    const fileDir = path.dirname(filePath);
    const resolvedAbsPath = path.resolve(fileDir, relPath);
    const srcDir = path.join(__dirname, 'src');
    if (!resolvedAbsPath.startsWith(srcDir)) return match;
    const relToSrc = path.relative(srcDir, resolvedAbsPath);
    const newImport = `@/${relToSrc.replace(/\\/g, '/')}`;
    changed = true;
    return `from '${newImport}'`;
  });

  if (changed) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated imports in ${filePath}`);
  }
});
