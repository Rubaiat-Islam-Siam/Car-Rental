# Team Contribution & GitHub Collaboration Guide

> **Course**: CSE 3206 Software Engineering Sessional Lab  
> **Project Name**: Vehicle Rental System (AutoRent BD)  
> **Team Size**: 3 Members  
> **Software Process Model**: Prototype Model  

---

## Table of Contents
1. [Project Structure & 3-Member Work Division](#1-project-structure--3-member-work-division)
2. [Member 1: Customer UI & Catalog Module](#2-member-1-customer-ui--catalog-module)
3. [Member 2: Database, ORM & Rental Engine](#3-member-2-database-orm--rental-engine)
4. [Member 3: Admin Management & Documentation](#4-member-3-admin-management--documentation)
5. [Complete Step-by-Step GitHub Push Guide](#5-complete-step-by-step-github-push-guide)
6. [Teacher Viva / Defense Preparation Questions](#6-teacher-viva--defense-preparation-questions)

---

## 1. Project Structure & 3-Member Work Division

To ensure that **all 3 group members** have distinct Git commit history on GitHub (as required by the teacher), the project features have been divided into **3 independent functional modules**.

```
Vehicle Rental System (SW Pr2)
│
├── 👤 MEMBER 1: Customer UI & Catalog Module (Branch: feature/customer-ui)
│   ├── Navigation & Layout (Navbar, MobileNav, Footer, App Layout)
│   ├── Customer Authentication UI (/login, /register, Cookie Auth UI)
│   ├── Landing & Info Pages (Home Page, About Page, Contact Page)
│   └── Fleet Catalog & Vehicle Details (/vehicles, /vehicles/[id], VehicleCard)
│
├── ⚙️ MEMBER 2: Database, ORM & Rental Booking Engine (Branch: feature/database-booking)
│   ├── Prisma Database Schema & Models (User, Vehicle, Booking in SQLite)
│   ├── Database Seed Data & Prisma Client (prisma/seed.ts, lib/prisma.ts)
│   ├── Server Actions & Core Business Logic (app/actions.ts, Auth & Booking logic)
│   ├── Customer Rental Reservation Flow (/vehicles/[id]/rent, RentalBookingForm)
│   └── Customer Dashboard & My Bookings (/dashboard, /bookings, BookingStatusBadge)
│
└── 🛠️ MEMBER 3: Admin Management & Documentation (Branch: feature/admin-management)
    ├── Admin Dashboard & Fleet Analytics (/admin metrics)
    ├── Vehicle Inventory Management CRUD (/admin/vehicles, AdminVehicleManager)
    ├── Booking Request Approval & Rejection (/admin/bookings, AdminBookingActionButtons)
    └── Project Documentation & Lab Guides (README.md, GIT_WORKFLOW.md, TEAM_CONTRIBUTION_GUIDE.md)
```

---

## 2. Member 1: Customer UI & Catalog Module

### 📌 Role & Responsibility
Member 1 is responsible for the customer-facing frontend UI, responsive navigation, authentication screens, landing page, and vehicle catalog exploration.

### 📂 Assigned Files & Folders
- `components/Navbar.tsx` – Dynamic header with role-based links (Customer vs Admin vs Guest)
- `components/MobileNav.tsx` – Responsive mobile menu drawer
- `components/footer/*` & `app/layout.tsx` – Global site layout, font, and footer
- `app/globals.css` – Tailwind CSS global styles and dark/light utilities
- `app/login/page.tsx` – Customer/Admin login screen with 1-click demo credentials
- `app/register/page.tsx` – User registration page
- `app/page.tsx` & `components/home/*` – Landing page hero section and featured fleet showcase
- `app/vehicles/page.tsx` – Fleet catalog with category tabs (Sedan, SUV, Van) & availability toggles
- `app/vehicles/[id]/page.tsx` – Detailed vehicle specifications and daily rental rates (in ৳ BDT)
- `components/VehicleCard.tsx` – Card component displaying vehicle photo, price, badges, and rent trigger
- `app/about/page.tsx` & `app/contact/page.tsx` – Company information and contact form

### 💡 Core Concepts to Learn
1. **Next.js App Router**: Navigation using `<Link>` components and file-based routing.
2. **Role Detection in Navbar**: Checking active user session (`auth.ts`) to dynamically display `/dashboard` or `/admin` links.
3. **Client-Side Filtering**: Filtering vehicle lists by type (*Sedan*, *SUV*, *Van*) and availability state using React state (`useState`).

---

## 3. Member 2: Database, ORM & Rental Engine

### 📌 Role & Responsibility
Member 2 is responsible for backend database architecture, Prisma ORM schema modeling, server actions, dynamic rental price calculation logic, and the customer booking workflow.

### 📂 Assigned Files & Folders
- `prisma/schema.prisma` – SQLite database schema (`User`, `Vehicle`, `Booking` relational models)
- `prisma/seed.ts` – Seeder populating demo users (`customer`, `admin`), vehicles, and sample bookings
- `lib/prisma.ts` – Prisma Client singleton connection manager
- `lib/auth.ts` – HTTP Cookie session management (`setAuthCookie`, `getAuthSession`, `clearAuthSession`)
- `app/actions.ts` – Next.js Server Actions: `loginAction`, `logoutAction`, `createBookingAction`, `cancelBookingAction`
- `app/api/vehicles/` & `app/api/bookings/` – Next.js API Route Handlers for external REST calls
- `app/vehicles/[id]/rent/page.tsx` & `RentalBookingForm.tsx` – Live date picker, duration calculation, and booking form
- `app/bookings/page.tsx` – Customer "My Bookings" tracking portal
- `components/BookingStatusBadge.tsx` – Status indicator badge (`Pending`, `Approved`, `Rejected`)
- `app/dashboard/page.tsx` – Customer personal dashboard summarizing active and past rentals

### 💡 Core Concepts to Learn
1. **Prisma ORM & SQLite**: Defining relationships (`User 1:N Booking`, `Vehicle 1:N Booking`).
2. **Rental Duration & Cost Calculation**:
   $$\text{Days} = \max\left(1, \left\lceil \frac{\text{End Date} - \text{Start Date}}{86400000} \right\rceil\right)$$
   $$\text{Total Cost (৳ BDT)} = \text{Days} \times \text{Price Per Day}$$
3. **Date Validation Rules**: Start date must not be in the past; End date must be on or after Start date; unavailable vehicles cannot be booked.

---

## 4. Member 3: Admin Management & Documentation

### 📌 Role & Responsibility
Member 3 is responsible for the administrative back-office portal, vehicle inventory CRUD operations, booking approval/rejection workflows, fleet availability toggles, and lab documentation.

### 📂 Assigned Files & Folders
- `app/admin/page.tsx` – Administrative overview displaying metrics (Total Vehicles, Available Vehicles, Total Bookings, Pending Requests)
- `app/admin/vehicles/page.tsx` – Admin Vehicle Management table view
- `components/AdminVehicleManager.tsx` – Interactive modal for Create, Read, Update, Delete (CRUD) operations and 1-click availability toggling
- `app/admin/bookings/page.tsx` – Admin Booking Review dashboard with status filtering
- `components/AdminBookingActionButtons.tsx` – Instant `Approve` and `Reject` action triggers updating database records via Server Actions
- `README.md` – Full lab report, architecture diagram, ERD, and software process model analysis
- `GIT_WORKFLOW.md` – Technical Git branching, PR, and merge instructions
- `TEAM_CONTRIBUTION_GUIDE.md` – Work breakdown document for group members

### 💡 Core Concepts to Learn
1. **Admin Authorization**: Protecting administrative routes so non-admin users cannot perform CRUD actions.
2. **Vehicle CRUD**: Adding new cars, editing daily rates, deleting obsolete vehicles, and toggling availability state in real-time.
3. **Booking Review Workflow**: Changing booking status between `PENDING` $\rightarrow$ `APPROVED` or `REJECTED` and updating vehicle availability.

---

## 5. Complete Step-by-Step GitHub Push Guide

Follow these exact steps so that **all 3 members get individual commits and pushes on GitHub**.

### Step 1: Create Remote Repository on GitHub (Member 1 / Group Leader)
1. Go to [GitHub.com](https://github.com) and click **New Repository**.
2. Name the repository: `vehicle-rental-system` (or `CSE3206-SW-Pr2`).
3. Keep it **Public** (or Private). Do **NOT** initialize with README or .gitignore (as we already have them).
4. Click **Create Repository**. Copy the Repository URL (e.g., `https://github.com/YourUsername/vehicle-rental-system.git`).

---

### Step 2: Initialize Local Git Repository (Member 1 / Group Leader)
Open terminal in the project folder `SW Pr2`:

```bash
# 1. Initialize git in the project root


# 2. Rename default branch to main
git branch -M main

# 3. Add initial project configuration files
git add package.json package-lock.json tsconfig.json next.config.ts postcss.config.mjs .gitignore
git commit -m "chore: initialize Next.js App Router project structure"

# 4. Link to GitHub repository
git remote add origin https://github.com/YourUsername/vehicle-rental-system.git

# 5. Push main branch to GitHub
git push -u origin main
```

---

### Step 3: Add Collaborators on GitHub (Member 1 / Group Leader)
1. On GitHub, go to your repository **Settings** $\rightarrow$ **Collaborators**.
2. Click **Add people** and invite **Member 2** and **Member 3** using their GitHub usernames/emails.
3. Member 2 and Member 3 must check their email/GitHub and **accept the invitation**.

---

### Step 4: Member 1 Implementation & Push (`feature/customer-ui`)

**Member 1** runs on their machine:

```bash
# 1. Ensure you are on main and up to date
git checkout main
git pull origin main

# 2. Create and switch to feature branch
git checkout -b feature/customer-ui

# 3. Stage Member 1 assigned files
git add components/Navbar.tsx components/MobileNav.tsx components/footer/ app/layout.tsx app/globals.css

# 4. Commit navigation & layout
git commit -m "feat(ui): implement responsive navbar, mobile nav drawer, and root layout"

# 5. Stage customer authentication & catalog files
git add app/login/ app/register/ app/page.tsx components/home/ components/VehicleCard.tsx app/vehicles/ app/about/ app/contact/

# 6. Commit customer portal & vehicle catalog
git commit -m "feat(catalog): implement customer login, landing page, fleet catalog, and vehicle detail view"

# 7. Push feature branch to GitHub
git push -u origin feature/customer-ui
```

---

### Step 5: Member 2 Implementation & Push (`feature/database-booking`)

**Member 2** runs on their machine (or cloned repo):

```bash
# 1. Clone repository (if working on separate PC)
git clone https://github.com/YourUsername/vehicle-rental-system.git
cd vehicle-rental-system

# 2. Switch to main and pull latest changes
git checkout main
git pull origin main

# 3. Create feature branch
git checkout -b feature/database-booking

# 4. Stage database & ORM files
git add prisma/schema.prisma prisma/seed.ts lib/prisma.ts lib/auth.ts

# 5. Commit database setup
git commit -m "feat(db): configure Prisma ORM SQLite schema for User, Vehicle, and Booking models with seed script"

# 6. Stage server actions & booking calculation files
git add app/actions.ts app/api/ app/vehicles/[id]/rent/ app/bookings/ components/BookingStatusBadge.tsx app/dashboard/

# 7. Commit rental engine & booking form
git commit -m "feat(rental): implement dynamic cost calculation (days * rate) and customer reservation flow"

# 8. Push feature branch to GitHub
git push -u origin feature/database-booking
```

---

### Step 6: Member 3 Implementation & Push (`feature/admin-management`)

**Member 3** runs on their machine (or cloned repo):

```bash
# 1. Clone repository (if working on separate PC)
git clone https://github.com/YourUsername/vehicle-rental-system.git
cd vehicle-rental-system

# 2. Switch to main and pull latest changes
git checkout main
git pull origin main

# 3. Create feature branch
git checkout -b feature/admin-management

# 4. Stage Admin dashboard & vehicle CRUD files
git add app/admin/page.tsx app/admin/vehicles/ components/AdminVehicleManager.tsx

# 5. Commit admin fleet management
git commit -m "feat(admin): implement admin dashboard metrics and complete vehicle CRUD manager with modal"

# 6. Stage booking approvals & documentation files
git add app/admin/bookings/ components/AdminBookingActionButtons.tsx README.md GIT_WORKFLOW.md TEAM_CONTRIBUTION_GUIDE.md

# 7. Commit booking approval workflow and documentation
git commit -m "feat(admin): implement booking approval/rejection workflow and comprehensive lab documentation"

# 8. Push feature branch to GitHub
git push -u origin feature/admin-management
```

---

### Step 7: Create Pull Requests & Merge on GitHub

Now open [GitHub.com](https://github.com) in your browser:

1. **Pull Request 1 (`feature/database-booking`)**:
   - Click **Compare & pull request** for `feature/database-booking`.
   - Title: `Merge Database Setup & Rental Booking Engine`
   - Click **Create Pull Request**, then **Merge Pull Request** $\rightarrow$ **Confirm Merge**.

2. **Pull Request 2 (`feature/customer-ui`)**:
   - Click **Compare & pull request** for `feature/customer-ui`.
   - Title: `Merge Customer UI Navigation & Vehicle Catalog`
   - Click **Create Pull Request**, then **Merge Pull Request** $\rightarrow$ **Confirm Merge**.

3. **Pull Request 3 (`feature/admin-management`)**:
   - Click **Compare & pull request** for `feature/admin-management`.
   - Title: `Merge Admin Fleet Management & Documentation`
   - Click **Create Pull Request**, then **Merge Pull Request** $\rightarrow$ **Confirm Merge**.

---

### Step 8: Verify Complete Git Commit History

To verify all 3 members have commits recorded, run locally on `main`:

```bash
git checkout main
git pull origin main
git log --graph --oneline --decorate --all
```

On GitHub, go to the repository home page and click **Contributors** or **Network Graph** under Insights to view all 3 members' contributions.

---

## 6. Teacher Viva / Defense Preparation Questions

When evaluating the project, the course instructor will ask each member specific questions about their assigned code. Use this section to prepare for oral evaluation.

### ❓ Member 1 (Customer UI & Catalog)
- **Q1: How does the Navbar switch options between customer and admin?**  
  *Answer*: In `components/Navbar.tsx`, we call `getAuthSession()` from `lib/auth.ts`. If `session.role === 'ADMIN'`, we show `/admin` links; if `session.role === 'CUSTOMER'`, we show `/dashboard` and `/bookings`.
- **Q2: How does the vehicle filtering work on `/vehicles` page?**  
  *Answer*: In `app/vehicles/page.tsx`, we maintain React state (`selectedCategory` and `availableOnly`). As the user clicks category badges, we filter the vehicles list using JavaScript `.filter()` array methods.

---

### ❓ Member 2 (Database, ORM & Rental Engine)
- **Q1: Explain your database schema design.**  
  *Answer*: In `prisma/schema.prisma`, we have 3 models: `User`, `Vehicle`, and `Booking`. A `User` can place multiple `Bookings` (1:N), and a `Vehicle` can be included in multiple `Bookings` (1:N).
- **Q2: How is total rental cost calculated?**  
  *Answer*: In `RentalBookingForm.tsx` and `app/actions.ts`, duration in days is calculated by subtracting `startDate` timestamp from `endDate` timestamp, converting milliseconds to days (`86,400,000 ms = 1 day`), with a minimum of 1 day. Total Cost = `days × pricePerDay`.

---

### ❓ Member 3 (Admin Management & Documentation)
- **Q1: How does the Admin Vehicle CRUD work?**  
  *Answer*: In `components/AdminVehicleManager.tsx`, the admin can view the inventory table, toggle availability, edit vehicle specifications, delete vehicles, or open a modal to submit new vehicle details using Server Actions in `app/actions.ts`.
- **Q2: How does booking approval change state in the system?**  
  *Answer*: In `components/AdminBookingActionButtons.tsx`, clicking `Approve` or `Reject` triggers `updateBookingStatusAction(bookingId, status)`. This updates the database record status to `APPROVED` or `REJECTED` and triggers `revalidatePath('/admin/bookings')`.
