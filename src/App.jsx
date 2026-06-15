import './App.css';
import bankImage from './assets/bank.png';
import { useState } from 'react';
import  AddButton from './components/add_button';

function App() {
  const [expenses, setExpenses] = useState([]);

  function AddExpense(expense) {
    setExpenses((prevExpenses) => [...prevExpenses, expense]);
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
      <h2 className="total_expense">Total Expenses: {expenses.length}</h2>
      <AddButton onAddExpense={AddExpense}/>
    </div>
    </div>
  );
}

export default App;