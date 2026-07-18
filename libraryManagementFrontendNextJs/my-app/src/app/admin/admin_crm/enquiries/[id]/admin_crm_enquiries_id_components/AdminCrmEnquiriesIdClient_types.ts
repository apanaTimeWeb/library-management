import { useState, use, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast, { Toaster } from "react-hot-toast";
import { ArrowLeft, Phone, MapPin, User, CalendarDays, Tag, Clock, CheckCircle, XCircle, Plus, Edit2, AlertTriangle } from "lucide-react";
import { fetchApi } from "@/lib/api";
import { ADMIN_ROUTES, ADMIN_API_ROUTES } from "@/app/admin/admin_url_config";
import { type Enquiry, type EnquiryStatus, type FollowUp, STATUS_BADGE, maskPhone, getInitials } from "@/app/admin/admin_crm/admin_crm_components/AdminCrmtypes/AdminCrmtypes";
import { followUpSchema, type FollowUpFormData, markLostSchema, type MarkLostFormData } from "@/app/admin/admin_crm/admin_crm_components/AdminCrmschema/AdminCrmschema";
import { ADMIN_CRM_ENQUIRIES_STATUS_OPTIONS } from "@/app/admin/admin_crm/admin_crm_constants/AdminCrmConstants";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
export interface MarkLostModalProps {
  onConfirm: (reason: string) => void;
  onCancel: () => void;
  isSubmitting: boolean;
  isOpen: boolean;
}
export type FetchState = 'idle' | 'loading' | 'success' | 'error';
