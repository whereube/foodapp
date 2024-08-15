import React, { useState, useEffect } from 'react';

const NewCreator = () => {

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });

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



    useEffect(() => {
        console.log(formData)
    }, [formData]);

    return (
        <>
            <p>Test creator page3</p>
            <form className="newCreator">
                <div>
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
                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        className="input-fields"
                        type="text"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
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
            </form>
        </>
    )
}

export default NewCreator