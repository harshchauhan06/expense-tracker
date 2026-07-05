import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import InputAdornment from "@mui/material/InputAdornment";
import FilterAltRoundedIcon from "@mui/icons-material/FilterAltRounded";

export default function CategoryFilter({
  categoryFilter,
  setCategoryFilter,
}) {
  return (
    <TextField
      select
      fullWidth
      value={categoryFilter}
      onChange={(e) => setCategoryFilter(e.target.value)}
      variant="outlined"
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <FilterAltRoundedIcon
                sx={{
                  color: "#F97316",
                  fontSize: 22,
                }}
              />
            </InputAdornment>
          ),
        },
      }}
      sx={{
        maxWidth: 220,

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
    >
      <MenuItem value="All">All Categories</MenuItem>
      <MenuItem value="Bills">Bills</MenuItem>
      <MenuItem value="Food">Food</MenuItem>
      <MenuItem value="Transport">Transport</MenuItem>
      <MenuItem value="Shopping">Shopping</MenuItem>
    </TextField>
  );
}