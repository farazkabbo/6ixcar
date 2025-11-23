"use client";
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, AlertCircle, CheckCircle2, Loader2, Server, Zap } from 'lucide-react';

interface MLServiceStatus {
  status: 'online' | 'offline' | 'checking';
  service?: string;
  endpoint?: string;
  timestamp?: string;
}

export function MLServiceBadge() {
  const [status, setStatus] = useState<MLServiceStatus>({ status: 'checking' });

  const checkStatus = async () => {
    try {
      const res = await fetch('/api/ml-status');
      const data = await res.json();
      setStatus(data);
    } catch {
      setStatus({ status: 'offline' });
    }
  };

  useEffect(() => {
    checkStatus();
    const interval = setInterval(checkStatus, 10000); // Check every 10s
    return () => clearInterval(interval);
  }, []);

  const statusConfig = {
    online: {
      icon: CheckCircle2,
      color: 'text-green-400',
      bg: 'bg-green-500/20',
      border: 'border-green-500/50',
      pulse: 'bg-green-400',
      text: 'ML Service Online',
    },
    offline: {
      icon: AlertCircle,
      color: 'text-red-400',
      bg: 'bg-red-500/20',
      border: 'border-red-500/50',
      pulse: 'bg-red-400',
      text: 'ML Service Offline',
    },
    checking: {
      icon: Loader2,
      color: 'text-yellow-400',
      bg: 'bg-yellow-500/20',
      border: 'border-yellow-500/50',
      pulse: 'bg-yellow-400',
      text: 'Checking ML Service...',
    },
  };

  const config = statusConfig[status.status];
  const Icon = config.icon;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={status.status}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg border ${config.bg} ${config.border} ${config.color}`}
      >
        <div className="relative">
          <Icon className={`w-4 h-4 ${status.status === 'checking' ? 'animate-spin' : ''}`} />
          {status.status === 'online' && (
            <motion.div
              className={`absolute -top-1 -right-1 w-2 h-2 ${config.pulse} rounded-full`}
              animate={{ scale: [1, 1.2, 1], opacity: [1, 0.5, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
            />
          )}
        </div>
        <div className="text-xs">
          <div className="font-semibold">{config.text}</div>
          {status.service && (
            <div className="text-[10px] opacity-75">{status.service}</div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export function MLPipelineVisualizer({ isProcessing }: { isProcessing: boolean }) {
  return (
    <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
      <div className="flex items-center gap-2 mb-3">
        <Server className="w-4 h-4 text-purple-400" />
        <span className="text-xs font-semibold text-slate-300">ML Pipeline Status</span>
      </div>
      
      <div className="space-y-3">
        {/* Step 1: Data Input */}
        <div className="flex items-center gap-3">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isProcessing ? 'bg-blue-500' : 'bg-slate-700'} transition-colors`}>
            <span className="text-xs font-bold text-white">1</span>
          </div>
          <div className="flex-1">
            <div className="text-xs text-slate-300">Car Data Input</div>
            <div className="text-[10px] text-slate-500">Make, Model, Year, Mileage, Province</div>
          </div>
          {isProcessing && (
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 1 }}
            >
              <Zap className="w-4 h-4 text-blue-400" />
            </motion.div>
          )}
        </div>

        {/* Arrow */}
        <div className="ml-4 flex items-center gap-2">
          <motion.div
            className="h-6 w-0.5 bg-gradient-to-b from-blue-500 to-purple-500"
            animate={isProcessing ? { opacity: [0.3, 1, 0.3] } : {}}
            transition={{ repeat: Infinity, duration: 1.5 }}
          />
        </div>

        {/* Step 2: ML Processing */}
        <div className="flex items-center gap-3">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isProcessing ? 'bg-purple-500' : 'bg-slate-700'} transition-colors`}>
            <span className="text-xs font-bold text-white">2</span>
          </div>
          <div className="flex-1">
            <div className="text-xs text-slate-300">Random Forest ML Model</div>
            <div className="text-[10px] text-slate-500">100 estimators, Feature Engineering</div>
          </div>
          {isProcessing && (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
            >
              <Activity className="w-4 h-4 text-purple-400" />
            </motion.div>
          )}
        </div>

        {/* Arrow */}
        <div className="ml-4 flex items-center gap-2">
          <motion.div
            className="h-6 w-0.5 bg-gradient-to-b from-purple-500 to-green-500"
            animate={isProcessing ? { opacity: [0.3, 1, 0.3] } : {}}
            transition={{ repeat: Infinity, duration: 1.5, delay: 0.5 }}
          />
        </div>

        {/* Step 3: Predictions */}
        <div className="flex items-center gap-3">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isProcessing ? 'bg-green-500' : 'bg-slate-700'} transition-colors`}>
            <span className="text-xs font-bold text-white">3</span>
          </div>
          <div className="flex-1">
            <div className="text-xs text-slate-300">AI Predictions Generated</div>
            <div className="text-[10px] text-slate-500">Valuation, Depreciation, Deal Score</div>
          </div>
          {isProcessing && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <CheckCircle2 className="w-4 h-4 text-green-400" />
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

export function MLMetadataPanel({ 
  modelType = "Random Forest Regressor",
  confidence = 0.95,
  processingTime = 0,
  features = 8
}: {
  modelType?: string;
  confidence?: number;
  processingTime?: number;
  features?: number;
}) {
  return (
    <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 rounded-lg p-4 border border-purple-500/30">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
        <span className="text-xs font-bold text-purple-400 uppercase tracking-wider">ML Model Info</span>
      </div>
      
      <div className="grid grid-cols-2 gap-3 text-xs">
        <div>
          <div className="text-slate-500 text-[10px] mb-0.5">Algorithm</div>
          <div className="text-white font-semibold">{modelType}</div>
        </div>
        <div>
          <div className="text-slate-500 text-[10px] mb-0.5">Confidence</div>
          <div className="text-white font-semibold">{(confidence * 100).toFixed(1)}%</div>
        </div>
        <div>
          <div className="text-slate-500 text-[10px] mb-0.5">Features Used</div>
          <div className="text-white font-semibold">{features} variables</div>
        </div>
        <div>
          <div className="text-slate-500 text-[10px] mb-0.5">Processing Time</div>
          <div className="text-white font-semibold">{processingTime > 0 ? `${processingTime}ms` : '---'}</div>
        </div>
      </div>

      <div className="mt-3 pt-3 border-t border-purple-500/20">
        <div className="text-[10px] text-slate-400">
          🐍 Python FastAPI + scikit-learn ML
        </div>
      </div>
    </div>
  );
}
