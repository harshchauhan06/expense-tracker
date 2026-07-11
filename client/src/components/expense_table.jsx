import React, { useState , useEffect } from "react";
import "./expenseTable.css";
import Button from '@mui/material/Button';
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import SwapVertRoundedIcon from "@mui/icons-material/SwapVertRounded";
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
const [sortAnchor, setSortAnchor] = useState(null);
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



function sortExpenses(expenses, sortBy) {
  switch (sortBy) {
    case "newest":
      return expenses.sort(
        (a, b) => Date.parse(b.expense_date) - Date.parse(a.expense_date)
      );

    case "oldest":
      return expenses.sort(
        (a, b) => Date.parse(a.expense_date) - Date.parse(b.expense_date)
      );

    case "highest":
      return expenses.sort(
        (a, b) => Number(b.amount) - Number(a.amount)
      );

    case "lowest":
      return expenses.sort(
        (a, b) => Number(a.amount) - Number(b.amount)
      );

    case "az":
      return expenses.sort((a, b) => a.name.localeCompare(b.name));

    case "za":
      return expenses.sort((a, b) => b.name.localeCompare(a.name));

    default:
      return expenses;
  }
}
 

const sortedExpenses = sortExpenses(
  [...filteredExpenses],
  props.sortBy || "newest"
);
   console.log("Sorted Expenses:", sortedExpenses);
  return (
    <>
    
     
   
     <div className="expense-table ">
       <div className="table-scroll"> 
       
       
      <div className="table-header">
    <span>Amount</span>
    <span>Name</span>
    <span>Description</span>
    <span className="category">Category</span>
    <span className="date-header">
  Date

  <SwapVertRoundedIcon
    className="sort-icon"
    sx={{
        fontSize: 25,
    }}
    onClick={(e) => {
      e.stopPropagation();
      setSortAnchor(e.currentTarget);
    }}
  />
</span>
  </div>
  <div className="table-body"> 



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
   
  sortedExpenses.map((expense) => (
    
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
<Menu
  anchorEl={sortAnchor}
  open={Boolean(sortAnchor)}
  onClose={() => setSortAnchor(null)}
>
  <MenuItem
    selected={props.sortBy === "newest"}
    onClick={() => {
      props.setSortBy("newest");
      setSortAnchor(null);
    }}
  >
    Newest First
  </MenuItem>

  <MenuItem
    selected={props.sortBy === "oldest"}
    onClick={() => {
      props.setSortBy("oldest");
      setSortAnchor(null);
    }}
  >
    Oldest First
  </MenuItem>

  <MenuItem
    selected={props.sortBy === "highest"}
    onClick={() => {
      props.setSortBy("highest");
      setSortAnchor(null);
    }}
  >
    Highest Amount
  </MenuItem>

  <MenuItem
    selected={props.sortBy === "lowest"}
    onClick={() => {
      props.setSortBy("lowest");
      setSortAnchor(null);
    }}
  >
    Lowest Amount
  </MenuItem>

  <MenuItem
    selected={props.sortBy === "az"}
    onClick={() => {
      props.setSortBy("az");
      setSortAnchor(null);
    }}
  >
    Name (A-Z)
  </MenuItem>

  <MenuItem
    selected={props.sortBy === "za"}
    onClick={() => {
      props.setSortBy("za");
      setSortAnchor(null);
    }}
  >
    Name (Z-A)
  </MenuItem>
</Menu>
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
    </div>
    </div>
  </>);
}