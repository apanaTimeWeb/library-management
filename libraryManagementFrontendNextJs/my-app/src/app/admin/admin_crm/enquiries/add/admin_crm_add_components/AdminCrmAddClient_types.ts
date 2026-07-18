import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { X, Save, PhoneCall } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { addEnquirySchema, type AddEnquiryFormData } from "@/app/admin/admin_crm/admin_crm_components/AdminCrmschema/AdminCrmschema";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";
export interface AdminCrmAddClientProps { onClose?: () => void; }
