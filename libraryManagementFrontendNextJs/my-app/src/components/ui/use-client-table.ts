"use client";
import { useState, useMemo } from 'react';

export function useClientTable<T>(data: T[], defaultLimit = 10) {
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(defaultLimit);

  const filteredData = useMemo(() => {
    if (!searchTerm) return data || [];
    const lower = searchTerm.toLowerCase();
    return (data || []).filter(item => {
      if (!item) return false;
      return Object.values(item as Record<string, unknown>).some(val => 
         String(val).toLowerCase().includes(lower)
      );
    });
  }, [data, searchTerm]);

  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / limit) || 1;
  const currentPage = Math.min(page, totalPages);
  
  const startIndex = (currentPage - 1) * limit;
  const paginatedData = filteredData.slice(startIndex, startIndex + limit);

  return {
    searchTerm, setSearchTerm,
    page: currentPage, setPage,
    limit, setLimit,
    totalItems,
    paginatedData
  };
}
