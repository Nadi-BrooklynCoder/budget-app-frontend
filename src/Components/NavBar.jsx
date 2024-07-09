import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
    return (
        <nav>
            <h1>
                <Link to ="/groceries">Grocery Items</Link>
            </h1>
            <ul>
                <li>
                    <Link to="/groceries/new">Add Grocery Item</Link>
                </li>
            </ul>
        </nav>
    )
}

export default NavBar;