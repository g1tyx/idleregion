//© 2023 - 2023 www.idleregion.com - All Rights Reserved.

/* PLACETYPES
* all -> any tile
* land -> any land tile
* water -> any water tile
* shore -> shore only
* shorewater -> sand and lower
* shoreland -> shore and higher
* grass -> any grass tile
*/

//#region Buildings
// TIER 1
//#region Building Effect
const EFFECT_FORAGER = new BuildingEffect(
	[{x: 0, y: 0}],
	0,
	0
);

const EFFECT_CULTIVATOR = new BuildingEffect(
	[{x: 0, y: -2}, {x: 0, y: 2}],
	10,
	0
);

const EFFECT_CAVEDEN = new BuildingEffect(
	[{x: 0, y: 0}],
	0,
	5
);

const EFFECT_HUNTER = new BuildingEffect(
	[{x: -2, y: -2}, {x: -2, y: 2}, {x: 2, y: -2}, {x: 2, y: 2}],
	15,
	0
);

const EFFECT_FISHINGHUT = new BuildingEffect(
	[{x: -2, y: -2}, {x: -2, y: 0}, {x: -2, y: 2}, {x: 0, y: -2}, {x: 0, y: 2}, {x: 2, y: -2}, {x: 2, y: 0}, {x: 2, y: 2}],
	25,
	0
);

const EFFECT_STOREHOUSE = new BuildingEffect(
	[{x: -1, y: -1}, {x: -1, y: 0}, {x: -1, y: 1}, {x: 0, y: -1}, {x: 0, y: 1}, {x: 1, y: -1}, {x: 1, y: 0}, {x: 1, y: 1}],
	20,
	0
);

const EFFECT_SETTLEMENT = new BuildingEffect(
	[{x: -2, y: -1}, {x: -2, y: 1}, {x: -1, y: -2}, {x: -1, y: 2}, {x: 1, y: -2}, {x: 1, y: 2}, {x: 2, y: -1}, {x: 2, y: 1}],
	15,
	30
);

const EFFECT_FIREPIT = new BuildingEffect(
	[{x: -2, y: 0}, {x: -1, y: -1}, {x: -1, y: 0}, {x: -1, y: 1}, {x: 0, y: -2}, {x: 0, y: -1}, {x: 0, y: 1}, {x: 0, y: 2}, {x: 1, y: -1}, {x: 1, y: 0}, {x: 1, y: 1}, {x: 2, y: 0}],
	25,
	0
);
//#endregion
//#region Building SFX
const FX_FORAGER = new BuildingFX(
	false, null, null
);

const FX_CULTIVATOR = new BuildingFX(
	false, null, null
);

const FX_CAVEDEN = new BuildingFX(
	true, 3, [52, 100, 79]
);

const FX_HUNTER = new BuildingFX(
	false, null, null
);

const FX_FISHINGHUT = new BuildingFX(
	true, 1, [52, 100, 79]
);

const FX_STOREHOUSE = new BuildingFX(
	false, null, null
);

const FX_SETTLEMENT = new BuildingFX(
	true, 4, [52, 100, 79]
);

const FX_FIREPIT = new BuildingFX(
	true, 6, [52, 100, 79]
);
//#endregion
//#region Building Resource
const RESOURCE_FORAGER = new BuildingResource(
	0.25, 0, 0, 0.25
);

const RESOURCE_CULTIVATOR = new BuildingResource(
	0.33, 0, 0, 0.25
);

const RESOURCE_CAVEDEN = new BuildingResource(
	0, 4, 0, 0
);

const RESOURCE_HUNTER = new BuildingResource(
	1.5, 0, 0, -0.5
);

const RESOURCE_FISHINGHUT = new BuildingResource(
	2, 0, 0, -0.25
);

const RESOURCE_STOREHOUSE = new BuildingResource(
	0, 0, 0, -0.25
);

const RESOURCE_SETTLEMENT = new BuildingResource(
	0, 9, 0, 0.5
);

const RESOURCE_FIREPIT = new BuildingResource(
	0, 0, 0, -0.5
);
//#endregion
//#region Building Needs
const NEEDS_FORAGER = new BuildingNeeds(
	0, 1, 0, 0
);

const NEEDS_CULTIVATOR = new BuildingNeeds(
	0, 2, 0, 0
);

const NEEDS_CAVEDEN = new BuildingNeeds(
	0, 0, 0, 0
);

const NEEDS_HUNTER = new BuildingNeeds(
	0, 3, 0, 0
);

const NEEDS_FISHINGHUT = new BuildingNeeds(
	0, 3, 0, 0
);

const NEEDS_STOREHOUSE = new BuildingNeeds(
	0, 4, 0, 0
);

const NEEDS_SETTLEMENT = new BuildingNeeds(
	0, 0, 0, 0
);

const NEEDS_FIREPIT = new BuildingNeeds(
	0, 2, 0, 0
);
//#endregion

// TIER 2
//#region Building Effect
const EFFECT_RANCHER = new BuildingEffect(
	[{x: 0, y: 0}],
	0,
	0
);

const EFFECT_STONEMASON = new BuildingEffect(
	[{x: -1, y: -1}, {x: -1, y: 0}, {x: -1, y: 1}, {x: 0, y: -1}, {x: 0, y: 1}, {x: 1, y: -1}, {x: 1, y: 0}, {x: 1, y: 1}],
	25,
	0
);

const EFFECT_ROUNDHOUSE = new BuildingEffect(
	[{x: 0, y: 0}],
	0,
	850
);

const EFFECT_FARMLAND = new BuildingEffect(
	[{x: -1, y: -1}, {x: -1, y: 1}, {x: 0, y: -2}, {x: 0, y: -1}, {x: 0, y: 1}, {x: 0, y: 2}, {x: 1, y: -1}, {x: 1, y: 1}],
	35,
	0
);

const EFFECT_TRAWLER = new BuildingEffect(
	[{x: -2, y: -1}, {x: -2, y: 1}, {x: -1, y: -2}, {x: -1, y: 2}, {x: 1, y: -2}, {x: 1, y: 2}, {x: 2, y: -1}, {x: 2, y: 1}],
	45,
	0
);

const EFFECT_TIMBERFELLER = new BuildingEffect(
	[{x: 0, y: 0}],
	0,
	0
);

const EFFECT_BAZAAR = new BuildingEffect(
	[{x: -3, y: 0}, {x: -2, y: 0}, {x: 0, y: -3}, {x: 0, y: -2}, {x: 0, y: 2}, {x: 0, y: 3}, {x: 2, y: 0}, {x: 3, y: 0}],
	25,
	0
);

const EFFECT_LOGCABIN = new BuildingEffect(
	[{x: -3, y: -2}, {x: -3, y: 2}, {x: -2, y: -3}, {x: -2, y: -2}, {x: -2, y: 2}, {x: -2, y: 3}, {x: -1, y: -1}, {x: -1, y: 1}, {x: 1, y: -1}, {x: 1, y: 1}, {x: 2, y: -3}, {x: 2, y: -2}, {x: 2, y: 2}, {x: 2, y: 3}, {x: 3, y: -2}, {x: 3, y: 2}],
	30,
	3200
);
//#endregion
//#region Building SFX
const FX_RANCHER = new BuildingFX(
	false, null, null
);

const FX_STONEMASON = new BuildingFX(
	false, null, null
);

const FX_ROUNDHOUSE = new BuildingFX(
	true, 3, [52, 100, 79]
);

const FX_FARMLAND = new BuildingFX(
	false, null, null
);

const FX_TRAWLER = new BuildingFX(
	true, 1, [52, 100, 79]
);

const FX_TIMBERFELLER = new BuildingFX(
	false, null, null
);

const FX_BAZAAR = new BuildingFX(
	true, 3, [52, 100, 79]
);

const FX_LOGCABIN = new BuildingFX(
	true, 5, [52, 100, 79]
);
//#endregion
//#region Building Resource
const RESOURCE_RANCHER = new BuildingResource(
	3, 0, 0, -0.5
);

const RESOURCE_STONEMASON = new BuildingResource(
	0, 0, 0, -0.25
);

const RESOURCE_ROUNDHOUSE = new BuildingResource(
	0, 14, 0, 0.5
);

const RESOURCE_FARMLAND = new BuildingResource(
	2.5, 0, 0, 0.5
);

const RESOURCE_TRAWLER = new BuildingResource(
	4, 0, 0, -0.25
);

const RESOURCE_TIMBERFELLER = new BuildingResource(
	0, 0, 0, 0.25
);

const RESOURCE_BAZAAR = new BuildingResource(
	5, 0, 0, 0
);

const RESOURCE_LOGCABIN = new BuildingResource(
	0, 18, 0, 0.5
);
//#endregion
//#region Building Needs
const NEEDS_RANCHER = new BuildingNeeds(
	0, 4, 0, 0
);

const NEEDS_STONEMASON = new BuildingNeeds(
	0, 3, 0, 0
);

const NEEDS_ROUNDHOUSE = new BuildingNeeds(
	0, 0, 0, 0
);

const NEEDS_FARMLAND = new BuildingNeeds(
	0, 4, 0, 0
);

const NEEDS_TRAWLER = new BuildingNeeds(
	0, 3, 0, 0
);

const NEEDS_TIMBERFELLER = new BuildingNeeds(
	0, 5, 0, 0
);

const NEEDS_BAZAAR = new BuildingNeeds(
	0, 6, 0, 0
);

const NEEDS_LOGCABIN = new BuildingNeeds(
	0, 0, 0, 0
);
//#endregion

// TIER 3
//#region Building Effect
const EFFECT_WHARF = new BuildingEffect(
	[{x: -4, y: 0}, {x: -3, y: -1}, {x: -3, y: 0}, {x: -3, y: 1}, {x: -1, y: -3}, {x: -1, y: 3}, {x: 0, y: -4}, {x: 0, y: -3}, {x: 0, y: 3}, {x: 0, y: 4}, {x: 1, y: -3}, {x: 1, y: 3}, {x: 3, y: -1}, {x: 3, y: 0}, {x: 3, y: 1}, {x: 4, y: 0}],
	60,
	0
);

const EFFECT_CERAMIST = new BuildingEffect(
    [{x: -2, y: -2}, {x: -2, y: -1}, {x: -2, y: 0}, {x: -2, y: 1}, {x: -2, y: 2}, {x: -1, y: -2}, {x: -1, y: 2}, {x: 0, y: -2}, {x: 0, y: 2}, {x: 1, y: -2}, {x: 1, y: 2}, {x: 2, y: -2}, {x: 2, y: -1}, {x: 2, y: 0}, {x: 2, y: 1}, {x: 2, y: 2}],
	35,
	0
);

const EFFECT_HUT = new BuildingEffect(
	[{x: -3, y: -3}, {x: -3, y: -2}, {x: -3, y: 0}, {x: -3, y: 2}, {x: -3, y: 3}, {x: -2, y: -3}, {x: -2, y: -2}, {x: -2, y: 0}, {x: -2, y: 2}, {x: -2, y: 3}, {x: 0, y: -3}, {x: 0, y: -2}, {x: 0, y: 2}, {x: 0, y: 3}, {x: 2, y: -3}, {x: 2, y: -2}, {x: 2, y: 0}, {x: 2, y: 2}, {x: 2, y: 3}, {x: 3, y: -3}, {x: 3, y: -2}, {x: 3, y: 0}, {x: 3, y: 2}, {x: 3, y: 3}],
	40,
	32500
);

const EFFECT_CHARCOALER = new BuildingEffect(
	[{x: -2, y: -2}, {x: -2, y: -1}, {x: -2, y: 1}, {x: -2, y: 2}, {x: -1, y: -1}, {x: -1, y: 1}, {x: 1, y: -1}, {x: 1, y: 1}, {x: 2, y: -2}, {x: 2, y: -1}, {x: 2, y: 1}, {x: 2, y: 2}],
	45,
	0
);

const EFFECT_MINER = new BuildingEffect(
	[{x: 0, y: 0}],
	0,
	0
);

const EFFECT_BLACKSMITH = new BuildingEffect(
	[{x: -3, y: 0}, {x: -2, y: 0}, {x: -1, y: -2}, {x: -1, y: -1}, {x: -1, y: 1}, {x: -1, y: 2}, {x: 1, y: -2}, {x: 1, y: -1}, {x: 1, y: 1}, {x: 1, y: 2}, {x: 2, y: 0}, {x: 3, y: 0}],
	50,
	0
);

const EFFECT_STONEWORKS = new BuildingEffect(
	[{x: 0, y: 0}],
	0,
	0
);

const EFFECT_FORTRESS = new BuildingEffect(
	[{x: -4, y: -1}, {x: -4, y: 0}, {x: -4, y: 1}, {x: -3, y: -2}, {x: -3, y: -1}, {x: -3, y: 0}, {x: -3, y: 1}, {x: -3, y: 2}, {x: -2, y: -3}, {x: -2, y: -2}, {x: -2, y: 2}, {x: -2, y: 3}, {x: -1, y: -4}, {x: -1, y: -3}, {x: -1, y: 3}, {x: -1, y: 4}, {x: 0, y: -4}, {x: 0, y: -3}, {x: 0, y: 3}, {x: 0, y: 4}, {x: 1, y: -4}, {x: 1, y: -3}, {x: 1, y: 3}, {x: 1, y: 4}, {x: 2, y: -3}, {x: 2, y: -2}, {x: 2, y: 2}, {x: 2, y: 3}, {x: 3, y: -2}, {x: 3, y: -1}, {x: 3, y: 0}, {x: 3, y: 1}, {x: 3, y: 2}, {x: 4, y: -1}, {x: 4, y: 0}, {x: 4, y: 1}],
	40,
	74250
);
//#endregion
//#region Building SFX
const FX_WHARF = new BuildingFX(
	true, 3, [52, 100, 79]
);

const FX_CERAMIST = new BuildingFX(
	false, null, null
);

const FX_HUT = new BuildingFX(
	true, 4, [52, 100, 79]
);

const FX_CHARCOALER = new BuildingFX(
	true, 5, [52, 100, 79]
);

const FX_MINER = new BuildingFX(
	false, null, null
);

const FX_BLACKSMITH = new BuildingFX(
	true, 4, [52, 100, 79]
);

const FX_STONEWORKS = new BuildingFX(
	false, null, null
);

const FX_FORTRESS = new BuildingFX(
	true, 5, [52, 100, 79]
);
//#endregion
//#region Building Resource
const RESOURCE_WHARF = new BuildingResource(
	6, 0, 0, -0.25
);

const RESOURCE_CERAMIST = new BuildingResource(
	0, 0, 0, 0
);

const RESOURCE_HUT = new BuildingResource(
	0, 26, 0, 0.5
);

const RESOURCE_CHARCOALER = new BuildingResource(
	0, 0, 0, -0.5
);

const RESOURCE_MINER = new BuildingResource(
	0, 0, 0, -0.25
);

const RESOURCE_BLACKSMITH = new BuildingResource(
	0, 0, 0, -0.25
);

const RESOURCE_STONEWORKS = new BuildingResource(
	0, 0, 0, -0.25
);

const RESOURCE_FORTRESS = new BuildingResource(
	0, 34, 0, 1.5
);
//#endregion
//#region Building Needs
const NEEDS_WHARF = new BuildingNeeds(
	0, 6, 0, 0
);

const NEEDS_CERAMIST = new BuildingNeeds(
	0, 4, 0, 0
);

const NEEDS_HUT = new BuildingNeeds(
	0, 0, 0, 0
);

const NEEDS_CHARCOALER = new BuildingNeeds(
	0, 5, 0, 0
);

const NEEDS_MINER = new BuildingNeeds(
	0, 7, 0, 0
);

const NEEDS_BLACKSMITH = new BuildingNeeds(
	0, 5, 0, 0
);

const NEEDS_STONEWORKS = new BuildingNeeds(
	0, 8, 0, 0
);

const NEEDS_FORTRESS = new BuildingNeeds(
	0, 0, 0, 0
);
//#endregion

// TIER 4
//#region Building Effect
const EFFECT_COLOSSEUM = new BuildingEffect(
	[{x: -3, y: -1}, {x: -3, y: 0}, {x: -3, y: 1}, {x: -2, y: -2}, {x: -2, y: -1}, {x: -2, y: 0}, {x: -2, y: 1}, {x: -2, y: 2}, {x: -1, y: -3}, {x: -1, y: -2}, {x: -1, y: -1}, {x: -1, y: 0}, {x: -1, y: 1}, {x: -1, y: 2}, {x: -1, y: 3}, {x: 0, y: -3}, {x: 0, y: -2}, {x: 0, y: -1}, {x: 0, y: 1}, {x: 0, y: 2}, {x: 0, y: 3}, {x: 1, y: -3}, {x: 1, y: -2}, {x: 1, y: -1}, {x: 1, y: 0}, {x: 1, y: 1}, {x: 1, y: 2}, {x: 1, y: 3}, {x: 2, y: -2}, {x: 2, y: -1}, {x: 2, y: 0}, {x: 2, y: 1}, {x: 2, y: 2}, {x: 3, y: -1}, {x: 3, y: 0}, {x: 3, y: 1}],
	50,
	0
);

const EFFECT_BREWERY = new BuildingEffect(
	[{x: 0, y: 0}],
	0,
	0
);

const EFFECT_GALLEON = new BuildingEffect(
	[{x: -4, y: -1}, {x: -4, y: 1}, {x: -3, y: -3}, {x: -3, y: 3}, {x: -1, y: -4}, {x: -1, y: 4}, {x: 1, y: -4}, {x: 1, y: 4}, {x: 3, y: -3}, {x: 3, y: 3}, {x: 4, y: -1}, {x: 4, y: 1}],
	75,
	0
);

const EFFECT_TOWNHOUSES = new BuildingEffect(
	[{x: -3, y: 0}, {x: -2, y: 0}, {x: -1, y: 0}, {x: 1, y: 0}, {x: 2, y: 0}, {x: 3, y: 0}],
	55,
	1380000
);

const EFFECT_WINDMILL = new BuildingEffect(
    [{x: -3, y: 1}, {x: -2, y: 1}, {x: -1, y: -3}, {x: -1, y: -2}, {x: -1, y: 0}, {x: 0, y: -1}, {x: 0, y: 1}, {x: 1, y: 0}, {x: 1, y: 2}, {x: 1, y: 3}, {x: 2, y: -1}, {x: 3, y: -1}],
	65,
	0
);

const EFFECT_SAWMILL = new BuildingEffect(
	[{x: 0, y: 0}],
	0,
	0
);

const EFFECT_COURTHOUSE = new BuildingEffect(
	[{x: -4, y: -1}, {x: -4, y: 0}, {x: -4, y: 1}, {x: -3, y: -1}, {x: -3, y: 0}, {x: -3, y: 1}, {x: -2, y: 0}, {x: -1, y: -4}, {x: -1, y: -3}, {x: -1, y: 3}, {x: -1, y: 4}, {x: 0, y: -4}, {x: 0, y: -3}, {x: 0, y: -2}, {x: 0, y: 2}, {x: 0, y: 3}, {x: 0, y: 4}, {x: 1, y: -4}, {x: 1, y: -3}, {x: 1, y: 3}, {x: 1, y: 4}, {x: 2, y: 0}, {x: 3, y: -1}, {x: 3, y: 0}, {x: 3, y: 1}, {x: 4, y: -1}, {x: 4, y: 0}, {x: 4, y: 1}],
	80,
	0
);

const EFFECT_MANOR = new BuildingEffect(
	[{x: 0, y: 0}],
	0,
	11110000
);
//#endregion
//#region Building SFX
const FX_COLOSSEUM = new BuildingFX(
	true, 6, [52, 100, 79]
);

const FX_BREWERY = new BuildingFX(
	false, null, null
);

const FX_GALLEON = new BuildingFX(
	true, 2, [52, 100, 79]
);

const FX_TOWNHOUSES = new BuildingFX(
	true, 5, [52, 100, 79]
);

const FX_WINDMILL = new BuildingFX(
	false, null, null
);

const FX_SAWMILL = new BuildingFX(
	false, null, null
);

const FX_COURTHOUSE = new BuildingFX(
	true, 4, [52, 100, 79]
);

const FX_MANOR = new BuildingFX(
	true, 3, [52, 100, 79]
);
//#endregion
//#region Building Resource
const RESOURCE_COLOSSEUM = new BuildingResource(
	0, 0, 0, 0.75
);

const RESOURCE_BREWERY = new BuildingResource(
	8, 0, 0, -0.25
);

const RESOURCE_GALLEON = new BuildingResource(
	10, 0, 0, 0
);

const RESOURCE_TOWNHOUSES = new BuildingResource(
	0, 44, 0, 1.25
);

const RESOURCE_WINDMILL = new BuildingResource(
	12, 0, 5, 0.5
);

const RESOURCE_SAWMILL = new BuildingResource(
	0, 0, 0, -0.25
);

const RESOURCE_COURTHOUSE = new BuildingResource(
	0, 0, 0, 0.5
);

const RESOURCE_MANOR = new BuildingResource(
	0, 60, 0, 1.5
);
//#endregion
//#region Building Needs
const NEEDS_COLOSSEUM = new BuildingNeeds(
	0, 14, 0, 0
);

const NEEDS_BREWERY = new BuildingNeeds(
	0, 10, 0, 0
);

const NEEDS_GALLEON = new BuildingNeeds(
	0, 12, 0, 0
);

const NEEDS_TOWNHOUSES = new BuildingNeeds(
	0, 0, 0, 0
);

const NEEDS_WINDMILL = new BuildingNeeds(
	0, 6, 0, 0
);

const NEEDS_SAWMILL = new BuildingNeeds(
	0, 11, 2.5, 0
);

const NEEDS_COURTHOUSE = new BuildingNeeds(
	0, 12, 3, 0
);

const NEEDS_MANOR = new BuildingNeeds(
	0, 0, 2, 0
);
//#endregion

// TIER 5
//#region Building Effect
const EFFECT_POWERPLANT = new BuildingEffect(
	[{x: -4, y: -1}, {x: -4, y: 1}, {x: -3, y: -1}, {x: -3, y: 1}, {x: -2, y: -2}, {x: -2, y: -1}, {x: -2, y: 0}, {x: -2, y: 1}, {x: -2, y: 2}, {x: -1, y: -4}, {x: -1, y: -3}, {x: -1, y: -2}, {x: -1, y: -1}, {x: -1, y: 1}, {x: -1, y: 2}, {x: -1, y: 3}, {x: -1, y: 4}, {x: 0, y: -2}, {x: 0, y: 2}, {x: 1, y: -4}, {x: 1, y: -3}, {x: 1, y: -2}, {x: 1, y: -1}, {x: 1, y: 1}, {x: 1, y: 2}, {x: 1, y: 3}, {x: 1, y: 4}, {x: 2, y: -2}, {x: 2, y: -1}, {x: 2, y: 0}, {x: 2, y: 1}, {x: 2, y: 2}, {x: 3, y: -1}, {x: 3, y: 1}, {x: 4, y: -1}, {x: 4, y: 1}],
	100,
	0
);

const EFFECT_LIGHTHOUSE = new BuildingEffect(
	[{x: -4, y: -4}, {x: -4, y: 0}, {x: -4, y: 4}, {x: -3, y: -3}, {x: -3, y: 0}, {x: -3, y: 3}, {x: -2, y: -2}, {x: -2, y: 0}, {x: -2, y: 2}, {x: -1, y: -1}, {x: -1, y: 0}, {x: -1, y: 1}, {x: 0, y: -4}, {x: 0, y: -3}, {x: 0, y: -2}, {x: 0, y: -1}, {x: 0, y: 1}, {x: 0, y: 2}, {x: 0, y: 3}, {x: 0, y: 4}, {x: 1, y: -1}, {x: 1, y: 0}, {x: 1, y: 1}, {x: 2, y: -2}, {x: 2, y: 0}, {x: 2, y: 2}, {x: 3, y: -3}, {x: 3, y: 0}, {x: 3, y: 3}, {x: 4, y: -4}, {x: 4, y: 0}, {x: 4, y: 4}],
	110,
	0
);

const EFFECT_CARGOSHIP = new BuildingEffect(
	[{x: -6, y: 0}, {x: -4, y: -4}, {x: -4, y: 4}, {x: -3, y: 0}, {x: -2, y: -2}, {x: -2, y: 2}, {x: 0, y: -6}, {x: 0, y: -3}, {x: 0, y: 3}, {x: 0, y: 6}, {x: 2, y: -2}, {x: 2, y: 2}, {x: 3, y: 0}, {x: 4, y: -4}, {x: 4, y: 4}, {x: 6, y: 0}],
	125,
	0
);

const EFFECT_WAREHOUSE = new BuildingEffect(
	[{x: -2, y: -1}, {x: -2, y: 0}, {x: -2, y: 1}, {x: -1, y: -2}, {x: -1, y: -1}, {x: -1, y: 0}, {x: -1, y: 1}, {x: -1, y: 2}, {x: 0, y: -2}, {x: 0, y: -1}, {x: 0, y: 1}, {x: 0, y: 2}, {x: 1, y: -2}, {x: 1, y: -1}, {x: 1, y: 0}, {x: 1, y: 1}, {x: 1, y: 2}, {x: 2, y: -1}, {x: 2, y: 0}, {x: 2, y: 1}],
	90,
	0
);

const EFFECT_APARTMENT = new BuildingEffect(
	[{x: 0, y: 0}],
	0,
	611000000
);

const EFFECT_HOSPITAL = new BuildingEffect(
	[{x: -4, y: -1}, {x: -4, y: 0}, {x: -4, y: 1}, {x: -3, y: -1}, {x: -3, y: 0}, {x: -3, y: 1}, {x: -2, y: -1}, {x: -2, y: 0}, {x: -2, y: 1}, {x: -1, y: -4}, {x: -1, y: -3}, {x: -1, y: -2}, {x: -1, y: -1}, {x: -1, y: 0}, {x: -1, y: 1}, {x: -1, y: 2}, {x: -1, y: 3}, {x: -1, y: 4}, {x: 0, y: -4}, {x: 0, y: -3}, {x: 0, y: -2}, {x: 0, y: -1}, {x: 0, y: 1}, {x: 0, y: 2}, {x: 0, y: 3}, {x: 0, y: 4}, {x: 1, y: -4}, {x: 1, y: -3}, {x: 1, y: -2}, {x: 1, y: -1}, {x: 1, y: 0}, {x: 1, y: 1}, {x: 1, y: 2}, {x: 1, y: 3}, {x: 1, y: 4}, {x: 2, y: -1}, {x: 2, y: 0}, {x: 2, y: 1}, {x: 3, y: -1}, {x: 3, y: 0}, {x: 3, y: 1}, {x: 4, y: -1}, {x: 4, y: 0}, {x: 4, y: 1}],
	105,
	0
);

const EFFECT_TOWNHALL = new BuildingEffect(
	[{x: -4, y: -4}, {x: -4, y: -3}, {x: -4, y: -2}, {x: -4, y: 0}, {x: -4, y: 2}, {x: -4, y: 3}, {x: -4, y: 4}, {x: -3, y: -4}, {x: -3, y: -3}, {x: -3, y: -2}, {x: -3, y: 0}, {x: -3, y: 2}, {x: -3, y: 3}, {x: -3, y: 4}, {x: -2, y: -4}, {x: -2, y: -3}, {x: -2, y: -2}, {x: -2, y: 0}, {x: -2, y: 2}, {x: -2, y: 3}, {x: -2, y: 4}, {x: 0, y: -4}, {x: 0, y: -3}, {x: 0, y: -2}, {x: 0, y: 2}, {x: 0, y: 3}, {x: 0, y: 4}, {x: 2, y: -4}, {x: 2, y: -3}, {x: 2, y: -2}, {x: 2, y: 0}, {x: 2, y: 2}, {x: 2, y: 3}, {x: 2, y: 4}, {x: 3, y: -4}, {x: 3, y: -3}, {x: 3, y: -2}, {x: 3, y: 0}, {x: 3, y: 2}, {x: 3, y: 3}, {x: 3, y: 4}, {x: 4, y: -4}, {x: 4, y: -3}, {x: 4, y: -2}, {x: 4, y: 0}, {x: 4, y: 2}, {x: 4, y: 3}, {x: 4, y: 4}],
	125,
	963000000
);

const EFFECT_CANNINGPLANT = new BuildingEffect(
	[{x: 0, y: 0}],
	0,
	0
);
//#endregion
//#region Building SFX
const FX_POWERPLANT = new BuildingFX(
	true, 5, [52, 100, 79]
);

const FX_LIGHTHOUSE = new BuildingFX(
	true, 7, [52, 100, 79]
);

const FX_CARGOSHIP = new BuildingFX(
	true, 2, [52, 100, 79]
);

const FX_WAREHOUSE = new BuildingFX(
	false, null, null
);

const FX_APARTMENT = new BuildingFX(
	true, 3, [52, 100, 79]
);

const FX_HOSPITAL = new BuildingFX(
	true, 2, [52, 100, 79]
);

const FX_TOWNHALL = new BuildingFX(
	true, 4, [52, 100, 79]
);

const FX_CANNINGPLANT = new BuildingFX(
	false, null, null
);
//#endregion
//#region Building Resource
const RESOURCE_POWERPLANT = new BuildingResource(
	0, 0, 12.5, -2.5
);

const RESOURCE_LIGHTHOUSE = new BuildingResource(
	0, 0, 0, 0.5
);

const RESOURCE_CARGOSHIP = new BuildingResource(
	21, 0, 0, -0.5
);

const RESOURCE_WAREHOUSE = new BuildingResource(
	12, 0, 0, -0.25
);

const RESOURCE_APARTMENT = new BuildingResource(
	0, 75, 0, 0.33
);

const RESOURCE_HOSPITAL = new BuildingResource(
	0, 0, 0, 0.25
);

const RESOURCE_TOWNHALL = new BuildingResource(
	0, 90, 0, 0.75
);

const RESOURCE_CANNINGPLANT = new BuildingResource(
	28, 0, 0, -1.25
);
//#endregion
//#region Building Needs
const NEEDS_POWERPLANT = new BuildingNeeds(
	0, 18, 0, 0
);

const NEEDS_LIGHTHOUSE = new BuildingNeeds(
	0, 8, 4, 0
);

const NEEDS_CARGOSHIP = new BuildingNeeds(
	0, 16, 1.5, 0
);

const NEEDS_WAREHOUSE = new BuildingNeeds(
	0, 11, 2, 0
);

const NEEDS_APARTMENT = new BuildingNeeds(
	0, 0, 5, 0
);

const NEEDS_HOSPITAL = new BuildingNeeds(
	0, 20, 5.5, 0
);

const NEEDS_TOWNHALL = new BuildingNeeds(
	0, 0, 6.5, 0
);

const NEEDS_CANNINGPLANT = new BuildingNeeds(
	0, 17, 7, 0
);
//#endregion

const BUILDING_DATA = [
    //#region TIER 1
    {
        building_name: "Forager",
        description: "Bobbing for apples",
        price:      20,
        production: 0.5,
        place_style: "grass",
        requires_path: false,
        effect: EFFECT_FORAGER,
        fx: FX_FORAGER,
        resource: RESOURCE_FORAGER,
        needs: NEEDS_FORAGER
    },
    {
        building_name: "Cultivator",
        description: "Tilling enriches the soil",
        price:      125,
        production: 2,
        place_style: "grass",
        requires_path: false,
        effect: EFFECT_CULTIVATOR,
        fx: FX_CULTIVATOR,
        resource: RESOURCE_CULTIVATOR,
        needs: NEEDS_CULTIVATOR
    },
    {
        building_name: "Cave Den",
        description: "My other roommate is a bear",
        price:      640,
        production: 5,
        place_style: "land",
        requires_path: false,
        effect: EFFECT_CAVEDEN,
        fx: FX_CAVEDEN,
        resource: RESOURCE_CAVEDEN,
        needs: NEEDS_CAVEDEN
    },
    {
        building_name: "Hunter",
        description: "Two birds with one stone",
        price:      4800,
        production: 25,
        place_style: "land",
        requires_path: false,
        effect: EFFECT_HUNTER,
        fx: FX_HUNTER,
        resource: RESOURCE_HUNTER,
        needs: NEEDS_HUNTER
    },
    {
        building_name: "Fishing Hut",
        description: "You can't tuna fish, but you can fish tuna",
        price:      13750,
        production: 45,
        place_style: "shore",
        requires_path: false,
        effect: EFFECT_FISHINGHUT,
        fx: FX_FISHINGHUT,
        resource: RESOURCE_FISHINGHUT,
        needs: NEEDS_FISHINGHUT
    },
    {
        building_name: "Storehouse",
        description: "I deliver the goods",
        price:      24500,
        production: 30,
        place_style: "land",
        requires_path: true,
        effect: EFFECT_STOREHOUSE,
        fx: FX_STOREHOUSE,
        resource: RESOURCE_STOREHOUSE,
        needs: NEEDS_STOREHOUSE
    },
    {
        building_name: "Settlement",
        description: "There goes the neighborhood",
        price:      47500,
        production: 50,
        place_style: "land",
        requires_path: true,
        effect: EFFECT_SETTLEMENT,
        fx: FX_SETTLEMENT,
        resource: RESOURCE_SETTLEMENT,
        needs: NEEDS_SETTLEMENT
    },
    {
        building_name: "Fire Pit",
        description: "Light in the dark",
        price:      86400,
        production: 90,
        place_style: "land",
        requires_path: false,
        effect: EFFECT_FIREPIT,
        fx: FX_FIREPIT,
        resource: RESOURCE_FIREPIT,
        needs: NEEDS_FIREPIT
    },
    //#endregion
    //#region TIER 2
    {
        building_name: "Rancher",
        description: "Keep the cows at home",
        price:      1510000,
        production: 750,
        place_style: "land",
        requires_path: false,
        effect: EFFECT_RANCHER,
        fx: FX_RANCHER,
        resource: RESOURCE_RANCHER,
        needs: NEEDS_RANCHER
    },
    {
        building_name: "Stone Mason",
        description: "Chipping away",
        price:      2500000,
        production: 1050,
        place_style: "land",
        requires_path: true,
        effect: EFFECT_STONEMASON,
        fx: FX_STONEMASON,
        resource: RESOURCE_STONEMASON,
        needs: NEEDS_STONEMASON
    },
    {
        building_name: "Roundhouse",
        description: "Erm... where are the corners...",
        price:      5150000,
        production: 900,
        place_style: "land",
        requires_path: false,
        effect: EFFECT_ROUNDHOUSE,
        fx: FX_ROUNDHOUSE,
        resource: RESOURCE_ROUNDHOUSE,
        needs: NEEDS_ROUNDHOUSE
    },
    {
        building_name: "Farmland",
        description: "I grow the corn",
        price:      5750000,
        production: 1750,
        place_style: "grass",
        requires_path: false,
        effect: EFFECT_FARMLAND,
        fx: FX_FARMLAND,
        resource: RESOURCE_FARMLAND,
        needs: NEEDS_FARMLAND
    },
    {
        building_name: "Trawler",
        description: "It's over when the fish jumps...",
        price:      9875000,
        production: 2350,
        place_style: "water",
        requires_path: false,
        effect: EFFECT_TRAWLER,
        fx: FX_TRAWLER,
        resource: RESOURCE_TRAWLER,
        needs: NEEDS_TRAWLER
    },
    {
        building_name: "Lumberjack",
        description: "Chop chop chop",
        price:      13500000,
        production: 3120,
        place_style: "grass",
        requires_path: false,
        effect: EFFECT_TIMBERFELLER,
        fx: FX_TIMBERFELLER,
        resource: RESOURCE_TIMBERFELLER,
        needs: NEEDS_TIMBERFELLER
    },
    {
        building_name: "Bazaar",
        description: "Great deals!",
        price:      23500000,
        production: 4500,
        place_style: "land",
        requires_path: true,
        effect: EFFECT_BAZAAR,
        fx: FX_BAZAAR,
        resource: RESOURCE_BAZAAR,
        needs: NEEDS_BAZAAR
    },
    {
        building_name: "Log Cabin",
        description: "Simple, rustic, honest, local",
        price:      33500000,
        production: 3400,
        place_style: "land",
        requires_path: false,
        effect: EFFECT_LOGCABIN,
        fx: FX_LOGCABIN,
        resource: RESOURCE_LOGCABIN,
        needs: NEEDS_LOGCABIN
    },
    //#endregion
    //#region TIER 3
    {
        building_name: "Wharf",
        description: "Fishy on me",
        price:      320000000,
        production: 37500,
        place_style: "shore",
        requires_path: false,
        effect: EFFECT_WHARF,
        fx: FX_WHARF,
        resource: RESOURCE_WHARF,
        needs: NEEDS_WHARF
    },
    {
        building_name: "Ceramist",
        description: "Once fired",
        price:      395000000,
        production: 52500,
        place_style: "land",
        requires_path: true,
        effect: EFFECT_CERAMIST,
        fx: FX_CERAMIST,
        resource: RESOURCE_CERAMIST,
        needs: NEEDS_CERAMIST
    },
    {
        building_name: "Hut",
        description: "What is wattle? And what is daub?",
        price:      480000000,
        production: 29500,
        place_style: "land",
        requires_path: true,
        effect: EFFECT_HUT,
        fx: FX_HUT,
        resource: RESOURCE_HUT,
        needs: NEEDS_HUT
    },
    {
        building_name: "Charcoaler",
        description: "Burns stuff... to make something burnable?",
        price:      565000000,
        production: 52500,
        place_style: "land",
        requires_path: true,
        effect: EFFECT_CHARCOALER,
        fx: FX_CHARCOALER,
        resource: RESOURCE_CHARCOALER,
        needs: NEEDS_CHARCOALER
    },
    {
        building_name: "Miner",
        description: "From the earth",
        price:      833000000,
        production: 67890,
        place_style: "land",
        requires_path: true,
        effect: EFFECT_MINER,
        fx: FX_MINER,
        resource: RESOURCE_MINER,
        needs: NEEDS_MINER
    },
    {
        building_name: "Blacksmith",
        description: "Pure metal",
        price:      1234000000,
        production: 88888,
        place_style: "land",
        requires_path: true,
        effect: EFFECT_BLACKSMITH,
        fx: FX_BLACKSMITH,
        resource: RESOURCE_BLACKSMITH,
        needs: NEEDS_BLACKSMITH
    },
    {
        building_name: "Stoneworks",
        description: "Brick sculpters",
        price:      1555000000,
        production: 111100,
        place_style: "land",
        requires_path: true,
        effect: EFFECT_STONEWORKS,
        fx: FX_STONEWORKS,
        resource: RESOURCE_STONEWORKS,
        needs: NEEDS_STONEWORKS
    },
    {
        building_name: "Fortress",
        description: "Safe and sound",
        price:      2345000000,
        production: 145000,
        place_style: "land",
        requires_path: false,
        effect: EFFECT_FORTRESS,
        fx: FX_FORTRESS,
        resource: RESOURCE_FORTRESS,
        needs: NEEDS_FORTRESS
    },
    //#endregion
    //#region TIER 4
    {
        building_name: "Colosseum",
        description: "*Sticks thumb up* *Dramatially turns thumb down slowly*",
        price:      25000000000,
        production: 1350000,
        place_style: "land",
        requires_path: true,
        effect: EFFECT_COLOSSEUM,
        fx: FX_COLOSSEUM,
        resource: RESOURCE_COLOSSEUM,
        needs: NEEDS_COLOSSEUM
    },
    {
        building_name: "Brewery",
        description: "One kind of liquid gold",
        price:      39500000000,
        production: 2111000,
        place_style: "land",
        requires_path: true,
        effect: EFFECT_BREWERY,
        fx: FX_BREWERY,
        resource: RESOURCE_BREWERY,
        needs: NEEDS_BREWERY
    },
    {
        building_name: "Galleon",
        description: "Come sail away",
        price:      54200000000,
        production: 2468000,
        place_style: "water",
        requires_path: false,
        effect: EFFECT_GALLEON,
        fx: FX_GALLEON,
        resource: RESOURCE_GALLEON,
        needs: NEEDS_GALLEON
    },
    {
        building_name: "Town Houses",
        description: "Hi-diddly-ho neighborino",
        price:      78500000000,
        production: 2100000,
        place_style: "land",
        requires_path: true,
        effect: EFFECT_TOWNHOUSES,
        fx: FX_TOWNHOUSES,
        resource: RESOURCE_TOWNHOUSES,
        needs: NEEDS_TOWNHOUSES
    },
    {
        building_name: "Windmill",
        description: "Put the air to work",
        price:      124500000000,
        production: 4680000,
        place_style: "land",
        requires_path: false,
        effect: EFFECT_WINDMILL,
        fx: FX_WINDMILL,
        resource: RESOURCE_WINDMILL,
        needs: NEEDS_WINDMILL
    },
    {
        building_name: "Sawmill",
        description: "Automatic log chopper",
        price:      246000000000,
        production: 8550000,
        place_style: "land",
        requires_path: true,
        effect: EFFECT_SAWMILL,
        fx: FX_SAWMILL,
        resource: RESOURCE_SAWMILL,
        needs: NEEDS_SAWMILL
    },
    {
        //changed
        building_name: "Courthouse",
        description: "Lays down the law",
        price:      321000000000,
        production: 9250000,
        place_style: "land",
        requires_path: true,
        effect: EFFECT_COURTHOUSE,
        fx: FX_COURTHOUSE,
        resource: RESOURCE_COURTHOUSE,
        needs: NEEDS_COURTHOUSE
    },
    {
        //changed
        building_name: "Manor",
        description: "One big house",
        price:      499000000000,
        production: 12500000,
        place_style: "land",
        requires_path: true,
        effect: EFFECT_MANOR,
        fx: FX_MANOR,
        resource: RESOURCE_MANOR,
        needs: NEEDS_MANOR
    },
    //#endregion
    //#region TIER 5
    {
        building_name: "Power Plant",
        description: "Some extra juice",
        price:      8000000000000,
        production: 205000000,
        place_style: "land",
        requires_path: true,
        effect: EFFECT_POWERPLANT,
        fx: FX_POWERPLANT,
        resource: RESOURCE_POWERPLANT,
        needs: NEEDS_POWERPLANT
    },
    {
        building_name: "Lighthouse",
        description: "A beacon in the dark",
        price:      12500000000000,
        production: 284000000,
        place_style: "shoreland",
        requires_path: false,
        effect: EFFECT_LIGHTHOUSE,
        fx: FX_LIGHTHOUSE,
        resource: RESOURCE_LIGHTHOUSE,
        needs: NEEDS_LIGHTHOUSE
    },
    {
        building_name: "Cargo Ship",
        description: "Two if by sea",
        price:      17300000000000,
        production: 355000000,
        place_style: "water",
        requires_path: false,
        effect: EFFECT_CARGOSHIP,
        fx: FX_CARGOSHIP,
        resource: RESOURCE_CARGOSHIP,
        needs: NEEDS_CARGOSHIP
    },
    {
        building_name: "Warehouse",
        description: "Stow away",
        price:      27500000000000,
        production: 526000000,
        place_style: "land",
        requires_path: true,
        effect: EFFECT_WAREHOUSE,
        fx: FX_WAREHOUSE,
        resource: RESOURCE_WAREHOUSE,
        needs: NEEDS_WAREHOUSE
    },
    {
        building_name: "Apartments",
        description: "Packed in",
        price:      41400000000000,
        production: 631000000,
        place_style: "land",
        requires_path: true,
        effect: EFFECT_APARTMENT,
        fx: FX_APARTMENT,
        resource: RESOURCE_APARTMENT,
        needs: NEEDS_APARTMENT
    },
    {
        building_name: "Hospital",
        description: "Scalpel please",
        price:      64000000000000,
        production: 1111000000,
        place_style: "land",
        requires_path: true,
        effect: EFFECT_HOSPITAL,
        fx: FX_HOSPITAL,
        resource: RESOURCE_HOSPITAL,
        needs: NEEDS_HOSPITAL
    },
    {
        building_name: "Town Hall",
        description: "Yea or nay",
        price:      111000000000000,
        production: 1325000000,
        place_style: "land",
        requires_path: true,
        effect: EFFECT_TOWNHALL,
        fx: FX_TOWNHALL,
        resource: RESOURCE_TOWNHALL,
        needs: NEEDS_TOWNHALL
    },
    {
        building_name: "Canning Plant",
        description: "Long-term food solution",
        price:      175000000000000,
        production: 2750000000,
        place_style: "land",
        requires_path: true,
        effect: EFFECT_CANNINGPLANT,
        fx: FX_CANNINGPLANT,
        resource: RESOURCE_CANNINGPLANT,
        needs: NEEDS_CANNINGPLANT
    },
    //#endregion
];
//#endregion

//#region Path
// PATHS
//#region Path SFX
const FX_TRODDENPATH = new BuildingFX(
	false, null, null,
	true, "path", 0
);

const FX_COBBLESTONE = new BuildingFX(
	false, null, null,
	true, "path", 1
);

const FX_WOODBRIDGE = new BuildingFX(
	false, null, null,
	true, "bridge", 2
);

const FX_BRICKROAD = new BuildingFX(
	false, null, null,
	true, "path", 1
);

const FX_GARDENWAY = new BuildingFX(
	false, null, null,
	true, "gardenway", 2
);

const FX_RAILROAD = new BuildingFX(
	false, null, null,
	true, "railroad", 3
);

const FX_PAVEDROAD = new BuildingFX(
	false, null, null,
	true, "road", 2
);

const FX_HIGHWAY = new BuildingFX(
	false, null, null,
	true, "road", 2
);
//#endregion
//#region Path Resources
const RESOURCE_TRODDENPATH = new BuildingResource(
	0, 0, 0, -0.1
);

const RESOURCE_COBBLESTONE = new BuildingResource(
	0, 0, 0, 0.1
);

const RESOURCE_WOODBRIDGE = new BuildingResource(
	0, 0, 0, 0.2
);

const RESOURCE_BRICKROAD = new BuildingResource(
	0, 0, 0, 0.3
);

const RESOURCE_GARDENWAY = new BuildingResource(
	0, 0, 0, 1
);

const RESOURCE_RAILROAD = new BuildingResource(
	0, 0, 0, 0.3
);

const RESOURCE_PAVEDROAD = new BuildingResource(
	0, 0, 0, 0.1
);

const RESOURCE_HIGHWAY = new BuildingResource(
	0, 0, 0, -0.1
);
//#endregion
//#region Path Needs
const NEEDS_TRODDENPATH = new BuildingNeeds(
	0, 0, 0, 0
);

const NEEDS_COBBLESTONE = new BuildingNeeds(
	0, 0, 0, 0
);

const NEEDS_WOODBRIDGE = new BuildingNeeds(
	0, 0, 0, 0
);

const NEEDS_BRICKROAD = new BuildingNeeds(
	0, 0, 0, 0
);

const NEEDS_GARDENWAY = new BuildingNeeds(
	0, 2, 0, 0
);

const NEEDS_RAILROAD = new BuildingNeeds(
	0, 1, 0, 0
);

const NEEDS_PAVEDROAD = new BuildingNeeds(
	0, 1, 0, 0
);

const NEEDS_HIGHWAY = new BuildingNeeds(
	0, 1, 0, 0
);
//#endregion

const PATH_DATA = [
    {
        building_name: "Trodden Path",
        description: "The path more traveled",
        price: 500,
        quality: 1,
        place_style: "land",
        fx: FX_TRODDENPATH,
        resource: RESOURCE_TRODDENPATH,
        needs: NEEDS_TRODDENPATH
    },
    {
        building_name: "Cobblestone Path",
        description: "More longevity",
        price: 45000,
        quality: 1.2,
        place_style: "land",
        fx: FX_COBBLESTONE,
        resource: RESOURCE_COBBLESTONE,
        needs: NEEDS_COBBLESTONE
    },
    {
        building_name: "Wooden Bridge",
        description: "Part the blue seas",
        price: 350000,
        quality: 1.2,
        place_style: "shorewater",
        fx: FX_WOODBRIDGE,
        resource: RESOURCE_WOODBRIDGE,
        needs: NEEDS_WOODBRIDGE
    },
    {
        building_name: "Brick Road",
        description: "A sure sign of ceramic activity",
        price: 6500000,
        quality: 1.4,
        place_style: "land",
        fx: FX_BRICKROAD,
        resource: RESOURCE_BRICKROAD,
        needs: NEEDS_BRICKROAD
    },
    {
        building_name: "Gardenway",
        description: "The scenic route",
        price: 350000000,
        quality: 1.6,
        place_style: "land",
        fx: FX_GARDENWAY,
        resource: RESOURCE_GARDENWAY,
        needs: NEEDS_GARDENWAY
    },
    {
        building_name: "Railroad",
        description: "Going off the rails",
        price: 5750000000,
        quality: 1.75,
        place_style: "land",
        fx: FX_RAILROAD,
        resource: RESOURCE_RAILROAD,
        needs: NEEDS_RAILROAD
    },
    {
        building_name: "Paved Street",
        description: "Asphalt assault",
        price: 33500000000,
        quality: 2,
        place_style: "land",
        fx: FX_PAVEDROAD,
        resource: RESOURCE_PAVEDROAD,
        needs: NEEDS_PAVEDROAD
    },
    {
        building_name: "Highway",
        description: "Speedy speedy",
        price: 175000000000,
        quality: 2.5,
        place_style: "all",
        fx: FX_HIGHWAY,
        resource: RESOURCE_HIGHWAY,
        needs: NEEDS_HIGHWAY
    },
];
//#endregion

//#region Scenery
// TIER 1
//#region Scenery SFX
const FX_BUSHES = new BuildingFX(
	false, null, null,
);

const FX_TREELIGHT = new BuildingFX(
	false, null, null,
);

const FX_TREEDENSE = new BuildingFX(
	false, null, null,
);

const FX_STONEHENGE = new BuildingFX(
	false, null, null,
);

const FX_FLOWERBED = new BuildingFX(
	false, null, null,
	true, "flowerbed", 0
);

const FX_OBELISK = new BuildingFX(
	false, null, null,
);

const FX_GARDEN = new BuildingFX(
	false, null, null,
	true, "garden", 0
);

const FX_GARDENINVERTED = new BuildingFX(
	false, null, null,
	true, "garden-inv", 0
);
//#endregion
//#region Scenery Resources
const RESOURCE_BUSHES = new BuildingResource(
	0, 0, 0, 0.25
);

const RESOURCE_TREELIGHT = new BuildingResource(
	0, 0, 0, 0.35
);

const RESOURCE_TREEDENSE = new BuildingResource(
	0, 0, 0, 0.5
);

const RESOURCE_STONEHENGE = new BuildingResource(
	0, 0, 0, 1
);

const RESOURCE_FLOWERBED = new BuildingResource(
	0, 0, 0, 0.35
);

const RESOURCE_OBELISK = new BuildingResource(
	0, 0, 0, 1.25
);

const RESOURCE_GARDEN = new BuildingResource(
	0, 0, 0, 0.5
);

const RESOURCE_GARDENINVERTED = new BuildingResource(
	0, 0, 0, 0.5
);
//#endregion
//#region Scenery Needs
const NEEDS_BUSHES = new BuildingNeeds(
	0, 1, 0, 0
);

const NEEDS_TREELIGHT = new BuildingNeeds(
	0, 1, 0, 0
);

const NEEDS_TREEDENSE = new BuildingNeeds(
	0, 1, 0, 0
);

const NEEDS_STONEHENGE = new BuildingNeeds(
	0, 2, 0, 0
);

const NEEDS_FLOWERBED = new BuildingNeeds(
	0, 1, 0, 0
);

const NEEDS_OBELISK = new BuildingNeeds(
	0, 2, 0, 0
);

const NEEDS_GARDEN = new BuildingNeeds(
	0, 1, 0, 0
);

const NEEDS_GARDENINVERTED = new BuildingNeeds(
	0, 1, 0, 0
);
//#endregion

// TIER 2
//#region Scenery SFX
const FX_PYRAMID = new BuildingFX(
	false, null, null,
);

const FX_PARK = new BuildingFX(
	false, null, null,
	true, "park", 0
);

const FX_CANAL = new BuildingFX(
	false, null, null,
	true, "canal", 0
);

const FX_CASTLEWALL = new BuildingFX(
	false, null, null,
	true, "castlewall", 0
);

const FX_STATUE = new BuildingFX(
	false, null, null,
);

const FX_JUNKPILE = new BuildingFX(
	false, null, null,
);

const FX_INDUSTRIALJUNK = new BuildingFX(
	false, null, null,
);

const FX_PARKINGLOT = new BuildingFX(
	false, null, null,
	true, "parkinglot", 0
);
//#endregion
//#region Scenery Resources
const RESOURCE_PYRAMID = new BuildingResource(
	0, 0, 0, 1.5
);

const RESOURCE_PARK = new BuildingResource(
	0, 0, 0, 0.5
);

const RESOURCE_CANAL = new BuildingResource(
	0, 0, 0, 0.75
);

const RESOURCE_CASTLEWALL = new BuildingResource(
	0, 0, 0, 1
);

const RESOURCE_STATUE = new BuildingResource(
	0, 0, 0, 1.75
);

const RESOURCE_JUNKPILE = new BuildingResource(
	0, 0, 0, -0.1
);

const RESOURCE_INDUSTRIALJUNK = new BuildingResource(
	0, 0, 0, -0.15
);

const RESOURCE_PARKINGLOT = new BuildingResource(
	0, 0, 0, 0.25
);
//#endregion
//#region Scenery Needs
const NEEDS_PYRAMID = new BuildingNeeds(
	0, 3, 0, 0
);

const NEEDS_PARK = new BuildingNeeds(
	0, 1, 0, 0
);

const NEEDS_CANAL = new BuildingNeeds(
	0, 2, 0, 0
);

const NEEDS_CASTLEWALL = new BuildingNeeds(
	0, 2, 0, 0
);

const NEEDS_STATUE = new BuildingNeeds(
	0, 4, 0, 0
);

const NEEDS_JUNKPILE = new BuildingNeeds(
	0, 1, 0, 0
);

const NEEDS_INDUSTRIALJUNK = new BuildingNeeds(
	0, 2, 0, 0
);

const NEEDS_PARKINGLOT = new BuildingNeeds(
	0, 2, 0, 0
);
//#endregion

const SCENERY_DATA = [
    //#region Tier 1
    {
        building_name: "Bushes",
        description: "A shrub octad",
        price: 1500,
        place_style: "grass",
        march_index: null,
        fx: FX_BUSHES,
        resource: RESOURCE_BUSHES,
        needs: NEEDS_BUSHES
    },
    {
        building_name: "Light Trees",
        description: "A small amount of greenery",
        price: 5000,
        place_style: "grass",
        march_index: null,
        fx: FX_TREELIGHT,
        resource: RESOURCE_TREELIGHT,
        needs: NEEDS_TREELIGHT
    },
    {
        building_name: "Dense Trees",
        description: "A shady place to stay",
        price: 12500,
        place_style: "grass",
        march_index: null,
        fx: FX_TREEDENSE,
        resource: RESOURCE_TREEDENSE,
        needs: NEEDS_TREEDENSE
    },
    {
        building_name: "Stonehenge",
        description: "Ancient wonders",
        price: 50000,
        place_style: "land",
        march_index: null,
        fx: FX_STONEHENGE,
        resource: RESOURCE_STONEHENGE,
        needs: NEEDS_STONEHENGE
    },
    {
        building_name: "Flower Bed",
        description: "A pretty pile of petals",
        price: 55000,
        place_style: "grass",
        march_index: 0,
        fx: FX_FLOWERBED,
        resource: RESOURCE_FLOWERBED,
        needs: NEEDS_FLOWERBED
    },
    {
        building_name: "Obelisk",
        description: "Towering above all",
        price: 125000,
        place_style: "land",
        march_index: null,
        fx: FX_OBELISK,
        resource: RESOURCE_OBELISK,
        needs: NEEDS_OBELISK
    },
    {
        building_name: "Garden",
        description: "Organized organics",
        price: 225000,
        place_style: "land",
        march_index: 1,
        fx: FX_GARDEN,
        resource: RESOURCE_GARDEN,
        needs: NEEDS_GARDEN
    },
    {
        building_name: "Garden (Inverted)",
        description: "Organized organics, but inverted",
        price: 275000,
        place_style: "land",
        march_index: 2,
        fx: FX_GARDENINVERTED,
        resource: RESOURCE_GARDENINVERTED,
        needs: NEEDS_GARDENINVERTED
    },
    //#endregion
    //#region Tier 2
    {
        building_name: "Pyramid",
        description: "Geometry objectified",
        price: 1250000,
        place_style: "land",
        march_index: null,
        fx: FX_PYRAMID,
        resource: RESOURCE_PYRAMID,
        needs: NEEDS_PYRAMID
    },
    {
        building_name: "Park",
        description: "Keep off the grass",
        price: 2640000,
        place_style: "grass",
        march_index: 3,
        fx: FX_PARK,
        resource: RESOURCE_PARK,
        needs: NEEDS_PARK
    },
    {
        building_name: "Canal",
        description: "Wet means of transport",
        price: 13750000,
        place_style: "land",
        march_index: 4,
        fx: FX_CANAL,
        resource: RESOURCE_CANAL,
        needs: NEEDS_CANAL
    },
    {
        building_name: "Castle Wall",
        description: "Battlement barrier",
        price: 74250000,
        place_style: "land",
        march_index: 5,
        fx: FX_CASTLEWALL,
        resource: RESOURCE_CASTLEWALL,
        needs: NEEDS_CASTLEWALL
    },
    {
        building_name: "Statue",
        description: "Our mayor, rendered in gold",
        price: 250000000,
        place_style: "land",
        march_index: null,
        fx: FX_STATUE,
        resource: RESOURCE_STATUE,
        needs: NEEDS_STATUE
    },
    {
        building_name: "Junk Pile",
        description: "Waste not, want not",
        price: 275000000,
        place_style: "land",
        march_index: null,
        fx: FX_JUNKPILE,
        resource: RESOURCE_JUNKPILE,
        needs: NEEDS_JUNKPILE
    },
    {
        building_name: "Industrial Junk",
        description: "Tubes and pipes",
        price: 380000000,
        place_style: "land",
        march_index: null,
        fx: FX_INDUSTRIALJUNK,
        resource: RESOURCE_INDUSTRIALJUNK,
        needs: NEEDS_INDUSTRIALJUNK
    },
    {
        building_name: "Parking Lot",
        description: "Car corral",
        price: 540000000,
        place_style: "land",
        march_index: 6,
        fx: FX_PARKINGLOT,
        resource: RESOURCE_PARKINGLOT,
        needs: NEEDS_PARKINGLOT
    },
    //#endregion
];
//#endregion