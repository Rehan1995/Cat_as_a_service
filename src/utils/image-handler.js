import fetch from "node-fetch";
import blend from "@mapbox/blend";
import { writeFilePromise } from "./file-handler.js";
import { constructURL } from "./url-handler.js";
import { ENCODING, IMAGE_FORMAT, IMAGE_HEIGHT, IMAGE_WIDTH, OUTPUT_FILE_PATH, URL_TEMPLATES } from "../constants.js";
import { logger } from "../logger.js";

/**
 * Promisify the blend function
 */
const blendPromise = (...args) => {
  return new Promise((resolve, reject) => {
    blend(...args, (err, data) => {
      if (err) return reject(err);
      resolve(data);
    });
  });
};

/**
 * Retrieve image from the URL
 * @param url
 * @returns ArrayBuffer
 */
export const retrieveImage = async (url) => {
  try {
    const response = await fetch(constructURL(url));
    return await response.arrayBuffer();
  } catch (error) {
    logger.error(`Error retrieving image :${url}`);
    throw new Error(`Error retrieving image :${url}`);
  }
};

/**
 * Blend array of image parts
 * @param imageParts
 */
export const blendImages = async (imageParts) => {
  try {
    return await blendPromise(
      [
        { buffer: Buffer.from(await imageParts[0], ENCODING), x: 0, y: 0 },
        { buffer: Buffer.from(await imageParts[1], ENCODING), x: IMAGE_WIDTH, y: 0 },
      ],
      { width: IMAGE_WIDTH * 2, height: IMAGE_HEIGHT, format: IMAGE_FORMAT }
    );
  } catch (error) {
    logger.error("Error blending images");
    throw new Error("Error blending images");
  }
};

/**
 * Write image file
 */
export const writeImageFile = async (blendedImage) => {
  try {
    await writeFilePromise(OUTPUT_FILE_PATH, blendedImage, ENCODING);
  } catch (error) {
    logger.error("Error writing image file");
    throw new Error("Error writing image file");
  }
};
