# CareerAI - AI Voice Career Counselor

An intelligent, voice-based career counseling platform that guides students through personalized interviews and provides AI-powered career recommendations with detailed insights.

## 🎯 Product Overview

CareerAI is a web application designed to make professional career counseling accessible to everyone, especially students in Tier 2 and Tier 3 cities who can't afford expensive career advisors.

**Key Features:**
- 🎤 Real-time voice input with live transcripts
- 🤖 AI-powered intelligent questioning and conversation memory
- 📊 Personalized career recommendations with match scores
- 🎯 Skill gap analysis and learning suggestions
- ⚡ 5-8 minute complete interview flow
- 📱 Responsive, mobile-friendly design

## 📋 Tech Stack

- **Frontend**: Next.js 16 + React 19 + TypeScript + Tailwind CSS
- **State Management**: Zustand
- **Speech-to-Text**: Deepgram API
- **Text-to-Speech**: ElevenLabs API
- **AI Engine**: Anthropic Claude API
- **Hosting**: Vercel (Frontend) + Railway (Optional Backend)

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm/yarn
- API keys for: Deepgram, ElevenLabs, Anthropic Claude

### Installation

1. **Clone and navigate to the project:**
```bash
cd CareerMind
```

2. **Install dependencies:**
```bash
npm install
```

3. **Set up environment variables:**
```bash
# Edit .env.local with your API keys
nano .env.local
```

Fill in the following:
- `NEXT_PUBLIC_DEEPGRAM_API_KEY` - Get from [https://console.deepgram.com/](https://console.deepgram.com/)
- `NEXT_PUBLIC_ELEVENLABS_API_KEY` - Get from [https://elevenlabs.io/](https://elevenlabs.io/)
- `NEXT_PUBLIC_ANTHROPIC_API_KEY` - Get from [https://console.anthropic.com/](https://console.anthropic.com/)

4. **Run the development server:**
```bash
npm run dev
```

5. **Open in browser:**
```
http://localhost:3000
```

## 📁 Project Structure

```
CareerMind/
├── src/
│   ├── app/                      # Next.js app directory
│   │   ├── layout.tsx            # Root layout with metadata
│   │   ├── page.tsx              # Home page
│   │   └── globals.css           # Global styles
│   │
│   ├── components/               # React components
│   │   ├── Hero.tsx              # Landing page component
│   │   ├── InterviewFlow.tsx      # Main interview flow manager
│   │   ├── VoiceRecorder.tsx      # Voice recording & processing
│   │   ├── TranscriptDisplay.tsx  # Live transcript display
│   │   ├── ProgressBar.tsx        # Progress indicator
│   │   └── CareerReport.tsx       # Final career recommendations report
│   │
│   ├── hooks/                    # Custom React hooks
│   │   ├── useAudio.ts           # Voice recording hook
│   │   └── useConversation.ts    # Conversation management hook
│   │
│   ├── services/                 # API and external service integrations
│   │   ├── deepgram.ts           # Speech-to-text service
│   │   ├── elevenlabs.ts         # Text-to-speech service
│   │   ├── claude.ts             # AI conversation service
│   │   └── careerAnalysis.ts     # Career matching algorithm
│   │
│   ├── store/                    # Zustand state management
│   │   └── interview.ts          # Interview session store
│   │
│   ├── types/                    # TypeScript type definitions
│   │   └── index.ts              # All interfaces and types
│   │
│   └── lib/                      # Utility functions
│       └── questions.ts          # Interview questions database
│
├── public/                       # Static assets
├── .env.local                    # Environment variables (create this)
├── tsconfig.json                 # TypeScript configuration
├── next.config.js                # Next.js configuration
├── tailwind.config.ts            # Tailwind CSS configuration
├── postcss.config.js             # PostCSS configuration
├── package.json                  # Project dependencies
└── README.md                     # This file
```

## 📝 Interview Flow

The interview consists of 10 strategically designed questions:

1. **Educational Background** - Academic foundation and preferences
2. **Core Strengths** - Natural abilities and talents
3. **Work Environment** - Solo vs. team preference
4. **Work Style** - Routine vs. variety preference
5. **Core Motivation** - What drives success for you
6. **Stress & Resilience** - How you handle pressure
7. **Mobility & Travel** - Office, remote, or field-based work
8. **Ambition & Vision** - 5-year goals and success definition
9. **Industry Interests** - Preferred and avoided industries
10. **Leadership Appetite** - Management and leadership inclination

**Average Duration**: 5-8 minutes

## 🤖 How It Works

### Voice Interview Pipeline

```
1. User speaks → 
2. Audio captured by browser → 
3. Sent to Deepgram (speech-to-text) → 
4. Transcript displayed live → 
5. AI processes response → 
6. Claude generates next question → 
7. ElevenLabs speaks the question → 
8. Repeat until 10 questions answered
```

### Career Recommendation Algorithm

The AI analyzes:
- Educational background and academic strengths
- Expressed skills and natural abilities
- Personality traits (introvert/extrovert, structured/creative)
- Work style preferences (routine/variety, solo/team)
- Core motivations and values
- Stress handling and resilience
- Mobility and location preferences
- Ambition level and career vision
- Industry interests and deal-breakers
- Leadership aspirations

**Output**: Top 3 career recommendations with:
- Match score (0-100%)
- Reasoning for the recommendation
- Key skills to develop
- Learning path suggestions

## 🔌 API Endpoints

### Future Backend Endpoints (To be implemented)

```
POST /api/interview/start          # Initialize new interview
POST /api/interview/answer         # Submit answer
POST /api/interview/transcribe     # Convert audio to text
POST /api/interview/next-question  # Get next AI question
POST /api/interview/complete       # Finish interview & generate report
GET  /api/career-report/:sessionId # Retrieve career report
```

## 🎨 UI Components

- **Hero Page**: Landing with value proposition and CTA
- **Interview Screen**: Question display + voice recorder + live transcript
- **Progress Bar**: Visual progress through interview
- **Career Report**: Interactive career recommendations with expandable details
- **Skill Cards**: Visual skill recommendations
- **Action Buttons**: Next steps and report download

## 📊 Success Metrics (V1)

Target benchmarks:
- ✅ 80%+ interview completion rate
- ✅ 4+ out of 5 accuracy rating for recommendations
- ✅ 5-8 minute average session length
- ✅ Mobile-responsive on all devices

## 🛣️ Development Roadmap

### V1 (Current - Week 1-4)
- [x] Project setup and structure
- [x] Frontend components and UI
- [ ] Deepgram speech-to-text integration
- [ ] ElevenLabs text-to-speech integration
- [ ] Claude AI conversation integration
- [ ] Career analysis algorithm
- [ ] Interview flow completion
- [ ] Career report generation
- [ ] Testing and bug fixes

### V2 (Next Phase)
- [ ] PDF report download
- [ ] Multi-language support (Hindi, regional)
- [ ] Skill gap analysis with course suggestions
- [ ] Admin dashboard for institutions
- [ ] User account and history
- [ ] Shareable career insights
- [ ] Integration with job platforms

### V3 (Future)
- [ ] Video interview option
- [ ] Peer comparison insights
- [ ] Real-time job matching
- [ ] Career mentor connections
- [ ] Skill-building course integration
- [ ] Progress tracking dashboard

## 🔐 Environment Variables

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
NEXT_PUBLIC_DEEPGRAM_API_KEY=your_key
NEXT_PUBLIC_ELEVENLABS_API_KEY=your_key
NEXT_PUBLIC_ANTHROPIC_API_KEY=your_key
```

**Note**: Keys prefixed with `NEXT_PUBLIC_` are exposed to the browser. Use backend API calls for sensitive operations.

## 📦 Available Scripts

```bash
# Development server
npm run dev

# Production build
npm run build

# Start production server
npm start

# Run ESLint
npm run lint
```

## 🧪 Testing

Testing setup coming in V1.1:
```bash
npm run test
npm run test:coverage
```

## 🚀 Deployment

### Vercel (Frontend)

1. Push code to GitHub
2. Connect repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy automatically on push

```bash
vercel deploy --prod
```

### Railway (Optional Backend)

Coming in V2 when building dedicated backend.

## 📚 Documentation

- **API Docs**: See `docs/api.md` (coming soon)
- **Component Guide**: See `docs/components.md` (coming soon)
- **Setup Guide**: See this README
- **PRD**: See `PRD.md` in project root

## 🤝 Contributing

1. Create a feature branch: `git checkout -b feature/feature-name`
2. Make your changes
3. Test thoroughly
4. Commit with clear messages: `git commit -m "Add feature"`
5. Push to branch: `git push origin feature/feature-name`
6. Create Pull Request

## 🐛 Known Issues & Limitations

- V1 uses mock transcript (Deepgram integration in progress)
- Career algorithm is rule-based (AI training in progress)
- No user authentication in V1
- Browser must support Web Audio API
- Microphone access required

## 📧 Support & Contact

- 📧 Email: support@careerai.com (coming soon)
- 💬 Discord: Join our community (coming soon)
- 🐛 Issues: Report on GitHub

## 📄 License

MIT License - See LICENSE file for details

## 🎓 Acknowledgments

Built with the mission to democratize career counseling for the next billion students.

---

**Last Updated**: March 1, 2026  
**Version**: 1.0.0 (In Progress)  
**Status**: Active Development
