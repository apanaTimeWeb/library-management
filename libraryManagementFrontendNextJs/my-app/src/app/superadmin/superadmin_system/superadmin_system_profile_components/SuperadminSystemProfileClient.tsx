'use client';
// RESPONSIBILITY: Renders the SuperadminSystemProfileClient component.
import { SuperadminCard, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/app/superadmin/superadmin_system/superadmin_system_shared_components/SuperadminCard';
import { SuperadminButton } from '@/app/superadmin/superadmin_system/superadmin_system_shared_components/SuperadminButton';
import { SuperadminInput } from '@/app/superadmin/superadmin_system/superadmin_system_shared_components/SuperadminInput';
import { SuperadminLabel } from '@/app/superadmin/superadmin_system/superadmin_system_shared_components/SuperadminLabel';
import { SuperadminProgress } from '@/app/superadmin/superadmin_system/superadmin_system_shared_components/SuperadminProgress';
import { User, Lock, Camera, Eye, EyeOff, ChevronRight } from 'lucide-react';
import { useSuperadminSystemProfile } from '@/app/superadmin/superadmin_system/superadmin_system_profile_hooks/useSuperadminSystemProfile';

export function SuperadminSystemProfileClient() {
  const {
    showCurrent, setShowCurrent,
    showNew, setShowNew,
    showConfirm, setShowConfirm,
    newPw, setNewPw,
    strength
  } = useSuperadminSystemProfile();

  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center gap-2 text-text-secondary text-xs font-medium tracking-wide mb-1">
          <span>System</span>
          <ChevronRight size={12} />
          <span>Profile</span>
        </div>
        <h1 className="text-3xl font-bold text-text-primary flex items-center gap-3">
          <User size={28} className="text-primary" />
          My Profile
        </h1>
        <p className="text-text-secondary mt-1 text-sm">Manage your personal information and account security.</p>
      </div>

      <div className="max-w-xl mx-auto space-y-6">
        {/* Personal Info */}
        <SuperadminCard>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>Update your display name, email and phone.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            {/* Avatar */}
            <div className="flex justify-center">
              <div className="relative group">
                <div className="h-20 w-20 rounded-full bg-primary/20 border-2 border-primary/30 flex items-center justify-center text-primary text-3xl font-bold select-none">
                  A
                </div>
                <button
                  id="change-photo-btn"
                  className="absolute inset-0 rounded-full bg-bg-pagelack/50 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                >
                  <Camera size={20} />
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <SuperadminLabel htmlFor="profile-name">Full Name <span className="text-danger">*</span></SuperadminLabel>
              <SuperadminInput id="profile-name" defaultValue="Admin User" />
            </div>
            <div className="space-y-2">
              <SuperadminLabel htmlFor="profile-email">Email</SuperadminLabel>
              <SuperadminInput id="profile-email" type="email" defaultValue="admin@smartlibrary.in" />
            </div>
            <div className="space-y-2">
              <SuperadminLabel htmlFor="profile-phone">Phone <span className="text-danger">*</span></SuperadminLabel>
              <SuperadminInput id="profile-phone" type="tel" defaultValue="+91 98765 43210" />
            </div>
          </CardContent>
          <CardFooter>
            <SuperadminButton id="update-profile-btn" variant="primary">💾 Update Profile</SuperadminButton>
          </CardFooter>
        </SuperadminCard>

        {/* Change Password */}
        <SuperadminCard>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock size={18} className="text-primary" />
              Change Password
            </CardTitle>
            <CardDescription>Update your account password regularly for security.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="space-y-2">
              <SuperadminLabel htmlFor="current-password">Current Password</SuperadminLabel>
              <div className="relative">
                <SuperadminInput id="current-password" type={showCurrent ? 'text' : 'password'} placeholder="Enter current password" className="pr-12" />
                <button type="button" onClick={() => setShowCurrent(s => !s)} className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary hover:text-text-primary">
                  {showCurrent ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            <div className="space-y-2">
              <SuperadminLabel htmlFor="new-password">New Password</SuperadminLabel>
              <div className="relative">
                <SuperadminInput id="new-password" type={showNew ? 'text' : 'password'} placeholder="Min. 8 characters" value={newPw} onChange={e => setNewPw(e.target.value)} className="pr-12" />
                <button type="button" onClick={() => setShowNew(s => !s)} className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary hover:text-text-primary">
                  {showNew ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {newPw && (
                <div className="space-y-1.5 mt-2">
                  <SuperadminProgress value={strength.score} max={4} barClassName={strength.color} />
                  <p className={`text-xs font-medium ${strength.score >= 3 ? 'text-success' : strength.score === 2 ? 'text-tertiary' : 'text-danger'}`}>
                    Password strength: {strength.label}
                  </p>
                </div>
              )}
            </div>
            <div className="space-y-2">
              <SuperadminLabel htmlFor="confirm-password">Confirm New Password</SuperadminLabel>
              <div className="relative">
                <SuperadminInput id="confirm-password" type={showConfirm ? 'text' : 'password'} placeholder="Repeat new password" className="pr-12" />
                <button type="button" onClick={() => setShowConfirm(s => !s)} className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary hover:text-text-primary">
                  {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <SuperadminButton id="change-password-btn" variant="primary">🔐 Change Password</SuperadminButton>
          </CardFooter>
        </SuperadminCard>
      </div>
    </div>
  );
}
