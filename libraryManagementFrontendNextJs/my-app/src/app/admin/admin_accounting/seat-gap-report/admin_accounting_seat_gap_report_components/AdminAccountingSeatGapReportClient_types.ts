// RESPONSIBILITY: Renders or handles logic for AdminAccountingSeatGapReportClient_types.ts.
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Download, Search } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TablePagination } from "@/components/ui/table-pagination";
export type GapRow = {
  seatNo: string;
  shift: string;
  floor: string;
  lastOccupied: string;
  gapDays: number;
  revenueLoss: number;
  status: 'vacant' | 'maintenance';
};

