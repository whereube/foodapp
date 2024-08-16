import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './CreatorPage.css'

const CreatorPage = () => {

    let { creatorName } = useParams();
    const [creator, setCreator] = useState({})
    const [allRecipes, setAllRecipes] = useState ([])

    useEffect(() => {
        getCreator();
    }, []);
    useEffect(() => {
        if(creator.id !== undefined){
            getAllRecipes();
        }
    }, [creator]);

    const getCreator = async () =>{
        const response = await fetch('http://localhost:443/creator/getCreatorByUsername/' + creatorName)
        const data = await response.json()
        setCreator(data)
    }

    const getAllRecipes = async () =>{
        const response = await fetch('http://localhost:443/recipe/getAllByCreatorId/' + creator.id)
        const data = await response.json()
        setAllRecipes(data)
    }

    return (
        <>
            <h1>Recipes:</h1>
            {allRecipes.map((recipe) => (
                <div className='recipeDiv' key={recipe.id}>
                    <a href={`/${creator.username}/${recipe.id}`}>{recipe.title}</a>
                </div>
            ))}
        </>
    )
}

export default CreatorPage