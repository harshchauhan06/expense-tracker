import "./dashboard.css";
import AddButton from "./add_button";
import ExpenseTable from './expense_table';
import ExpensePieChart from './pieChart';
 
import {React , useState , useEffect} from "react";
 

function Dashboard(props){
     

function AddExpense(expense) {
    props.setExpenses((prevExpenses) => [expense, ...prevExpenses]);
    
  }

    function DeleteExpense(id) {
    props.setExpenses((prevExpenses) => prevExpenses.filter((expense) => expense.id !== id));
  }

  function editExpense(expense) {
  props.setEditingExpense(expense);
}

function updateExpense(updatedExpense) {
  props.setExpenses((prev) =>
    prev.map((expense) =>
      expense.id === updatedExpense.id
        ? updatedExpense
        : expense
    )
  );
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
            onAddExpense={AddExpense}
            onUpdateExpense={updateExpense}
            editingExpense={props.editingExpense}
            setEditingExpense={props.setEditingExpense}
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