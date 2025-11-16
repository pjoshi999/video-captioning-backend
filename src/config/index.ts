import dotenv from 'dotenv';

dotenv.config();

export const config = {
  port: process.env.PORT || 3001,
  nodeEnv: process.env.NODE_ENV || 'development',
  assemblyAIKey: process.env.ASSEMBLYAI_API_KEY || '',
  uploadDir: process.env.UPLOAD_DIR || 'uploads',
  maxFileSize: parseInt(process.env.MAX_FILE_SIZE || '524288000'), // 500MB default
};

export const validateConfig = (): void => {
  if (!config.assemblyAIKey) {
    console.warn('⚠️  ASSEMBLYAI_API_KEY not set. Caption generation will not work.');
  }
};

