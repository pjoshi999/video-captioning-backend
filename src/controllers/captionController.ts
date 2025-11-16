import { Request, Response } from 'express';
import { generateCaptions } from '../services/captionService';
import { CaptionResponse, ErrorResponse } from '../types';

export const createCaptions = async (req: Request, res: Response): Promise<void> => {
  try {
    const { videoPath } = req.body;

    if (!videoPath) {
      res.status(400).json({ error: 'No video path provided' } as ErrorResponse);
      return;
    }

    const result = await generateCaptions(videoPath);

    const response: CaptionResponse = {
      success: true,
      ...result,
    };

    res.json(response);
  } catch (error: any) {
    console.error('Caption generation error:', error);

    // Handle specific errors
    if (error?.response?.status === 401) {
      res.status(401).json({
        error: 'Invalid AssemblyAI API key',
      } as ErrorResponse);
      return;
    }

    if (error?.response?.status === 429) {
      res.status(429).json({
        error: 'Rate limit exceeded. Please wait and try again.',
      } as ErrorResponse);
      return;
    }

    res.status(500).json({
      error: error?.message || 'Failed to generate captions',
      details: 'Check server logs for more information',
    } as ErrorResponse);
  }
};

