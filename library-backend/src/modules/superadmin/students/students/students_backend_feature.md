# Superadmin Students Architecture

This module handles student-related CRUD operations for the `superadmin` domain.

## Module Structure

The module follows a strict feature-sliced and micro-modularized architecture.

### Controllers & Services (`/controllers` & `/services`)
1. **Get All Students**: (`get-all-students.controller.ts`, `get-all-students.service.ts`)
2. **Get Student**: (`get-student.controller.ts`, `get-student.service.ts`)
3. **Create Student**: (`create-student.controller.ts`, `create-student.service.ts`)
4. **Update Student**: (`update-student.controller.ts`, `update-student.service.ts`)
5. **Delete Student**: (`delete-student.controller.ts`, `delete-student.service.ts`)

### Centralized Definitions
- `dtos/create-student.dto.ts`: Strict payload validation for creating a student, extracting details on shift, seat, and subscriptions.
- `dtos/update-student.dto.ts`: Strict validation for updating student baseline info.
- `interfaces/students.interfaces.ts`: Defines `StudentListItem` and `StudentDetail`.

## Security Features
- **Strict Role Guards**: Inheriting from the main architecture, `@Roles('superadmin', 'admin', 'manager')` are applied where appropriate.
- **DTO Validation**: Prevent malformed parameters from hitting `studentRepo.save()` directly.
