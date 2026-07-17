# Superadmin Finance — Features & Architecture

## Overview
The Superadmin Finance module is a comprehensive suite for managing all financial aspects of the library network. It handles fee collection, invoicing, payment promises, auto-suspensions, refunds, and trust score calculation based on financial behavior.

## Core Modules

1. **Payment Promises** (`/payment-promises`)
   - Allows tracking students who have promised to pay on a future date.
   - Automatically calculates overdue days and penalties if the promise is broken.
   - Integrates with the Trust Score system (extending a promise decreases the score).

2. **Auto-Suspend** (`/auto-suspend`)
   - Manages the automated policy that revokes branch access for students who have unpaid dues beyond the grace period.
   - Provides a dashboard for viewing suspended students and executing manual overrides.

3. **Trust Score** (`/trust-score`)
   - An aggregated metric determining how reliable a student is regarding payments.
   - Highly reliable students receive automated leniency on late fees.

## Data Flow & Architecture
- All finance interfaces adhere strictly to the shared `SuperadminFinanceTypes.ts`.
- Complex multi-step operations (like collecting a fee) use Zod + React Hook Form.
- Event handlers and input bindings are strictly typed using standard React definitions (`React.ChangeEvent`).
