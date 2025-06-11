import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Always resolve logs directory relative to this logger.js file
const logDir = path.resolve(__dirname, '../../logs');
const logFile = path.join(logDir, 'automation.log');

function ensureLogDir() {
  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
  }
}

export class Logger {
  static log(message) {
    ensureLogDir();
    const logMsg = `[${new Date().toISOString()}] ${message}\n`;
    fs.appendFileSync(logFile, logMsg, 'utf8');
    console.log(message);
  }

  static error(message) {
    ensureLogDir();
    const logMsg = `[${new Date().toISOString()}] ERROR: ${message}\n`;
    fs.appendFileSync(logFile, logMsg, 'utf8');
    console.error(message);
  }
}
