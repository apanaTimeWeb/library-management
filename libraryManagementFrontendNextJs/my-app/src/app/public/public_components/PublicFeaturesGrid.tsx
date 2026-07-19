"use client";
// RESPONSIBILITY: Component or Page.
import React from 'react';
import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import { PUBLIC_FEATURES } from '@/app/public/public_constants/PublicLandingConstants';

export function PublicFeaturesGrid() {
  return (
    <section className="py-24 px-6 bg-card border-y border-border">
      <div className="max-w-7xl mx-auto">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">Everything you need to scale</h2>
          <p className="text-text-secondary text-lg">Stop relying on spreadsheets. Automate your entire library operation with our enterprise-grade suite.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PUBLIC_FEATURES.map((feature, idx) => {
            const IconComponent = (Icons as any)[feature.iconName] || Icons.CheckCircle;
            
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-page border border-border rounded-lg p-6 hover:border-primary/50 transition-colors group cursor-default"
              >
                <div className="w-12 h-12 rounded-md bg-primary-subtle text-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <IconComponent size={24} />
                </div>
                <h3 className="text-lg font-semibold text-text-primary mb-2">{feature.title}</h3>
                <p className="text-text-secondary leading-relaxed">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

