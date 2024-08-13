import { useParams } from 'react-router-dom';
import { useState, useEffect } from "react";
import './ViewRecipe.css'

const ViewRecipe = (props) => {

    const [recipe, setRecipe] = useState({})
    const [step, setStep] = useState([])
    const [ingredient, setIngredient] = useState( [])
    let { recipeId } = useParams();


    useEffect(() => {
        getRecipe(recipeId);
        getStep(recipeId);
        getIngredient(recipeId)
    }, []);



    useEffect(() => {
        console.log(ingredient)
    }, [ingredient]);

    const getRecipe = async (recipeId) =>{
        const response = await fetch('http://localhost:443/recipe/getByRecipeId/' + recipeId)
        const data = await response.json()
        setRecipe(data)
    }


    const getStep = async (recipeId) =>{
        const response = await fetch('http://localhost:443/step/getByRecipeId/' + recipeId)
        const data = await response.json()
        setStep(data)
    }

    const getIngredient = async (recipeId) =>{
        const response = await fetch('http://localhost:443/ingredient/getByRecipeId/' + recipeId)
        const data = await response.json()
        setIngredient(data)
    }


    return (
        <>
            <h1>{recipe.title}</h1>
            <p>{recipe.description}</p>
            <p>The recipe is for: {recipe.nr_of_people} people</p>
            <a href={recipe.video_link}> 
                <p>Watch the video here: {recipe.video_link}</p>
            </a>
            <div className='stepsAndIngredients'>
                <div className='steps'>
                    {step.map(aStep => (
                        <div key={aStep.id} className='stepBox'>
                            <p>{aStep.index}.</p><p className='stepDesc'>{aStep.text}</p>
                        </div>
                    ))}
                </div>
                <div className='ingredients'>
                    {ingredient.map(aIngredient => (
                        <div key={aIngredient.id} className='ingredientBox'>
                            <p>{aIngredient.quantity}</p>
                            <p>{aIngredient.unit}</p>
                            <p>{aIngredient.name}</p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default ViewRecipe