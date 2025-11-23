import { NextRequest, NextResponse } from 'next/server';
import { FinancingRequest, FinancingResponse, BankRate } from '@/types';
import { CANADIAN_BANKS, CREDIT_SCORE_ADJUSTMENTS } from '@/lib/constants';

export async function POST(request: NextRequest) {
  try {
    const body: FinancingRequest = await request.json();
    const { carPrice, downPayment, term, creditScore } = body;

    // Validate inputs
    if (!carPrice || carPrice <= 0) {
      return NextResponse.json(
        { error: 'Valid car price is required' },
        { status: 400 }
      );
    }

    if (downPayment < 0 || downPayment > carPrice) {
      return NextResponse.json(
        { error: 'Invalid down payment amount' },
        { status: 400 }
      );
    }

    if (!term || term <= 0) {
      return NextResponse.json(
        { error: 'Valid loan term is required' },
        { status: 400 }
      );
    }

    // Calculate principal (amount to finance)
    const principal = carPrice - downPayment;

    if (principal <= 0) {
      // No financing needed
      return NextResponse.json({
        monthlyPayment: 0,
        totalInterest: 0,
        apr: 0,
        banks: [],
      });
    }

    // Determine APR adjustment based on credit score
    let aprAdjustment = CREDIT_SCORE_ADJUSTMENTS.poor.adjustment;
    if (creditScore >= CREDIT_SCORE_ADJUSTMENTS.excellent.min) {
      aprAdjustment = CREDIT_SCORE_ADJUSTMENTS.excellent.adjustment;
    } else if (creditScore >= CREDIT_SCORE_ADJUSTMENTS.good.min) {
      aprAdjustment = CREDIT_SCORE_ADJUSTMENTS.good.adjustment;
    } else if (creditScore >= CREDIT_SCORE_ADJUSTMENTS.fair.min) {
      aprAdjustment = CREDIT_SCORE_ADJUSTMENTS.fair.adjustment;
    }

    // Calculate rates for each bank
    const banks: BankRate[] = CANADIAN_BANKS.map((bank) => {
      const apr = bank.baseApr + aprAdjustment;
      const monthlyRate = apr / 100 / 12;
      const numPayments = term;

      // Calculate monthly payment using loan formula
      // M = P * [r(1+r)^n] / [(1+r)^n - 1]
      let monthlyPayment = 0;
      if (monthlyRate > 0) {
        const rateFactorNumerator = monthlyRate * Math.pow(1 + monthlyRate, numPayments);
        const rateFactorDenominator = Math.pow(1 + monthlyRate, numPayments) - 1;
        monthlyPayment = principal * (rateFactorNumerator / rateFactorDenominator);
      } else {
        // 0% APR case
        monthlyPayment = principal / numPayments;
      }

      return {
        name: bank.name,
        apr: parseFloat(apr.toFixed(2)),
        monthlyPayment: Math.round(monthlyPayment),
      };
    });

    // Sort banks by monthly payment (lowest first)
    banks.sort((a, b) => a.monthlyPayment - b.monthlyPayment);

    // Use the best rate (first bank) for main calculation
    const bestBank = banks[0];
    const totalPaid = bestBank.monthlyPayment * term;
    const totalInterest = totalPaid - principal;

    const result: FinancingResponse = {
      monthlyPayment: bestBank.monthlyPayment,
      totalInterest: Math.round(totalInterest),
      apr: bestBank.apr,
      banks,
    };

    return NextResponse.json(result);
  } catch (error) {
    console.error('Financing API error:', error);
    return NextResponse.json(
      {
        error: 'Failed to calculate financing options',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
