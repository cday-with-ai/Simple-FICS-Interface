// Simple script to run Karma tests
import pkg from 'karma';
import {fileURLToPath} from 'url';
import {dirname, resolve} from 'path';

const {Server} = pkg;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const server = new Server({
    configFile: resolve(__dirname, 'karma.conf.js'),
    singleRun: true
});

server.start();
