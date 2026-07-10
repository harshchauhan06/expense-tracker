import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pool from "./models/db.js";
import authRoutes from "./routes/authRoutes.js";
import expenseRoutes from "./routes/expenseRoutes.js";

dotenv.config();

const app = express();


app.use(cors());
app.use(express.json());
app.use("/api/expenses", expenseRoutes);
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
    res.send("Expense Tracker API is running 🚀");
});

const PORT = process.env.PORT || 5000;
pool
    .query("SELECT NOW()")
    .then((res) => {
        console.log("✅ PostgreSQL Connected");
        console.log(res.rows[0]);
    })
    .catch((err) => {
        console.error(err);
    });
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});