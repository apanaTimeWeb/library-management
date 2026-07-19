import { ManagerCommunicationErrorBoundary } from '@/app/manager/manager_communication/manager_communication_components/ManagerCommunicationErrorBoundary';
import { ManagerCommunicationWhatsAppLogsClient } from '@/app/manager/manager_communication/manager_communication_components/ManagerCommunicationWhatsAppLogsClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'WhatsApp Logs | Smart Library 360',
};

export default function Page() {
  return (
    <ManagerCommunicationErrorBoundary>
      <ManagerCommunicationWhatsAppLogsClient />
    </ManagerCommunicationErrorBoundary>
  );
}
