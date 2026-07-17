'use client';

// RESPONSIBILITY: Client view rendering accounting expense categories with budget bars (`Rule 1`, `Rule 36`).
// DATA FLOW: Static Mock -> AdminAccountingExpenseCategoriesClient (`Rule 39`).

import { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

type Category = { id: number; name: string; budget: number; spent: number; color: string };

const MOCK: Category[] = [
  { id: 1, name: 'Electricity',   budget: 5000,  spent: 4200,  color: 'bg-warning' },
  { id: 2, name: 'Maintenance',   budget: 4000,  spent: 3600,  color: 'bg-danger' },
  { id: 3, name: 'Internet',      budget: 2500,  spent: 2200,  color: 'bg-info' },
  { id: 4, name: 'Salary',        budget: 15000, spent: 12000, color: 'bg-primary' },
  { id: 5, name: 'Stationery',    budget: 1000,  spent: 650,   color: 'bg-success' },
  { id: 6, name: 'Cleaning',      budget: 1200,  spent: 900,   color: 'bg-purple-500' },
];

export function AdminAccountingExpenseCategoriesClient() {
  const [categories, setCategories] = useState(MOCK);

  return (
    <div className="space-y-6 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Accounting Categories</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage budget caps for various expense types.</p>
        </div>
        <Button className="gap-2">
          <Plus size={16} /> Add Category
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {categories.map(cat => {
          const pct = Math.min((cat.spent / cat.budget) * 100, 100);
          return (
            <Card key={`cat-${cat.id}`} className="p-5 shadow-sm hover:shadow-md transition-shadow border-border">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-sm ${cat.color}`} />
                  {cat.name}
                </h2>
                <Button variant="ghost" size="icon" className="text-danger hover:text-danger hover:bg-danger/10 h-8 w-8" title="Delete">
                  <Trash2 size={16} />
                </Button>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-muted-foreground">Spent: ₹{cat.spent}</span>
                  <span className="text-foreground">Budget: ₹{cat.budget}</span>
                </div>
                <div className="h-2.5 w-full bg-muted rounded-full overflow-hidden">
                  <div className={`h-full ${cat.color} transition-all`} style={{ width: `${pct}%` }} />
                </div>
                <p className="text-[10px] font-medium text-right text-muted-foreground uppercase tracking-wider mt-1">
                  {pct.toFixed(0)}% Used
                </p>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
