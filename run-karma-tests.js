// Simple script to run Karma tests
import { spawn } from 'child_process';

console.log('Running Karma tests...');

const karma = spawn('npx', [
  'karma',
  'start',
  '--single-run'
], {
  stdio: 'inherit'
});

karma.on('close', (code) => {
  console.log(`Karma tests completed with exit code ${code}`);
  process.exit(code);
});
