"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { getPropertyById } from "@/api/property";

export default function PropertyPage() {
    const params = useParams();
    const [property, setProperty] = useState(null);
    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!params.id) return;
        
        getPropertyById(params.id)
            .then(data => {
                setProperty(data.property || data);
                setLoaded(true);
            })
            .catch(err => {
                setError(err.message || "Failed to load property");
                setLoaded(true);
            });
    }, [params.id]);

    if (!loaded) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!property) return <div>Property not found</div>;

    const handleChange = (path, value) => {
        setProperty(prev => {
            const updated = JSON.parse(JSON.stringify(prev)); // deep clone
            const keys = path.split('.');
            let obj = updated;
            for (let i = 0; i < keys.length - 1; i++) {
                obj = obj[keys[i]];
            }
            obj[keys[keys.length - 1]] = value;
            console.log("path:", path)
            console.log("property:",property)
            console.log("updated value:", keys[keys.length - 2], "=", value );
            return updated;
            
        });
    };

    return (
        <div id="propertyPage">
            {loaded && (
                <>
                    <h1>{property?.name} · Unit Inspection</h1>
                    <form id="inspectionForm">
                        <div className="meta">
                            <label>Unit Number: 
                                <input 
                                    type="text" 
                                    id="unitNumber" 
                                    value={property?.details?.main?.unitNumber?.value || ''} 
                                    onChange={(e) => handleChange('details.main.unitNumber.value', e.target.value)} 
                                />
                            </label>
                            
                            <label>Inspected By: 
                                <input 
                                    type="text" 
                                    id="inspectorName" 
                                    value={property?.details?.main?.inspectedBy?.value || ''} 
                                    onChange={(e) => handleChange('details.main.inspectedBy.value', e.target.value)} 
                                />
                            </label>
                            
                            <label>Date Completed: 
                                <input 
                                    type="date" 
                                    id="dateCompleted" 
                                    value={property?.details?.main?.dateComplete?.value || ''} 
                                    onChange={(e) => handleChange('details.main.dateComplete.value', e.target.value)} 
                                />
                            </label>

                            <label>Vendor (Leasing) On:
                                <select 
                                    id="vendorLeasing" 
                                    value={property?.details?.main?.vendorLeasing?.value || ''} 
                                    onChange={(e) => handleChange('details.main.vendorLeasing.value', e.target.value)}
                                >
                                    <option value="">— Select —</option>
                                    <option value="Yes">Yes</option>
                                    <option value="No">No</option>
                                </select>
                            </label>

                            <label>Vendor (Renovation) On:
                                <select 
                                    id="vendorRenovation" 
                                    value={property?.details?.main?.vendorRenovation?.value || ''} 
                                    onChange={(e) => handleChange('details.main.vendorRenovation.value', e.target.value)}
                                >
                                    <option value="">— Select —</option>
                                    <option value="Yes">Yes</option>
                                    <option value="No">No</option>
                                </select>
                            </label>

                            <label>Unit Power On:
                                <select 
                                    id="unitPower" 
                                    value={property?.details?.main?.unitPowerOn?.value || ''} 
                                    onChange={(e) => handleChange('details.main.unitPowerOn.value', e.target.value)}
                                >
                                    <option value="">— Select —</option>
                                    <option value="Yes">Yes</option>
                                    <option value="No">No</option>
                                </select>
                            </label>

                            <label>Water Power On:
                                <select 
                                    id="waterPowerOn" 
                                    value={property?.details?.main?.waterPowerOn?.value || ''} 
                                    onChange={(e) => handleChange('details.main.waterPowerOn.value', e.target.value)}
                                >
                                    <option value="">— Select —</option>
                                    <option value="Yes">Yes</option>
                                    <option value="No">No</option>
                                </select>
                            </label>

                            <button type="button" onClick="markCompleted()">Completed</button>
                            <button type="button" onClick="checkUnitStatus()">Check Unit Status</button>
                        </div>
                    </form>
                </>
            )}
        </div>
    );
}