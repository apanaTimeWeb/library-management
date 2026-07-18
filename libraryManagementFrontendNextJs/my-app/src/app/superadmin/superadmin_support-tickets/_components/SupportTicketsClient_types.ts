import { useState, useRef, useCallback, useMemo } from "react";
import { AgGridReact } from "ag-grid-react";
import type { ColDef, ICellRendererParams, GridReadyEvent } from "ag-grid-community";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { superadmin_gridTheme } from "@/app/superadmin/superadmin_shared_components/superadmin_gridTheme";
import { Eye, Clock, MessageSquare, AlertTriangle, X, CheckCircle, Loader, Send } from "lucide-react";
import { SUPERADMIN_SUPPORT_MOCK_TICKETS } from "@/app/superadmin/superadmin_support-tickets/superadmin_support_constants/SuperadminSupportConstants";
export interface Ticket { user: string; branch: string; date: string;  desc?: string; tenant?: string; age?: string; replies?: number;  id: string; subject: string; status: string; priority: "Low"|"Medium"|"High"; user: string; branch: string; date: string; }
