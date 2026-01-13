"use client";
import { useRouter } from "next/navigation"
import styles from './page.module.css'

export default function HomePagePage() {
    const router = useRouter();
    const data = [{id: 1, name: 'Initial Property'}, {id: 2, name: 'Secondary Property'}]

    return (
        <div className="defaultWrapper">
        <button onClick={()=> router.push('/properties/new')}>Create New Property</button>

        <h2>Properties</h2>
        <div className={styles.properySection}>
            
            {data.length > 0 ? data.map(property => (
                <div className={styles.property} key={property.id}>
                    <img src="" alt={`Property${property.id}`} />
                    <div>{property.name}</div>
                </div>
            )) : (
                <p>Must a property</p>
            )}
        </div>

        
        </div>
    )
}