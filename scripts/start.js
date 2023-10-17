const { spawn } = require('child_process');
const path = require('path');

const workspaceRoot = path.join(__dirname, '..', 'packages');
const workspacePaths = [`${workspaceRoot}/main`, `${workspaceRoot}/sdk`];

const currentEnv = process.argv[2] || 'localdev';

console.log('ENV: ', currentEnv);

workspacePaths.forEach((workspacePath) => {
  const command = 'yarn';
  const args = ['start', currentEnv];

  // Запускаем команду "yarn start" в текущей папке workspace и выводим логи в текущую консоль
  const child = spawn(command, args, { cwd: workspacePath, shell: true });

  child.stdout.on('data', (data) => {
    console.log(`[${workspacePath}] stdout: ${data}`);
  });

  child.stderr.on('data', (data) => {
    console.error(`[${workspacePath}] stderr: ${data}`);
  });

  child.on('close', (code) => {
    if (code === 0) {
      console.log(`[${workspacePath}] Команда завершена успешно`);
    } else {
      console.error(
        `[${workspacePath}] Команда завершена с ошибкой, код завершения: ${code}`
      );
    }
  });
});
