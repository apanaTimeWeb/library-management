import { useState, useRef } from "react";
import { ChevronRight, X, Send, Save } from "lucide-react";
import { ADMIN_COMMUNICATION_WHATSAPP_VARS, ADMIN_COMMUNICATION_WHATSAPP_TEMPLATES } from "@/app/admin/admin_communication/admin_communication_constants/AdminCommunicationConstants";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import toast from "react-hot-toast";
export interface Template { id: string; label: string; icon: string; body: string; }
