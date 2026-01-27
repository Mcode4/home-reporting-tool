"use client";
import { createContext, useState } from "react";
import MapComponent from "@/components/Map"
import AssetsComponent from "@/components/Assets"
import styles from "./page.module.css"

export const mapElementContext = createContext(null);

export default function MapPage() {
    const [element, setElement] = useState(null);
    const [elCoordinates, setElCoordinates] = useState({x: null, y:null});
    const [direction, setDirection] = useState(null);

    return (
        <mapElementContext.Provider value={{
            element,
            setElement,
            elCoordinates,
            setElCoordinates,
            direction,
            setDirection
        }}>
            <div className={styles.mapContainer} style={{ width: '100%', height: '100vh' }}>
                <AssetsComponent />
                <MapComponent />
            </div>
        </mapElementContext.Provider>
    )
}
