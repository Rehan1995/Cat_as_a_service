import { URL_TEMPLATES } from "./constants.js";
import { blendImages, retrieveImage, writeImageFile } from "./utils/image-handler.js";

/**
 * Bootstrap the process
 */
(async () => {
    let imageParts = URL_TEMPLATES.map(async (urlTemplate) => {
        return await retrieveImage(urlTemplate);
    });
      
    logger.info("Image parts have been constructed");
    
    let blendedImage = await blendImages(imageParts);
    logger.info("Image blending has been completed");

    await writeImageFile(blendedImage);
    logger.info("File has been written to the output path");
})();