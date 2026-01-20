"use client";
import { useRouter, useParams } from "next/navigation";
import { useState, useEffect } from 'react';
import { getPropertyById } from "@/api/property";

export default function EditPropertyPage() {
    const router = useRouter();
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zip, setZip] = useState(null);
    const [country, setCountry] = useState('');
    const [bedrooms, setBedrooms] = useState(1);
    const [bathrooms, setBathrooms] = useState(1);
    const [err, setErr] = useState({});
    const [loaded, setLoaded] = useState(false);
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
    const [canSubmit, setCanSubmit] = useState(false);
    const { id } = useParams()

    useEffect(()=> {
        // load data for place 
        getPropertyById(id)
            .then(data => {
                console.log("DATA", data)
                const property = data.property;

                setName(property.name);
                setAddress(property.address);
                setCity(property.city);
                setState(property.state);
                setZip(property.zip);
                setCountry(property.country);
                setBedrooms(property.bedroom_size);
                setBathrooms(property.bathroom_size);

                const details = property.details;

                if(details.livingRoom) {
                    setLivingRoom(true);
                    setLivingRoomCount(details.livingRoom.count);
                    setActive(true);
                }
                if(details.exterior) {
                    setExterior(true);
                    setExteriorCount(details.exterior.count);
                    setActive(true);
                }
                if(details.diningRoom) {
                    setDiningRoom(true);
                    setDiningRoomCount(details.diningRoom.count);
                    setActive(true);
                }
                if(details.kitchen) {
                    setKitchen(true);
                    setKitchenCount(details.kitchen.count);
                    setActive(true);
                }
                if(details.laundryRoom) {
                    setLaundryRoom(true);
                    setLaundryRoomCount(details.laundryRoom.count);
                    setActive(true);
                }
                if(details.patio) {
                    setPatio(true);
                    setPatioCount(details.patio.count);
                    setActive(true);
                }
                if(details.smokeDetector) {
                    setSmokeDetector(true);
                    setSmokeDetectorCount(details.smokeDetector.count);
                    setActive(true);
                }
            })
            .then(()=> {
                if(
                    livingRoom ||
                    exterior ||
                    diningRoom ||
                    kitchen ||
                    laundryRoom ||
                    patio ||
                    smokeDetector
                ) {
                    setActive(true)
                    console.log('active true', active)
                }
            })
            .catch(e => console.error('Error occured', e))
            .finally(()=> {
                setLoaded(true)
                setCanSubmit(false)
            })
    }, []);

    // useEffect(()=> {
    //     if(
    //         livingRoom ||
    //         exterior ||
    //         diningRoom ||
    //         kitchen ||
    //         laundryRoom ||
    //         patio ||
    //         smokeDetector
    //     ) {
    //         setActive(true)
    //         console.log('active true', active)
    //     } else {
    //         setActive(false)
    //         console.log('active false', active)
    //     }
    //     // console.log("details data", {
    //     //     active,
    //     //     livingRoom,
    //     //     exterior,
    //     //     diningRoom,
    //     //     kitchen,
    //     //     laundryRoom,
    //     //     patio,
    //     //     smokeDetector
    //     // })
    // }, [livingRoom, exterior, diningRoom, kitchen, laundryRoom, patio, smokeDetector, active]);

    // const handleActive = (e) => {
    //     e.preventDefault();

    //     if(active) {
    //         setLivingRoom(false);
    //         setExterior(false);
    //         setDiningRoom(false);
    //         setKitchen(false);
    //         setLaundryRoom(false);
    //         setPatio(false);
    //         setSmokeDetector(false);
    //     } else {
    //         setActive(true)
    //     }
    // }

    useEffect(()=> {
        if(!canSubmit) {
            setCanSubmit(true);
            console.log("Can Submit Changed");
        }
        console.log("Can Submit", canSubmit);
    }, [
        name, address, city, state, zip, country, bedrooms, bathrooms,
        livingRoom, exterior, diningRoom, kitchen, laundryRoom, patio, smokeDetector
    ]);


    const handleSubmit = async (e) => {
        // submit form(update)

        // if extra deatils se t acctive to true and open detail element
    }
    
    return (
        <>
        {loaded && (
            <div className="main">
            <h2>Set up Property</h2>

            <form onSubmit={handleSubmit}>
                <label htmlFor="prop-name">Name: </label>
                <input type="text" name="name" id="prop-name" required
                    value={name} onChange={(e)=> setName(e.target.value)}
                />

                <label htmlFor="prop-image-file">
                    File:
                    <input id="prop-image-file" name="prop-image-file" type="file" accept="image/*" />
                </label>

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
                    value={bedrooms} onChange={(e)=> setBedrooms(e.target.value)}
                />

                <label htmlFor="bathroom-size">Bathrooms: </label>
                <input type="number" name="bathroom-size" id="bathroom-size" min={1} required
                    value={bathrooms} onChange={(e)=> setBathrooms(e.target.value)}
                />

                <details id="details" onClick={(e)=> {
                    e.preventDefault();
                    setActive(!active);
                }} open={active}>
                    <summary>Advanced</summary>
                    <li>
                        <input type="checkbox" value={livingRoom} onChange={(e)=> setLivingRoom(e.target.checked)} checked={livingRoom} />
                        Living Room
                        {livingRoom && (
                            <div>
                                Count: 
                                <input type="number" min={1} value={livingRoomCount} onChange={(e)=> setLivingRoomCount(e.target.value)} />
                            </div>
                        )}
                    </li>
                    <li>
                        <input type="checkbox" value={kitchen} onChange={(e)=> setKitchen(e.target.checked)} checked={kitchen} />
                        Kitchen
                        {kitchen && (
                            <div>
                                Count: 
                                <input type="number" min={1} value={kitchenCount} onChange={(e)=> setKitchenCount(e.target.value)} />
                            </div>
                        )}
                    </li>
                    <li>
                        <input type="checkbox" value={diningRoom} onChange={(e)=> setDiningRoom(e.target.checked)}  checked={diningRoom} />
                        Dining Room
                        {diningRoom && (
                            <div>
                                Count: 
                                <input type="number" min={1} value={diningRoomCount} onChange={(e)=> setDiningRoomCount(e.target.value)} />
                            </div>
                        )}
                    </li>
                    <li>
                        <input type="checkbox" value={laundryRoom} onChange={(e)=> setLaundryRoom(e.target.checked)} checked={laundryRoom} />
                        Laundry Room
                        {laundryRoom && (
                            <div>
                                Count: 
                                <input type="number" min={1} value={laundryRoomCount} onChange={(e)=> setLaundryRoomCount(e.target.value)} />
                            </div>
                        )}
                    </li>
                    <li>
                        <input type="checkbox" value={exterior} onChange={(e)=> setExterior(e.target.checked)} checked={exterior} />
                        Exterior
                        {exterior && (
                            <div>
                                Count: 
                                <input type="number" min={1} value={exteriorCount} onChange={(e)=> setExteriorCount(e.target.value)} />
                            </div>
                        )}
                    </li>
                    <li>
                        <input type="checkbox" value={patio} onChange={(e)=> setPatio(e.target.checked)} checked={patio} />
                        Patio
                        {patio && (
                            <div>
                                Count: 
                                <input type="number" min={1} value={patioCount} onChange={(e)=> setPatioCount(e.target.value)} />
                            </div>
                        )}
                    </li>
                    <li>
                        <input type="checkbox" value={smokeDetector} onChange={(e)=> setSmokeDetector(e.target.checked)}  checked={smokeDetector} />
                        Smoke Detector
                        {smokeDetector && (
                            <div>
                                Count: 
                                <input type="number" min={1} value={smokeDetectorCount} onChange={(e)=> setSmokeDetectorCount(e.target.value)} />
                            </div>
                        )}
                    </li>
                </details>

                <button type="submit" disabled={!canSubmit}>Submit</button>
                {err.message && (
                    <p>{err.message}</p>
                )}
                <button type="button" onClick={()=> router.push('/home')}>Back to Home</button>
            </form>
            </div>
        )}
        </>
    )
}