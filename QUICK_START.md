# 🚀 Quick Start Guide - CareerMatch AI

## Run It Now

```bash
cd /home/kushagra-vardhan/Kush/Work/Projects/CareerMind
npm run dev
```

Then open: **http://localhost:3000**

---

## Build for Production

```bash
npm run build
npm start
```

---

## Deploy to Vercel (1 Click)

1. Go to https://vercel.com
2. Click "Import Project"
3. Select your GitHub repository: `Kushagra614/CareerMatchAI`
4. Click "Deploy"
5. Done! 🎉

---

## What Works Out of the Box

✅ Full 10-question interview flow  
✅ Speech-to-text (Web Speech API)  
✅ Career analysis with fallback mock data  
✅ Live transcripts with confidence scoring  
✅ Career recommendations display  
✅ Responsive design (mobile + desktop)  

---

## Optional: Enable Ollama AI

To use real Mistral 7B LLM (instead of mock data):

```bash
# 1. Install Ollama
# Visit https://ollama.ai and download

# 2. Pull Mistral model
ollama pull mistral

# 3. Start Ollama service
ollama serve

# 4. The app will automatically detect and use it
```

When Ollama is running, the app will use real AI for career analysis instead of mock data.

---

## Optional: Enable Piper TTS

To add spoken recommendations:

```bash
# 1. Install Piper
# Follow https://github.com/rhasspy/piper

# 2. Run Piper service
piper-server --cuda

# 3. The app will automatically detect and use it
```

---

## File Structure

```
src/
├── app/
│   ├── layout.tsx      # Root layout
│   └── page.tsx        # Home page
├── components/
│   ├── Hero.tsx                # Landing section
│   ├── InterviewFlow.tsx        # Main interview (with Ollama)
│   ├── VoiceRecorder.tsx        # Voice input (with Web Speech API)
│   ├── TranscriptDisplay.tsx    # Live transcripts
│   ├── ProgressBar.tsx          # Progress tracking
│   └── CareerReport.tsx         # Results display
├── services/
│   ├── ollama.ts                # Mistral 7B LLM
│   ├── webspeech.ts             # Speech recognition
│   ├── piper.ts                 # Text-to-speech
│   └── index.ts                 # Service exports
├── store/
│   └── interview.ts             # Zustand state management
└── types/
    └── index.ts                 # TypeScript interfaces

public/
├── favicon.ico
└── (static assets)

.github/
└── workflows/                   # CI/CD ready (optional)
```

---

## Environment Variables

Create `.env.local` if you want to customize:

```
# Ollama Configuration
NEXT_PUBLIC_OLLAMA_BASE_URL=http://localhost:11434
NEXT_PUBLIC_OLLAMA_MODEL=mistral

# Piper Configuration
NEXT_PUBLIC_PIPER_BASE_URL=http://localhost:8000
NEXT_PUBLIC_PIPER_VOICE=en_US-lessac

# Interview Configuration
NEXT_PUBLIC_INTERVIEW_QUESTIONS=10
```

---

## Supported Browsers

| Browser | Support | Notes |
|---------|---------|-------|
| Chrome | ✅ Full | Web Speech API native |
| Edge | ✅ Full | Web Speech API native |
| Safari | ✅ Full | Web Speech API native |
| Firefox | ⚠️ Partial | Web Speech API limited |
| Opera | ✅ Full | Chromium-based |

---

## Troubleshooting

### Port 3000 Already in Use
```bash
npm run dev -- -p 3001
```

### npm install fails
```bash
rm -rf node_modules package-lock.json
npm install
```

### TypeScript errors
```bash
npm run build
```

### Need more help?
See **SETUP_GUIDE.md** for comprehensive troubleshooting

---

## Key Features

🎯 **AI-Powered Interview**
- Context-aware questions
- Intelligent analysis
- Career recommendations

🎤 **Voice Input**
- Real-time speech recognition
- Live transcription
- Confidence scoring

📊 **Career Analysis**
- 3 ranked recommendations
- Match scores (0-100%)
- Skill development paths

📱 **Responsive Design**
- Mobile-friendly
- Desktop optimized
- Works on tablets

🔒 **Privacy**
- All processing local (optional Ollama)
- No user data stored
- Open-source stack

---

## Version Info

- **Project**: CareerMatch AI
- **Version**: 1.0.0
- **Status**: Production Ready ✅
- **Last Updated**: March 2, 2026
- **Tech Stack**: Next.js 14, React 18, TypeScript, Ollama, Web Speech API
- **License**: Open Source

---

## Commands Reference

```bash
# Development
npm run dev              # Start dev server (port 3000)

# Production
npm run build            # Create optimized build
npm start                # Run production server

# Code Quality
npm run lint             # Run ESLint

# Clean Install
npm ci                   # Install exact versions
npm audit fix            # Fix vulnerabilities

# Git
git push origin main     # Push to GitHub
```

---

**Ready to launch your career counselor AI? Start with `npm run dev`! 🚀**

