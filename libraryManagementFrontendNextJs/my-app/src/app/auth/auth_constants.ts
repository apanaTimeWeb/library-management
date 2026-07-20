// RESPONSIBILITY: Renders or handles logic for auth_constants.ts.
export const AUTH_ROLES = [
  {
    id: "superadmin",
    label: "Super Admin",
    description: "First-time setup — configure library, shifts & plans",
    icon: "ðŸ‘‘",
    redirectTo: "/superadmin/superadmin_dashboard",
    setupComplete: true
  },
  {
    id: "admin",
    label: "Admin",
    description: "Branch management — students, fees, reports",
    icon: "ðŸ›¡ï¸",
    redirectTo: "/admin/admin_dashboard",
    setupComplete: true
  },
  {
    id: "manager",
    label: "Manager",
    description: "Daily ops — admissions, seat matrix, renewals",
    icon: "ðŸ“‹",
    redirectTo: "/manager/manager_seats_shifts_lockers/seat-matrix",
    setupComplete: true
  }
];

export const AUTH_ROLE_DEST_LABEL: Record<string, string> = {
  superadmin: '→ Setup Wizard (configure your library first)',
  admin:      '→ Admin Dashboard',
  manager:    '→ Students & Seat Management',
};

export const AUTH_SIGNUP_PRESETS = {
  ownerName: "Rajesh Kumar",
  libraryName: "City Reading Hub",
  email: "rajesh@cityreadinghub.com",
  phone: "+91 9876543210"
};

export const AUTH_RESET_PASSWORD_PRESETS = {
  otp: ["4", "2", "7", "8", "1", "9"]
};

