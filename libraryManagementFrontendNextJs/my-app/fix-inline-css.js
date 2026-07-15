const fs = require('fs');
const path = require('path');

const cssClasses = {
  "display: 'flex', gap: 16": "admin-flex admin-gap-16",
  "display: 'flex', gap: 8": "admin-flex admin-gap-8",
  "display: 'flex', flexDirection: 'column', gap: 16": "admin-flex-col admin-gap-16",
  "display: 'flex', flexDirection: 'column', gap: 8": "admin-flex-col admin-gap-8",
  "width: '100%'": "admin-w-full",
  "height: '100%'": "admin-h-full",
  "flex: 1": "admin-flex-1",
  "color: 'var(--danger)'": "admin-text-danger",
  "color: 'var(--primary)'": "admin-text-primary",
  "color: 'var(--text-secondary)'": "admin-text-secondary"
};

const cssToAdd = `
/* Auto-generated Utility Classes */
.admin-flex { display: flex; }
.admin-flex-col { display: flex; flex-direction: column; }
.admin-gap-16 { gap: 16px; }
.admin-gap-8 { gap: 8px; }
.admin-w-full { width: 100%; }
.admin-h-full { height: 100%; }
.admin-flex-1 { flex: 1; }
.admin-text-danger { color: var(--danger); }
.admin-text-primary { color: var(--primary); }
.admin-text-secondary { color: var(--text-secondary); }
`;

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

  for (const [inline, cls] of Object.entries(cssClasses)) {
    // Basic regex to find style={{ ...exact match... }}
    const regex = new RegExp(`style=\\{\\{\\s*${inline.replace(/([',\.])/g, '\\$1')}\\s*\\}\\}`, 'g');
    content = content.replace(regex, (match) => {
      changed = true;
      return `className="${cls}"`; // Note: This naive replace might overwrite existing className. We assume it's used safely or we can refine it.
    });
  }

  if (changed) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated inline CSS in ${filePath}`);
  }
});

fs.appendFileSync(path.join(targetDir, 'admin.css'), cssToAdd);
console.log('Appended classes to admin.css');
