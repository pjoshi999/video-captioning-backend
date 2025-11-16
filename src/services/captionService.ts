import { AssemblyAI } from 'assemblyai';
import path from 'path';
import fs from 'fs';
import { config } from '../config';
import { CaptionSegment } from '../types';

export const generateCaptions = async (videoPath: string): Promise<{
  captions: CaptionSegment[];
  language: string;
  duration: number;
  confidence?: number;
}> => {
  // Validate API key
  if (!config.assemblyAIKey) {
    throw new Error('AssemblyAI API key not configured');
  }

  // Initialize client
  const client = new AssemblyAI({ apiKey: config.assemblyAIKey });

  // Get absolute path
  const absolutePath = path.join(__dirname, '../../', config.uploadDir, path.basename(videoPath));

  if (!fs.existsSync(absolutePath)) {
    throw new Error(`Video file not found: ${videoPath}`);
  }

  console.log('📤 Uploading video to AssemblyAI:', absolutePath);

  // Upload file
  const uploadUrl = await client.files.upload(absolutePath);

  console.log('🎙️  Creating transcription job...');

  // Transcribe
  const transcript = await client.transcripts.transcribe({
    audio: uploadUrl,
    language_detection: true,
    format_text: true,
  });

  if (transcript.status === 'error') {
    throw new Error(transcript.error || 'Transcription failed');
  }

  console.log('✅ Transcription completed');

  const words = transcript.words || [];

  if (words.length === 0) {
    throw new Error('No speech detected in the video');
  }

  // Group words into segments
  const captions = groupWordsIntoSegments(words, 8);

  console.log(`📝 Generated ${captions.length} caption segments`);

  const duration = words[words.length - 1]?.end / 1000 || 0;

  return {
    captions,
    language: transcript.language_code || 'auto-detected',
    duration,
    confidence: transcript.confidence,
  };
};

const groupWordsIntoSegments = (words: any[], wordsPerSegment: number): CaptionSegment[] => {
  const segments: CaptionSegment[] = [];

  for (let i = 0; i < words.length; i += wordsPerSegment) {
    const segmentWords = words.slice(i, i + wordsPerSegment);

    if (segmentWords.length === 0) continue;

    segments.push({
      text: segmentWords.map((w) => w.text).join(' '),
      start: segmentWords[0].start / 1000,
      end: segmentWords[segmentWords.length - 1].end / 1000,
      words: segmentWords.map((w) => ({
        word: w.text,
        start: w.start / 1000,
        end: w.end / 1000,
      })),
    });
  }

  return segments;
};

