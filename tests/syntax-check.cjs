const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname, '..');
let count = 0;
function walk(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        if (['.git', 'node_modules', 'tests'].includes(entry.name)) continue;
        const file = path.join(dir, entry.name);
        if (entry.isDirectory()) walk(file);
        else if (entry.name.endsWith('.js')) { new vm.Script(fs.readFileSync(file, 'utf8'), { filename: file }); count++; }
        else if (entry.name.endsWith('.html')) {
            let i = 0;
            for (const match of fs.readFileSync(file, 'utf8').matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)) {
                if (/\bsrc\s*=|application\/ld\+json|application\/json/i.test(match[1])) continue;
                new vm.Script(match[2], { filename: `${file}:inline-${++i}` }); count++;
            }
        }
    }
}
walk(root);
JSON.parse(fs.readFileSync(path.join(root, 'database.rules.patched.json'), 'utf8'));
console.log(`PASS: ${count} JavaScript files/inline scripts parsed; Rules JSON parsed (not an Emulator test).`);

