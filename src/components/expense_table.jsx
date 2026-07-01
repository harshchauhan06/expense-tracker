import React, { useState , useEffect } from "react";
import "./expenseTable.css";
import ReceiptLongRoundedIcon from "@mui/icons-material/ReceiptLongRounded";
import RestaurantRoundedIcon from "@mui/icons-material/RestaurantRounded";
import DirectionsBusRoundedIcon from "@mui/icons-material/DirectionsBusRounded";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";

export default function ExpenseTable(props) {
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [menuPosition, setMenuPosition] = useState(null);
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

{props.expenses.length === 0 ? (
  <div className="empty-table">
    <div className="empty-table-icon">📋</div>

    <h3>No expenses yet</h3>

    <p>
      Start tracking your spending by adding your first expense.
    </p>
  </div>
) : (
  props.expenses.map((expense) => (
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

      <span>{expense.date}</span>
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
        props.onDelete(selectedExpense.id);
        setMenuPosition(null);
      }}
    >
      🗑 Delete
    </button>
    
  </div>
)}
    </div>
  </>);
}