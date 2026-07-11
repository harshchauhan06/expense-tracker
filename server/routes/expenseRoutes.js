import express from "express";
import {
    getExpenses,
    createExpense,
    deleteExpense,
    updateExpense,
} from "../controllers/expenseController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// router.get("/", getExpenses);
// router.post("/", createExpense);
// router.put("/:id", updateExpense);
// router.delete("/:id", deleteExpense);


router.get("/", authenticateToken, getExpenses);
router.post("/", authenticateToken, createExpense);
router.put("/:id", authenticateToken, updateExpense);
router.delete("/:id", authenticateToken, deleteExpense);

export default router;