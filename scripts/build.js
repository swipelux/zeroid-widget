const { execSync } = require('child_process');
const fs = require('fs-extra');
const path = require('path');

const workspaceRoot = path.join(__dirname, '..', 'packages');
const outputDir = path.join(__dirname, '..', 'dist');

const currentEnv = process.argv[2] || 'dev';

console.log('ENV: ', currentEnv);

// Создайте папку "dist" в корне проекта, если она не существует
fs.ensureDirSync(outputDir);

// Очистите содержимое папки "dist" перед копированием новых результатов сборки
fs.emptyDirSync(outputDir);

// Выполните сначала сборку для "main"
const mainPath = path.join(workspaceRoot, 'main');
console.log('Building main...');
execSync(`yarn build ${currentEnv}`, { cwd: mainPath, stdio: 'inherit' });
console.log('main build completed.');

// Затем выполните сборку для "sdk"
const sdkPath = path.join(workspaceRoot, 'sdk');
console.log('Building sdk...');
execSync(`yarn build ${currentEnv}`, { cwd: sdkPath, stdio: 'inherit' });
console.log('sdk build completed.');

// Копируйте содержимое "main/dist" в "dist"
fs.copySync(path.join(mainPath, 'dist'), outputDir, { recursive: true });

// Копируйте файл "sdk.js" из "sdk/dist" в корень "dist"
fs.copySync(
  path.join(sdkPath, 'dist', 'sdk.js'),
  path.join(outputDir, 'sdk.js')
);

console.log('Build process for all workspaces completed.');
