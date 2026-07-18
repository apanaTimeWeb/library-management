const fs = require('fs');

const log = fs.readFileSync('build-errors.log', 'utf16le');
const lines = log.split('\n');

const errors = {};

lines.forEach(line => {
    const match = line.match(/error (TS\d+):/);
    if (match) {
        const tsCode = match[1];
        if (!errors[tsCode]) {
            errors[tsCode] = { count: 0, examples: new Set(), files: new Set() };
        }
        errors[tsCode].count++;
        errors[tsCode].examples.add(line.trim());
        
        // Try to extract filename
        const fileMatch = line.match(/^([^:]+):/);
        if (fileMatch) {
            errors[tsCode].files.add(fileMatch[1]);
        }
    }
});

console.log("=== ERROR SUMMARY ===");
for (const [code, data] of Object.entries(errors)) {
    console.log(`\n${code}: ${data.count} errors in ${data.files.size} files`);
    let exCount = 0;
    for (const ex of data.examples) {
        console.log(`  - ${ex}`);
        exCount++;
        if (exCount >= 3) break; // show at most 3 examples
    }
}
