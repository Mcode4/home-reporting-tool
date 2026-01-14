"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewPropertyPage() {
    const router = useRouter();
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zip, setZip] = useState(null);
    const [country, setCountry] = useState('');
    const [bedroom, setBedroom] = useState(1);
    const [bathroom, setBathroom] = useState(1);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {
            name,
            address,
            city,
            state,
            zip,
            country,
            bedroom,
            bathroom
        };

        console.log('DATA:', data);


    }



    return (
        <div className="main">
        <h2>Set up Property</h2>

        <form onSubmit={handleSubmit}>
            <label htmlFor="prop-name">Name: </label>
            <input type="text" name="name" id="prop-name" required
                value={name} onChange={(e)=> setName(e.target.value)}
            />

            <div id="location">
                <label htmlFor="address">Address: </label>
                <input type="text" name="address" id="address" required
                    value={address} onChange={(e)=> setAddress(e.target.value)}
                />

                <label htmlFor="city">City: </label>
                <input type="text" name="city" id="city" required
                    value={city} onChange={(e)=> setCity(e.target.value)}
                />

                <label htmlFor="state">State: </label>
                <input type="text" name="state" id="state" required
                    value={state} onChange={(e)=> setState(e.target.value)}
                />

                <label htmlFor="zip">Zip Code: </label>
                <input type="number" name="zip" id="zip" required
                    value={zip} onChange={(e)=> setZip(e.target.value)}
                />

                <label htmlFor="country">Country: </label>
                <input type="text" name="country" id="country" required
                    value={country} onChange={(e)=> setCountry(e.target.value)}
                />
            </div>

            <label htmlFor="bedroom-size">Bedrooms: </label>
            <input type="number" name="bedroom-size" id="bedroom-size" min={1} required
                value={bedroom} onChange={(e)=> setBedroom(e.target.value)}
            />

            <label htmlFor="bathroom-size">Bathrooms: </label>
            <input type="number" name="bathroom-size" id="bathroom-size" min={1} required
                value={bathroom} onChange={(e)=> setBathroom(e.target.value)}
            />

            <button type="submit">Submit</button>
            <button type="button" onClick={()=> router.push('/home')}>Back to Home</button>
        </form>
        </div>
    )
}