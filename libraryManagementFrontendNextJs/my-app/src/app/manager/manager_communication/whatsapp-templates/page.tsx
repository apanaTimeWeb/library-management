import { ManagerCommunicationErrorBoundary } from '@/app/manager/manager_communication/manager_communication_components/ManagerCommunicationErrorBoundary';
import { ManagerCommunicationWhatsAppTemplatesClient } from '@/app/manager/manager_communication/manager_communication_components/ManagerCommunicationWhatsAppTemplatesClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'WhatsApp Templates | Smart Library 360',
};

export default function Page() {
  return (
    <ManagerCommunicationErrorBoundary>
      <ManagerCommunicationWhatsAppTemplatesClient />
    </ManagerCommunicationErrorBoundary>
  );
}
