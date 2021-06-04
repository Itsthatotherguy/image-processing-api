import express, { Request, Response } from 'express';
import { resizeImage } from '../services/image-resizing';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  const { filename, width, height } = req.query;

  try {
    const thumbFilePath = await resizeImage(
      filename as string,
      parseFloat(width as string),
      parseFloat(height as string)
    );

    res.status(200).sendFile(thumbFilePath);
  } catch (error) {
    res.status(400).send({
      message:
        'An error occurred while trying to return the resized image. Please check the input and try again.',
    });
  }
});

export default router;
