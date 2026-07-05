import "./SearchBar.css";

import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";

export default function SearchBar({ search, setSearch }) {
  return (
    <div className="search-container">
     <TextField
  fullWidth
  variant="outlined"
  placeholder="Search by name, description or category..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  sx={{
    "& .MuiOutlinedInput-root": {
      height: "50px",
      borderRadius: "16px",
      backgroundColor: "#fff",
      transition: "all .25s ease",

      "& fieldset": {
        borderColor: "#FFD8B5",
        borderWidth: "2px",
      },

      "&:hover fieldset": {
        borderColor: "#F97316",
      },

      "&.Mui-focused fieldset": {
        borderColor: "#F97316",
      },

      "&.Mui-focused": {
        boxShadow: "0 0 8px rgba(249,115,22,.12)",
      },
    },

    "& .MuiInputBase-input": {
      height: "50px",
      display: "flex",
      alignItems: "center",
      boxSizing: "border-box",
    },
  }}
  slotProps={{
    input: {
      startAdornment: (
        <InputAdornment position="start">
          <SearchRoundedIcon
            sx={{
              color: "#F97316",
              fontSize: 22,
            }}
          />
        </InputAdornment>
      ),
    },
  }}
/>
    </div>
  );
}