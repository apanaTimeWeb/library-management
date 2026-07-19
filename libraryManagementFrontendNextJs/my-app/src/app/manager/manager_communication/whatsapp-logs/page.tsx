import { ManagerCommunicationErrorBoundary } from '@/app/manager/manager_communication/manager_communication_components/ManagerCommunicationErrorBoundary';
import { ManagerCommunicationWhatsappLogsClient } from '@/app/manager/manager_communication/manager_communication_components/ManagerCommunicationWhatsappLogsClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'WhatsApp Logs | Smart Library 360',
};

export default function Page() {
  return (
    <ManagerCommunicationErrorBoundary>
      <ManagerCommunicationWhatsappLogsClient />
    </ManagerCommunicationErrorBoundary>
  );
}
