# CareerAI - Installation & Setup Guide

## ⚠️ Current Status

The project structure has been fully scaffolded with all necessary files, components, and configuration. The development environment is ready, but disk space on the current system is full, preventing npm installation.

## 🚀 How to Complete the Setup

### Step 1: Use a Fresh Environment

Clone or move the project to a system with sufficient disk space (>2GB recommended for node_modules).

```bash
# Option 1: Clone from git after pushing
git clone <repository-url> CareerMind
cd CareerMind

# Option 2: Copy the project folder to a system with free space
cp -r /home/kushagra-vardhan/Kush/Work/Projects/CareerMind ~/CareerMind
cd ~/CareerMind
```

### Step 2: Install Dependencies

```bash
# Clear npm cache (optional but recommended)
npm cache clean --force

# Install all dependencies
npm install

# Verify installation
npm list
```

### Step 3: Configure Environment Variables

Create `.env.local` file (already exists with placeholders):

```bash
# Edit the .env.local file with your API keys
nano .env.local
```

Fill in the following API keys:

#### 🎤 Deepgram (Speech-to-Text)
1. Go to [https://console.deepgram.com/](https://console.deepgram.com/)
2. Create a free account
3. Generate an API key
4. Copy to `NEXT_PUBLIC_DEEPGRAM_API_KEY`

#### 🔊 ElevenLabs (Text-to-Speech)
1. Go to [https://elevenlabs.io/](https://elevenlabs.io/)
2. Create a free account
3. Generate an API key in settings
4. Copy to `NEXT_PUBLIC_ELEVENLABS_API_KEY`

#### 🤖 Anthropic Claude (AI Engine)
1. Go to [https://console.anthropic.com/](https://console.anthropic.com/)
2. Create an account
3. Generate an API key
4. Copy to `NEXT_PUBLIC_ANTHROPIC_API_KEY`

### Step 4: Run Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` in your browser.

### Step 5: Build for Production

```bash
npm run build
npm start
```

## 📋 Project Structure (Already Created)

```
CareerMind/
├── src/
│   ├── app/
│   │   ├── layout.tsx          ✅ Root layout
│   │   ├── page.tsx            ✅ Home page
│   │   └── globals.css         ✅ Global styles
│   │
│   ├── components/             ✅ All components created
│   │   ├── Hero.tsx
│   │   ├── InterviewFlow.tsx
│   │   ├── VoiceRecorder.tsx
│   │   ├── TranscriptDisplay.tsx
│   │   ├── ProgressBar.tsx
│   │   └── CareerReport.tsx
│   │
│   ├── hooks/                  📋 Ready for development
│   ├── services/               📋 Ready for development
│   ├── store/
│   │   └── interview.ts        ✅ Zustand store
│   ├── types/
│   │   └── index.ts            ✅ Type definitions
│   └── lib/
│       └── questions.ts        ✅ Interview questions
│
├── public/                     📁 Static assets folder
├── .env.local                  ✅ Environment template
├── .eslintrc.js               ✅ ESLint config
├── .gitignore                 ✅ Git ignore rules
├── tsconfig.json              ✅ TypeScript config
├── next.config.js             ✅ Next.js config
├── tailwind.config.ts         ✅ Tailwind config
├── postcss.config.js          ✅ PostCSS config
├── package.json               ✅ Dependencies
└── README.md                  ✅ Full documentation
```

## 📦 Dependencies

### Core
- **Next.js 14** - React framework
- **React 18** - UI library
- **TypeScript 5.3** - Type safety
- **Tailwind CSS 3.3** - Styling

### State Management
- **Zustand 4.4** - Lightweight state management

### Utilities
- **UUID 9.0** - ID generation

### To Add Later (after disk space freed)
- **@anthropic-ai/sdk** - Claude AI integration
- **@deepgram/sdk** - Speech-to-text
- **@elevenlabs/elevenlabs-js** - Text-to-speech
- **Axios** - HTTP client (optional)

## 🔧 Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run ESLint
npm run lint

# Run with turbopack (faster builds)
npm run dev -- --turbopack
```

## 🎯 Next Steps

1. ✅ **Setup Complete** - Project structure is ready
2. 📥 **Install Dependencies** - Run `npm install` on a system with free disk space
3. 🔑 **Add API Keys** - Fill `.env.local` with your API credentials
4. 🚀 **Run Development** - Execute `npm run dev`
5. 🧪 **Test Features** - Test voice recording and interview flow
6. 🔌 **Integrate APIs** - Connect Deepgram, ElevenLabs, and Claude

## 📖 Component Development Guide

### Hero Component (`src/components/Hero.tsx`)
- Landing page with CTA button
- Initializes interview session via Zustand store

### InterviewFlow Component (`src/components/InterviewFlow.tsx`)
- Manages interview state and progression
- Orchestrates question display and answer submission
- Triggers career report generation

### VoiceRecorder Component (`src/components/VoiceRecorder.tsx`)
- Records audio via Web Audio API
- Integrates with Deepgram for transcription (to be implemented)
- Handles audio blob processing

### CareerReport Component (`src/components/CareerReport.tsx`)
- Displays AI-generated career recommendations
- Shows match scores for 3 top careers
- Expandable skill recommendations

## 🔌 API Integration Points

The following services need to be integrated in `src/services/`:

1. **Deepgram Speech-to-Text**
   ```typescript
   // src/services/deepgram.ts
   export async function transcribeAudio(audioBlob: Blob): Promise<string>
   ```

2. **ElevenLabs Text-to-Speech**
   ```typescript
   // src/services/elevenlabs.ts
   export async function speakText(text: string): Promise<void>
   ```

3. **Anthropic Claude AI**
   ```typescript
   // src/services/claude.ts
   export async function getNextQuestion(conversationHistory): Promise<string>
   export async function generateCareerReport(answers): Promise<CareerReport>
   ```

## 🧠 Career Analysis Algorithm

The algorithm (to be implemented in `src/services/careerAnalysis.ts`) should:

1. Parse user answers across 10 questions
2. Extract signals for:
   - Technical aptitude
   - Soft skills
   - Personality type
   - Work preferences
   - Motivations
3. Match against career profiles
4. Generate scores (0-100%)
5. Create recommendation reasons

## 📱 UI/UX Features

- ✅ **Responsive Design** - Mobile-first approach
- ✅ **Gradient Backgrounds** - Modern styling
- ✅ **Animations** - Pulse effects, transitions
- ✅ **Progress Tracking** - Visual progress bar
- ✅ **Accessible Components** - ARIA labels ready
- ✅ **Dark Mode Ready** - Tailwind dark mode support

## 🐛 Troubleshooting

### Disk Space Error
```bash
# Clean npm cache
npm cache clean --force

# Remove node_modules if it exists
rm -rf node_modules
```

### Port 3000 Already in Use
```bash
# Use different port
npm run dev -- -p 3001
```

### TypeScript Errors
```bash
# Rebuild TypeScript
npx tsc --noEmit
```

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Guide](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Zustand Guide](https://zustand-demo.vercel.app/)
- [Deepgram API Docs](https://developers.deepgram.com/)
- [ElevenLabs API Docs](https://elevenlabs.io/docs)
- [Anthropic Claude API](https://console.anthropic.com/docs/api)

## 🎓 Learning Resources

For team members new to the tech stack:

1. **Next.js Fundamentals** - App Router, API routes, deployment
2. **React Hooks** - useState, useCallback, useRef, custom hooks
3. **Zustand Patterns** - Store creation, action handling, selectors
4. **Web Audio API** - MediaRecorder, getUserMedia, audio processing
5. **TypeScript Basics** - Interfaces, types, generics

## 📞 Support

- Check the main README.md for project overview
- Review component files for implementation examples
- Inspect Zustand store for state management patterns
- Type definitions in `src/types/index.ts` provide contract documentation

---

**Setup Date**: March 1, 2026  
**Status**: Ready for npm install  
**Next Action**: Free up disk space and run `npm install`
