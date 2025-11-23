'use client';
import { CarCatalog, usePersistedSelection } from '@/components/CarCatalog';
import { CarPredictions } from '@/components/CarPredictions';

export default function CatalogPage() {
  const { selected, update } = usePersistedSelection();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-2">🚗 Car Catalog</h1>
        <p className="text-slate-400 mb-6 text-sm">Select cars below to generate live valuation & 5-year depreciation predictions using the ML service.</p>
        <CarCatalog selected={selected} onChange={update} />
        <CarPredictions selected={selected} />
        <div className="mt-10 text-center">
          <a href="/" className="text-sm text-blue-400 hover:text-blue-300 underline">← Back to Home</a>
        </div>
      </div>
    </div>
  );
}
