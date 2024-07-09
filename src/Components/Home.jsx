import React from 'react';
import { Link } from 'react-router-dom';

const Home = ({ groceries }) => {
    const groceryTotal = groceries.reduce((total, grocery) => total + (typeof grocery.amount === 'number' ? grocery.amount : 0), 0);


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
                            <td>{grocery.amount.toFixed(2)}</td>
                        </tr>
                    ) : null))}
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




