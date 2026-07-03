import './App.css';
import Header from './components/header';
import Dashboard from './components/dashboard';
import Footer from './components/footer';
 
import { useState } from 'react';
 
 
function App() {
  const [open, setOpen] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);
  const [expenses, setExpenses] = useState([]);
 

  return (
    <>
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
      
       
</div>
<Footer />
</>
  );
}

export default App;