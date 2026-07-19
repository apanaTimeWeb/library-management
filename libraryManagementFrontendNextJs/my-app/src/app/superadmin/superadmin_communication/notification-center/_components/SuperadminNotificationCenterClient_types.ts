// RESPONSIBILITY: Renders or handles logic for SuperadminNotificationCenterClient_types.ts.
import React from "react";
import { ChevronRight, ArrowRight, CheckCheck, DollarSign, Phone, Handshake, Armchair, Calendar, Clock, Lock, Bell, AlertCircle, Circle } from "lucide-react";
import { useSuperadminNotificationCenterClient } from "@/app/superadmin/superadmin_communication/notification-center/_components/useSuperadminNotificationCenterClient";
import type { SuperadminCommunicationNotification as Notification } from "@/app/superadmin/superadmin_communication/superadmin_communication_types/SuperadminCommunicationTypes";
export type Category = 'All'|'System'|'Billing'|'Security'|'Updates'|'Finance'|'CRM'|'Operations'|'Attendance'|'High Only'|'System';

