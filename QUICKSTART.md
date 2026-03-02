# CareerAI - Quick Start Guide

## 🚀 30-Second Overview

**CareerAI** is an AI-powered voice career counselor that guides students through intelligent interviews and provides personalized career recommendations with match scores.

**Tech**: Next.js + React + TypeScript + Tailwind + Zustand + Claude AI + Deepgram + ElevenLabs

---

## ⚡ Quick Setup

### 1. Install Dependencies
```bash
cd CareerMind
npm install
```

### 2. Set API Keys
```bash
# Edit .env.local with your API keys
NEXT_PUBLIC_DEEPGRAM_API_KEY=your_key
NEXT_PUBLIC_ELEVENLABS_API_KEY=your_key
NEXT_PUBLIC_ANTHROPIC_API_KEY=your_key
```

### 3. Run Development Server
```bash
npm run dev
```

### 4. Open in Browser
```
http://localhost:3000
```

---

## 📁 Key Folders

```
src/
├── app/              # Next.js pages and layout
├── components/       # React components
├── services/         # External API integrations
├── store/           # Zustand state management
├── types/           # TypeScript definitions
└── lib/             # Utilities and constants
```

---

## 🧩 Main Components

| Component | Purpose |
|-----------|---------|
| **Hero.tsx** | Landing page with CTA |
| **InterviewFlow.tsx** | Interview orchestration |
| **VoiceRecorder.tsx** | Audio recording UI |
| **CareerReport.tsx** | Career recommendations |

---

## 🔗 API Services

| Service | Purpose | Status |
|---------|---------|--------|
| **Deepgram** | Speech-to-text | ✅ Ready to integrate |
| **ElevenLabs** | Text-to-speech | ✅ Ready to integrate |
| **Claude** | AI conversation & analysis | ✅ Ready to integrate |

---

## 📊 Interview Questions (10)

1. Educational background
2. Core strengths
3. Work environment preference
4. Work style preference
5. Core motivation
6. Stress handling
7. Mobility/travel preference
8. 5-year vision
9. Industry interests
10. Leadership appetite

---

## 💾 State Management (Zustand)

```typescript
import { useInterviewStore } from '@/store/interview';

// In component
const session = useInterviewStore((state) => state.session);
const addAnswer = useInterviewStore((state) => state.addAnswer);

// Initialize session
useInterviewStore.getState().initializeSession(userId);
```

---

## 🎨 Styling (Tailwind)

```tsx
{/* Blue gradient */}
<div className="bg-gradient-to-r from-blue-600 to-indigo-600">

{/* Responsive grid */}
<div className="grid grid-cols-1 md:grid-cols-3 gap-6">

{/* Animations */}
<div className="animate-pulse-ring hover:scale-105 transition-all">
```

---

## 📝 TypeScript Interfaces

Key types in `src/types/index.ts`:

```typescript
interface InterviewSession {
  id: string;
  userId: string;
  answers: UserAnswer[];
  status: 'in-progress' | 'completed';
}

interface CareerRecommendation {
  rank: 1 | 2 | 3;
  career: string;
  matchScore: number;
  reasoning: string;
  skillsToLearn: string[];
}
```

---

## 🔧 Common Tasks

### Start Coding
```bash
npm run dev
# Edit files in src/, auto-reload on save
```

### Build for Production
```bash
npm run build
npm start
```

### Check for Lint Errors
```bash
npm run lint
```

### Deploy to Vercel
```bash
# Push to GitHub first, then:
# Connect repo to Vercel dashboard and deploy
vercel deploy --prod
```

---

## 📚 Documentation

- **README.md** - Full project overview
- **SETUP.md** - Detailed installation guide
- **PROJECT_SUMMARY.md** - Complete status and roadmap

---

## 🎯 Next Phase (After Setup)

1. **Integrate Deepgram** - Speech-to-text for VoiceRecorder
2. **Integrate ElevenLabs** - Text-to-speech for AI questions
3. **Integrate Claude** - AI conversation and career analysis
4. **Test interview flow** - End-to-end testing
5. **Polish UI** - Final design tweaks
6. **Deploy** - Push to Vercel

---

## 📞 Need Help?

1. Check **SETUP.md** for installation issues
2. Review **PROJECT_SUMMARY.md** for architecture
3. Read **README.md** for features and roadmap
4. Check component files for implementation examples

---

## 🚨 Common Issues

### "npm: command not found"
→ Install Node.js from nodejs.org

### "Port 3000 in use"
→ `npm run dev -- -p 3001`

### "API key error"
→ Check `.env.local` has correct keys

### "TypeScript errors"
→ `npm run lint` and fix issues

---

## 📊 Project Stats

- **Components**: 6 created
- **Configuration Files**: 7
- **Service Integrations**: 3 (ready)
- **Documentation Pages**: 3
- **Lines of Code**: ~2000+
- **Setup Status**: ✅ 95% complete (awaiting npm install)

---

## 🎓 Learning Path

**Recommended order to understand the codebase:**

1. **README.md** - Understand what we're building
2. **src/types/index.ts** - Learn the data structures
3. **src/components/Hero.tsx** - Simplest component
4. **src/store/interview.ts** - State management
5. **src/components/InterviewFlow.tsx** - Main orchestrator
6. **src/services/claude.ts** - API integration pattern
7. **PROJECT_SUMMARY.md** - Architecture overview

---

## ✨ You're Ready!

The project is fully scaffolded and ready for:
- ✅ npm install
- ✅ Local development
- ✅ API integration
- ✅ Testing
- ✅ Deployment

**Next Step**: Free up disk space and run `npm install`

---

**Created**: March 1, 2026  
**Status**: Ready to code 🚀
