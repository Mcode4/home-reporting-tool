

function AddHousePage() {
    return (
        <>
        <h2>Set up Property</h2>

        <form action="">
            <label htmlFor="prop-name">Name: </label>
            <label htmlFor="location">Location: </label>
            <label htmlFor="bedroom-size">Bedrooms: </label>
            <label htmlFor="bathroom-size">Bathrooms: </label>

            <input type="text" name="name" id="prop-name" />
            <input type="text" name="location" id="location" />
            <input type="number" name="bedroom-size" id="bedroom-size" />
            <input type="number" name="bathroom-size" id="bathroom-size" />

            <button type="submit">Submit</button>
        </form>
        </>
    )
}

export default AddHousePage;