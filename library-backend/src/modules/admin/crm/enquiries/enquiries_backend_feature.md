# Admin - CRM Enquiries Feature

## Overview
This module handles all Enquiry management for branch admins. Admins can view incoming enquiries, update their statuses, and add follow-up notes to convert leads into students.

## Folder Structure
- `constants/` - Constants like `DEFAULT_BRANCH_ID`
- `controllers/` - Micro-modularized controllers (`get-all`, `get-by-id`, `update-status`, `add-follow-up`)
- `dto/` - Validation logic (`PaginationDto`, `UpdateEnquiryStatusDto`)
- `exceptions/` - Custom exceptions (`EnquiryNotFoundException`)
- `interfaces/` - Type definitions
- `services/` - Business logic matching the controllers

## Endpoints
1. `GET /api/admin/crm/enquiries` - List all enquiries for the admin's branch (paginated)
2. `GET /api/admin/crm/enquiries/:id` - Get specific enquiry details
3. `PATCH /api/admin/crm/enquiries/:id/status` - Update status (e.g., new -> contacted -> converted)
4. `POST /api/admin/crm/enquiries/:id/follow-ups` - Add a follow-up interaction note

## Business Logic
- Admins can ONLY see enquiries associated with their assigned `branchId`.
- Converting an enquiry usually triggers a downstream event to provision a student account.
- Follow-ups must update the `lastFollowUpDate` on the main Enquiry entity.
