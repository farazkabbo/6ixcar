# 🚀 Quick Setup Guide for 6ixKar

Follow these steps to get your 6ixKar application running locally in under 10 minutes!

## Step 1: Install Dependencies

Open PowerShell in the project directory and run:

```powershell
npm install
```

This will install all required packages including:
- Next.js 16
- React 19
- Clerk (authentication)
- Google Gemini AI
- Framer Motion (animations)
- TailwindCSS

## Step 2: Get Your Clerk API Keys

### 2.1 Create a Clerk Account
1. Go to [https://clerk.com](https://clerk.com)
2. Click "Start building for free"
3. Sign up with your email or GitHub

### 2.2 Create an Application
1. Click "Add application"
2. Name it "6ixKar"
3. Choose authentication methods:
   - ✅ Email
   - ✅ Google (recommended)
   - ✅ GitHub (optional)

### 2.3 Copy API Keys
1. In your Clerk dashboard, click on your app
2. Go to "API Keys" in the left sidebar
3. Copy these two keys:
   - **Publishable key** (starts with `pk_test_...`)
   - **Secret key** (starts with `sk_test_...`)

### 2.4 Configure URLs (Important!)
1. In Clerk dashboard, go to "Paths"
2. Set these URLs:
   - Sign-in URL: `/sign-in`
   - Sign-up URL: `/sign-up`
   - After sign-in URL: `/dashboard`
   - After sign-up URL: `/dashboard`

## Step 3: Get Your Google Gemini API Key

### 3.1 Go to Google AI Studio
1. Visit [https://makersuite.google.com/app/apikey](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account

### 3.2 Create API Key
1. Click "Create API Key"
2. Select "Create API key in new project" or choose an existing project
3. Copy the generated key (it looks like `AIzaSy...`)

### 3.3 Free Tier Limits
- ✅ 60 requests per minute
- ✅ 1,500 requests per day
- ✅ Perfect for development and demos!

## Step 4: Create Environment Variables File

### 4.1 Create `.env.local` File
In the root of your project, create a file named `.env.local`:

```powershell
New-Item -Path ".env.local" -ItemType File
```

### 4.2 Add Your Keys
Open `.env.local` in your code editor and paste:

```env
# Clerk Authentication (Replace with YOUR keys)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_YOUR_KEY_HERE
CLERK_SECRET_KEY=sk_test_YOUR_KEY_HERE

# Clerk URLs (Keep these as-is)
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard

# Google Gemini API (Replace with YOUR key)
GOOGLE_GEMINI_API_KEY=AIzaSy_YOUR_KEY_HERE

# App Configuration (Keep as-is for local development)
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

**Important**: Replace the placeholder keys with your actual keys from Steps 2 and 3!

## Step 5: Setup Python ML Service (Optional but Recommended)

The ML service powers AI car valuation and depreciation predictions.

### 5.1 Check Python Installation
```powershell
python --version
```
You need Python 3.8 or higher.

### 5.2 Navigate to ML Service Directory
```powershell
cd python-ml-service
```

### 5.3 Install Python Dependencies
```powershell
pip install -r requirements.txt
```

This installs:
- FastAPI (web framework)
- scikit-learn (ML models)
- pandas & numpy (data processing)
- uvicorn (server)

### 5.4 Start ML Service
```powershell
# Option 1: Using the run script
python run.py

# Option 2: Direct uvicorn
python -m uvicorn main:app --reload --port 8000
```

The ML service will start at **http://localhost:8000**

### 5.5 Verify ML Service
Open browser to: **http://localhost:8000/docs**
You should see the FastAPI interactive documentation! 🎉

### 5.6 Return to Main Directory
```powershell
cd ..
```

## Step 6: Add ML Service URL to Environment

### 6.1 Open `.env.local`
Add this line:

```env
# ML Service URL (optional - for AI valuations)
ML_SERVICE_URL=http://localhost:8000
```

## Step 7: Run the Application

### 7.1 Start Development Server
```powershell
npm run dev
```

### 7.2 Open in Browser
Navigate to: **http://localhost:3000**

You should see the beautiful 6ixKar landing page! 🎉

## Step 8: Test the Application

### 6.1 Sign Up
1. Click "Get Started" or "Sign Up"
2. Create an account with email or Google
3. You'll be redirected to the dashboard

### 6.2 Test 6ixBot Chat
1. Click on "6ixBot Chat" tab
2. Try asking:
   - "What's the best SUV under $40,000 in Ontario?"
   - "Compare insurance rates between BC and Alberta"
   - "Is the Honda CR-V good for winter?"
3. Watch the AI respond in real-time!

### 6.3 Test Budget Simulator
1. Click on "Budget Simulator" tab
2. Adjust the sliders:
   - Car Price
   - Down Payment
   - Interest Rate
   - Loan Term
   - Province
3. Watch the calculations update in real-time!

## 🎨 What You Should See

### Landing Page Features:
✅ Animated gradient hero section
✅ Statistics cards with hover effects
✅ Feature cards that scale on hover
✅ "How It Works" steps
✅ Call-to-action buttons

### Dashboard Features:
✅ User profile in navbar
✅ Tab switcher with smooth transitions
✅ Chat interface with message bubbles
✅ Budget calculator with interactive sliders
✅ Real-time calculations

## 🐛 Troubleshooting

### Issue: "Module not found" errors
**Solution**: 
```powershell
rm -rf node_modules
rm package-lock.json
npm install
```

### Issue: Clerk authentication not working
**Solution**: 
- Check `.env.local` has correct keys
- Verify URLs are set correctly in Clerk dashboard
- Restart dev server: `Ctrl+C` then `npm run dev`

### Issue: Gemini AI not responding
**Solution**:
- Verify API key is correct in `.env.local`
- Check you haven't exceeded free tier limits
- Visit [https://makersuite.google.com](https://makersuite.google.com) to check key status

### Issue: Styles not loading correctly
**Solution**:
```powershell
# Delete Next.js cache
rm -rf .next
npm run dev
```

### Issue: Port 3000 already in use
**Solution**:
```powershell
# Use a different port
npm run dev -- -p 3001
```

## 📦 Build for Production

### Build the application
```powershell
npm run build
```

### Start production server
```powershell
npm start
```

## 🚀 Deploy to Vercel

### Option 1: Deploy from CLI
```powershell
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel
```

### Option 2: Deploy from GitHub
1. Push your code to GitHub
2. Go to [https://vercel.com](https://vercel.com)
3. Click "Import Project"
4. Select your repository
5. Add environment variables:
   - Copy all values from `.env.local`
   - Paste into Vercel's environment variables section
6. Click "Deploy"

## 🎯 Next Steps

Once everything is running:

1. **Customize the content**:
   - Edit `lib/constants.ts` to add more features
   - Update `app/page.tsx` for landing page changes

2. **Enhance the AI**:
   - Add more prompts in `lib/gemini.ts`
   - Train with car-specific data

3. **Add real data**:
   - Integrate with Autotrader API
   - Connect to insurance provider APIs
   - Add real financing calculations

4. **Improve UI**:
   - Add more animations
   - Create custom components
   - Add dark/light mode toggle

## 📚 Useful Resources

- **Next.js Docs**: [https://nextjs.org/docs](https://nextjs.org/docs)
- **Clerk Docs**: [https://clerk.com/docs](https://clerk.com/docs)
- **Gemini AI Docs**: [https://ai.google.dev/docs](https://ai.google.dev/docs)
- **TailwindCSS Docs**: [https://tailwindcss.com/docs](https://tailwindcss.com/docs)
- **Framer Motion Docs**: [https://www.framer.com/motion](https://www.framer.com/motion)

## 💡 Pro Tips

1. **Keep `.env.local` secure**: Never commit this file to Git!
2. **Use environment variables**: All API keys should be in `.env.local`
3. **Test authentication**: Always test sign-up, sign-in, and sign-out flows
4. **Check the console**: Open DevTools to see any errors
5. **Use hot reload**: Save files and watch changes appear instantly!

## 🎉 You're All Set!

Your 6ixKar application should now be running perfectly. Enjoy building and demoing your Canadian car buying companion!

**Need help?** Check the main README.md for more detailed information.

---

**🍁 Happy coding! 🚗**
