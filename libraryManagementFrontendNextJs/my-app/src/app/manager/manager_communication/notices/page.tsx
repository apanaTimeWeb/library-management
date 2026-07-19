import { ManagerCommunicationErrorBoundary } from '@/app/manager/manager_communication/manager_communication_components/ManagerCommunicationErrorBoundary';
import { ManagerCommunicationNoticesClient } from '@/app/manager/manager_communication/manager_communication_components/ManagerCommunicationNoticesClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Notices | Smart Library 360',
};

export default function Page() {
  return (
    <ManagerCommunicationErrorBoundary>
      <ManagerCommunicationNoticesClient />
    </ManagerCommunicationErrorBoundary>
  );
}
