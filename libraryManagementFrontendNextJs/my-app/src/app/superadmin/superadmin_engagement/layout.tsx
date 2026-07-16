import { EngagementRoute } from '@/app/superadmin/superadmin_engagement/superadmin_engagement_shared_components/SuperadminEngagementRoute';

export default function EngagementModuleLayout({ children }: { children: React.ReactNode }) {
  return <EngagementRoute>{children}</EngagementRoute>;
}
