import { Request, Response } from 'express';
import { UploadResponse } from '../types';

export const uploadVideo = (req: Request, res: Response): void => {
  try {
    if (!req.file) {
      res.status(400).json({ error: 'No video file provided' });
      return;
    }

    const response: UploadResponse = {
      success: true,
      videoUrl: `/uploads/${req.file.filename}`,
      filename: req.file.filename,
      size: req.file.size,
      path: req.file.path,
    };

    res.json(response);
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'Failed to upload video' });
  }
};

