import pool from "../models/db.js";

export async function getExpenses(req, res) {
    try {
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