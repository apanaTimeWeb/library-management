'use client';

import { useState } from 'react';
import { IndianRupee, Search, CheckCircle2, FileText, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';

export function ManagerFinanceCollectFeeClient() {
  const [studentId, setStudentId] = useState('');
  const [amount, setAmount] = useState('');
  const [feeType, setFeeType] = useState('Monthly');
  const [paymentMethod, setPaymentMethod] = useState('UPI');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentId || !amount) {
      toast.error('Please fill in all required fields');
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success('Fee collected successfully!');
      setStudentId('');
      setAmount('');
    }, 1000);
  };

  return (
    <div className="p-6 min-h-screen">
      <div className="mb-8">
        <p className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-2">Smart Library 360 › Finance</p>
        <h1 className="text-xl font-bold text-text-primary">Collect Fee</h1>
        <p className="text-sm text-text-secondary mt-1.5">Record a new payment from a student.</p>
      </div>

      <div className="max-w-2xl bg-card border border-border rounded-xl p-6 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          
          <div>
            <label className="block text-sm font-semibold text-text-primary mb-2">Student ID or Name *</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-text-secondary">
                <Search size={16} />
              </div>
              <input 
                type="text" 
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                placeholder="Search by ID (e.g., LIB-001) or Name..." 
                className="w-full pl-10 pr-4 py-2.5 bg-input border border-border rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-text-primary mb-2">Fee Type</label>
              <select 
                value={feeType}
                onChange={(e) => setFeeType(e.target.value)}
                className="w-full px-4 py-2.5 bg-input border border-border rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow appearance-none"
              >
                <option value="Monthly">Monthly Subscription</option>
                <option value="Admission">Admission Fee</option>
                <option value="Security Deposit">Security Deposit</option>
                <option value="Locker">Locker Rent</option>
                <option value="Fine">Late Fine</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-text-primary mb-2">Amount (₹) *</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-text-secondary">
                  <IndianRupee size={16} />
                </div>
                <input 
                  type="number" 
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00" 
                  className="w-full pl-10 pr-4 py-2.5 bg-input border border-border rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow font-mono"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-text-primary mb-3">Payment Method</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {['UPI', 'Card', 'Cash', 'NetBanking'].map((method) => (
                <label 
                  key={method} 
                  className={`flex items-center justify-center py-2.5 px-3 border rounded-lg cursor-pointer transition-colors text-sm font-medium ${paymentMethod === method ? 'border-primary bg-primary/10 text-primary' : 'border-border bg-bg-elevated text-text-secondary hover:border-primary/50'}`}
                >
                  <input 
                    type="radio" 
                    name="paymentMethod" 
                    value={method}
                    checked={paymentMethod === method}
                    onChange={() => setPaymentMethod(method)}
                    className="sr-only" 
                  />
                  {method}
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-text-primary mb-2">Remarks / Note (Optional)</label>
            <textarea 
              rows={3}
              placeholder="Any additional details..."
              className="w-full px-4 py-3 bg-input border border-border rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow resize-y"
            ></textarea>
          </div>

          <div className="pt-4 border-t border-border flex justify-end gap-3">
            <button type="button" className="px-5 py-2.5 text-sm font-medium text-text-secondary hover:text-text-primary transition-colors">
              Cancel
            </button>
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="flex items-center gap-2 px-6 py-2.5 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-hover transition-colors disabled:opacity-50"
            >
              {isSubmitting ? 'Processing...' : (
                <>
                  Confirm Payment <ArrowRight size={16} />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
