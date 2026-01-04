"use client";

function HomePage() {
    const data = [{id: 1, name: 'Initial Property'}, {id: 2, name: 'Secondary Property'}]

    return (
        <>
        <button>New Property</button>

        {data.length > 0 && (
            <div className="properySection">
            {data.map(property => {
                <div className="property" key={id}>
                    <img src="" alt={`Property${id}`} />
                    <div>property.name</div>
                </div>
            })}
            </div>
        )}
        </>
    )
}

export default HomePage;