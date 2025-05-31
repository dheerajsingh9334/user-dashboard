# ✨ User Management Dashboard

A **beautiful, glassmorphic, animated, fully responsive** dashboard for user management, built with **Next.js**, **TypeScript**, **Tailwind CSS**, **Framer Motion**, and **Zod**.

> **Live Demo:**  
> [https://user-management-dashboard.vercel.app](https://user-management-dashboard.vercel.app)

---

## 🚀 Features

- **Dashboard**
  - Glassmorphic card layout
  - Animated, responsive table of users (API & local)
  - Colorful avatar initials with gradients and glow
  - Search by name or city (with floating label)
  - Loading spinner, error display
  - Dark/Light mode toggle

- **Add/Edit/Delete User**
  - Multi-step, animated glassmorphic form with floating labels
  - Zod validation at every step
  - Seamless progress save & restore (even across reloads)
  - Beautiful animated toasts for feedback
  - Edit/Delete for locally added users

- **Accessibility & UX**
  - Keyboard navigation/focus
  - ARIA labels, color contrast
  - Mobile/tablet/desktop friendly

- **Code Quality**
  - ESLint and Prettier config
  - Full TypeScript typing

---

## 🛠️ Getting Started

### 1. **Clone the repo**
```bash
git clone https://github.com/dheerajsingh9334/user-management-dashboard.git
cd user-management-dashboard
```

### 2. **Install dependencies**
```bash
npm install
```

### 3. **Run the development server**
```bash
npm run dev
```

### 4. **View the app**
Go to [http://localhost:3000/dashboard](http://localhost:3000/dashboard)

---

## 🏗️ Project Structure

```
.
├── components/           # UI Components (tables, modals, forms, toasts)
├── contexts/             # React contexts (user state)
├── pages/                # Next.js pages (dashboard, add, etc)
├── styles/               # Tailwind/global styles
├── types/                # TypeScript types
├── utils/                # Zod validation schemas, helpers
├── public/screens/       # Screenshots for README
├── tailwind.config.js
├── tsconfig.json
├── .eslintrc.json
├── .prettierrc
└── README.md
```

---

## ✨ Usage

- **Dashboard:**  
  - Search/filter users by name/city  
  - Edit/Delete any locally added user
  - Responsive/mobile friendly

- **Add User:**  
  - "+ Add User" → multi-step form, animated transitions  
  - Validates with Zod  
  - User is added to dashboard instantly

- **Edit/Delete:**  
  - Edit or delete any locally added user (API users are read-only)

---

## 🌙 Dark Mode

Toggle dark/light mode via the button in the top-right corner.

---

## 🧑‍💻 Technologies Used

- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Zod](https://zod.dev/)
- [Vercel](https://vercel.com/) (for hosting)

---

## 🟢 Hosted Demo

**Try it live:**  
[https://user-management-dashboard.vercel.app](https://user-management-dashboard.vercel.app)

## 🎨 Credits  
- Built by [dheerajsingh9334](https://github.com/dheerajsingh9334) with 🤍

---

## 📄 License

MIT - Free to use, remix, and learn!

---
