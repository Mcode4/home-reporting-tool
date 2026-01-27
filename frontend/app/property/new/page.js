"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { addProperty, updatePropertyDetails, deleteProperty } from "@/api/property";
import { 
    mainTemp, 
    exteriorTemp, 
    livingRoomTemp,
    bedroomTemp,
    bathTemp,
    diningRoomTemp,
    kitchenTemp,
    laundryRoomTemp,
    patioTemp,
    smokeDetectorTemp
} from "../detailTemps";
import { uploadPropertyImage } from "@/api/images";


export default function NewPropertyPage() {
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
        console.log('ACTIVE1', active)
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
        setErr({});
        let id
        const propertyImage = document.getElementById("prop-image-file")
        let file

        if(propertyImage.files[0]) {
            file = propertyImage.files[0]
        }

        const bedroomObj = {}
        const bathroomObj = {}
        for(let i=1; i<=bedrooms; i++) {
            bedroomObj[`bedroom${i}`] = bedroomTemp()
        }
        for(let i=1; i<=bathrooms; i++) {
            bathroomObj[`bathroom${i}`] = bathTemp()
        }

        const data = {
            name,
            address,
            city,
            state,
            zip: Number(zip),
            country,
            bedrooms: Number(bedrooms),
            bathrooms: Number(bathrooms),
            details: {
                main: mainTemp(),
                bedrooms: bedroomObj,
                baths: bathroomObj
            }
        };

        console.log('DATA:', data);

        try {
            const property = await addProperty(data);
            console.log("PROPERTY DATA", property);
            id = property["id"];
            console.log("ID", id)

            if(file) {
                const imageFile = await uploadPropertyImage(id, file);
                console.log("IMAGE FILE", imageFile);
            }

            if(active) {
                console.log('PROPERTY:', property, "ID:", id)

                const details = {
                    livingRoom,
                    kitchen,
                    diningRoom,
                    laundryRoom,
                    exterior,
                    patio,
                    smokeDetector
                };
                const detailObj = {}

                const iterable = Array(Object.keys(details))[0];
                iterable.forEach(detail => {

                    if(detail === 'livingRoom' && details[detail]){
                        // Sets count in result
                        const result = {count: livingRoomCount}

                        // iterates to add template to each number of "details"
                        for(let i=1; i<=livingRoomCount; i++){
                            result[`${detail}${i}`] = livingRoomTemp()
                        }
                        // Append result to detailObj
                        detailObj[detail] = result
                    }

                    if(detail === 'kitchen' && details[detail]){
                        // Sets count in result
                        const result = {count: kitchenCount}

                        // iterates to add template to each number of "details"
                        for(let i=1; i<=kitchenCount; i++){
                            result[`${detail}${i}`] = kitchenTemp()
                        }
                        // Append result to detailObj
                        detailObj[detail] = result
                    }

                    if(detail === 'diningRoom' && details[detail]){
                        // Sets count in result
                        const result = {count: diningRoomCount}

                        // iterates to add template to each number of "details"
                        for(let i=1; i<=diningRoomCount; i++){
                            result[`${detail}${i}`] = diningRoomTemp()
                        }
                        // Append result to detailObj
                        detailObj[detail] = result
                    }

                    if(detail === 'laundryRoom' && details[detail]){
                        // Sets count in result
                        const result = {count: laundryRoomCount}

                        // iterates to add template to each number of "details"
                        for(let i=1; i<=laundryRoomCount; i++){
                            result[`${detail}${i}`] = laundryRoomTemp()
                        }
                        // Append result to detailObj
                        detailObj[detail] = result
                    }

                    if(detail === 'exterior' && details[detail]){
                        // Sets count in result
                        const result = {count: exteriorCount}

                        // iterates to add template to each number of "details"
                        for(let i=1; i<=exteriorCount; i++){
                            result[`${detail}${i}`] = exteriorTemp()
                        }
                        // Append result to detailObj
                        detailObj[detail] = result
                    }

                    if(detail === 'patio' && details[detail]){
                        // Sets count in result
                        const result = {count: patioCount}

                        // iterates to add template to each number of "details"
                        for(let i=1; i<=patioCount; i++){
                            result[`${detail}${i}`] = patioTemp()
                        }
                        // Append result to detailObj
                        detailObj[detail] = result
                    }

                    if(detail === 'smokeDetector' && details[detail]){
                        // Sets count in result
                        const result = {count: smokeDetectorCount}

                        // iterates to add template to each number of "details"
                        for(let i=1; i<=smokeDetectorCount; i++){
                            result[`${detail}${i}`] = smokeDetectorTemp()
                        }
                        // Append result to detailObj
                        detailObj[detail] = result
                    }
                })
                console.log('detOBJ', detailObj)
                await updatePropertyDetails(id, detailObj);
            }
        }
        catch (e) {
            console.log('Error occured:', e)
            setErr({
                'message': `Status Code: ${e.status} ${e.message}`
            })
            if(id) {
                const deleteProp = await deleteProperty(id);
                console.log(deleteProp);
                setErr({
                    "message": `${err.message}. Property has been deleted, try again.`
                })
            }
        }
        finally {
            router.push('/home');
        }
    }



    return (
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

            <details id="details" onClick={()=> setActive(!active)}>
                <summary>Advanced</summary>
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
            </details>

            <button type="submit">Submit</button>
            {err.message && (
                <p>{err.message}</p>
            )}
            <button type="button" onClick={()=> router.push('/home')}>Back to Home</button>
        </form>
        </div>
    )
}