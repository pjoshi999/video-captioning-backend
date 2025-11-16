import { Request, Response } from 'express';

export const healthCheck = (req: Request, res: Response): void => {
  res.json({
    status: 'ok',
    message: 'Backend server is running',
    timestamp: new Date().toISOString(),
  });
};

