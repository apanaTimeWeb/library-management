# Admin Module — Theme Contract

> **Rule 4 compliance:** This file lists every CSS variable the `admin` module depends on.
> When copying this module into a new project, define all variables below in `globals.css`.

## Required CSS Variables

### Core Brand
- `--primary` — Primary buttons, active nav, links
- `--primary-hover` — Primary button hover
- `--primary-subtle` — Selected row highlight, soft badge backgrounds

### Backgrounds
- `--bg-page` — Main page background
- `--bg-card` — Card, panel, table background
- `--bg-sidebar` — Sidebar background
- `--bg-header` — Top header background
- `--bg-input` — Input field background

### Borders
- `--border` — Card borders, table dividers, input borders
- `--border-focus` — Input border on focus
- `--border-glowing` — Glowing border accent

### Text
- `--text-primary` — All primary text, headings, table values
- `--text-secondary` — Labels, captions, placeholder text
- `--text-disabled` — Disabled states

### Status Colors
- `--success` / `--success-bg`
- `--warning` / `--warning-bg`
- `--danger` / `--danger-bg`
- `--info` / `--info-bg`
- `--purple` / `--purple-bg` / `--purple-light`

### Icon Backgrounds (rgba-derived)
- `--icon-bg-primary`
- `--icon-bg-success`
- `--icon-bg-warning`
- `--icon-bg-danger`
- `--icon-bg-purple`
- `--icon-bg-info`

### Chart / Overlay
- `--chart-grid-line`
- `--chart-1` through `--chart-5`
- `--chart-area-green`
- `--primary-cursor`
- `--tip-box-bg`
- `--tip-box-border`

### Skeleton Loaders
- `--skeleton-base`
- `--skeleton-highlight`

### AG Grid (defined on `:root`)
- `--ag-bg`, `--ag-fg`, `--ag-header-bg`, `--ag-header-text`
- `--ag-border`, `--ag-odd-row-bg`, `--ag-row-hover`, `--ag-font`
