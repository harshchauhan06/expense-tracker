import "./dashboard.css";
import AddButton from "./add_button";
import ExpenseTable from './expense_table';
import ExpensePieChart from './pieChart';
 
import API from "../api/api";
 
import {React , useState , useEffect} from "react";
 

function Dashboard(props){
     

 

async function DeleteExpense(id) {
  try {
    await API.delete(
      `/expenses/${id}`
    );

    await props.fetchExpenses();

  } catch (err) {
    console.error(err);
  }
}

  function editExpense(expense) {
  props.setEditingExpense(expense);
}

function updateExpense( ) {
   
}

return (
   <div>
    <div className="topDashboard">
     
        <div className="dashboardHeading">
           <span className="expense-label weird">Total Expenses</span>

    <h2 className="Total_expense weird underline">
      ₹{" "}
      {props.expenses
        .reduce((sum, expense) => sum + Number(expense.amount), 0)
        .toLocaleString("en-IN")}
    </h2>
        </div>

        <div className="button-wrapper">
          <AddButton
    open={props.open}
    setOpen={props.setOpen}
    editingExpense={props.editingExpense}
    setEditingExpense={props.setEditingExpense}
    fetchExpenses={props.fetchExpenses}
/>
        </div>
     
</div>
     
  <div className="dashboard-content">
    <ExpenseTable
        expenses={props.expenses}
        onDelete={DeleteExpense}
        onEdit={editExpense}
    />

    <ExpensePieChart
        expenses={props.expenses}
        setOpen={props.setOpen}
    />
</div>
          </div>
);
}
export default Dashboard;