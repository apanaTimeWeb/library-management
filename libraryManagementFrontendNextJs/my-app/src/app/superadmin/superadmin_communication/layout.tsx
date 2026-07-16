import { CommunicationRoute } from '@/app/superadmin/superadmin_communication/superadmin_communication_shared_components/CommunicationRoute';

export default function CommunicationModuleLayout({ children }: { children: React.ReactNode }) {
  return <CommunicationRoute>{children}</CommunicationRoute>;
}
