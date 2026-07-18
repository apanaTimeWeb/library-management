import { useState, useCallback, useMemo } from 'react';
import { SUPERADMIN_SYSTEM_MOCK_WHATSAPP_LOGS } from '@/app/superadmin/superadmin_system/superadmin_system_utils/SuperadminSystemMockData';
import { SuperadminSystemWhatsappTestStatus, SuperadminSystemWhatsappLog } from '@/app/superadmin/superadmin_system/superadmin_system_types/SuperadminSystemWhatsappTypes';
import { SUPERADMIN_SYSTEM_WHATSAPP_PROVIDERS } from '@/app/superadmin/superadmin_system/superadmin_system_constants/SuperadminSystemWhatsappConstants';

export function useSuperadminSystemWhatsapp() {
  const [provider, setProvider] = useState('wati');
  const [apiKey, setApiKey] = useState('sk_live_wt_********************');
  const [apiSecret, setApiSecret] = useState('');
  const [senderPhone, setSenderPhone] = useState('+91 9000000000');
  const [showApiKey, setShowApiKey] = useState(false);
  const [showSecret, setShowSecret] = useState(false);
  const [testStatus, setTestStatus] = useState<SuperadminSystemWhatsappTestStatus>('idle');
  const [copiedUrl, setCopiedUrl] = useState(false);

  const webhookUrl = 'https://api.smartlibrary360.com/webhooks/whatsapp/inbound';
  const selectedProvider = SUPERADMIN_SYSTEM_WHATSAPP_PROVIDERS.find(p => p.id === provider)!;

  const logs = SUPERADMIN_SYSTEM_MOCK_WHATSAPP_LOGS as SuperadminSystemWhatsappLog[];

  const stats = useMemo(() => {
    const deliveredCount = logs.filter(l => l.status === 'delivered').length;
    const failedCount = logs.filter(l => l.status === 'failed').length;
    const pendingCount = logs.filter(l => l.status === 'pending').length;
    const deliveryRate = logs.length ? Math.round((deliveredCount / logs.length) * 100) : 0;
    
    return {
      total: logs.length,
      deliveredCount,
      failedCount,
      pendingCount,
      deliveryRate
    };
  }, [logs]);

  const handleTestConnection = useCallback(() => {
    setTestStatus('testing');
    setTimeout(() => {
      setTestStatus(Math.random() > 0.2 ? 'success' : 'error');
    }, 2000);
  }, []);

  const handleCopyWebhook = useCallback(() => {
    if (typeof navigator !== 'undefined') {
      navigator.clipboard.writeText(webhookUrl).catch(() => {});
      setCopiedUrl(true);
      setTimeout(() => setCopiedUrl(false), 2000);
    }
  }, [webhookUrl]);

  return {
    provider,
    setProvider,
    apiKey,
    setApiKey,
    apiSecret,
    setApiSecret,
    senderPhone,
    setSenderPhone,
    showApiKey,
    setShowApiKey,
    showSecret,
    setShowSecret,
    testStatus,
    copiedUrl,
    webhookUrl,
    selectedProvider,
    logs,
    stats,
    handleTestConnection,
    handleCopyWebhook
  };
}
