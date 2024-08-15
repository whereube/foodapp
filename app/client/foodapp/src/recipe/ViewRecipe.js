import { useParams } from 'react-router-dom';
import { useState, useEffect } from "react";
import './ViewRecipe.css'


const ViewRecipe = (props) => {

    const [recipe, setRecipe] = useState({})
    const [step, setStep] = useState([])
    const [ingredient, setIngredient] = useState( [])
    const [currentServingSize, setCurrentServingSize] = useState(0)
    let { recipeId } = useParams();


    useEffect(() => {
        getRecipe(recipeId);
        getStep(recipeId);
        getIngredient(recipeId)
    }, []);

    useEffect(() => {
        setCurrentServingSize(recipe.nr_of_people)
    }, [recipe]);

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

    const increaseServingSize = () => {
        const newServingSize = currentServingSize + 1
        setCurrentServingSize(newServingSize)
    }


    const decreaseServingSize = () => {
        const newServingSize = currentServingSize - 1
        setCurrentServingSize(newServingSize)
    }

    const copyIngredientsToList = async () => {
        let newShopingList = []
        ingredient.map(aIngredient => {
            let item = "";
            item = `${((aIngredient.quantity / recipe.nr_of_people) * currentServingSize).toFixed(2)} ${aIngredient.unit} ${aIngredient.name} \n`;
            newShopingList.push(item);
        });
        console.log(newShopingList)
        const textToCopy = newShopingList.toString().replace(/,/g, "")
        navigator.clipboard.writeText(textToCopy);
    }
    

    return (
        <div className='recipePage'>
            <h1>{recipe.title}</h1>
            <p>{recipe.description}</p>
            <p>The recipe is for: {recipe.nr_of_people} people</p>
            <a href={recipe.video_link}> 
                <p>Watch the video here: {recipe.video_link}</p>
            </a>
            <div className='stepsAndIngredients'>
                <div className='steps'>
                    <h4>Steps</h4>
                    {step.map(aStep => (
                        <div key={aStep.id} className='stepBox'>
                            <p className='stepIndex'>{aStep.index}.</p><p className='stepDesc'>{aStep.text}</p>
                        </div>
                    ))}
                </div>
                <div className='ingredients'>
                    <h4>Ingredients</h4>
                    <div className='servingSize'>
                        <button className='button-small' onClick={increaseServingSize}>+</button>
                        <p>{currentServingSize}</p>
                        <button className='button-small' onClick={decreaseServingSize}>-</button>
                        <img id="utensilsIcon" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAACcElEQVR4nO2az4tOURjHPyTSzIsFU0xEVsiGGEmUzZRkLbaslY2ZEDss5B8Y5cdG7NiIqPGaKGxkQn7tZEpi/Cgxjo6+V7fj3um9955z75jOp269557n+T7v033uvec87wtwGzANHW3+ZRh4UOa8afhwMWXP5xmEJibiEK+IL2JpOcTS8kUsLYdYWr6IpeUQS8sX07602sCdAuenbCJFmX6JfNGHLuqjWzE/+0zkjT6soD5WKuarijrzpDNuB/c02Ep9bFPMkYo626XzyA7OaHCU+jimmKcr6lxLf/edGmQ92kJxVzF3VNAYlMYYsCC58T4Cv4A1hGetYn0o8YDpVjklV+Kbxn85pYlzhOeiYp0o6DfitJFeAptdo15l9zNr0iNbFOMrsLigr9FxCdgLzM4zPJjK1F5C37T0uLUxDoR8gc7UDW+NbwJz8YfVuiXtYcUKuhJYCIzK4bpeOFWZD9yQ5qhi1LKk6QWep968fZRnE/BaWs+AJXWvzVrAFTlOAJeBVQX8VwMXgB/SuJo865tYZM4A9gNvUwndBw4DyzPs7bkjspmQj/XdJ63GV8tdwIBKIxF7l2E3lpp/ChzyvKI2Prcb6zvYcq7zFczB+76p6J46dNzSxEQqYuIVySGWVkVMLK0cYmlNpdJqSexTxtx44Eaf8ZnIRok9zph7orkN/AeJnJfYyYy50A0M4yORWcDxVHtyaYbNMvVyjWytT+OJzAF61PUYTC3h7UZp9yR+e9QlSXaEA9JYJM1aE2k7/aPkeAH0d+Dfr05Mp//PCprId+A98BAYAnZN1kfKwNpan7PSsFpWs0pbNu8Xqz/8BoaOzSgHDW7SAAAAAElFTkSuQmCC"></img>
                    </div>
                    {ingredient.map(aIngredient => (
                        <div key={aIngredient.id} className='ingredientBox'>
                            <p>{+((aIngredient.quantity/recipe.nr_of_people) * currentServingSize).toFixed(2)}</p>
                            <p>{aIngredient.unit}</p>
                            <p>{aIngredient.name}</p>
                        </div>
                    ))}
                    <button onClick={copyIngredientsToList} className='button-small'>Copy ingredients</button>
                </div>
            </div>
        </div>
    )
}

export default ViewRecipe