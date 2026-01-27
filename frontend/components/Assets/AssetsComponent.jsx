"use client";
import { useState, useRef, useEffect, useContext } from "react";
import styles from "./AssetsConponent.module.css"
import { mapElementContext } from "@/app/property/map/[id]/page";



export default function Assets() {
    const [menuActive, setMenuActive] = useState(false);
    const startX = useRef(null);
    const startY = useRef(null);
    const activeEl = useRef(null);
    const sidebar = useRef(null);
    const background = useRef(null);
    const moveTo = useRef({});
    const mapEl = useContext(mapElementContext);
    const { element,
            setElement,
            elCoordinates,
            setElCoordinates,
            direction,
            setDirection
        } = mapEl;

    useEffect(()=> {
        const page = document.getElementById("assetContainer");
        // console.log("Map Children", map.children);
        // console.log("Page width:", window.innerWidth, "Map width", map.getBoundingClientRect().width);
        
        [...map.children].forEach(el => {
            el.addEventListener("mousedown", (e)=> mouseDown(e, el));
        });

        return () => {
            [...map.children].forEach(el => {
            el.removeEventListener("mousedown", mouseDown);
            });
        };
    }, []);

    useEffect(()=> {
        if(direction !== 'assets') return;

        // get element class and set x and y
        element.style.offsetTop = elCoordinates.x
        element.style.offsetLeft = elCoordinates.y

        const map = document.getElementById("map");
        map.append(element);
    }, [mapEl])

    function mouseDown(e, el) {
        e.preventDefault();

        activeEl.current = el;
        startX.current = e.clientX;
        startY.current = e.clientY;

        document.addEventListener('mousemove', mouseMove);
        document.addEventListener('mouseup', mouseUp);
    }

    function mouseMove(e) {
        const el = activeEl.current;
        const map = document.getElementById("map");
        const mapWidth = map.getBoundingClientRect().width;

        const newX = startX.current - e.clientX;
        const newY = startY.current - e.clientY;
        
        startX.current = e.clientX;
        startY.current = e.clientY;

        el.style.top = (el.offsetTop - newY) + 'px';
        el.style.left = (el.offsetLeft - newX) + 'px';

        let x = startX.current;
        let y = startY.current;

        console.log('EL Parent:', el.p)

        if(!moveTo.current[el] || moveTo.current[el] !== 'map') {
            if(el.offsetLeft + 45 > mapWidth) {
                background.current.style.borderRight = '5px solid red';
                console.log('Close to move');
                if(el.offsetLeft + 25 > mapWidth) {
                    background.current.style.borderRight = '5px solid green';
                    console.log('MOVE TO MAP');
                }
            }
        } else {
            if(el.offsetLeft - 45 < mapWidth) {
                background.current.style.borderRight = '5px solid red';
                console.log('Close to move');
                if(el.offsetLeft - 25 < mapWidth) {
                    background.current.style.borderRight = '5px solid green';
                    console.log('MOVE TO ASSETS');
                }
            }
        }

        console.log({newX, newY});
        console.log({x, y});
        console.log({'el-top': el.offsetTop, 'el-left': el.offsetLeft})
        console.log(map.getBoundingClientRect().width);
    }

    function mouseUp(e) {
        const el = activeEl.current;
        const mapWidth = map.getBoundingClientRect().width;

        if(!moveTo.current[el] || moveTo.current[el] !== 'map') {
            if(el.offsetLeft + 25 > mapWidth) {
                console.log('MOVE TO MAP');
                setElement(el);
                setElCoordinates({
                    y: (el.style.top + 'px'),
                    x: (el.style.left + 'px')
                })
                setDirection('map');
                
                console.log({el})
                const removeEl = document.getElementById(el.id);
                removeEl.remove();
                moveTo.current[el] = 'map';
            }
        } else {
            if(el.offsetLeft - 25 < mapWidth) {
                console.log('MOVE TO ASSTES');
                setElement(el);
                setElCoordinates({
                    y: (el.style.top + 'px'),
                    x: (el.style.left + 'px')
                })
                setDirection('assets');
                
                console.log({el})
                const removeEl = document.getElementById(el.id);
                removeEl.remove();
                moveTo.current = 'assets';
            }
        }

        activeEl.current = null;
        background.current.style.borderRight = 'none';
        document.removeEventListener('mousemove', mouseMove);
        document.removeEventListener('mouseup', mouseUp);
    }

    function handleToggleForm(number) {
        for(let i=1; i<=7; i++) {
            const form = document.getElementById(`form${i}`);
            if(i === number) {
                form.style.display = "block";
            } else {
                form.style.display = "none";
            }
        }
    }

    function handleSubmitForm(number) {}

    

    return (
        <div id="assetContainer" ref={background}>
        <button className={styles.assetsButton} id={styles["menuToggle"]} onClick={()=> sidebar.current.classList.toggle('hidden')}>☰ Menu</button>
        {/* <button id="menuToggle" onClick={()=> "toggleSidebar()"}>☰ Menu</button> */}

        <div id="mapContainer">
            <div id="map">
                {/* <!-- Buildings 1–19 --> */}
                <div className={styles.building} style={{ top: "150px", left: "50px" }} id="b1">1</div>
                <div className={styles.building} style={{ top: "150px", left: "100px" }} id="b2">2</div>
                <div className={styles.building} style={{ top: "150px", left: "150px" }} id="b3">3</div>
                <div className={styles.building} style={{ top: "150px", left: "200px" }} id="b4">4</div>
                <div className={styles.building} style={{ top: "150px", left: "250px" }} id="b5">5</div>
                <div className={styles.building} style={{ top: "200px", left: "50px" }} id="b6">6</div>
                <div className={styles.building} style={{ top: "200px", left: "100px" }} id="b7">7</div>
                <div className={styles.building} style={{ top: "200px", left: "150px" }} id="b8">8</div>
                <div className={styles.building} style={{ top: "200px", left: "200px" }} id="b9">9</div>
                <div className={styles.building} style={{ top: "200px", left: "250px" }} id="b10">10</div>
                <div className={styles.building} style={{ top: "250px", left: "50px" }} id="b11">11</div>
                <div className={styles.building} style={{ top: "250px", left: "100px" }} id="b12">12</div>
                <div className={styles.building} style={{ top: "250px", left: "150px" }} id="b13">13</div>
                <div className={styles.building} style={{ top: "250px", left: "200px" }} id="b14">14</div>
                <div className={styles.building} style={{ top: "250px", left: "250px" }} id="b15">15</div>
                <div className={styles.building} style={{ top: "300px", left: "50px" }} id="b16">16</div>
                <div className={styles.building} style={{ top: "300px", left: "100px" }} id="b17">17</div>
                <div className={styles.building} style={{ top: "300px", left: "150px" }} id="b18">18</div>
                <div className={styles.building} style={{ top: "300px", left: "200px" }} id="b19">19</div>


                {/* Amenities */}
                <div className={styles.amenity} style={{ top: "350px", left: "50px" }} id="a1">🏠<br />Leasing</div>
                <div className={styles.amenity} style={{ top: "350px", left: "120px" }} id="a2">🗑️<br />Compactor</div>
                <div className={styles.amenity} style={{ top: "350px", left: "190px" }} id="a3">🔥<br />Grill</div>
                <div className={styles.amenity} style={{ top: "350px", left: "260px" }} id="a4">✉️<br />Mailboxes</div>
                <div className={styles.amenity} style={{ top: "400px", left: "50px" }} id="a5">🏐<br />Volleyball</div>
                <div className={styles.amenity} style={{ top: "400px", left: "120px" }} id="a6">🏛️<br />Club House</div>
                <div className={styles.amenity} style={{ top: "400px", left: "190px" }} id="a7">🌲<br />Park 1</div>
                <div className={styles.amenity} style={{ top: "400px", left: "260px" }} id="a7a">🌲<br />Park 2</div>
                <div className={styles.amenity} style={{ top: "450px", left: "50px" }} id="a8">💪<br />Gym</div>
                <div className={styles.amenity} style={{ top: "450px", left: "120px" }} id="a9">🎾<br />Tennis</div>
                <div className={styles.amenity} style={{ top: "450px", left: "190px" }} id="a10">🏊<br />Pool 1</div>
                <div className={styles.amenity} style={{ top: "450px", left: "260px" }} id="a11">🏊<br />Pool 2</div>
                <div className={styles.amenity} style={{ top: "500px", left: "50px" }} id="a12">🎠<br />Playground</div>
                <div className={styles.amenity} style={{ top: "500px", left: "120px" }} id="a13">📦<br />Mail Room</div>
                <div className={styles.amenity} style={{ top: "700px", left: "50px" }} id="a14">🛠️<br />Maintenance</div>
                <div className={styles.amenity} style={{ top: "700px", left: "120px" }} id="a15">🗑️<br />Trash</div>
                <div className={styles.amenity} style={{ top: "700px", left: "190px" }} id="a16">🌊<br />Flood</div>
                <div className={styles.amenity} style={{ top: "700px", left: "260px" }} id="a17">⚠️<br />Incident</div>


                {/* Garages A–M */}
                <div className={styles.garage} style={{ top: "550px", left: "50px" }} id="gA">A</div>
                <div className={styles.garage} style={{ top: "550px", left: "100px" }} id="gB">B</div>
                <div className={styles.garage} style={{ top: "550px", left: "150px" }} id="gC">C</div>
                <div className={styles.garage} style={{ top: "550px", left: "200px" }} id="gD">D</div>
                <div className={styles.garage} style={{ top: "550px", left: "250px" }} id="gE">E</div>

                <div className={styles.garage} style={{ top: "600px", left: "50px" }} id="gF">F</div>
                <div className={styles.garage} style={{ top: "600px", left: "100px" }} id="gG">G</div>
                <div className={styles.garage} style={{ top: "600px", left: "150px" }} id="gH">H</div>
                <div className={styles.garage} style={{ top: "600px", left: "200px" }} id="gI">I</div>
                <div className={styles.garage} style={{ top: "600px", left: "250px" }} id="gJ">J</div>

                <div className={styles.garage} style={{ top: "650px", left: "50px" }} id="gK">K</div>
                <div className={styles.garage} style={{ top: "650px", left: "100px" }} id="gL">L</div>
                <div className={styles.garage} style={{ top: "650px", left: "150px" }} id="gM">M</div>
            </div>
        

            <div id={styles["sidebar"]} className="hidden" ref={sidebar}>
            <h2>Types of Log Templates</h2>

            {/* <!-- 01. Daily Maintenance Logs --> */}
            <div className={styles["template-section"]} onClick={()=> handleToggleForm(1)}>
            {/* <div class="template-section" onClick={()=> "toggleForm('form1')"}> */}
                01. Daily Maintenance Logs
            </div>
            <div className={styles["template-form"]} id="form1">
                <label>Date & Time:
                    <input type="text" id={styles["timestamp1"]} readOnly />
                </label>
                
                <label>Technician Name:
                    <input type="text" id={styles["tech1"]} />
                </label>
                
                {/* <!-- Dropdown: Unit + Mailbox --> */}
                <label>Unit & Mailbox:
                    <select id={styles["unitSelector1"]} onChange={()=> ""}></select>
                    {/* <select id="unitSelector1" onchange="fillUnitAndMailbox(1)"></select> */}
                </label>
                <label>Unit #:
                    <input type="text" id={styles["unitOutput1"]} readOnly />
                </label>
                <label>Mailbox #:
                    <input type="text" id={styles["mailboxOutput1"]} readOnly />
                </label>
                
                {/* <!-- Modal trigger --> */}
                <button className={styles.assetsButton} onClick={()=> ""}>
                {/* <button onClick={()=> "window.open('https://www.georgia-bell.us/demo/nomi/mrl/PrestonPro2abc-2a.html', '_blank')"}> */}
                    Open Inspection Form
                </button>
                <p></p>

                {/* <!-- Modal --> */}
                <div id={styles["inspectionModal"]} style={{display: "none"}}>
                    <p id={styles["modalText"]}>Ready to inspect Unit?</p>
                    <button className={styles.assetsButton} id={styles["openFormBtn"]}>Open Form</button>
                </div>

                <label>Maintenance Type:
                    <select id={styles["maintenanceType1"]}>
                    <option value="">Select Type</option>
                    <option>Daily</option>
                    <option>Preventive</option>
                    <option>Corrective</option>
                    <option>Emergency</option>
                    <option>Cleaned</option>
                    <option>Repaired</option>
                    <option>Replaced</option>
                    <option>Checked</option>
                    </select>
                </label>
                
                <label>Maintenance Summary:
                    <textarea rows="3" id={styles["summary1"]}></textarea>
                </label>
                
                <button className={styles.assetsButton} onClick={()=> ""}>Submit</button>
                {/* <button onClick={()=> "submitForm(1)"}>Submit</button> */}
            </div>

            {/* <!-- 02. Preventive Maintenance Logs --> */}
            <div className={styles["template-section"]} onClick={()=> handleToggleForm(2)}>
            {/* <div class="template-section" onClick={()=> "toggleForm('form2')"}> */}
                02. Preventive Maintenance Logs
            </div>
            <div className={styles["template-form"]} id="form2">
                <label>Date & Time:
                    <input type="text" id={styles["timestamp2"]} readOnly />
                </label>
                
                <label>Technician Name:
                    <input type="text" id={styles["tech2"]} />
                </label>
                
                {/* <!-- Dropdown: Unit + Mailbox --> */}
                <label>Unit & Mailbox:
                    <select id={styles["unitSelector2"]} onChange={()=> ""}></select>
                    {/* <select id="unitSelector2" onchange="fillUnitAndMailbox(2)"></select> */}
                </label>
                
                <label>Unit #:
                    <input type="text" id={styles["unitOutput2"]} readOnly />
                </label>
                
                <label>Mailbox #:
                    <input type="text" id={styles["mailboxOutput2"]} readOnly />
                </label>
                
                {/* <!-- Dropdown 1: Buildings --> */}
                <label>Building:
                    <select id={styles["building2"]}>
                    <option value="">Select Building</option>
                    <option>Building 1</option>
                    <option>Building 2</option>
                    <option>Building 3</option>
                    <option>Building 4</option>
                    <option>Building 5</option>
                    <option>Building 6</option>
                    <option>Building 7</option>
                    <option>Building 8</option>
                    <option>Building 9</option>
                    <option>Building 10</option>
                    <option>Building 11</option>
                    <option>Building 12</option>
                    <option>Building 13</option>
                    <option>Building 14</option>
                    <option>Building 15</option>
                    <option>Building 16</option>
                    <option>Building 17</option>
                    <option>Building 18</option>
                    <option>Building 19</option>
                    </select>
                </label>
                
                {/* <!-- Dropdown 2: Amenities --> */}
                <label>Amenity:
                    <select id={styles["amenity2"]}>
                    <option value="">Select Amenity</option>
                    <option>Leasing 🏠</option>
                    <option>Compactor 🗑️</option>
                    <option>Grill 🔥</option>
                    <option>Mailboxes ✉️</option>
                    <option>Volleyball 🏐</option>
                    <option>Club House 🏛️</option>
                    <option>Park 1 🌲</option>
                    <option>Park 2 🌲</option>
                    <option>Gym 💪</option>
                    <option>Tennis 🎾</option>
                    <option>Pool 1 🏊</option>
                    <option>Pool 2 🏊</option>
                    <option>Playground 🎠</option>
                    <option>Mail Room 📦</option>
                    <option>Maintenance 🛠️</option>
                    <option>Trash 🗑️</option>
                    <option>Flood 🌊</option>
                    <option>Incident ⚠️</option>
                    </select>
                </label>
                
                {/* <!-- Dropdown 3: Garages --> */}
                <label>Garage:
                    <select id={styles["garage2"]}>
                    <option value="">Select Garage</option>
                    <option>Garage A</option>
                    <option>Garage B</option>
                    <option>Garage C</option>
                    <option>Garage D</option>
                    <option>Garage E</option>
                    <option>Garage F</option>
                    <option>Garage G</option>
                    <option>Garage H</option>
                    <option>Garage I</option>
                    <option>Garage J</option>
                    <option>Garage K</option>
                    <option>Garage L</option>
                    <option>Garage M</option>
                    </select>
                </label>
                
                {/* <!-- Dropdown 4: Maintenance Type --> */}
                <label>Maintenance Type:
                    <select id={styles["maintenanceType2"]}>
                    <option value="">Select Type</option>
                    <option>Daily</option>
                    <option>Preventive</option>
                    <option>Corrective</option>
                    <option>Emergency</option>
                    <option>Cleaned</option>
                    <option>Repaired</option>
                    <option>Replaced</option>
                    <option>Checked</option>
                    </select>
                </label>
                
                <label>Maintenance Summary:
                    <textarea rows="3" id={styles["summary2"]}></textarea>
                </label>
                
                <button className={styles.assetsButton} onClick={()=> ""}>Submit</button>
                {/* <button onClick={()=> "submitForm('2')"}>Submit</button> */}
            </div>


            {/* <!-- 03. Equipment Maintenance Logs --> */}
            <div className={styles["template-section"]} onClick={()=> handleToggleForm(3)}>
            {/* <div class="template-section" onClick={()=> "toggleForm('form3')"}> */}
                03. Equipment Maintenance Logs
            </div>
            <div className={styles["template-form"]} id="form3">
                <label>Date & Time:
                    <input type="text" id={styles["timestamp3"]} readOnly />
                </label>
                
                <label>Technician Name:
                    <input type="text" id={styles["tech3"]} />
                </label>
                
                {/* <!-- Dropdown: Unit + Mailbox --> */}
                <label>Unit & Mailbox:
                    <select id={styles["unitSelector3"]} onChange={()=> ""}></select>
                    {/* <select id="unitSelector3" onchange="fillUnitAndMailbox(3)"></select> */}
                </label>
                
                <label>Unit #:
                    <input type="text" id={styles["unitOutput3"]} readOnly />
                </label>
                
                <label>Mailbox #:
                    <input type="text" id={styles["mailboxOutput3"]} readOnly />
                </label>
                
                {/* <!-- Dropdown 1: Buildings --> */}
                <label>Building:
                    <select id={styles["building3"]}>
                    <option value="">Select Building</option>
                    <option>Building 1</option>
                    <option>Building 2</option>
                    <option>Building 3</option>
                    <option>Building 4</option>
                    <option>Building 5</option>
                    <option>Building 6</option>
                    <option>Building 7</option>
                    <option>Building 8</option>
                    <option>Building 9</option>
                    <option>Building 10</option>
                    <option>Building 11</option>
                    <option>Building 12</option>
                    <option>Building 13</option>
                    <option>Building 14</option>
                    <option>Building 15</option>
                    <option>Building 16</option>
                    <option>Building 17</option>
                    <option>Building 18</option>
                    <option>Building 19</option>
                    </select>
                </label>
                
                {/* <!-- Dropdown 2: Amenities --> */}
                <label>Amenity:
                    <select id={styles["amenity3"]}>
                    <option value="">Select Amenity</option>
                    <option>Leasing 🏠</option>
                    <option>Compactor 🗑️</option>
                    <option>Grill 🔥</option>
                    <option>Mailboxes ✉️</option>
                    <option>Volleyball 🏐</option>
                    <option>Club House 🏛️</option>
                    <option>Park 1 🌲</option>
                    <option>Park 2 🌲</option>
                    <option>Gym 💪</option>
                    <option>Tennis 🎾</option>
                    <option>Pool 1 🏊</option>
                    <option>Pool 2 🏊</option>
                    <option>Playground 🎠</option>
                    <option>Mail Room 📦</option>
                    <option>Maintenance 🛠️</option>
                    <option>Trash 🗑️</option>
                    <option>Flood 🌊</option>
                    <option>Incident ⚠️</option>
                    </select>
                </label>
                
                {/* <!-- Dropdown 3: Garages --> */}
                <label>Garage:
                    <select id={styles["garage3"]}>
                    <option value="">Select Garage</option>
                    <option>Garage A</option>
                    <option>Garage B</option>
                    <option>Garage C</option>
                    <option>Garage D</option>
                    <option>Garage E</option>
                    <option>Garage F</option>
                    <option>Garage G</option>
                    <option>Garage H</option>
                    <option>Garage I</option>
                    <option>Garage J</option>
                    <option>Garage K</option>
                    <option>Garage L</option>
                    <option>Garage M</option>
                    </select>
                </label>
                
                {/* <!-- Dropdown 4: Maintenance Type --> */}
                <label>Maintenance Type:
                    <select id={styles["maintenanceType3"]}>
                    <option value="">Select Type</option>
                    <option>Daily</option>
                    <option>Preventive</option>
                    <option>Corrective</option>
                    <option>Emergency</option>
                    <option>Cleaned</option>
                    <option>Repaired</option>
                    <option>Replaced</option>
                    <option>Checked</option>
                    </select>
                </label>
                
                <label>Maintenance Summary:
                    <textarea rows="3" id={styles["summary3"]}></textarea>
                </label>
                
                <button className={styles.assetsButton} onClick={()=> ""}>Submit</button>
                {/* <button onClick={()=> "submitForm('3')"}>Submit</button> */}
            </div>


            {/* <!-- 04. Corrective Maintenance Logs --> */}
            <div className={styles["template-section"]} onClick={()=> handleToggleForm(4)}>
            {/* <div class="template-section" onClick={()=> "toggleForm('form4')"}> */}
                04. Corrective Maintenance Logs
            </div>
            <div className={styles["template-form"]} id="form4">
                <label>Date & Time:
                    <input type="text" id={styles["timestamp4"]} readOnly />
                </label>
                
                <label>Technician Name:
                    <input type="text" id={styles["tech4"]} />
                </label>
                
                {/* <!-- Dropdown: Unit + Mailbox --> */}
                <label>Unit & Mailbox:
                    <select id={styles["unitSelector4"]} onChange={()=> ""}></select>
                    {/* <select id="unitSelector4" onchange="fillUnitAndMailbox(4)"></select> */}
                </label>
                
                <label>Unit #:
                    <input type="text" id={styles["unitOutput4"]} readOnly />
                </label>
                
                <label>Mailbox #:
                    <input type="text" id={styles["mailboxOutput4"]} readOnly />
                </label>
                
                {/* <!-- Dropdown 1: Buildings --> */}
                <label>Building:
                    <select id={styles["building4"]}>
                    <option value="">Select Building</option>
                    <option>Building 1</option>
                    <option>Building 2</option>
                    <option>Building 3</option>
                    <option>Building 4</option>
                    <option>Building 5</option>
                    <option>Building 6</option>
                    <option>Building 7</option>
                    <option>Building 8</option>
                    <option>Building 9</option>
                    <option>Building 10</option>
                    <option>Building 11</option>
                    <option>Building 12</option>
                    <option>Building 13</option>
                    <option>Building 14</option>
                    <option>Building 15</option>
                    <option>Building 16</option>
                    <option>Building 17</option>
                    <option>Building 18</option>
                    <option>Building 19</option>
                    </select>
                </label>
                
                {/* <!-- Dropdown 2: Amenities --> */}
                <label>Amenity:
                    <select id={styles["amenity4"]}>
                    <option value="">Select Amenity</option>
                    <option>Leasing 🏠</option>
                    <option>Compactor 🗑️</option>
                    <option>Grill 🔥</option>
                    <option>Mailboxes ✉️</option>
                    <option>Volleyball 🏐</option>
                    <option>Club House 🏛️</option>
                    <option>Park 1 🌲</option>
                    <option>Park 2 🌲</option>
                    <option>Gym 💪</option>
                    <option>Tennis 🎾</option>
                    <option>Pool 1 🏊</option>
                    <option>Pool 2 🏊</option>
                    <option>Playground 🎠</option>
                    <option>Mail Room 📦</option>
                    <option>Maintenance 🛠️</option>
                    <option>Trash 🗑️</option>
                    <option>Flood 🌊</option>
                    <option>Incident ⚠️</option>
                    </select>
                </label>
                
                {/* <!-- Dropdown 3: Garages --> */}
                <label>Garage:
                    <select id={styles["garage4"]}>
                    <option value="">Select Garage</option>
                    <option>Garage A</option>
                    <option>Garage B</option>
                    <option>Garage C</option>
                    <option>Garage D</option>
                    <option>Garage E</option>
                    <option>Garage F</option>
                    <option>Garage G</option>
                    <option>Garage H</option>
                    <option>Garage I</option>
                    <option>Garage J</option>
                    <option>Garage K</option>
                    <option>Garage L</option>
                    <option>Garage M</option>
                    </select>
                </label>
                
                {/* <!-- Dropdown 4: Maintenance Type --> */}
                <label>Maintenance Type:
                    <select id={styles["maintenanceType4"]}>
                    <option value="">Select Type</option>
                    <option>Daily</option>
                    <option>Preventive</option>
                    <option>Corrective</option>
                    <option>Emergency</option>
                    <option>Cleaned</option>
                    <option>Repaired</option>
                    <option>Replaced</option>
                    <option>Checked</option>
                    </select>
                </label>
                
                <label>Maintenance Summary:
                    <textarea rows="3" id={styles["summary4"]}></textarea>
                </label>
                
                <button className={styles.assetsButton} onClick={()=> ""}>Submit</button>
                {/* <button onClick={()=> "submitForm('4')"}>Submit</button> */}
            </div>


            {/* <!-- 05. Facility Maintenance Logs --> */}
            <div className={styles["template-section"]} onClick={()=> handleToggleForm(5)}>
            {/* <div class="template-section" onClick={()=> "toggleForm('form5')"}> */}
                05. Facility Maintenance Logs
            </div>
            <div className={styles["template-form"]} id="form5">
                <label>Date & Time:
                    <input type="text" id={styles["timestamp5"]} readOnly />
                </label>
                
                <label>Technician Name:
                    <input type="text" id={styles["tech5"]} />
                </label>
                
                {/* <!-- Dropdown: Unit + Mailbox --> */}
                <label>Unit & Mailbox:
                    <select id={styles["unitSelector5"]} onChange={()=> ""}></select>
                    {/* <select id="unitSelector5" onchange="fillUnitAndMailbox(5)"></select> */}
                </label>
                
                <label>Unit #:
                    <input type="text" id={styles["unitOutput5"]} readOnly />
                </label>
                
                <label>Mailbox #:
                    <input type="text" id={styles["mailboxOutput5"]} readOnly />
                </label>
                
                {/* <!-- Dropdown 1: Buildings --> */}
                <label>Building:
                    <select id={styles["building5"]}>
                    <option value="">Select Building</option>
                    <option>Building 1</option>
                    <option>Building 2</option>
                    <option>Building 3</option>
                    <option>Building 4</option>
                    <option>Building 5</option>
                    <option>Building 6</option>
                    <option>Building 7</option>
                    <option>Building 8</option>
                    <option>Building 9</option>
                    <option>Building 10</option>
                    <option>Building 11</option>
                    <option>Building 12</option>
                    <option>Building 13</option>
                    <option>Building 14</option>
                    <option>Building 15</option>
                    <option>Building 16</option>
                    <option>Building 17</option>
                    <option>Building 18</option>
                    <option>Building 19</option>
                    </select>
                </label>
                
                {/* <!-- Dropdown 2: Amenities --> */}
                <label>Amenity:
                    <select id={styles["amenity5"]}>
                    <option value="">Select Amenity</option>
                    <option>Leasing 🏠</option>
                    <option>Compactor 🗑️</option>
                    <option>Grill 🔥</option>
                    <option>Mailboxes ✉️</option>
                    <option>Volleyball 🏐</option>
                    <option>Club House 🏛️</option>
                    <option>Park 1 🌲</option>
                    <option>Park 2 🌲</option>
                    <option>Gym 💪</option>
                    <option>Tennis 🎾</option>
                    <option>Pool 1 🏊</option>
                    <option>Pool 2 🏊</option>
                    <option>Playground 🎠</option>
                    <option>Mail Room 📦</option>
                    <option>Maintenance 🛠️</option>
                    <option>Trash 🗑️</option>
                    <option>Flood 🌊</option>
                    <option>Incident ⚠️</option>
                    </select>
                </label>
                
                {/* <!-- Dropdown 3: Garages --> */}
                <label>Garage:
                    <select id={styles["garage5"]}>
                    <option value="">Select Garage</option>
                    <option>Garage A</option>
                    <option>Garage B</option>
                    <option>Garage C</option>
                    <option>Garage D</option>
                    <option>Garage E</option>
                    <option>Garage F</option>
                    <option>Garage G</option>
                    <option>Garage H</option>
                    <option>Garage I</option>
                    <option>Garage J</option>
                    <option>Garage K</option>
                    <option>Garage L</option>
                    <option>Garage M</option>
                    </select>
                </label>
                
                {/* <!-- Dropdown 4: Maintenance Type --> */}
                <label>Maintenance Type:
                    <select id={styles["maintenanceType5"]}>
                    <option value="">Select Type</option>
                    <option>Daily</option>
                    <option>Preventive</option>
                    <option>Corrective</option>
                    <option>Emergency</option>
                    <option>Cleaned</option>
                    <option>Repaired</option>
                    <option>Replaced</option>
                    <option>Checked</option>
                    </select>
                </label>
                
                <label>Maintenance Summary:
                    <textarea rows="3" id={styles["summary5"]}></textarea>
                </label>
                
                <button className={styles.assetsButton} onClick={()=> ""}>Submit</button>
                {/* <button onClick={()=> "submitForm('5')"}>Submit</button> */}
            </div>


            {/* <!-- 06. Machine Maintenance Logs --> */}
            <div className={styles["template-section"]} onClick={()=> handleToggleForm(6)}>
            {/* <div class="template-section" onClick={()=> "toggleForm('form6')"}> */}
                06. Machine Maintenance Logs
            </div>
            <div className={styles["template-form"]} id="form6">
                <label>Date & Time:
                    <input type="text" id={styles["timestamp6"]} readOnly />
                </label>
                
                <label>Technician Name:
                    <input type="text" id={styles["tech6"]} />
                </label>
                
                {/* <!-- Dropdown: Unit + Mailbox --> */}
                <label>Unit & Mailbox:
                    <select id={styles["unitSelector6"]} onChange={()=> ""}></select>
                    {/* <select id="unitSelector6" onchange="fillUnitAndMailbox(6)"></select> */}
                </label>
                
                <label>Unit #:
                    <input type="text" id={styles["unitOutput6"]} readOnly />
                </label>
                
                <label>Mailbox #:
                    <input type="text" id={styles["mailboxOutput6"]} readOnly />
                </label>
                
                {/* <!-- Dropdown 1: Buildings --> */}
                <label>Building:
                    <select id={styles["building6"]}>
                    <option value="">Select Building</option>
                    <option>Building 1</option>
                    <option>Building 2</option>
                    <option>Building 3</option>
                    <option>Building 4</option>
                    <option>Building 5</option>
                    <option>Building 6</option>
                    <option>Building 7</option>
                    <option>Building 8</option>
                    <option>Building 9</option>
                    <option>Building 10</option>
                    <option>Building 11</option>
                    <option>Building 12</option>
                    <option>Building 13</option>
                    <option>Building 14</option>
                    <option>Building 15</option>
                    <option>Building 16</option>
                    <option>Building 17</option>
                    <option>Building 18</option>
                    <option>Building 19</option>
                    </select>
                </label>
                
                {/* <!-- Dropdown 2: Amenities --> */}
                <label>Amenity:
                    <select id={styles["amenity6"]}>
                    <option value="">Select Amenity</option>
                    <option>Leasing 🏠</option>
                    <option>Compactor 🗑️</option>
                    <option>Grill 🔥</option>
                    <option>Mailboxes ✉️</option>
                    <option>Volleyball 🏐</option>
                    <option>Club House 🏛️</option>
                    <option>Park 1 🌲</option>
                    <option>Park 2 🌲</option>
                    <option>Gym 💪</option>
                    <option>Tennis 🎾</option>
                    <option>Pool 1 🏊</option>
                    <option>Pool 2 🏊</option>
                    <option>Playground 🎠</option>
                    <option>Mail Room 📦</option>
                    <option>Maintenance 🛠️</option>
                    <option>Trash 🗑️</option>
                    <option>Flood 🌊</option>
                    <option>Incident ⚠️</option>
                    </select>
                </label>
                
                {/* <!-- Dropdown 3: Garages --> */}
                <label>Garage:
                    <select id={styles["garage6"]}>
                    <option value="">Select Garage</option>
                    <option>Garage A</option>
                    <option>Garage B</option>
                    <option>Garage C</option>
                    <option>Garage D</option>
                    <option>Garage E</option>
                    <option>Garage F</option>
                    <option>Garage G</option>
                    <option>Garage H</option>
                    <option>Garage I</option>
                    <option>Garage J</option>
                    <option>Garage K</option>
                    <option>Garage L</option>
                    <option>Garage M</option>
                    </select>
                </label>
                
                {/* <!-- Dropdown 4: Maintenance Type --> */}
                <label>Maintenance Type:
                    <select id={styles["maintenanceType6"]}>
                    <option value="">Select Type</option>
                    <option>Daily</option>
                    <option>Preventive</option>
                    <option>Corrective</option>
                    <option>Emergency</option>
                    <option>Cleaned</option>
                    <option>Repaired</option>
                    <option>Replaced</option>
                    <option>Checked</option>
                    </select>
                </label>
                
                <label>Maintenance Summary:
                    <textarea rows="3" id={styles["summary6"]}></textarea>
                </label>
                
                <button className={styles.assetsButton} onClick={()=> ""}>Submit</button>
                {/* <button onClick={()=> "submitForm('6')"}>Submit</button> */}
            </div>


            {/* <!-- 07. Other Maintenance Logs --> */}
            <div className={styles["template-section"]} onClick={()=> handleToggleForm(7)}>
            {/* <div class="template-section" onClick={()=> "toggleForm('form7')"}> */}
                07. Other Maintenance Logs
            </div>
            <div className={styles["template-form"]} id="form7">
                <label>Date & Time:
                    <input type="text" id={styles["timestamp7"]} readOnly />
                </label>
                
                <label>Technician Name:
                    <input type="text" id={styles["tech7"]} />
                </label>
                
                {/* <!-- Dropdown: Unit + Mailbox --> */}
                <label>Unit & Mailbox:
                    <select id={styles["unitSelector7"]} onChange={()=> ""}></select>
                    {/* <select id="unitSelector7" onchange="fillUnitAndMailbox(7)"></select> */}
                </label>
                
                <label>Unit #:
                    <input type="text" id={styles["unitOutput7"]} readOnly />
                </label>
                
                <label>Mailbox #:
                    <input type="text" id={styles["mailboxOutput7"]} readOnly />
                </label>
                
                {/* <!-- Dropdown 1: Buildings --> */}
                <label>Building:
                    <select id={styles["building7"]}>
                    <option value="">Select Building</option>
                    <option>Building 1</option>
                    <option>Building 2</option>
                    <option>Building 3</option>
                    <option>Building 4</option>
                    <option>Building 5</option>
                    <option>Building 6</option>
                    <option>Building 7</option>
                    <option>Building 8</option>
                    <option>Building 9</option>
                    <option>Building 10</option>
                    <option>Building 11</option>
                    <option>Building 12</option>
                    <option>Building 13</option>
                    <option>Building 14</option>
                    <option>Building 15</option>
                    <option>Building 16</option>
                    <option>Building 17</option>
                    <option>Building 18</option>
                    <option>Building 19</option>
                    </select>
                </label>
                
                {/* <!-- Dropdown 2: Amenities --> */}
                <label>Amenity:
                    <select id={styles["amenity7"]}>
                    <option value="">Select Amenity</option>
                    <option>Leasing 🏠</option>
                    <option>Compactor 🗑️</option>
                    <option>Grill 🔥</option>
                    <option>Mailboxes ✉️</option>
                    <option>Volleyball 🏐</option>
                    <option>Club House 🏛️</option>
                    <option>Park 1 🌲</option>
                    <option>Park 2 🌲</option>
                    <option>Gym 💪</option>
                    <option>Tennis 🎾</option>
                    <option>Pool 1 🏊</option>
                    <option>Pool 2 🏊</option>
                    <option>Playground 🎠</option>
                    <option>Mail Room 📦</option>
                    <option>Maintenance 🛠️</option>
                    <option>Trash 🗑️</option>
                    <option>Flood 🌊</option>
                    <option>Incident ⚠️</option>
                    </select>
                </label>
                
                {/* <!-- Dropdown 3: Garages --> */}
                <label>Garage:
                    <select id={styles["garage7"]}>
                    <option value="">Select Garage</option>
                    <option>Garage A</option>
                    <option>Garage B</option>
                    <option>Garage C</option>
                    <option>Garage D</option>
                    <option>Garage E</option>
                    <option>Garage F</option>
                    <option>Garage G</option>
                    <option>Garage H</option>
                    <option>Garage I</option>
                    <option>Garage J</option>
                    <option>Garage K</option>
                    <option>Garage L</option>
                    <option>Garage M</option>
                    </select>
                </label>
                
                {/* <!-- Dropdown 4: Maintenance Type --> */}
                <label>Maintenance Type:
                    <select id={styles["maintenanceType7"]}>
                    <option value="">Select Type</option>
                    <option>Daily</option>
                    <option>Preventive</option>
                    <option>Corrective</option>
                    <option>Emergency</option>
                    <option>Cleaned</option>
                    <option>Repaired</option>
                    <option>Replaced</option>
                    <option>Checked</option>
                    </select>
                </label>
                
                <label>Maintenance Summary:
                    <textarea rows="3" id={styles["summary7"]}></textarea>
                </label>
                
                <button className={styles.assetsButton} onClick={()=> ""}>Submit</button>
                {/* <button onClick={()=> "submitForm('7')"}>Submit</button> */}
            </div>
            </div>
        </div>
        </div>
    )
}