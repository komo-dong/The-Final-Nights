/**
 * Tools for dealing with Windows Registry bullshit.
 *
 * @file
 * @copyright 2020 Aleksej Komarov
 * @license MIT
 */

import { exec } from 'child_process';
import { promisify } from 'util';
import { createLogger } from './logging.js';

const logger = createLogger('winreg');

export const regQuery = async (path, key) => {
  if (process.platform !== 'win32') {
    return null;
  }
  try {
    const command = `reg query "${path}" /v ${key}`;
    const { stdout } = await promisify(exec)(command);
    const keyPattern = `    ${key}    `;
    const indexOfKey = stdout.indexOf(keyPattern);
    if (indexOfKey === -1) {
      logger.error('could not find the registry key');
      return null;
    }
    const indexOfEol = stdout.indexOf('\r\n', indexOfKey);
    if (indexOfEol === -1) {
      logger.error('could not find the end of the line');
      return null;
    }
    const indexOfValue = stdout.indexOf('    ', indexOfKey + keyPattern.length);
    if (indexOfValue === -1) {
      logger.error('could not find the start of the key value');
      return null;
    }

    return stdout.substring(indexOfValue + 4, indexOfEol);
  } catch (err) {
    logger.error(err);
    return null;
  }
};
