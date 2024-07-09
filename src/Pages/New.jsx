import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid'

const New = ( { onAdd }) => {
    const navigate = useNavigate();
    const [newGrocery, setNewGrocery] = useState({
        id: uuidv4(),
        item_name:"",
        amount: "",
        date: "",
        from: "",
        category: ""
    });
    const API = import.meta.env.VITE_BASE_URL;

    const handleChange = (e) => {
        setNewGrocery((prev) => {
            const value = e.target.name === 'amount' ? parseFloat(e.target.value) : e.target.value;
            return { ...prev, [e.target.name]: value };
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch(API, {
            method: "POST",
            body: JSON.stringify(newGrocery),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(res => {
                onAdd(res);
                setTimeout (() => navigate(`/groceries/${res.id}`), 1000);
            })
            
            .catch(err => console.log(err));
    };

    return (
        <form onSubmit={handleSubmit}>
            <fieldset>
                <legend>New Grocery Item</legend>
                <label htmlFor="item_name">Item Name: </label>
                <input 
                    type="text"
                    placeholder="Item"
                    name="item_name"
                    value={newGrocery.item_name}
                    onChange={handleChange}
                />
                <br />
                <label htmlFor="amount">Price: </label>
                <input
                    type="number"
                    placeholder="0.00"
                    name="amount"
                    value={newGrocery.amount}
                    onChange={handleChange}
                />
                <br />
                <label htmlFor="date">Date: </label>
                <input 
                    type="date"
                    name="date"
                    value={newGrocery.date}
                    onChange={handleChange}
                />
                <br />
                <label htmlFor="from">SuperMarket: </label>
                <input 
                    type="text"
                    placeholder="Location Name"
                    name="from"
                    value={newGrocery.from}
                    onChange={handleChange}
                />
                <br />
                <label htmlFor="category">Category: </label>
                <input 
                    type="text"
                    placeholder="Item Type"
                    name="category"
                    value={newGrocery.category}
                    onChange={handleChange}
                />
                <br />
                <input type="submit" value="Add Item" />
            </fieldset>
        </form>
    )
}

export default New;