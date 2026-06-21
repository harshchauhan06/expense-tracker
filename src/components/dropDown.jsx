import React from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

function DropDown({ value, onChange }) {
  return (
    <FormControl fullWidth sx={{ mt: 2 }}>
      <InputLabel>Category</InputLabel>

      <Select
        value={value}
        label="Category"
        onChange={(e) => onChange(e.target.value)}
      >
        <MenuItem value="Food">Food</MenuItem>
        <MenuItem value="Transport">Transport</MenuItem>
        <MenuItem value="Shopping">Shopping</MenuItem>
        <MenuItem value="Bills">Bills</MenuItem>
      </Select>
    </FormControl>
  );
}

export default DropDown;