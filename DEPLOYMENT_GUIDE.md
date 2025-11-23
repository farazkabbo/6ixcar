# 6ixKar Deployment Guide

## Overview
Your app has two parts:
1. **Frontend (Next.js)** → Deploy to **Vercel**
2. **Backend (Python ML Service)** → Deploy to **Render**

---

## Part 1: Deploy Python Backend to Render

### Step 1: Prepare Python Service for Deployment

1. **Add a `requirements.txt`** (already exists in `python-ml-service/`)
   - Make sure it includes all dependencies

2. **Create `render.yaml`** in the root of your project:

```yaml
services:
  - type: web
    name: 6ixkar-ml-service
    env: python
    region: oregon
    buildCommand: "cd python-ml-service && pip install -r requirements.txt"
    startCommand: "cd python-ml-service && uvicorn main:app --host 0.0.0.0 --port $PORT"
    envVars:
      - key: PYTHON_VERSION
        value: 3.11.0
```

3. **Update `python-ml-service/main.py`** to allow CORS for your Vercel domain:

```python
# Add this after creating the FastAPI app
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with your Vercel URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

### Step 2: Deploy to Render

1. **Push your code to GitHub**:
   ```bash
   git add .
   git commit -m "Prepare for deployment"
   git push origin main
   ```

2. **Go to [Render.com](https://render.com)**:
   - Sign up/Login (use GitHub account)
   - Click **"New +"** → **"Web Service"**

3. **Connect your GitHub repo**:
   - Select `6ixcar` repository
   - **Build Command**: `cd python-ml-service && pip install -r requirements.txt`
   - **Start Command**: `cd python-ml-service && uvicorn main:app --host 0.0.0.0 --port $PORT`
   - **Environment**: Python 3

4. **Click "Create Web Service"**
   - Wait 5-10 minutes for deployment
   - Copy the URL (e.g., `https://6ixkar-ml-service.onrender.com`)

---

## Part 2: Deploy Frontend to Vercel

### Step 1: Update API Routes to Use Render URL

1. **Create `.env.local`** in your project root:
```env
NEXT_PUBLIC_ML_API_URL=https://6ixkar-ml-service.onrender.com
```

2. **Update API routes** to use the environment variable:

In `app/api/ml-valuation/route.ts`, `app/api/ml-depreciation/route.ts`, and `app/api/ml-status/route.ts`:

```typescript
const ML_API_URL = process.env.NEXT_PUBLIC_ML_API_URL || 'http://localhost:8000';

// Then use ML_API_URL instead of hardcoded localhost
const response = await fetch(`${ML_API_URL}/predict/valuation`, {
  method: 'POST',
  // ...
});
```

### Step 2: Add Clerk Environment Variables

Make sure you have these in `.env.local`:
```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_key_here
CLERK_SECRET_KEY=your_secret_here
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard
GEMINI_API_KEY=your_gemini_key_here
```

### Step 3: Deploy to Vercel

1. **Push your latest changes**:
   ```bash
   git add .
   git commit -m "Add production environment variables"
   git push origin main
   ```

2. **Go to [Vercel.com](https://vercel.com)**:
   - Sign up/Login with GitHub
   - Click **"Add New"** → **"Project"**

3. **Import your GitHub repository**:
   - Select `6ixcar`
   - Vercel will auto-detect Next.js

4. **Add Environment Variables**:
   - Click **"Environment Variables"**
   - Add ALL variables from your `.env.local`:
     - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
     - `CLERK_SECRET_KEY`
     - `NEXT_PUBLIC_CLERK_SIGN_IN_URL`
     - `NEXT_PUBLIC_CLERK_SIGN_UP_URL`
     - `NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL`
     - `NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL`
     - `GEMINI_API_KEY`
     - `NEXT_PUBLIC_ML_API_URL` (use your Render URL)

5. **Click "Deploy"**
   - Wait 2-3 minutes
   - Copy your live URL (e.g., `https://6ixkar.vercel.app`)

### Step 4: Update Clerk Redirect URLs

1. Go to [Clerk Dashboard](https://dashboard.clerk.com)
2. Select your application
3. Go to **"Paths"** settings
4. Add your Vercel URL to allowed domains:
   - Home URL: `https://6ixkar.vercel.app`
   - Sign in URL: `https://6ixkar.vercel.app/sign-in`
   - Sign up URL: `https://6ixkar.vercel.app/sign-up`

### Step 5: Update CORS on Render

1. Go back to your Python service on Render
2. Update `main.py` CORS settings:
```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://6ixkar.vercel.app"],  # Your actual Vercel URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```
3. Push to GitHub and Render will auto-redeploy

---

## Quick Checklist

### Before Deployment:
- [ ] Push all code to GitHub
- [ ] Have Clerk API keys ready
- [ ] Have Gemini API key ready

### Render (Python Backend):
- [ ] Create web service on Render
- [ ] Connect GitHub repo
- [ ] Set build and start commands
- [ ] Copy the Render URL

### Vercel (Frontend):
- [ ] Import GitHub repo to Vercel
- [ ] Add all environment variables
- [ ] Include `NEXT_PUBLIC_ML_API_URL` with Render URL
- [ ] Deploy and copy Vercel URL

### Post-Deployment:
- [ ] Update Clerk redirect URLs with Vercel domain
- [ ] Update CORS in Python service with Vercel domain
- [ ] Test the live site
- [ ] Test ML predictions in Dashboard

---

## Troubleshooting

### "ML Service Offline" on Live Site
- Check Render logs for errors
- Verify `NEXT_PUBLIC_ML_API_URL` is set correctly in Vercel
- Render free tier sleeps after 15 min of inactivity (first request takes 30s to wake up)

### Clerk Authentication Not Working
- Verify all Clerk environment variables are in Vercel
- Check Clerk Dashboard allowed domains include your Vercel URL

### 3D Landing Page Not Loading
- Three.js should work fine on Vercel
- Check browser console for WebGL errors

---

## Cost
- **Vercel**: Free tier (perfect for your project)
- **Render**: Free tier (with 750 hours/month, sleeps after inactivity)
- **Clerk**: Free tier (up to 5,000 monthly active users)

Total Cost: **$0/month** ✅
