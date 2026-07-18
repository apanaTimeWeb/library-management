// RESPONSIBILITY: Renders the SuperadminSystemWaitlistAutomationClient component.
'use client';
import { SuperadminCard, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/app/superadmin/superadmin_system/superadmin_system_shared_components/SuperadminCard';
import { SuperadminButton } from '@/app/superadmin/superadmin_system/superadmin_system_shared_components/SuperadminButton';
import { SuperadminInput } from '@/app/superadmin/superadmin_system/superadmin_system_shared_components/SuperadminInput';
import { SuperadminLabel } from '@/app/superadmin/superadmin_system/superadmin_system_shared_components/SuperadminLabel';
import { SuperadminSwitch } from '@/app/superadmin/superadmin_system/superadmin_system_shared_components/SuperadminSwitch';
import { SuperadminTextarea } from '@/app/superadmin/superadmin_system/superadmin_system_shared_components/SuperadminTextarea';
import { SuperadminBadge } from '@/app/superadmin/superadmin_system/superadmin_system_shared_components/SuperadminBadge';
import { ListOrdered, ChevronRight } from 'lucide-react';
import { SUPERADMIN_SYSTEM_MOCK_WAITLIST } from '@/app/superadmin/superadmin_system/superadmin_system_data/SuperadminSystemMockData';
import { useSuperadminSystemWaitlistAutomation } from '@/app/superadmin/superadmin_system/superadmin_system_waitlist_automation_hooks/useSuperadminSystemWaitlistAutomation';

export function SuperadminSystemWaitlistAutomationClient() {
  const { enabled, setEnabled, delay, setDelay, template, setTemplate } = useSuperadminSystemWaitlistAutomation();

  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center gap-2 text-text-secondary text-xs font-medium tracking-wide mb-1">
          <span>System</span>
          <ChevronRight size={12} />
          <span>Waitlist Automation</span>
        </div>
        <h1 className="text-3xl font-bold text-text-primary flex items-center gap-3">
          <ListOrdered size={28} className="text-primary" />
          Waitlist Automation
        </h1>
        <p className="text-text-secondary mt-1 text-sm">Automatically notify the next student in queue when a seat becomes available.</p>
      </div>

      {/* Status Toggle Card */}
      <SuperadminCard className="mb-6">
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className={`h-12 w-12 rounded-2xl flex items-center justify-center text-2xl ${enabled ? 'bg-green-500/15' : 'bg-bg-input'}`}>
                📋
              </div>
              <div>
                <p className="text-base font-semibold text-text-primary">Waitlist Auto-Notification</p>
                <p className="text-sm text-text-secondary mt-0.5">
                  {enabled
                    ? 'When a seat becomes free, automatically WhatsApp the next student in queue.'
                    : 'Auto-notification is OFF. Students must be notified manually.'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <SuperadminBadge variant={enabled ? 'success' : 'default'}>{enabled ? 'Active' : 'Inactive'}</SuperadminBadge>
              <SuperadminSwitch id="waitlist-auto-toggle" checked={enabled} onCheckedChange={setEnabled} />
            </div>
          </div>
        </CardContent>
      </SuperadminCard>

      {/* Config */}
      <SuperadminCard className="mb-6">
        <CardHeader>
          <CardTitle>Notification Configuration</CardTitle>
          <CardDescription>Customize message template and notification timing.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="space-y-2">
            <SuperadminLabel htmlFor="waitlist-template">Notification Message Template</SuperadminLabel>
            <SuperadminTextarea
              id="waitlist-template"
              rows={4}
              value={template}
              onChange={e => setTemplate(e.target.value)}
            />
            <p className="text-xs text-text-secondary">Available variables: <code className="text-primary">{'{name}'}</code>, <code className="text-primary">{'{shift}'}</code>, <code className="text-primary">{'{seat}'}</code></p>
          </div>
          <div className="space-y-2">
            <SuperadminLabel htmlFor="waitlist-delay">Notification Delay</SuperadminLabel>
            <div className="flex items-center gap-3">
              <SuperadminInput
                id="waitlist-delay"
                type="number"
                value={delay}
                onChange={e => setDelay(+e.target.value)}
                className="w-28"
                min={0}
              />
              <span className="text-sm text-text-secondary">minutes after seat becomes available</span>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <SuperadminButton id="save-waitlist-config-btn" variant="primary">💾 Save Config</SuperadminButton>
        </CardFooter>
      </SuperadminCard>

      {/* Queue Preview */}
      <SuperadminCard>
        <CardHeader>
          <CardTitle>Current Waitlist Queue</CardTitle>
          <CardDescription>First 5 students awaiting seat assignment.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {SUPERADMIN_SYSTEM_MOCK_WAITLIST.map((student) => (
              <div
                key={student.position}
                className="flex items-center gap-4 p-3 rounded-xl bg-bg-card border border-border/50 hover:border-border transition-colors"
              >
                {/* Position */}
                <div className="h-8 w-8 rounded-full bg-primary/15 flex items-center justify-center text-primary text-sm font-bold shrink-0">
                  #{student.position}
                </div>
                {/* Avatar */}
                <div className="h-10 w-10 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary font-bold text-sm shrink-0">
                  {student.avatar}
                </div>
                {/* Info */}
                <div className="flex-1">
                  <p className="text-sm font-medium text-text-primary">{student.name}</p>
                  <p className="text-xs text-text-secondary">Joined waitlist: {student.joined}</p>
                </div>
                <SuperadminBadge variant="default">{student.shift}</SuperadminBadge>
              </div>
            ))}
          </div>
        </CardContent>
      </SuperadminCard>
    </div>
  );
}
