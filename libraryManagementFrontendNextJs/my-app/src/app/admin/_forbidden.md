# Admin Module Forbidden Boundaries

1. **NO SUPERADMIN LOGIC**: The Admin role is restricted to a single branch. Never import or use Superadmin components, hooks, or API endpoints.
2. **NO CROSS-BRANCH DATA**: Admin components must never attempt to fetch or modify data belonging to other branches.
3. **NO GLOBAL CONFIGURATION**: Admins cannot modify global app settings or design system tokens.
