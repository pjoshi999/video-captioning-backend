#!/bin/bash

echo "🚀 Starting Backend Server..."
echo ""

# Check if .env exists
if [ ! -f .env ]; then
    echo "⚠️  .env file not found!"
    echo "Creating .env from template..."
    echo "ASSEMBLYAI_API_KEY=your_api_key_here" > .env
    echo "PORT=3001" >> .env
    echo "NODE_ENV=development" >> .env
    echo ""
    echo "✏️  Please edit .env and add your AssemblyAI API key"
    echo "Then run: npm run dev"
    exit 1
fi

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
    echo ""
fi

# Start server
echo "🎬 Starting development server..."
npm run dev

