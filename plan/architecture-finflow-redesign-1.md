---
goal: Complete product redesign from prototype to real application architecture
version: 1.0
date_created: 2026-05-26
owner: Gemini CLI
status: 'Completed'
tags: [architecture, refactoring, feature, migration]
---

# Introduction

![Status: Completed](https://img.shields.io/badge/status-Completed-brightgreen)

This implementation plan outlines the steps to transition FinFlow from a localStorage-backed frontend prototype to a full-stack, production-ready application. It incorporates the adoption of Prisma (with SQLite for local development scaling to Postgres), a streamlined Information Architecture (IA), integration of essential robust libraries (Zod, React Hook Form, React Query), and the removal of obsolete prototype features (like the Contractor Dashboard).

## 1. Requirements & Constraints

- **REQ-001**: Replace all localStorage APIs with a real backend using Prisma.
- **REQ-002**: Remove the "Contractor" persona completely and simplify the app.
- **REQ-003**: Implement a flat, authenticated routing shell under `/app/` (e.g. `/app/dashboard`, `/app/onboarding`, `/app/ledger`).
- **REQ-004**: Centralize data in a "Transaction Ledger" replacing isolated state storage.
- **REQ-005**: Add missing features: Onboarding Wizard, Forecasting Scenarios.
- **REQ-006**: Adopt standard UI validation and state libraries (Zod, React Hook Form, TanStack Query).
- **CON-001**: Must remain on Next.js 15 (App Router).
- **GUD-001**: Use standard vanilla CSS or Tailwind; migrate away from redundant charting libraries (remove Recharts, keep Chart.js).
- **PAT-001**: Follow Next.js API Routes / Server Actions pattern for interacting with the database.

## 2. Implementation Steps

### Implementation Phase 1: Cleanup & Foundation

- GOAL-001: Clean up old prototype dependencies and files, set up Prisma ORM with SQLite, and prepare the project structure.

| Task | Description | Completed | Date |
|------|-------------|-----------|------|
| TASK-001 | Remove `recharts` and install `@prisma/client`, `prisma`, `zod`, `react-hook-form`, `@tanstack/react-query`. | ✅ | 2026-05-26 |
| TASK-002 | Initialize Prisma with SQLite data provider. | ✅ | 2026-05-26 |
| TASK-003 | Delete obsolete routes (`/app/contractorDashboard`, `/app/test-sync`, `/app/dashpage`, `/app/ownerDashboard`, `/app/pay`). | ✅ | 2026-05-26 |
| TASK-004 | Delete old mock APIs (`/app/lib/api`). | ✅ | 2026-05-26 |

### Implementation Phase 2: Data Model & API

- GOAL-002: Define the complete relational database schema and expose server actions/APIs for it.

| Task | Description | Completed | Date |
|------|-------------|-----------|------|
| TASK-005 | Write `schema.prisma` with User, Property, Loan, PaymentSchedule, Milestone, Invoice, Transaction, and Scenario models. | ✅ | 2026-05-26 |
| TASK-006 | Run Prisma db push to generate the local SQLite database. | ✅ | 2026-05-26 |
| TASK-007 | Create Server Actions for onboarding and transaction logging to replace localStorage logic. | ✅ | 2026-05-26 |

### Implementation Phase 3: Rebuilding the Shell & IA

- GOAL-003: Recreate the core routes according to the new Information Architecture.

| Task | Description | Completed | Date |
|------|-------------|-----------|------|
| TASK-008 | Scaffold `/app/onboarding` for the 5-step wizard. | ✅ | 2026-05-26 |
| TASK-009 | Refactor `/app/dashboard` to be the central authenticated landing page for the Owner. | ✅ | 2026-05-26 |
| TASK-010 | Scaffold `/app/ledger` for transaction history. | ✅ | 2026-05-26 |
| TASK-011 | Scaffold `/app/scenarios` for the forecasting tool. | ✅ | 2026-05-26 |

## 3. Alternatives

- **ALT-001**: Use Supabase instead of Prisma/SQLite. Not chosen for immediate implementation to allow full local zero-config end-to-end execution without requiring third-party API keys, but the Prisma schema maps 1:1 to Postgres for an easy future migration.

## 4. Dependencies

- **DEP-001**: Prisma (ORM)
- **DEP-002**: TanStack React Query (Server State)
- **DEP-003**: React Hook Form + Zod (Validation)

## 5. Files

- **FILE-001**: `prisma/schema.prisma` - The core data model.
- **FILE-002**: `package.json` - Dependency updates.
- **FILE-003**: `app/page.js` - Routing adjustments.

## 6. Testing

- **TEST-001**: Verify Prisma generates client correctly and can insert a User and a Property.
- **TEST-002**: Verify the dashboard loads without localStorage dependency errors.

## 7. Risks & Assumptions

- **RISK-001**: Transitioning away from localStorage means existing prototype data (if any was considered valuable by the user) will be lost locally unless explicitly migrated.
- **ASSUMPTION-001**: SQLite is sufficient for the immediate single-user desktop experience before upgrading to a cloud Postgres instance.

## 8. Related Specifications / Further Reading

N/A
