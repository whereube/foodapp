import React, { useState, useEffect } from 'react';
import { useAuth } from './AuthProvider';
import { useNavigate, useLocation } from "react-router-dom";
import './Login.css'


const Login = () => {

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [status, setStatus] = useState(null);
    const auth = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";


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
        const result = await auth.loginAction(formData);
        if (result.success) {
            navigate(from, { replace: true });
        } else {
            setStatus({ success: false, message: result.message });
        }
  };


    return (
        <>
            <div className="loginPage">
                <h2>Login</h2>
                <form onSubmit={handleSubmit} className="loginForm">
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
                <a href='/creator/new'>Don't have an account yet? Click here to create one</a>
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