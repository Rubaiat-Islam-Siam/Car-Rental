# Git Team Workflow & Collaboration Guide

This document outlines the version control workflow for the **Vehicle Rental System** developed for **CSE 3206 Software Engineering Sessional Lab 2**.

The team consists of **3 members**, each responsible for a distinct functional module. This guide provides exact, step-by-step commands to simulate an industry-standard Git flow with feature branches, descriptive commits, pull requests, and merges into the `main` branch.

---

## Team Division & Responsibilities

| Team Member | Functional Area | Assigned Tasks | Feature Branch |
| :--- | :--- | :--- | :--- |
| **Member 1** | **Customer UI** | - Customer Login (`/login`)<br>- Customer Dashboard (`/dashboard`)<br>- Vehicle Listing & Filters (`/vehicles`)<br>- Vehicle Details View (`/vehicles/[id]`) | `feature/customer-ui` |
| **Member 2** | **Database & Rental Engine** | - Prisma ORM & SQLite Schema<br>- Database Seed Data (Users, Vehicles, Bookings)<br>- Booking Calculation Logic (`rentalDays × pricePerDay`)<br>- Rental Reservation Flow (`/vehicles/[id]/rent`)<br>- Customer "My Bookings" Portal (`/bookings`) | `feature/database-booking` |
| **Member 3** | **Admin Portal & Documentation** | - Admin Dashboard & Analytics (`/admin`)<br>- Vehicle Inventory CRUD & Availability (`/admin/vehicles`)<br>- Booking Approvals & Rejections (`/admin/bookings`)<br>- Project Documentation (`README.md`, `GIT_WORKFLOW.md`) | `feature/admin-management` |

---

## Initial Repository Setup (One-time)

Run these commands once to initialize the Git repository on the main branch:

```bash
# 1. Initialize Git repository
git init

# 2. Configure initial branch name as main
git branch -M main

# 3. Add base project configuration
git add package.json package-lock.json tsconfig.json next.config.ts postcss.config.mjs .gitignore
git commit -m "chore: initialize Next.js App Router project with TypeScript and Tailwind CSS"
```

---

## Member 2: Database & Rental Functionality Workflow

Member 2 establishes the data foundation and core booking engine first.

### Step 1: Create & switch to feature branch
```bash
git checkout -b feature/database-booking
```

### Step 2: Implement Prisma schema, seed script, and database client
```bash
git add prisma/schema.prisma prisma/seed.ts lib/prisma.ts .env
git commit -m "feat(db): configure Prisma ORM with SQLite, User, Vehicle, and Booking models and seed script"
```

### Step 3: Implement booking calculations and rental reservation flow
```bash
git add app/actions.ts app/vehicles/[id]/rent/ app/bookings/
git commit -m "feat(rental): implement dynamic cost calculation (days * price) and customer booking workflow"
```

### Step 4: Push branch & merge into `main`
```bash
# In GitHub: Push branch and open Pull Request #1
git push -u origin feature/database-booking

# Locally simulate merge into main:
git checkout main
git merge --no-ff feature/database-booking -m "Merge pull request #1 from feature/database-booking: Prisma database setup and rental booking engine"
```

---

## Member 1: Customer UI Workflow

Member 1 develops the customer-facing interface and navigation.

### Step 1: Create & switch to feature branch from updated `main`
```bash
git checkout main
git pull origin main
git checkout -b feature/customer-ui
```

### Step 2: Implement universal navigation and layout
```bash
git add components/Navbar.tsx app/layout.tsx app/globals.css
git commit -m "feat(ui): create responsive Navbar with role detection and base application layout"
```

### Step 3: Implement Customer Login and Dashboard
```bash
git add app/login/ lib/auth.ts app/dashboard/
git commit -m "feat(auth): implement customer login with demo autofill and personal dashboard"
```

### Step 4: Implement Vehicle Listing and Details pages
```bash
git add components/VehicleCard.tsx app/page.tsx app/vehicles/page.tsx app/vehicles/[id]/page.tsx
git commit -m "feat(catalog): implement vehicle fleet cards, type filters, and detailed view in BDT (৳)"
```

### Step 5: Push branch & merge into `main`
```bash
# In GitHub: Push branch and open Pull Request #2
git push -u origin feature/customer-ui

# Locally simulate merge into main:
git checkout main
git merge --no-ff feature/customer-ui -m "Merge pull request #2 from feature/customer-ui: Customer navigation, catalog, and login UI"
```

---

## Member 3: Admin Portal & Documentation Workflow

Member 3 creates the administrative management portal and project documentation.

### Step 1: Create & switch to feature branch from updated `main`
```bash
git checkout main
git pull origin main
git checkout -b feature/admin-management
```

### Step 2: Implement Admin Dashboard and analytics
```bash
git add app/admin/page.tsx
git commit -m "feat(admin): implement admin dashboard with vehicle fleet metrics and booking stats"
```

### Step 3: Implement Vehicle CRUD & availability toggle
```bash
git add components/AdminVehicleManager.tsx app/admin/vehicles/page.tsx
git commit -m "feat(admin): implement complete vehicle CRUD operations with interactive modal and status toggle"
```

### Step 4: Implement Booking Approval/Rejection interface
```bash
git add components/AdminBookingActionButtons.tsx components/BookingStatusBadge.tsx app/admin/bookings/page.tsx
git commit -m "feat(admin): implement booking review management with approve and reject actions"
```

### Step 5: Add comprehensive documentation
```bash
git add README.md GIT_WORKFLOW.md
git commit -m "docs: add project documentation and Prototype Model evaluation guide"
```

### Step 6: Push branch & merge into `main`
```bash
# In GitHub: Push branch and open Pull Request #3
git push -u origin feature/admin-management

# Locally simulate merge into main:
git checkout main
git merge --no-ff feature/admin-management -m "Merge pull request #3 from feature/admin-management: Admin dashboard, vehicle CRUD, and documentation"
```

---

## Verifying Git Log History

To verify the team's branching and merge history, run:

```bash
git log --graph --oneline --decorate --all
```

This will display a clean Git graph showing the individual contributions, feature branches, and merge commits from all three team members.
