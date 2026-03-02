# CareerMatch AI - Product Requirements Document

**Version**: 1.0 (In Progress)  
**Type**: Web Application  
**Status**: Active Development  
**Cost to Build**: Zero (100% Free Stack)

---

## 1. Problem Statement

Millions of students in India — especially in Tier 2 and Tier 3 cities — graduate without any real career direction. They either:
- Guess their career path
- Follow what their friends do
- Can't afford expensive career counselors (₹10,000-50,000+ per session)

**Result**: Massive employability gap where people end up in careers that don't fit them.

**The Gap**: There is no accessible, intelligent, and **free** career guidance tool built for the next billion.

---

## 2. What We Are Building

A **real-time AI-powered voice interview platform** that talks to a student like a career counselor would:

1. Student opens app → clicks "Start Interview"
2. AI greets them and begins asking questions one by one
3. Student answers by speaking (no typing required)
4. AI listens, processes, and asks the next question
5. After 8-10 questions, AI analyzes everything
6. **Generates personalized career report with match scores**

**Key Difference**: No forms. No quizzes. No cost. Just a conversation.

---

## 3. How It Works

```
┌─────────────────────────────────────────────┐
│  Student Opens App (http://localhost:3000)  │
└────────────┬────────────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────────┐
│  Clicks "Start Interview"                   │
│  AI Greets: "Hi! Let's find your career"    │
└────────────┬────────────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────────┐
│  Question 1: Educational Background?        │
│  Student speaks answer (Web Speech API)     │
│  Transcript appears in real-time            │
│  AI processes with Mistral 7B (Ollama)      │
└────────────┬────────────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────────┐
│  Repeat for Questions 2-10                  │
│  AI remembers all previous answers          │
└────────────┬────────────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────────┐
│  AI Analyzes All Responses                  │
│  Generates Career Recommendations           │
│  Creates Personalized Report                │
└────────────┬────────────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────────┐
│  🥇 Top 3 Career Recommendations            │
│  With Match Scores & Skill Paths            │
│  User Downloads Report (PDF)                │
└─────────────────────────────────────────────┘
```

---

## 4. Tech Stack (100% FREE)

| Component | Technology | Why | Cost |
|-----------|-----------|-----|------|
| **Frontend** | Next.js 14 + React 18 + TypeScript + Tailwind CSS | Fast, modern, full-stack capable | Free |
| **Speech-to-Text** | Web Speech API (Browser built-in) | Zero cost, works in Chrome/Edge/Safari | Free |
| **AI Brain (LLM)** | Ollama + Mistral 7B | Free, open-source, runs locally or on server | Free |
| **Text-to-Speech** | Piper TTS (Open-source) | Natural voice output, zero cost | Free |
| **Backend** | Node.js | Free, serverless-ready | Free |
| **Hosting** | Vercel (frontend) + Railway (backend) | Free tier available | Free |
| **Database** | PostgreSQL (optional) | Free tier on Railway | Free |
| **Vector DB** | Chroma (if needed) | Open-source embedding storage | Free |

**Total Monthly Cost**: **₹0** (completely free)

---

## 5. Why This Stack

### Ollama + Mistral 7B (Instead of Claude/GPT)
- **Run powerful LLMs locally** - no API bills ever
- **Privacy-first** - user data never leaves your server
- **Mistral 7B** - competitive quality, 7B parameters is plenty for this use case
- **Can fine-tune** - collect real interview data from users and improve the model over time

### Web Speech API (Instead of Deepgram)
- **Built into the browser** - Chrome, Edge, Safari all support it
- **Zero API costs** - no Deepgram, no Whisper API, just native browser functionality
- **Works offline** - speech recognition happens in the browser

### Piper TTS (Instead of ElevenLabs)
- **Open-source voice synthesis** - natural-sounding output
- **Zero monthly costs** - no per-request billing
- **Fast** - real-time text-to-speech
- **Multiple voices available** - can choose voice for different scenarios

### Node.js Backend
- **Runs Ollama locally** - can deploy on Railway, AWS, or your own server
- **Process conversation history** - maintain context between questions
- **Career matching logic** - run the recommendation algorithm

### Free Hosting
- **Vercel** (Frontend) - Free tier includes 100GB bandwidth, serverless functions
- **Railway** (Backend) - Free tier includes $5 credits/month (plenty for MVP)

---

## 6. The 10 Interview Questions

| # | Question | What It Reveals | Category |
|---|----------|-----------------|----------|
| 1 | Tell me about your educational background | Academic foundation and achievements | Education |
| 2 | What are you naturally good at? | Core strengths and innate abilities | Strengths |
| 3 | Do you prefer working alone or with people? | Collaboration preference | Personality |
| 4 | Do you like routine or variety in your day? | Work style and stimulation needs | Work Style |
| 5 | What matters more — money, stability, or creativity? | Core values and motivations | Motivation |
| 6 | How do you handle stress and tight deadlines? | Resilience and pressure handling | Resilience |
| 7 | Are you open to travel or field-based work? | Flexibility and role preference | Mobility |
| 8 | Where do you see yourself in 5 years? | Ambition level and vision | Ambition |
| 9 | Any industries you love or want to avoid? | Interests and deal-breakers | Interests |
| 10 | How do you feel about managing or leading people? | Leadership appetite | Leadership |

---

## 7. The Output - Career Report

After the interview, the user receives a personalized report:

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
         YOUR CAREER RECOMMENDATIONS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🥇 BEST FIT — Software Development — 92% Match
   Because you are:
   ✓ Analytical and detail-oriented
   ✓ Prefer independent work
   ✓ Enjoy problem-solving
   
   Skills to Build:
   • Advanced Data Structures & Algorithms
   • System Design
   • Cloud Architecture (AWS/Azure)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🥈 SECOND CHOICE — Data Analytics — 85% Match
   Because you are:
   ✓ Detail-oriented
   ✓ Drawn to patterns and logic
   ✓ Enjoy extracting insights
   
   Skills to Build:
   • SQL & Database Design
   • Python/R for Data Science
   • Tableau/Power BI

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🥉 THIRD CHOICE — Consulting/Strategy — 76% Match
   Because you are:
   ✓ Good communicator
   ✓ Thrive in variety
   ✓ Enjoy problem framing
   
   Skills to Build:
   • Business Acumen
   • Advanced Communication
   • Strategic Thinking Frameworks

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📊 YOUR PROFILE SUMMARY
   Personality: Analytical Problem-Solver
   Work Style: Structured with Creative Elements
   Motivations: Growth, Impact, Stability
   Leadership: Open to Future Leadership Roles

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

Each recommendation includes:
- **Why it fits you** - reasoning based on your answers
- **Match score** - 0-100% based on profile analysis
- **Next steps** - what skills to develop
- **Resources** - where to learn those skills

---

## 8. Features - V1 (Building Now)

### Core Interview Engine
- ✅ Voice input via **Web Speech API** (no cost)
- ✅ **Mistral 7B via Ollama** as the AI brain
- ✅ **Piper TTS** reads questions out loud
- ✅ Live transcript displayed on screen as user speaks
- ✅ Conversation memory - AI remembers all previous answers
- ✅ Career report with match scores and clear reasoning

### User Experience
- ✅ Beautiful, responsive UI (Next.js + Tailwind)
- ✅ Progress tracker (shows which question you're on)
- ✅ Real-time transcript feedback
- ✅ Smooth animations and transitions
- ✅ Works on desktop and mobile

### Data Collection (For Future Training)
- ✅ Anonymized interview data collection
- ✅ User feedback on recommendation accuracy
- ✅ Foundation for model fine-tuning

---

## 9. Features - V2 (Next Phase)

- 📥 Downloadable PDF career reports
- 🌍 Multi-language support (Hindi, Tamil, Telugu, Marathi)
- 📚 Skill gap analysis with course suggestions
- 🏫 Admin dashboard for colleges and institutions
- 📊 Institution-wide analytics (how many students, top careers, etc.)
- 🔄 Fine-tuned LLM trained on real interview data from V1

---

## 10. AI Model Roadmap

### Phase 1 (NOW): Ollama + Mistral 7B
- **Strategy**: Prompt engineering + clever prompting
- **Accuracy**: 80-85% (good enough for MVP)
- **Cost**: Free
- **Timeline**: Weeks 1-4

### Phase 2 (6 Months): Fine-tune on Real Data
- **Strategy**: Collect interview transcripts from V1 users
- **Accuracy**: 90-92% (significantly better)
- **Cost**: Free (Ollama supports fine-tuning)
- **Timeline**: Months 3-6

### Phase 3 (Scale): Proprietary Career Matching Model
- **Strategy**: Build custom model trained on thousands of student profiles
- **Accuracy**: 93-95%+ (highly personalized)
- **Cost**: Development investment
- **Timeline**: Months 6-12

**Key Insight**: Architecture collects training data from day one, so the product gets smarter with every user.

---

## 11. Target Users

1. **College Students** - Unsure about their career path (prime audience)
2. **Fresh Graduates** - Entering the job market without direction
3. **Students in Tier 2/3 Cities** - Can't afford ₹10,000-50,000 counselor fees
4. **Universities & Colleges** - Want to offer AI career guidance at scale
5. **Career Services Centers** - Looking for technology solutions

---

## 12. Success Metrics (V1)

| Metric | Target | Why |
|--------|--------|-----|
| **Completion Rate** | 80%+ | Users who start complete the full interview |
| **Accuracy Rating** | 4+/5 | Users feel recommendations are accurate |
| **Session Duration** | 5-8 minutes | Fast enough to feel interactive |
| **Institutional Pilots** | 3+ by V2 | Validation from actual institutions |
| **Mobile Completion** | 60%+ | Mobile is primary access channel in India |

---

## 13. Build Timeline

| Week | Deliverable | Technical Focus |
|------|-------------|-----------------|
| **Week 1** | ✅ Ollama setup, Web Speech API working, Piper TTS integration | Core infrastructure ready |
| **Week 2** | ✅ Full 10-question interview flow, conversation memory, session management | Interview engine complete |
| **Week 3** | ✅ Career report output, scoring logic, UI polish, responsive design | Product-ready interface |
| **Week 4** | ✅ Testing, bug fixes, demo ready, documentation | Launch-ready |

**Current Status**: Week 1-2 complete (project structure, components, state management)

---

## 14. Technical Architecture

```
┌──────────────────────────────┐
│   FRONTEND (Next.js)         │
│   - React Components         │
│   - Tailwind CSS             │
│   - Web Speech API           │
│   - Zustand State            │
│   Hosted: Vercel             │
└──────────┬───────────────────┘
           │
           │ (HTTP/WebSocket)
           │
┌──────────▼───────────────────┐
│   BACKEND (Node.js)          │
│   - Conversation Logic       │
│   - Career Matching          │
│   - Ollama Integration       │
│   - Piper TTS Orchestration  │
│   Hosted: Railway            │
└──────────┬───────────────────┘
           │
           │
     ┌─────▼─────────────────────────────┐
     │ LOCAL/DOCKER SERVICES             │
     ├─────────────────────────────────┤
     │ Ollama + Mistral 7B (LLM)        │
     │ Piper TTS (Voice Output)         │
     │ PostgreSQL (Optional - Data)     │
     └─────────────────────────────────┘
```

---

## 15. Cost Analysis (vs Paid Alternatives)

| Solution | Cost/Month | Notes |
|----------|-----------|-------|
| **CareerMatch AI** | ₹0 | Free, open-source stack |
| **Paid Career Counselor** | ₹50,000+ per session | 1-2 sessions/month = ₹50K-100K |
| **Claude API** | ₹2,000-5,000 | 1M tokens/month usage |
| **Deepgram STT** | ₹1,000-3,000 | Speech-to-text only |
| **ElevenLabs TTS** | ₹500-2,000 | Text-to-speech only |
| **Combined Paid Stack** | ₹3,500-10,000 | Total API costs |

**Savings**: **100% free vs ₹3,500-10,000/month** with paid APIs

---

## 16. Why This Matters

> **Career counseling is a privilege. This project makes it a right.**

Any student with a **browser and internet** can now get the same quality guidance that only expensive counselors provided before:

- ✅ **Completely free** - No subscription fees
- ✅ **Personalized** - AI learns about your specific situation
- ✅ **Available 24/7** - No appointment needed
- ✅ **Private** - Data stays on your server
- ✅ **Scalable** - Serve thousands simultaneously

### Impact Potential
- **Reach**: Millions of students in India without career guidance
- **Timeline**: MVP in 4 weeks, scale in 6 months
- **Monetization** (Future): B2B institutional partnerships, not student fees

---

## 17. Success Stories (Future)

```
Student A (Tier 3 City):
"I took the CareerMatch interview and got 92% match for 
Software Engineering. Never thought I was analytical enough. 
Now I'm learning Python and applying to tech companies."

Student B (Fresh Graduate):
"Spent ₹25,000 on a human career counselor who didn't 
understand me. CareerMatch's report was 10x better and free."

College Director:
"We integrated CareerMatch for 5,000 students. Finally have 
data on what careers are best for our students. Placements 
are improving."
```

---

## 18. Launch Strategy

### Phase 1 (Week 5-6): Soft Launch
- Internal testing with 50-100 users
- Gather feedback on recommendations
- Optimize career matching algorithm

### Phase 2 (Week 7-8): Closed Beta
- Invite students from 2-3 colleges
- Track completion rates and accuracy
- Refine based on feedback

### Phase 3 (Week 9+): Open Beta
- Public launch (free)
- Institutional partnerships discussions
- Prepare for V2 features

---

## 19. Competitive Advantage

| Aspect | CareerMatch | Competitors |
|--------|-------------|-------------|
| **Cost** | Free | ₹500-50,000+ |
| **Language** | Will support Indian languages | English only |
| **Privacy** | Data stays local | Sent to cloud |
| **Speed** | Sub-second responses | Depends on API |
| **Offline** | Can work locally | Requires internet |
| **Customization** | Open-source, can fine-tune | Closed boxes |

---

**CareerMatch AI** | v1.0 | In Progress | Built with Ollama + Web Speech API + Piper TTS | 100% Free

---

*Democratizing career counseling for the next billion students.*
