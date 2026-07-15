# Manager Students Module Architecture

This module handles CRUD operations for Students under the `manager` domain in the Library Management System.

## Module Structure

The module follows a strict feature-sliced and micro-modularized architecture to align with `backend_development_instruction.md`.

### Controllers (`/controllers`)
- `get-all-students.controller.ts`: Handles `GET /`. Retrieves a list of all students for the manager's branch.
- `get-student.controller.ts`: Handles `GET /:id`. Retrieves a detailed profile for a specific student.
- `create-student.controller.ts`: Handles `POST /`. Registers a new student and handles associated slot/subscription assignment.
- `update-student.controller.ts`: Handles `PATCH /:id`. Updates basic student information.
- `delete-student.controller.ts`: Handles `DELETE /:id`. Soft deletes (suspends) a student.

### Services (`/services`)
Each controller has exactly one corresponding service file, ensuring single responsibility.
- `get-all-students.service.ts`
- `get-student.service.ts`
- `create-student.service.ts`
- `update-student.service.ts`
- `delete-student.service.ts`

### Centralized Definitions
- `constants/students.constants.ts`: Contains specific constants (ID_PREFIX) and standard statuses for students.
- `exceptions/students.exceptions.ts`: Specific HTTP exceptions (`StudentNotFoundException`, `BranchNotFoundException`).
- `interfaces/students.interfaces.ts`: Strict types for internal data mapping.
- `dto/create-student.dto.ts` & `update-student.dto.ts`: Strict validation layers for incoming payloads, removing all `any` usages.

## Security Features
- **Branch Isolation**: Operations inherently filter or scope creation/updates to the manager's `branchId` derived from the JWT payload.
- **DTO Validation**: Incoming data is rigorously validated using `class-validator`, adhering to the Strict Payload Validation rule.
