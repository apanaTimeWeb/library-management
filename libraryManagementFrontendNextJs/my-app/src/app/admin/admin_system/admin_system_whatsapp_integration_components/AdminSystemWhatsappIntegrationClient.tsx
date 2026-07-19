'use client';
// RESPONSIBILITY: Renders the AdminSystemWhatsappIntegrationClient component.
import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/app/admin/admin_system/admin_system_components/AdminSystemCard/AdminSystemCard';
import { Button } from '@/app/admin/admin_system/admin_system_components/AdminSystemButton/AdminSystemButton';
import { Badge } from '@/app/admin/admin_system/admin_system_components/AdminSystemBadge/AdminSystemBadge';
import { Input } from '@/app/admin/admin_system/admin_system_components/AdminSystemInput/AdminSystemInput';
import { Label } from '@/app/admin/admin_system/admin_system_components/AdminSystemLabel/AdminSystemLabel';
import { KpiCard } from '@/app/admin/admin_system/admin_system_components/AdminSystemKpiCard/AdminSystemKpiCard';
import {
  MessageSquare, ChevronRight, Eye, EyeOff, Copy, CheckCircle,
  XCircle, Phone, Zap, BarChart3, Clock, Loader2
} from 'lucide-react';
import { useAdminSystemWhatsappIntegration } from '@/app/admin/admin_system/admin_system_whatsapp_integration_hooks/useAdminSystemWhatsappIntegration';
import { TablePagination } from '@/components/ui/table-pagination';
import { TableToolbar } from '@/components/ui/table-toolbar';
import { useClientTable } from '@/components/ui/use-client-table';

const STATUS_CFG = {
  delivered: { variant: 'success' as const, icon: CheckCircle },
  failed: { variant: 'danger' as const, icon: XCircle },
  pending: { variant: 'warning' as const, icon: Clock },
};

export function AdminSystemWhatsappIntegrationClient() {

  const {
    provider, setProvider,
    apiKey, setApiKey,
    apiSecret, setApiSecret,
    senderPhone, setSenderPhone,
    showApiKey, setShowApiKey,
    showSecret, setShowSecret,
    testStatus, handleTestConnection,
    copiedUrl, handleCopyWebhook, webhookUrl,
    activeProvider,
    deliveredCount, failedCount, deliveryRate,
    providers, logs
  } = useAdminSystemWhatsappIntegration();

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
    const table = useClientTable(logs, 10);
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
        testStatus === 'success'
          ? 'bg-success/10 border-success/25'
          : testStatus === 'error'
          ? 'bg-danger-bg/10 border-danger/20'
          : 'bg-card border-border'
      }`}>
        <div className={`h-12 w-12 rounded-xl flex items-center justify-center text-text-primary text-xl ${
          testStatus === 'success' ? 'bg-success/20' :
          testStatus === 'error' ? 'bg-danger-bg/30' :
          'bg-card'
        }`}>
          {testStatus === 'success' ? '✅' : testStatus === 'error' ? 'âŒ' : 'ðŸ“¡'}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <p className="text-base font-semibold text-text-primary">
              {testStatus === 'success' ? 'WhatsApp Connected' :
               testStatus === 'error' ? 'Connection Failed' :
               testStatus === 'testing' ? 'Testing connection...' :
               'WhatsApp Not Tested'}
            </p>
            <Badge variant={testStatus === 'success' ? 'success' : testStatus === 'error' ? 'danger' : 'outline'}>
              {testStatus === 'success' ? 'Connected' : testStatus === 'error' ? 'Disconnected' : 'Unknown'}
            </Badge>
          </div>
          <p className="text-xs text-text-secondary mt-0.5">
            {testStatus === 'success'
              ? `Provider: ${activeProvider.label} Â· Test message sent to ${senderPhone}`
              : testStatus === 'error'
              ? 'Check your API key and try again. Ensure the number is registered on WhatsApp Business.'
              : 'Click "Test Connection" to verify your WhatsApp setup.'}
          </p>
        </div>
        {testStatus !== 'testing' && (
          <p className="text-xs text-text-secondary">
            {testStatus === 'success' ? 'Last tested: just now' : ''}
          </p>
        )}
      </div>

      {/* Usage Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        <KpiCard title="Sent This Month" value={logs.length} icon="ðŸ“¤" subtitle="All messages" />
        <KpiCard title="Delivered" value={deliveredCount} icon="✅" trend="up" trendLabel={`${deliveryRate}% rate`} />
        <KpiCard title="Failed" value={failedCount} icon="âŒ" trend={failedCount > 0 ? 'down' : 'neutral'} trendLabel="Failed deliveries" />
        <KpiCard title="Est. Cost" value="₹18.50" icon="ðŸ’¸" subtitle="~₹0.18 per msg" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Integration Config Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap size={18} className="text-primary" /> API Configuration
            </CardTitle>
            <CardDescription>Connect your WhatsApp Business API provider.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            {/* Provider selector */}
            <div className="space-y-2">
              <Label>API Provider</Label>
              <div className="grid grid-cols-2 gap-2">
                {providers.map(p => (
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
                    <span className="text-xl">{p.logo}</span>
                    <span className="text-sm font-semibold">{p.label}</span>
                    {provider === p.id && <CheckCircle size={14} className="ml-auto text-primary" />}
                  </button>
                ))}
              </div>
            </div>

            {/* API Key */}
            <div className="space-y-2">
              <Label htmlFor="whatsapp-api-key">API Key</Label>
              <div className="relative">
                <Input
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

            {/* API Secret (conditional) */}
            {activeProvider.requiresSecret && (
              <div className="space-y-2">
                <Label htmlFor="whatsapp-api-secret">API Secret</Label>
                <div className="relative">
                  <Input
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

            {/* Sender Phone */}
            <div className="space-y-2">
              <Label htmlFor="sender-phone">Sender WhatsApp Number</Label>
              <div className="relative">
                <Phone size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" />
                <Input
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

            {/* Webhook URL (read-only) */}
            <div className="space-y-2">
              <Label>Inbound Webhook URL</Label>
              <div className="flex items-center gap-2">
                <div className="flex-1 px-3 py-2 rounded-lg bg-input border border-border text-xs font-mono text-text-secondary truncate">
                  {webhookUrl}
                </div>
                <Button
                  id="copy-webhook-btn"
                  variant="ghost"
                  size="sm"
                  onClick={handleCopyWebhook}
                >
                  {copiedUrl ? <CheckCircle size={14} className="text-success" /> : <Copy size={14} />}
                </Button>
              </div>
              {/* eslint-disable-next-line react/no-unescaped-entities */}
              <p className="text-xs text-text-secondary">Paste this URL in your provider's webhook settings to receive inbound messages.</p>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              id="test-whatsapp-connection-btn"
              variant="ghost"
              onClick={handleTestConnection}
              disabled={testStatus === 'testing'}
            >
              {testStatus === 'testing'
                ? <><Loader2 size={16} className="animate-spin mr-1" /> Testing...</>
                : 'ðŸ”Œ Test Connection'}
            </Button>
            <Button id="save-whatsapp-config-btn" variant="primary">
              ðŸ’¾ Save Configuration
            </Button>
          </CardFooter>
        </Card>

        {/* Trigger Events */}
        <Card>
          <CardHeader>
            <CardTitle>Auto-Trigger Events</CardTitle>
            <CardDescription>Messages sent automatically when these events occur.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { id: 'trigger-welcome', label: 'Welcome Message', desc: 'When a new student is admitted', enabled: true },
                { id: 'trigger-receipt', label: 'Fee Receipt', desc: 'When a payment is recorded', enabled: true },
                { id: 'trigger-renewal', label: 'Renewal Reminder', desc: '3 days before subscription expires', enabled: true },
                { id: 'trigger-due', label: 'Fee Due Alert', desc: 'On due date + 1 day if unpaid', enabled: true },
                { id: 'trigger-suspend', label: 'Auto-Suspend Notice', desc: 'When seat is auto-suspended', enabled: false },
                { id: 'trigger-waitlist', label: 'Waitlist Notification', desc: 'When seat becomes available for waitlisted', enabled: true },
                { id: 'trigger-absentee', label: 'Absentee Alert', desc: 'When student absent for 3+ days', enabled: false },
              ].map(event => (
                <div key={event.id} className="flex items-center justify-between p-3 rounded-xl bg-card border border-border/50">
                  <div>
                    <p className="text-sm font-medium text-text-primary">{event.label}</p>
                    <p className="text-xs text-text-secondary">{event.desc}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <Badge variant={event.enabled ? 'success' : 'outline'}>
                      {event.enabled ? 'ON' : 'OFF'}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Message Logs */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 size={18} className="text-primary" /> Recent Message Logs
          </CardTitle>
          <CardDescription>Last 30 days of outbound WhatsApp messages.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
        <TableToolbar 
          search={table.searchTerm} 
          onSearch={table.setSearchTerm} 
        />
      </div>
      <div className="overflow-x-auto">
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
                {table.paginatedData.map(log => {
                  const cfg = STATUS_CFG[log.status as keyof typeof STATUS_CFG];
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
                        <Badge variant={cfg.variant}>
                          <Icon size={10} className="mr-1" /> {log.status}
                        </Badge>
                      </td>
                      <td className="py-3 text-xs text-text-secondary">{log.sentAt}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div> 
      <TablePagination 
        totalItems={table.totalItems} 
        page={table.page} 
        limit={table.limit} 
        onPageChange={table.setPage} 
      />
          <TablePagination
            page={page}
            limit={limit}
            totalItems={providers.length}
            onPageChange={setPage}
            onLimitChange={setLimit}
          />
        </CardContent>
      </Card>
    </div>
  );
}
