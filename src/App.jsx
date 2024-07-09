// app.jsx
import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import NavBar from './Components/NavBar';
import Home from './Components/Home';
import Show from './Pages/Show';
import New from './Pages/New';
import Edit from './Pages/Edit';
import './App.css';

const App = () => {
  const [groceries, setGroceries] = useState([]);
  const API = import.meta.env.VITE_BASE_URL;

  const handleAdd = (newGrocery) => {
    setGroceries([...groceries, newGrocery]);
  };

  useEffect(() => {
    fetch(API)
      .then(res => res.json())
      .then(data => setGroceries(data))
      .catch(err => console.error(err));
  }, []);

  const handleUpdate = (updatedGrocery) => {
    setGroceries(groceries.map(grocery => grocery.id === updatedGrocery.id ? updatedGrocery : grocery));
  };

  const handleDelete = (id) => {
    setGroceries(groceries.filter(grocery => grocery.id !== id));
  };

  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<Navigate to="/groceries" replace/>} />
        <Route path="/groceries" element={<Home groceries={groceries}  />} />
        <Route path="/groceries/new" element={<New onAdd={handleAdd} />} />
        <Route path="/groceries/:id" element={<Show handleUpdate={handleUpdate} onDelete={handleDelete} />} />
        <Route path="groceries/:id/edit" element={<Edit handleUpdate={handleUpdate} />} />
      </Routes>
    </div>
  );
};

export default App;


