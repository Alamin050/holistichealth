# **App Name**: Holistic Health

## Core Features:

- Role-Based Gateway: Landing page with clear CTAs for Doctor or Patient role selection, redirecting to appropriate authentication flows.
- Doctor Authentication: Secure email and password-based authentication for doctors, redirecting to the doctor dashboard upon successful login.
- Patient Authentication (QR Code): QR code scanning for patients, bypassing the landing page and exchanging the token for a persistent session to access patient home.
- Patient Authentication (Email OTP): Email OTP or magic link-based authentication for patients, restoring session and downloading patient history upon successful verification and redirecting to /patient/home.
- Protocol Builder: A tool for doctors to quickly create care protocols, assign medicine, and link to patient records by Hospital ID, outputting a QR code.
- Automated Triage: An automated triage algorithm that determines the risk level of a patient based on vitals and adherence. Includes RED (critical), YELLOW (warning), and GREEN (stable) indicators, as well as email and push alerts to the doctor.
- Offline PWA for Patients: Patient app functions fully offline with data caching and automatic syncing when online, including 'Add to Home Screen' prompt.
- Medicine Recommendations: Patients get recommended to buy medicine prescribed by the doctor with an offer to have it delivered to their door step by partner pharmacy if they buy.

## Style Guidelines:

- Primary color: Teal (#26A69A), representing health and trust.
- Background color: Very light blue-gray (#F0F4F3), providing a calm and clean backdrop.
- Accent color: Soft Blue (#64B5F6), used for interactive elements and highlights.
- Font: 'Montserrat' (sans-serif) for all text elements to maintain a consistent and modern feel. Note: currently only Google Fonts are supported.
- React Icons will be used for clear, intuitive visual representation across both doctor and patient interfaces.
- Flexbox will be the primary layout system to ensure responsiveness and consistency. CSS Grid will be used for more complex layouts where necessary.
- Subtle transitions and animations to enhance user experience, especially during data loading and triage status changes.