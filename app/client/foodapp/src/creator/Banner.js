import React from 'react';
import { useParams, Outlet } from 'react-router-dom';
import './Banner.css'



const Banner = () => {

  let { creatorName } = useParams();

  return (
    <>
        <div className='banner'>
            <h1>{creatorName}'s Page</h1>
        </div>
        <Outlet />
    </>
  );
};

export default Banner;