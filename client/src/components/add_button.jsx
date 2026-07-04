import Button from '@mui/material/Button';
import './add_button.css'
import Stack from '@mui/material/Stack';
import AddIcon from '@mui/icons-material/Add';
import React ,{ useState } from "react";
import DropDown from './dropDown';
import { useEffect } from "react";
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
  
  const [amount, setAmount]=useState({
    amount: '',
    name: '',
    description: '',
    category: '',
  })

  function handleChange(event) {
    const {name ,value} = event.target;
    setAmount((prevValue) => ({
      ...prevValue,
      [name]: value,
      
    }));

  }
  useEffect(() => {
  if (props.editingExpense) {
    setAmount(props.editingExpense);
    props.setOpen(true);
  }
}, [props.editingExpense]);
async function handleSave() {
  try {
    if (props.editingExpense) {
      await API.put(
        `/expenses/${props.editingExpense.id}`,
        {
          name: amount.name,
          description: amount.description,
          category: amount.category,
          amount: Number(amount.amount),
          expense_date: new Date().toISOString().split("T")[0],
        }
      );
    } else {
      await API.post("/expenses", {
        name: amount.name,
        description: amount.description,
        category: amount.category,
        amount: Number(amount.amount),
        expense_date: new Date().toISOString().split("T")[0],
      });
    }

    
    await props.fetchExpenses();

    props.setOpen(false);
    props.setEditingExpense(null);

    setAmount({
      amount: "",
      name: "",
      description: "",
      category: "",
    });

  } catch (err) {
    console.error(err);
  }
}
  return (
    <>
      <Button
  className="add-button"
  startIcon={<AddIcon />}
  onClick={() => {
    props.setEditingExpense(null);

    setAmount({
      amount: "",
      name: "",
      description: "",
      category: "",
    });

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
    props.setOpen(false);
    props.setEditingExpense(null);

    setAmount({
      amount: "",
      name: "",
      description: "",
      category: "",
    });
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
      value={amount.amount}
      margin="normal"
      onChange={handleChange}
    />

    <TextField
      label="Name"
      name="name"
      fullWidth
      placeholder="Expense name"
      value={amount.name}
      margin="normal"
      onChange={handleChange}
    />

    <TextField
      label="Description"
      name="description"
      fullWidth
      placeholder="Short description"
      value={amount.description}
      margin="normal"
      onChange={handleChange}
    />

    <DropDown
      value={amount.category}
      onChange={(value) =>
        setAmount((prev) => ({
          ...prev,
          category: value,
        }))
      }
    />

  </DialogContent>

  <DialogActions>

    <Button
      className="dialog-cancel"
      onClick={() => {
        props.setOpen(false);
        props.setEditingExpense(null);

        setAmount({
          amount: "",
          name: "",
          description: "",
          category: "",
        });
      }}
    >
      Cancel
    </Button>

   <Button
  className="dialog-save"
  variant="contained"
  onClick={handleSave}
>
  Save
</Button>

  </DialogActions>
</Dialog>
    </>
  );
}