import React, { useState, useEffect } from 'react';
import { useAuth } from './AuthProvider';
import { useNavigate } from "react-router-dom";

const Logout = () => {

    const auth = useAuth();
    const navigate = useNavigate();

  const handleLogout = async (e) => {
        auth.logOut()
  };


    return (
        <>
            <button onClick={handleLogout} className='button-small'>Log out</button>
        </>
    )
}

export default Logout