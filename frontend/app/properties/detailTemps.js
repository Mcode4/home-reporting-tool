export const mainTemp = ({
    unitNumber,
    inspectedBy,
    dateComplete,
    vendorLeasing,
    vendorRenovation,
    unitPowerOn,
    waterPowerOn,
    isComplete
}) => {
    
    return {
        unitNumber: {
            text: 'Unit Number',
            value: unitNumber // Number
        },
        inspectedBy: {
            text: 'Inspected By',
            value: inspectedBy // Date
        },
        dateComplete: {
            text: 'Date Complete',
            value: dateComplete // Date
        },
        vendorLeasing: {
            text: 'Vendor (Leasing) On',
            value: vendorLeasing // Boolean
        },
        vendorRenovation: {
            text: 'Vendor (Renovation) On',
            value: vendorRenovation // Boolean
        },
        unitPowerOn: {
            text: 'Unit Power On',
            value: unitPowerOn // Boolean
        },
        waterPowerOn: {
            text: 'Water Power On',
            value: waterPowerOn // Boolean
        },
        isComplete: {
            text: this.value ? "Completed" : "Complete",
            value: isComplete // Boolean
        },
    }
}

// Radio1 = ["Okay", "Repair", "Replace"]

export const exteriorTemp = ({
    changeFrontLocks,
    cleanFrontDoor,
    paintFrontDoor,
    frontDoorLight,
    doorNumber,
    kickPlate,
    cleanPatio,
    rails,
    patioDoorLock

}) => {

    return {
        changeFrontLocks: {
            text: 'Change locks - front door',
            value: changeFrontLocks // Radio1
        },
        cleanFrontDoor: {
            text: 'Clean front door area',
            value: cleanFrontDoor // Radio1
        },
        paintFrontDoor: {
            text: 'Paint front door',
            value: paintFrontDoor // Radio1
        },
        frontDoorLight: {
            text: 'Front door light bulb/fixture',
            value: frontDoorLight // Radio1
        },
        doorNumber: {
            text: 'Door number installed',
            value: doorNumber // Radio1
        },
        kickPlate: {
            text: 'Kick plate (if needed)',
            value: kickPlate // Radio1
        },
        cleanPatio: {
            text: 'Clean patio',
            value: cleanPatio // Radio1
        },
        rails: {
            text: 'Paint/clean rails (if needed)',
            value: rails // Radio1
        },
        patioDoorLock: {
            text: 'Change patio door lock',
            value: patioDoorLock // Radio1
        },
    }
}

export const livingRoomTemp = ({}) => {}

export const bedroomTemp = ({}) => {}

export const bathTemp = ({}) => {}

export const diningRoomTemp = ({}) => {}

export const kitchenTemp = ({}) => {}

export const laundryRoomTemp = ({}) => {}

export const patioTemp = ({}) => {}

export const smokeDetectorTemp = ({}) => {}