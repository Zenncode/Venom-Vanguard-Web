import sharp from "sharp";
import fs from "fs";

async function generateFavicons() {
  const input = "public/images/venom-viper-icon.png";

  if (!fs.existsSync(input)) {
    console.error("Input file not found:", input);
    return;
  }

  // 1. Generate app/icon.png (512x512 crisp transparent PNG for Next.js App Router)
  await sharp(input)
    .resize(512, 512, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile("app/icon.png");

  // 2. Generate app/apple-icon.png (180x180)
  await sharp(input)
    .resize(180, 180, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile("app/apple-icon.png");

  // 3. Generate 32x32 and 48x48 icon for public/favicon.ico
  await sharp(input)
    .resize(48, 48, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile("public/favicon.ico");

  await sharp(input)
    .resize(48, 48, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile("app/favicon.ico");

  console.log("Successfully generated all favicons and app icons!");
}

generateFavicons().catch(console.error);
