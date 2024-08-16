import React, { useState, useEffect } from 'react';
import './NewCreator.css'
import { useNavigate } from "react-router-dom";

const NewCreator = () => {

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });
    const [status, setStatus] = useState(null);
    const navigate = useNavigate(); 


    const handleChange = (e) =>{
        if (e.target.name === "username"){
            setFormData((prevData) => ({
                ...prevData,
                username: e.target.value
            }));
        }
        if (e.target.name === "email"){
            setFormData((prevData) => ({
                ...prevData,
                email: e.target.value
            }));
        }
        if (e.target.name === "password"){
            setFormData((prevData) => ({
                ...prevData,
                password: e.target.value
            }));
        }
    }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const response = await fetch('http://localhost:443/creator/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' // Indicates that the body of the request contains JSON
            },
            body: JSON.stringify(formData) // Convert dataToSend to JSON string
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.log(errorData)
            console.error('Error:', errorData); 
            throw new Error(errorData);
        }

        const result = await response.json();
        setStatus({ success: true, message: 'Creator added successfully!' });
        // Clear form fields
        setFormData({
            username: '',
            email: '',
            password: ''
        });
        navigate('/'); 
        } catch (error) {
        setStatus({ success: false, message: error.message });
    }
  };


    return (
        <>
            <div className="newCreatorPage">
                <p>New creator</p>
                <form onSubmit={handleSubmit} className="newCreator">
                    <div className='formDiv'>
                        <label htmlFor="username">Username</label>
                        <input
                            className="input-fields"
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className='formDiv'>
                        <label htmlFor="email">Email</label>
                        <input
                            className="input-fields"
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className='formDiv'>
                        <label htmlFor="password">Password</label>
                        <input
                            className="input-fields"
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit" className="button-small" role="button">
                        Create
                    </button>
                </form>
                {status && (
                    <div>
                        {status.success ? (
                            <p style={{ color: 'green' }}>{status.message}</p>
                        ) : (
                            <p style={{ color: 'red' }}>{status.message}</p>
                        )}
                    </div>
                )}
            </div>
        </>
    )
}

export default NewCreator