// Message Types
export interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

// Budget Simulator Types
export interface BudgetInputs {
  carPrice: number;
  downPayment: number;
  interestRate: number;
  loanTerm: number;
  province: string;
}

export interface BudgetCalculation {
  monthlyPayment: number;
  totalInterest: number;
  insurance: number;
  fuel: number;
  maintenance: number;
  totalMonthlyCost: number;
  fiveYearTotal: number;
  recommendedIncome: number;
}

// Insurance Types
export interface InsuranceRequest {
  make: string;
  model: string;
  year: number;
  province: string;
  age: number;
}

export interface InsuranceResponse {
  monthly: number;
  annual: number;
  breakdown: {
    liability: number;
    collision: number;
    comprehensive: number;
  };
}

// Financing Types
export interface FinancingRequest {
  carPrice: number;
  downPayment: number;
  term: number;
  creditScore: number;
}

export interface BankRate {
  name: string;
  apr: number;
  monthlyPayment: number;
}

export interface FinancingResponse {
  monthlyPayment: number;
  totalInterest: number;
  apr: number;
  banks: BankRate[];
}

// Scraper Types
export interface ScraperRequest {
  make: string;
  model: string;
  year: number;
}

export interface ScraperResponse {
  averagePrice: number;
  priceRange: {
    low: number;
    high: number;
  };
  listings: number;
  provinces: { [key: string]: number };
}

// Chat Types
export interface ChatRequest {
  message: string;
  history: Message[];
}

export interface ChatResponse {
  response: string;
}

// Province Type
export type ProvinceCode = 'ON' | 'QC' | 'BC' | 'AB' | 'MB' | 'SK' | 'NS' | 'NB' | 'NL' | 'PE' | 'NT' | 'YT' | 'NU';
