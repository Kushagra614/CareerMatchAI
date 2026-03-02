# CareerMatch AI - Setup & Deployment Guide

## Overview

This guide covers setting up CareerMatch AI with the free, open-source technology stack:
- **Frontend**: Next.js 14 + React 18
- **LLM**: Ollama + Mistral 7B
- **Speech Recognition**: Web Speech API (browser-native)
- **Text-to-Speech**: Piper TTS

## Prerequisites

### System Requirements
- **OS**: Linux, macOS, or Windows (with WSL2)
- **RAM**: Minimum 8GB (16GB recommended for Ollama + Mistral 7B)
- **Disk Space**: 20GB+ free space
- **Node.js**: 18.0.0 or higher
- **GPU** (optional but recommended): NVIDIA GPU with CUDA support for faster LLM inference

### Required Software
```bash
# Check Node.js version
node --version  # Should be v18.0.0+
npm --version   # Should be v8.0.0+
```

## Installation Steps

### Step 1: Clone the Repository

```bash
git clone https://github.com/Kushagra614/CareerMatchAI.git
cd CareerMatchAI
```

### Step 2: Install Dependencies

```bash
npm install
```

This will install:
- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Zustand (state management)

### Step 3: Install Ollama

Ollama provides the Mistral 7B LLM for career analysis.

#### macOS
```bash
# Download and install from https://ollama.ai
# Or use Homebrew
brew install ollama

# Start Ollama
ollama serve
```

#### Linux
```bash
# Install Ollama
curl https://ollama.ai/install.sh | sh

# Start Ollama
ollama serve
```

#### Windows
```bash
# Download installer from https://ollama.ai
# Or use WSL2 and follow Linux instructions
```

#### Pull Mistral Model
```bash
# In a new terminal (keep ollama serve running)
ollama pull mistral

# Verify installation
ollama list
```

### Step 4: Install Piper TTS (Optional but Recommended)

Piper provides text-to-speech synthesis for reading out career recommendations.

#### macOS
```bash
brew install piper-tts

# Or from source
git clone https://github.com/rhasspy/piper.git
cd piper
make install
```

#### Linux
```bash
# Download pre-built binary
wget https://github.com/rhasspy/piper/releases/download/[VERSION]/piper_[PLATFORM].tar.gz
tar xzf piper_[PLATFORM].tar.gz

# Download voice model
./piper/download-voice.sh en_US-lessac-medium
```

#### Windows
```bash
# Download from https://github.com/rhasspy/piper/releases
# Extract and add to PATH
```

### Step 5: Start Piper TTS Server (Optional)

```bash
# Start Piper server (runs on port 8000)
python -m piper.http_server --host localhost --port 8000
```

If you don't have a Piper server, the app will gracefully degrade to browser-native text-to-speech using the Web Audio API.

### Step 6: Run Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

## Configuration

### Environment Variables

Create a `.env.local` file:

```env
# Ollama Configuration
NEXT_PUBLIC_OLLAMA_BASE_URL=http://localhost:11434
NEXT_PUBLIC_OLLAMA_MODEL=mistral

# Piper TTS Configuration (optional)
NEXT_PUBLIC_PIPER_BASE_URL=http://localhost:8000

# Web Speech API Configuration
NEXT_PUBLIC_WEB_SPEECH_LANGUAGE=en-US
```

### Browser Support

**Web Speech API** works on:
- ✅ Chrome/Edge 25+
- ✅ Safari 14.1+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)
- ❌ Firefox (limited support)

If your browser doesn't support Web Speech API, consider using Chrome or Edge.

## Running the Application

### Development Mode
```bash
npm run dev
```
Visit [http://localhost:3000](http://localhost:3000)

### Production Build
```bash
npm run build
npm start
```

### Linting
```bash
npm run lint
```

## Architecture

### Services Hierarchy

```
┌─────────────────────────────────────────┐
│        InterviewFlow Component          │
├─────────────────────────────────────────┤
│                                         │
├─── VoiceRecorder (Web Speech API) ──────┤
│    └─ WebSpeechAPIService              │
│                                         │
├─── TranscriptDisplay ───────────────────┤
│                                         │
├─── ProgressBar ──────────────────────────┤
│                                         │
├─── CareerReport (Recommendation) ───────┤
│    └─ OllamaService (LLM inference)     │
│                                         │
└─────────────────────────────────────────┘
```

### Data Flow

```
1. User speaks
   ↓
2. Web Speech API captures audio
   ↓
3. Transcript sent to VoiceRecorder component
   ↓
4. Answer saved to Zustand store
   ↓
5. Move to next question (repeat 1-4 for 10 questions)
   ↓
6. After 10 answers collected:
   - Sent to Ollama for analysis
   - Mistral 7B generates career recommendations
   - Results displayed in CareerReport component
```

## Troubleshooting

### Ollama Connection Error

**Problem**: "Failed to connect to Ollama"

**Solution**:
```bash
# Make sure Ollama is running
ollama serve

# Check if service is available
curl http://localhost:11434/api/tags

# Ensure correct URL in .env.local
NEXT_PUBLIC_OLLAMA_BASE_URL=http://localhost:11434
```

### Web Speech API Not Working

**Problem**: Microphone not detected or permission denied

**Solution**:
1. Check browser support (use Chrome/Edge/Safari)
2. Allow microphone permissions:
   - Go to browser settings → Privacy → Permissions
   - Ensure "Microphone" is allowed for localhost:3000
3. Check system microphone:
   ```bash
   # Linux
   arecord -l
   
   # macOS
   system_profiler SPAudioDataType
   ```

### Piper TTS Server Error

**Problem**: "Failed to connect to Piper"

**Solution**:
```bash
# Start Piper server
python -m piper.http_server --host localhost --port 8000

# Or download Piper binary and run directly
./piper --help
```

If Piper is unavailable, the app falls back to system text-to-speech.

### Out of Memory

**Problem**: "CUDA out of memory" or crash during LLM inference

**Solution**:
1. Increase swap space
2. Use smaller model: `ollama pull phi` or `ollama pull neural-chat`
3. Reduce concurrent requests
4. Close other applications

### npm install Fails

**Problem**: "ENOSPC: no space left on device"

**Solution**:
```bash
# Check disk space
df -h

# Clear npm cache
npm cache clean --force

# Install on system with 2GB+ free space
# Or use external drive
npm install --prefix /mnt/external
```

## Deployment

### Vercel (Frontend Only)

```bash
# Push to GitHub
git push origin main

# Connect to Vercel
vercel

# Deploy
vercel --prod
```

### Self-Hosted with Railway

```bash
# Install Railway CLI
npm install -g railway

# Login
railway login

# Deploy
railway up
```

### Docker Deployment

```dockerfile
# Dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

```bash
docker build -t careermatch-ai .
docker run -p 3000:3000 \
  -e NEXT_PUBLIC_OLLAMA_BASE_URL=http://host.docker.internal:11434 \
  careermatch-ai
```

## Performance Optimization

### Ollama Inference Optimization

```bash
# Use GPU acceleration (if available)
export CUDA_VISIBLE_DEVICES=0
ollama serve

# For CPU-only systems
export OLLAMA_NUM_THREADS=4
ollama serve
```

### Frontend Optimization

```bash
# Enable compression
npm run build

# Check bundle size
npm run analyze  # If you have webpack-bundle-analyzer installed
```

## Security Considerations

### Data Privacy

- ✅ No external API calls except to local services
- ✅ All data stays on your machine
- ✅ No cloud storage or analytics
- ✅ No user tracking

### HTTPS in Production

```bash
# Generate self-signed certificate
openssl req -x509 -newkey rsa:4096 -nodes -out cert.pem -keyout key.pem -days 365

# Use with next.js
npm install next-secure-headers
```

## Monitoring & Logging

### Enable Debug Logging

```env
# .env.local
DEBUG=careermatch:*
```

### Check Service Health

```bash
# Ollama health
curl http://localhost:11434/api/tags

# Piper health
curl http://localhost:8000/api/voices

# Frontend health
curl http://localhost:3000/api/health  # If endpoint exists
```

## Advanced Configuration

### Custom Ollama Models

```bash
# List available models
ollama list

# Pull alternative models
ollama pull neural-chat  # 4.7GB, faster inference
ollama pull dolphin-mixtral  # 26GB, higher quality
```

### Custom Voice Models (Piper)

```bash
# List available voices
./piper/download-voice.sh --help

# Download Spanish voice
./piper/download-voice.sh es_ES-shivam-medium
```

## Support & Resources

- **Ollama**: https://github.com/jmorganca/ollama
- **Piper TTS**: https://github.com/rhasspy/piper
- **Next.js**: https://nextjs.org/docs
- **Web Speech API**: https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API

## License

MIT License - See LICENSE file

---

**Last Updated**: March 2026  
**Version**: 1.0.0
