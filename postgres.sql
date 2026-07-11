-- ==========================
-- Expense Tracker Database
-- ==========================

-- Drop tables if they already exist
DROP TABLE IF EXISTS expenses;
DROP TABLE IF EXISTS users;

-- ==========================
-- USERS TABLE
-- ==========================

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ==========================
-- EXPENSES TABLE
-- ==========================

CREATE TABLE expenses (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description VARCHAR(250),
    category VARCHAR(50) NOT NULL,
    amount NUMERIC(10,2) NOT NULL CHECK (amount > 0),
    expense_date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    user_id INTEGER NOT NULL,

    CONSTRAINT fk_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
);

-- ==========================
-- Indexes
-- ==========================

CREATE INDEX idx_expense_user
ON expenses(user_id);

CREATE INDEX idx_expense_date
ON expenses(expense_date);