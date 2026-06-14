import './App.css';
import bankImage from './assets/bank.png';
import { useState } from 'react';

function App() {
  const [expenses, setExpenses] = useState([]);

  return (
    <div className="app">
      <h1 className="app-title">Expense Tracker</h1>
    <div>
      <img
        src={bankImage}
        alt="bank"
        className="bank-image"
      />
      <h2 className="total_expense">Total Expenses: 1</h2>
    </div>
    </div>
  );
}

export default App;