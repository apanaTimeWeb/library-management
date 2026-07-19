// RESPONSIBILITY: Component or Page.
import { AuthRoute } from '@/app/auth/auth_shared_components/AuthRoute';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return <AuthRoute>{children}</AuthRoute>;
}
