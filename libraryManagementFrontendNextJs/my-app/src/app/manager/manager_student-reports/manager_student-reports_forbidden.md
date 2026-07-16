# Forbidden Patterns in Manager Student Reports

- **Do NOT** use `useState` for API data; strictly use `manager_student_reports_store.ts` (Zustand).
- **Do NOT** put client side logic or hooks in `page.tsx`. `page.tsx` must be a Server Component.
- **Do NOT** fetch API data inline within components. Use `useStudentReports.ts`.
- **Do NOT** use `recharts` for data visualization. Use `react-apexcharts`.
- **Do NOT** use `any` types for data; always type API responses.
