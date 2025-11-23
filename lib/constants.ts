// Canadian Provinces and Territories
export const PROVINCES = [
  { code: 'ON', name: 'Ontario', insuranceMultiplier: 1.3 },
  { code: 'QC', name: 'Quebec', insuranceMultiplier: 1.2 },
  { code: 'BC', name: 'British Columbia', insuranceMultiplier: 1.5 },
  { code: 'AB', name: 'Alberta', insuranceMultiplier: 1.1 },
  { code: 'MB', name: 'Manitoba', insuranceMultiplier: 1.25 },
  { code: 'SK', name: 'Saskatchewan', insuranceMultiplier: 1.15 },
  { code: 'NS', name: 'Nova Scotia', insuranceMultiplier: 1.35 },
  { code: 'NB', name: 'New Brunswick', insuranceMultiplier: 1.2 },
  { code: 'NL', name: 'Newfoundland and Labrador', insuranceMultiplier: 1.4 },
  { code: 'PE', name: 'Prince Edward Island', insuranceMultiplier: 1.3 },
  { code: 'NT', name: 'Northwest Territories', insuranceMultiplier: 1.45 },
  { code: 'YT', name: 'Yukon', insuranceMultiplier: 1.4 },
  { code: 'NU', name: 'Nunavut', insuranceMultiplier: 1.5 },
];

// Canadian Banks
export const CANADIAN_BANKS = [
  { name: 'RBC (Royal Bank of Canada)', baseApr: 4.5 },
  { name: 'TD Canada Trust', baseApr: 4.75 },
  { name: 'Scotiabank', baseApr: 4.6 },
  { name: 'BMO (Bank of Montreal)', baseApr: 4.8 },
  { name: 'CIBC', baseApr: 4.7 },
];

// Base Insurance Rates (Monthly in CAD)
export const BASE_INSURANCE_RATES = {
  liability: 120,
  collision: 150,
  comprehensive: 100,
};

// Estimated Monthly Costs
export const MONTHLY_COSTS = {
  fuel: 200,
  maintenance: 150,
};

// Credit Score APR Adjustments
export const CREDIT_SCORE_ADJUSTMENTS = {
  excellent: { min: 750, adjustment: 0 }, // 750+
  good: { min: 700, adjustment: 1 }, // 700-749
  fair: { min: 650, adjustment: 2.5 }, // 650-699
  poor: { min: 0, adjustment: 4.5 }, // Below 650
};

// Winter Readiness Factors
export const WINTER_FEATURES = {
  awd: { points: 30, name: 'AWD/4WD' },
  groundClearance: { points: 25, name: 'High Ground Clearance' },
  heatedSeats: { points: 10, name: 'Heated Seats' },
  remoteStart: { points: 10, name: 'Remote Start' },
  tractionControl: { points: 15, name: 'Advanced Traction Control' },
  winterTires: { points: 10, name: 'Winter Tire Compatible' },
};

// Loan Term Options (months)
export const LOAN_TERMS = [12, 24, 36, 48, 60, 72, 84];

// Recommended Monthly Cost as % of Income
export const RECOMMENDED_COST_RATIO = 0.2; // 20%

// Gemini AI System Instruction
export const GEMINI_SYSTEM_INSTRUCTION = `You are 6ixBot, an expert Canadian car buying assistant. You specialize in:

1. Canadian Car Market: Provide insights on car prices, availability, and market trends across Canada
2. Provincial Differences: Explain insurance rates, registration costs, and regulations for all 13 provinces/territories
3. Winter Readiness: Assess vehicles for Canadian winters (AWD, ground clearance, heating features)
4. Financial Advice: Help with budgeting, financing options, lease vs buy decisions
5. Total Cost of Ownership: Break down insurance, fuel, maintenance, and hidden costs
6. Canadian Banks: Provide info on RBC, TD, Scotia, BMO, CIBC financing options

Always:
- Use Canadian dollars (CAD)
- Consider provincial differences
- Emphasize winter readiness for harsh climates
- Provide practical, actionable advice
- Be friendly and conversational
- Ask clarifying questions when needed

Never:
- Make up specific pricing without data
- Guarantee specific loan approvals
- Provide legal or professional financial advice disclaimers`;

// Feature Cards for Landing Page
export const FEATURES = [
  {
    icon: 'MapPin',
    title: 'Provincial Insurance Rates',
    description: 'Compare insurance costs across all 13 Canadian provinces and territories',
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    icon: 'Snowflake',
    title: 'Winter Readiness Score',
    description: 'Get vehicle ratings for Canadian winters with AWD, clearance, and heating features',
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    icon: 'DollarSign',
    title: 'True Cost Calculator',
    description: 'See the complete 5-year ownership cost including hidden expenses',
    gradient: 'from-green-500 to-emerald-500',
  },
  {
    icon: 'Bot',
    title: 'AI-Powered Assistant',
    description: 'Chat with 6ixBot for personalized recommendations and market insights',
    gradient: 'from-red-500 to-orange-500',
  },
];

// Statistics for Landing Page
export const STATISTICS = [
  { value: '46%', label: 'Buyers with Remorse', sublabel: 'Experience regret after purchase' },
  { value: '100K+', label: 'Cars Analyzed', sublabel: 'Across Canadian market' },
  { value: '13', label: 'Provinces Covered', sublabel: 'Complete Canadian coverage' },
  { value: '$2,000', label: 'Avg. Savings', sublabel: 'Per informed buyer' },
];

// How It Works Steps
export const HOW_IT_WORKS = [
  {
    step: 1,
    title: 'Sign Up Free',
    description: 'Create your account in seconds with email or social login',
  },
  {
    step: 2,
    title: 'Chat with 6ixBot',
    description: 'Ask questions about any car, get AI-powered recommendations',
  },
  {
    step: 3,
    title: 'Calculate True Costs',
    description: 'Use our budget simulator to see the real 5-year ownership cost',
  },
  {
    step: 4,
    title: 'Make Informed Decision',
    description: 'Buy with confidence knowing all the facts and costs',
  },
];
