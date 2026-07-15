# Admin CRM Enquiries Architecture

This module handles CRM enquiry operations for the `admin` domain in the Library Management System.

## Module Structure

The module follows a strict feature-sliced and micro-modularized architecture.

### Controllers & Services (`/controllers` & `/services`)
1. **Get All**: (`get-all-enquiries.controller.ts`, `get-all-enquiries.service.ts`)
2. **Get Single**: (`get-enquiry.controller.ts`, `get-enquiry.service.ts`)
3. **Update Status**: (`update-enquiry-status.controller.ts`, `update-enquiry-status.service.ts`)
4. **Add Follow-Up**: (`add-follow-up.controller.ts`, `add-follow-up.service.ts`)

### Centralized Definitions
- `dtos/update-enquiry-status.dto.ts`: Strict payload validation. The status must be one of `new`, `visited`, `interested`, `converted`, `lost`.
- `dtos/add-follow-up.dto.ts`: Validates dates and remark structures.
- `interfaces/enquiries.interfaces.ts`: Defines `EnquiryBase` and `EnquiryFollowUp`.
- `constants/enquiries.constants.ts`: Shared constants.

## Security Features
- **DTO Validation**: Prevent malformed statuses and untyped payloads from entering the database.
- **RBAC**: `@Roles('superadmin', 'admin')` restricts access appropriately at the controller layer.
