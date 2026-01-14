"use client";
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react";
import { getAllProperties } from "@/api/property";
import styles from './page.module.css'

export default function HomePagePage() {
    const router = useRouter();
    const [data, setData] = useState(null);
    const [loaded, setLoaded] = useState(false)

    useEffect(()=> {
        if(!data) {
            const properties = getAllProperties()
                .then((prop)=> setData(prop["properties"]))
                .then(()=> setLoaded(true))
                .catch((e)=> console.log('Error occured: ', e))
        }
    }, [data])

    return (
        <div className="defaultWrapper">
        {loaded && (
            <>
            <button onClick={()=> router.push('/properties/new')}>Create New Property</button>

            <h2>Properties</h2>
            <div className={styles.properySection}>
                
                {data?.length > 0 ? data.map(property => (
                    <div className={styles.property} key={property.id}>
                        <img src="" alt={`Property${property.id}`} />
                        <div>{property.name}</div>
                    </div>
                )) : (
                    <p>Must a property</p>
                )}
            </div>
            </>
        )}
        </div>
    )
}