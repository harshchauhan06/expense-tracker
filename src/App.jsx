import './App.css';
import bankImage from './assets/bank.png';
import { useState } from 'react';
import  AddButton from './components/add_button';
import ExpenseTable from './components/expense_table';
 
function App() {
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
      <h1 className="app-title">Expense Tracker</h1>
       

    <div>
      <img
        src={bankImage}
        alt="bank"
        className="bank-image"
      />
      
      <AddButton
  onAddExpense={AddExpense}
  onUpdateExpense={updateExpense}
  editingExpense={editingExpense}
  setEditingExpense={setEditingExpense}
/>
    </div>
    <ExpenseTable expenses={expenses}   
  onDelete={DeleteExpense}
  onEdit={editExpense}
  />
     
    
    </div>
  );
}

export default App;