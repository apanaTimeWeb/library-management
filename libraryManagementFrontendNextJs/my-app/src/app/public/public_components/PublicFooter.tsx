"use client";
// RESPONSIBILITY: Component or Page.
import React from 'react';
import Link from 'next/link';
import { Instagram, Twitter, Facebook, Youtube, Linkedin, BookOpen } from 'lucide-react';

export function PublicFooter() {
  return (
    <footer className="bg-card border-t border-border pt-16 pb-8 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        <div className="col-span-1 md:col-span-2">
          <Link href="/" className="flex items-center gap-2 mb-6 text-text-primary font-bold text-xl">
            <BookOpen className="text-primary" size={28} />
            <span>Smart Library 360</span>
          </Link>
          <p className="text-text-secondary max-w-sm mb-6 leading-relaxed">
            The ultimate management operating system for modern reading rooms and study spaces.
          </p>
          <div className="flex gap-4">
            <a href="#" className="text-text-secondary hover:text-primary transition-colors"><Twitter size={20} /></a>
            <a href="#" className="text-text-secondary hover:text-primary transition-colors"><Instagram size={20} /></a>
            <a href="#" className="text-text-secondary hover:text-primary transition-colors"><Facebook size={20} /></a>
            <a href="#" className="text-text-secondary hover:text-primary transition-colors"><Youtube size={20} /></a>
            <a href="#" className="text-text-secondary hover:text-primary transition-colors"><Linkedin size={20} /></a>
          </div>
        </div>
        
        <div>
          <h4 className="text-text-primary font-semibold mb-4">Product</h4>
          <ul className="space-y-3">
            <li><Link href="#" className="text-text-secondary hover:text-primary transition-colors">Features</Link></li>
            <li><Link href="#" className="text-text-secondary hover:text-primary transition-colors">Pricing</Link></li>
            <li><Link href="#" className="text-text-secondary hover:text-primary transition-colors">Integrations</Link></li>
            <li><Link href="#" className="text-text-secondary hover:text-primary transition-colors">Changelog</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-text-primary font-semibold mb-4">Legal</h4>
          <ul className="space-y-3">
            <li><Link href="#" className="text-text-secondary hover:text-primary transition-colors">Privacy Policy</Link></li>
            <li><Link href="#" className="text-text-secondary hover:text-primary transition-colors">Terms of Service</Link></li>
            <li><Link href="#" className="text-text-secondary hover:text-primary transition-colors">Cookie Policy</Link></li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-text-disabled">
        <p>© {new Date().getFullYear()} Smart Library 360. All rights reserved.</p>
        <p>Designed for scale.</p>
      </div>
    </footer>
  );
}
