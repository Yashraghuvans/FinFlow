---
goal: Implement Firebase Auth, role-based dashboards (User/Contractor), and UI/UX improvements
version: 1.0
date_created: 2026-06-11
status: 'Planned'
tags: [feature, architecture, auth, design]
---

# Introduction

![Status: Planned](https://img.shields.io/badge/status-Planned-blue)

This implementation plan outlines the transition of FinFlow from a mock-auth, single-user MVP to a full-fledged, multi-role SaaS application. We will introduce Firebase Authentication and Firestore to replace Prisma/SQLite (or work alongside it). The application will be split into a User Dashboard and a Contractor Dashboard, with advanced user management for contractors. We will also apply Awwwards-level UI/UX principles (using `top-design` and `ui-ux-pro-max` skills) to elevate the product's design, including loading states and interactive components.

## 1. Requirements & Constraints

- **REQ-001**: Implement Firebase Authentication with `.env` variables for config.
- **REQ-002**: Integrate Firebase Firestore to store User and Contractor data.
- **REQ-003**: Remove "Dashboard" from public navigation; redirect to appropriate dashboard only after login.
- **REQ-004**: Create two distinct dashboard roles: `User` and `Contractor`.
- **REQ-005**: Add User Management capabilities within the Contractor Dashboard.
- **REQ-006**: Create multiple tabs within the dashboards to organize features.
- **REQ-007**: Apply `top-design` and `ui-ux-pro-max` principles to all new UI components, loading states, and website updates.
- **CON-001**: Maintain the Next.js 15 App Router architecture.
- **SEC-001**: Secure routes with Firebase Auth middleware/checks.

## 2. Implementation Steps

### Implementation Phase 1: Infrastructure & Firebase Setup

- GOAL-001: Set up Firebase infrastructure, install dependencies, and configure environment variables.

| Task | Description | Completed | Date |
|------|-------------|-----------|------|
| TASK-001 | Install `firebase` and `firebase-admin` packages | | |
| TASK-002 | Create Firebase config files (`firebase.js`, `firebaseAdmin.js`) | | |
| TASK-003 | Add `.env.local` template with Firebase config variables | | |

### Implementation Phase 2: Authentication & Routing

- GOAL-002: Implement login, signup, and secure routing.

| Task | Description | Completed | Date |
|------|-------------|-----------|------|
| TASK-004 | Build Auth Context/Provider for React | | |
| TASK-005 | Update `Navbar` to remove "Dashboard" for unauthenticated users | | |
| TASK-006 | Build Sign In & Sign Up pages with Firebase Email/Password Auth | | |
| TASK-007 | Implement Route protection (middleware or HOC) to redirect to `/dashboard/user` or `/dashboard/contractor` | | |

### Implementation Phase 3: Firestore Database Integration

- GOAL-003: Connect Firebase collections and migrate data models.

| Task | Description | Completed | Date |
|------|-------------|-----------|------|
| TASK-008 | Design Firestore schema (Users, Contractors, Properties, Transactions) | | |
| TASK-009 | Create server actions / Firebase utility functions for CRUD operations | | |
| TASK-010 | Implement initial data seeding logic for a new user/contractor | | |

### Implementation Phase 4: Role-Based Dashboards & User Management

- GOAL-004: Build distinct, tabbed dashboards for Users and Contractors.

| Task | Description | Completed | Date |
|------|-------------|-----------|------|
| TASK-011 | Scaffold `/dashboard/user` with tabs (Overview, Ledger, Scenarios) | | |
| TASK-012 | Scaffold `/dashboard/contractor` with tabs (Overview, Clients, Invoices) | | |
| TASK-013 | Implement "User Management" tab in Contractor dashboard (Add, Edit, View Clients) | | |

### Implementation Phase 5: UI/UX Pro Max & Top-Design Pass

- GOAL-005: Elevate the visual design, animations, and loading states to Awwwards quality.

| Task | Description | Completed | Date |
|------|-------------|-----------|------|
| TASK-014 | Update Landing Page typography, spacing, and scroll animations | | |
| TASK-015 | Implement premium Skeleton loading states for all dashboard data | | |
| TASK-016 | Refine form inputs, buttons, and micro-interactions (magnetic hover, focus states) | | |

## 3. Alternatives

- **ALT-001**: Keep Prisma and use NextAuth.js instead of Firebase. Rejected per user request to specifically use Firebase for Auth and Collections.
- **ALT-002**: Supabase instead of Firebase. Rejected per user request.

## 4. Dependencies

- **DEP-001**: `firebase`
- **DEP-002**: `firebase-admin` (for server-side auth/firestore actions)

## 5. Files

- **FILE-001**: `app/firebase.js`
- **FILE-002**: `app/components/navbar.jsx`
- **FILE-003**: `app/signin/page.js`
- **FILE-004**: `app/dashboard/user/page.js`
- **FILE-005**: `app/dashboard/contractor/page.js`

## 6. Testing

- **TEST-001**: Verify Firebase Auth signup and login flows.
- **TEST-002**: Verify role-based redirection logic.
- **TEST-003**: Verify Contractor can create and view managed users in Firestore.

## 7. Risks & Assumptions

- **RISK-001**: Moving from Prisma/SQLite to Firebase Firestore requires rewriting all data fetching logic.
- **ASSUMPTION-001**: User will provide Firebase credentials in the `.env.local` file after the structure is built.

## 8. Related Specifications / Further Reading

- [UI/UX Pro Max Guidelines](../.agents/skills/ui-ux-pro-max/SKILL.md)
- [Top-Design Principles](../.agents/skills/top-design/SKILL.md)
