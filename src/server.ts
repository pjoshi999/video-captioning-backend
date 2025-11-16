import express, { Express } from 'express';
import cors from 'cors';
import { config, validateConfig } from './config';
import routes from './routes';
import { errorHandler } from './middleware/errorHandler';
import { uploadsDir } from './middleware/upload';

// Validate configuration
validateConfig();

const app: Express = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static uploads
app.use('/uploads', express.static(uploadsDir));

// Routes
app.use(routes);

// Error handling
app.use(errorHandler);

// Start server
const PORT = config.port;

app.listen(PORT, () => {
  console.log('╔════════════════════════════════════════════╗');
  console.log('║  🚀 Backend Server Started                 ║');
  console.log('╠════════════════════════════════════════════╣');
  console.log(`║  📍 URL: http://localhost:${PORT}          ║`);
  console.log(`║  📁 Uploads: ${uploadsDir}                 ║`);
  console.log(`║  🔑 AssemblyAI: ${config.assemblyAIKey ? '✓ Configured' : '✗ Not configured'}      ║`);
  console.log(`║  🌍 Environment: ${config.nodeEnv}         ║`);
  console.log('╚════════════════════════════════════════════╝');
});

export default app;

