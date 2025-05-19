// Simple script to run Jest tests with ES modules support
import { spawn } from 'child_process';

console.log('Running tests...');

const jest = spawn('node', [
  '--experimental-vm-modules',
  'node_modules/jest/bin/jest.js',
  '--verbose'
], {
  stdio: 'inherit'
});

jest.on('close', (code) => {
  console.log(`Tests completed with exit code ${code}`);
  process.exit(code);
});
