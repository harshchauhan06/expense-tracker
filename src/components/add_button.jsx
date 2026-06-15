import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import AddIcon from '@mui/icons-material/Add';
import { useState } from "react";
import {
  
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
} from "@mui/material";

export default function AddButton(props) {
  const [open, setOpen] = useState(false);
  const [amount, setAmount]=useState({
    amount: '',
    name: '',
    description: '',
    date: new Date().toLocaleDateString(),
  })

  function handleChange(event) {
    const {name ,value} = event.target;
    setAmount((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));

  }

  return (
    <>
      <Button className="add-button" startIcon={<AddIcon />} onClick={() => setOpen(true)}>
        Add Expense
      </Button>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Add Expense</DialogTitle>

        <DialogContent>
          <TextField
            label="Amount"
            name="amount"
            type="number"
            fullWidth
            margin="normal"
            onChange={handleChange}
          />

          <TextField
            label="Name"
            name="name"
            fullWidth
            margin="normal"
            onChange={handleChange}
          />
          <TextField
            label="Description"
            fullWidth
            margin="normal"
            onChange={handleChange}
            name="description"
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpen(false)}>
            Cancel
          </Button>

          <Button variant="contained" onClick={() => {
            props.onAddExpense(amount);
            console.log(amount);
            setOpen(false);
             setAmount({
              amount: '',
              name: '',
              description: '',
            });
          }}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}