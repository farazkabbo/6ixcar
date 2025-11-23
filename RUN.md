# 🏃 How to Run 6ixKar

## Quick Start (Basic - Without ML)

```powershell
# 1. Install dependencies
npm install

# 2. Set up environment variables (see SETUP.md for keys)
# Create .env.local with your Clerk and Gemini API keys

# 3. Run the app
npm run dev
```

Then open **http://localhost:3000** in your browser! 🎉

---

## Full Start (With ML Features)

### Terminal 1: Python ML Service
```powershell
cd python-ml-service
pip install -r requirements.txt
python run.py
```
ML service runs on **http://localhost:8000**

### Terminal 2: Next.js App
```powershell
# In main directory
npm install
npm run dev
```
Web app runs on **http://localhost:3000**

Make sure to add `ML_SERVICE_URL=http://localhost:8000` to `.env.local`!

---

## Detailed Instructions

### Prerequisites ✅
- [x] Node.js 18+ installed
- [x] npm or yarn installed
- [x] Clerk account created (free)
- [x] Google Gemini API key obtained (free)

### Step-by-Step

#### 1. Clone the Repository
```powershell
git clone https://github.com/farazkabbo/6ixcar.git
cd 6ixcar
```

#### 2. Install Dependencies
```powershell
npm install
```

This installs:
- Next.js 16.0
- React 19.2
- @clerk/nextjs 6.35.4
- @google/generative-ai 0.24.1
- framer-motion 12.23.24
- lucide-react 0.554.0
- And more!

#### 3. Configure Environment Variables

**Create `.env.local` file** in the root directory:

```env
# Get these from https://clerk.com
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_key_here
CLERK_SECRET_KEY=sk_test_your_key_here

NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard

# Get this from https://makersuite.google.com/app/apikey
GOOGLE_GEMINI_API_KEY=AIzaSy_your_key_here

NEXT_PUBLIC_APP_URL=http://localhost:3000
```

**Need help getting keys?** See [SETUP.md](./SETUP.md) for detailed instructions!

#### 4. Run Development Server
```powershell
npm run dev
```

You should see:
```
  ▲ Next.js 16.0.3
  - Local:        http://localhost:3000
  - Environments: .env.local

 ✓ Starting...
 ✓ Ready in 2.3s
```

#### 5. Open in Browser

Navigate to: **http://localhost:3000**

---

## What You'll See

### Landing Page (/)
🎨 **Beautiful animated homepage with:**
- Hero section with gradient text animation
- Statistics showcase (46% buyer's remorse, 100K+ cars)
- Feature cards with hover effects
- "How It Works" section
- Call-to-action buttons

### Sign Up (/sign-up)
🔐 **Clerk-powered authentication:**
- Email signup
- Google OAuth
- GitHub OAuth
- Sleek dark-themed UI

### Dashboard (/dashboard) - Protected Route
🎯 **Main application with two tabs:**

**Tab 1: 6ixBot Chat**
- AI-powered car assistant
- Real-time responses
- Message history
- Suggested questions
- Canadian car expertise

**Tab 2: Budget Simulator**
- Interactive sliders
- Real-time calculations
- 5-year cost projections
- Provincial insurance rates
- Income recommendations

---

## Testing the Features

### Test 6ixBot Chat 🤖

Try these questions:
```
1. "What's the best SUV under $40,000 in Ontario?"
2. "Compare insurance rates between BC and Alberta"
3. "Is the Honda CR-V good for Canadian winters?"
4. "Should I lease or finance a $35,000 car?"
5. "What's the total cost of owning a Toyota RAV4 in Quebec?"
```

Expected behavior:
- Response appears in 2-3 seconds
- Message bubbles animate in
- Conversation history is maintained
- Canadian-specific information provided

### Test Budget Simulator 💰

Try these scenarios:

**Scenario 1: New Car**
- Car Price: $40,000
- Down Payment: $8,000
- Interest Rate: 5.5%
- Loan Term: 60 months
- Province: Ontario

Expected: ~$600-700/month total cost

**Scenario 2: Used Car**
- Car Price: $20,000
- Down Payment: $4,000
- Interest Rate: 7.5%
- Loan Term: 48 months
- Province: British Columbia

Expected: ~$500-600/month total cost

**Scenario 3: High Budget**
- Car Price: $80,000
- Down Payment: $20,000
- Interest Rate: 4.5%
- Loan Term: 72 months
- Province: Alberta

Expected: ~$1,200-1,400/month total cost

---

## Available Scripts

### Development
```powershell
npm run dev
```
Starts development server with hot reload on http://localhost:3000

### Build
```powershell
npm run build
```
Creates optimized production build in `.next` folder

### Start Production
```powershell
npm start
```
Runs production build (must run `npm run build` first)

### Lint
```powershell
npm run lint
```
Checks code for errors and style issues

---

## Keyboard Shortcuts

### In Chat Interface:
- **Enter**: Send message
- **Shift + Enter**: New line in message

### General:
- **Ctrl + C** (in terminal): Stop dev server
- **F5** (in browser): Refresh page
- **F12**: Open DevTools

---

## Troubleshooting

### Common Issues and Solutions

#### ❌ Port 3000 already in use
```powershell
# Solution: Use a different port
npm run dev -- -p 3001
```

#### ❌ Module not found errors
```powershell
# Solution: Reinstall dependencies
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json
npm install
```

#### ❌ Clerk authentication not working
**Solution:**
1. Check `.env.local` has correct keys
2. Verify keys in Clerk dashboard
3. Restart dev server

#### ❌ Gemini AI not responding
**Solution:**
1. Check API key is correct
2. Verify you haven't exceeded free tier (60 req/min)
3. Test API key at https://makersuite.google.com

#### ❌ Styles not loading
```powershell
# Solution: Clear Next.js cache
Remove-Item -Recurse -Force .next
npm run dev
```

#### ❌ TypeScript errors
```powershell
# Solution: Ensure all types are installed
npm install --save-dev @types/react @types/node
```

---

## Performance Tips

### For Faster Development:
1. **Use Turbopack** (experimental):
   ```powershell
   npm run dev --turbo
   ```

2. **Disable type checking** during development:
   - Edit `next.config.ts`
   - Add `typescript: { ignoreBuildErrors: true }`

3. **Clear cache regularly**:
   ```powershell
   Remove-Item -Recurse -Force .next
   ```

### For Production:
1. **Enable compression**:
   - Next.js automatically compresses
   - Vercel adds Brotli compression

2. **Optimize images**:
   - Use Next.js `<Image>` component
   - WebP format automatically applied

3. **Minimize bundle size**:
   ```powershell
   npm run build
   # Check bundle size in output
   ```

---

## Environment Variables Explained

| Variable | Purpose | Example |
|----------|---------|---------|
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Public Clerk key (client-side) | `pk_test_...` |
| `CLERK_SECRET_KEY` | Secret Clerk key (server-side) | `sk_test_...` |
| `GOOGLE_GEMINI_API_KEY` | Gemini AI access | `AIzaSy...` |
| `NEXT_PUBLIC_CLERK_SIGN_IN_URL` | Sign-in page path | `/sign-in` |
| `NEXT_PUBLIC_CLERK_SIGN_UP_URL` | Sign-up page path | `/sign-up` |
| `NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL` | Redirect after login | `/dashboard` |
| `NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL` | Redirect after signup | `/dashboard` |
| `NEXT_PUBLIC_APP_URL` | Application base URL | `http://localhost:3000` |

**Note**: Variables starting with `NEXT_PUBLIC_` are accessible in the browser.

---

## File Structure Overview

```
6ixcar/
├── app/                    # Next.js App Router
│   ├── api/               # API endpoints
│   │   ├── chat/          # AI chat endpoint
│   │   ├── financing/     # Financing calculations
│   │   ├── insurance/     # Insurance calculations
│   │   └── scraper/       # Car price data
│   ├── dashboard/         # Protected dashboard
│   ├── sign-in/           # Clerk sign-in page
│   ├── sign-up/           # Clerk sign-up page
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Landing page
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── BudgetSimulator.tsx
│   ├── ChatInterface.tsx
│   └── DashboardClient.tsx
├── lib/                   # Utilities
│   ├── constants.ts       # Canadian data
│   └── gemini.ts          # AI integration
├── types/                 # TypeScript types
│   └── index.ts
├── middleware.ts          # Clerk authentication
├── .env.local             # Environment variables (YOU CREATE THIS)
└── package.json           # Dependencies
```

---

## API Endpoints

### POST /api/chat
**Purpose**: Chat with AI assistant

**Request**:
```json
{
  "message": "What's the best car under $30K?",
  "history": []
}
```

**Response**:
```json
{
  "response": "Based on your budget..."
}
```

### POST /api/insurance
**Purpose**: Calculate insurance rates

**Request**:
```json
{
  "province": "ON",
  "age": 25,
  "year": 2022
}
```

**Response**:
```json
{
  "monthly": 250,
  "annual": 3000,
  "breakdown": {...}
}
```

### POST /api/financing
**Purpose**: Calculate financing options

**Request**:
```json
{
  "carPrice": 30000,
  "downPayment": 5000,
  "term": 60,
  "creditScore": 720
}
```

**Response**:
```json
{
  "monthlyPayment": 475,
  "totalInterest": 3500,
  "apr": 5.5,
  "banks": [...]
}
```

---

## Next Steps After Running

1. **Test all features** thoroughly
2. **Customize** content in `lib/constants.ts`
3. **Add** more AI prompts
4. **Deploy** to Vercel
5. **Share** with friends!

---

## Need Help?

- **Setup issues?** See [SETUP.md](./SETUP.md)
- **General info?** See [README.md](./README.md)
- **Errors?** Check the troubleshooting section above

---

**🎉 Enjoy building with 6ixKar! 🚗🍁**
