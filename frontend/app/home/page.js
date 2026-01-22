"use client";
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react";
import { getAllProperties, deleteProperty } from "@/api/property";
import { getImageById } from "@/api/images";
import Image from "next/image";
import defaultImage from "@/public/HomeInsuranceCompany.jpg"
import styles from './page.module.css'

export default function HomePage() {
    const router = useRouter();
    const [data, setData] = useState(null);
    const [images, setImages] = useState(null);
    const [loaded, setLoaded] = useState(false)

    useEffect(()=> {
        if(!data) {
            async function loadFunc() {
                try {
                    const propData =  await getAllProperties();
                    const properties = propData["properties"];
                    setData(properties);

                    console.log('Properties: ', properties)
                    properties.forEach(async (p)=> {
                        const res = await getImageById(p.image_id)
                        console.log('RES', res)
                        setImages(prev => ({ 
                            ...prev, 
                            [p.property_id]: res?.url || "/HomeInsuranceCompany.jpg" 
                        }))
                    });
                    
                }
                catch(e) {
                    console.log('Error occured: ', e);
                }
                finally {
                    setLoaded(true);
                }
            }
            loadFunc()
        }
    }, [data])

    async function handleDelete (e, id) {
        e.preventDefault();
        try {
            const res = await deleteProperty(id);
            console.log("RES", res)
            window.location.reload();
        }
        catch(e) {
            console.log('Error occured', e);
        } 
    }

    return (
        <div className="defaultWrapper">
        {loaded && (
            <>
            <button onClick={()=> router.push('/property/new')}>Create New Property</button>

            <h2>Properties</h2>
            <div className={styles.properySection}>
                
                {data?.length > 0 ? data.map(property => (
                    <div 
                        className={styles.property} 
                        key={property.property_id}
                        style={{
                            display: "flex", flexDirection: "column",
                        }}
                    >
                        <div className="click-area" onClick={()=> router.push(`/property/${property.property_id}`)} style={{
                            cursor: "pointer"
                        }}>
                            <Image 
                                src={images?.[property.property_id] || defaultImage} 
                                alt={property.name}
                                height={100}
                                width={100}
                            />
                            <p>{property.name}</p>
                        </div>

                        <div className={styles.propertyActions}>
                            <button onClick={()=> router.push(`/property/map/${property.property_id}`)}>Map Demo</button>
                            <button onClick={()=> router.push(`/property/edit/${property.property_id}`)}>Edit</button>
                            <button onClick={(e)=> handleDelete(e, property.property_id)}>Delete</button>
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