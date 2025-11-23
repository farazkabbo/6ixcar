'use client';

import { useState } from 'react';

export default function TestMLPage() {
  const [valuationResult, setValuationResult] = useState<any>(null);
  const [depreciationResult, setDepreciationResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const testValuation = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch('/api/ml-valuation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          make: 'Honda',
          model: 'CR-V',
          year: 2022,
          mileage: 35000,
          trim: 'EX',
          province: 'ON',
          listing_price: 28500
        })
      });

      if (!response.ok) {
        throw new Error('ML Service might be offline');
      }

      const data = await response.json();
      setValuationResult(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const testDepreciation = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch('/api/ml-depreciation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          make: 'Toyota',
          model: 'RAV4',
          purchasePrice: 40000,
          year: 2024,
          mileage: 0,
          province: 'BC'
        })
      });

      if (!response.ok) {
        throw new Error('ML Service might be offline');
      }

      const data = await response.json();
      setDepreciationResult(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8">
          🧪 ML Service Test Page
        </h1>

        <div className="bg-white rounded-lg shadow-xl p-6 mb-6">
          <h2 className="text-2xl font-bold mb-4">Service Status</h2>
          <div className="space-y-2">
            <p className="text-gray-700">
              <span className="font-semibold">Next.js:</span>{' '}
              <span className="text-green-600">✅ Running (you can see this page!)</span>
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Python ML Service:</span>{' '}
              <span className="text-blue-600">Click buttons below to test</span>
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <button
            onClick={testValuation}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-lg transition disabled:opacity-50"
          >
            {loading ? '⏳ Testing...' : '🏷️ Test Valuation API'}
          </button>

          <button
            onClick={testDepreciation}
            disabled={loading}
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 px-6 rounded-lg transition disabled:opacity-50"
          >
            {loading ? '⏳ Testing...' : '📉 Test Depreciation API'}
          </button>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            <p className="font-bold">❌ Error</p>
            <p>{error}</p>
            <p className="text-sm mt-2">
              Make sure Python ML service is running on port 8000
            </p>
          </div>
        )}

        {valuationResult && (
          <div className="bg-green-50 border border-green-400 rounded-lg p-6 mb-6">
            <h3 className="text-xl font-bold text-green-800 mb-3">
              ✅ Valuation API Working!
            </h3>
            <div className="space-y-2 text-gray-800">
              <p><strong>Fair Price:</strong> ${valuationResult.fairPrice?.toLocaleString()}</p>
              <p><strong>Deal Score:</strong> {valuationResult.dealScore}/100</p>
              <p><strong>Assessment:</strong> {valuationResult.pricePosition}</p>
              <p><strong>Confidence:</strong> {(valuationResult.confidence * 100).toFixed(1)}%</p>
              <p><strong>Advice:</strong> {valuationResult.advice}</p>
              <p className="text-sm text-gray-600 mt-3">
                Market Range: ${valuationResult.marketRange?.low?.toLocaleString()} - ${valuationResult.marketRange?.high?.toLocaleString()}
              </p>
            </div>
          </div>
        )}

        {depreciationResult && (
          <div className="bg-purple-50 border border-purple-400 rounded-lg p-6">
            <h3 className="text-xl font-bold text-purple-800 mb-3">
              ✅ Depreciation API Working!
            </h3>
            <div className="space-y-2 text-gray-800">
              <p><strong>Annual Rate:</strong> {depreciationResult.annualDepreciationRate}%</p>
              <p><strong>5-Year Value:</strong> ${depreciationResult.resaleValue5Year?.toLocaleString()}</p>
              <p><strong>Retention:</strong> {depreciationResult.percentRetained?.toFixed(1)}%</p>
              <p><strong>Rating:</strong> {depreciationResult.retentionRating}</p>
              <p><strong>Advice:</strong> {depreciationResult.advice}</p>
              <div className="mt-3">
                <p className="font-semibold">Year-by-Year Values:</p>
                <div className="grid grid-cols-3 gap-2 mt-2">
                  {depreciationResult.yearlyValues?.map((value: number, i: number) => (
                    <div key={i} className="bg-white p-2 rounded text-sm">
                      <span className="font-medium">Year {i}:</span> ${value?.toLocaleString()}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="mt-8 bg-slate-700 rounded-lg p-6 text-white">
          <h3 className="text-xl font-bold mb-3">📋 Checklist</h3>
          <ul className="space-y-2">
            <li>✅ Next.js running on port 3000</li>
            <li>{valuationResult ? '✅' : '⏳'} Python ML service responding</li>
            <li>{valuationResult ? '✅' : '⏳'} Valuation endpoint working</li>
            <li>{depreciationResult ? '✅' : '⏳'} Depreciation endpoint working</li>
          </ul>
        </div>

        <div className="mt-6 text-center">
          <a
            href="/"
            className="text-blue-400 hover:text-blue-300 underline"
          >
            ← Back to Home
          </a>
        </div>
      </div>
    </div>
  );
}
