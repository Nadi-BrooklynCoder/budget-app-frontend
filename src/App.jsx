import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import NavBar from './Components/NavBar';
import Home from './Components/Home';
import Show from './Pages/Show';
import New from './Pages/New';
import Edit from './Pages/Edit';
import './App.css';



function App() {
  const [refresh, setRefresh] = useState(false);

  const handleNewItem = () => {
    setRefresh(prev => !prev)
  }

  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<Navigate to="/groceries" replace/>} />
        <Route path="/groceries" element={<Home refresh={refresh} />} />
        <Route path="/groceries/new" element={<New  newItem={handleNewItem} />} />
        <Route path="/groceries/:id" element={<Show />} />
        <Route path="groceries/:id/edit" element={<Edit />} />
      </Routes>
    </div>
  )
}

export default App
