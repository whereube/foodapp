


const ViewRecipe = () => {

    const getRecipe = async () =>{
        const response = await fetch('http://localhost:443/recipe/getByRecipeId', {
            method: "GET",
            body: JSON.stringify({
                id: ''
            }),
        })
        const data = await response.json()
        console.log(data)
    }
    getRecipe();

    return (
        <>
            <p>Test creator page3</p>
        </>
    )
}

export default ViewRecipe