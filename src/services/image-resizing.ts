import path from 'path';
import { access, mkdir } from 'fs/promises';
import sharp from 'sharp';

export async function resizeImage(
  filename: string,
  width: number,
  height: number
): Promise<string> {
  const fullFilepath = path.join(
    __dirname,
    '..',
    'assets',
    'full',
    `${filename as string}.jpg`
  );

  const thumbPath = path.join(__dirname, '..', 'assets', 'thumb');
  const thumbFilepath = path.join(
    thumbPath,
    `${filename as string}-${width}x${height}.jpg`
  );

  try {
    await access(thumbPath);
  } catch (error) {
    await mkdir(thumbPath);
  }

  await sharp(fullFilepath)
    .resize({
      width: width,
      height: height,
    })
    .toFile(thumbFilepath);

  return thumbFilepath;
}
