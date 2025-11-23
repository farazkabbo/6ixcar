'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { UserButton, useUser } from '@clerk/nextjs';
import { Bot, Calculator, Menu, X, Sparkles } from 'lucide-react';
import ChatInterface from './ChatInterface';
import BudgetSimulator from './BudgetSimulator';
import { CarCatalog, usePersistedSelection } from './CarCatalog';
import { CarPredictions } from './CarPredictions';
import { MLServiceBadge, MLPipelineVisualizer } from './MLIndicators';

type Tab = 'chat' | 'budget' | 'ml';

export default function DashboardClient() {
  const [activeTab, setActiveTab] = useState<Tab>('chat');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user } = useUser();
  const { selected, update } = usePersistedSelection();
  const [isProcessing, setIsProcessing] = useState(false);

  // Track when predictions are being fetched
  useEffect(() => {
    setIsProcessing(selected.length > 0);
    const timer = setTimeout(() => setIsProcessing(false), 3000);
    return () => clearTimeout(timer);
  }, [selected]);

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Navigation Bar */}
      <nav className="bg-slate-900/50 backdrop-blur-sm border-b border-slate-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-orange-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">6</span>
              </div>
              <span className="text-white font-bold text-xl">6ixKar</span>
            </motion.div>

            {/* Desktop Navigation */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="hidden md:flex items-center gap-6"
            >
              {user && (
                <span className="text-slate-400 text-sm">
                  Welcome, <span className="text-white font-semibold">{user.firstName || 'Friend'}</span>!
                </span>
              )}
              <UserButton
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    avatarBox: 'w-10 h-10',
                  },
                }}
              />
            </motion.div>

            {/* Mobile Menu Button */}
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-white p-2"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-slate-900 border-t border-slate-800"
          >
            <div className="px-4 py-4 space-y-3">
              {user && (
                <p className="text-slate-400 text-sm">
                  Welcome, <span className="text-white font-semibold">{user.firstName || 'Friend'}</span>!
                </p>
              )}
              <div className="flex justify-start">
                <UserButton
                  afterSignOutUrl="/"
                  appearance={{
                    elements: {
                      avatarBox: 'w-10 h-10',
                    },
                  }}
                />
              </div>
            </div>
          </motion.div>
        )}
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tab Switcher */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-2 inline-flex gap-2">
            <button
              onClick={() => setActiveTab('chat')}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
                activeTab === 'chat'
                  ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-lg shadow-red-500/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Bot className="w-5 h-5" />
              <span className="hidden sm:inline">6ixBot Chat</span>
              <span className="sm:hidden">Chat</span>
            </button>
            <button
              onClick={() => setActiveTab('budget')}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
                activeTab === 'budget'
                  ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-lg shadow-red-500/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Calculator className="w-5 h-5" />
              <span className="hidden sm:inline">Budget Simulator</span>
              <span className="sm:hidden">Budget</span>
            </button>
            <button
              onClick={() => setActiveTab('ml')}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
                activeTab === 'ml'
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Sparkles className="w-5 h-5" />
              <span className="hidden sm:inline">AI Predictions</span>
              <span className="sm:hidden">AI</span>
            </button>
          </div>
        </motion.div>

        {/* Content Area */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="bg-slate-900/30 backdrop-blur-sm border border-slate-800 rounded-2xl overflow-hidden"
        >
          {activeTab === 'chat' ? (
            <div className="h-[calc(100vh-16rem)]">
              <ChatInterface />
            </div>
          ) : activeTab === 'budget' ? (
            <div className="p-6 max-h-[calc(100vh-16rem)] overflow-y-auto">
              <BudgetSimulator />
            </div>
          ) : (
            <div className="p-6 max-h-[calc(100vh-16rem)] overflow-y-auto">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-1">🚗 Live AI Predictions</h2>
                    <p className="text-sm text-slate-400">Select cars to generate real-time valuation & depreciation analysis</p>
                  </div>
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg">
                    🤖 ML POWERED
                  </div>
                </div>
                
                <CarCatalog selected={selected} onChange={update} />
                <CarPredictions selected={selected} />
              </motion.div>
            </div>
          )}
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl p-4">
            <p className="text-sm text-slate-400 mb-1">🍁 Canadian Focused</p>
            <p className="text-lg font-bold text-white">13 Provinces Covered</p>
          </div>
          <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl p-4">
            <p className="text-sm text-slate-400 mb-1">❄️ Winter Ready</p>
            <p className="text-lg font-bold text-white">AI-Powered Scoring</p>
          </div>
          <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl p-4">
            <p className="text-sm text-slate-400 mb-1">💰 Save Money</p>
            <p className="text-lg font-bold text-white">True Cost Analysis</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
