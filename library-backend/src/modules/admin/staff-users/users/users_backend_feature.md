# Admin Staff Users Module

This module manages the staff users (system administrators, branch managers, etc.) for the Admin dashboard.

It is strictly micro-modularized following the Enterprise-grade architecture.

**Endpoints:**
- `GET /api/admin/staff-users/users`: Get all staff users
- `GET /api/admin/staff-users/users/:id`: Get a specific staff user
- `POST /api/admin/staff-users/users`: Create a new staff user
- `PATCH /api/admin/staff-users/users/:id`: Update a staff user
- `DELETE /api/admin/staff-users/users/:id`: Soft delete a staff user
