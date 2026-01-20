"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { getPropertyById } from "@/api/property";

// Values on form remove on refresh
// Need to save to a cookie or local session

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
            })
            .catch(err => {
                setError(err.message || "Failed to load property");
            });
        
    }, [params.id]);

    useEffect(()=> {
        if(!property || loaded) return;

        console.log('local storage validate, property:', property);
        const saved = localStorage.getItem("propertyDraft");
        console.log('saved', saved)

        if(saved) {
            try {
                setProperty(p => ({
                    ...p,
                    details: JSON.parse(saved)
                }));
                localStorage.removeItem("propertyDraft");
            }
            catch(e) {
                console.error('Error occured', e);
            }
        }
        setLoaded(true);
    }, [property, loaded]);

    useEffect(()=> {
        if(loaded && property?.details) {

            localStorage.setItem(
                "propertyDraft", 
                JSON.stringify(property.details)
            );
        }
    }, [property, loaded])

    if (!loaded) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!property) return <div>Property not found</div>;

    const handleChange = (path, value) => {
        setProperty(prev => {
            const updated = JSON.parse(JSON.stringify(prev)); // deep clone
            const keys = path.split('.');
            console.log('KEYS', keys)
            let obj = updated;
            for (let i = 0; i < keys.length - 1; i++) {
                obj = obj[keys[i]];
            }
            obj[keys[keys.length - 1]] = value;
            // console.log('TEST1:', obj[keys[keys.length - 1]]);
            console.log("TEST2:", value);
            console.log("path:", path);
            console.log("updated value:", keys[keys.length - 2], "=", value );
            console.log("property:",property);
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

                        {Array.from({length: property?.bedroom_size || 0}, (_, i)=> (
                            <details key={`bedroom${i+1}`}>
                            <summary>Bedroom {property?.bedroom_size > 1 && i+1}</summary>

                            <div class="item-group">
                                <span class="item-label">Doorknob locks working</span>
                                <select name="br1_doorknob_locks"
                                    value={property?.details.bedrooms[`bedroom${i+1}`].doorknobLock.value || ""}
                                    onChange={(e)=> handleChange(`details.bedrooms.bedroom${i+1}.doorknobLock.value`, e.target.value)}
                                >
                                <option value="">— Select —</option>
                                <option value="okay">✅ OKAY</option>
                                <option value="repair">🔧 REPAIR</option>
                                <option value="replace">♻️ REPLACE</option>
                                </select>
                            </div>

                            <div class="item-group">
                                <span class="item-label">Door - open/close damages</span>
                                <select name="br1_door_damages"
                                    value={property?.details.bedrooms[`bedroom${i+1}`].doorDamage.value || ""}
                                    onChange={(e)=> handleChange(`details.bedrooms.bedroom${i+1}.doorDamage.value`, e.target.value)}
                                >
                                <option value="">— Select —</option>
                                <option value="okay">✅ OKAY</option>
                                <option value="repair">🔧 REPAIR</option>
                                <option value="replace">♻️ REPLACE</option>
                                </select>
                            </div>

                            <div class="item-group">
                                <span class="item-label">Door - door stopper</span>
                                <select name="br1_door_stopper"
                                    value={property?.details.bedrooms[`bedroom${i+1}`].doorStopper.value || ""}
                                    onChange={(e)=> handleChange(`details.bedrooms.bedroom${i+1}.doorStopper.value`, e.target.value)}
                                >
                                <option value="">— Select —</option>
                                <option value="okay">✅ OKAY</option>
                                <option value="repair">🔧 REPAIR</option>
                                <option value="replace">♻️ REPLACE</option>
                                </select>
                            </div>

                            <div class="item-group">
                                <span class="item-label">Closet door - on hinge/track</span>
                                <select name="br1_closet_door_hinge"
                                    value={property?.details.bedrooms[`bedroom${i+1}`].closetDoorHinge.value || ""}
                                    onChange={(e)=> handleChange(`details.bedrooms.bedroom${i+1}.closetDoorHinge.value`, e.target.value)}
                                >
                                <option value="">— Select —</option>
                                <option value="okay">✅ OKAY</option>
                                <option value="repair">🔧 REPAIR</option>
                                <option value="replace">♻️ REPLACE</option>
                                </select>
                            </div>

                            <div class="item-group">
                                <span class="item-label">Closet door - door stopper</span>
                                <select name="br1_closet_door_stopper"
                                    value={property?.details.bedrooms[`bedroom${i+1}`].closetDoorStopper.value || ""}
                                    onChange={(e)=> handleChange(`details.bedrooms.bedroom${i+1}.closetDoorStopper.value`, e.target.value)}
                                >
                                <option value="">— Select —</option>
                                <option value="okay">✅ OKAY</option>
                                <option value="repair">🔧 REPAIR</option>
                                <option value="replace">♻️ REPLACE</option>
                                </select>
                            </div>

                            <div class="item-group">
                                <span class="item-label">Closet shelves - secure</span>
                                <select name="br1_closet_shelves"
                                    value={property?.details.bedrooms[`bedroom${i+1}`].closetShelves.value || ""}
                                    onChange={(e)=> handleChange(`details.bedrooms.bedroom${i+1}.closetShelves.value`, e.target.value)}
                                >
                                <option value="">— Select —</option>
                                <option value="okay">✅ OKAY</option>
                                <option value="repair">🔧 REPAIR</option>
                                <option value="replace">♻️ REPLACE</option>
                                </select>
                            </div>

                            <div class="item-group">
                                <span class="item-label">Switch covers - painted/damaged</span>
                                <select name="br1_switch_covers"
                                    value={property?.details.bedrooms[`bedroom${i+1}`].switchCovers.value || ""}
                                    onChange={(e)=> handleChange(`details.bedrooms.bedroom${i+1}.switchCovers.value`, e.target.value)}
                                >
                                <option value="">— Select —</option>
                                <option value="okay">✅ OKAY</option>
                                <option value="repair">🔧 REPAIR</option>
                                <option value="replace">♻️ REPLACE</option>
                                </select>
                            </div>

                            <div class="item-group">
                                <span class="item-label">Clean A/C vents</span>
                                <select name="br1_ac_vents_clean"
                                    value={property?.details.bedrooms[`bedroom${i+1}`].cleanACVents.value || ""}
                                    onChange={(e)=> handleChange(`details.bedrooms.bedroom${i+1}.cleanACVents.value`, e.target.value)}
                                >
                                <option value="">— Select —</option>
                                <option value="okay">✅ OKAY</option>
                                <option value="repair">🔧 REPAIR</option>
                                <option value="replace">♻️ REPLACE</option>
                                </select>
                            </div>

                            <div class="item-group">
                                <span class="item-label">Lightbulbs - light fixture</span>
                                <select name="br1_light_fixture"
                                    value={property?.details.bedrooms[`bedroom${i+1}`].lightbulbs.value || ""}
                                    onChange={(e)=> handleChange(`details.bedrooms.bedroom${i+1}.lightbulbs.value`, e.target.value)}
                                >
                                <option value="">— Select —</option>
                                <option value="okay">✅ OKAY</option>
                                <option value="repair">🔧 REPAIR</option>
                                <option value="replace">♻️ REPLACE</option>
                                </select>
                            </div>

                            <div class="item-group">
                                <span class="item-label">Ceiling fan - working</span>
                                <select name="br1_ceiling_fan"
                                    value={property?.details.bedrooms[`bedroom${i+1}`].ceilingFan.value || ""}
                                    onChange={(e)=> handleChange(`details.bedrooms.bedroom${i+1}.ceilingFan.value`, e.target.value)}
                                >
                                <option value="">— Select —</option>
                                <option value="okay">✅ OKAY</option>
                                <option value="repair">🔧 REPAIR</option>
                                <option value="replace">♻️ REPLACE</option>
                                </select>
                            </div>

                            <div class="item-group">
                                <span class="item-label">Windows - broken</span>
                                <select name="br1_windows_broken"
                                    value={property?.details.bedrooms[`bedroom${i+1}`].windowsBroke.value || ""}
                                    onChange={(e)=> handleChange(`details.bedrooms.bedroom${i+1}.windowsBroke.value`, e.target.value)}
                                >
                                <option value="">— Select —</option>
                                <option value="okay">✅ OKAY</option>
                                <option value="repair">🔧 REPAIR</option>
                                <option value="replace">♻️ REPLACE</option>
                                </select>
                            </div>

                            <div class="item-group">
                                <span class="item-label">Windows - locks</span>
                                <select name="br1_windows_locks"
                                    value={property?.details.bedrooms[`bedroom${i+1}`].windowsLock.value || ""}
                                    onChange={(e)=> handleChange(`details.bedrooms.bedroom${i+1}.windowsLock.value`, e.target.value)}
                                >
                                <option value="">— Select —</option>
                                <option value="okay">✅ OKAY</option>
                                <option value="repair">🔧 REPAIR</option>
                                <option value="replace">♻️ REPLACE</option>
                                </select>
                            </div>

                            <div class="item-group">
                                <span class="item-label">Windows - don't open</span>
                                <select name="br1_windows_dont_open"
                                    value={property?.details.bedrooms[`bedroom${i+1}`].windowsDontOpen.value || ""}
                                    onChange={(e)=> handleChange(`details.bedrooms.bedroom${i+1}.windowsDontOpen.value`, e.target.value)}
                                >
                                <option value="">— Select —</option>
                                <option value="okay">✅ OKAY</option>
                                <option value="repair">🔧 REPAIR</option>
                                <option value="replace">♻️ REPLACE</option>
                                </select>
                            </div>

                            <div class="item-group">
                                <span class="item-label">Windows - screens missing</span>
                                <select name="br1_windows_screens_missing"
                                    value={property?.details.bedrooms[`bedroom${i+1}`].windowsScreenMissing.value || ""}
                                    onChange={(e)=> handleChange(`details.bedrooms.bedroom${i+1}.windowsScreenMissing.value`, e.target.value)}
                                >
                                <option value="">— Select —</option>
                                <option value="okay">✅ OKAY</option>
                                <option value="repair">🔧 REPAIR</option>
                                <option value="replace">♻️ REPLACE</option>
                                </select>
                            </div>

                            <div class="item-group">
                                <span class="item-label">Baseboard - cracked</span>
                                <select name="br1_baseboard_cracked"
                                    value={property?.details.bedrooms[`bedroom${i+1}`].baseboardsCrack.value || ""}
                                    onChange={(e)=> handleChange(`details.bedrooms.bedroom${i+1}.baseboardsCrack.value`, e.target.value)}
                                >
                                <option value="">— Select —</option>
                                <option value="okay">✅ OKAY</option>
                                <option value="repair">🔧 REPAIR</option>
                                <option value="replace">♻️ REPLACE</option>
                                </select>
                            </div>

                            <div class="item-group">
                                <span class="item-label">Blinds - broken</span>
                                <select name="br1_blinds_broken"
                                    value={property?.details.bedrooms[`bedroom${i+1}`].blindsBroke.value || ""}
                                    onChange={(e)=> handleChange(`details.bedrooms.bedroom${i+1}.blindsBroke.value`, e.target.value)}
                                >
                                <option value="">— Select —</option>
                                <option value="okay">✅ OKAY</option>
                                <option value="repair">🔧 REPAIR</option>
                                <option value="replace">♻️ REPLACE</option>
                                </select>
                            </div>

                            <div class="item-group">
                                <span class="item-label">Flooring - carpet/vinyl condition</span>
                                <select name="br1_flooring_condition"
                                    value={property?.details.bedrooms[`bedroom${i+1}`].flooringCondition.value || ""}
                                    onChange={(e)=> handleChange(`details.bedrooms.bedroom${i+1}.flooringCondition.value`, e.target.value)}
                                >
                                <option value="">— Select —</option>
                                <option value="okay">✅ OKAY</option>
                                <option value="repair">🔧 REPAIR</option>
                                <option value="replace">♻️ REPLACE</option>
                                </select>
                            </div>

                            <div class="item-group">
                                <span class="item-label">Closet flooring</span>
                                <select name="br1_closet_flooring"
                                    value={property?.details.bedrooms[`bedroom${i+1}`].closetFlooring.value || ""}
                                    onChange={(e)=> handleChange(`details.bedrooms.bedroom${i+1}.closetFlooring.value`, e.target.value)}
                                >
                                <option value="">— Select —</option>
                                <option value="okay">✅ OKAY</option>
                                <option value="repair">🔧 REPAIR</option>
                                <option value="replace">♻️ REPLACE</option>
                                </select>
                            </div>
                            </details>
                        ))}
                        
                        {Array.from({length: property?.bathroom_size || 0}, (_, i)=> (
                            <details key={`bathroom${i+1}`}>
                            <summary>Bath {property?.bathroom_size > 1 && i+1}</summary>

                            <div class="item-group">
                                <span class="item-label">Flooring - vinyl/tile presentable</span>
                                <select name="bath1_flooring"
                                    value={property?.details.baths[`bathroom${i+1}`].flooringPresentable.value || ""}
                                    onChange={(e)=> handleChange(`details.baths.bathroom${i+1}.flooringPresentable.value`, e.target.value)}
                                >
                                <option value="">— Select —</option>
                                <option value="okay">✅ OKAY</option>
                                <option value="repair">🔧 REPAIR</option>
                                <option value="replace">♻️ REPLACE</option>
                                </select>
                            </div>

                            <div class="item-group">
                                <span class="item-label">Countertop - resurface</span>
                                <select name="bath1_countertop_resurface"
                                    value={property?.details.baths[`bathroom${i+1}`].counterTopResurface.value || ""}
                                    onChange={(e)=> handleChange(`details.baths.bathroom${i+1}.counterTopResurface.value`, e.target.value)}
                                >
                                <option value="">— Select —</option>
                                <option value="okay">✅ OKAY</option>
                                <option value="repair">🔧 REPAIR</option>
                                <option value="replace">♻️ REPLACE</option>
                                </select>
                            </div>

                            <div class="item-group">
                                <span class="item-label">Countertop caulk</span>
                                <select name="bath1_countertop_caulk"
                                    value={property?.details.baths[`bathroom${i+1}`].counterTopCaulk.value || ""}
                                    onChange={(e)=> handleChange(`details.baths.bathroom${i+1}.counterTopCaulk.value`, e.target.value)}
                                >
                                <option value="">— Select —</option>
                                <option value="okay">✅ OKAY</option>
                                <option value="repair">🔧 REPAIR</option>
                                <option value="replace">♻️ REPLACE</option>
                                </select>
                            </div>

                            <div class="item-group">
                                <span class="item-label">Mirror - cracked/discolored</span>
                                <select name="bath1_mirror"
                                    value={property?.details.baths[`bathroom${i+1}`].mirrorCracked.value || ""}
                                    onChange={(e)=> handleChange(`details.baths.bathroom${i+1}.mirrorCracked.value`, e.target.value)}
                                >
                                <option value="">— Select —</option>
                                <option value="okay">✅ OKAY</option>
                                <option value="repair">🔧 REPAIR</option>
                                <option value="replace">♻️ REPLACE</option>
                                </select>
                            </div>

                            <div class="item-group">
                                <span class="item-label">Faucet - dripping/leaking</span>
                                <select name="bath1_faucet_leak"
                                    value={property?.details.baths[`bathroom${i+1}`].faucetDrip.value || ""}
                                    onChange={(e)=> handleChange(`details.baths.bathroom${i+1}.faucetDrip.value`, e.target.value)}
                                >
                                <option value="">— Select —</option>
                                <option value="okay">✅ OKAY</option>
                                <option value="repair">🔧 REPAIR</option>
                                <option value="replace">♻️ REPLACE</option>
                                </select>
                            </div>

                            <div class="item-group">
                                <span class="item-label">Stopper - remove old system</span>
                                <select name="bath1_stop_system"
                                    value={property?.details.baths[`bathroom${i+1}`].stopperOld.value || ""}
                                    onChange={(e)=> handleChange(`details.baths.bathroom${i+1}.stopperOld.value`, e.target.value)}
                                >
                                <option value="">— Select —</option>
                                <option value="okay">✅ OKAY</option>
                                <option value="repair">🔧 REPAIR</option>
                                <option value="replace">♻️ REPLACE</option>
                                </select>
                            </div>

                            <div class="item-group">
                                <span class="item-label">Medicine cabinet - clean/damaged</span>
                                <select name="bath1_medicine_cabinet"
                                    value={property?.details.baths[`bathroom${i+1}`].medicineCabinetDamaged.value || ""}
                                    onChange={(e)=> handleChange(`details.baths.bathroom${i+1}.medicineCabinetDamaged.value`, e.target.value)}
                                >
                                <option value="">— Select —</option>
                                <option value="okay">✅ OKAY</option>
                                <option value="repair">🔧 REPAIR</option>
                                <option value="replace">♻️ REPLACE</option>
                                </select>
                            </div>

                            <div class="item-group">
                                <span class="item-label">Medicine cabinet - mirror faded spots</span>
                                <select name="bath1_medicine_mirror_faded"
                                    value={property?.details.baths[`bathroom${i+1}`].medicineCabinetFaded.value || ""}
                                    onChange={(e)=> handleChange(`details.baths.bathroom${i+1}.medicineCabinetFaded.value`, e.target.value)}
                                >
                                <option value="">— Select —</option>
                                <option value="okay">✅ OKAY</option>
                                <option value="repair">🔧 REPAIR</option>
                                <option value="replace">♻️ REPLACE</option>
                                </select>
                            </div>

                            <div class="item-group">
                                <span class="item-label">Lightbulbs - light fixture secure</span>
                                <select name="bath1_light_fixture"
                                    value={property?.details.baths[`bathroom${i+1}`].lightbulbs.value || ""}
                                    onChange={(e)=> handleChange(`details.baths.bathroom${i+1}.lightbulbs.value`, e.target.value)}
                                >
                                <option value="">— Select —</option>
                                <option value="okay">✅ OKAY</option>
                                <option value="repair">🔧 REPAIR</option>
                                <option value="replace">♻️ REPLACE</option>
                                </select>
                            </div>

                            <div class="item-group">
                                <span class="item-label">Toilet - seat</span>
                                <select name="bath1_toilet_seat"
                                    value={property?.details.baths[`bathroom${i+1}`].toiletSeat.value || ""}
                                    onChange={(e)=> handleChange(`details.baths.bathroom${i+1}.toiletSeat.value`, e.target.value)}
                                >
                                <option value="">— Select —</option>
                                <option value="okay">✅ OKAY</option>
                                <option value="repair">🔧 REPAIR</option>
                                <option value="replace">♻️ REPLACE</option>
                                </select>
                            </div>

                            <div class="item-group">
                                <span class="item-label">Toilet - working with water</span>
                                <select name="bath1_toilet_working"
                                    value={property?.details.baths[`bathroom${i+1}`].toiletWorking.value || ""}
                                    onChange={(e)=> handleChange(`details.baths.bathroom${i+1}.toiletWorking.value`, e.target.value)}
                                >
                                <option value="">— Select —</option>
                                <option value="okay">✅ OKAY</option>
                                <option value="repair">🔧 REPAIR</option>
                                <option value="replace">♻️ REPLACE</option>
                                </select>
                            </div>

                            <div class="item-group">
                                <span class="item-label">Toilet - bolts/caulking</span>
                                <select name="bath1_toilet_bolts"
                                    value={property?.details.baths[`bathroom${i+1}`].toiletCaulking.value || ""}
                                    onChange={(e)=> handleChange(`details.baths.bathroom${i+1}.toiletCaulking.value`, e.target.value)}
                                >
                                <option value="">— Select —</option>
                                <option value="okay">✅ OKAY</option>
                                <option value="repair">🔧 REPAIR</option>
                                <option value="replace">♻️ REPLACE</option>
                                </select>
                            </div>

                            <div class="item-group">
                                <span class="item-label">Toilet - running/leaking</span>
                                <select name="bath1_toilet_leaking"
                                    value={property?.details.baths[`bathroom${i+1}`].toiletLeaking.value || ""}
                                    onChange={(e)=> handleChange(`details.baths.bathroom${i+1}.toiletLeaking.value`, e.target.value)}
                                >
                                <option value="">— Select —</option>
                                <option value="okay">✅ OKAY</option>
                                <option value="repair">🔧 REPAIR</option>
                                <option value="replace">♻️ REPLACE</option>
                                </select>
                            </div>

                            <div class="item-group">
                                <span class="item-label">Bathtub - stopper</span>
                                <select name="bath1_bathtub_stopper"
                                    value={property?.details.baths[`bathroom${i+1}`].bathtubStopper.value || ""}
                                    onChange={(e)=> handleChange(`details.baths.bathroom${i+1}.bathtubStopper.value`, e.target.value)}
                                >
                                <option value="">— Select —</option>
                                <option value="okay">✅ OKAY</option>
                                <option value="repair">🔧 REPAIR</option>
                                <option value="replace">♻️ REPLACE</option>
                                </select>
                            </div>

                            <div class="item-group">
                                <span class="item-label">Bathtub - resurfacing needed</span>
                                <select name="bath1_bathtub_resurface"
                                    value={property?.details.baths[`bathroom${i+1}`].bathtubResurface.value || ""}
                                    onChange={(e)=> handleChange(`details.baths.bathroom${i+1}.bathtubResurface.value`, e.target.value)}
                                >
                                <option value="">— Select —</option>
                                <option value="okay">✅ OKAY</option>
                                <option value="repair">🔧 REPAIR</option>
                                <option value="replace">♻️ REPLACE</option>
                                </select>
                            </div>

                            <div class="item-group">
                                <span class="item-label">Bathtub - shower diverter working/no leaks</span>
                                <select name="bath1_shower_diverter"
                                    value={property?.details.baths[`bathroom${i+1}`].bathtubShowerDiverter.value || ""}
                                    onChange={(e)=> handleChange(`details.baths.bathroom${i+1}.bathtubShowerDiverter.value`, e.target.value)}
                                >
                                <option value="">— Select —</option>
                                <option value="okay">✅ OKAY</option>
                                <option value="repair">🔧 REPAIR</option>
                                <option value="replace">♻️ REPLACE</option>
                                </select>
                            </div>

                            <div class="item-group">
                                <span class="item-label">Bathtub - shower towel bar</span>
                                <select name="bath1_towel_bar"
                                    value={property?.details.baths[`bathroom${i+1}`].bathtubTowelBar.value || ""}
                                    onChange={(e)=> handleChange(`details.baths.bathroom${i+1}.bathtubTowelBar.value`, e.target.value)}
                                >
                                <option value="">— Select —</option>
                                <option value="okay">✅ OKAY</option>
                                <option value="repair">🔧 REPAIR</option>
                                <option value="replace">♻️ REPLACE</option>
                                </select>
                            </div>

                            <div class="item-group">
                                <span class="item-label">Bathtub - shower head</span>
                                <select name="bath1_shower_head"
                                    value={property?.details.baths[`bathroom${i+1}`].bathtubShowerHead.value || ""}
                                    onChange={(e)=> handleChange(`details.baths.bathroom${i+1}.bathtubShowerHead.value`, e.target.value)}
                                >
                                <option value="">— Select —</option>
                                <option value="okay">✅ OKAY</option>
                                <option value="repair">🔧 REPAIR</option>
                                <option value="replace">♻️ REPLACE</option>
                                </select>
                            </div>

                            <div class="item-group">
                                <span class="item-label">Bathtub - shower curtain rod</span>
                                <select name="bath1_shower_rod"
                                    value={property?.details.baths[`bathroom${i+1}`].bathtubCurtainRob.value || ""}
                                    onChange={(e)=> handleChange(`details.baths.bathroom${i+1}.bathtubCurtainRob.value`, e.target.value)}
                                >
                                <option value="">— Select —</option>
                                <option value="okay">✅ OKAY</option>
                                <option value="repair">🔧 REPAIR</option>
                                <option value="replace">♻️ REPLACE</option>
                                </select>
                            </div>

                            <div class="item-group">
                                <span class="item-label">Bathroom faucet - working no leaks</span>
                                <select name="bath1_faucet_working"
                                    value={property?.details.baths[`bathroom${i+1}`].bathroomFaucetWorking.value || ""}
                                    onChange={(e)=> handleChange(`details.baths.bathroom${i+1}.bathroomFaucetWorking.value`, e.target.value)}
                                >
                                <option value="">— Select —</option>
                                <option value="okay">✅ OKAY</option>
                                <option value="repair">🔧 REPAIR</option>
                                <option value="replace">♻️ REPLACE</option>
                                </select>
                            </div>

                            <div class="item-group">
                                <span class="item-label">Bathroom faucet - hot/cold water</span>
                                <select name="bath1_faucet_hot_cold"
                                    value={property?.details.baths[`bathroom${i+1}`].bathroomFaucetHotCold.value || ""}
                                    onChange={(e)=> handleChange(`details.baths.bathroom${i+1}.bathroomFaucetHotCold.value`, e.target.value)}
                                >
                                <option value="">— Select —</option>
                                <option value="okay">✅ OKAY</option>
                                <option value="repair">🔧 REPAIR</option>
                                <option value="replace">♻️ REPLACE</option>
                                </select>
                            </div>

                            <div class="item-group">
                                <span class="item-label">Bathroom faucet - stopper missing</span>
                                <select name="bath1_faucet_stopper_missing"
                                    value={property?.details.baths[`bathroom${i+1}`].bathroomFaucetStopper.value || ""}
                                    onChange={(e)=> handleChange(`details.baths.bathroom${i+1}.bathroomFaucetStopper.value`, e.target.value)}
                                >
                                <option value="">— Select —</option>
                                <option value="okay">✅ OKAY</option>
                                <option value="repair">🔧 REPAIR</option>
                                <option value="replace">♻️ REPLACE</option>
                                </select>
                            </div>

                            <div class="item-group">
                                <span class="item-label">Bathroom - towel racks</span>
                                <select name="bath1_towel_racks"
                                    value={property?.details.baths[`bathroom${i+1}`].bathroomTowelRacks.value || ""}
                                    onChange={(e)=> handleChange(`details.baths.bathroom${i+1}.bathroomTowelRacks.value`, e.target.value)}
                                >
                                <option value="">— Select —</option>
                                <option value="okay">✅ OKAY</option>
                                <option value="repair">🔧 REPAIR</option>
                                <option value="replace">♻️ REPLACE</option>
                                </select>
                            </div>

                            <div class="item-group">
                                <span class="item-label">Bathroom - toilet paper holder</span>
                                <select name="bath1_toilet_paper_holder"
                                    value={property?.details.baths[`bathroom${i+1}`].bathroomToiletPaperHolder.value || ""}
                                    onChange={(e)=> handleChange(`details.baths.bathroom${i+1}.bathroomToiletPaperHolder.value`, e.target.value)}
                                >
                                <option value="">— Select —</option>
                                <option value="okay">✅ OKAY</option>
                                <option value="repair">🔧 REPAIR</option>
                                <option value="replace">♻️ REPLACE</option>
                                </select>
                            </div>

                            <div class="item-group">
                                <span class="item-label">Bathroom - door/hinges/knobs/strike plates</span>
                                <select name="bath1_door_hardware"
                                    value={property?.details.baths[`bathroom${i+1}`].bathroomDoorHingesKnobsStrikePlates.value || ""}
                                    onChange={(e)=> handleChange(`details.baths.bathroom${i+1}.bathroomDoorHingesKnobsStrikePlates.value`, e.target.value)}
                                >
                                <option value="">— Select —</option>
                                <option value="okay">✅ OKAY</option>
                                <option value="repair">🔧 REPAIR</option>
                                <option value="replace">♻️ REPLACE</option>
                                </select>
                            </div>

                            <div class="item-group">
                                <span class="item-label">Bathroom - shelving intact</span>
                                <select name="bath1_shelving"
                                    value={property?.details.baths[`bathroom${i+1}`].bathroomShelvingIntact.value || ""}
                                    onChange={(e)=> handleChange(`details.baths.bathroom${i+1}.bathroomShelvingIntact.value`, e.target.value)}
                                >
                                <option value="">— Select —</option>
                                <option value="okay">✅ OKAY</option>
                                <option value="repair">🔧 REPAIR</option>
                                <option value="replace">♻️ REPLACE</option>
                                </select>
                            </div>

                            <div class="item-group">
                                <span class="item-label">Fart fan - working, clean</span>
                                <select name="bath1_fart_fan"
                                    value={property?.details.baths[`bathroom${i+1}`].fartFan.value || ""}
                                    onChange={(e)=> handleChange(`details.baths.bathroom${i+1}.fartFan.value`, e.target.value)}
                                >
                                <option value="">— Select —</option>
                                <option value="okay">✅ OKAY</option>
                                <option value="repair">🔧 REPAIR</option>
                                <option value="replace">♻️ REPLACE</option>
                                </select>
                            </div>

                            <div class="item-group">
                                <span class="item-label">Bathroom - baseboards cracked/water damaged</span>
                                <select name="bath1_baseboards_damaged"
                                    value={property?.details.baths[`bathroom${i+1}`].bathroomBaseboardsDamage.value || ""}
                                    onChange={(e)=> handleChange(`details.baths.bathroom${i+1}.bathroomBaseboardsDamage.value`, e.target.value)}
                                >
                                <option value="">— Select —</option>
                                <option value="okay">✅ OKAY</option>
                                <option value="repair">🔧 REPAIR</option>
                                <option value="replace">♻️ REPLACE</option>
                                </select>
                            </div>
                            </details>
                        ))}

                        {property?.details.exterior && Array.from({length: property?.details.exterior.count}, (_, i)=> (
                            <details key={`exterior${i+1}`}>
                            <summary>Exterior {property?.details.exterior.count > 1 && i+1}</summary>
                            <div class="item-group">
                            <span class="item-label">Change locks - front door</span>
                            <select name="exterior_front_door_lock"
                                value={property?.details.exterior[`exterior${i+1}`].changeFrontLocks.value || ""}
                                onChange={(e)=> handleChange(`details.exterior.exterior${i+1}.changeFrontLocks.value`, e.target.value)}
                            >
                                <option value="">— Select —</option>
                                <option value="okay">✅ OKAY</option>
                                <option value="repair">🔧 REPAIR</option>
                                <option value="replace">♻️ REPLACE</option>
                            </select>
                            </div>

                            <div class="item-group">
                            <span class="item-label">Clean front door area</span>
                            <select name="exterior_front_door_clean"
                                value={property?.details.exterior[`exterior${i+1}`].cleanFrontDoor.value || ""}
                                onChange={(e)=> handleChange(`details.exterior.exterior${i+1}.cleanFrontDoor.value`, e.target.value)}
                            >
                                <option value="">— Select —</option>
                                <option value="okay">✅ OKAY</option>
                                <option value="repair">🔧 REPAIR</option>
                                <option value="replace">♻️ REPLACE</option>
                            </select>
                            </div>

                            <div class="item-group">
                            <span class="item-label">Paint front door</span>
                            <select name="exterior_front_door_paint"
                                value={property?.details.exterior[`exterior${i+1}`].paintFrontDoor.value || ""}
                                onChange={(e)=> handleChange(`details.exterior.exterior${i+1}.paintFrontDoor.value`, e.target.value)}
                            >
                                <option value="">— Select —</option>
                                <option value="okay">✅ OKAY</option>
                                <option value="repair">🔧 REPAIR</option>
                                <option value="replace">♻️ REPLACE</option>
                            </select>
                            </div>

                            <div class="item-group">
                            <span class="item-label">Front door light bulb/fixture</span>
                            <select name="exterior_front_door_light"
                                value={property?.details.exterior[`exterior${i+1}`].frontDoorLight.value || ""}
                                onChange={(e)=> handleChange(`details.exterior.exterior${i+1}.frontDoorLight.value`, e.target.value)}
                            >
                                <option value="">— Select —</option>
                                <option value="okay">✅ OKAY</option>
                                <option value="repair">🔧 REPAIR</option>
                                <option value="replace">♻️ REPLACE</option>
                            </select>
                            </div>

                            <div class="item-group">
                            <span class="item-label">Door number installed</span>
                            <select name="exterior_door_number"
                                value={property?.details.exterior[`exterior${i+1}`].doorNumber.value || ""}
                                onChange={(e)=> handleChange(`details.exterior.exterior${i+1}.doorNumber.value`, e.target.value)}
                            >
                                <option value="">— Select —</option>
                                <option value="okay">✅ OKAY</option>
                                <option value="repair">🔧 REPAIR</option>
                                <option value="replace">♻️ REPLACE</option>
                            </select>
                            </div>

                            <div class="item-group">
                            <span class="item-label">Kick plate (if needed)</span>
                            <select name="exterior_kick_plate"
                                value={property?.details.exterior[`exterior${i+1}`].kickPlate.value || ""}
                                onChange={(e)=> handleChange(`details.exterior.exterior${i+1}.kickPlate.value`, e.target.value)}
                            >
                                <option value="">— Select —</option>
                                <option value="okay">✅ OKAY</option>
                                <option value="repair">🔧 REPAIR</option>
                                <option value="replace">♻️ REPLACE</option>
                            </select>
                            </div>

                            <div class="item-group">
                            <span class="item-label">Clean patio</span>
                            <select name="exterior_patio_clean"
                                value={property?.details.exterior[`exterior${i+1}`].cleanPatio.value || ""}
                                onChange={(e)=> handleChange(`details.exterior.exterior${i+1}.cleanPatio.value`, e.target.value)}
                            >
                                <option value="">— Select —</option>
                                <option value="okay">✅ OKAY</option>
                                <option value="repair">🔧 REPAIR</option>
                                <option value="replace">♻️ REPLACE</option>
                            </select>
                            </div>

                            <div class="item-group">
                            <span class="item-label">Paint/clean rails (if needed)</span>
                            <select name="exterior_rails_paint_clean"
                                value={property?.details.exterior[`exterior${i+1}`].rails.value || ""}
                                onChange={(e)=> handleChange(`details.exterior.exterior${i+1}.rails.value`, e.target.value)}
                            >
                                <option value="">— Select —</option>
                                <option value="okay">✅ OKAY</option>
                                <option value="repair">🔧 REPAIR</option>
                                <option value="replace">♻️ REPLACE</option>
                            </select>
                            </div>

                            <div class="item-group">
                            <span class="item-label">Paint/clean patio door</span>
                            <select name="exterior_patio_door_paint_clean"
                                value={property?.details.exterior[`exterior${i+1}`].paintPatio.value || ""}
                                onChange={(e)=> handleChange(`details.exterior.exterior${i+1}.paintPatio.value`, e.target.value)}
                            >
                                <option value="">— Select —</option>
                                <option value="okay">✅ OKAY</option>
                                <option value="repair">🔧 REPAIR</option>
                                <option value="replace">♻️ REPLACE</option>
                            </select>
                            </div>

                            <div class="item-group">
                            <span class="item-label">Change patio door lock</span>
                            <select name="exterior_patio_door_lock"
                                value={property?.details.exterior[`exterior${i+1}`].patioDoorLock.value || ""}
                                onChange={(e)=> handleChange(`details.exterior.exterior${i+1}.patioDoorLock.value`, e.target.value)}
                            >
                                <option value="">— Select —</option>
                                <option value="okay">✅ OKAY</option>
                                <option value="repair">🔧 REPAIR</option>
                                <option value="replace">♻️ REPLACE</option>
                            </select>
                            </div>
                            </details>
                        ))}

                        {property?.details.livingRoom && Array.from({length: property?.details.livingRoom.count}, (_, i)=> (
                            <details key={`livingRoom${i+1}`}>
                            <summary>Living Room {property?.details.livingRoom.count > 1 && i+1}</summary>

                            <div class="item-group">
                                <span class="item-label">Switch covers (painted or damaged)</span>
                                <select name="living_switch_covers"
                                    value={property?.details.livingRoom[`livingRoom${i+1}`].switchCovers.value || ""}
                                    onChange={(e)=> handleChange(`details.livingRoom.livingRoom${i+1}.switchCovers.value`, e.target.value)}
                                >
                                <option value="">— Select —</option>
                                <option value="okay">✅ OKAY</option>
                                <option value="repair">🔧 REPAIR</option>
                                <option value="replace">♻️ REPLACE</option>
                                </select>
                            </div>

                            <div class="item-group">
                                <span class="item-label">Windows - broken</span>
                                <select name="living_windows_broken"
                                    value={property?.details.livingRoom[`livingRoom${i+1}`].windowsBroke.value || ""}
                                    onChange={(e)=> handleChange(`details.livingRoom.livingRoom${i+1}.windowsBroke.value`, e.target.value)}
                                >
                                <option value="">— Select —</option>
                                <option value="okay">✅ OKAY</option>
                                <option value="repair">🔧 REPAIR</option>
                                <option value="replace">♻️ REPLACE</option>
                                </select>
                            </div>

                            <div class="item-group">
                                <span class="item-label">Windows - locks</span>
                                <select name="living_windows_locks"
                                    value={property?.details.livingRoom[`livingRoom${i+1}`].windowsLock.value || ""}
                                    onChange={(e)=> handleChange(`details.livingRoom.livingRoom${i+1}.windowsLock.value`, e.target.value)}
                                >
                                <option value="">— Select —</option>
                                <option value="okay">✅ OKAY</option>
                                <option value="repair">🔧 REPAIR</option>
                                <option value="replace">♻️ REPLACE</option>
                                </select>
                            </div>

                            <div class="item-group">
                                <span class="item-label">Windows - don't open</span>
                                <select name="living_windows_dont_open"
                                    value={property?.details.livingRoom[`livingRoom${i+1}`].windowsDontOpen.value || ""}
                                    onChange={(e)=> handleChange(`details.livingRoom.livingRoom${i+1}.windowsDontOpen.value`, e.target.value)}
                                >
                                <option value="">— Select —</option>
                                <option value="okay">✅ OKAY</option>
                                <option value="repair">🔧 REPAIR</option>
                                <option value="replace">♻️ REPLACE</option>
                                </select>
                            </div>

                            <div class="item-group">
                                <span class="item-label">Windows - screens missing</span>
                                <select name="living_windows_screens_missing"
                                    value={property?.details.livingRoom[`livingRoom${i+1}`].windowsScreenMissing.value || ""}
                                    onChange={(e)=> handleChange(`details.livingRoom.livingRoom${i+1}.windowsScreenMissing.value`, e.target.value)}
                                >
                                <option value="">— Select —</option>
                                <option value="okay">✅ OKAY</option>
                                <option value="repair">🔧 REPAIR</option>
                                <option value="replace">♻️ REPLACE</option>
                                </select>
                            </div>

                            <div class="item-group">
                                <span class="item-label">Clean A/C vents and return</span>
                                <select name="living_ac_vents_clean"
                                    value={property?.details.livingRoom[`livingRoom${i+1}`].cleanACVents.value || ""}
                                    onChange={(e)=> handleChange(`details.livingRoom.livingRoom${i+1}.cleanACVents.value`, e.target.value)}
                                >
                                <option value="">— Select —</option>
                                <option value="okay">✅ OKAY</option>
                                <option value="repair">🔧 REPAIR</option>
                                <option value="replace">♻️ REPLACE</option>
                                </select>
                            </div>

                            <div class="item-group">
                                <span class="item-label">Ceiling fan - working/clean/light bulbs</span>
                                <select name="living_ceiling_fan"
                                    value={property?.details.livingRoom[`livingRoom${i+1}`].ceilingFan.value || ""}
                                    onChange={(e)=> handleChange(`details.livingRoom.livingRoom${i+1}.ceilingFan.value`, e.target.value)}
                                >
                                <option value="">— Select —</option>
                                <option value="okay">✅ OKAY</option>
                                <option value="repair">🔧 REPAIR</option>
                                <option value="replace">♻️ REPLACE</option>
                                </select>
                            </div>

                            <div class="item-group">
                                <span class="item-label">Banister - secure/paint or cleaning needed</span>
                                <select name="living_banister"
                                    value={property?.details.livingRoom[`livingRoom${i+1}`].banister.value || ""}
                                    onChange={(e)=> handleChange(`details.livingRoom.livingRoom${i+1}.banister.value`, e.target.value)}
                                >
                                <option value="">— Select —</option>
                                <option value="okay">✅ OKAY</option>
                                <option value="repair">🔧 REPAIR</option>
                                <option value="replace">♻️ REPLACE</option>
                                </select>
                            </div>

                            <div class="item-group">
                                <span class="item-label">Baseboards cracked</span>
                                <select name="living_baseboards_cracked"
                                    value={property?.details.livingRoom[`livingRoom${i+1}`].baseboardsCrack.value || ""}
                                    onChange={(e)=> handleChange(`details.livingRoom.livingRoom${i+1}.baseboardsCrack.value`, e.target.value)}
                                >
                                <option value="">— Select —</option>
                                <option value="okay">✅ OKAY</option>
                                <option value="repair">🔧 REPAIR</option>
                                <option value="replace">♻️ REPLACE</option>
                                </select>
                            </div>

                            <div class="item-group">
                                <span class="item-label">Blinds broken</span>
                                <select name="living_blinds_broken"
                                    value={property?.details.livingRoom[`livingRoom${i+1}`].blindsBroke.value || ""}
                                    onChange={(e)=> handleChange(`details.livingRoom.livingRoom${i+1}.blindsBroke.value`, e.target.value)}
                                >
                                <option value="">— Select —</option>
                                <option value="okay">✅ OKAY</option>
                                <option value="repair">🔧 REPAIR</option>
                                <option value="replace">♻️ REPLACE</option>
                                </select>
                            </div>

                            <div class="item-group">
                                <span class="item-label">Hallway light - fixture and bulbs</span>
                                <select name="living_hallway_light"
                                    value={property?.details.livingRoom[`livingRoom${i+1}`].hallwayLight.value || ""}
                                    onChange={(e)=> handleChange(`details.livingRoom.livingRoom${i+1}.hallwayLight.value`, e.target.value)}
                                >
                                <option value="">— Select —</option>
                                <option value="okay">✅ OKAY</option>
                                <option value="repair">🔧 REPAIR</option>
                                <option value="replace">♻️ REPLACE</option>
                                </select>
                            </div>

                            <div class="item-group">
                                <span class="item-label">Floors - carpet/vinyl need clean or replaced</span>
                                <select name="living_floors"
                                    value={property?.details.livingRoom[`livingRoom${i+1}`].floorsClean.value || ""}
                                    onChange={(e)=> handleChange(`details.livingRoom.livingRoom${i+1}.floorsClean.value`, e.target.value)}
                                >
                                <option value="">— Select —</option>
                                <option value="okay">✅ OKAY</option>
                                <option value="repair">🔧 REPAIR</option>
                                <option value="replace">♻️ REPLACE</option>
                                </select>
                            </div>

                            <div class="item-group">
                                <span class="item-label">Paint - touch or full</span>
                                <select name="living_paint"
                                    value={property?.details.livingRoom[`livingRoom${i+1}`].paint.value || ""}
                                    onChange={(e)=> handleChange(`details.livingRoom.livingRoom${i+1}.paint.value`, e.target.value)}
                                >
                                <option value="">— Select —</option>
                                <option value="okay">✅ OKAY</option>
                                <option value="repair">🔧 REPAIR</option>
                                <option value="replace">♻️ REPLACE</option>
                                </select>
                            </div>

                            <div class="item-group">
                                <span class="item-label">Hall closet - shelf and door stopper</span>
                                <select name="living_hall_closet"
                                    value={property?.details.livingRoom[`livingRoom${i+1}`].hallCloset.value || ""}
                                    onChange={(e)=> handleChange(`details.livingRoom.livingRoom${i+1}.hallCloset.value`, e.target.value)}
                                >
                                <option value="">— Select —</option>
                                <option value="okay">✅ OKAY</option>
                                <option value="repair">🔧 REPAIR</option>
                                <option value="replace">♻️ REPLACE</option>
                                </select>
                            </div>
                            </details>
                        ))}

                        {property?.details.diningRoom && Array.from({length: property?.details.diningRoom.count}, (_, i)=> (
                            <details key={`diningRoom${i+1}`}>
                            <summary>Dining Room {property?.details.diningRoom.count > 1 && i+1}</summary>
                            <div class="item-group">
                                <span class="item-label">Light fixture - bulbs working/secure</span>
                                <select name="dining_light_fixture"
                                    value={property?.details.diningRoom[`diningRoom${i+1}`].lightFixture.value || ""}
                                    onChange={(e)=> handleChange(`details.diningRoom.diningRoom${i+1}.lightFixture.value`, e.target.value)}
                                >
                                <option value="">— Select —</option>
                                <option value="okay">✅ OKAY</option>
                                <option value="repair">🔧 REPAIR</option>
                                <option value="replace">♻️ REPLACE</option>
                                </select>
                            </div>

                            <div class="item-group">
                                <span class="item-label">Switch plates - painted/damaged</span>
                                <select name="dining_switch_plates"
                                    value={property?.details.diningRoom[`diningRoom${i+1}`].switchPlatesDamage.value || ""}
                                    onChange={(e)=> handleChange(`details.diningRoom.diningRoom${i+1}.switchPlatesDamage.value`, e.target.value)}
                                >
                                <option value="">— Select —</option>
                                <option value="okay">✅ OKAY</option>
                                <option value="repair">🔧 REPAIR</option>
                                <option value="replace">♻️ REPLACE</option>
                                </select>
                            </div>

                            <div class="item-group">
                                <span class="item-label">Flooring - vinyl/carpet condition</span>
                                <select name="dining_flooring_condition"
                                    value={property?.details.diningRoom[`diningRoom${i+1}`].flooringCondition.value || ""}
                                    onChange={(e)=> handleChange(`details.diningRoom.diningRoom${i+1}.flooringCondition.value`, e.target.value)}
                                >
                                <option value="">— Select —</option>
                                <option value="okay">✅ OKAY</option>
                                <option value="repair">🔧 REPAIR</option>
                                <option value="replace">♻️ REPLACE</option>
                                </select>
                            </div>
                            </details>
                        ))}

                        {property?.details.kitchen && Array.from({length: property?.details.kitchen.count}, (_, i) => (
                            <details key={`kitchen${i+1}`}>
                            <summary>Kitchen {property?.details.kitchen.count > 1 && i+1}</summary>

                            <div class="item-group">
                                <span class="item-label">Flooring - vinyl/tile damaged</span>
                                <select name="kitchen_flooring"
                                    value={property?.details.kitchen[`kitchen${i+1}`].flooringDamage.value || ""}
                                    onChange={(e)=> handleChange(`details.kitchen.kitchen${i+1}.flooringDamage.value`, e.target.value)}
                                >
                                <option value="">— Select —</option>
                                <option value="okay">✅ OKAY</option>
                                <option value="repair">🔧 REPAIR</option>
                                <option value="replace">♻️ REPLACE</option>
                                </select>
                            </div>

                            <div class="item-group">
                                <span class="item-label">Countertop - resurfacing needed</span>
                                <select name="kitchen_countertop_resurface"
                                    value={property?.details.kitchen[`kitchen${i+1}`].counterTopResurface.value || ""}
                                    onChange={(e)=> handleChange(`details.kitchen.kitchen${i+1}.counterTopResurface.value`, e.target.value)}
                                >
                                <option value="">— Select —</option>
                                <option value="okay">✅ OKAY</option>
                                <option value="repair">🔧 REPAIR</option>
                                <option value="replace">♻️ REPLACE</option>
                                </select>
                            </div>

                            <div class="item-group">
                                <span class="item-label">Countertop - caulking</span>
                                <select name="kitchen_countertop_caulk"
                                    value={property?.details.kitchen[`kitchen${i+1}`].counterTopCaulk.value || ""}
                                    onChange={(e)=> handleChange(`details.kitchen.kitchen${i+1}.counterTopCaulk.value`, e.target.value)}
                                >
                                <option value="">— Select —</option>
                                <option value="okay">✅ OKAY</option>
                                <option value="repair">🔧 REPAIR</option>
                                <option value="replace">♻️ REPLACE</option>
                                </select>
                            </div>

                            <div class="item-group">
                                <span class="item-label">Switch plates - painted/damaged</span>
                                <select name="kitchen_switch_plates"
                                    value={property?.details.kitchen[`kitchen${i+1}`].switchPlatesDamage.value || ""}
                                    onChange={(e)=> handleChange(`details.kitchen.kitchen${i+1}.switchPlatesDamage.value`, e.target.value)}
                                >
                                <option value="">— Select —</option>
                                <option value="okay">✅ OKAY</option>
                                <option value="repair">🔧 REPAIR</option>
                                <option value="replace">♻️ REPLACE</option>
                                </select>
                            </div>

                            <div class="item-group">
                                <span class="item-label">Kitchen sink - fire extinguisher full/expired</span>
                                <select name="kitchen_fire_extinguisher"
                                    value={property?.details.kitchen[`kitchen${i+1}`].kitchenSinkFireExtinguisher.value || ""}
                                    onChange={(e)=> handleChange(`details.kitchen.kitchen${i+1}.kitchenSinkFireExtinguisher.value`, e.target.value)}
                                >
                                <option value="">— Select —</option>
                                <option value="okay">✅ FULL</option>
                                <option value="repair">🔧 EXPIRED</option>
                                </select>
                            </div>

                            <div class="item-group">
                                <span class="item-label">Kitchen sink - stoppers</span>
                                <select name="kitchen_sink_stoppers"
                                    value={property?.details.kitchen[`kitchen${i+1}`].kitchenSinkStopper.value || ""}
                                    onChange={(e)=> handleChange(`details.kitchen.kitchen${i+1}.kitchenSinkStopper.value`, e.target.value)}
                                >
                                <option value="">— Select —</option>
                                <option value="okay">✅ OKAY</option>
                                <option value="repair">🔧 REPAIR</option>
                                <option value="replace">♻️ REPLACE</option>
                                </select>
                            </div>

                            <div class="item-group">
                                <span class="item-label">Kitchen sink faucet - leaking/dripping</span>
                                <select name="kitchen_sink_faucet_leak"
                                    value={property?.details.kitchen[`kitchen${i+1}`].kitchenSinkFaucetDrip.value || ""}
                                    onChange={(e)=> handleChange(`details.kitchen.kitchen${i+1}.kitchenSinkFaucetDrip.value`, e.target.value)}
                                >
                                <option value="">— Select —</option>
                                <option value="okay">✅ OKAY</option>
                                <option value="repair">🔧 REPAIR</option>
                                <option value="replace">♻️ REPLACE</option>
                                </select>
                            </div>

                            <div class="item-group">
                                <span class="item-label">Kitchen sink - faucet sprayer/secure</span>
                                <select name="kitchen_sink_sprayer"
                                    value={property?.details.kitchen[`kitchen${i+1}`].kitchenSinkFaucetSprayer.value || ""}
                                    onChange={(e)=> handleChange(`details.kitchen.kitchen${i+1}.kitchenSinkFaucetSprayer.value`, e.target.value)}
                                >
                                <option value="">— Select —</option>
                                <option value="okay">✅ OKAY</option>
                                <option value="repair">🔧 REPAIR</option>
                                <option value="replace">♻️ REPLACE</option>
                                </select>
                            </div>

                            <div class="item-group">
                                <span class="item-label">Garbage disposal - working/clean</span>
                                <select name="kitchen_garbage_disposal"
                                    value={property?.details.kitchen[`kitchen${i+1}`].garbageDisposal.value || ""}
                                    onChange={(e)=> handleChange(`details.kitchen.kitchen${i+1}.garbageDisposal.value`, e.target.value)}
                                >
                                <option value="">— Select —</option>
                                <option value="okay">✅ OKAY</option>
                                <option value="repair">🔧 REPAIR</option>
                                <option value="replace">♻️ REPLACE</option>
                                </select>
                            </div>

                            <div class="item-group">
                                <span class="item-label">Cabinets - inside clean</span>
                                <select name="kitchen_cabinets_clean"
                                    value={property?.details.kitchen[`kitchen${i+1}`].cabinetsInside.value || ""}
                                    onChange={(e)=> handleChange(`details.kitchen.kitchen${i+1}.cabinetsInside.value`, e.target.value)}
                                >
                                <option value="">— Select —</option>
                                <option value="okay">✅ OKAY</option>
                                <option value="repair">🔧 REPAIR</option>
                                <option value="replace">♻️ REPLACE</option>
                                </select>
                            </div>

                            <div class="item-group">
                                <span class="item-label">Cabinets - doors/drawers secure</span>
                                <select name="kitchen_cabinets_secure"
                                    value={property?.details.kitchen[`kitchen${i+1}`].cabinetsDoorDrawers.value || ""}
                                    onChange={(e)=> handleChange(`details.kitchen.kitchen${i+1}.cabinetsDoorDrawers.value`, e.target.value)}
                                >
                                <option value="">— Select —</option>
                                <option value="okay">✅ OKAY</option>
                                <option value="repair">🔧 REPAIR</option>
                                <option value="replace">♻️ REPLACE</option>
                                </select>
                            </div>

                            <div class="item-group">
                                <span class="item-label">Cabinets - doors/knobs</span>
                                <select name="kitchen_cabinets_knobs"
                                    value={property?.details.kitchen[`kitchen${i+1}`].cabinetDoorKnob.value || ""}
                                    onChange={(e)=> handleChange(`details.kitchen.kitchen${i+1}.cabinetDoorKnob.value`, e.target.value)}
                                >
                                <option value="">— Select —</option>
                                <option value="okay">✅ OKAY</option>
                                <option value="repair">🔧 REPAIR</option>
                                <option value="replace">♻️ REPLACE</option>
                                </select>
                            </div>

                            <div class="item-group">
                                <span class="item-label">Kitchen drawers - on track/broken</span>
                                <select name="kitchen_drawers_track"
                                    value={property?.details.kitchen[`kitchen${i+1}`].kitchenDrawersBroke.value || ""}
                                    onChange={(e)=> handleChange(`details.kitchen.kitchen${i+1}.kitchenDrawersBroke.value`, e.target.value)}
                                >
                                <option value="">— Select —</option>
                                <option value="okay">✅ OKAY</option>
                                <option value="repair">🔧 BROKEN</option>
                                </select>
                            </div>

                            <div class="item-group">
                                <span class="item-label">Cabinets - shelves/knobs secure/missing</span>
                                <select name="kitchen_cabinets_shelves"
                                    value={property?.details.kitchen[`kitchen${i+1}`].cabinetsShelvesKnobs.value || ""}
                                    onChange={(e)=> handleChange(`details.kitchen.kitchen${i+1}.cabinetsShelvesKnobs.value`, e.target.value)}
                                >
                                <option value="">— Select —</option>
                                <option value="okay">✅ SECURE</option>
                                <option value="repair">🔧 MISSING</option>
                                </select>
                            </div>

                            <div class="item-group">
                                <span class="item-label">Cabinet tops - clean</span>
                                <select name="kitchen_cabinet_tops"
                                    value={property?.details.kitchen[`kitchen${i+1}`].cabinetTop.value || ""}
                                    onChange={(e)=> handleChange(`details.kitchen.kitchen${i+1}.cabinetTop.value`, e.target.value)}
                                >
                                <option value="">— Select —</option>
                                <option value="okay">✅ CLEAN</option>
                                <option value="repair">🔧 NEEDS CLEANING</option>
                                </select>
                            </div>

                            <div class="item-group">
                                <span class="item-label">Stove - working/clean</span>
                                <select name="kitchen_stove_working"
                                    value={property?.details.kitchen[`kitchen${i+1}`].stoveWorking.value || ""}
                                    onChange={(e)=> handleChange(`details.kitchen.kitchen${i+1}.stoveWorking.value`, e.target.value)}
                                >
                                <option value="">— Select —</option>
                                <option value="okay">✅ OKAY</option>
                                <option value="repair">🔧 NEED CLEANING</option>
                                <option value="replace">♻️ REPLACE</option>
                                </select>
                            </div>

                            <div class="item-group">
                                <span class="item-label">Stove - drip pans/eyes missing</span>
                                <select name="kitchen_stove_drip_pans"
                                    value={property?.details.kitchen[`kitchen${i+1}`].stoveDripPan.value || ""}
                                    onChange={(e)=> handleChange(`details.kitchen.kitchen${i+1}.stoveDripPan.value`, e.target.value)}
                                >
                                <option value="">— Select —</option>
                                <option value="okay">✅ PRESENT</option>
                                <option value="repair">🔧 MISSING</option>
                                </select>
                            </div>

                            <div class="item-group">
                                <span class="item-label">Stove - knobs/oven light</span>
                                <select name="kitchen_stove_knobs_light"
                                    value={property?.details.kitchen[`kitchen${i+1}`].stoveKnobOven.value || ""}
                                    onChange={(e)=> handleChange(`details.kitchen.kitchen${i+1}.stoveKnobOven.value`, e.target.value)}
                                >
                                <option value="">— Select —</option>
                                <option value="okay">✅ WORKING</option>
                                <option value="repair">🔧 REPAIR</option>
                                </select>
                            </div>

                            <div class="item-group">
                                <span class="item-label">Stove - door/bottom tray/on track</span>
                                <select name="kitchen_stove_door_tray"
                                    value={property?.details.kitchen[`kitchen${i+1}`].stoveDoorBottomTray.value || ""}
                                    onChange={(e)=> handleChange(`details.kitchen.kitchen${i+1}.stoveDoorBottomTray.value`, e.target.value)}
                                >
                                <option value="">— Select —</option>
                                <option value="okay">✅ ON TRACK</option>
                                <option value="repair">🔧 REPAIR</option>
                                </select>
                            </div>

                            <div class="item-group">
                                <span class="item-label">Microwave - working/clean</span>
                                <select name="kitchen_microwave_working"
                                    value={property?.details.kitchen[`kitchen${i+1}`].microwaveWorking.value || ""}
                                    onChange={(e)=> handleChange(`details.kitchen.kitchen${i+1}.microwaveWorking.value`, e.target.value)}
                                >
                                <option value="">— Select —</option>
                                <option value="okay">✅ WORKING</option>
                                <option value="repair">🔧 NEED CLEANING</option>
                                </select>
                            </div>

                            <div class="item-group">
                                <span class="item-label">Microwave - filter/fire suppression</span>
                                <select name="kitchen_microwave_filter"
                                    value={property?.details.kitchen[`kitchen${i+1}`].microwaveFilterFireSuppression.value || ""}
                                    onChange={(e)=> handleChange(`details.kitchen.kitchen${i+1}.microwaveFilterFireSuppression.value`, e.target.value)}
                                >
                                <option value="">— Select —</option>
                                <option value="okay">✅ OKAY</option>
                                <option value="repair">🔧 NEED REPLACEMENT</option>
                                </select>
                            </div>

                            <div class="item-group">
                                <span class="item-label">Microwave - light</span>
                                <select name="kitchen_microwave_light"
                                    value={property?.details.kitchen[`kitchen${i+1}`].microwaveLight.value || ""}
                                    onChange={(e)=> handleChange(`details.kitchen.kitchen${i+1}.microwaveLight.value`, e.target.value)}
                                >
                                <option value="">— Select —</option>
                                <option value="okay">✅ WORKING</option>
                                <option value="repair">🔧 REPAIR</option>
                                <option value="replace">♻️ REPLACE</option>
                                </select>
                            </div>

                            <div class="item-group">
                                <span class="item-label">Refrigerator - loud noise</span>
                                <select name="kitchen_refrigerator_noise"
                                    value={property?.details.kitchen[`kitchen${i+1}`].refrigeratorNoise.value || ""}
                                    onChange={(e)=> handleChange(`details.kitchen.kitchen${i+1}.refrigeratorNoise.value`, e.target.value)}
                                >
                                <option value="">— Select —</option>
                                <option value="okay">✅ QUIET</option>
                                <option value="repair">🔧 LOUD NOISE</option>
                                </select>
                            </div>

                            <div class="item-group">
                                <span class="item-label">Refrigerator - ice maker working</span>
                                <select name="kitchen_refrigerator_icemaker"
                                    value={property?.details.kitchen[`kitchen${i+1}`].refrigeratorIceMaker.value || ""}
                                    onChange={(e)=> handleChange(`details.kitchen.kitchen${i+1}.refrigeratorIceMaker.value`, e.target.value)}
                                >
                                <option value="">— Select —</option>
                                <option value="okay">✅ WORKING</option>
                                <option value="repair">🔧 NOT WORKING</option>
                                </select>
                            </div>

                            <div class="item-group">
                                <span class="item-label">Refrigerator - lightbulbs/shelves/cracks</span>
                                <select name="kitchen_refrigerator_light_shelves"
                                    value={property?.details.kitchen[`kitchen${i+1}`].refrigeratorLightShelvesCracks.value || ""}
                                    onChange={(e)=> handleChange(`details.kitchen.kitchen${i+1}.refrigeratorLightShelvesCracks.value`, e.target.value)}
                                >
                                <option value="">— Select —</option>
                                <option value="okay">✅ INTACT</option>
                                <option value="repair">🔧 DAMAGED</option>
                                <option value="replace">♻️ REPLACE</option>
                                </select>
                            </div>

                            <div class="item-group">
                                <span class="item-label">Refrigerator - trash out</span>
                                <select name="kitchen_refrigerator_trash"
                                    value={property?.details.kitchen[`kitchen${i+1}`].refrigeratorTrash.value || ""}
                                    onChange={(e)=> handleChange(`details.kitchen.kitchen${i+1}.refrigeratorTrash.value`, e.target.value)}
                                >
                                <option value="">— Select —</option>
                                <option value="okay">✅ CLEARED</option>
                                <option value="repair">🔧 NEEDS REMOVAL</option>
                                </select>
                            </div>

                            <div class="item-group">
                                <span class="item-label">Dishwasher - run cycle/secure</span>
                                <select name="kitchen_dishwasher_cycle"
                                    value={property?.details.kitchen[`kitchen${i+1}`].dishwasherCycle.value || ""}
                                    onChange={(e)=> handleChange(`details.kitchen.kitchen${i+1}.dishwasherCycle.value`, e.target.value)}
                                >
                                <option value="">— Select —</option>
                                <option value="okay">✅ WORKING</option>
                                <option value="repair">🔧 REPAIR</option>
                                <option value="replace">♻️ REPLACE</option>
                                </select>
                            </div>

                            <div class="item-group">
                                <span class="item-label">Kitchen vents - clean</span>
                                <select name="kitchen_vents_clean"
                                    value={property?.details.kitchen[`kitchen${i+1}`].kitchenVents.value || ""}
                                    onChange={(e)=> handleChange(`details.kitchen.kitchen${i+1}.kitchenVents.value`, e.target.value)}
                                >
                                <option value="">— Select —</option>
                                <option value="okay">✅ CLEAN</option>
                                <option value="repair">🔧 NEED CLEANING</option>
                                </select>
                            </div>
                            </details>
                        ))}

                        {property?.details.laundryRoom && Array.from({length: property?.details.laundryRoom.count}, (_, i)=> (
                            <details key={`laundryRoom${i+1}`}>
                            <summary>Laundry Room {property?.details.laundryRoom.count > 1 && i+1}</summary>

                            <div class="item-group">
                                <span class="item-label">Flooring - vinyl/carpet damaged</span>
                                <select name="laundry_flooring"
                                    value={property?.details.laundryRoom[`laundryRoom${i+1}`].flooringDamage.value || ""}
                                    onChange={(e)=> handleChange(`details.laundryRoom.laundryRoom${i+1}.flooringDamage.value`, e.target.value)}
                                >
                                <option value="">— Select —</option>
                                <option value="okay">✅ OKAY</option>
                                <option value="repair">🔧 DAMAGED</option>
                                <option value="replace">♻️ REPLACE</option>
                                </select>
                            </div>

                            <div class="item-group">
                                <span class="item-label">Washer - run cycle/leaks/loud noises</span>
                                <select name="laundry_washer"
                                    value={property?.details.laundryRoom[`laundryRoom${i+1}`].washerCycleLeaksNoise.value || ""}
                                    onChange={(e)=> handleChange(`details.laundryRoom.laundryRoom${i+1}.washerCycleLeaksNoise.value`, e.target.value)}
                                >
                                <option value="">— Select —</option>
                                <option value="okay">✅ WORKING</option>
                                <option value="repair">🔧 LEAKS</option>
                                <option value="replace">♻️ LOUD NOISES</option>
                                </select>
                            </div>

                            <div class="item-group">
                                <span class="item-label">Dryer - run cycle/leaks/loud noises</span>
                                <select name="laundry_dryer"
                                    value={property?.details.laundryRoom[`laundryRoom${i+1}`].dryerCycleLeaksNoise.value || ""}
                                    onChange={(e)=> handleChange(`details.laundryRoom.laundryRoom${i+1}.dryerCycleLeaksNoise.value`, e.target.value)}
                                >
                                <option value="">— Select —</option>
                                <option value="okay">✅ WORKING</option>
                                <option value="repair">🔧 LEAKS</option>
                                <option value="replace">♻️ LOUD NOISES</option>
                                </select>
                            </div>

                            <div class="item-group">
                                <span class="item-label">Shelves - secure</span>
                                <select name="laundry_shelves"
                                    value={property?.details.laundryRoom[`laundryRoom${i+1}`].shelves.value || ""}
                                    onChange={(e)=> handleChange(`details.laundryRoom.laundryRoom${i+1}.shelves.value`, e.target.value)}
                                >
                                <option value="">— Select —</option>
                                <option value="okay">✅ SECURE</option>
                                <option value="repair">🔧 LOOSE</option>
                                <option value="replace">♻️ MISSING</option>
                                </select>
                            </div>

                            <div class="item-group">
                                <span class="item-label">Circuit breaker box - secure</span>
                                <select name="laundry_breaker_box"
                                    value={property?.details.laundryRoom[`laundryRoom${i+1}`].circuitBreakerBox.value || ""}
                                    onChange={(e)=> handleChange(`details.laundryRoom.laundryRoom${i+1}.circuitBreakerBox.value`, e.target.value)}
                                >
                                <option value="">— Select —</option>
                                <option value="okay">✅ SECURE</option>
                                <option value="repair">🔧 NEEDS REPAIR</option>
                                <option value="replace">♻️ REPLACE</option>
                                </select>
                            </div>

                            <div class="item-group">
                                <span class="item-label">Laundry machine - area clean</span>
                                <select name="laundry_area_clean"
                                    value={property?.details.laundryRoom[`laundryRoom${i+1}`].laundryMachine.value || ""}
                                    onChange={(e)=> handleChange(`details.laundryRoom.laundryRoom${i+1}.laundryMachine.value`, e.target.value)}
                                >
                                <option value="">— Select —</option>
                                <option value="okay">✅ CLEAN</option>
                                <option value="repair">🔧 NEED CLEANING</option>
                                </select>
                            </div>

                            <div class="item-group">
                                <span class="item-label">Light fixture - lightbulbs</span>
                                <select name="laundry_light_fixture"
                                    value={property?.details.laundryRoom[`laundryRoom${i+1}`].lightFixture.value || ""}
                                    onChange={(e)=> handleChange(`details.laundryRoom.laundryRoom${i+1}.lightFixture.value`, e.target.value)}
                                >
                                <option value="">— Select —</option>
                                <option value="okay">✅ WORKING</option>
                                <option value="repair">🔧 NEED REPLACEMENT</option>
                                </select>
                            </div>

                            <div class="item-group">
                                <span class="item-label">Baseboards - cracked/water damaged</span>
                                <select name="laundry_baseboards"
                                    value={property?.details.laundryRoom[`laundryRoom${i+1}`].baseboardsCrack.value || ""}
                                    onChange={(e)=> handleChange(`details.laundryRoom.laundryRoom${i+1}.baseboardsCrack.value`, e.target.value)}
                                >
                                <option value="">— Select —</option>
                                <option value="okay">✅ INTACT</option>
                                <option value="repair">🔧 CRACKED</option>
                                <option value="replace">♻️ WATER DAMAGED</option>
                                </select>
                            </div>

                            </details>
                        ))}

                        {property?.details.patio && Array.from({length: property?.details.patio.count}, (_, i)=> (
                            <details key={`patio${i+1}`}>
                            <summary>Patio {property?.details.patio.count > 1 && i+1}</summary>

                            <div class="item-group">
                                <span class="item-label">Flooring - cracked/damaged</span>
                                <select name="patio_flooring"
                                    value={property?.details.patio[`patio${i+1}`].flooringDamage.value || ""}
                                    onChange={(e)=> handleChange(`details.patio.patio${i+1}.flooringDamage.value`, e.target.value)}
                                >
                                <option value="">— Select —</option>
                                <option value="okay">✅ INTACT</option>
                                <option value="repair">🔧 CRACKED</option>
                                <option value="replace">♻️ DAMAGED</option>
                                </select>
                            </div>

                            <div class="item-group">
                                <span class="item-label">Railings - secure/paint or cleaning needed</span>
                                <select name="patio_railings"
                                    value={property?.details.patio[`patio${i+1}`].railing.value || ""}
                                    onChange={(e)=> handleChange(`details.patio.patio${i+1}.railing.value`, e.target.value)}
                                >
                                <option value="">— Select —</option>
                                <option value="okay">✅ SECURE</option>
                                <option value="repair">🔧 NEED CLEANING</option>
                                <option value="replace">♻️ NEED PAINT</option>
                                </select>
                            </div>

                            <div class="item-group">
                                <span class="item-label">Light fixture - bulbs working/secure</span>
                                <select name="patio_light_fixture"
                                    value={property?.details.patio[`patio${i+1}`].lightFixture.value || ""}
                                    onChange={(e)=> handleChange(`details.patio.patio${i+1}.lightFixture.value`, e.target.value)}
                                >
                                <option value="">— Select —</option>
                                <option value="okay">✅ WORKING</option>
                                <option value="repair">🔧 NEED REPAIR</option>
                                <option value="replace">♻️ REPLACE</option>
                                </select>
                            </div>

                            <div class="item-group">
                                <span class="item-label">Pest control - wasp/ants/spiders</span>
                                <select name="patio_pest_control"
                                    value={property?.details.patio[`patio${i+1}`].pestControl.value || ""}
                                    onChange={(e)=> handleChange(`details.patio.patio${i+1}.pestControl.value`, e.target.value)}
                                >
                                <option value="">— Select —</option>
                                <option value="okay">✅ CLEAR</option>
                                <option value="repair">🔧 PRESENCE DETECTED</option>
                                <option value="replace">♻️ NEED TREATMENT</option>
                                </select>
                            </div>

                            <div class="item-group">
                                <span class="item-label">Hot water heater - leaks/rust</span>
                                <select name="patio_hot_water_heater"
                                    value={property?.details.patio[`patio${i+1}`].hotWaterHeater.value || ""}
                                    onChange={(e)=> handleChange(`details.patio.patio${i+1}.hotWaterHeater.value`, e.target.value)}
                                >
                                <option value="">— Select —</option>
                                <option value="okay">✅ NO LEAKS</option>
                                <option value="repair">🔧 LEAKS</option>
                                <option value="replace">♻️ RUSTED</option>
                                </select>
                            </div>

                            <div class="item-group">
                                <span class="item-label">Heat & AC unit - working properly</span>
                                <select name="patio_heat_ac_working"
                                    value={property?.details.patio[`patio${i+1}`].heatACUnitWorking.value || ""}
                                    onChange={(e)=> handleChange(`details.patio.patio${i+1}.heatACUnitWorking.value`, e.target.value)}
                                >
                                <option value="">— Select —</option>
                                <option value="okay">✅ WORKING</option>
                                <option value="repair">🔧 NEED REPAIR</option>
                                <option value="replace">♻️ REPLACE</option>
                                </select>
                            </div>

                            <div class="item-group">
                                <span class="item-label">Heat & AC unit - filter/thermostat powered</span>
                                <select name="patio_heat_ac_filter"
                                    value={property?.details.patio[`patio${i+1}`].heatACUnitThermostat.value || ""}
                                    onChange={(e)=> handleChange(`details.patio.patio${i+1}.heatACUnitThermostat.value`, e.target.value)}
                                >
                                <option value="">— Select —</option>
                                <option value="okay">✅ FILTER CLEAN / THERMOSTAT ON</option>
                                <option value="repair">🔧 NEED FILTER CHANGE</option>
                                <option value="replace">♻️ THERMOSTAT ISSUE</option>
                                </select>
                            </div>

                            <div class="item-group">
                                <span class="item-label">HVAC room - no dust/mildew/water damage</span>
                                <select name="patio_hvac_room_clean"
                                    value={property?.details.patio[`patio${i+1}`].HVACRoomDamage.value || ""}
                                    onChange={(e)=> handleChange(`details.patio.patio${i+1}.HVACRoomDamage.value`, e.target.value)}
                                >
                                <option value="">— Select —</option>
                                <option value="okay">✅ CLEAN</option>
                                <option value="repair">🔧 DUST/MILDEW PRESENT</option>
                                <option value="replace">♻️ WATER DAMAGE</option>
                                </select>
                            </div>

                            <div class="item-group">
                                <span class="item-label">HVAC room - doors/hinges/locks</span>
                                <select name="patio_hvac_room_doors"
                                    value={property?.details.patio[`patio${i+1}`].HVACRoomDoorHingeLock.value || ""}
                                    onChange={(e)=> handleChange(`details.patio.patio${i+1}.HVACRoomDoorHingeLock.value`, e.target.value)}
                                >
                                <option value="">— Select —</option>
                                <option value="okay">✅ SECURE</option>
                                <option value="repair">🔧 NEED REPAIR</option>
                                <option value="replace">♻️ REPLACE</option>
                                </select>
                            </div>
                            </details>
                        ))}
                        {property?.details.smokeDetector && Array.from({length: property?.details.smokeDetector.count}, (_, i)=> (
                            <details key={`smokeDetectors${i+1}`}>
                            <summary>Smoke Detectors {property?.details.smokeDetector.count > 1 && i+1}</summary>
                            <div class="item-group">
                                <span class="item-label">Detectors - batteries changed</span>
                                <select name="smoke_detectors_batteries"
                                    value={property?.details.smokeDetector[`smokeDetector${i+1}`].detectorBattery.value || ""}
                                    onChange={(e)=> handleChange(`details.smokeDetector.smokeDetector${i+1}.detectorBattery.value`, e.target.value)}
                                >
                                <option value="">— Select —</option>
                                <option value="okay">✅ CHANGED</option>
                                <option value="repair">🔧 NEED CHANGE</option>
                                </select>
                            </div>

                            <div class="item-group">
                                <span class="item-label">Detectors - replaced</span>
                                <select name="smoke_detectors_replaced"
                                    value={property?.details.smokeDetector[`smokeDetector${i+1}`].detectorReplaced.value || ""}
                                    onChange={(e)=> handleChange(`details.smokeDetector.smokeDetector${i+1}.detectorReplaced.value`, e.target.value)}
                                >
                                <option value="">— Select —</option>
                                <option value="okay">✅ REPLACED</option>
                                <option value="repair">🔧 NEED REPLACEMENT</option>
                                </select>
                            </div>
                            </details>
                        ))}

                        <div id="livingLog">Living Log will appear here...</div>

                        <div class="actions">
                            <button type="button" onclick="sendEmail()">Send Living Log as Email</button>
                            <button type="button" onclick="sendText()">Send Living Log as Text</button>
                        </div>
                    </form>
                </>
            )}
        </div>
    );
}