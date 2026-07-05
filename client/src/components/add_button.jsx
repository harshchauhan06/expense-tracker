import Button from '@mui/material/Button';
import './add_button.css'
import Stack from '@mui/material/Stack';
import AddIcon from '@mui/icons-material/Add';
import React ,{ useState } from "react";
import DropDown from './dropDown';
import { useEffect } from "react";
import toast from "react-hot-toast";
import AttachMoneyRoundedIcon from "@mui/icons-material/AttachMoneyRounded";

import {
  
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
} from "@mui/material";
 
import API from "../api/api";

export default function AddButton(props) {
  
  const [expenseData, setExpenseData]=useState({
    amount: '',
    name: '',
    description: '',
    category: '',
  })
  const [errors, setErrors] = useState({
  name: "",
  amount: "",
  category: "",
  description: "",
});
const [loading, setLoading] = useState(false);

function validateForm() {
  const newErrors = {};

if (expenseData.name.trim().length < 3) {
    newErrors.name =
      "Expense name must be at least 3 characters";
}

const value = Number(expenseData.amount);

if (Number.isNaN(value) || value <= 0) {
    newErrors.amount =
      "Amount must be greater than 0";
}

   if (expenseData.description.length > 250) {
  newErrors.description =
    "Description cannot exceed 250 characters";
}
if (!expenseData.category) {
  newErrors.category = "Please select a category";
}

  setErrors(newErrors);

  return Object.keys(newErrors).length === 0;
}

  function handleChange(event) {
    const {name ,value} = event.target;
    setExpenseData((prevValue) => ({
      ...prevValue,
      [name]: value,
      
    }));

      setErrors((prev) => ({
    ...prev,
    [name]: "",
  }));
}

  
  useEffect(() => {
  if (props.editingExpense) {
    setExpenseData(props.editingExpense);
    props.setOpen(true);
  }
}, [props.editingExpense]);



async function handleSave() {
  if (!validateForm()) return;

  setLoading(true);

  try {
    const expensePayload = {
      name: expenseData.name,
      description: expenseData.description,
      category: expenseData.category,
      amount: Number(expenseData.amount),
      expense_date: props.editingExpense
        ? expenseData.expense_date
        : new Date().toISOString().split("T")[0],
    };

    if (props.editingExpense) {
      await API.put(
        `/expenses/${props.editingExpense.id}`,
        expensePayload
      );

      toast.success("Expense updated successfully!");
    } else {
      await API.post("/expenses", expensePayload);

      toast.success("Expense added successfully!");
    }

    await props.fetchExpenses();

    props.setOpen(false);
    resetForm();

  } catch (err) {
    console.error(err);
    toast.error("Failed to save expense.");
  } finally {
    setLoading(false);
  }
}

function resetForm() {
  setExpenseData({
    amount: "",
    name: "",
    description: "",
    category: "",
  });

  setErrors({
    name: "",
    amount: "",
    category: "",
    description: "",
  });

  props.setEditingExpense(null);
}


  return (
    <>
      <Button
  className="add-button"
  startIcon={<AddIcon />}
  onClick={() => {
 resetForm();

    props.setOpen(true);
  }}
>
  Add Expense
</Button>

<Dialog
  open={props.open}
  fullWidth
  maxWidth="sm"
  onClose={() => {
  if (loading) return;

  props.setOpen(false);
 resetForm();
}}
  PaperProps={{
    className: "expense-dialog-paper",
  }}
>
  <DialogTitle className="dialog-title">
    <AttachMoneyRoundedIcon
      sx={{
        color: "#F97316",
        fontSize: 36,
        mr: 1,
      }}
    />
    {props.editingExpense ? "Edit Expense" : "Add Expense"}
  </DialogTitle>

  <DialogContent>

    <TextField
      label="Amount"
      name="amount"
      type="number"
      fullWidth
      autoFocus
      placeholder="Enter amount"
      value={expenseData.amount}
      margin="normal"
      onChange={handleChange}
      error={Boolean(errors.amount)}
    helperText={errors.amount}
    />

    <TextField
      label="Name"
      name="name"
      fullWidth
      placeholder="Expense name"
      value={expenseData.name}
      margin="normal"
      onChange={handleChange}
      error={Boolean(errors.name)}
    helperText={errors.name}
    />

    <TextField
      label="Description"
      name="description"
      fullWidth
      placeholder="Short description"
      value={expenseData.description}
      margin="normal"
      onChange={handleChange}
      error={Boolean(errors.description)}
    helperText={errors.description}
    />
    

<DropDown
  value={expenseData.category}
  onChange={(value) => {
    setExpenseData((prev) => ({
      ...prev,
      category: value,
    }));

    setErrors((prev) => ({
      ...prev,
      category: "",
    }));
  }}
/>
{errors.category && (
  <p className="category-error">
    {errors.category}
  </p>
)}

  </DialogContent>

  <DialogActions>

    <Button
  className="dialog-cancel"
  disabled={loading}
  onClick={() => {
    props.setOpen(false);
 resetForm();
  }}
>
  Cancel
</Button>

<Button
  className="dialog-save"
  variant="contained"
  onClick={handleSave}
  disabled={loading}
>
  {loading ? "Saving..." : "Save"}
</Button>

  </DialogActions>
</Dialog>
    </>
  );
}