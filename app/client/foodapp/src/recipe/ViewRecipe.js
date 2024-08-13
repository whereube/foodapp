import { useParams } from 'react-router-dom';
import { useState, useEffect } from "react";

const ViewRecipe = (props) => {

    const [recipe, setRecipe] = useState({})
    let { recipeId } = useParams();


    useEffect(() => {
        getRecipe(recipeId);
        console.log(recipe)
    }, []);


    const getRecipe = async (recipeId) =>{
        console.log("id: " + recipeId)
        const response = await fetch('http://localhost:443/recipe/getByRecipeId/' + recipeId)
        const data = await response.json()
        setRecipe(data)
    }

    return (
        <>
            <p>View recipe</p>
            <h2>{recipe.title}</h2>
            <p>{recipe.description}</p>
            <p>The recipe is for: {recipe.nr_of_people} people</p>
            <a href={recipe.video_link}> 
                <p>Watch the video here: {recipe.video_link}</p>
            </a>
            
        </>
    )
}

export default ViewRecipe