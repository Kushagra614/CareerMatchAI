# CareerMatch AI

An AI-powered career guidance platform for students using open-source technology stack.

**Status:** 🔄 In Development

## 🎯 Overview

CareerMatch AI provides intelligent, voice-based career counseling through a modern web application. It guides students through personalized interviews and delivers AI-powered career recommendations with detailed insights.

**Key Features:**
- 🎤 Real-time voice input with live transcripts
- 🤖 AI-powered intelligent questioning and conversation memory
- 📊 Personalized career recommendations with match scores
- 🎯 Skill gap analysis and learning suggestions
- ⚡ 10-question interview flow
- 📱 Responsive, mobile-friendly design

## 📋 Tech Stack

- **Frontend**: Next.js 14 + React 18 + TypeScript + Tailwind CSS
- **State Management**: Zustand
- **Speech-to-Text**: Web Speech API
- **Text-to-Speech**: Piper TTS
- **AI Engine**: Ollama + Mistral 7B LLM
- **Hosting**: Vercel (Frontend)

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Ollama installed with Mistral 7B model
- Piper TTS installed

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
src/
├── app/                  # Next.js app directory
├── components/           # React components
├── services/             # API integration
├── store/                # Zustand state management
├── types/                # TypeScript interfaces
└── lib/                  # Utility functions
```

## 🎯 Interview Features

- 10 strategic career-discovery questions
- Real-time voice input and transcript display
- AI-powered conversation memory
- Personalized career recommendations
- Match scores and skill development paths

## � Deployment

```bash
# Build for production
npm run build

# Deploy to Vercel
vercel deploy --prod
```

## � License

MIT License

---

**Status**: � In Development  
**Last Updated**: March 2026
