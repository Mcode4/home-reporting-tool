"use client";
import { useState, useEffect } from "react";
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
    // Extra Details
    const [active, setActive] = useState(false);

    const [livingRoom, setLivingRoom] = useState(false);
    const [livingRoomCount, setLivingRoomCount] = useState(1);

    const [exterior, setExterior] = useState(false);
    const [exteriorCount, setExteriorCount] = useState(1);

    const [diningRoom, setDiningRoom] = useState(false);
    const [diningRoomCount, setDiningRoomCount] = useState(1);

    const [kitchen, setKitchen] = useState(false);
    const [kitchenCount, setKitchenCount] = useState(1);

    const [laundryRoom, setLaundryRoom] = useState(false);
    const [laundryRoomCount, setLaundryRoomCount] = useState(1);

    const [patio, setPatio] = useState(false);
    const [patioCount, setPatioCount] = useState(1);

    const [smokeDetector, setSmokeDetector] = useState(false);
    const [smokeDetectorCount, setSmokeDetectorCount] = useState(1);

    useEffect(()=> {
        const details = document.getElementById("details")
        if(active) {
            details.className = "active"
        } else {
            details.className = "inactive"
        }
    }, [active])

    // console.log('Extras:', {
    //     kitchen,
    //     diningRoom,
    //     laundryRoom,
    //     exterior,
    //     patio,
    //     smokeDetector
    // })



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

            <button type="button" onClick={()=> setActive(!active)}>Advanced</button>

            <ul id="details" className="active">
                <li>
                    <input type="checkbox" value={livingRoom} onChange={(e)=> setLivingRoom(e.target.checked)} />
                    Living Room
                    {livingRoom && (
                        <div>
                            Count: 
                            <input type="number" min={1} value={livingRoomCount} onChange={(e)=> setLivingRoomCount(e.target.value)} />
                        </div>
                    )}
                </li>
                <li>
                    <input type="checkbox" value={kitchen} onChange={(e)=> setKitchen(e.target.checked)} />
                    Kitchen
                    {kitchen && (
                        <div>
                            Count: 
                            <input type="number" min={1} value={kitchenCount} onChange={(e)=> setKitchenCount(e.target.value)} />
                        </div>
                    )}
                </li>
                <li>
                    <input type="checkbox" value={diningRoom} onChange={(e)=> setDiningRoom(e.target.checked)} />
                    Dining Room
                    {diningRoom && (
                        <div>
                            Count: 
                            <input type="number" min={1} value={diningRoomCount} onChange={(e)=> setDiningRoomCount(e.target.value)} />
                        </div>
                    )}
                </li>
                <li>
                    <input type="checkbox" value={laundryRoom} onChange={(e)=> setLaundryRoom(e.target.checked)} />
                    Laundry Room
                    {laundryRoom && (
                        <div>
                            Count: 
                            <input type="number" min={1} value={laundryRoomCount} onChange={(e)=> setLaundryRoomCount(e.target.value)} />
                        </div>
                    )}
                </li>
                <li>
                    <input type="checkbox" value={exterior} onChange={(e)=> setExterior(e.target.checked)} />
                    Exterior
                    {exterior && (
                        <div>
                            Count: 
                            <input type="number" min={1} value={exteriorCount} onChange={(e)=> setExteriorCount(e.target.value)} />
                        </div>
                    )}
                </li>
                <li>
                    <input type="checkbox" value={patio} onChange={(e)=> setPatio(e.target.checked)} />
                    Patio
                    {patio && (
                        <div>
                            Count: 
                            <input type="number" min={1} value={patioCount} onChange={(e)=> setPatioCount(e.target.value)} />
                        </div>
                    )}
                </li>
                <li>
                    <input type="checkbox" value={smokeDetector} onChange={(e)=> setSmokeDetector(e.target.checked)} />
                    Smoke Detector
                    {smokeDetector && (
                        <div>
                            Count: 
                            <input type="number" min={1} value={smokeDetectorCount} onChange={(e)=> setSmokeDetectorCount(e.target.value)} />
                        </div>
                    )}
                </li>
            </ul>

            <button type="submit">Submit</button>
            <button type="button" onClick={()=> router.push('/home')}>Back to Home</button>
        </form>
        </div>
    )
}