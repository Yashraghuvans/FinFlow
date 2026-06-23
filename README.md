```text
  ___ _       ___ _             
 | __(_)_ _  | __| |_____ __ __ 
 | _|| | ' \ | _|| / _ \ V  V / 
 |_| |_|_||_||_| |_\___/\_/\_/  
```

<div align="center">
  <p><strong>A Modern Real Estate & Loan Financial Tracking Dashboard</strong></p>
  
  [![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
  [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)
  [![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)](https://nextjs.org/)
  [![Prisma](https://img.shields.io/badge/Prisma-ORM-1B222D?logo=prisma)](https://prisma.io)
  [![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Ready-336791?logo=postgresql)](https://postgresql.org)
</div>

<br />

## 📖 Overview

**FinFlow** is an open-source financial tracking application tailored specifically for real estate purchases, home loans, and builder milestone payments.

It simplifies the complex journey of buying a property by allowing you to track your loan disbursements, schedule payments to builders, upload invoices, and calculate interest accruals. Additionally, it features intelligent "what-if" scenarios to help you optimize payments and save on interest.

**Live Demo:** [fin-flow-nine.vercel.app](https://fin-flow-nine.vercel.app/)

---

## ✨ Key Features

- 🏢 **Property & Loan Management**: Input and track real-estate properties alongside home loan details (sanctioned amounts, interest rates, floating vs fixed, etc.).
- 🏗️ **Builder Milestones**: Configure custom payment schedules synced to builder construction milestones (e.g., Plinth, Slab 1, Possession).
- 📎 **Invoice & Document Attachments**: Upload and securely store builder invoices and transaction receipts using Firebase Storage.
- 💸 **Transaction Tracking**: Log down payments, bank disbursements, pre-EMI, and full EMI payments seamlessly.
- 🔮 **Financial Scenarios**: Run interactive "What-If" scenarios (e.g., "If I make a lump-sum payment of $10,000, how much interest do I save?").
- ⏰ **Automated Reminders**: Built-in Vercel Cron jobs paired with Resend to notify you weekly/monthly to update your financial logs.

---

## 🛠️ Tech Stack

FinFlow is built with a modern, production-ready stack:

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Database**: [PostgreSQL](https://www.postgresql.org/)
- **ORM**: [Prisma](https://www.prisma.io/)
- **Authentication & Storage**: [Firebase](https://firebase.google.com/)
- **Styling**: [Tailwind CSS v3/v4](https://tailwindcss.com/)
- **Testing**: [Jest](https://jestjs.io/) & React Testing Library
- **Emails / Cron**: [Resend](https://resend.com/) & Vercel Cron Jobs

---

## 🚀 Getting Started

Follow these instructions to set up the project locally.

### Prerequisites
- Node.js (v18 or higher)
- A PostgreSQL instance (local or cloud like Neon/Supabase)
- A Firebase project (for Auth & Storage)

### 1. Clone & Install
```bash
git clone https://github.com/Yashraghuvans/FinFlow.git
cd FinFlow
npm install
```

### 2. Environment Variables
Copy the `.env.local` example (or create a new `.env` file) and fill in your credentials:

```bash
# Prisma / PostgreSQL
DATABASE_URL="postgresql://user:password@localhost:5432/finflow?schema=public"

# Firebase Client
NEXT_PUBLIC_FIREBASE_API_KEY="your_api_key"
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="your_auth_domain"
NEXT_PUBLIC_FIREBASE_PROJECT_ID="your_project_id"
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="your_storage_bucket"
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="your_sender_id"
NEXT_PUBLIC_FIREBASE_APP_ID="your_app_id"

# Firebase Admin
FIREBASE_CLIENT_EMAIL="your_service_account_email"
FIREBASE_PRIVATE_KEY="your_service_account_private_key"

# Resend (Emails)
RESEND_API_KEY="your_resend_api_key"
CRON_SECRET="your_secure_cron_secret"
```

### 3. Database Setup
Push the Prisma schema to your PostgreSQL database and generate the Prisma Client:
```bash
npx prisma db push
npx prisma generate
```

### 4. Run the Development Server
```bash
npm run dev
```
Navigate to `http://localhost:3000` to view the application!

---

## 🧪 Testing

FinFlow uses Jest and React Testing Library to ensure financial calculations and UI components remain stable.

To run the test suite:
```bash
# Run tests once
npm run test

# Run tests in watch mode
npm run test:watch
```

---

## 🤝 Contributing

We welcome contributions from the community! Whether it's fixing bugs, improving documentation, or proposing new features, your help is appreciated. 

Please read our [Contributing Guidelines](CONTRIBUTING.md) and [Code of Conduct](CODE_OF_CONDUCT.md) before submitting a Pull Request.

---

## 👤 Author

**Yash Raghuvanshi**
- GitHub: [@yashraghuvans](https://www.github.com/yashraghuvans)

## 📄 License

This project is licensed under the [MIT License](LICENSE) - see the `LICENSE` file for details.
