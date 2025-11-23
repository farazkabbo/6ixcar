'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, DollarSign, Sparkles, Target, Info } from 'lucide-react';

interface ValuationResult {
  fairPrice: number;
  dealScore: number;
  pricePosition: string;
  confidence: number;
  advice: string;
  marketRange: { low: number; high: number };
}

interface DepreciationResult {
  yearlyValues: number[];
  annualDepreciationRate: number;
  resaleValue5Year: number;
  percentRetained: number;
  retentionRating: string;
  advice: string;
}

export default function MLDemoWidget() {
  const [activeTab, setActiveTab] = useState<'valuation' | 'depreciation'>('valuation');
  const [loading, setLoading] = useState(false);
  const [valuationResult, setValuationResult] = useState<ValuationResult | null>(null);
  const [depreciationResult, setDepreciationResult] = useState<DepreciationResult | null>(null);

  // Example car data - judges can see this is using real ML
  const exampleCar = {
    make: 'Honda',
    model: 'CR-V',
    year: 2022,
    mileage: 35000,
    trim: 'EX',
    province: 'ON',
    listing_price: 28500,
  };

  const testValuation = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/ml-valuation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(exampleCar),
      });

      if (!response.ok) throw new Error('ML Service offline');
      const data = await response.json();
      setValuationResult(data);
      setActiveTab('valuation');
    } catch (err) {
      alert('⚠️ ML Service not running. Start it with: python run.py');
    } finally {
      setLoading(false);
    }
  };

  const testDepreciation = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/ml-depreciation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          make: exampleCar.make,
          model: exampleCar.model,
          purchasePrice: exampleCar.listing_price,
          year: exampleCar.year,
          mileage: exampleCar.mileage,
          province: exampleCar.province,
        }),
      });

      if (!response.ok) throw new Error('ML Service offline');
      const data = await response.json();
      setDepreciationResult(data);
      setActiveTab('depreciation');
    } catch (err) {
      alert('⚠️ ML Service not running. Start it with: python run.py');
    } finally {
      setLoading(false);
    }
  };

  const getDealScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-100';
    if (score >= 60) return 'text-blue-600 bg-blue-100';
    if (score >= 40) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 border-2 border-blue-500">
      {/* Header with ML Badge */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <Sparkles className="text-yellow-500" />
            AI-Powered Predictions
          </h3>
          <p className="text-sm text-gray-600">
            Random Forest ML + Python FastAPI
          </p>
        </div>
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold">
          🤖 LIVE ML
        </div>
      </div>

      {/* Example Car Card */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 mb-4 border border-blue-200">
        <p className="text-sm font-semibold text-gray-700 mb-2">📊 Analyzing:</p>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div><span className="font-medium">Car:</span> {exampleCar.year} {exampleCar.make} {exampleCar.model}</div>
          <div><span className="font-medium">Mileage:</span> {exampleCar.mileage.toLocaleString()} km</div>
          <div><span className="font-medium">Trim:</span> {exampleCar.trim}</div>
          <div><span className="font-medium">Asking:</span> ${exampleCar.listing_price.toLocaleString()}</div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <button
          onClick={testValuation}
          disabled={loading}
          className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-3 px-4 rounded-lg transition disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg"
        >
          <DollarSign size={20} />
          {loading && activeTab === 'valuation' ? 'Analyzing...' : 'Get Valuation'}
        </button>

        <button
          onClick={testDepreciation}
          disabled={loading}
          className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-semibold py-3 px-4 rounded-lg transition disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg"
        >
          <TrendingDown size={20} />
          {loading && activeTab === 'depreciation' ? 'Predicting...' : 'Predict Value'}
        </button>
      </div>

      {/* Results Display */}
      {valuationResult && activeTab === 'valuation' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          {/* Deal Score - BIG and VISUAL */}
          <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl p-6 text-white text-center shadow-xl">
            <div className="text-5xl font-bold mb-2">
              {valuationResult.dealScore}
              <span className="text-2xl">/100</span>
            </div>
            <div className="text-xl font-semibold">{valuationResult.pricePosition}</div>
            <div className="text-sm opacity-90 mt-2">
              <Target className="inline mr-1" size={16} />
              {(valuationResult.confidence * 100).toFixed(0)}% Confidence
            </div>
          </div>

          {/* Price Comparison */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-red-50 border-2 border-red-300 rounded-lg p-4">
              <p className="text-xs text-red-600 font-semibold mb-1">ASKING PRICE</p>
              <p className="text-2xl font-bold text-red-700">
                ${exampleCar.listing_price.toLocaleString()}
              </p>
            </div>
            <div className="bg-green-50 border-2 border-green-300 rounded-lg p-4">
              <p className="text-xs text-green-600 font-semibold mb-1">AI FAIR PRICE</p>
              <p className="text-2xl font-bold text-green-700">
                ${valuationResult.fairPrice.toLocaleString()}
              </p>
            </div>
          </div>

          {/* Market Range */}
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <p className="text-sm font-semibold text-blue-900 mb-2">📊 Market Range</p>
            <div className="flex justify-between items-center">
              <div className="text-center">
                <p className="text-xs text-gray-600">Low</p>
                <p className="text-lg font-bold text-blue-700">
                  ${valuationResult.marketRange.low.toLocaleString()}
                </p>
              </div>
              <div className="flex-1 mx-4">
                <div className="h-2 bg-gradient-to-r from-blue-300 via-green-400 to-blue-300 rounded-full"></div>
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-600">High</p>
                <p className="text-lg font-bold text-blue-700">
                  ${valuationResult.marketRange.high.toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          {/* AI Advice */}
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
            <div className="flex gap-2">
              <Info className="text-yellow-600 flex-shrink-0" size={20} />
              <div>
                <p className="font-semibold text-yellow-900 text-sm">AI Recommendation</p>
                <p className="text-yellow-800 text-sm mt-1">{valuationResult.advice}</p>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {depreciationResult && activeTab === 'depreciation' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          {/* Retention Score */}
          <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl p-6 text-white text-center shadow-xl">
            <div className="text-5xl font-bold mb-2">
              {depreciationResult.percentRetained.toFixed(1)}%
            </div>
            <div className="text-xl font-semibold">Value Retained After 5 Years</div>
            <div className="text-sm opacity-90 mt-2">
              ⭐ {depreciationResult.retentionRating} Rating
            </div>
          </div>

          {/* Key Stats */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-orange-50 border-2 border-orange-300 rounded-lg p-4">
              <p className="text-xs text-orange-600 font-semibold mb-1">DEPRECIATION RATE</p>
              <p className="text-2xl font-bold text-orange-700">
                {depreciationResult.annualDepreciationRate}%
              </p>
              <p className="text-xs text-orange-600 mt-1">per year</p>
            </div>
            <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-4">
              <p className="text-xs text-blue-600 font-semibold mb-1">5-YEAR VALUE</p>
              <p className="text-2xl font-bold text-blue-700">
                ${depreciationResult.resaleValue5Year.toLocaleString()}
              </p>
              <p className="text-xs text-blue-600 mt-1">predicted resale</p>
            </div>
          </div>

          {/* Year-by-Year Chart */}
          <div className="bg-gradient-to-b from-purple-50 to-pink-50 rounded-lg p-4 border border-purple-200">
            <p className="text-sm font-semibold text-purple-900 mb-3">📈 Value Over Time</p>
            <div className="space-y-2">
              {depreciationResult.yearlyValues.map((value, i) => {
                const percentage = (value / depreciationResult.yearlyValues[0]) * 100;
                return (
                  <div key={i} className="flex items-center gap-3">
                    <span className="text-xs font-medium text-gray-600 w-12">Year {i}</span>
                    <div className="flex-1 bg-gray-200 rounded-full h-6 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${percentage}%` }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                        className="bg-gradient-to-r from-purple-500 to-pink-500 h-full flex items-center justify-end pr-2"
                      >
                        <span className="text-xs font-bold text-white">
                          ${value.toLocaleString()}
                        </span>
                      </motion.div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* AI Advice */}
          <div className="bg-purple-50 border-l-4 border-purple-400 p-4 rounded">
            <div className="flex gap-2">
              <Info className="text-purple-600 flex-shrink-0" size={20} />
              <div>
                <p className="font-semibold text-purple-900 text-sm">AI Recommendation</p>
                <p className="text-purple-800 text-sm mt-1">{depreciationResult.advice}</p>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* No Results Yet */}
      {!valuationResult && !depreciationResult && (
        <div className="text-center py-8 text-gray-500">
          <Sparkles className="mx-auto mb-2 opacity-50" size={48} />
          <p className="text-sm">Click a button above to see AI predictions!</p>
        </div>
      )}

      {/* Tech Stack Badge */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <p className="text-xs text-gray-500 text-center">
          🐍 Python FastAPI • 🌲 Random Forest • 🧮 scikit-learn • ⚡ Real-time Predictions
        </p>
      </div>
    </div>
  );
}
