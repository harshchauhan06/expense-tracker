import Button from "@mui/material/Button";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import { useNavigate } from "react-router-dom";

export default function LogoutButton() {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/login");
  }

  return (
    <Button
      variant="contained"
      startIcon={<LogoutRoundedIcon />}
      className="floating-logout"
      onClick={handleLogout}
    >
      Logout
    </Button>
  );
}