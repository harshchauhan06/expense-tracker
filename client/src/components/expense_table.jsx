import React, { useState , useEffect } from "react";
import "./expenseTable.css";
import Button from '@mui/material/Button';
 
import Zoom from "@mui/material/Zoom";
import {
  
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ReceiptLongRoundedIcon from "@mui/icons-material/ReceiptLongRounded";
import RestaurantRoundedIcon from "@mui/icons-material/RestaurantRounded";
import DirectionsBusRoundedIcon from "@mui/icons-material/DirectionsBusRounded";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";

export default function ExpenseTable(props) {
  console.log("ExpenseTable props:", props.expenses);
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [menuPosition, setMenuPosition] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
const [expenseToDelete, setExpenseToDelete] = useState(null);
  const categoryIcons = {
  Bills: <ReceiptLongRoundedIcon className="category-icon bills-icon" />,
  Food: <RestaurantRoundedIcon className="category-icon food-icon" />,
  Transport: <DirectionsBusRoundedIcon className="category-icon transport-icon" />,
  Shopping: <ShoppingCartRoundedIcon className="category-icon shopping-icon" />,
};
  function handleRightClick(event, expense) {
  event.preventDefault();
  console.log("Right click");

  setSelectedExpense(expense);
  setMenuPosition({
    y: event.clientY,
    x: event.clientX,
  });
}

  useEffect(() => {
  function handleClick() {
  console.log("Window click");
  setMenuPosition(null);
}

  window.addEventListener("click", handleClick);

  return () => {
    window.removeEventListener("click", handleClick);
  };
}, []);

  const filteredExpenses = props.expenses.filter((expense) => {
  const query = (props.search || "").toLowerCase().trim();

  const matchesSearch =
    !query ||
    expense.name.toLowerCase().includes(query) ||
    expense.description.toLowerCase().includes(query) ||
    expense.category.toLowerCase().includes(query);

  const matchesCategory =
    props.categoryFilter === "All" ||
    expense.category === props.categoryFilter;

  return matchesSearch && matchesCategory;
});
  return (
    <>
    
     
   
     <div className="expense-table ">
       
       
      <div className="table-header">
    <span>Amount</span>
    <span>Name</span>
    <span>Description</span>
    <span className="category">Category</span>
    <span>Date</span>
  </div>



{filteredExpenses.length === 0 ? (
  props.expenses.length === 0 ? (
    <div className="empty-table">
      <div className="empty-table-icon">📋</div>
      <h3>No expenses yet</h3>
      <p>Start tracking your spending by adding your first expense.</p>
    </div>
  ) : (
    <div className="empty-table">
      <div className="empty-table-icon">🔍</div>
      <h3>No matching expenses</h3>
      <p>Try a different search keyword.</p>
    </div>
  )
) : (
  filteredExpenses.map((expense) => (
        <div
      className="table-row"
      key={expense.id}
      onContextMenu={(event) => handleRightClick(event, expense)}
    >
      <span>₹{expense.amount}</span>

      <span title={expense.name}>
        {expense.name}
      </span>

      <span title={expense.description}>
        {expense.description}
      </span>

      <span>
        <span
          className={`category-badge ${expense.category.toLowerCase()}`}
        >
          {categoryIcons[expense.category]}
          {expense.category}
        </span>
      </span>

      <span>
  {new Date(expense.expense_date).toLocaleDateString("en-IN")}
</span>
    </div>
  ))
)}



 
{menuPosition && (
  <div
    className="context-menu"
    onClick={(e) => e.stopPropagation()}
    style={{
      top: menuPosition.y,
      left: menuPosition.x,
    }}
  >
    <button
      className="menu-btn edit-btn"
      onClick={() => {
        props.onEdit(selectedExpense);
        setMenuPosition(null);
      }}
    >
      ✏️ Edit
    </button>

<button
  className="menu-btn delete-btn"
  onClick={() => {
   setExpenseToDelete(selectedExpense);
setDeleteDialogOpen(true);
setMenuPosition(null);
   
    
  }}
>
  🗑 Delete
</button>
 
    
  </div>
)}
<Dialog
  TransitionComponent={Zoom}
  open={deleteDialogOpen}
  onClose={() => {
    setDeleteDialogOpen(false);
    setExpenseToDelete(null);
  }}
  PaperProps={{
    className: "delete-dialog-paper",
  }}
>
  <DialogTitle className="delete-title">
    <DeleteIcon
      sx={{
        color: "#F97316",
        fontSize: 30,
      }}
    />
    Delete Expense
  </DialogTitle>

  <DialogContent>
    <p className="delete-text">
      Are you sure you want to permanently delete
      <strong> "{expenseToDelete?.name}"</strong>?
    </p>

    <p className="warning-text">
      This action cannot be undone.
    </p>
  </DialogContent>

  <DialogActions className="delete-actions">
    <Button
      variant="outlined"
      className="cancel-btn"
      onClick={() => {
        setDeleteDialogOpen(false);
        setExpenseToDelete(null);
      }}
    >
      Cancel
    </Button>

    <Button
      variant="contained"
      className="delete-btn-dialog"
      onClick={async () => {
        await props.onDelete(expenseToDelete.id);

        setDeleteDialogOpen(false);
        setExpenseToDelete(null);
      }}
    >
      Delete
    </Button>
  </DialogActions>
</Dialog>
    </div>
  </>);
}