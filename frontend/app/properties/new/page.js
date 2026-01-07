"use client";
import { useRouter } from "next/navigation";

export default function NewPropertyPage() {
    const router = useRouter();

    return (
        <div className="main">
        <h2>Set up Property</h2>

        <form action="">
            <label htmlFor="prop-name">Name: </label>
            <input type="text" name="name" id="prop-name" />

            <label htmlFor="location">Location: </label>
            <input type="text" name="location" id="location" />

            <label htmlFor="bedroom-size">Bedrooms: </label>
            <input type="number" name="bedroom-size" id="bedroom-size" min={1} value={1} />

            <label htmlFor="bathroom-size">Bathrooms: </label>
            <input type="number" name="bathroom-size" id="bathroom-size" min={1} value={1} />

            <button type="submit">Submit</button>
            <button type="button" onClick={()=> router.push('/home')}>Back to Home</button>
        </form>
        </div>
    )
}