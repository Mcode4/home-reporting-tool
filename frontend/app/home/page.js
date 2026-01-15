"use client";
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react";
import { getAllProperties } from "@/api/property";
import { getImageByPropertyId } from "@/api/images";
import defaultImage from "@/public/HomeInsuranceCompany.jpg"
import styles from './page.module.css'

export default function HomePagePage() {
    const router = useRouter();
    const [data, setData] = useState(null);
    const [loaded, setLoaded] = useState(false)

    useEffect(()=> {
        if(!data) {
            const properties = getAllProperties()
                .then((prop)=> setData(prop["properties"]))
                .catch((e)=> console.log('Error occured: ', e))
                .finally(setLoaded(true))
        }
    }, [data])

    async function getImage(propertyId) {
        let image
        try {
            const data = await getImageByPropertyId(propertyId)
            console.log('DATA', data)

            if(data.ok) {
                image = data
            }
        } catch(e) {
            console.log("Error Occured: ", e)
        }
        if(image) return image
        return defaultImage
    }

    return (
        <div className="defaultWrapper">
        {loaded && (
            <>
            <button onClick={()=> router.push('/property/new')}>Create New Property</button>

            <h2>Properties</h2>
            <div className={styles.properySection}>
                
                {data?.length > 0 ? data.map(property => (
                    <div className={styles.property} key={property.id}>
                        <img src={getImage(property.id)} alt={`Property${property.id}`} />
                        <a href={`/property/${property.id}`}>{property.name}</a>

                        <div className={styles.propertyActions}>
                            <button>Edit</button>
                            <button>Delete</button>
                        </div>
                    </div>
                )) : (
                    <p>Must create a property</p>
                )}
            </div>
            </>
        )}
        </div>
    )
}