"use client";

import { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";


export default function HeatMap() {
  const mapContainer = useRef(null);
  const mapRef = useRef(null);

  useEffect(() => {
    if (!mapContainer.current || mapRef.current) return;

    const map = new maplibregl.Map({
      container: mapContainer.current,
      style: {
        version: 8,
        sources: {
          "osm-tiles": {
            type: "raster",
            tiles: [
              "https://a.tile.openstreetmap.org/{z}/{x}/{y}.png",
              "https://b.tile.openstreetmap.org/{z}/{x}/{y}.png",
              "https://c.tile.openstreetmap.org/{z}/{x}/{y}.png"
            ],
            tileSize: 256,
            attribution: "© OpenStreetMap contributors"
          }
        },
        layers: [
          {
            id: "osm-tiles",
            type: "raster",
            source: "osm-tiles",
            minzoom: 0,
            maxzoom: 19
          }
        ]
      },
      zoom: 17,
    //   bearing: -90
    });

    map.addControl(
      new maplibregl.NavigationControl({ visualizePitch: true }),
      "top-right"
    );

    const propertyCoordinates = {
      b1: { lat: 33.4348006, lng: -84.1773155 },
      b7: { lat: 33.4375918, lng: -84.1767307 },
      b15: { lat: 33.4390623, lng: -84.1765832 },
      a16: { lat: 33.4372292, lng: -84.1771089 },
      a17: { lat: 33.4335270, lng: -84.1778465 },
      a19: { lat: 33.4330614, lng: -84.1776427 },
      a20: { lat: 33.4342791, lng: -84.1778331 },
      a21: { lat: 33.4346417, lng: -84.1778868 },
      a22: { lat: 33.4349752, lng: -84.1768622 },
      a23: { lat: 33.4371419, lng: -84.1772645 },
      a24: { lat: 33.4381581, lng: -84.1761353 }
    };

    const activityLevels = {
      a19: 8, a20: 6, a21: 7, a22: 5, a23: 9, a24: 10,
      a16: 7, a17: 9,
      b1: 4, b7: 3, b15: 5
    };

    const geojson = {
      type: "FeatureCollection",
      features: Object.entries(propertyCoordinates).map(([id, loc]) => ({
        type: "Feature",
        properties: { intensity: activityLevels[id] || 0 },
        geometry: {
          type: "Point",
          coordinates: [loc.lng, loc.lat]
        }
      }))
    };

    map.on("load", () => {
      map.addSource("maintenance", {
        type: "geojson",
        data: geojson
      });

      map.addLayer({
        id: "maintenance-heat",
        type: "heatmap",
        source: "maintenance",
        maxzoom: 19,
        paint: {
          "heatmap-weight": ["get", "intensity"],
          "heatmap-radius": 30,
          "heatmap-opacity": 0.9,
          "heatmap-color": [
            "interpolate",
            ["linear"],
            ["heatmap-density"],
            0, "transparent",
            0.2, "blue",
            0.4, "lime",
            0.6, "orange",
            0.8, "purple",
            1, "red"
          ]
        }
      });

      const bounds = new maplibregl.LngLatBounds();
      geojson.features.forEach(f =>
        bounds.extend(f.geometry.coordinates)
      );
      map.fitBounds(bounds, { padding: 50, bearing: -90 });
    });

    mapRef.current = map;

    return () => map.remove();
  }, []);

  return (
    <div
      ref={mapContainer}
      style={{ width: "100%", height: "100vh" }}
    />
  );
}