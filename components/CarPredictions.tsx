"use client";
import { useEffect, useState } from 'react';
import { CAR_CATALOG, CarSpec } from '@/lib/cars';

interface CarAnalysisResult {
  id: string;
  valuation?: any;
  depreciation?: any;
  error?: string;
}

interface CarPredictionsProps {
  selected: string[];
}

async function fetchAnalysis(car: CarSpec): Promise<CarAnalysisResult> {
  try {
    // Call valuation first
    const valuationRes = await fetch('/api/ml-valuation', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        make: car.make,
        model: car.model,
        year: car.year,
        mileage: car.mileage,
        trim: car.trim,
        province: car.province,
        listing_price: car.listing_price
      })
    });
    if (!valuationRes.ok) throw new Error('Valuation failed');
    const valuation = await valuationRes.json();

    // Depreciation (use purchasePrice = listing or fairPrice if provided)
    const purchasePrice = car.purchasePrice || valuation.fairPrice;
    const depreciationRes = await fetch('/api/ml-depreciation', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        make: car.make,
        model: car.model,
        purchasePrice,
        year: car.year,
        mileage: car.mileage,
        province: car.province
      })
    });
    if (!depreciationRes.ok) throw new Error('Depreciation failed');
    const depreciation = await depreciationRes.json();

    return { id: car.id, valuation, depreciation };
  } catch (e: any) {
    return { id: car.id, error: e.message };
  }
}

export function CarPredictions({ selected }: CarPredictionsProps) {
  const [results, setResults] = useState<CarAnalysisResult[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let active = true;
    const run = async () => {
      setLoading(true);
      const chosen = CAR_CATALOG.filter(c => selected.includes(c.id));
      const fetched: CarAnalysisResult[] = [];
      for (const car of chosen) {
        const r = await fetchAnalysis(car);
        if (!active) return;
        fetched.push(r);
        setResults(prev => [...prev.filter(p => p.id !== r.id), r]);
      }
      setLoading(false);
    };
    if (selected.length) run(); else setResults([]);
    return () => { active = false; };
  }, [selected]);

  if (!selected.length) {
    return <p className="text-slate-400 text-sm">Select cars to see live predictions.</p>;
  }

  return (
    <div className="space-y-4 mt-6">
      {results.map(r => {
        const car = CAR_CATALOG.find(c => c.id === r.id)!;
        return (
          <div key={r.id} className="rounded-xl border border-slate-700 bg-slate-800 p-4">
            <h4 className="font-semibold text-white mb-2">{car.make} {car.model} <span className="text-xs text-slate-400">{car.year}</span></h4>
            {r.error && <p className="text-red-400 text-sm">Error: {r.error}</p>}
            {!r.error && (
              <div className="grid md:grid-cols-2 gap-4 text-sm text-slate-200">
                <div>
                  <p className="font-medium mb-1">Valuation</p>
                  <p>Fair Price: ${r.valuation?.fairPrice?.toLocaleString()}</p>
                  <p>Listing: ${r.valuation?.listingPrice?.toLocaleString()}</p>
                  <p>Deal Score: {r.valuation?.dealScore}/100</p>
                  <p>Position: {r.valuation?.pricePosition}</p>
                  <p>Advice: {r.valuation?.advice}</p>
                </div>
                <div>
                  <p className="font-medium mb-1">Depreciation (5y)</p>
                  <p>Annual Rate: {r.depreciation?.annualDepreciationRate}%</p>
                  <p>Resale @5y: ${r.depreciation?.resaleValue5Year?.toLocaleString()}</p>
                  <p>Retained: {r.depreciation?.percentRetained}%</p>
                  <p>Rating: {r.depreciation?.retentionRating}</p>
                  <p>Advice: {r.depreciation?.advice}</p>
                </div>
              </div>
            )}
          </div>
        );
      })}
      {loading && <p className="text-xs text-slate-400">Fetching predictions...</p>}
    </div>
  );
}
