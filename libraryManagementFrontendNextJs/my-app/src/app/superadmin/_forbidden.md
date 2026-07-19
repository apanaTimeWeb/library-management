# Superadmin Module Forbidden Boundaries

1. **NO MIXING ROLES**: Do not import components from `admin` or `manager` modules. Superadmin has its own shared components (`superadmin_shared_components`).
2. **NO HARDCODED BRANCHES**: Superadmin components must always be branch-agnostic and handle data across multiple branches dynamically.
3. **NO DIRECT DB ACCESS**: All data fetching must go through the typed `fetchApi` utility in `/lib/api.ts`.
