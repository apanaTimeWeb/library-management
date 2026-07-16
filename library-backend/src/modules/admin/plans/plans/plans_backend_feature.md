# Plans Module

## Responsibility
Manages library/gym subscription plans (Create, Read, Update, Delete).

## Architecture
- **CQRS-lite**: Commands (Create, Update, Delete) are separated from Queries (Get, GetAll).
- **Micro-Modularized**: Services and Controllers are single-responsibility files.

## Dependencies
- Plan Entity (`src/core/entities/plan.entity.ts`)
