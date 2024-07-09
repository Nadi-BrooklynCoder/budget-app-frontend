import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

const Show = () => {
    const [grocery, setGrocery] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();
    const API = import.meta.env.VITE_BASE_URL;

    const handleDelete = () => {
        fetch(`${API}/${id}`, {
            method: "DELETE"
        })
            .then(res => res.json())
            .then(navigate('/groceries'))
            .catch(err => console.err(err))
    }

    useEffect(() => {
        fetch(`${API}/${id}`)
            .then(res => res.json())
            .then(res => {
                setGrocery(res)
            })
            .catch(err => console.err(err))
    },[])

    return (
        <div>
            {grocery &&
            <div className="grocery">
                <h2>{grocery.item_name}</h2>
                <h4>${grocery.amount}</h4>
                <h4>{grocery.date}</h4>
                <h4>{grocery.from}</h4>
                <h5>{grocery.category}</h5>
            </div> 
        }
        <Link to={`/groceries/${id}/edit`}>
            <button>Edit</button>
        </Link>
        <button onClick={handleDelete}>Delete</button>
        </div>
    )
}

export default Show;