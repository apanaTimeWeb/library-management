# Superadmin Theme Contract

This document outlines the CSS variables that the `superadmin` module (and all its sub-modules) depends on.
These variables must be defined in the global CSS (e.g., `globals.css` or `superadmin.css`) and mapped in the Tailwind config to ensure the module remains portable and theme-independent, as per Rule 4 of the frontend guidelines.

## Required CSS Variables

### Backgrounds
- `--bg-page`: Main page background
- `--bg-card`: Card, panel, and data-table backgrounds
- `--bg-sidebar`: Sidebar navigation background
- `--bg-header`: Top app header background
- `--bg-input`: Input field background

### Borders
- `--border`: Standard border color
- `--border-focus`: Active input border focus color

### Typography
- `--text-primary`: Primary text color
- `--text-secondary`: Secondary text, labels, and captions
- `--text-disabled`: Disabled text color

### Brand & Status Colors
- `--primary`: Main brand color
- `--primary-hover`: Main brand color on hover
- `--primary-subtle`: Subtle background for active states or highlighted rows
- `--success`: Success status text/icon color
- `--success-bg`: Success status background color
- `--warning`: Warning status text/icon color
- `--warning-bg`: Warning status background color
- `--danger`: Danger/Error status text/icon color
- `--danger-bg`: Danger/Error status background color
- `--info`: Info/Neutral status text/icon color
- `--info-bg`: Info/Neutral status background color
- `--purple`: Secondary brand color
- `--purple-bg`: Secondary brand background color

## Tailwind v4 Implementation Note
These variables are mapped via the `@theme` directive in `globals.css` to enable standard Tailwind utility classes (e.g., `bg-card`, `text-primary`, `bg-success-bg`). Under no circumstances should arbitrary bracket notation (e.g., `bg-[var(--bg-card)]`) be used in the JSX of this module.
