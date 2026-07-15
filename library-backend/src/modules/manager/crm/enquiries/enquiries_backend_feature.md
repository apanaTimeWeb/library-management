# Manager CRM Enquiries Architecture

This module handles the CRM pipeline operations for prospective students under the `manager` domain in the Library Management System.

## Module Structure

The module follows a strict feature-sliced and micro-modularized architecture.

### Controllers (`/controllers`)
- `get-all-enquiries.controller.ts`: Handles `GET /`. Retrieves all branch-scoped enquiries.
- `get-enquiry.controller.ts`: Handles `GET /:id`. Retrieves a single enquiry.
- `update-enquiry-status.controller.ts`: Handles `PATCH /:id/status`. Updates the CRM stage (`new`, `visited`, `interested`, `converted`, `lost`).
- `add-follow-up.controller.ts`: Handles `POST /:id/follow-ups`. Appends a follow-up remark to an existing enquiry.

### Services (`/services`)
Each controller has exactly one corresponding service file.
- `get-all-enquiries.service.ts`
- `get-enquiry.service.ts`
- `update-enquiry-status.service.ts`
- `add-follow-up.service.ts`

### Centralized Definitions
- `constants/enquiries.constants.ts`: Defines `ENQUIRY_STATUSES` to ensure uniform pipeline stages.
- `exceptions/enquiries.exceptions.ts`: Defines `EnquiryNotFoundException`.
- `dto/update-enquiry-status.dto.ts` & `add-follow-up.dto.ts`: Replaces raw interface objects to strictly validate payload bodies via `class-validator`.

## Security Features
- **Zero Trust Branch Isolation**: FIXED. Previously, `enquiries.service.ts` queried `Enquiry` globally. All operations now explicitly pass and filter by `branchId` extracted from the JWT.
- **DTO Validation**: Enforces strict payload structure (e.g. valid `status` strings).
