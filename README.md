# 🚗 6ixKar - Your Canadian Car Buying Companion

![6ixKar Banner](https://img.shields.io/badge/Made%20for-Canada%20🍁-red?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-16.0-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Python](https://img.shields.io/badge/Python-3.11-blue?style=for-the-badge&logo=python)
![Gemini AI](https://img.shields.io/badge/Gemini-AI-orange?style=for-the-badge)

**6ixKar** is an AI-powered Canadian car buying companion that helps users make informed vehicle purchase decisions by providing real-time market insights, ML-powered valuations, financial calculations, and personalized recommendations tailored specifically for the Canadian market.

## 🌟 Live Demo

🔗 **[Visit 6ixKar](https://your-app-url.vercel.app)** *(Coming Soon)*

## 📸 Screenshots

- **Landing Page**: Interactive 3D car animation with smooth scrolling
- **AI Chat**: Ask questions about Canadian car buying
- **Budget Simulator**: Calculate 5-year ownership costs
- **ML Predictions**: Real-time car valuation and depreciation analysis

## 🎯 The Problem We Solve

- **46% of car buyers** experience buyer's remorse after purchasing
- Car buying requires **dozens of hours of research**
- Hidden costs (insurance, maintenance, fuel) are often overlooked
- Provincial differences in insurance rates make it complex
- No single tool provides end-to-end guidance for Canadian buyers

## ✨ Key Features

### 🤖 6ixBot AI Assistant (Powered by Gemini 2.0)
- Natural language chat interface
- Car recommendations based on budget and province
- Winter readiness assessments
- Provincial insurance comparisons
- Financing advice (lease vs. buy)
- Total cost of ownership breakdowns

### 🎯 ML-Powered Car Predictions
- **Real-time Valuation**: AI predicts fair market value
- **Depreciation Analysis**: 5-year depreciation forecasting
- **Live Processing**: See actual ML computation time
- **Model Confidence**: Transparency in predictions
- **Car Catalog**: Curated selection with instant predictions

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

### 🎨 Modern UI/UX
- **3D Landing Page**: Interactive Three.js car scene with WebGL
- **Smooth Animations**: Framer Motion powered transitions
- **Responsive Design**: Mobile-first approach
- **Dark Theme**: Eye-friendly dark mode with red/orange accents

## 🏗️ Tech Stack

### Frontend
- **Framework**: Next.js 16 (App Router)
- **UI Library**: React 19
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **3D Graphics**: Three.js, React Three Fiber, React Three Drei
- **Charts**: Recharts
- **Icons**: Lucide React

### Backend & APIs
- **API Routes**: Next.js API Routes (serverless)
- **AI Chat**: Google Gemini 2.0 Flash
- **Authentication**: Clerk
- **ML Service**: Python FastAPI

### ML/AI Stack
- **Framework**: FastAPI (Python 3.11)
- **ML Library**: scikit-learn
- **Models**: Random Forest Regressor
- **Features**: 
  - Car valuation prediction
  - Depreciation rate forecasting
  - Real-time inference with confidence scores

### Deployment
- **Frontend**: Vercel (recommended)
- **ML Backend**: Render / Railway (free tier)
- **Cost**: $0/month for hobby projects

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
GEMINI_API_KEY=your_gemini_api_key_here

# ML Service URL
NEXT_PUBLIC_ML_API_URL=http://localhost:8000
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
5. Paste it into your `.env.local` file as `GEMINI_API_KEY`

**Note**: The free tier includes 60 requests per minute, 1,500 requests per day - perfect for development!

### 🎓 Detailed Setup Guides

For comprehensive setup instructions:
- **Local Development**: See [LOCAL_SETUP_GUIDE.md](./LOCAL_SETUP_GUIDE.md)
- **Production Deployment**: See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)

### Running the Application

#### Quick Start (Frontend Only)

```powershell
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

**Features Available:**
- ✅ 3D Landing Page
- ✅ Authentication (Sign Up/Sign In)
- ✅ AI Chat with 6ixBot
- ✅ Budget Simulator
- ❌ ML Predictions (requires Python service)

#### Full Stack (Frontend + ML Service)

**Terminal 1: Python ML Service**
```powershell
cd python-ml-service
pip install -r requirements.txt
python run.py
```

**Terminal 2: Next.js App**
```powershell
npm run dev
```

**All Features Available:**
- ✅ Everything above, plus:
- ✅ Real-time car valuation
- ✅ Depreciation predictions
- ✅ ML service status monitoring
- ✅ Processing time indicators

### 🏗️ Build for Production

```powershell
npm run build
npm start
```

## 📁 Project Structure

```
6ixcar/
├── app/                    # Next.js App Router
│   ├── page.tsx           # Landing page (3D)
│   ├── dashboard/         # Main app dashboard
│   ├── sign-in/           # Clerk authentication
│   ├── sign-up/           # Clerk authentication
│   └── api/               # API routes
│       ├── chat/          # Gemini AI endpoint
│       ├── ml-valuation/  # ML prediction proxy
│       ├── ml-depreciation/ # ML depreciation proxy
│       └── ml-status/     # ML health check
├── components/            # React components
│   ├── Landing3D.tsx     # Three.js car scene
│   ├── CarCatalog.tsx    # Car selection UI
│   ├── CarPredictions.tsx # ML results display
│   ├── ChatInterface.tsx # AI chatbot UI
│   └── DashboardClient.tsx # Main dashboard
├── python-ml-service/     # FastAPI ML backend
│   ├── main.py           # FastAPI app
│   ├── models/           # ML models
│   │   ├── valuation.py # Car valuation predictor
│   │   └── depreciation.py # Depreciation model
│   └── requirements.txt  # Python dependencies
├── lib/                   # Utilities
│   ├── constants.ts      # App configuration
│   └── gemini.ts         # Gemini AI client
└── public/               # Static assets
```

## 🚀 Deployment

### Vercel (Frontend)

1. Push your code to GitHub
2. Import project on [Vercel](https://vercel.com)
3. Add environment variables (Clerk, Gemini API keys)
4. Deploy

### Render (ML Backend)

1. Create web service on [Render](https://render.com)
2. Connect GitHub repo
3. Render will use `render.yaml` config
4. Copy the URL and update `NEXT_PUBLIC_ML_API_URL` in Vercel

**Detailed instructions**: See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Mohammed Faraz Kabbo**  
Computer Science @ York University  
*"Late nights, lots of research, and a shared vision of making car buying accessible to every Canadian!"*

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing React framework
- [Clerk](https://clerk.com/) for seamless authentication
- [Google Gemini](https://ai.google.dev/) for powerful AI capabilities
- [Vercel](https://vercel.com/) for effortless deployment
- [Three.js](https://threejs.org/) for stunning 3D graphics

---

**Made with ❤️ for Canada 🍁**
