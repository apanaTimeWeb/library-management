import { EngagementRoute } from '@/app/superadmin/superadmin_engagement/superadmin_engagement_shared_components/EngagementRoute';

export default function EngagementModuleLayout({ children }: { children: React.ReactNode }) {
  return <EngagementRoute>{children}</EngagementRoute>;
}
