import { React, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import ProfileMenu from './ProfileMenu';
import './NavBar.css'
import './ProfileMenu.css'



const NavBar = () => {

    const navigate = useNavigate(); 


    const redirect = (redirectTo) => {
        navigate(redirectTo)    
    }

    return (
        <>
            <div className='navBar'>
                <div className='textDiv'>
                    <p className='clickable' onClick={() => redirect('/')}>Home</p>
                    <p className='clickable' onClick={() => redirect('/recipe/create')}>Add a new recipe</p>
                    <ProfileMenu />
                </div>
            </div>

        </>
    );
};

export default NavBar;