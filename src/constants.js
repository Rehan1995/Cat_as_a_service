import { join } from "path";
import minimist from "minimist";

const argv = minimist(process.argv.slice(2));

export const IMAGE_WIDTH = argv.width ?? 400;
export const IMAGE_HEIGHT = argv.height ?? 500;

export const URL_TEMPLATES = [
  "https://cataas.com/cat/says/{greeting}?width={width}&height={height}&color{color}&s={size}",
  "https://cataas.com/cat/says/{who}?width={width}&height={height}&color{color}&s={size}",
];

export const ENCODING = "binary";
export const IMAGE_FORMAT = "jpeg";
export const OUTPUT_FILE_PATH = join(process.cwd(), "/cat-card.jpg");