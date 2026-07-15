# Admin - Staff Users Feature

## Overview
This module handles the management of branch-level staff users by the branch admin. It allows admins to onboard new managers or librarians, assign roles, and manage their access.

## Folder Structure
- `constants/` - Contains `users.constants.ts` for default values and error messages.
- `controllers/` - Split into CQRS micro-controllers (`create`, `delete`, `get-all`, `get`, `update`).
- `dto/` - Request payload validation rules.
- `exceptions/` - Custom HTTP exceptions (e.g. `UserNotFoundException`).
- `interfaces/` - Return types and strict interfaces (`IUser`, `IUserListResponse`).
- `services/` - Isolated business logic for each controller.

## Endpoints
1. `GET /api/admin/staff-users/users` - Get all staff users for the admin's branch (paginated).
2. `GET /api/admin/staff-users/users/:id` - Get specific staff user.
3. `POST /api/admin/staff-users/users` - Create a new staff user.
4. `PATCH /api/admin/staff-users/users/:id` - Update a staff user's details.
5. `DELETE /api/admin/staff-users/users/:id` - Soft delete a staff user.

## Business Logic
- All operations are scoped to the Admin's `tenantId` and `branchId`.
- An Admin cannot delete or modify users outside their branch.
- Passwords must be securely hashed before saving via standard auth flow.
