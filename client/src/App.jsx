import './App.css';
import Header from './components/header';
import Dashboard from './components/dashboard';
import Footer from './components/footer';

 
import { useEffect } from 'react';
import { useState } from 'react';
import API from './api/api';
 
 
function App() {
  const [open, setOpen] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);
  const [expenses, setExpenses] = useState([]);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [sortBy, setSortBy] = useState("newest");
  console.log("Expenses state:", expenses);
 useEffect(() => {
  fetchExpenses();
}, []);

async function fetchExpenses() {
  console.log("Fetching expenses...");

  try {
    const response = await API.get("/expenses");
    console.log(response.data);

    setExpenses(response.data);
  } catch (error) {
    console.error(error);
  }
}

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
      search={search}
    setSearch={setSearch}
     categoryFilter={categoryFilter}
  setCategoryFilter={setCategoryFilter}
            setOpen={setOpen}
            fetchExpenses={fetchExpenses}
            sortBy={sortBy}
  setSortBy={setSortBy}
       />
      
       
</div>
<Footer />
</>
  );
}

export default App;