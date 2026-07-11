import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import API from "../api/api";

import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
} from "@mui/material";

export default function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
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

    const { email, password } = formData;

    if (!email || !password) {
      return toast.error("Please fill all fields.");
    }

    try {
      setLoading(true);

      const response = await API.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", response.data.token);

      toast.success(response.data.message);

      navigate("/dashboard");
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Login failed."
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
          Welcome Back
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
            {loading ? "Signing In..." : "Login"}
          </Button>

          <Typography
            textAlign="center"
            sx={{
              color: "#666",
            }}
          >
            Don't have an account?{" "}
            <Link
              to="/register"
              style={{
                color: "#F97316",
                textDecoration: "none",
                fontWeight: 600,
              }}
            >
              Register
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}