import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    const [groceries, setGroceries] = useState([]);
    const [groceryTotal, setGroceryTotal] = useState(0);
    const [refresh, setRefresh] = useState(false);
    const API = import.meta.env.VITE_BASE_URL;

    useEffect(() => {
        fetch(API)
            .then(res => res.json())
            .then(res => {
                setGroceries(res);
                const totalCost = res.reduce((total, grocery) => total + grocery.amount, 0);
                setGroceryTotal(parseFloat(totalCost))
            })
            .catch(err => console.err(err))
    }, [API, refresh])

    return (
        <div>
            { groceries.map((grocery) => {
                return (
                    <div key={grocery.id}>
                        <Link to={`/groceries/${grocery.id}`}>{grocery.item_name}</Link>
                    </div>
                )
            })}
            <h2>Total Cost: ${groceryTotal.toFixed(2)}</h2>
        </div>
    )
}

export default Home;

