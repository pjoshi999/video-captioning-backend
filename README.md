# Caption Backend API

TypeScript Express backend for video caption generation using AssemblyAI.

## 🏗️ Architecture

**MVC Structure (Functional)**
```
src/
├── config/           # Configuration and environment
├── controllers/      # Route handlers (functional)
├── middleware/       # Custom middleware
├── routes/          # API routes
├── services/        # Business logic
├── types/           # TypeScript interfaces
└── server.ts        # Entry point
```

## 🚀 Quick Start

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Configure Environment
Create `.env` file:
```env
ASSEMBLYAI_API_KEY=your_assemblyai_api_key_here
PORT=3001
NODE_ENV=development
```

### 3. Run Development Server
```bash
npm run dev
```

### 4. Build for Production
```bash
npm run build
npm start
```

## 📡 API Endpoints

### Health Check
```http
GET /health
```

### Upload Video
```http
POST /api/upload
Content-Type: multipart/form-data

Body: { video: File }
```

**Response:**
```json
{
  "success": true,
  "videoUrl": "/uploads/filename.mp4",
  "filename": "filename.mp4",
  "size": 12345678,
  "path": "/absolute/path"
}
```

### Generate Captions
```http
POST /api/captions/generate
Content-Type: application/json

Body: { "videoPath": "/uploads/filename.mp4" }
```

**Response:**
```json
{
  "success": true,
  "captions": [
    {
      "text": "Hello world",
      "start": 0.0,
      "end": 2.5,
      "words": [
        { "word": "Hello", "start": 0.0, "end": 1.0 },
        { "word": "world", "start": 1.5, "end": 2.5 }
      ]
    }
  ],
  "language": "en",
  "duration": 60.5,
  "confidence": 0.95
}
```

## 🛠️ Tech Stack

- **Runtime:** Node.js 20+
- **Framework:** Express.js
- **Language:** TypeScript
- **File Upload:** Multer
- **Caption API:** AssemblyAI
- **CORS:** Enabled for frontend integration

## 📦 Dependencies

```json
{
  "express": "^4.18.2",
  "cors": "^2.8.5",
  "multer": "^1.4.5-lts.1",
  "assemblyai": "^4.7.3",
  "dotenv": "^16.3.1"
}
```

## 🔧 Configuration

### Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `ASSEMBLYAI_API_KEY` | - | **Required** AssemblyAI API key |
| `PORT` | 3001 | Server port |
| `NODE_ENV` | development | Environment mode |
| `UPLOAD_DIR` | uploads | Upload directory name |
| `MAX_FILE_SIZE` | 524288000 | Max file size (500MB) |

### File Upload Limits

- **Max File Size:** 500MB (configurable)
- **Allowed Types:** Video files only
- **Storage:** Local filesystem in `uploads/` directory

## 📂 Project Structure

```
backend/
├── src/
│   ├── config/
│   │   └── index.ts              # App configuration
│   ├── controllers/
│   │   ├── captionController.ts  # Caption logic
│   │   ├── healthController.ts   # Health check
│   │   └── uploadController.ts   # Upload logic
│   ├── middleware/
│   │   ├── errorHandler.ts       # Error handling
│   │   └── upload.ts             # Multer config
│   ├── routes/
│   │   └── index.ts              # Route definitions
│   ├── services/
│   │   └── captionService.ts     # AssemblyAI integration
│   ├── types/
│   │   └── index.ts              # TypeScript interfaces
│   └── server.ts                 # App entry point
├── uploads/                      # Uploaded videos (gitignored)
├── dist/                         # Compiled JS (gitignored)
├── package.json
├── tsconfig.json
└── README.md
```

## 🔍 API Examples

### Using cURL

**Upload Video:**
```bash
curl -X POST http://localhost:3001/api/upload \
  -F "video=@path/to/video.mp4"
```

**Generate Captions:**
```bash
curl -X POST http://localhost:3001/api/captions/generate \
  -H "Content-Type: application/json" \
  -d '{"videoPath":"/uploads/filename.mp4"}'
```

### Using JavaScript/Fetch

```javascript
// Upload
const formData = new FormData();
formData.append('video', videoFile);

const uploadRes = await fetch('http://localhost:3001/api/upload', {
  method: 'POST',
  body: formData,
});

// Generate captions
const captionsRes = await fetch('http://localhost:3001/api/captions/generate', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ videoPath: uploadData.videoUrl }),
});
```

## 🐛 Error Handling

All errors return consistent format:
```json
{
  "error": "Error message",
  "details": "Additional details (optional)"
}
```

Common status codes:
- `400` - Bad Request (validation error)
- `401` - Unauthorized (invalid API key)
- `404` - Not Found (file not found)
- `429` - Too Many Requests (rate limit)
- `500` - Internal Server Error

## 🔐 Security

- CORS enabled for all origins (configure for production)
- File type validation (videos only)
- File size limits enforced
- Input sanitization for filenames

## 📊 Performance

- **Upload Speed:** Depends on file size and network
- **Caption Generation:** ~30-60 seconds for 5-minute video
- **File Limits:** 500MB max (adjustable)

## 🧪 Testing

```bash
# Health check
curl http://localhost:3001/health

# Expected: {"status":"ok","message":"Backend server is running"}
```

## 🚢 Deployment

### Production Build
```bash
npm run build
NODE_ENV=production npm start
```

### Environment Variables for Production
```env
NODE_ENV=production
PORT=3001
ASSEMBLYAI_API_KEY=your_production_key
MAX_FILE_SIZE=524288000
```

## 📝 Development

```bash
# Watch mode with auto-reload
npm run dev

# Build TypeScript
npm run build

# Clean build files
npm run clean
```

## 🤝 Integration with Frontend

Update frontend API calls to point to backend:

```typescript
// In frontend .env.local
NEXT_PUBLIC_BACKEND_URL=http://localhost:3001

// In frontend code
const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/upload`, {
  method: 'POST',
  body: formData,
});
```

## 📄 License

ISC

## 👨‍💻 Author

Priyanshu Joshi - joshi.priyanshu999@gmail.com

