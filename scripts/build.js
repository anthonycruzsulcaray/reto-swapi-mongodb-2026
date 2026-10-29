const fs = require('node:fs');
const path = require('node:path');
const { spawnSync } = require('node:child_process');

const projectRoot = path.resolve(__dirname, '..');
const sourceDirectory = path.join(projectRoot, 'src');
const outputDirectory = path.join(projectRoot, 'dist');

fs.rmSync(outputDirectory, { recursive: true, force: true });
fs.cpSync(sourceDirectory, outputDirectory, { recursive: true });

function findJavaScriptFiles(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const entryPath = path.join(directory, entry.name);
    return entry.isDirectory()
      ? findJavaScriptFiles(entryPath)
      : entry.name.endsWith('.js')
        ? [entryPath]
        : [];
  });
}

for (const file of findJavaScriptFiles(outputDirectory)) {
  const result = spawnSync(process.execPath, ['--check', file], {
    stdio: 'inherit',
  });
  if (result.status !== 0) {
    process.exit(result.status || 1);
  }
}

console.log(
  `Built and syntax-checked ${findJavaScriptFiles(outputDirectory).length} JavaScript files in dist/.`,
);
