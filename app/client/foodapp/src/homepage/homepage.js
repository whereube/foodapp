import { useNavigate } from 'react-router-dom';
import './homepage.css'


const HomePage = () => {

    const navigate = useNavigate(); 


    const redirect = (redirectTo) =>{
        navigate(redirectTo)    
    }

    return (
        <>
            <div className='homePage'>
                <h1>Home</h1>
                <div className='newCreatorInfo'>
                    <p>Are you a food content creator? Do you want your own webpage you can share, so that your viewer can easly read and follow the steps of your recipes?</p>
                    <p>If so, you have come to the right place! Create an account to get your own page where you can upload easy to follow recipe instructions</p>
                    <button className='button-small homepageButton' onClick={() => redirect('creator/new')}>Create account</button>
                </div>
                <div className='existingCreatorInfo'>
                    <p>Already have an account?</p>
                    <button className='button-small' onClick={() => redirect('login')}>Login</button>
                </div>
                <p>Are you looking for the page of a specific creator? Then you need to go to have the name of the creator in the webadress. For example /baker</p>
            </div>
        </>
    )
}

export default HomePage