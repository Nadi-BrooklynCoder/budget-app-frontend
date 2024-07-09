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
                setGroceryTotal(parseFloat(totalCost));
            })
            .catch(err => console.err(err));
    }, [API, refresh]);

    let color;
    if (groceryTotal > 100) {
        color = 'green';
    } else if (groceryTotal >= 0) {
        color = 'orange';
    } else {
        color = 'green';
    }

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Item</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {groceries.map((grocery) => (
                        typeof grocery.amount === 'number' ? (
                        <tr key={grocery.id}>
                            <td><Link to={`/groceries/${grocery.id}`}>{grocery.item_name}</Link></td>
                            <td>${typeof grocery.amount === 'number' ? grocery.amount.toFixed(2) : 'Not valid'}</td>
                        </tr>
                    ))}
                    <tr>
                        <td>Total Cost:</td>
                        <td style={{ color: color }}>${typeof groceryTotal === 'number' ? groceryTotal.toFixed(2) : 'Not valid'}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default Home;



