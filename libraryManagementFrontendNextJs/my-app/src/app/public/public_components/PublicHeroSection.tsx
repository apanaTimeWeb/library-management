"use client";
// RESPONSIBILITY: Component or Page.
import React from 'react';
import { motion } from 'framer-motion';
import { Play, ArrowRight, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { PUBLIC_ROUTES } from '@/app/public/public_url_config';

export function PublicHeroSection() {
  return (
    <section className="relative overflow-hidden pt-32 pb-24 md:pt-48 md:pb-32 px-6">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent pointer-events-none" />
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center relative z-10">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-subtle text-primary text-xs font-semibold uppercase tracking-wider mb-8 border border-primary/20"
        >
          <ShieldCheck size={14} />
          <span>The #1 Library Management Software</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl md:text-6xl font-bold text-text-primary tracking-tight max-w-4xl leading-tight mb-6"
        >
          Manage Your Study Space with <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-400">Smart Library 360</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg md:text-xl text-text-secondary max-w-2xl mb-10"
        >
          Automate fee collection, track seating dynamically, and send WhatsApp alerts instantly. 
          Built for modern study spaces and reading rooms.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <Link href="/auth/login" className="flex items-center gap-2 bg-primary hover:bg-primary-hover text-white px-8 py-3.5 rounded-md font-medium transition-all shadow-[0_0_20px_rgba(99,102,241,0.4)] hover:shadow-[0_0_30px_rgba(99,102,241,0.6)]">
            Start Free Trial <ArrowRight size={18} />
          </Link>
          <button className="flex items-center gap-2 bg-card hover:bg-input text-text-primary border border-border px-8 py-3.5 rounded-md font-medium transition-all">
            <Play size={18} className="text-primary" /> Book Demo
          </button>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-16 relative w-full max-w-5xl aspect-video rounded-[var(--radius-xl)] overflow-hidden border border-border shadow-2xl bg-card flex items-center justify-center"
        >
          {/* Placeholder for dashboard screenshot */}
          <div className="absolute inset-0 bg-gradient-to-tr from-bg-card to-bg-input opacity-50" />
          <div className="text-text-secondary font-medium flex items-center gap-2">
            <Play size={48} className="text-primary opacity-50" />
            <span className="sr-only">Dashboard Preview</span>
          </div>
        </motion.div>

      </div>
    </section>
  );
}

