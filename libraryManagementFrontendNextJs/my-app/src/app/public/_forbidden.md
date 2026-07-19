# Public Module Forbidden Boundaries

1. **NO DATA MUTATION**: The public module is strictly for viewing (Landing, Pricing, About). Do not write any API calls that POST/PUT/DELETE data from the public module.
2. **NO AUTH REQUIRED**: Do not add any logic that requires a token or session in this module.
3. **NO DIRECT DB ACCESS**: Even if server components are used, never access the database directly. Use the `/lib/api.ts` layer if necessary, but prefer static data for public pages.
