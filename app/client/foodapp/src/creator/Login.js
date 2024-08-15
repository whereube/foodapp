import React, { useState, useEffect } from 'react';
import './NewCreator.css'

const Login = () => {

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [status, setStatus] = useState(null);


    const handleChange = (e) =>{
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
        const response = await fetch('http://localhost:443/creator/login', {
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
        } else {
            const result = await response.json();
            console.log(result)
            setStatus({ success: true, message: 'Logged in' });
            // Clear form fields
            setFormData({
                email: '',
                password: ''
            });
        }
        } catch (error) {
        setStatus({ success: false, message: error.message });
    }
  };


    return (
        <>
            <div className="newCreatorPage">
                <p>Login</p>
                <form onSubmit={handleSubmit} className="newCreator">
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
                        Login
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

export default Login