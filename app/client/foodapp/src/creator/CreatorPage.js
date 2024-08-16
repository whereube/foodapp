import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

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
            <h1>{creator.username}</h1>
            <h3>Recipes:</h3>
            {allRecipes.map((recipe) => (
                <div className='recipeDiv' key={recipe.id}>
                    <a href={`/recipe/${recipe.id}`}>{recipe.title}</a>
                </div>
            ))}
        </>
    )
}

export default CreatorPage