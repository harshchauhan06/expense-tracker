import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import AddIcon from '@mui/icons-material/Add';
import React ,{ useState } from "react";
import DropDown from './dropDown';
import { useEffect } from "react";
import {
  
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
} from "@mui/material";

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
  onClose={() => {
    props.setOpen(false);
    props.setEditingExpense(null);
  }}
>
        <DialogTitle>
  {props.editingExpense
    ? "Edit Expense"
    : "Add Expense"}
</DialogTitle>

        <DialogContent>
          <TextField
            label="Amount"
            name="amount"
            type="number"
            fullWidth
            value={amount.amount}
            margin="normal"
            onChange={handleChange}
          />

          <TextField
            label="Name"
            name="name"
            fullWidth
            margin="normal"
            value={amount.name}
            onChange={handleChange}
          />
          <TextField
            label="Description"
            fullWidth
            margin="normal"
            value={amount.description}
            onChange={handleChange}
            name="description"
          />
          <DropDown  value={amount.category}
  onChange={(value) =>
    setAmount((prev) => ({
      ...prev,
      category: value,
    }))
  } />
        </DialogContent>

        <DialogActions>
          <Button
  onClick={() => {
    props.setOpen(false);
    props.setEditingExpense(null);
  }}
>
            Cancel
          </Button>

          <Button variant="contained" onClick={() => {

  if (props.editingExpense) {

    props.onUpdateExpense(amount);

    props.setEditingExpense(null);

  } else {

    props.onAddExpense({
      id: Date.now(),
      ...amount,
      date: new Date().toLocaleDateString(),
    });

  }

  props.setOpen(false);

  setAmount({
    amount: '',
    name: '',
    description: '',
    category: '',
  });

}}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}