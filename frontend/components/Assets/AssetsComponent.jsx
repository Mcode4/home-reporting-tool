"use client";
import { useState } from "react";
import styles from "./AssetsConponent.module.css"

export default function Assets() {
    const [menuActive, setMenuActive] = useState(false);

    function handleToggleForm(number) {}

    function handleSubmitForm(number) {}

    return (
        <>
        <button className={styles.assetsButton} id={styles["menuToggle"]} onClick={()=> ""}>☰ Menu</button>
        {/* <button id="menuToggle" onClick={()=> "toggleSidebar()"}>☰ Menu</button> */}

        <div id="mapContainer">
            <div id="map">
                {/* <!-- Buildings 1–19 --> */}
                <div className={styles["building"]} style={{top: "50px", left: "50px"}} id={styles["b1"]}>1</div>
                <div className={styles["building"]} style={{top: "50px", left: "100px"}} id={styles["b2"]}>2</div>
                <div className={styles["building"]} style={{top:"50px", left:"150px"}} id={styles["b3"]}>3</div>
                <div className={styles["building"]} style={{ top: '50px', left: '200px' }} id={styles["b4"]}>4</div>
                <div className={styles["building"]} style={{ top: '50px', left: '250px' }} id={styles["b5"]}>5</div>
                <div className={styles["building"]} style={{ top: '100px', left: '50px' }} id={styles["b6"]}>6</div>
                <div className={styles["building"]} style={{ top: '100px', left: '100px' }} id={styles["b7"]}>7</div>
                <div className={styles["building"]} style={{ top: '100px', left: '150px' }} id={styles["b8"]}>8</div>
                <div className={styles["building"]} style={{ top: '100px', left: '200px' }} id={styles["b9"]}>9</div>
                <div className={styles["building"]} style={{ top: '100px', left: '250px' }} id={styles["b10"]}>10</div>
                <div className={styles["building"]} style={{ top: '150px', left: '50px' }} id={styles["b11"]}>11</div>
                <div className={styles["building"]} style={{ top: '150px', left: '100px' }} id={styles["b12"]}>12</div>
                <div className={styles["building"]} style={{ top: '150px', left: '150px' }} id={styles["b13"]}>13</div>
                <div className={styles["building"]} style={{ top: '150px', left: '200px' }} id={styles["b14"]}>14</div>
                <div className={styles["building"]} style={{ top: '150px', left: '250px' }} id={styles["b15"]}>15</div>
                <div className={styles["building"]} style={{ top: '200px', left: '50px' }} id={styles["b16"]}>16</div>
                <div className={styles["building"]} style={{ top: '200px', left: '100px' }} id={styles["b17"]}>17</div>
                <div className={styles["building"]} style={{ top: '200px', left: '150px' }} id={styles["b18"]}>18</div>
                <div className={styles["building"]} style={{ top: '200px', left: '200px' }} id={styles["b19"]}>19</div>

                {/* Amenities */}
                <div className={styles["amenity"]} style={{ top: '250px', left: '50px' }} id={styles["a1"]}>🏠<br />Leasing</div>
                <div className={styles["amenity"]} style={{ top: '250px', left: '120px' }} id={styles["a2"]}>🗑️<br />Compactor</div>
                <div className={styles["amenity"]} style={{ top: '250px', left: '190px' }} id={styles["a3"]}>🔥<br />Grill</div>
                <div className={styles["amenity"]} style={{ top: '250px', left: '260px' }} id={styles["a4"]}>✉️<br />Mailboxes</div>
                <div className={styles["amenity"]} style={{ top: '300px', left: '50px' }} id={styles["a5"]}>🏐<br />Volleyball</div>
                <div className={styles["amenity"]} style={{ top: '300px', left: '120px' }} id={styles["a6"]}>🏛️<br />Club House</div>
                <div className={styles["amenity"]} style={{ top: '300px', left: '190px' }} id={styles["a7"]}>🌲<br />Park 1</div>
                <div className={styles["amenity"]} style={{ top: '300px', left: '260px' }} id={styles["a7a"]}>🌲<br />Park 2</div>
                <div className={styles["amenity"]} style={{ top: '350px', left: '50px' }} id={styles["a8"]}>💪<br />Gym</div>
                <div className={styles["amenity"]} style={{ top: '350px', left: '120px' }} id={styles["a9"]}>🎾<br />Tennis</div>
                <div className={styles["amenity"]} style={{ top: '350px', left: '190px' }} id={styles["a10"]}>🏊<br />Pool 1</div>
                <div className={styles["amenity"]} style={{ top: '350px', left: '260px' }} id={styles["a11"]}>🏊<br />Pool 2</div>
                <div className={styles["amenity"]} style={{ top: '400px', left: '50px' }} id={styles["a12"]}>🎠<br />Playground</div>
                <div className={styles["amenity"]} style={{ top: '400px', left: '120px' }} id={styles["a13"]}>📦<br />Mail Room</div>
                <div className={styles["amenity"]} style={{ top: '600px', left: '50px' }} id={styles["a14"]}>🛠️<br />Maintenance</div>
                <div className={styles["amenity"]} style={{ top: '600px', left: '120px' }} id={styles["a15"]}>🗑️<br />Trash</div>
                <div className={styles["amenity"]} style={{ top: '600px', left: '190px' }} id={styles["a16"]}>🌊<br />Flood</div>
                <div className={styles["amenity"]} style={{ top: '600px', left: '260px' }} id={styles["a17"]}>⚠️<br />Incident</div>

                {/* Garages A–M */}
                <div className={styles["garage"]} style={{ top: '450px', left: '50px' }} id={styles["gA"]}>A</div>
                <div className={styles["garage"]} style={{ top: '450px', left: '100px' }} id={styles["gB"]}>B</div>
                <div className={styles["garage"]} style={{ top: '450px', left: '150px' }} id={styles["gC"]}>C</div>
                <div className={styles["garage"]} style={{ top: '450px', left: '200px' }} id={styles["gD"]}>D</div>
                <div className={styles["garage"]} style={{ top: '450px', left: '250px' }} id={styles["gE"]}>E</div>
                <div className={styles["garage"]} style={{ top: '500px', left: '50px' }} id={styles["gF"]}>F</div>
                <div className={styles["garage"]} style={{ top: '500px', left: '100px' }} id={styles["gG"]}>G</div>
                <div className={styles["garage"]} style={{ top: '500px', left: '150px' }} id={styles["gH"]}>H</div>
                <div className={styles["garage"]} style={{ top: '500px', left: '200px' }} id={styles["gI"]}>I</div>
                <div className={styles["garage"]} style={{ top: '500px', left: '250px' }} id={styles["gJ"]}>J</div>
                <div className={styles["garage"]} style={{ top: '550px', left: '50px' }} id={styles["gK"]}>K</div>
                <div className={styles["garage"]} style={{ top: '550px', left: '100px' }} id={styles["gL"]}>L</div>
                <div className={styles["garage"]} style={{ top: '550px', left: '150px' }} id={styles["gM"]}>M</div>
            </div>
        

            <div id={styles["sidebar"]} className={styles["hidden"]}>
            <h2>Types of Log Templates</h2>

            {/* <!-- 01. Daily Maintenance Logs --> */}
            <div className={styles["template-section"]} onClick={()=> ""}>
            {/* <div class="template-section" onClick={()=> "toggleForm('form1')"}> */}
                01. Daily Maintenance Logs
            </div>
            <div className={styles["template-form"]} id={styles["form1"]}>
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
            <div className={styles["template-section"]} onClick={()=> ""}>
            {/* <div class="template-section" onClick={()=> "toggleForm('form2')"}> */}
                02. Preventive Maintenance Logs
            </div>
            <div className={styles["template-form"]} id={styles["form2"]}>
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
            <div className={styles["template-section"]} onClick={()=> ""}>
            {/* <div class="template-section" onClick={()=> "toggleForm('form3')"}> */}
                03. Equipment Maintenance Logs
            </div>
            <div className={styles["template-form"]} id={styles["form3"]}>
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
            <div className={styles["template-section"]} onClick={()=> ""}>
            {/* <div class="template-section" onClick={()=> "toggleForm('form4')"}> */}
                04. Corrective Maintenance Logs
            </div>
            <div className={styles["template-form"]} id={styles["form4"]}>
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
            <div className={styles["template-section"]} onClick={()=> ""}>
            {/* <div class="template-section" onClick={()=> "toggleForm('form5')"}> */}
                05. Facility Maintenance Logs
            </div>
            <div className={styles["template-form"]} id={styles["form5"]}>
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
            <div className={styles["template-section"]} onClick={()=> ""}>
            {/* <div class="template-section" onClick={()=> "toggleForm('form6')"}> */}
                06. Machine Maintenance Logs
            </div>
            <div className={styles["template-form"]} id={styles["form6"]}>
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
            <div className={styles["template-section"]} onClick={()=> ""}>
            {/* <div class="template-section" onClick={()=> "toggleForm('form7')"}> */}
                07. Other Maintenance Logs
            </div>
            <div className={styles["template-form"]} id={styles["form7"]}>
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
        </>
    )
}