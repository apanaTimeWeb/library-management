import { useUrlState } from '@/app/manager/manager_shared_hooks/useUrlState';
import React, { useState, useRef, useEffect } from 'react';
import { Search, ChevronDown } from 'lucide-react';
import { useManagerDebounce } from '@/app/manager/manager_shared_hooks/useManagerDebounce';

import { ManagerSearchableDropdownProps } from '@/app/manager/manager_types/manager_types';

// RESPONSIBILITY: Render a searchable dropdown for large datasets.
export function ManagerSearchableDropdown({ options, value, onChange, placeholder = 'Select...', className = '' }: ManagerSearchableDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useUrlState('searchTerm', '' as string);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const debouncedSearch = useManagerDebounce(searchTerm, 300);

  const filteredOptions = React.useMemo(() => {
    return options.filter(opt => opt.label.toLowerCase().includes(debouncedSearch.toLowerCase()));
  }, [options, debouncedSearch]);

  const selectedOption = options.find(opt => opt.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <div 
        className="flex items-center justify-between bg-input border border-border rounded-lg px-3.5 py-2.5 text-sm text-text-primary cursor-pointer hover:border-primary transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={selectedOption ? 'text-text-primary' : 'text-text-tertiary'}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown size={16} className={`text-text-secondary transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </div>

      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-card border border-border rounded-lg shadow-lg max-h-60 overflow-hidden flex flex-col">
          <div className="p-2 border-b border-border">
            <div className="relative">
              <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-text-secondary" />
              <input
                type="text"
                className="w-full bg-input border border-border rounded-md pl-8 pr-3 py-1.5 text-sm text-text-primary focus:outline-none focus:border-primary"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                autoFocus
              />
            </div>
          </div>
          <div className="overflow-y-auto flex-1 p-1">
            {filteredOptions.length > 0 ? (
              filteredOptions.map(opt => (
                <div
                  key={opt.value}
                  className={`px-3 py-2 text-sm rounded-md cursor-pointer hover:bg-primary-subtle hover:text-primary transition-colors ${value === opt.value ? 'bg-primary-subtle text-primary font-medium' : 'text-text-primary'}`}
                  onClick={() => {
                    onChange(opt.value);
                    setIsOpen(false);
                    setSearchTerm('');
                  }}
                >
                  {opt.label}
                </div>
              ))
            ) : (
              <div className="px-3 py-4 text-sm text-center text-text-secondary">No results found</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

