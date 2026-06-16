import './App.css';
import bankImage from './assets/bank.png';
import { useState } from 'react';
import  AddButton from './components/add_button';
import ExpenseTable from './components/expense_table';
function App() {
  const [expenses, setExpenses] = useState([]);

  function AddExpense(expense) {
    setExpenses((prevExpenses) => [expense, ...prevExpenses]);
    console.log(expenses);
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
      
      <AddButton onAddExpense={AddExpense}/>
    </div>
    <ExpenseTable expenses={expenses} />
     
    </div>
  );
}

export default App;