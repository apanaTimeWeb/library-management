'use client';
// RESPONSIBILITY: Renders the AdminSystemWaitlistAutomationClient component.
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/app/admin/admin_system/admin_system_components/AdminSystemCard/AdminSystemCard';
import { Button } from '@/app/admin/admin_system/admin_system_components/AdminSystemButton/AdminSystemButton';
import { Input } from '@/app/admin/admin_system/admin_system_components/AdminSystemInput/AdminSystemInput';
import { Label } from '@/app/admin/admin_system/admin_system_components/AdminSystemLabel/AdminSystemLabel';
import { Switch } from '@/app/admin/admin_system/admin_system_components/AdminSystemSwitch/AdminSystemSwitch';
import { Textarea } from '@/app/admin/admin_system/admin_system_components/AdminSystemTextarea/AdminSystemTextarea';
import { Badge } from '@/app/admin/admin_system/admin_system_components/AdminSystemBadge/AdminSystemBadge';
import { ListOrdered, ChevronRight } from 'lucide-react';
import { ADMIN_SYSTEM_WAITLIST_QUEUE } from '@/app/admin/admin_system/admin_system_utils/AdminSystemMockData2';
import { useAdminSystemWaitlistAutomation } from '@/app/admin/admin_system/admin_system_waitlist_automation_hooks/useAdminSystemWaitlistAutomation';

export function AdminSystemWaitlistAutomationClient() {
  const {
    enabled, setEnabled,
    delay, setDelay,
    template, setTemplate
  } = useAdminSystemWaitlistAutomation();

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
      <Card className="mb-6">
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className={`h-12 w-12 rounded-2xl flex items-center justify-center text-text-primaryxl ${enabled ? 'bg-success/15' : 'bg-bg-pageg-input'}`}>
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
              <Badge variant={enabled ? 'success' : 'outline'}>{enabled ? 'Active' : 'Inactive'}</Badge>
              <Switch id="waitlist-auto-toggle" checked={enabled} onCheckedChange={setEnabled} />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Config */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Notification Configuration</CardTitle>
          <CardDescription>Customize message template and notification timing.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="waitlist-template">Notification Message Template</Label>
            <Textarea
              id="waitlist-template"
              rows={4}
              value={template}
              onChange={e => setTemplate(e.target.value)}
            />
            <p className="text-xs text-text-secondary">Available variables: <code className="text-primary">{'{name}'}</code>, <code className="text-primary">{'{shift}'}</code>, <code className="text-primary">{'{seat}'}</code></p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="waitlist-delay">Notification Delay</Label>
            <div className="flex items-center gap-3">
              <Input
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
          <Button id="save-waitlist-config-btn" variant="primary">💾 Save Config</Button>
        </CardFooter>
      </Card>

      {/* Queue Preview */}
      <Card>
        <CardHeader>
          <CardTitle>Current Waitlist Queue</CardTitle>
          <CardDescription>First 5 students awaiting seat assignment.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {ADMIN_SYSTEM_WAITLIST_QUEUE.map((student) => (
              <div
                key={student.position}
                className="flex items-center gap-4 p-3 rounded-xl bg-bg-pageg-card border border-border/50 hover:border-border transition-colors"
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
                <Badge variant="outline">{student.shift}</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
