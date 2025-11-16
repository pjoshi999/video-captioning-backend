import { Router } from 'express';
import { healthCheck } from '../controllers/healthController';
import { uploadVideo } from '../controllers/uploadController';
import { createCaptions } from '../controllers/captionController';
import { uploadMiddleware } from '../middleware/upload';

const router = Router();

// Health check
router.get('/health', healthCheck);

// Upload video
router.post('/api/upload', uploadMiddleware.single('video'), uploadVideo);

// Generate captions
router.post('/api/captions/generate', createCaptions);

export default router;

