# Forbidden Patterns in Manager Documents

- **Do NOT** use `useState` for API data; strictly use `manager_documents_store.ts` (Zustand).
- **Do NOT** put client side logic or hooks in `page.tsx`. `page.tsx` must be a Server Component.
- **Do NOT** fetch API data inline within components. Use `useDocuments.ts`.
- **Do NOT** use `any` types for data; always type API responses.
