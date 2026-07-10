import pool from "../models/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export async function register(req, res) {
    try {
        const { name, email, password } = req.body;

        if (!name ||
            name.trim() === "" ||
            !email ||
            email.trim() === "" ||
            !password ||
            password.length < 8
        ) {
            return res.status(400).json({
                success: false,
                message: "Please provide valid registration details.",
            });
        }
        const existingUser = await pool.query(
            "SELECT id FROM users WHERE email = $1", [email]
        );

        if (existingUser.rows.length > 0) {
            return res.status(409).json({
                success: false,
                message: "User with this email already exists.",
            });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        await pool.query(
            `INSERT INTO users(name, email, password)
   VALUES($1, $2, $3)`, [name, email, hashedPassword]
        );
        return res.status(201).json({
            success: true,
            message: "User registered successfully.",
        });
    } catch (err) {
        console.error(err);

        return res.status(500).json({
            success: false,
            message: "Unable to register user",
        });
    }
}

export async function login(req, res) {
    try {
        const { email, password } = req.body;

        if (!email ||
            email.trim() === "" ||
            !password ||
            password.trim() === ""
        ) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required.",
            });
        }

        const result = await pool.query(
            "SELECT * FROM users WHERE email = $1", [email]
        );
        if (result.rows.length === 0) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password.",
            });
        }
        const user = result.rows[0];
        console.log(user);
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password.",
            });
        }
        const token = jwt.sign({
                id: user.id,
                email: user.email,
            },
            process.env.JWT_SECRET, {
                expiresIn: "7d",
            }
        );
        return res.status(200).json({
            success: true,
            message: "Login successful.",
            token,
        });




    } catch (err) {
        console.error(err);

        return res.status(500).json({
            success: false,
            message: "Unable to login",
        });
    }
}