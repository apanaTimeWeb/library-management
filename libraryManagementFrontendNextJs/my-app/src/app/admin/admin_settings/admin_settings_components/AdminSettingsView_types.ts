// RESPONSIBILITY: Renders or handles logic for AdminSettingsView_types.ts.
import { Save, CheckCircle, Settings } from "lucide-react";
import { Toaster } from "react-hot-toast";
import { useAdminSettings, type SettingsState } from "@/app/admin/admin_settings/admin_settings_hooks/useAdminSettings";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import React from "react";
export interface AdminSettingsViewProps {
  initialSettings: SettingsState;
}

