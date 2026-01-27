"use client"; // Must be at the top

import { useEffect, useRef, useContext } from "react";;
import { useRouter, useParams } from "next/navigation";
import { getPropertyById } from "@/api/property";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { mapElementContext } from "@/app/property/map/[id]/page";

export default function Map() {
    const mapContainerRef = useRef(null);
    const { id } = useParams();
    const mapEl = useContext(mapElementContext);
    const { element,
            elCoordinates,
            direction
        } = mapEl;

    useEffect(() => {
        async function initMap() {
            const pData = await getPropertyById(id);
            const { address, city, state, zip, country, name } = pData.property;
            const addressString = [address, city, state, zip, country].filter(Boolean).join(", ");
            // console.log(addressString);

            const coords = await getCoordinatesFromAddress(addressString);

            if(!coords) {
                console.error("Could not geocode address:", addressString);
            }

            // Initialize MapLibre only once
            const map = new maplibregl.Map({
                container: mapContainerRef.current,
                style: {
                    version: 8,
                    sources: {
                        "osm-tiles": {
                            type: "raster",
                            tiles: [
                            "https://a.tile.openstreetmap.org/{z}/{x}/{y}.png",
                            ],
                            tileSize: 256,
                            attribution: "© OpenStreetMap contributors",
                        },
                    },
                    layers: [
                        {
                            id: "osm-tiles",
                            type: "raster",
                            source: "osm-tiles",
                            minzoom: 0,
                            maxzoom: 19,
                        },
                    ],
                },
                // center: coords ? [coords.lng, coords.lat] : [-84.1773, 33.4348], // fallback center
                zoom: 17,
                bearing: -90,
            });

            // Add navigation controls
            map.addControl(
                new maplibregl.NavigationControl({ visualizePitch: true }),
                "top-right"
            );

            // Example heatmap data
            // const propertyCoordinates = {
            //     b1: { name: "Building 1", lat: 33.4348006, lng: -84.1773155 },
            //     b7: { name: "Building 7", lat: 33.4375918, lng: -84.1767307 },
            // };

            // const activityLevels = { b1: 4, b7: 3 };

            // const features = Object.entries(propertyCoordinates).map(([id, loc]) => ({
            //     type: "Feature",
            //     properties: { intensity: activityLevels[id] || 0 },
            //     geometry: {
            //         type: "Point",
            //         coordinates: [loc.lng, loc.lat],
            //     },
            // }));

            // const geojson = { type: "FeatureCollection", features };

            map.on("load", () => {
                map.addSource("maintenance", {
                    type: "geojson",
                    data: {
                        type: "FeatureCollection",
                        features: [{
                            type: "Feature",
                            geometry: {
                                type: "Point",
                                coordinates: [coords.lng, coords.lat]
                            }
                        }]
                    }
                })

                

                // map.addSource("maintenance", {
                //     type: "geojson",
                //     data: geojson,
                // });

                // map.addLayer({
                //     id: "maintenance-heat",
                //     type: "heatmap",
                //     source: "maintenance",
                //     maxzoom: 19,
                //     paint: {
                //         "heatmap-weight": ["get", "intensity"],
                //         "heatmap-intensity": 1,
                //         "heatmap-radius": 30,
                //         "heatmap-opacity": 0.9,
                //         "heatmap-color": [
                //             "interpolate",
                //             ["linear"],
                //             ["heatmap-density"],
                //             0, "transparent",
                //             0.2, "blue",
                //             0.4, "lime",
                //             0.6, "orange",
                //             0.8, "purple",
                //             1, "red",
                //         ],
                //     },
                // });

            // Fit bounds to points
            // const bounds = new maplibregl.LngLatBounds();

            // geojson.features.forEach((f) => bounds.extend(f.geometry.coordinates));
            // map.fitBounds(bounds, { padding: 50, bearing: -90 });
            });

            if(coords) {
                new maplibregl.Marker({ color: "#e11d48 "})
                    .setLngLat([coords.lng, coords.lat])
                    .setPopup(
                        new maplibregl.Popup().setText(name)
                    )
                    .addTo(map);
            }

            map.flyTo({
                center: [coords.lng, coords.lat],
                zoom: 16,
                essential: true
            });

            return () => map.remove(); // cleanup on unmount
        }

        initMap();
    }, []);

    useEffect(()=> {
        if(direction !== 'map') return;

        // get element class and set x and y
        element.style.offsetTop = elCoordinates.x
        element.style.offsetLeft = elCoordinates.y

        
        mapContainerRef.current.append(element);
    }, [mapEl])

    async function getCoordinatesFromAddress(address) {
        const response = await fetch(
            `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`
        );
        const data = await response.json();
        if (data.length > 0) {
            return {
            lat: parseFloat(data[0].lat),
            lng: parseFloat(data[0].lon),
            };
        }
        return null;
    }



  return (
    <div
      ref={mapContainerRef}
      style={{ width: "100%", height: "100%" }}
    />
  );
}