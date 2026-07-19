'use client';
// RESPONSIBILITY: Renders the SuperadminSystemWhatsappClient component.
import { SuperadminCard, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/app/superadmin/superadmin_system/superadmin_system_shared_components/SuperadminCard';
import { SuperadminButton } from '@/app/superadmin/superadmin_system/superadmin_system_shared_components/SuperadminButton';
import { SuperadminBadge } from '@/app/superadmin/superadmin_system/superadmin_system_shared_components/SuperadminBadge';
import { SuperadminInput } from '@/app/superadmin/superadmin_system/superadmin_system_shared_components/SuperadminInput';
import { SuperadminLabel } from '@/app/superadmin/superadmin_system/superadmin_system_shared_components/SuperadminLabel';
import { SuperadminKpiCard } from '@/app/superadmin/superadmin_system/superadmin_system_shared_components/SuperadminKpiCard';
import { MessageSquare, ChevronRight, Eye, EyeOff, Copy, CheckCircle, XCircle, Phone, Zap, BarChart3, Loader2, Radio, Send, Banknote, Globe, Settings } from 'lucide-react';
import { useSuperadminSystemWhatsapp } from '@/app/superadmin/superadmin_system/superadmin_system_whatsapp_hooks/useSuperadminSystemWhatsapp';
import { SUPERADMIN_SYSTEM_WHATSAPP_PROVIDERS, SUPERADMIN_SYSTEM_WHATSAPP_STATUS_CFG } from '@/app/superadmin/superadmin_system/superadmin_system_constants/SuperadminSystemWhatsappConstants';
import { TableToolbar } from "@/components/ui/table-toolbar";
import { useClientTable } from "@/components/ui/use-client-table";
import { TablePagination } from "@/components/ui/table-pagination";

const PROVIDER_LOGOS: Record<string, React.ReactNode> = {
  twilio: <Globe size={16} className="text-primary" />,
  wati: <Globe size={16} className="text-success" />,
  aisensy: <Globe size={16} className="text-tertiary" />,
  custom: <Settings size={16} className="text-text-secondary" />,
};

export function SuperadminSystemWhatsappClient() {

  const {
    provider, setProvider, apiKey, setApiKey, apiSecret, setApiSecret,
    senderPhone, setSenderPhone, showApiKey, setShowApiKey, showSecret, setShowSecret,
    testStatus, copiedUrl, webhookUrl, selectedProvider, logs, stats,
    handleTestConnection, handleCopyWebhook
  } = useSuperadminSystemWhatsapp();

  const table = useClientTable(logs);

  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center gap-2 text-text-secondary text-xs font-medium tracking-wide mb-1">
          <span>System</span><ChevronRight size={12} /><span>WhatsApp Integration</span>
        </div>
        <h1 className="text-3xl font-bold text-text-primary flex items-center gap-3">
          <MessageSquare size={28} className="text-primary" />
          WhatsApp Integration
        </h1>
        <p className="text-text-secondary mt-1 text-sm">
          Connect a WhatsApp Business API provider to send automated receipts, reminders, and alerts.
        </p>
      </div>

      {/* Connection Status Banner */}
      <div className={`flex items-center gap-4 p-4 rounded-2xl border mb-8 ${
        testStatus === 'success' ? 'bg-success-bg border-success/30' : 
        testStatus === 'error' ? 'bg-danger-bg border-danger/30' : 
        'bg-card border-border'
      }`}>
        <div className={`h-12 w-12 rounded-xl flex items-center justify-center text-text-primary text-xl ${
          testStatus === 'success' ? 'bg-success-bg text-success' :
          testStatus === 'error'  ? 'bg-danger-bg text-danger' :
          'bg-card text-text-secondary'
        }`}>
          {testStatus === 'success' ? <CheckCircle size={24} /> : testStatus === 'error' ? <XCircle size={24} /> : <Radio size={24} />}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <p className="text-base font-semibold text-text-primary">
              {testStatus === 'success' ? 'WhatsApp Connected'  :
               testStatus === 'error'  ? 'Connection Failed'   :
               testStatus === 'testing'? 'Testing connection...' :
               'WhatsApp Not Tested'}
            </p>
            <SuperadminBadge variant={testStatus === 'success' ? 'success' : testStatus === 'error' ? 'danger' : 'default'}>
              {testStatus === 'success' ? 'Connected' : testStatus === 'error' ? 'Disconnected' : 'Unknown'}
            </SuperadminBadge>
          </div>
          <p className="text-xs text-text-secondary mt-0.5">
            {testStatus === 'success'
              ? `Provider: ${selectedProvider.label} Â· Test message sent to ${senderPhone}`
              : testStatus === 'error'
              ? 'Check your API key and try again. Ensure the number is registered on WhatsApp Business.'
              : 'Click "Test Connection" to verify your WhatsApp setup.'}
          </p>
        </div>
        {testStatus !== 'testing' && testStatus === 'success' && (
          <p className="text-xs text-text-secondary">Last tested: just now</p>
        )}
      </div>

      {/* Usage Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        <SuperadminKpiCard title="Sent This Month" value={stats.total} icon={Send} subtitle="All messages" />
        <SuperadminKpiCard title="Delivered" value={stats.deliveredCount} icon={CheckCircle} trend="up" trendLabel={`${stats.deliveryRate}% rate`} />
        <SuperadminKpiCard title="Failed" value={stats.failedCount} icon={XCircle} trend={stats.failedCount > 0 ? 'down' : 'neutral'} trendLabel="Failed deliveries" />
        <SuperadminKpiCard title="Est. Cost" value="â‚¹18.50" icon={Banknote} subtitle="~â‚¹0.18 per msg" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Integration Config Card */}
        <SuperadminCard>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap size={18} className="text-primary" /> API Configuration
            </CardTitle>
            <CardDescription>Connect your WhatsApp Business API provider.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="space-y-2">
              <SuperadminLabel>API Provider</SuperadminLabel>
              <div className="grid grid-cols-2 gap-2">
                {SUPERADMIN_SYSTEM_WHATSAPP_PROVIDERS.map(( p ) => (
                  <button
                    key={p.id}
                    id={`provider-${p.id}`}
                    onClick={() => setProvider(p.id)}
                    className={`flex items-center gap-2.5 p-3 rounded-xl border text-left transition-all ${
                      provider === p.id
                        ? 'border-primary/40 bg-primary/10 text-primary'
                        : 'border-border hover:border-primary/25 text-text-secondary hover:text-text-primary'
                    }`}
                  >
                    <span className="text-xl">{PROVIDER_LOGOS[p.id]}</span>
                    <span className="text-sm font-semibold">{p.label}</span>
                    {provider === p.id && <CheckCircle size={14} className="ml-auto text-primary" />}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <SuperadminLabel htmlFor="whatsapp-api-key">API Key</SuperadminLabel>
              <div className="relative">
                <SuperadminInput
                  id="whatsapp-api-key"
                  type={showApiKey ? 'text' : 'password'}
                  value={apiKey}
                  onChange={e => setApiKey(e.target.value)}
                  placeholder="Enter your API key"
                  className="pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowApiKey(s => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary hover:text-text-primary"
                >
                  {showApiKey ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {selectedProvider.requiresSecret && (
              <div className="space-y-2">
                <SuperadminLabel htmlFor="whatsapp-api-secret">API Secret</SuperadminLabel>
                <div className="relative">
                  <SuperadminInput
                    id="whatsapp-api-secret"
                    type={showSecret ? 'text' : 'password'}
                    value={apiSecret}
                    onChange={e => setApiSecret(e.target.value)}
                    placeholder="Enter your API secret"
                    className="pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowSecret(s => !s)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary hover:text-text-primary"
                  >
                    {showSecret ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
            )}

            <div className="space-y-2">
              <SuperadminLabel htmlFor="sender-phone">Sender WhatsApp Number</SuperadminLabel>
              <div className="relative">
                <Phone size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" />
                <SuperadminInput
                  id="sender-phone"
                  type="tel"
                  value={senderPhone}
                  onChange={e => setSenderPhone(e.target.value)}
                  placeholder="+91 9000000000"
                  className="pl-9"
                />
              </div>
              <p className="text-xs text-text-secondary">Must be your registered WhatsApp Business number</p>
            </div>

            <div className="space-y-2">
              <SuperadminLabel>Inbound Webhook URL</SuperadminLabel>
              <div className="flex items-center gap-2">
                <div className="flex-1 px-3 py-2 rounded-lg bg-input border border-border text-xs font-mono text-text-secondary truncate">
                  {webhookUrl}
                </div>
                <SuperadminButton id="copy-webhook-btn" variant="ghost" size="sm" onClick={handleCopyWebhook}>
                  {copiedUrl ? <CheckCircle size={14} className="text-success" /> : <Copy size={14} />}
                </SuperadminButton>
              </div>
              <p className="text-xs text-text-secondary">Paste this URL in your provider's webhook settings.</p>
            </div>
          </CardContent>
          <CardFooter>
            <SuperadminButton
              id="test-whatsapp-connection-btn"
              variant="ghost"
              onClick={handleTestConnection}
              disabled={testStatus === 'testing'}
            >
              {testStatus === 'testing' ? <><Loader2 size={16} className="animate-spin mr-2" /> Testing...</> : 'ðŸ”Œ Test Connection'}
            </SuperadminButton>
            <SuperadminButton id="save-whatsapp-config-btn" variant="primary">
              ðŸ’¾ Save Configuration
            </SuperadminButton>
          </CardFooter>
        </SuperadminCard>

        {/* Trigger Events */}
        <SuperadminCard>
          <CardHeader>
            <CardTitle>Auto-Trigger Events</CardTitle>
            <CardDescription>Messages sent automatically when these events occur.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { id: 'trigger-welcome',  label: 'Welcome Message',      desc: 'When a new student is admitted',             enabled: true  },
                { id: 'trigger-receipt',  label: 'Fee Receipt',           desc: 'When a payment is recorded',                 enabled: true  },
                { id: 'trigger-renewal',  label: 'Renewal Reminder',      desc: '3 days before subscription expires',         enabled: true  },
                { id: 'trigger-due',      label: 'Fee Due Alert',         desc: 'On due date + 1 day if unpaid',              enabled: true  },
                { id: 'trigger-suspend',  label: 'Auto-Suspend Notice',   desc: 'When seat is auto-suspended',                enabled: false },
                { id: 'trigger-waitlist', label: 'Waitlist Notification', desc: 'When seat becomes available for waitlisted', enabled: true  },
                { id: 'trigger-absentee', label: 'Absentee Alert',        desc: 'When student absent for 3+ days',            enabled: false },
              ].map(( event ) => (
                <div key={event.id} className="flex items-center justify-between p-3 rounded-xl bg-card border border-border/50">
                  <div>
                    <p className="text-sm font-medium text-text-primary">{event.label}</p>
                    <p className="text-xs text-text-secondary">{event.desc}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <SuperadminBadge variant={event.enabled ? 'success' : 'default'}>
                      {event.enabled ? 'ON' : 'OFF'}
                    </SuperadminBadge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </SuperadminCard>
      </div>

      {/* Message Logs */}
      <SuperadminCard>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 size={18} className="text-primary" /> Recent Message Logs
          </CardTitle>
          <CardDescription>Last 30 days of outbound WhatsApp messages.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <TableToolbar search={table.searchTerm} onSearch={table.setSearchTerm} />
      <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-text-secondary text-xs uppercase tracking-wide">
                  <th className="text-left py-3 pr-4">Recipient</th>
                  <th className="text-left py-3 pr-4">Message Type</th>
                  <th className="text-left py-3 pr-4">Template</th>
                  <th className="text-left py-3 pr-4">Status</th>
                  <th className="text-left py-3">Sent At</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/30">
                  {table.paginatedData.map((log) => {
                  const cfg  = SUPERADMIN_SYSTEM_WHATSAPP_STATUS_CFG[log.status];
                  const Icon = cfg.icon;
                  return (
                    <tr key={log.id} className="hover:bg-card transition-colors">
                      <td className="py-3 pr-4 font-mono text-sm text-text-primary">{log.to}</td>
                      <td className="py-3 pr-4 text-text-primary">{log.type}</td>
                      <td className="py-3 pr-4">
                        <code className="text-xs text-text-secondary bg-input px-1.5 py-0.5 rounded">
                          {log.template}
                        </code>
                      </td>
                      <td className="py-3 pr-4">
                        <SuperadminBadge variant={cfg.variant}>
                          <Icon size={10} className="inline mr-1" /> {log.status}
                        </SuperadminBadge>
                      </td>
                      <td className="py-3 text-xs text-text-secondary">{log.sentAt}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
      <TablePagination 
        page={table.page} limit={table.limit} totalItems={table.totalItems} 
        onPageChange={table.setPage} onLimitChange={table.setLimit} 
      />
          </div>
        </CardContent>
      </SuperadminCard>
    </div>
  );
}
