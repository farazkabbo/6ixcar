"use client";
import { useState, useEffect } from 'react';
import { CAR_CATALOG, CarSpec } from '@/lib/cars';

interface CarCatalogProps {
  selected: string[];
  onChange: (ids: string[]) => void;
}

export function CarCatalog({ selected, onChange }: CarCatalogProps) {
  const toggle = (id: string) => {
    let next: string[];
    if (selected.includes(id)) {
      next = selected.filter(x => x !== id);
    } else {
      next = [...selected, id];
    }
    onChange(next);
  };

  return (
    <div className="grid md:grid-cols-3 gap-4">
      {CAR_CATALOG.map(car => {
        const active = selected.includes(car.id);
        return (
          <button
            key={car.id}
            onClick={() => toggle(car.id)}
            className={`text-left rounded-xl border p-4 transition group relative overflow-hidden ${active ? 'border-green-500 bg-green-500/10' : 'border-slate-700 bg-slate-800 hover:border-slate-500'}`}
          >
            <div className="absolute inset-0 opacity-0 group-hover:opacity-10 bg-gradient-to-br from-red-500 to-orange-500 transition" />
            <h3 className="font-semibold text-white mb-1">{car.make} {car.model}</h3>
            <p className="text-xs text-slate-400 mb-2">{car.year} • {car.trim} • {car.mileage.toLocaleString()} km • {car.province}</p>
            <p className="text-sm text-slate-300">Listing: ${car.listing_price?.toLocaleString()}</p>
            <p className="text-[11px] mt-2 uppercase tracking-wide font-medium text-slate-400">{active ? 'Selected' : 'Tap to select'}</p>
          </button>
        );
      })}
    </div>
  );
}

export function usePersistedSelection(key: string = 'car-selection') {
  const [selected, setSelected] = useState<string[]>([]);
  useEffect(() => {
    const raw = typeof window !== 'undefined' ? localStorage.getItem(key) : null;
    if (raw) {
      try { setSelected(JSON.parse(raw)); } catch {}
    }
  }, [key]);
  const update = (ids: string[]) => {
    setSelected(ids);
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, JSON.stringify(ids));
    }
  };
  return { selected, update };
}
