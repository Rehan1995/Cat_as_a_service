import { writeFile } from "fs";
import { logger } from "../logger.js";

/**
 * Promisify writeFile function
 */
export const writeFilePromise = (...args) => {
  return new Promise((resolve, reject) => {
    writeFile(...args, (err) => {
      if (err) return reject(err);
      logger.info("The file was saved!");
    });
  });
};
