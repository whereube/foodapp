


const CreatorPage = () => {

    const getCreator = async () =>{
        const response = await fetch('http://localhost:443/creator/getAll')
        const data = await response.json()
        console.log(data)
    }
    const creator = getCreator();

    return (
        <>
            <p>Test creator page3</p>
        </>
    )
}

export default CreatorPage