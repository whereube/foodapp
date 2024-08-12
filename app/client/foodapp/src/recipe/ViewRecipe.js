


const ViewRecipe = (recipeId) => {

    const getRecipe = async (recipeId) =>{
        const response = await fetch('http://localhost:443/recipe/getByRecipeId/' + recipeId)
        const data = await response.json()
        console.log(data)
    }
    getRecipe('40d708e7-b828-4749-a17e-4fa71ab44399');

    return (
        <>
            <p>View recipe</p>
        </>
    )
}

export default ViewRecipe