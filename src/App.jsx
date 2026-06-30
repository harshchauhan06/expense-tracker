import './App.css';
import Header from './components/header';
import Dashboard from './components/dashboard';
 
import { useState } from 'react';
import  AddButton from './components/add_button';
import ExpenseTable from './components/expense_table';
import ExpensePieChart from './components/pieChart';
 
function App() {
  const [open, setOpen] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);
  const [expenses, setExpenses] = useState([]);

  function AddExpense(expense) {
    setExpenses((prevExpenses) => [expense, ...prevExpenses]);
    console.log(expenses);
  }

  function DeleteExpense(id) {
    setExpenses((prevExpenses) => prevExpenses.filter((expense) => expense.id !== id));
  }

  function editExpense(expense) {
  setEditingExpense(expense);
}

function updateExpense(updatedExpense) {
  setExpenses((prev) =>
    prev.map((expense) =>
      expense.id === updatedExpense.id
        ? updatedExpense
        : expense
    )
  );
}

  return (
    <div className="app">
      <Header expenses={expenses}/>
      <Dashboard 
      editingExpense ={editingExpense}
       setEditingExpense={setEditingExpense}
      expenses={expenses}
      setExpenses={setExpenses}
      open={open}
            setOpen={setOpen}
       />
      <div className="dashboard">
        <div className="left-panel">

      <div className="top-section">
         

        <div className="expense-info">
          <h2 className="total_expense">
            Total Expenses: ₹
            {expenses.reduce(
              (sum, expense) => sum + Number(expense.amount),
              0
            )}
          </h2>

          <AddButton
            open={open}
            setOpen={setOpen}
            onAddExpense={AddExpense}
            onUpdateExpense={updateExpense}
            editingExpense={editingExpense}
            setEditingExpense={setEditingExpense}
          />
        </div>
      </div>

      <ExpenseTable
        expenses={expenses}
        onDelete={DeleteExpense}
        onEdit={editExpense}
      />
    </div>

     

  </div>
</div>
  );
}

export default App;