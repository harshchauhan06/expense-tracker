import pool from "../models/db.js";

export async function getExpenses(req, res) {
    try {
        const { name, category, amount, description } = req.query;

        if (!name ||
            name.trim() === "" ||
            !category ||
            category.trim() === "" ||
            Number.isNaN(Number(amount)) ||
            Number(amount) <= 0
        ) {
            return res.status(400).json({
                success: false,
                message: "Please provide valid expense details.",
            });
        }

        if (description && description.length > 250) {
            return res.status(400).json({
                success: false,
                message: "Description cannot exceed 250 characters.",
            });
        }
        const result = await pool.query(
            "SELECT * FROM expenses ORDER BY id DESC"
        );

        res.status(200).json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Error fetching expenses",
        });
    }
}
export async function createExpense(req, res) {
    try {
        const {
            name,
            description,
            category,
            amount,
            expense_date,
        } = req.body;

        const result = await pool.query(
            `
      INSERT INTO expenses
      (name, description, category, amount, expense_date)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
      `, [
                name,
                description,
                category,
                amount,
                expense_date,
            ]
        );

        res.status(201).json(result.rows[0]);

    } catch (err) {
        console.error(err);

        res.status(500).json({
            message: "Unable to create expense",
        });
    }
}

export async function deleteExpense(req, res) {
    try {
        const { id } = req.params;

        const result = await pool.query(
            "DELETE FROM expenses WHERE id = $1 RETURNING *", [id]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({
                success: false,
                message: "Expense not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Expense deleted successfully",
            data: result.rows[0],
        });

    } catch (err) {
        console.error(err);

        res.status(500).json({
            success: false,
            message: "Unable to delete expense",
        });
    }
}
export async function updateExpense(req, res) {
    try {
        const { id } = req.params;

        const {
            name,
            description,
            category,
            amount,
            expense_date,
        } = req.body;


        if (!name ||
            name.trim() === "" ||
            !category ||
            category.trim() === "" ||
            Number.isNaN(Number(amount)) ||
            Number(amount) <= 0
        ) {
            return res.status(400).json({
                success: false,
                message: "Please provide valid expense details.",
            });
        }

        if (description && description.length > 250) {
            return res.status(400).json({
                success: false,
                message: "Description cannot exceed 250 characters.",
            });
        }


        const result = await pool.query(
            `
      UPDATE expenses
      SET
          name = $1,
          description = $2,
          category = $3,
          amount = $4,
          expense_date = $5
      WHERE id = $6
      RETURNING *;
      `, [
                name,
                description,
                category,
                amount,
                expense_date,
                id,
            ]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({
                success: false,
                message: "Expense not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Expense updated successfully",
            data: result.rows[0],
        });

    } catch (err) {
        console.error(err);

        res.status(500).json({
            success: false,
            message: "Unable to update expense",
        });
    }
}