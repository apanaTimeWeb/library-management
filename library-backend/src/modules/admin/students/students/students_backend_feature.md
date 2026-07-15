# Admin Students Architecture

This module handles student operations for the `admin` domain in the Library Management System.

## Module Structure

The module follows a strict feature-sliced and micro-modularized architecture.

### Controllers & Services (`/controllers` & `/services`)
1. **Get All**: (`get-all-students.controller.ts`, `get-all-students.service.ts`)
2. **Get Single**: (`get-student.controller.ts`, `get-student.service.ts`)
3. **Create**: (`create-student.controller.ts`, `create-student.service.ts`)
4. **Update**: (`update-student.controller.ts`, `update-student.service.ts`)
5. **Delete**: (`delete-student.controller.ts`, `delete-student.service.ts`)

### Centralized Definitions
- `dtos/create-student.dto.ts`: Strict payload validation for creation.
- `dtos/update-student.dto.ts`: Strict payload validation using `PartialType`.
- `interfaces/students.interfaces.ts`: Defines `StudentListItem` and `StudentDetailItem`.
- `constants/students.constants.ts`: Contains default testing branch configurations.

## Security Features
- **Zero Trust Branch Isolation**: Operations strictly pass and filter by the `branchId` extracted from the JWT.
- **DTO Validation**: Prevent malformed or unauthorized data structures from ever reaching the service layer.
- **RBAC**: `@Roles('superadmin', 'admin', 'manager')` explicitly whitelists access at the controller layer.
