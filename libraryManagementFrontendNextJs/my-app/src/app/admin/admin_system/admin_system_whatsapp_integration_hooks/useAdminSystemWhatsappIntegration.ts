// RESPONSIBILITY: Renders the useAdminSystemWhatsappIntegration.ts component/hook.
import { useState, useMemo, useCallback } from 'react';
import { ADMIN_SYSTEM_WHATSAPP_PROVIDERS, ADMIN_SYSTEM_WHATSAPP_MESSAGE_LOGS } from '@/app/admin/admin_system/admin_system_data/AdminSystemMockData2';

export type TestStatus = 'idle' | 'testing' | 'success' | 'error';

export function useAdminSystemWhatsappIntegration() {
  const [provider, setProvider] = useState('wati');
  const [apiKey, setApiKey] = useState('sk_live_wt_********************');
  const [apiSecret, setApiSecret] = useState('');
  const [senderPhone, setSenderPhone] = useState('+91 9000000000');
  const [showApiKey, setShowApiKey] = useState(false);
  const [showSecret, setShowSecret] = useState(false);
  const [testStatus, setTestStatus] = useState<TestStatus>('idle');
  const [copiedUrl, setCopiedUrl] = useState(false);

  const webhookUrl = 'https://api.smartlibrary360.com/webhooks/whatsapp/inbound';

  const activeProvider = useMemo(() => ADMIN_SYSTEM_WHATSAPP_PROVIDERS.find(p => p.id === provider)!, [provider]);

  const deliveredCount = useMemo(() => ADMIN_SYSTEM_WHATSAPP_MESSAGE_LOGS.filter(l => l.status === 'delivered').length, []);
  const failedCount = useMemo(() => ADMIN_SYSTEM_WHATSAPP_MESSAGE_LOGS.filter(l => l.status === 'failed').length, []);
  const pendingCount = useMemo(() => ADMIN_SYSTEM_WHATSAPP_MESSAGE_LOGS.filter(l => l.status === 'pending').length, []);
  const deliveryRate = useMemo(() => Math.round((deliveredCount / ADMIN_SYSTEM_WHATSAPP_MESSAGE_LOGS.length) * 100), [deliveredCount]);

  const handleTestConnection = useCallback(() => {
    setTestStatus('testing');
    setTimeout(() => {
      setTestStatus(Math.random() > 0.2 ? 'success' : 'error');
    }, 2000);
  }, []);

  const handleCopyWebhook = useCallback(() => {
    navigator.clipboard.writeText(webhookUrl).catch(() => {});
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2000);
  }, [webhookUrl]);

  return {
    provider, setProvider,
    apiKey, setApiKey,
    apiSecret, setApiSecret,
    senderPhone, setSenderPhone,
    showApiKey, setShowApiKey,
    showSecret, setShowSecret,
    testStatus, handleTestConnection,
    copiedUrl, handleCopyWebhook, webhookUrl,
    activeProvider,
    deliveredCount, failedCount, pendingCount, deliveryRate,
    providers: ADMIN_SYSTEM_WHATSAPP_PROVIDERS,
    logs: ADMIN_SYSTEM_WHATSAPP_MESSAGE_LOGS
  };
}
