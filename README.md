# Holistic-Health Aid (MVP)

**Holistic-Health Aid** is a unified, role-based Progressive Web App (PWA) designed to bridge the gap between **doctors**, **patients**, and **partner pharmacies** through a single, intelligent web platform.

The application operates as a **single URL, single codebase system**, where the interface dynamically adapts based on user role.

---

## 🩺 Project Overview

- **Type:** Unified Progressive Web App (PWA)
- **Architecture:** Single Page Application (SPA)
- **Framework:** Next.js (App Router)
- **Status:** MVP – Approved for Development
- **Primary Users:** Doctors & Patients

The system emphasizes **offline-first patient care**, **real-time monitoring for doctors**, and **seamless medical logistics**.

---

## 🚪 Entry Point (Gateway)

**Root URL:** `/`

The landing page acts as a gateway, allowing users to identify themselves as:

- **Doctor**
- **Patient**

Authentication and routing are handled dynamically based on the selected role.

---

## 🧑‍⚕️ Doctor Portal

**Route:** `/doctor/*`  
**Optimization:** Desktop-first

### Key Features
- Fast patient onboarding via **Protocol Builder**
- QR code generation for patient enrollment
- Silent inbox with **triage-based patient prioritization**
- Real-time adherence and vitals monitoring
- Dynamic question messaging to patients

### Triage Indicators
- 🟢 **Green:** Stable
- 🟡 **Yellow:** Warning
- 🔴 **Red:** Critical (alerts triggered)

---

## 📱 Patient App

**Route:** `/patient/*`  
**Optimization:** Mobile-first (PWA)

### Key Features
- Offline-first experience
- Daily medication and vitals checklist
- Dynamic doctor-sent questions
- Seamless pharmacy ordering
- Automatic data sync when online

The patient app can be installed to the home screen for an **app-like experience**.

---

## 🔐 Authentication Methods

### Doctor Authentication
- Email + Password
- Role-based access control (RBAC)

### Patient Authentication
- **Method A:** QR Code (auto-login via secure token)
- **Method B:** Email OTP / Magic Link (for re-login or new device)

Patient progress and history are always restored after re-authentication.

---

## 🧠 Core Logic

### 3-Tier Triage Algorithm

Runs on every patient data sync:

- 🔴 **RED**
  - Temperature > 38.5°C OR
  - Missed doses ≥ 3
  - Triggers doctor alerts (Email + Push)

- 🟡 **YELLOW**
  - Missed doses ≥ 1 OR
  - Rising pain level

- 🟢 **GREEN**
  - All metrics within normal range

---

## 🏗️ Tech Stack

### Frontend
- **Next.js (App Router)**
- **React**
- **Tailwind CSS**
- **Flexbox Layout**
- **React Icons**
- **Montserrat Font**

### Backend
- **Node.js / Python (API layer)**
- **PostgreSQL**

### Other
- Progressive Web App (PWA)
- Offline caching & background sync
- Role-based routing

---

## 🎨 Styling & Theming

All color accents and theme values are defined using **CSS variables** inside `globals.css` for easy customization.

Font used across the app:
- **Montserrat**

---

## 📁 Project Structure (Simplified)

```txt
app/
 ├── doctor/
 │   └── folders/
 ├── patient/
 │   └── folders/
 ├── page.tsx
 └── layout.tsx

public/
styles/
 └── globals.css
