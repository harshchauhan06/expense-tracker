import React, { useState , useEffect } from "react";
import "./expenseTable.css";

export default function ExpenseTable(props) {
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [menuPosition, setMenuPosition] = useState(null);
 
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

  {props.expenses.map((expense) => (
    <div className="table-row" key={expense.id} onContextMenu={(event) => handleRightClick(event, expense)}>
      <span>₹{expense.amount}</span>
      <span>{expense.name}</span>
      <span>{expense.description}</span>
      <span className="category">{expense.category}</span>
      <span>{expense.date}</span>
    </div>
  ))}
  {menuPosition && (
<div
  className="context-menu"
  onClick={(e) => e.stopPropagation()}
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
  style={{
    display: "flex",
    flexDirection: "column",
    gap: "5px",
  }}
>
  <button
    onClick={() => {
      props.onEdit(selectedExpense);
       
      setMenuPosition(null);
    }}
  >
    Edit
  </button>

  <button
    onClick={() => {
      props.onDelete(selectedExpense.id);
      setMenuPosition(null);
    }}
  >
    Delete
  </button>
</div>
     
  </div>
)}
    </div>
  </>);
}