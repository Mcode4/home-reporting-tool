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
            value: changeFrontLocks
        },
        cleanFrontDoor: {
            text: 'Clean front door area',
            value: cleanFrontDoor
        },
        paintFrontDoor: {
            text: 'Paint front door',
            value: paintFrontDoor
        },
        frontDoorLight: {
            text: 'Front door light bulb/fixture',
            value: frontDoorLight
        },
        doorNumber: {
            text: 'Door number installed',
            value: doorNumber
        },
        kickPlate: {
            text: 'Kick plate (if needed)',
            value: kickPlate
        },
        cleanPatio: {
            text: 'Clean patio',
            value: cleanPatio
        },
        rails: {
            text: 'Paint/clean rails (if needed)',
            value: rails
        },
        patioDoorLock: {
            text: 'Change patio door lock',
            value: patioDoorLock
        },
    }
}

export const livingRoomTemp = ({
    switchCovers,
    windowsBroke,
    windowsLock,
    windowsDontOpen,
    windowsScreenMissing,
    cleanACVents,
    ceilingFan,
    banister,
    baseboardsCrack,
    blindsBroke,
    hallwayLight,
    floorsClean,
    paint,
    hallCloset
}) => {
    
    return {
        switchCovers: {
            text: 'Switch covers (painted or damaged)',
            value: switchCovers
        },
        windowsBroke: {
            text: 'Windows - broken',
            value: windowsBroke
        },
        windowsLock: {
            text: 'Windows - locks',
            value: windowsLock
        },
        windowsDontOpen: {
            text: "Windows - don't open",
            value: windowsDontOpen
        },
        windowsScreenMissing: {
            text: 'Windows - screens missing',
            value: windowsScreenMissing
        },
        cleanACVents: {
            text: 'Clean A/C vents and return',
            value: cleanACVents
        },
        ceilingFan: {
            text: 'Ceiling fan - working/clean/light bulbs',
            value: ceilingFan
        },
        banister: {
            text: 'Banister - secure/paint or cleaning needed',
            value: banister
        },
        baseboardsCrack: {
            text: 'Baseboards cracked',
            value: baseboardsCrack
        },
        blindsBroke: {
            text: 'Blinds broken',
            value: blindsBroke
        },
        hallwayLight: {
            text: 'Hallway light - fixture and bulbs',
            value: hallwayLight
        },
        floorsClean: {
            text: 'Floors - carpet/vinyl need clean or replaced',
            value: floorsClean
        },
        paint: {
            text: 'Paint - touch or full',
            value: paint
        },
        hallCloset: {
            text: 'Hall closet - shelf and door stopper',
            value: hallCloset
        },
    }
}

export const bedroomTemp = ({
    doorknobLock,
    doorDamage,
    doorStopper,
    closetDoorHinge,
    closetDoorStopper,
    closetShelves,
    switchCovers,
    cleanACVents,
    lightbulbs,
    ceilingFan,
    windowsBroke,
    windowsLock,
    windowsDontOpen,
    windowsScreenMissing,
    baseboardsCrack,
    blindsBroke,
    flooringCondition,
    closetFlooring
}) => {

    return {
        doorknobLock: {
            text: 'Doorknob locks working',
            value: doorknobLock
        },
        doorDamage: {
            text: 'Door - open/close damages',
            value: doorDamage
        },
        doorStopper: {
            text: 'Door - door stopper',
            value: doorStopper
        },
        closetDoorHinge: {
            text: 'Closet door - on hinge/track',
            value: closetDoorHinge
        },
        closetDoorStopper: {
            text: 'Closet door - door stopper',
            value: closetDoorStopper
        },
        closetShelves: {
            text: 'Closet shelves - secure',
            value: closetShelves
        },
        switchCovers: {
            text: 'Switch covers - painted/damaged',
            value: switchCovers
        },
        cleanACVents: {
            text: 'Clean A/C vents',
            value: cleanACVents
        },
        lightbulbs: {
            text: 'Lightbulbs - light fixture',
            value: lightbulbs
        },
        ceilingFan: {
            text: 'Ceiling fan - working',
            value: ceilingFan
        },
        windowsBroke: {
            text: 'Windows - broken',
            value: windowsBroke
        },
        windowsLock: {
            text: 'Windows - locks',
            value: windowsLock
        },
        windowsDontOpen: {
            text: "Windows - don't open",
            value: windowsDontOpen
        },
        windowsScreenMissing: {
            text: 'Windows - screens missing',
            value: windowsScreenMissing
        },
        baseboardsCrack: {
            text: 'Baseboard - cracked',
            value: baseboardsCrack
        },
        blindsBroke: {
            text: 'Blinds - broken',
            value: blindsBroke
        },
        flooringCondition: {
            text: 'Flooring - carpet/vinyl condition',
            value: flooringCondition
        },
        closetFlooring: {
            text: 'Closet flooring',
            value: closetFlooring
        },
    }
}

export const bathTemp = ({
    flooringPresentable,
        counterTopResurface,
        counterTopCaulk,
        mirrorCracked,
        faucetDrip,
        stopperOld,
        medicineCabinetDamaged,
        medicineCabinetFaded,
        lightbulbs,
        toiletSeat,
        toiletWorking,
        toiletCaulking,
        toiletLeaking,
        bathtubStopper,
        bathtubResurface,
        bathtubShowerDiverter,
        bathtubTowelBar,
        bathtubShowerHead,
        bathtubCurtainRob,
        bathroomFaucetWorking,
        bathroomFaucetHotCold,
        bathroomFaucetStopper,
        bathroomTowelRacks,
        bathroomToiletPaperHolder,
        bathroomDoorHingesKnobsStrikePlates,
        bathroomShelvingIntact,
        fartFan,
        bathroomBaseboardsDamage,
}) => {

    return {
        flooringPresentable: {
            text: 'Flooring - vinyl/tile presentable',
            value: flooringPresentable
        },
        counterTopResurface: {
            text: 'Countertop - resurface',
            value: counterTopResurface
        },
        counterTopCaulk: {
            text: 'Countertop caulk',
            value: counterTopCaulk
        },
        mirrorCracked: {
            text: 'Mirror - cracked/discolored',
            value: mirrorCracked
        },
        faucetDrip: {
            text: 'Faucet - dripping/leaking',
            value: faucetDrip
        },
        stopperOld: {
            text: 'Stopper - remove old system',
            value: stopperOld
        },
        medicineCabinetDamaged: {
            text: 'Medicine cabinet - clean/damaged',
            value: medicineCabinetDamaged
        },
        medicineCabinetFaded: {
            text: 'Medicine cabinet - mirror faded spots',
            value: medicineCabinetFaded
        },
        lightbulbs: {
            text: 'Lightbulbs - light fixture secure',
            value: lightbulbs
        },
        toiletSeat: {
            text: 'Toilet - seat',
            value: toiletSeat
        },
        toiletWorking: {
            text: 'Toilet - working with water',
            value: toiletWorking
        },
        toiletCaulking: {
            text: 'Toilet - bolts/caulking',
            value: toiletCaulking
        },
        toiletLeaking: {
            text: 'Toilet - running/leaking',
            value: toiletLeaking
        },
        bathtubStopper: {
            text: 'Bathtub - stopper',
            value: bathtubStopper
        },
        bathtubResurface: {
            text: 'Bathtub - resurfacing needed',
            value: bathtubResurface
        },
        bathtubShowerDiverter: {
            text: 'Bathtub - shower diverter working/no leaks',
            value: bathtubShowerDiverter
        },
        bathtubTowelBar: {
            text: 'Bathtub - shower towel bar',
            value: bathtubTowelBar
        },
        bathtubShowerHead: {
            text: 'Bathtub - shower head',
            value: bathtubShowerHead
        },
        bathtubCurtainRob: {
            text: 'Bathtub - shower curtain rod',
            value: bathtubCurtainRob
        },
        bathroomFaucetWorking: {
            text: 'Bathroom faucet - working no leaks',
            value: bathroomFaucetWorking
        },
        bathroomFaucetHotCold: {
            text: 'Bathroom faucet - hot/cold water',
            value: bathroomFaucetHotCold
        },
        bathroomFaucetStopper: {
            text: 'Bathroom faucet - stopper missing',
            value: bathroomFaucetStopper
        },
        bathroomTowelRacks: {
            text: 'Bathroom - towel racks',
            value: bathroomTowelRacks
        },
        bathroomToiletPaperHolder: {
            text: 'Bathroom - toilet paper holder',
            value: bathroomToiletPaperHolder
        },
        bathroomDoorHingesKnobsStrikePlates: {
            text: 'Bathroom - door/hinges/knobs/strike plates',
            value: bathroomDoorHingesKnobsStrikePlates
        },
        bathroomShelvingIntact: {
            text: 'Bathroom - shelving intact',
            value: bathroomShelvingIntact
        },
        fartFan: {
            text: 'Fart fan - working, clean',
            value: fartFan
        },
        bathroomBaseboardsDamage: {
            text: 'Bathroom - baseboards cracked/water damaged',
            value: bathroomBaseboardsDamage
        },
    }
}

export const diningRoomTemp = ({
    lightFixture,
    switchPlatesDamage,
    flooringCondition,
}) => {

    return {
        lightFixture: {
            text: "Light fixture - bulbs working/secure",
            value: lightFixture
        },
        switchPlatesDamage: {
            text: "Switch plates - painted/damaged",
            value: switchPlatesDamage
        },
        flooringCondition: {
            text: "Flooring - vinyl/carpet condition",
            value: flooringCondition
        },
    }
}

export const kitchenTemp = ({
    flooringDamage,
    counterTopResurface,
    counterTopCaulk,
    switchPlatesDamage,
    kitchenSinkFireExtinguisher,
    kitchenSinkStopper,
    kitchenSinkFaucetDrip,
    kitchenSinkFaucetSprayer,
    garbageDisposal,
    cabinetsInside,
    cabinetsDoorDrawers,
    cabinetDoorKnob,
    kitchenDrawersBroke,
    cabinetsShelvesKnobs,
    cabinetTop,
    stoveWorking,
    stoveDripPan,
    stoveKnobOven,
    stoveDoorBottomTray,
    microwaveWorking,
    microwaveFilterFireSuppression,
    microwaveLight,
    refrigeratorNoise,
    refrigeratorIceMaker,
    refrigeratorLightShelvesCracks,
    refrigeratorTrash,
    dishwasherCycle,
    kitchenVents,
}) => {

    return {
        flooringDamage: {
            text: 'Flooring - vinyl/tile damaged',
            value: flooringDamage
        },
        counterTopResurface: {
            text: 'Countertop - resurfacing needed',
            value: counterTopResurface
        },
        counterTopCaulk: {
            text: 'Countertop - caulking',
            value: counterTopCaulk
        },
        switchPlatesDamage: {
            text: 'Switch plates - painted/damaged',
            value: switchPlatesDamage
        },
        kitchenSinkFireExtinguisher: {
            text: 'Kitchen sink - fire extinguisher full/expired',
            value: kitchenSinkFireExtinguisher
        },
        kitchenSinkStopper: {
            text: 'Kitchen sink - stoppers',
            value: kitchenSinkStopper
        },
        kitchenSinkFaucetDrip: {
            text: 'Kitchen sink faucet - leaking/dripping',
            value: kitchenSinkFaucetDrip
        },
        kitchenSinkFaucetSprayer: {
            text: 'Kitchen sink - faucet sprayer/secure',
            value: kitchenSinkFaucetSprayer
        },
        garbageDisposal: {
            text: 'Garbage disposal - working/clean',
            value: garbageDisposal
        },
        cabinetsInside: {
            text: 'Cabinets - inside clean',
            value: cabinetsInside
        },
        cabinetsDoorDrawers: {
            text: 'Cabinets - doors/drawers secure',
            value: cabinetsDoorDrawers
        },
        cabinetDoorKnob: {
            text: 'Cabinets - doors/knobs',
            value: cabinetDoorKnob
        },
        kitchenDrawersBroke: {
            text: 'Kitchen drawers - on track/broken',
            value: kitchenDrawersBroke
        },
        cabinetsShelvesKnobs: {
            text: 'Cabinets - shelves/knobs secure/missing',
            value: cabinetsShelvesKnobs
        },
        cabinetTop: {
            text: 'Cabinet tops - clean',
            value: cabinetTop
        },
        stoveWorking: {
            text: 'Stove - working/clean',
            value: stoveWorking
        },
        stoveDripPan: {
            text: 'Stove - drip pans/eyes missing',
            value: stoveDripPan
        },
        stoveKnobOven: {
            text: 'Stove - knobs/oven light',
            value: stoveKnobOven
        },
        stoveDoorBottomTray: {
            text: 'Stove - door/bottom tray/on track',
            value: stoveDoorBottomTray
        },
        microwaveWorking: {
            text: 'Microwave - working/clean',
            value: microwaveWorking
        },
        microwaveFilterFireSuppression: {
            text: 'Microwave - filter/fire suppression',
            value: microwaveFilterFireSuppression
        },
        microwaveLight: {
            text: 'Microwave - light',
            value: microwaveLight
        },
        refrigeratorNoise: {
            text: 'Refrigerator - loud noise',
            value: refrigeratorNoise
        },
        refrigeratorIceMaker: {
            text: 'Refrigerator - ice maker working',
            value: refrigeratorNoise
        },
        refrigeratorLightShelvesCracks: {
            text: 'Refrigerator - lightbulbs/shelves/cracks',
            value: refrigeratorLightShelvesCracks
        },
        refrigeratorTrash: {
            text: 'Refrigerator - trash out',
            value: refrigeratorTrash
        },
        dishwasherCycle: {
            text: 'Dishwasher - run cycle/secure',
            value: dishwasherCycle
        },
        kitchenVents: {
            text: 'Kitchen vents - clean',
            value: kitchenVents
        },
    }
}

export const laundryRoomTemp = ({
    flooringDamage,
    washerCycleLeaksNoise,
    dryerCycleLeaksNoise,
    shelves,
    circuitBreakerBox,
    laundryMachine,
    lightFixture,
    baseboardsCrack,
}) => {

    return {
        flooringDamage: {
            text: 'Flooring - vinyl/carpet damaged',
            value: flooringDamage
        },
        washerCycleLeaksNoise: {
            text: 'Washer - run cycle/leaks/loud noises',
            value: washerCycleLeaksNoise
        },
        dryerCycleLeaksNoise: {
            text: 'Dryer - run cycle/leaks/loud noises',
            value: dryerCycleLeaksNoise
        },
        shelves: {
            text: 'Shelves - secure',
            value: shelves
        },
        circuitBreakerBox: {
            text: 'Circuit breaker box - secure',
            value: circuitBreakerBox
        },
        laundryMachine: {
            text: 'Laundry machine - area clean',
            value: laundryMachine
        },
        lightFixture: {
            text: 'Light fixture - lightbulbs',
            value: lightFixture
        },
        baseboardsCrack: {
            text: 'Baseboards - cracked/water damaged',
            value: baseboardsCrack
        },
    }
}

export const patioTemp = ({
    flooringDamage,
    railing,
    lightFixture,
    pestControl,
    hotWaterHeater,
    heatACUnitWorking,
    heatACUnitThermostat,
    HVACRoomDamage,
    HVACRoomDoorHingeLock,
}) => {

    return {
        flooringDamage: {
            text: 'Flooring - cracked/damaged',
            value: flooringDamage
        },
        railing: {
            text: 'Railings - secure/paint or cleaning needed',
            value: railing
        },
        lightFixture: {
            text: 'Light fixture - bulbs working/secure',
            value: lightFixture
        },
        pestControl: {
            text: 'Pest control - wasp/ants/spiders',
            value: pestControl
        },
        hotWaterHeater: {
            text: 'Hot water heater - leaks/rust',
            value: hotWaterHeater
        },
        heatACUnitWorking: {
            text: 'Heat & AC unit - working properly',
            value: heatACUnitWorking
        },
        heatACUnitThermostat: {
            text: 'Heat & AC unit - filter/thermostat powered',
            value: heatACUnitThermostat
        },
        HVACRoomDamage: {
            text: 'HVAC room - no dust/mildew/water damage',
            value: HVACRoomDamage
        },
        HVACRoomDoorHingeLock: {
            text: 'HVAC room - doors/hinges/locks',
            value: HVACRoomDoorHingeLock
        },
    }
}

export const smokeDetectorTemp = ({
    detectorBattery,
    detectorReplaced,
}) => {

    return {
        detectorBattery: {
            text: 'Detectors - batteries changed',
            value: detectorBattery
        },
        detectorReplaced: {
            text: 'Detectors - replaced',
            value: detectorReplaced
        },
    }
}