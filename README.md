# 🚗 6ixKar - Your Canadian Car Buying Companion

![6ixKar Banner](https://img.shields.io/badge/Made%20for-Canada%20🍁-red?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-16.0-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Gemini AI](https://img.shields.io/badge/Gemini-AI-orange?style=for-the-badge)

**6ixKar** is an AI-powered Canadian car buying companion that helps users make informed vehicle purchase decisions by providing real-time market insights, financial calculations, and personalized recommendations tailored specifically for the Canadian market.

## 🎯 The Problem We Solve

- **46% of car buyers** experience buyer's remorse after purchasing
- Car buying requires **dozens of hours of research**
- Hidden costs (insurance, maintenance, fuel) are often overlooked
- Provincial differences in insurance rates make it complex
- No single tool provides end-to-end guidance for Canadian buyers

## ✨ Key Features

### 🤖 6ixBot AI Assistant
- Natural language chat interface
- Car recommendations based on budget and province
- Winter readiness assessments
- Provincial insurance comparisons
- Financing advice (lease vs. buy)
- Total cost of ownership breakdowns

### 💰 Budget Simulator
- Interactive 5-year cost calculator
- Real-time calculations with sliders
- Provincial insurance rates (all 13 provinces/territories)
- Monthly payment, fuel, maintenance, and insurance breakdown
- Affordability recommendations based on income

### 🍁 Canadian-Specific Features
- **Provincial Insurance Rates**: Compare across all provinces
- **Winter Readiness Scores**: AWD, ground clearance, heating features
- **Canadian Banks**: RBC, TD, Scotia, BMO, CIBC financing options
- **Climate Considerations**: Tailored advice for prairie winters, coastal regions

## 🏗️ Tech Stack

### Frontend & Backend
- **Frontend**: Next.js 16, React 19, TypeScript, TailwindCSS, Framer Motion
- **Backend**: Next.js API Routes, Google Gemini AI
- **Auth**: Clerk
- **Deployment**: Vercel

### ML Service (Optional)
- **Framework**: FastAPI, Python 3.11
- **ML Models**: scikit-learn (Random Forest)
- **Features**: Car valuation, depreciation prediction
- **Deployment**: Railway/Render

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager
- A Clerk account (free tier available)
- A Google Gemini API key (free tier available)

### Installation

1. **Clone the repository**
```powershell
git clone https://github.com/farazkabbo/6ixcar.git
cd 6ixcar
```

2. **Install dependencies**
```powershell
npm install
```

3. **Set up environment variables**

Create a `.env.local` file in the root directory:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key_here
CLERK_SECRET_KEY=your_clerk_secret_key_here
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard

# Google Gemini API
GOOGLE_GEMINI_API_KEY=your_gemini_api_key_here

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000

# ML Service (Optional - for AI valuation)
ML_SERVICE_URL=http://localhost:8000
```

### 🔑 Getting API Keys

#### Clerk Setup (Authentication)

1. Go to [https://clerk.com](https://clerk.com)
2. Sign up for a free account
3. Create a new application
4. Choose authentication methods (Email, Google, GitHub, etc.)
5. Copy your **Publishable Key** and **Secret Key** from the dashboard
6. Paste them into your `.env.local` file

#### Google Gemini API Setup (AI Chat)

1. Go to [https://makersuite.google.com/app/apikey](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click **"Get API Key"** or **"Create API Key"**
4. Copy the generated API key
5. Paste it into your `.env.local` file as `GOOGLE_GEMINI_API_KEY`

**Note**: The free tier includes 60 requests per minute, 1,500 requests per day - perfect for development!

### Running the Application

#### Option 1: Basic (Without ML)

1. **Development mode**
```powershell
npm run dev
```

2. **Open your browser**
```
http://localhost:3000
```

#### Option 2: Full (With ML Service)

**Terminal 1: Start ML Service**
```powershell
cd python-ml-service
pip install -r requirements.txt
python run.py
```

**Terminal 2: Start Next.js App**
```powershell
npm run dev
```

The ML service adds:
- 🏷️ AI car valuation (fair market price)
- 📊 Deal scoring (0-100)
- 📉 5-year depreciation forecasting
- 💰 Resale value predictions

**Build for production**
```powershell
npm run build
npm start

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
