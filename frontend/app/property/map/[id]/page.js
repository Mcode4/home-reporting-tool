import MapComponent from "@/components/Map"
import AssetsComponent from "@/components/Assets"
import styles from "./page.module.css"

export default function MapPage() {

    return (
        <div className={styles.mapContainer} style={{ width: '100%', height: '100vh' }}>
            <AssetsComponent />
            <MapComponent />
        </div>
    )
}
