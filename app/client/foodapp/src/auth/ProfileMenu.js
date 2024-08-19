import { React, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Logout from '../auth/Logout';
import { useAuth } from '../auth/AuthProvider';
import './ProfileMenu.css'


const ProfileMenu = (props) => {

    // State to control the visibility of the dropdown
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const navigate = useNavigate(); 
    const { user } = useAuth();


    // Function to toggle the dropdown
    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const redirectToRecipe = () =>{
        navigate('/recipe/create')    
    }

    const redirectToLogin = () =>{
        navigate('/login')    
    }

    return (
    <>
        <div className='profileMenu'>
            <button onClick={toggleDropdown} className='button-small ProfileButton'>
                <img id="profileImage"src='https://img.icons8.com/?size=100&id=82751&format=png&color=FFFFFF'></img>
            </button>
            {user && isDropdownOpen &&(
                <div className='dropdown-menu'>
                    <Logout />
                    <button className='button-small' onClick={redirectToRecipe}>Add a new recipe</button>
                </div>
            )}
            {!user && isDropdownOpen && (
                <div className='dropdown-menu'>
                    <button className='button-small' onClick={redirectToLogin}>Login</button>
                </div>
            )}
        </div>
    </>
    );
    };

export default ProfileMenu;