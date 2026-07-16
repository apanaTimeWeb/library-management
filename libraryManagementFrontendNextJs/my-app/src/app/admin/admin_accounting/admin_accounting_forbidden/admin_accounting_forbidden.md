# admin_accounting Module — Forbidden Patterns

> **Rule 40 compliance.** Every pattern listed here is explicitly NOT allowed across all accounting sub-pages (`assets`, `daily-settlement`, `expenses`, `financial-reports`, `asset-maintenance`, `expense-categories`, `seat-gap-report`, `shift-gap-analyzer`).

## Modularization & Component Responsibilities (Rules 1, 38)
- **NEVER** keep sub-pages (`assets/page.tsx`, `daily-settlement/page.tsx`, etc.) as flat, monolithic client pages. Extract components into `admin_accounting_components/` (`Rule 1`).
- **NEVER** use generic `// RESPONSIBILITY: Entry page for the admin_accounting module.` (`Rule 38`). Each component/page must declare its exact responsibility.

## TypeScript & React Keys (Rules 27, 57, 60)
- **NEVER** use `any` type anywhere in accounting maps or AG Grid `colDefs`.
- **NEVER** use `key={index}` in lists or charts (`financial-reports/page.tsx: CATEGORY_BREAKDOWN.map((c, i)` -> forbidden). Use unique category codes (`c.categoryCode` or `c.name`).

## Form Handling & Validation (Rules 16, 48)
- **NEVER** use raw `useState` for forms with 3+ fields (`expenses/page.tsx`, `assets/page.tsx`, `asset-maintenance/page.tsx`).
- **ALWAYS** use React Hook Form + Zod schema validation.
- **ALWAYS** intercept `beforeunload` when form is modified (`Rule 48`).

## UI & Styling (Rules 4, 36, 14)
- **NEVER** use inline style properties mixed with Tailwind (`style={{ backgroundColor: 'var(--success)' }}`, `style={{ width: \${pct}%` }}`). Map variables or use standard classes (`bg-success`, `w-full`, etc.).
- **NEVER** hardcode toast messages (`toast.success('Expense recorded.')`, `'Asset added.'`). Always display `response.message` (`Rule 14`).

## Centralized URLs (Rule 11)
- **NEVER** hardcode route strings (`router.push('/admin/admin_accounting/expenses/add')`). Use `ADMIN_ROUTES` from `admin_url_config.ts`.
