import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import NavBar from './Components/NavBar';
import Home from './Components/Home';
import Show from './Pages/Show';
import New from './Pages/New';
import Edit from './Pages/Edit';
import './App.css';

function App() {
    const [groceries, setGroceries] = useState([]);
    const API = import.meta.env.VITE_BASE_URL;

    useEffect(() => {
        fetch(API)
            .then(res => res.json())
            .then(res => setGroceries(res))
            .catch(err => console.err(err));
    }, []);

    const handleDelete = (id) => {
        fetch(`${API}/${id}`, {
            method: "DELETE"
        })
            .then(() => setGroceries(groceries.filter(grocery => grocery.id !== id)))
            .catch(err => console.err(err));
    }

    return (
        <div>
            <NavBar />
            <Routes>
                <Route path="/" element={<Navigate to="/groceries" replace/>} />
                <Route path="/groceries" element={<Home groceries={groceries} />} />
                <Route path="/groceries/new" element={<New />} />
                <Route path="/groceries/:id" element={<Show onDelete={handleDelete} />} />
                <Route path="groceries/:id/edit" element={<Edit />} />
            </Routes>
        </div>
    )
}

export default App;

