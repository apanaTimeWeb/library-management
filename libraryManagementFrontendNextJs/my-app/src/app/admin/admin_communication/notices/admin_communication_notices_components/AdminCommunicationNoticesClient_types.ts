import { useState, useEffect } from "react";
import { ChevronRight, Plus, X, Edit2, Trash2, Send } from "lucide-react";
import { fetchApi } from "@/lib/api";
import { logger } from "@/lib/logger";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import toast from "react-hot-toast";
import { TablePagination } from "@/components/ui/table-pagination";
export interface Notice {
  id: string; title: string; message: string;
  validTill: string; postedBy: string; postedDate: string;
  status: 'Active' | 'Expired';
}
