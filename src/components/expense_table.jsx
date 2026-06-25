import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import React, { useState , useEffect } from "react";

export default function ExpenseTable(props) {
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [menuPosition, setMenuPosition] = useState(null);
 
  function handleRightClick(event, expense) {
    event.preventDefault();
    setSelectedExpense(expense);
    setMenuPosition({ y: event.clientY, x: event.clientX });
     console.log(event.clientX, event.clientY);
  }

  useEffect(() => {
  function handleClick() {
    setMenuPosition(null);
  }

  window.addEventListener("click", handleClick);

  return () => {
    window.removeEventListener("click", handleClick);
  };
}, []);



  return (
    <>
    
     <h2 className="total_expense">
        Total Expenses: ₹
        {props.expenses.reduce(
          (sum, expense) => sum + Number(expense.amount),
          0
        )}
      </h2>
   
     <div className="expense-table ">
      <div className="table-header">
    <span>Amount</span>
    <span>Name</span>
    <span>Description</span>
    <span>Category</span>
    <span>Date</span>
  </div>

  {props.expenses.map((expense) => (
    <div className="table-row" key={expense.id} onContextMenu={(event) => handleRightClick(event, expense)}>
      <span>₹{expense.amount}</span>
      <span>{expense.name}</span>
      <span>{expense.description}</span>
      <span>{expense.category}</span>
      <span>{expense.date}</span>
    </div>
  ))}
  {menuPosition && (
  <div
    style={{
      position: "fixed",
      top: menuPosition.y,
      left: menuPosition.x,
      background: "white",
      border: "1px solid gray",
      padding: "5px",
      zIndex: 1000,
    }}
  >
    <div
  onClick={() => {
    props.onEdit(selectedExpense);
    setMenuPosition(null);
  }}
>
  Edit
</div>
    <button
  onClick={() => props.onDelete(props.expenses.find((e) => e.id === selectedExpense.id)?.id)}
>
  Delete
</button>
    
     
  </div>
)}
    </div>
  </>);
}