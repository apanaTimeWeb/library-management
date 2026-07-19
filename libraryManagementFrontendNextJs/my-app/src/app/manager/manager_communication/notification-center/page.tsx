import { ManagerCommunicationErrorBoundary } from '@/app/manager/manager_communication/manager_communication_components/ManagerCommunicationErrorBoundary';
import { ManagerCommunicationNotificationCenterClient } from '@/app/manager/manager_communication/manager_communication_components/ManagerCommunicationNotificationCenterClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Notification Center | Smart Library 360',
};

export default function Page() {
  return (
    <ManagerCommunicationErrorBoundary>
      <ManagerCommunicationNotificationCenterClient />
    </ManagerCommunicationErrorBoundary>
  );
}
