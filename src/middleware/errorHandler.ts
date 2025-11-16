import { Request, Response, NextFunction } from 'express';
import multer from 'multer';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error('Server error:', err);

  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      res.status(400).json({
        error: 'File too large. Maximum size is 500MB.',
      });
      return;
    }
    res.status(400).json({
      error: `File upload error: ${err.message}`,
    });
    return;
  }

  res.status(500).json({
    error: err.message || 'Internal server error',
  });
};

