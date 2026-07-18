import { useState } from "react";
import { ArrowLeft, Search, ChevronDown, CreditCard, QrCode, Banknote, CheckCircle, Clock } from "lucide-react";
import toast from "react-hot-toast";
import { SUPERADMIN_SEATS_MOCK_MIGRATION_STUDENTS } from "@superadmin/superadmin_seats_shifts_lockers/superadmin_seats_shifts_lockers_utils/SuperadminSeatsMockData";
import { SuperadminSearchableDropdown } from "@/app/superadmin/superadmin_shared_components/SuperadminSearchableDropdown";
import type { SuperadminSeatsStudent } from "@/app/superadmin/superadmin_seats_shifts_lockers/superadmin_seats_types/SuperadminSeatsShiftsLockersTypes";
export type PayMode = 'Cash'|'UPI'|'Card'|'Bank'|'cash'|'upi'|'card'|'bank';
