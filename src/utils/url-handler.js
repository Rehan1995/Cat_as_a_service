import pupa from "pupa";
import minimist from "minimist";
import { IMAGE_WIDTH, IMAGE_HEIGHT } from "../constants.js";

const argv = minimist(process.argv.slice(2));

/**
 * Construct URL based on the file path template
 * @param urlTemplate 
 * @returns image file path
 */
export const constructURL = (urlTemplate) => {
  return pupa(urlTemplate, {
    greeting: argv.greeting ?? "Hello",
    who: argv.who ?? "You",
    width: IMAGE_WIDTH,
    height: IMAGE_HEIGHT,
    color: argv.color ?? "Pink",
    size: argv.size ?? 100,
  });
};
