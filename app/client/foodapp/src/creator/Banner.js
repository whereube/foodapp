import React from 'react';
import { useParams, Outlet } from 'react-router-dom';
import './Banner.css'
import ProfileMenu from '../auth/ProfileMenu';


const Banner = () => {

  let { creatorName } = useParams();


  return (
    <>
        <div className='banner'>
            <h1>{creatorName}'s Page</h1>
            <ProfileMenu/>
        </div>
        <Outlet />
    </>
  );
};

export default Banner;