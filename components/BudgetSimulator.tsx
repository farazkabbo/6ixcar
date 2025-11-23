'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { DollarSign, TrendingUp, Shield, Fuel, Wrench, Calculator } from 'lucide-react';
import { PROVINCES, MONTHLY_COSTS, RECOMMENDED_COST_RATIO } from '@/lib/constants';
import { BudgetInputs, BudgetCalculation } from '@/types';

export default function BudgetSimulator() {
  const [inputs, setInputs] = useState<BudgetInputs>({
    carPrice: 30000,
    downPayment: 5000,
    interestRate: 5.5,
    loanTerm: 60,
    province: 'ON',
  });

  const [calculation, setCalculation] = useState<BudgetCalculation>({
    monthlyPayment: 0,
    totalInterest: 0,
    insurance: 0,
    fuel: MONTHLY_COSTS.fuel,
    maintenance: MONTHLY_COSTS.maintenance,
    totalMonthlyCost: 0,
    fiveYearTotal: 0,
    recommendedIncome: 0,
  });

  // Calculate whenever inputs change
  useEffect(() => {
    calculateBudget();
  }, [inputs]);

  const calculateBudget = () => {
    const principal = inputs.carPrice - inputs.downPayment;
    
    // Calculate monthly payment
    const monthlyRate = inputs.interestRate / 100 / 12;
    const numPayments = inputs.loanTerm;
    
    let monthlyPayment = 0;
    let totalInterest = 0;
    
    if (principal > 0 && monthlyRate > 0) {
      const rateFactor = Math.pow(1 + monthlyRate, numPayments);
      monthlyPayment = principal * (monthlyRate * rateFactor) / (rateFactor - 1);
      const totalPaid = monthlyPayment * numPayments;
      totalInterest = totalPaid - principal;
    } else if (principal > 0) {
      // 0% interest
      monthlyPayment = principal / numPayments;
    }

    // Calculate insurance (province-specific)
    const provinceData = PROVINCES.find(p => p.code === inputs.province);
    const baseInsurance = 150; // Base monthly insurance
    const insurance = baseInsurance * (provinceData?.insuranceMultiplier || 1.2);

    // Calculate totals
    const totalMonthlyCost = monthlyPayment + insurance + MONTHLY_COSTS.fuel + MONTHLY_COSTS.maintenance;
    const fiveYearTotal = inputs.downPayment + (totalMonthlyCost * 60);
    const recommendedIncome = totalMonthlyCost / RECOMMENDED_COST_RATIO;

    setCalculation({
      monthlyPayment: Math.round(monthlyPayment),
      totalInterest: Math.round(totalInterest),
      insurance: Math.round(insurance),
      fuel: MONTHLY_COSTS.fuel,
      maintenance: MONTHLY_COSTS.maintenance,
      totalMonthlyCost: Math.round(totalMonthlyCost),
      fiveYearTotal: Math.round(fiveYearTotal),
      recommendedIncome: Math.round(recommendedIncome),
    });
  };

  const costItems = [
    {
      icon: DollarSign,
      label: 'Car Payment',
      value: calculation.monthlyPayment,
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Shield,
      label: 'Insurance',
      value: calculation.insurance,
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: Fuel,
      label: 'Fuel',
      value: calculation.fuel,
      color: 'from-green-500 to-emerald-500',
    },
    {
      icon: Wrench,
      label: 'Maintenance',
      value: calculation.maintenance,
      color: 'from-orange-500 to-red-500',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h2 className="text-3xl font-bold text-white mb-2 flex items-center justify-center gap-2">
          <Calculator className="w-8 h-8 text-red-500" />
          Budget Simulator
        </h2>
        <p className="text-slate-400">Calculate the true 5-year cost of car ownership</p>
      </motion.div>

      {/* Input Controls */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-6 space-y-6"
      >
        {/* Car Price */}
        <div className="space-y-2">
          <div className="flex justify-between">
            <label className="text-sm font-medium text-slate-300">Car Price</label>
            <span className="text-sm font-bold text-white">
              ${inputs.carPrice.toLocaleString()} CAD
            </span>
          </div>
          <input
            type="range"
            min="10000"
            max="100000"
            step="1000"
            value={inputs.carPrice}
            onChange={(e) => setInputs({ ...inputs, carPrice: Number(e.target.value) })}
            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider-thumb"
          />
        </div>

        {/* Down Payment */}
        <div className="space-y-2">
          <div className="flex justify-between">
            <label className="text-sm font-medium text-slate-300">Down Payment</label>
            <span className="text-sm font-bold text-white">
              ${inputs.downPayment.toLocaleString()} CAD
            </span>
          </div>
          <input
            type="range"
            min="0"
            max={inputs.carPrice}
            step="500"
            value={inputs.downPayment}
            onChange={(e) => setInputs({ ...inputs, downPayment: Number(e.target.value) })}
            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider-thumb"
          />
        </div>

        {/* Interest Rate */}
        <div className="space-y-2">
          <div className="flex justify-between">
            <label className="text-sm font-medium text-slate-300">Interest Rate (APR)</label>
            <span className="text-sm font-bold text-white">{inputs.interestRate.toFixed(1)}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="15"
            step="0.1"
            value={inputs.interestRate}
            onChange={(e) => setInputs({ ...inputs, interestRate: Number(e.target.value) })}
            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider-thumb"
          />
        </div>

        {/* Loan Term */}
        <div className="space-y-2">
          <div className="flex justify-between">
            <label className="text-sm font-medium text-slate-300">Loan Term</label>
            <span className="text-sm font-bold text-white">{inputs.loanTerm} months</span>
          </div>
          <input
            type="range"
            min="12"
            max="84"
            step="12"
            value={inputs.loanTerm}
            onChange={(e) => setInputs({ ...inputs, loanTerm: Number(e.target.value) })}
            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider-thumb"
          />
        </div>

        {/* Province */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-300">Province</label>
          <select
            value={inputs.province}
            onChange={(e) => setInputs({ ...inputs, province: e.target.value })}
            className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            {PROVINCES.map((province) => (
              <option key={province.code} value={province.code}>
                {province.name}
              </option>
            ))}
          </select>
        </div>
      </motion.div>

      {/* Cost Breakdown */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        {costItems.map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
            className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl p-4"
          >
            <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${item.color} flex items-center justify-center mb-3`}>
              <item.icon className="w-5 h-5 text-white" />
            </div>
            <p className="text-xs text-slate-400 mb-1">{item.label}</p>
            <p className="text-xl font-bold text-white">${item.value.toLocaleString()}</p>
            <p className="text-xs text-slate-500">per month</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Total Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="bg-gradient-to-br from-red-500/10 to-orange-500/10 border-2 border-red-500/30 rounded-2xl p-6 space-y-4"
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-400 mb-1">Total Monthly Cost</p>
            <p className="text-4xl font-bold text-white">
              ${calculation.totalMonthlyCost.toLocaleString()}
              <span className="text-sm text-slate-400 font-normal ml-2">/ month</span>
            </p>
          </div>
          <TrendingUp className="w-12 h-12 text-red-500" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-red-500/20">
          <div>
            <p className="text-xs text-slate-400 mb-1">5-Year Total Cost</p>
            <p className="text-xl font-bold text-white">
              ${calculation.fiveYearTotal.toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-xs text-slate-400 mb-1">Total Interest Paid</p>
            <p className="text-xl font-bold text-white">
              ${calculation.totalInterest.toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-xs text-slate-400 mb-1">Recommended Monthly Income</p>
            <p className="text-xl font-bold text-white">
              ${calculation.recommendedIncome.toLocaleString()}
            </p>
            <p className="text-xs text-slate-500">(${(calculation.recommendedIncome * 12).toLocaleString()}/year)</p>
          </div>
        </div>

        <div className="bg-slate-900/50 rounded-lg p-4 mt-4">
          <p className="text-xs text-slate-400 mb-2">💡 Affordability Tip</p>
          <p className="text-sm text-slate-300">
            Your monthly car costs should be no more than 20% of your gross income. 
            We recommend earning at least <span className="font-bold text-white">
              ${calculation.recommendedIncome.toLocaleString()}/month
            </span> for this vehicle.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
