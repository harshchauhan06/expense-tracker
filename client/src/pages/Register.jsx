import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import API from "../api/api.js";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
} from "@mui/material";

export default function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const { name, email, password, confirmPassword } = formData;

    if (!name || !email || !password || !confirmPassword) {
      return toast.error("Please fill all fields.");
    }

    if (password !== confirmPassword) {
      return toast.error("Passwords do not match.");
    }

    if (password.length < 8) {
      return toast.error("Password must be at least 8 characters.");
    }

    try {
      setLoading(true);

      const response = await API.post("/auth/register", {
        name,
        email,
        password,
      });
      
      toast.success(response.data.message);

      navigate("/login");
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Registration failed."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        minHeight: "100vh",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Paper
        elevation={6}
        sx={{
          width: "100%",
          p: 5,
          borderRadius: 4,
        }}
      >
        <Typography
          variant="h4"
          textAlign="center"
          mb={4}
          sx={{
            color: "#F97316",
            fontWeight: 700,
          }}
        >
          Create Account
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 3,
          }}
        >
          <TextField
            label="Full Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            fullWidth
          />

          <TextField
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
          />

          <TextField
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            fullWidth
          />

          <TextField
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            fullWidth
          />

          <Button
            type="submit"
            variant="contained"
            disabled={loading}
            sx={{
              background: "#F97316",
              py: 1.4,
              borderRadius: "12px",
              textTransform: "none",
              fontSize: "16px",

              "&:hover": {
                background: "#EA580C",
              },
            }}
          >
            {loading ? "Creating Account..." : "Register"}
          </Button>

          <Typography
            textAlign="center"
            sx={{
              color: "#666",
            }}
          >
            Already have an account?{" "}
            <Link
              to="/login"
              style={{
                color: "#F97316",
                textDecoration: "none",
                fontWeight: 600,
              }}
            >
              Login
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}