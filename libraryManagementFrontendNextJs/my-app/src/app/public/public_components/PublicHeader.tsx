import React from 'react';
import Link from 'next/link';
import { ThemeToggle } from '@/components/ThemeToggle';

export function PublicHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-page/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {/* Simple Logo */}
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-white font-bold text-lg">S</span>
          </div>
          <span className="text-xl font-bold text-text-primary hidden sm:inline-block">
            Smart Library 360
          </span>
        </div>
        
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Link 
            href="/auth/login"
            className="px-4 py-2 bg-primary text-white rounded-md text-sm font-medium hover:bg-primary/90 transition-colors"
          >
            Login
          </Link>
        </div>
      </div>
    </header>
  );
}
