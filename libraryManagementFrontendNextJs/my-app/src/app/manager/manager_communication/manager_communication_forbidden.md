# Forbidden Patterns in Manager Communication

- **Do NOT** use `useState` for API data; strictly use `manager_communication_store.ts` (Zustand).
- **Do NOT** put client side logic or hooks in `page.tsx`. `page.tsx` must be a Server Component.
- **Do NOT** fetch API data inline within components. Use `useNotices.ts` and `useComplaints.ts`.
- **Do NOT** use `any` types for data; always type API responses.
