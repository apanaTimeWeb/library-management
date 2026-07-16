# Public Module - Feature Architecture

This document serves as the AI-Context map for the frontend public module (`public`). It strictly follows the architectural guidelines from `frontend_development_instruction.md` to maintain Enterprise-Grade scalability.

## 1. Module Overview
The `public` module handles public-facing pages that don't require authentication. Currently, this includes the `enquiry` submodule where potential library users can submit their details.

## 2. Directory Structure & Responsibilities

- **`enquiry/`**: The primary submodule for submitting public enquiries.
  - `page.tsx`: The Next.js Server Component route entry point.
  - `public_enquiry_components/`: Contains the isolated UI components.
    - `PublicEnquiryClient.tsx`: The orchestrator that bridges UI layout with the Zustand store.
    - `PublicEnquiryForm.tsx`: Form UI using React Hook Form and Zod.
    - `PublicEnquirySuccessState.tsx`: UI shown after successful submission.
    - `PublicEnquiryHeader.tsx`, `PublicEnquiryFooter.tsx`: UI scaffolding.
  - `public_enquiry_hooks/usePublicEnquiry.ts`: Manages the form state, validation, and interacts with `public_store`.
  - `public_enquiry_types/`: Defines interfaces and Zod schemas (e.g. `PublicEnquiryValidation.ts`).
  - `public_enquiry_constants/`: Stores magic numbers or list enumerations.

- **`public_store/public_store.ts`**: The Zustand module-scoped store for all asynchronous data operations inside the public module (e.g., `submitEnquiry` loading states and error messages).
- **`public_api/public_api.ts`**: The dedicated API client for the public module. Wraps fetch calls in the standardized `ApiResponse` structure.

## 3. Key Design Patterns
- **Strict Separation of Concerns**: UI components handle DOM rendering; custom hooks orchestrate form logic; Zustand manages global async state.
- **Pure Tailwind Styling**: Components use design tokens strictly mapped to `globals.css` (e.g. `bg-page`, `text-primary`, `bg-card`). No arbitrary `.css` files.
- **Micro-Modularization**: `PublicEnquiryClient.tsx` is contained strictly within `public_enquiry_components/` so `page.tsx` remains clean as a Server Component.
