import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

const Edit = () => {
    const API = import.meta.env.VITE_BASE_URL;
    const[ grocery, setGrocery ] = useState({
        id: uuidv4(),
        item_name:"",
        amount: "",
        date: "",
        from: "",
        category: ""
    });
    const navigate = useNavigate();
    const{ id } = useParams();

    useEffect(() => {
        fetch(`${API}/${id}`)
            .then(res => res.json())
            .then(res => {
                setGrocery(() => res);
            })
            
            .catch(err => console.err(err));
    }, [id]);

    const handleChange = (e) => {
        setGrocery((prev) => {
            return{ ...prev, [e.target.name]: e.target.value};
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch(`${API}/${id}`, {
            method: "PUT",
            body: JSON.stringify(grocery),
            headers: {
                "Content-type": "application/json"
            }
        })
            .then(res => res.json())
            .then(res => {
                setTimeout (() => navigate(`/groceries/${res.id}`), 1000)
            })
            .catch(err => console.log(err));
    }

    if(!grocery) return <div>Loading...</div>
    return (
        <div>
            <form onSubmit={handleSubmit}>
            <fieldset>
                <legend>Grocery Item</legend>
                <input 
                    type="text"
                    placeholder="Item Name"
                    name="item_name"
                    value={grocery.item_name}
                    onChange={handleChange}
                />
                <br />
                <input
                    type="number"
                    placeholer="Item Price"
                    name="amount"
                    value={grocery.amount}
                    onChange={handleChange}
                />
                <br />
                <input 
                    type="date"
                    name="date"
                    value={grocery.date}
                    onChange={handleChange}
                />
                <br />
                <input 
                    type="text"
                    placeholder="Location"
                    name="from"
                    value={grocery.from}
                    onChange={handleChange}
                />
                <br />
                <input 
                    type="text"
                    placeholder="Item Type"
                    name="category"
                    value={grocery.category}
                    onChange={handleChange}
                />
                <br />
                <input type="submit" value="Add Item" />
            </fieldset>
        </form>
        </div>
    )
};

export default Edit;