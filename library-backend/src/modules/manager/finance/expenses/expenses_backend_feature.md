# Manager Finance Expenses Architecture

This module handles the retrieval of expenses for the `manager` domain in the Library Management System.

## Module Structure

The module follows a strict feature-sliced and micro-modularized architecture.

### Controllers (`/controllers`)
- `get-all-expenses.controller.ts`: Handles `GET /`. Retrieves all expenses explicitly scoped to the manager's `branchId`.

### Services (`/services`)
- `get-all-expenses.service.ts`: Houses the TypeORM database logic for fetching branch-scoped expenses and mapping them to `ExpenseListItem`.

### Centralized Definitions
- `constants/expenses.constants.ts`: Stores default branch IDs and generic constants.
- `interfaces/expenses.interfaces.ts`: Defines the `ExpenseListItem` shape.

## Security Features
- **Zero Trust Branch Isolation**: Operations strictly pass and filter by the `branchId` extracted from the JWT.
