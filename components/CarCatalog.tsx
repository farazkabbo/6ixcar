"use client";
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Circle } from 'lucide-react';
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
      {CAR_CATALOG.map((car, idx) => {
        const active = selected.includes(car.id);
        return (
          <motion.button
            key={car.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05, duration: 0.3 }}
            whileHover={{ scale: 1.02, y: -4 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => toggle(car.id)}
            className={`text-left rounded-xl border p-4 transition-all group relative overflow-hidden shadow-lg ${
              active 
                ? 'border-green-500 bg-gradient-to-br from-green-500/20 to-emerald-500/10 shadow-green-500/20' 
                : 'border-slate-700 bg-slate-800 hover:border-slate-500 hover:shadow-slate-700/50'
            }`}
          >
            {/* Gradient overlay on hover */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-10 bg-gradient-to-br from-red-500 to-orange-500 transition-opacity duration-300" />
            
            {/* Selection indicator */}
            <div className="absolute top-3 right-3">
              <motion.div
                initial={false}
                animate={{ 
                  scale: active ? 1 : 0.8,
                  rotate: active ? 0 : -90
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                {active ? (
                  <CheckCircle2 className="w-6 h-6 text-green-400" />
                ) : (
                  <Circle className="w-6 h-6 text-slate-600 group-hover:text-slate-400" />
                )}
              </motion.div>
            </div>

            <h3 className="font-semibold text-white mb-1 pr-8">{car.make} {car.model}</h3>
            <p className="text-xs text-slate-400 mb-2">{car.year} • {car.trim} • {car.mileage.toLocaleString()} km</p>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs px-2 py-0.5 bg-slate-700 text-slate-300 rounded">{car.province}</span>
            </div>
            <p className="text-sm font-semibold text-slate-300">Listing: ${car.listing_price?.toLocaleString()}</p>
            
            <motion.p 
              className="text-[11px] mt-3 uppercase tracking-wide font-medium"
              animate={{ 
                color: active ? 'rgb(134, 239, 172)' : 'rgb(148, 163, 184)' 
              }}
            >
              {active ? '✓ Selected' : 'Tap to select'}
            </motion.p>
          </motion.button>
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
