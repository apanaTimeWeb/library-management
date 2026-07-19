import { ManagerCommunicationErrorBoundary } from '@/app/manager/manager_communication/manager_communication_components/ManagerCommunicationErrorBoundary';
import { ManagerCommunicationWhatsappTemplatesClient } from '@/app/manager/manager_communication/manager_communication_components/ManagerCommunicationWhatsappTemplatesClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'WhatsApp Templates | Smart Library 360',
};

export default function Page() {
  return (
    <ManagerCommunicationErrorBoundary>
      <ManagerCommunicationWhatsappTemplatesClient />
    </ManagerCommunicationErrorBoundary>
  );
}
