import express, { Request, Response } from 'express';
import path from 'path';
import sharp from 'sharp';
import { mkdir, access } from 'fs/promises';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  const { filename, width, height } = req.query;
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

  try {
    await sharp(fullFilepath)
      .resize({
        width: parseFloat(width as string),
        height: parseFloat(height as string),
      })
      .toFile(thumbFilepath);

    res.status(200).sendFile(thumbFilepath);
  } catch (error) {
    console.error(error);
    res.status(400).send({
      message:
        'An error occurred while trying to return the resized image. Please check the input and try again.',
    });
  }
});

export default router;
