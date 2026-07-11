import "./dashboard.css";
import AddButton from "./add_button";
import ExpenseTable from './expense_table';
import ExpensePieChart from './pieChart';
import toast from "react-hot-toast";
import API from "../api/api";
import SearchBar from "./SearchBar";
import CategoryFilter from "./CategoryFilter";
 
 
import {React , useState , useEffect} from "react";
 

function Dashboard(props){
     

 

async function DeleteExpense(id) {
  try {
    await API.delete(
      `/expenses/${id}`
    );
    toast.success("Expense Deleted Successfully!");

    await props.fetchExpenses();

  } catch (err) {
    console.error(err);
  }
}

  function editExpense(expense) {
    console.log(expense.expense_date);
  props.setEditingExpense(expense);
  
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
<div className="toolbar">

    <SearchBar
        search={props.search}
        setSearch={props.setSearch}
    />

    <CategoryFilter
        categoryFilter={props.categoryFilter}
        setCategoryFilter={props.setCategoryFilter}
    />

    

</div>
     
  <div className="dashboard-content">
    <ExpenseTable
        expenses={props.expenses}
        onDelete={DeleteExpense}
        onEdit={editExpense}
          expenses={props.expenses}
  search={props.search}
  categoryFilter={props.categoryFilter}
 sortBy={props.sortBy}
    setSortBy={props.setSortBy}
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