"use client";
import { useRouter, useParams } from "next/navigation";
import { useState, useEffect } from 'react';
import { getPropertyById, editProperty } from "@/api/property";
import { 
    exteriorTemp, 
    livingRoomTemp,
    bedroomTemp,
    bathTemp,
    diningRoomTemp,
    kitchenTemp,
    laundryRoomTemp,
    patioTemp,
    smokeDetectorTemp
} from "../../detailTemps";

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
    const [details, setDetails] = useState(null);
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

                const propDetails = property.details;
                setDetails(propDetails);

                if(propDetails.livingRoom) {
                    setLivingRoom(true);
                    setLivingRoomCount(propDetails.livingRoom.count);
                    setActive(true);
                }
                if(propDetails.exterior) {
                    setExterior(true);
                    setExteriorCount(propDetails.exterior.count);
                    setActive(true);
                }
                if(propDetails.diningRoom) {
                    setDiningRoom(true);
                    setDiningRoomCount(propDetails.diningRoom.count);
                    setActive(true);
                }
                if(propDetails.kitchen) {
                    setKitchen(true);
                    setKitchenCount(propDetails.kitchen.count);
                    setActive(true);
                }
                if(propDetails.laundryRoom) {
                    setLaundryRoom(true);
                    setLaundryRoomCount(propDetails.laundryRoom.count);
                    setActive(true);
                }
                if(propDetails.patio) {
                    setPatio(true);
                    setPatioCount(propDetails.patio.count);
                    setActive(true);
                }
                if(propDetails.smokeDetector) {
                    setSmokeDetector(true);
                    setSmokeDetectorCount(propDetails.smokeDetector.count);
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
        e.preventDefault();
        const detailsObj = {};

        if(livingRoom) {
            const livingRoomObj = { count: livingRoomCount };
            for(let i=1; i<=livingRoomCount; i++) {
                if (!details.livingRoom[`livingRoom${i}`]) {
                    livingRoomObj[`livingRoom${i}`] = livingRoomTemp();
                    console.log("Temp added", livingRoomObj);
                } else {
                    livingRoomObj[`livingRoom${i}`] = details.livingRoom[`livingRoom${i}`];
                    console.log("Transfer added", detailsObj);
                }
            }
            detailsObj.livingRoom = livingRoomObj;
        };

        if(exterior) {
            const exteriorObj = { count: exteriorCount };
            for(let i=1; i<=exteriorCount; i++) {
                if (!details.exterior[`exterior${i}`]) {
                    exteriorObj[`exterior${i}`] = exteriorTemp();
                    console.log("Temp added", exteriorObj);
                } else {
                    exteriorObj[`exterior${i}`] = details.exterior[`exterior${i}`];
                    console.log("Transfer added", detailsObj);
                }
            }
            detailsObj.exterior = exteriorObj;
        };

        if(diningRoom) {
            const diningRoomObj = { count: diningRoomCount };
            for(let i=1; i<=diningRoomCount; i++) {
                if (!details.diningRoom[`diningRoom${i}`]) {
                    diningRoomObj[`diningRoom${i}`] = diningRoomTemp();
                    console.log("Temp added", diningRoomObj);
                } else {
                    diningRoomObj[`diningRoom${i}`] = details.diningRoom[`diningRoom${i}`];
                    console.log("Transfer added", detailsObj);
                }
            }
            detailsObj.diningRoom = diningRoomObj;
        };

        if(kitchen) {
            const kitchenObj = { count: kitchenCount };
            for(let i=1; i<=kitchenCount; i++) {
                if (!details.kitchen[`kitchen${i}`]) {
                    kitchenObj[`kitchen${i}`] = kitchenTemp();
                    console.log("Temp added", kitchenObj);
                } else {
                    kitchenObj[`kitchen${i}`] = details.kitchen[`kitchen${i}`];
                    console.log("Transfer added", detailsObj);
                }
            }
            detailsObj.kitchen = kitchenObj;
        };

        if(laundryRoom) {
            const laundryRoomObj = { count: laundryRoomCount };
            for(let i=1; i<=laundryRoomCount; i++) {
                if (!details.laundryRoom[`laundryRoom${i}`]) {
                    laundryRoomObj[`laundryRoom${i}`] = laundryRoomTemp();
                    console.log("Temp added", laundryRoomObj);
                } else {
                    laundryRoomObj[`laundryRoom${i}`] = details.laundryRoom[`laundryRoom${i}`];
                    console.log("Transfer added", detailsObj);
                }
            }
            detailsObj.laundryRoom = laundryRoomObj;
        };

        if(patio) {
            const patioObj = { count: patioCount };
            for(let i=1; i<=patioCount; i++) {
                if (!details.patio[`patio${i}`]) {
                    patioObj[`patio${i}`] = patioTemp();
                    console.log("Temp added", patioObj);
                } else {
                    patioObj[`patio${i}`] = details.patio[`patio${i}`];
                    console.log("Transfer added", detailsObj);
                }
            }
            detailsObj.patio = patioObj;
        };

        if(smokeDetector) {
            const smokeDetectorObj = { count: smokeDetectorCount };
            for(let i=1; i<=smokeDetectorCount; i++) {
                if (!details.smokeDetector[`smokeDetector${i}`]) {
                    smokeDetectorObj[`smokeDetector${i}`] = smokeDetectorTemp();
                    console.log("Temp added", smokeDetectorObj);
                } else {
                    smokeDetectorObj[`smokeDetector${i}`] = details.smokeDetector[`smokeDetector${i}`];
                    console.log("Transfer added", detailsObj);
                }
            }
            detailsObj.smokeDetector = smokeDetectorObj;
        };

        for(let i=1; i<=bedrooms; i++) {
            const bedroomObj = {};
            for(let i=1; i<=bedrooms; i++) {
                if (!details.bedrooms[`bedroom${i}`]) {
                    bedroomObj[`bedroom${i}`] = bedroomTemp();
                    console.log("Temp added", bedroomObj);
                } else {
                    bedroomObj[`bedroom${i}`] = details.bedrooms[`bedroom${i}`];
                    console.log("Transfer added", detailsObj);
                }
            }
            detailsObj.bedrooms = bedroomObj;
        };

        for(let i=1; i<=bathrooms; i++) {
            const bathroomObj = {};
            for(let i=1; i<=bathrooms; i++) {;
                if (!details.baths[`bathroom${i}`]) {
                    bathroomObj[`bathroom${i}`] = bathTemp();
                    console.log("Temp added", bathroomObj);
                } else {
                    bathroomObj[`bathroom${i}`] = details.baths[`bathroom${i}`];
                    console.log("Transfer added", detailsObj);
                }
            }
            detailsObj.baths = bathroomObj;
        };
        
        const data = {
            name,
            address,
            city,
            state,
            country,
            zip,
            bedrooms,
            bathrooms,
            details: detailsObj
        };

        try {
            const submit = await editProperty(id, data);
            console.log('SUBMIT', submit);
        } catch(e) {
            console.log("Error occured", e);
        }

        

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

                <details id="details" onToggle={(e)=> {
                    e.preventDefault();
                    setActive(e.target.open);
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