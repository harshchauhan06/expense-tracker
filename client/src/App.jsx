import './App.css';
import Header from './components/header';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from './components/dashboard';
import Footer from './components/footer';
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Navigate } from "react-router-dom";
import { useEffect } from 'react';
import { useState } from 'react';
import API from './api/api';
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
 
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
    console.log(JSON.stringify(response.data[0], null, 2));

    setExpenses(response.data);
  } catch (error) {
    console.error(error);
  }
}

  return (
    
     <BrowserRouter>
      <Routes>
        <Route path="/login" element={ <PublicRoute>
      <Login />
    </PublicRoute>} />
        <Route path="/register" element={<PublicRoute>
      <Register />
    </PublicRoute>} />
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/dashboard" element={
          
          <ProtectedRoute>
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
       </ProtectedRoute>
      } />
      </Routes>
    </BrowserRouter>
    

  );
}

export default App;