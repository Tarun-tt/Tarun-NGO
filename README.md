# Helping India — Official NGO Portal & Direct UPI Donation Platform

A responsive, high-trust digital platform for **Helping India Foundation**, a registered Indian nonprofit public charitable trust.

Built with **React, Vite, Material UI (MUI), and React Router**. Zero server dependencies required — can be deployed instantly to Vercel, Netlify, GitHub Pages, or any static host.

---

## 💳 Verified Official Payment Credentials

- **Account Holder / Name:** Tarun Tiwari
- **Bank Name:** Yes Bank
- **Account Number:** `006691800137107`
- **IFSC Code:** `YESB0000002`
- **Primary UPI ID (VPA):** `tarun-tiwari@ptyes`
- **QR Code Scanner:** [`public/upi-qr.png`](./public/upi-qr.png)

---

## ⚡ Direct UPI Pay Flow

When a donor clicks **"Pay"** or **"Donate"**:
1. **Direct UPI Deep-Link:** The browser triggers the standard NPCI UPI link:
   ```
   upi://pay?pa=tarun-tiwari@ptyes&pn=Tarun%20Tiwari&am=[AMOUNT]&cu=INR&tn=Donation
   ```
   On mobile devices, this immediately prompts the user to choose their preferred UPI app (**Google Pay, PhonePe, Paytm, BHIM, Cred, Amazon Pay**).
2. **Desktop Donors:** Displays the high-contrast QR code (`/upi-qr.png`), 1-click UPI ID copy, and the verified **Yes Bank** account details for IMPS/NEFT transfers.
3. **Instant 80G Tax Exemption Receipt:** Generates an official, printable donation certificate with unique receipt number, donor details, amount in words, and authorized signatory seal.
4. **Self-Service Lookup:** Donors can retrieve their past donation receipts anytime at `/lookup-receipt` using their email address.

---

## 🌟 Key Website Features

### 1. Public Pages
- **Home (`/`):** Hero section with authentic imagery, trust metrics, 6 focus areas, active fundraising campaigns, transparent program unit budgets (₹500 to ₹10,000), impact stories, and legal credentials.
- **Causes (`/causes` & `/causes/:slug`):** Filter by category (Education, Healthcare, Hunger Relief, Women Empowerment, Clean Environment, Child Welfare), verified background stories, and donor walls.
- **Donate Page (`/donate`):** Dedicated donation flow with cause selector, custom amount, optional PAN for 80G, direct UPI launch button, and Yes Bank details.
- **Impact (`/impact`):** Measurable metrics (50,000+ lives, 200+ schools, 150+ health clinics, 50,000+ trees, 15 states) and 84/16 fund utilization breakdown.
- **Stories (`/stories`):** Documented beneficiary impact reports with quotes and locations.
- **Gallery (`/gallery`):** Category-filtered photo gallery with lightbox modal.
- **Volunteer Registration (`/volunteer`):** Form with skills, city, hours, and areas of interest.
- **Contact (`/contact`):** Headquarters address, helpline, grievance contact, and direct bank transfer details.
- **Statutory Policies:** Privacy Policy (DPDP Act), Terms & Conditions, Donation Refund Policy, and Donation FAQs.

### 2. Admin Management Console (`/admin`)
- Accessible at `/admin/login`
- **Default Credentials:** `admin@helpingindia.org` / `Admin@HelpingIndia2026!`
- Manage campaigns, view donation ledger, review volunteer applications, edit impact stories, manage gallery photographs, and update organization settings.

---

## 🚀 Running the Project

### Development
```bash
npm install
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### Production Build
```bash
npm run build
```
Built output is in `dist/` with relative asset paths ready for deployment on any static hosting provider.
