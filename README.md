# 💸 Expense Tracker

A modern full-stack Expense Tracker built with the MERN-style stack (React + Express + PostgreSQL) featuring secure JWT authentication, user-specific expense management, interactive analytics, and a clean responsive UI.

![React](https://img.shields.io/badge/React-19-blue?logo=react)
![Node.js](https://img.shields.io/badge/Node.js-22-green?logo=node.js)
![Express](https://img.shields.io/badge/Express.js-black?logo=express)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-blue?logo=postgresql)
![JWT](https://img.shields.io/badge/JWT-Authentication-orange)
![Material UI](https://img.shields.io/badge/MUI-UI-blue)

---

## ✨ Features

### 🔐 Authentication
- User Registration
- Secure Login
- Password hashing using **bcrypt**
- JWT Authentication
- Protected Routes
- Logout functionality

### 💰 Expense Management
- Add Expenses
- Edit Expenses
- Delete Expenses
- User-specific expense data
- Real-time expense updates

### 🔍 Search & Filter
- Search by expense name
- Search by description
- Filter by category

### 📊 Analytics
- Interactive Pie Chart
- Total Expense Calculation
- Category-wise visualization

### 📅 Sorting
- Newest First
- Oldest First
- Highest Amount
- Lowest Amount
- Name (A-Z)
- Name (Z-A)

### 🎨 UI Features
- Responsive Design
- Material UI Components
- Beautiful Confirmation Dialogs
- Custom Context Menu
- Toast Notifications
- Scrollable Expense Table
- Category Icons

---

## 🛠 Tech Stack

### Frontend
- React
- React Router
- Material UI
- Axios
- React Hot Toast

### Backend
- Node.js
- Express.js
- JWT
- bcrypt

### Database
- PostgreSQL

---

## 📂 Project Structure

```
expense-tracker/
│
├── client/
│   ├── src/
│   ├── pages/
│   ├── components/
│   └── api/
│
├── server/
│   ├── controllers/
│   ├── routes/
│   ├── middleware/
│   ├── models/
│   └── server.js
│
└── README.md
```

---

## 🚀 Installation

### Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/expense-tracker.git
```

### Frontend

```bash
cd client
npm install
npm run dev
```

### Backend

```bash
cd server
npm install
npm run dev
```

---

## ⚙️ Environment Variables

### Server

Create a `.env` file inside the `server` folder.

```env
PORT=5000

DB_HOST=
DB_PORT=
DB_USER=
DB_PASSWORD=
DB_NAME=

JWT_SECRET=
```

### Client

```env
VITE_API_URL=http://localhost:5000/api
```

---


## 🔒 Authentication Flow

1. Register a new account.
2. Login with your credentials.
3. Server returns a JWT.
4. JWT is stored in Local Storage.
5. Protected routes validate the JWT.
6. Users can only access their own expenses.

---

## 📈 Future Improvements

- Monthly Reports
- Budget Tracking
- Dark Mode
- CSV Export
- Expense Categories Management
- Profile Page
- Password Reset
- Email Verification

---

## 👨‍💻 Author

**Harsh Chauhan**

LinkedIn: *(https://www.linkedin.com/in/harsh-chauhan-618b61300/)*

GitHub: *(https://github.com/harshchauhan06)*

---