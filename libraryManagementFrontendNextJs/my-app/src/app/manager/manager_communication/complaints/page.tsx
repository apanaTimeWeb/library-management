import { ManagerCommunicationErrorBoundary } from '@/app/manager/manager_communication/manager_communication_components/ManagerCommunicationErrorBoundary';
import { ManagerCommunicationComplaintsClient } from '@/app/manager/manager_communication/manager_communication_components/ManagerCommunicationComplaintsClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Complaints | Smart Library 360',
};

export default function Page() {
  return (
    <ManagerCommunicationErrorBoundary>
      <ManagerCommunicationComplaintsClient />
    </ManagerCommunicationErrorBoundary>
  );
}
