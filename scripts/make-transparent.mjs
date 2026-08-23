import sharp from "sharp";

async function processImage() {
  const input = "public/images/venom-viper-icon.jpg";
  const output = "public/images/venom-viper-icon.png";

  const { data, info } = await sharp(input)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;
  // channels is 4 (RGBA)

  for (let i = 0; i < data.length; i += channels) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];

    const max = Math.max(r, g, b);

    // Alpha keying:
    // Pure black background (< 20): alpha = 0 (100% transparent)
    // Edge glows (20 to 80): smooth feathering
    // Main artwork (> 80): 100% opaque
    if (max < 16) {
      data[i + 3] = 0;
    } else if (max < 75) {
      const t = (max - 16) / 59;
      data[i + 3] = Math.round(t * 255);
    } else {
      data[i + 3] = 255;
    }
  }

  await sharp(data, {
    raw: {
      width,
      height,
      channels: 4,
    },
  })
    .png()
    .toFile(output);

  console.log("Successfully created pure transparent PNG at:", output);
}

processImage().catch(console.error);
