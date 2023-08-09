//© 2023 - 2023 www.idleregion.com - All Rights Reserved.

class GameState {
    constructor(load) {

        let loadNull = (load === undefined || load.worldSettings === undefined);
        this.worldSettings = {
            boardSize: (loadNull || load.worldSettings.boardSize === undefined) ? 64 : load.worldSettings.boardSize,
            dayLength: (loadNull || load.worldSettings.dayLength === undefined) ? 1200 : load.worldSettings.dayLength,
            timeOfDay: (loadNull || load.worldSettings.timeOfDay === undefined) ? 480 : load.worldSettings.timeOfDay,
            worldSeed: (loadNull || load.worldSettings.worldSeed === undefined) ? 0 : load.worldSettings.worldSeed,
            weatherState: (loadNull || load.worldSettings.weatherState === undefined) ? 0.3 : load.worldSettings.weatherState
        }

        loadNull = (load === undefined || load.environment === undefined);
        this.environment = {
            ground: 
                (loadNull || load.environment.ground === undefined) ? 
                new Array(this.worldSettings.boardSize).fill().map(() => Array(this.worldSettings.boardSize).fill(1)) :
                load.environment.ground,
            meteors: (loadNull || load.environment.meteors === undefined) ? [] : load.environment.meteors,
            lastMeteor: (loadNull || load.environment.lastMeteor === undefined) ? 0 : 0,
        }
        
        loadNull = (load === undefined || load.player === undefined);
        this.player = {
            name: (loadNull || load.player.name === undefined) ? "Unnamed Region" : load.player.name,
            dateCreated: (loadNull || load.player.dateCreated === undefined) ? Date.now() : load.player.dateCreated,
            balance: (loadNull || load.player.balance === undefined) ? 0 : load.player.balance,
            earnings: (loadNull || load.player.earnings === undefined) ? 0 : load.player.earnings,
            buildingsOwned: 
                (loadNull || load.player.buildingsOwned === undefined) ? 
                new Array(BUILDING_DATA.length).fill(0) : 
                load.player.buildingsOwned,
            towerInventory: (loadNull || load.player.towerInventory === undefined) ? new Array(BUILDING_DATA.length) : load.player.towerInventory,
            timeOfLastUpdate: (loadNull || load.player.timeOfLastUpdate === undefined) ? Date.now() : load.player.timeOfLastUpdate,
            achievements: (loadNull || load.player.achievements === undefined) ? 
                new AchievementHandler() : 
                new AchievementHandler(load.player.achievements),
            activeEffects: (loadNull || load.player.activeEffects === undefined) ? [] : load.player.activeEffects,
            edicts: (loadNull || load.player.edicts === undefined) ? new EdictHandler() : new EdictHandler(load.player.edicts)
        }

        loadNull = (load === undefined || load.boardState === undefined);
        this.boardState = {
            effectMap: 
                (loadNull || load.boardState.effectMap === undefined) ? 
                new Array(this.worldSettings.boardSize).fill().map(() => Array(this.worldSettings.boardSize).fill(100)) :
                load.boardState.effectMap,
            population: (loadNull || load.boardState.population === undefined) ? 1 : load.boardState.population,
            perBuildingPop: 
                (loadNull || load.boardState.perBuildingPop === undefined) ? 
                new Array(BUILDING_DATA.length).fill(0) : 
                load.boardState.perBuildingPop,
            perBuildingEarnings: 
                (loadNull || load.boardState.perBuildingEarnings === undefined) ? 
                new Array(BUILDING_DATA.length).fill(0) : 
                load.boardState.perBuildingEarnings,
            buildingsPlaced: 
                (loadNull || load.boardState.buildingsPlaced === undefined) ? 
                new Array(BUILDING_DATA.length).fill(0) : 
                load.boardState.buildingsPlaced,
            pathsPlaced: 
                (loadNull || load.boardState.pathsPlaced === undefined) ? 
                new Array(PATH_DATA.length).fill(0) : 
                load.boardState.pathsPlaced,
            sceneryPlaced:
                (loadNull || load.boardState.sceneryPlaced === undefined) ? 
                new Array(SCENERY_DATA.length).fill(0) : 
                load.boardState.sceneryPlaced,
            boardMap: (loadNull || load.boardState.boardMap === undefined) ? 
                new Array(this.worldSettings.boardSize).fill().map(() => Array(this.worldSettings.boardSize).fill(new BoardTile("null"))) :
                load.boardState.boardMap,
            resources: (loadNull || load.boardState.resources === undefined) ? new Array(4).fill(0) : load.boardState.resources,
            needs: (loadNull || load.boardState.needs === undefined) ? new Array(4).fill(0) : load.boardState.needs,
            regionNeeds: (loadNull || load.boardState.regionNeeds === undefined) ? new Array(4).fill(0) : load.boardState.regionNeeds,
            satisfactionBoost: (loadNull || load.boardState.satisfactionBoost === undefined) ? 1 : load.boardState.satisfactionBoost,
        }

        loadNull = (load === undefined || load.stats === undefined);
        this.stats = {
            rockClicks: (loadNull || load.stats.rockClicks === undefined) ? 0 : load.stats.rockClicks,
            rockEarnings: (loadNull || load.stats.rockEarnings === undefined) ? 0 : load.stats.rockEarnings,
            totalEarnings: (loadNull || load.stats.totalEarnings === undefined) ? 0 : load.stats.totalEarnings,
            playTime: (loadNull || load.stats.playTime === undefined) ? 0 : load.stats.playTime,
            meteorClicks: (loadNull || load.stats.meteorClicks === undefined) ? 0 : load.stats.meteorClicks,
            highestBoost: (loadNull || load.stats.highestBoost === undefined) ? 0 : load.stats.highestBoost,
        }

        if (this.player.buildingsOwned.length != BUILDING_DATA.length) this.updateBuildingCount();

        //#region Board cache

        CHUNK_WIDTH = this.worldSettings.boardSize / 8; // Experimental, change chunk size for large map so calculations dont take forever

        this.chunkCount = Math.pow(this.worldSettings.boardSize / CHUNK_WIDTH, 2);
        this.calcStep = this.chunkCount;
        this.currentCalcStep = 0;

        this.earningCache = new Array(this.chunkCount).fill(0);
        this.perBuildingEarningCache = Array.from(Array(BUILDING_DATA.length), () => []);

        this.populationCache = new Array(this.chunkCount).fill(0);
        this.perBuildingPopCache = Array.from(Array(BUILDING_DATA.length), () => []);

        this.roadlessBuildings = 0;
        this.roadlessBuildingsCache = new Array(this.chunkCount).fill(0);

        this.resourceCache = new Array(this.chunkCount).fill().map(() => Array(4).fill(0));
        this.needsCache = new Array(this.chunkCount).fill().map(() => Array(4).fill(0));

        this.edictCache = new EdictCache();
        this.edictCache.processEdictChanges(this.player.edicts.edictKeys);
        //#endregion

        this.environment.lastMeteor = Date.now();
        this.calculateEffectMap();
        this.updateInventory();
        for (let i = 0; i < this.chunkCount; i++) this.calculateBoardOutput();
    }

    //#region Add indecies to save
    updateBuildingCount() {

        // TODO: add paths just for safety
        let newBuildingsOwned = new Array(BUILDING_DATA.length).fill(0);
        for (let i = 0; i < newBuildingsOwned.length; i++) {

            if (i >= this.player.buildingsOwned.length) break;
            newBuildingsOwned[i] = this.player.buildingsOwned[i];
        }
        this.player.buildingsOwned = newBuildingsOwned;

        let newTowerInventory = new Array(BUILDING_DATA.length).fill(0);
        for (let i = 0; i < newTowerInventory.length; i++) {

            if (i >= this.player.towerInventory.length) break;
            newTowerInventory[i] = this.player.towerInventory[i];
        }
        this.player.towerInventory = newTowerInventory;

        let newBuildingsPlaced = new Array(BUILDING_DATA.length).fill(0);
        for (let i = 0; i < newBuildingsPlaced.length; i++) {

            if (i >= this.boardState.buildingsPlaced.length) break;
            newBuildingsPlaced[i] = this.boardState.buildingsPlaced[i];
        }
        this.boardState.buildingsPlaced = newBuildingsPlaced;

        let newSceneryPlaced = new Array(SCENERY_DATA.length).fill(0);
        for (let i = 0; i < newSceneryPlaced.length; i++) {

            if (i >= this.boardState.sceneryPlaced.length) break;
            newSceneryPlaced[i] = this.boardState.sceneryPlaced[i];
        }
        this.boardState.sceneryPlaced = newSceneryPlaced;

        let newBuildingEarnings = new Array(BUILDING_DATA.length).fill(0);
        for (let i = 0; i < newBuildingEarnings.length; i++) {

            if (i >= this.boardState.perBuildingEarnings.length) break;
            newBuildingEarnings[i] = this.boardState.perBuildingEarnings[i];
        }
        this.boardState.perBuildingEarning = newBuildingEarnings;

        let newBuildingPop = new Array(BUILDING_DATA.length).fill(0);
        for (let i = 0; i < newBuildingPop.length; i++) {

            if (i >= this.boardState.perBuildingPop.length) break;
            newBuildingPop[i] = this.boardState.perBuildingPop[i];
        }
        this.boardState.perBuildingPop = newBuildingPop;
    }
    //#endregion

    //#region Boardspace edit
    removeTile(x, y) {

        let tile = this.boardState.boardMap[x][y];
        if (tile.type == "tower") {

            this.editEffectMap(tile.metaData, false);
            this.boardState.buildingsPlaced[tile.metaData.buildingId - 1]--;
        }
        else if (tile.type == "path") {

            let refund = this.edictCache.affectedPathResources[tile.metaData.pathId - 1].price;
            this.player.balance += refund;

            this.boardState.pathsPlaced[tile.metaData.pathId - 1]--;
        }
        else if (tile.type == "scenery") {

            let refund = SCENERY_DATA[tile.metaData.sceneryId - 1].price;
            this.player.balance += refund;
            
            this.boardState.sceneryPlaced[tile.metaData.sceneryId - 1]--;
        }
        this.boardState.boardMap[x][y] = new BoardTile("null");
    }

    addTile(tile) {

        this.boardState.boardMap[tile.metaData.x][tile.metaData.y] = tile;
        if (tile.type == "tower") {

            this.editEffectMap(tile.metaData, true);
            this.boardState.buildingsPlaced[tile.metaData.buildingId - 1]++;
        }
        else if (tile.type == "path") {

            let cost = this.edictCache.affectedPathResources[tile.metaData.pathId - 1].price;
            this.player.balance -= cost;

            this.boardState.pathsPlaced[tile.metaData.pathId - 1]++;
        }
        else if (tile.type == "scenery") {

            let cost = SCENERY_DATA[tile.metaData.sceneryId - 1].price;
            this.player.balance -= cost;

            this.boardState.sceneryPlaced[tile.metaData.sceneryId - 1]++;
        }
    }
    //#endregion

    //#region Boardstate Calculations
    calculateEffectMap() {

        let board = this.boardState.boardMap;
        
        let boardSize = this.worldSettings.boardSize;
        const effectMap = new Array(boardSize).fill().map(() => Array(boardSize).fill(100));
        let maxBoost = 0;
        for (let y = 0; y < boardSize; y++) {
            for (let x = 0; x < boardSize; x++) {

                if (board[x][y].type != "tower") continue;

                let tower = board[x][y].metaData;
                let building = BUILDING_DATA[tower.buildingId - 1];
                let refX = tower.x;
                let refY = tower.y;

                // If buff building
                if (building.effect.boostBonus == 0) continue;

                for (let j = 0; j < building.effect.effectCoords.length; j++) {

                    // Make sure check is inside bounds
                    let point = building.effect.effectCoords[j];
                    if ((refY - point.y < 0 || refY - point.y >= boardSize) ||
                         refX - point.x < 0 || refX - point.x >= boardSize) continue;

                    // For tiles in buff range, increment effect map by building's effect strength
                    effectMap[refY - point.y][refX - point.x] += building.effect.boostBonus;
                    board[refX - point.x][refY - point.y].metaData.boostBonus = effectMap[refY - point.y][refX - point.x];

                    if (effectMap[refY - point.y][refX - point.x] > maxBoost) {

                        maxBoost = effectMap[refY - point.y][refX - point.x];
                    }
                }
            }
        }
        this.stats.highestBoost = maxBoost;
        this.boardState.effectMap = effectMap;
    }

    editEffectMap(tower, placing) {

        let maxBoost = 0;

        let building = BUILDING_DATA[tower.buildingId - 1];
        let len = building.effect.effectCoords.length;
        for (let i = 0; i < len; i++) {

            let posX = tower.x + building.effect.effectCoords[i].x;
            let posY = tower.y + building.effect.effectCoords[i].y;

            if (posX < 0 || posX >= this.worldSettings.boardSize ||
                posY < 0 || posY >= this.worldSettings.boardSize) continue;

            if (!placing) this.boardState.effectMap[posY][posX] -= building.effect.boostBonus;
            else if (placing) this.boardState.effectMap[posY][posX] += building.effect.boostBonus;
            
            let boostNum = this.boardState.effectMap[posY][posX];
            let tileBuilding = this.boardState.boardMap[posX][posY].type == "tower";

            if (tileBuilding) this.boardState.boardMap[posX][posY].metaData.boostBonus = this.boardState.effectMap[posY][posX];

            if (boostNum >= maxBoost) maxBoost = boostNum;
            if (!this.player.achievements.buffedTower && (boostNum > 100 && tileBuilding)) this.player.achievements.checkBuffedTower();
        }
        if (maxBoost > this.stats.highestBoost) this.stats.highestBoost = maxBoost; 
        this.player.achievements.checkTileBoost(maxBoost);
    }

    calculateBoardOutput() {

        // Width of board in chunks
        let chunkWidth = this.worldSettings.boardSize / CHUNK_WIDTH;

        // Width of chunk in tiles
        let chunkSize = this.worldSettings.boardSize / chunkWidth;

        let chunkX = chunkSize * (this.currentCalcStep % chunkWidth);
        let chunkY = chunkSize * Math.floor(this.currentCalcStep / chunkWidth);

        // Search chunk for earnings
        let sum = 0;
        let pop = 0;
        let resources = new Array(4).fill(0);
        let needs = new Array(4).fill(0);
        for (let y = chunkY; y < chunkY + chunkSize; y++) {

            for (let x = chunkX; x < chunkX + chunkSize; x++) {

                if (this.boardState.boardMap[x][y].type == "tower") {

                    let tile = this.boardState.boardMap[x][y].metaData;
                    let structureData = BUILDING_DATA[tile.buildingId - 1];

                    let hasPath = this.#checkIfBordersPath(tile.x, tile.y);
                    let needsPath = structureData.requires_path;
                    tile.bordersPath = hasPath;
                    
                    //#region Calculate population, earnings, resources
                    let tileBoost = this.boardState.effectMap[y][x] / 100;
                    let tilePopulation = structureData.effect.populationBonus * tileBoost;
                    let tileEarnings = structureData.production * tileBoost;
                    let tileResources = new Array(4).fill(0);
                    let tileNeeds = new Array(4).fill(0);

                    // Factor boosts
                    for (let i = 0; i < this.player.activeEffects.length; i++) if (this.player.activeEffects[i].code == "boostearn") tileEarnings *= BOOST_EARN_MULT;
                    tileEarnings *= this.boardState.satisfactionBoost;

                    if (needsPath) {

                        if (hasPath) {

                            let pathQuality = PATH_DATA[this.#getHighestBorderPath(tile.x, tile.y) - 1].quality;
                            tileResources = this.#calculateTileResources(tile.buildingId - 1, pathQuality * tileBoost);
                            tileNeeds = this.calculateTileNeeds(tile.buildingId - 1, pathQuality * tileBoost);
                            tileEarnings *= pathQuality;
                            tilePopulation *= pathQuality;
                        }
                        else {

                            tileResources = this.#calculateTileResources(tile.buildingId - 1, NO_PATH_PENALTY * tileBoost);
                            tileNeeds = this.calculateTileNeeds(tile.buildingId - 1, tileBoost);
                            this.roadlessBuildingsCache[this.currentCalcStep]++;
                            tileEarnings *= NO_PATH_PENALTY;
                            tilePopulation *= NO_PATH_PENALTY;
                        }
                    }
                    else {

                        if (hasPath) {

                            let pathQuality = PATH_DATA[this.#getHighestBorderPath(tile.x, tile.y) - 1].quality;
                            tileResources = this.#calculateTileResources(tile.buildingId - 1, pathQuality * tileBoost);
                            tileNeeds = this.calculateTileNeeds(tile.buildingId - 1, pathQuality * tileBoost);
                            tileEarnings *= pathQuality; 
                            tilePopulation *= pathQuality;
                        }
                        else {

                            tileResources = this.#calculateTileResources(tile.buildingId - 1, tileBoost);
                            tileNeeds = this.calculateTileNeeds(tile.buildingId - 1, tileBoost);
                        }
                    }
                    //#endregion

                    //#region Add sums to variables
                    tilePopulation = Math.floor(tilePopulation);
                    tile.population = tilePopulation;
                    this.perBuildingPopCache[tile.buildingId - 1].push(tilePopulation);
                    pop += tilePopulation;

                    tile.earnings = tileEarnings;
                    this.perBuildingEarningCache[tile.buildingId - 1].push(tileEarnings);
                    sum += tileEarnings;

                    resources[0] += tileResources[0];
                    resources[1] += tileResources[1];
                    resources[2] += tileResources[2];
                    resources[3] += tileResources[3];
                    tile.resource = tileResources;

                    needs[1] += tileNeeds[1];
                    needs[2] += tileNeeds[2];
                    tile.needs = tileNeeds;
                    //#endregion
                }
                else if (this.boardState.boardMap[x][y].type == "path") {

                    let tile = this.boardState.boardMap[x][y].metaData;
                    let structureData = PATH_DATA[tile.pathId - 1];

                    let tileBoost = this.boardState.effectMap[y][x] / 100;
                    let tileResources = new Array(4).fill(0);
                    let tileNeeds = new Array(4).fill(0);

                    let tileScenery = structureData.resource.count[3] * tileBoost;
                    tileResources[3] = tileScenery;
                    resources[3] += tileResources[3];
                    tile.resource = tileResources;

                    let tileWorkers = structureData.needs.count[1] * tileBoost;
                    tileNeeds[1] += tileWorkers;
                    needs[1] += tileNeeds[1];
                    tile.needs = tileNeeds;
                }
                else if (this.boardState.boardMap[x][y].type == "landmark") {

                    let tile = this.boardState.boardMap[x][y].metaData;

                    let tileBoost = this.boardState.effectMap[y][x] / 100;
                    let tileResources = new Array(4).fill(0);

                    let tileScenery = (tile.landmarkId + 1) * tileBoost * this.edictCache.landmarkScenery;
                    tileResources[3] = tileScenery;

                    resources[3] += tileResources[3];
                    tile.resource = tileResources;
                }
                else if (this.boardState.boardMap[x][y].type == "scenery") {

                    let tile = this.boardState.boardMap[x][y].metaData;
                    let structureData = SCENERY_DATA[tile.sceneryId - 1];

                    let tileBoost = this.boardState.effectMap[y][x] / 100;
                    let tileResources = new Array(4).fill(0);
                    let tileNeeds = new Array(4).fill(0);

                    let tileScenery = structureData.resource.count[3] * tileBoost;
                    tileResources[3] = tileScenery;
                    resources[3] += tileResources[3];
                    tile.resource = tileResources;

                    let tileWorkers = structureData.needs.count[1] * tileBoost;
                    tileNeeds[1] += tileWorkers;
                    needs[1] += tileNeeds[1];
                    tile.needs = tileNeeds;
                }
                else {

                    resources[3] += EMPTYGROUND_SCENERY_VALUE;
                }
            }
        }

        //#region Sum region cache
        this.earningCache[this.currentCalcStep] = sum;
        this.populationCache[this.currentCalcStep] = pop;
        this.resourceCache[this.currentCalcStep] = resources;
        this.needsCache[this.currentCalcStep] = needs;

        let newEarnings = this.earningCache.reduce((a, b) => b + a, 0);
        this.player.earnings = newEarnings;

        let newPopulation = 1 + this.populationCache.reduce((a, b) => b + a, 0);
        this.boardState.population = newPopulation;
        this.player.achievements.checkPopulation(this.boardState.population);
        //#endregion

        if (this.currentCalcStep + 1 >= this.calcStep) {

            this.#countRoadlessBuildings();
            this.#calculatePerBuildingProduction();

            this.boardState.resources = this.#tallyRegionResources();
            this.boardState.needs = this.#tallyRegionNeeds();
            this.#calculateRegionNeeds();

            this.currentCalcStep = 0;
        }
        else this.currentCalcStep += 1;
    }

    //#region Calculate resource/needs
    #calculateTileResources(id, multiplier) {

        let structureData = this.edictCache.affectedBuildingResources[id];
        let resources = new Array(0).fill(0);

        for (let i = 0; i < 4; i++) {

            resources[i] = structureData.resource.count[i] * multiplier;
        }
        return resources;
    }

    calculateTileNeeds(id, multiplier) {

        let structureData = this.edictCache.affectedBuildingResources[id];
        let needs = new Array(0).fill(0);

        for (let i = 0; i < 4; i++) {

            needs[i] = structureData.needs.count[i] * multiplier;
            needs[i] *= this.edictCache.needsOffset[i];
        }
        return needs;
    }

    #tallyRegionResources() {

        let resourceCount = new Array(4).fill(0);
        for (let i = 0; i < this.chunkCount; i++) {

            for (let j = 0; j < 4; j++) resourceCount[j] += this.resourceCache[i][j];
        }
        return resourceCount;
    }

    #tallyRegionNeeds() {

        let needsCount = new Array(4).fill(0);
        for (let i = 0; i < this.chunkCount; i++) {

            for (let j = 0; j < 4; j++) needsCount[j] += this.needsCache[i][j];
        }
        return needsCount;
    }

    #calculateRegionNeeds() {

        //#region Guidelines
        //  - Food -> Food request based on population count, food towers provide food
        //  - Jobs -> Buildings request jobs, houses provide workers
        //  - Electricity -> Buildings request electricity, buildings provide power
        //  - Scenery -> Region average, keep a positive rating
        //#endregion

        // Food
        this.boardState.regionNeeds[0] = RESOURCE_BASES[0] * (Math.pow(this.boardState.population, RESOURCE_NEED_GROWTH)) * this.edictCache.needsOffset[0];

        // Jobs
        this.boardState.regionNeeds[1] = this.boardState.needs[1];

        // Electricity
        this.boardState.regionNeeds[2] = this.boardState.needs[2];

        // Get percentage boost for first 3 resources
        let satisfactionBoost = 1;
        for (let i = 0; i < 3; i++) {

            // Skip if needs = 0
            if (this.boardState.regionNeeds[i] == 0) continue;

            // Get 0% to 150%
            let categorySatisfaction = this.boardState.resources[i] / this.boardState.regionNeeds[i];
            categorySatisfaction = mathUtils.clamp(categorySatisfaction, 0, 1.5);

            // Multiply by base region boost
            let categoryBonus = 0;
            if (!isNaN(categorySatisfaction)) categoryBonus = categorySatisfaction * this.edictCache.regionBoost;
            
            // Add to running total
            satisfactionBoost += categoryBonus;
        }

        //#region Scenery
        let tileCount = Math.pow(this.worldSettings.boardSize - 2, 2);
        let resources = this.boardState.resources[3];

        let avgRating = (resources / tileCount);
        avgRating *= 3;
        this.boardState.resources[3] = avgRating;
        this.boardState.regionNeeds[3] = 1 * this.edictCache.needsOffset[3]; // Goal is 1 per tile

        let sceneryBoost = mathUtils.clamp(avgRating, 0, 1.5);
        sceneryBoost = sceneryBoost * this.edictCache.regionBoost;
        satisfactionBoost += sceneryBoost;
        //#endregion

        this.boardState.satisfactionBoost = satisfactionBoost;
    }
    //#endregion

    #countRoadlessBuildings() {

        this.roadlessBuildings = this.roadlessBuildingsCache.reduce((a, b) => b + a, 0);
        this.roadlessBuildingsCache = new Array(this.chunkCount).fill(0);
    }

    #calculatePerBuildingProduction() {

        for (let i = 0; i < BUILDING_DATA.length; i++) {

            let perBuildingEarnings = this.perBuildingEarningCache[i].reduce((a, b) => b + a, 0);
            let perBuildingPop = this.perBuildingPopCache[i].reduce((a, b) => b + a, 0);

            this.boardState.perBuildingEarnings[i] = perBuildingEarnings;
            this.boardState.perBuildingPop[i] = perBuildingPop;
        }
        this.perBuildingEarningCache = Array.from(Array(BUILDING_DATA.length), () => []);
        this.perBuildingPopCache = Array.from(Array(BUILDING_DATA.length), () => []);
    }
    //#endregion

    //#region Player functions
    updateInventory() {

        let buildingCount = this.player.buildingsOwned.length;
        let inventory = new Array(BUILDING_DATA.length).fill(0);

        for (let i = 0; i < buildingCount; i++) {

            let tally = this.player.buildingsOwned[i];
            tally -= this.boardState.buildingsPlaced[i];
            inventory[i] = tally;
        }
        this.player.achievements.checkTowersPlaced(this.boardState.buildingsPlaced);
        this.player.achievements.checkPathsPlaced(this.boardState.pathsPlaced);
        this.player.towerInventory = inventory;
    }

    returnCanPurchaseBuilding(buildingId, quantity) {

        return (this.player.balance >= mathUtils.returnBuildingPrice(buildingId, quantity));
    }

    updatePlayerBalance() {

        let timeNow = Date.now();
        let timeLast = Math.min((timeNow - this.player.timeOfLastUpdate) / 1000, MAX_TIME_AWAY_EARNING);
        let earned = this.player.earnings * timeLast;

        if (timeLast < 1000) this.stats.playTime += timeLast;
        this.player.balance += earned;
        this.stats.totalEarnings += earned;
        this.player.timeOfLastUpdate = timeNow;
        this.player.achievements.checkEarnings(this.stats.totalEarnings, this.stats.rockEarnings);
    }

    earnClick() {

        let earned = this.boardState.population;
        earned *= this.boardState.satisfactionBoost;
        
        for (let i = 0; i < this.player.activeEffects.length; i++) {

            if (this.player.activeEffects[i].code == "boostclick") earned *= BOOST_CLICK_MULT;
        }

        this.player.balance += earned;
        this.stats.rockEarnings += earned;
        this.stats.totalEarnings += earned;

        this.stats.rockClicks++;
        this.player.achievements.checkRockClicks(gameState.stats.rockClicks);
    }

    addMoneySum() {

        let addAmount = 0;
        addAmount = Math.min(this.player.balance * 2, this.player.earnings * 600);
        addAmount = Math.max(1500, addAmount);
        this.player.balance += addAmount;
        this.stats.totalEarnings += addAmount;
    }

    returnTutorialState() {

        // If result is true, show hint
        return {
            clickRock: this.stats.rockClicks == 0,
            buyFirstBuilding: this.player.balance >= BUILDING_DATA[0].price && this.player.buildingsOwned[0] == 0,
            placeFirstBuilding: !this.player.achievements.towerPlaced[0] && this.player.buildingsOwned[0] > 0,
            boostedFirst: !this.player.achievements.buffedTower && this.player.buildingsOwned[1] > 0
        }
    }
    //#endregion

    //#region Boardspace checks
    #checkIfBordersPath(x, y) {

        if      (this.boardState.boardMap[x + 1][y].type == "path") return true;
        else if (this.boardState.boardMap[x - 1][y].type == "path") return true;
        else if (this.boardState.boardMap[x][y + 1].type == "path") return true;
        else if (this.boardState.boardMap[x][y - 1].type == "path") return true;
        else return false;
    }

    #getHighestBorderPath(x, y) {

        let highestPath = 0;
        if (this.boardState.boardMap[x + 1][y].type == "path" && this.boardState.boardMap[x + 1][y].metaData.pathId > highestPath) highestPath = this.boardState.boardMap[x + 1][y].metaData.pathId;
        if (this.boardState.boardMap[x - 1][y].type == "path" && this.boardState.boardMap[x - 1][y].metaData.pathId > highestPath) highestPath = this.boardState.boardMap[x - 1][y].metaData.pathId;
        if (this.boardState.boardMap[x][y + 1].type == "path" && this.boardState.boardMap[x][y + 1].metaData.pathId > highestPath) highestPath = this.boardState.boardMap[x][y + 1].metaData.pathId;
        if (this.boardState.boardMap[x][y - 1].type == "path" && this.boardState.boardMap[x][y - 1].metaData.pathId > highestPath) highestPath = this.boardState.boardMap[x][y - 1].metaData.pathId;
        return highestPath;
    }

    returnIfTowerEmpty(coord) {

        let existingTile = this.boardState.boardMap[coord.x][coord.y].type;

        return !(existingTile == "tower" || existingTile == "path" || existingTile == "scenery");
    }

    returnIfLandmarkEmpty(coord) {

        return (this.boardState.boardMap[coord.x][coord.y].type != "landmark");
    }

    returnCanPlaceOnTerrain(coord, terrain) {

        if (coord.x == 0 || coord.x >= this.worldSettings.boardSize - 1 || coord.y == 0 || coord.y >= this.worldSettings.boardSize - 1) return false;

        if (terrain == "all") return true;

        let indexTerrain = this.environment.ground[coord.y][coord.x];
        if (terrain == "land" && indexTerrain > 2) return true;
        else if (terrain == "water" && indexTerrain < 2) return true;
        else if (terrain == "shore" && indexTerrain == 2) return true;
        else if (terrain == "shorewater" && indexTerrain <= 3) return true;
        else if (terrain == "shoreland" && indexTerrain >= 2) return true;
        else if (terrain == "grass" && indexTerrain >= 4) return true;
        else return false;
    }
    //#endregion

    //#region Meteors
    handleMeteorSpawn() {

        if ((Date.now() - this.player.timeOfLastUpdate) / 1000 > 1) return;
        let spawnTime = this.edictCache.meteorSpawnTime;

        let timeLast = (Date.now() - this.environment.lastMeteor) / 1000;
        if (timeLast >= spawnTime / 2) {

            let spawnChance = 0.016 / (spawnTime / 2);

            let trySpawn = Math.random() >= 1 - spawnChance;
            let forceSpawn = timeLast >= spawnTime;

            if (trySpawn || forceSpawn) {

                boardUtils.spawnMeteor();
                this.environment.lastMeteor = Date.now();
            }
        }
    }
    tickDownMeteors() {

        if (this.environment.meteors.length == 0) return;

        let timeDiff = (Date.now() - this.player.timeOfLastUpdate) / 1000;
        for (let i = this.environment.meteors.length - 1; i >= 0; i--) {

            let meteor = this.environment.meteors[i];
            meteor.lifetime -= timeDiff;

            if (meteor.lifetime <= 0) {

                this.destroyMeteor(i);
                drawBoard.drawObjectCanvas(meteor);
            }
        }
    }

    destroyMeteor(index) {

        this.environment.meteors.splice(index, 1);
    }

    tickDownEffects() {

        if (this.player.activeEffects.length == 0) return;

        let timeDiff = (Date.now() - this.player.timeOfLastUpdate) / 1000;
        for (let i = this.player.activeEffects.length - 1; i >= 0; i--) {

            let effect = this.player.activeEffects[i];
            effect.lifetime -= timeDiff;

            if (effect.code == "addsum") {

                this.addMoneySum();
                this.destroyEffect(i);
                continue;
            }
            if (effect.lifetime <= 0) this.destroyEffect(i);
        }
    }

    addEffect(effect) {

        this.player.activeEffects.push(effect);
    }

    destroyEffect(index) {

        this.player.activeEffects.splice(index, 1);
    }
    //#endregion

    //#region Weather
    returnWeatherValue() {

        let state, interpolate;
        let weatherState = this.worldSettings.weatherState;
        for (let i = 0; i < WEATHER_THRESHOLDS.length - 1; i++) {
    
            if (weatherState > WEATHER_THRESHOLDS[i]) {
    
                state = i + 1;
                interpolate = (weatherState - WEATHER_THRESHOLDS[i]) / (WEATHER_THRESHOLDS[i + 1] - WEATHER_THRESHOLDS[i]);
            }
        }
        return {state: state, interpolate: interpolate};
    }
    //#endregion
}

class MeteorPowerup{
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.effect = this.#randomPowerup();
        this.lifetime = METEOR_DESPAWN;
    }

    #randomPowerup() {
        
        let randIndex = Math.floor(Math.random() * ACTIVE_EFFECTS.length);
        let effect = ACTIVE_EFFECTS[randIndex];

        if (tempSettings.usingMobile) mathUtils.mobileDeepCopy(effect);
        else return structuredClone(effect);
    }
}

class MapCache{
    constructor(mapSize) {

        this.marchCache = new Array(mapSize).fill().map(() => Array(mapSize).fill(0));
    }
}

class BuildingEffect {
    constructor(effectCoords, boostBonus, populationBonus) {

        this.effectCoords = effectCoords;
        this.boostBonus = boostBonus;
        this.populationBonus = populationBonus;
    }
}

class BuildingFX {
    constructor(
        isLightSource, lightStrength, lightColor,
        isMarching, marchingType, marchingIndex,
        isSoundSource, soundType) {

        this.isLightSource = isLightSource; // Emits light?
        this.lightStrength = lightStrength; // Light strength
        this.lightColor = lightColor;       // Light color (deprecated)

        this.isMarching = isMarching;       // Is sprite marched?
        this.marchingType = marchingType;   // What type of marching (path, square, horizontal)
        this.marchingIndex = marchingIndex; // Sprite sheet (deprecated)

        this.isSoundSource = isSoundSource;
        this.soundType = soundType;
    }
}

class BuildingResource {
    constructor(food, jobs, power, scenery) {

        this.count = [food, jobs, power, scenery];
    }
}

class BuildingNeeds {
    constructor(food, jobs, power, scenery) {

        this.count = [food, jobs, power, scenery]
    }
}

class GameSettings{
    constructor(load) {

        let loadNull = (load === undefined);

        //#region Board toggle
        if (loadNull || load.showBuff === undefined) this.showBuff = false;
        else this.showBuff = load.showBuff;

        if (loadNull || load.showGrid === undefined) this.showGrid = true;
        else this.showGrid = load.showGrid;
        //#endregion

        //#region Effects
        if (loadNull || load.freezeTime === undefined) this.freezeTime = false;
        else this.freezeTime = load.freezeTime;

        if (loadNull || load.drawLights === undefined) this.drawLights = true;
        else this.drawLights = load.drawLights;

        if (loadNull || load.lightRes === undefined) this.lightRes = 32;
        else this.lightRes = load.lightRes;

        if (loadNull || load.drawWeather === undefined) this.drawWeather = true;
        else this.drawWeather = load.drawWeather;

        if (loadNull || load.drawLightning === undefined) this.drawLightning = true;
        else this.drawLightning = load.drawLightning;

        if (loadNull || load.drawReflections === undefined) this.drawReflections = true;
        else this.drawReflections = load.drawReflections;
        //#endregion

        //#region Sound
        if (loadNull || load.volumeUI === undefined) this.volumeUI = 0.2;
        else this.volumeUI = load.volumeUI;

        if (loadNull || load.volumeAmb === undefined) this.volumeAmb = 0.2;
        else this.volumeAmb = load.volumeAmb;
        //#endregion

        if (loadNull || load.autoSave === undefined) this.autoSave = true;
        else this.autoSave = load.autoSave;

        if (loadNull || load.debugMode === undefined) this.debugMode = false;
        else this.debugMode = load.debugMode;

        if (loadNull || load.showFps === undefined) this.showFps = true;
        else this.showFps = load.showFps;

        if (loadNull || load.showHints === undefined) this.showHints = true;
        else this.showHints = load.showHints;

        if (loadNull || load.showTicker === undefined) this.showTicker = true;
        else this.showTicker = load.showTicker;

        if (loadNull || load.guiSize === undefined) this.guiSize = "medium";
        else this.guiSize = load.guiSize;

        if (loadNull || load.lastEdictPage === undefined) this.lastEdictPage = 0;
        else this.lastEdictPage = load.lastEdictPage;

        if (loadNull || load.realResourceNumbers === undefined) this.realResourceNumbers = false;
        else this.realResourceNumbers = load.realResourceNumbers;

        if (loadNull || load.mapBorder === undefined) this.mapBorder = "wood-fancy";
        else this.mapBorder = load.mapBorder;

        //#region Temp settings
        this.cursorState = "none";
        this.placeType = "building";

        this.selBuilding = 0;
        this.selTier = 0;
        this.buyQuantity = 1;
        //#endregion
    }
}

class TempSettings{

    constructor() {

        this.browser = fluffUtils.findBrowser(navigator.userAgent);
        this.rightClickOperaWarned = false;

        this.usingMobile = this.checkIfMobile();
        this.mobileWarned = false;
    }

    checkIfMobile() {

        let hasTouchScreen = false;
        if ("maxTouchPoints" in navigator) {
          hasTouchScreen = navigator.maxTouchPoints > 0;
        } else if ("msMaxTouchPoints" in navigator) {
          hasTouchScreen = navigator.msMaxTouchPoints > 0;
        } else {
          const mQ = matchMedia?.("(pointer:coarse)");
          if (mQ?.media === "(pointer:coarse)") {
            hasTouchScreen = !!mQ.matches;
          } else if ("orientation" in window) {
            hasTouchScreen = true; // deprecated, but good fallback
          } else {
            // Only as a last resort, fall back to user agent sniffing
            const UA = navigator.userAgent;
            hasTouchScreen =
              /\b(BlackBerry|webOS|iPhone|IEMobile)\b/i.test(UA) ||
              /\b(Android|Windows Phone|iPad|iPod)\b/i.test(UA);
          }
        }

        return hasTouchScreen;
    }
}

class AchievementHandler{
    constructor(load) {

        let loadNull = (load === undefined);

        //#region Multiples
        //#region Total earnings
        if (loadNull || 
            load.earnings === undefined || 
            load.earnings.length != ACH_DATA_TOTALEARNINGS.length)
            this.earnings = new Array(ACH_DATA_TOTALEARNINGS.length).fill(false);
        else this.earnings = load.earnings;
        //#endregion

        //#region Total click earnings
        if (loadNull || 
            load.clickEarnings === undefined || 
            load.clickEarnings.length != ACH_DATA_ROCKEARNINGS.length) 
            this.clickEarnings = new Array(ACH_DATA_ROCKEARNINGS.length).fill(false);
        else this.clickEarnings = load.clickEarnings;
        //#endregion

        //#region Rock clicks
        if (loadNull || 
            load.rockClicks === undefined || 
            load.rockClicks.length != ACH_DATA_TOTALCLICKS.length) 
            this.rockClicks = new Array(ACH_DATA_TOTALCLICKS.length).fill(false);
        else this.rockClicks = load.rockClicks;
        //#endregion

        //#region Buildings owned
        if (loadNull || 
            load.pathsPlaced === undefined || 
            load.pathsPlaced.length != ACH_DATA_PATHSPLACED.length) 
            this.pathsPlaced = new Array(ACH_DATA_PATHSPLACED.length).fill(false);
        else this.pathsPlaced = load.pathsPlaced;
        //#endregion

        //#region Place x towers
        if (loadNull || 
            load.towerPlaced === undefined || 
            load.towerPlaced.length != ACH_DATA_TOWERSPLACED.length) 
            this.towerPlaced = new Array(ACH_DATA_TOWERSPLACED.length).fill(false);
        else this.towerPlaced = load.towerPlaced;
        //#endregion

        //#region Region Population
        if (loadNull || 
            load.population === undefined || 
            load.population.length != ACH_DATA_POPULATION.length) 
            this.population = new Array(ACH_DATA_POPULATION.length).fill(false);
        else this.population = load.population;
        //#endregion

        //#region X Boost Tile
        if (loadNull || 
            load.tileBoost === undefined || 
            load.tileBoost.length != ACH_DATA_TILEBOOST.length) 
            this.tileBoost = new Array(ACH_DATA_TILEBOOST.length).fill(false);
        else this.tileBoost = load.tileBoost;
        //#endregion

        //#region Meteor clicks
        if (loadNull || 
            load.meteorClicks === undefined || 
            load.meteorClicks.length != ACH_DATA_METEORCLICKS.length) 
            this.meteorClicks = new Array(ACH_DATA_METEORCLICKS.length).fill(false);
        else this.meteorClicks = load.meteorClicks;
        //#endregion

        //#region Edicts finished
        if (loadNull || 
            load.edictsFinished === undefined || 
            load.edictsFinished.length != ACH_DATA_EDICTSFINISHED.length) 
            this.edictsFinished = new Array(ACH_DATA_EDICTSFINISHED.length).fill(false);
        else this.edictsFinished = load.edictsFinished;
        //#endregion
        //#endregion

        //#region Singles
        // Removed a landmark
        if (loadNull || load.removedLandmark === undefined) this.removedLandmark = false;
        else this.removedLandmark = load.removedLandmark;

        // Removed a tower
        if (loadNull || load.removedTower === undefined) this.removedTower = false;
        else this.removedTower = load.removedTower;

        // Change region name
        if (loadNull || load.changedName === undefined) this.changedName = false;
        else this.changedName = load.changedName;

        // Buffed tower
        if (loadNull || load.buffedTower === undefined) this.buffedTower = false;
        else this.buffedTower = load.buffedTower;

        // Inspected tile
        if (loadNull || load.inspectedTile === undefined) this.inspectedTile = false;
        else this.inspectedTile = load.inspectedTile;

        // Placed Scenery
        if (loadNull || load.placedScenery === undefined) this.placedScenery = false;
        else this.placedScenery = load.placedScenery;
        //#endregion
    }

    countAchievements() {
        
        let total = 0, unlocked = 0;
        for (let key of Object.entries(this)) {

            if (!Array.isArray(key[1])) {

                total++
                if (key[1]) unlocked++;
                continue;
            }

            for (let i = 0; i < key[1].length; i++) {

                total++;
                if (key[1][i]) unlocked++;
            }
        }
        return {total: total, unlocked: unlocked};
    }

    //#region Multiples
    checkEarnings(totalEarnings, clickEarnings) {

        for (let i = 0; i < ACH_DATA_TOTALEARNINGS.length; i++) {

            if (this.earnings[i]) continue;
            if (totalEarnings >= ACH_DATA_TOTALEARNINGS[i].thresh) {

                this.earnings[i] = true;
                drawContextualUI.achievementQueue.push(ACH_DATA_TOTALEARNINGS[i]);
            }
            else break;
        }

        for (let i = 0; i < ACH_DATA_ROCKEARNINGS.length; i++) {

            if (this.clickEarnings[i]) continue;
            if (clickEarnings >= ACH_DATA_ROCKEARNINGS[i].thresh) {

                this.clickEarnings[i] = true;
                drawContextualUI.achievementQueue.push(ACH_DATA_ROCKEARNINGS[i]);
            }
            else break;
        }
    }

    checkRockClicks(amount) {

        for (let i = 0; i < ACH_DATA_TOTALCLICKS.length; i++) {

            if (this.rockClicks[i]) continue;
            if (amount >= ACH_DATA_TOTALCLICKS[i].thresh) {

                this.rockClicks[i] = true;
                drawContextualUI.achievementQueue.push(ACH_DATA_TOTALCLICKS[i]);
            }
            else break;
        }
    }

    checkPathsPlaced(paths) {

        let amount = 0;
        for (let i = 0; i < paths.length; i++) {

            amount += paths[i];
        }

        for (let i = 0; i < ACH_DATA_PATHSPLACED.length; i++) {

            if (this.pathsPlaced[i]) continue;
            if (amount >= ACH_DATA_PATHSPLACED[i].thresh) {

                this.pathsPlaced[i] = true;
                drawContextualUI.achievementQueue.push(ACH_DATA_PATHSPLACED[i]);
            }
            else break;
        }
    }

    checkTowersPlaced(towers) {

        let amount = 0;
        for (let i = 0; i < towers.length; i++) {

            amount += towers[i];
        }

        for (let i = 0; i < ACH_DATA_TOWERSPLACED.length; i++) {

            if (this.towerPlaced[i]) continue;
            if (amount >= ACH_DATA_TOWERSPLACED[i].thresh) {

                this.towerPlaced[i] = true;
                drawContextualUI.achievementQueue.push(ACH_DATA_TOWERSPLACED[i]);
            }
            else break;
        }
    }

    checkPopulation(amount) {

        for (let i = 0; i < ACH_DATA_POPULATION.length; i++) {

            if (this.population[i]) continue;
            if (amount >= ACH_DATA_POPULATION[i].thresh) {
                
                this.population[i] = true;
                drawContextualUI.achievementQueue.push(ACH_DATA_POPULATION[i]);
            }
            else break;
        }
    }

    checkTileBoost(amount) {

        for (let i = 0; i < ACH_DATA_TILEBOOST.length; i++) {

            if (this.tileBoost[i]) continue;
            if (amount >= ACH_DATA_TILEBOOST[i].thresh) {
                
                this.tileBoost[i] = true;
                drawContextualUI.achievementQueue.push(ACH_DATA_TILEBOOST[i]);
            }
            else break;
        }
    }

    checkMeteorClicks(amount) {

        for (let i = 0; i < ACH_DATA_METEORCLICKS.length; i++) {

            if (this.meteorClicks[i]) continue;
            if (amount >= ACH_DATA_METEORCLICKS[i].thresh) {
                
                this.meteorClicks[i] = true;
                drawContextualUI.achievementQueue.push(ACH_DATA_METEORCLICKS[i]);
            }
            else break;
        }
    }

    checkEdictsFinished(edicts) {

        for (let i = 0; i < ACH_DATA_EDICTSFINISHED.length; i++) {

            if (this.edictsFinished[i]) continue;
            if (edicts.hasEdict(ACH_DATA_EDICTSFINISHED[i].thresh)) {

                this.edictsFinished[i] = true;
                drawContextualUI.achievementQueue.push(ACH_DATA_EDICTSFINISHED[i]);
            }
        }
    }
    //#endregion

    //#region Singles
    checkRemoveLandmark() {

        if (this.removedLandmark) return;
        else {

            this.removedLandmark = true;
            drawContextualUI.achievementQueue.push(ACH_DATA_SINGLES[0]);
        }
    }

    checkRemoveTower() {

        if (this.removedTower) return;
        else {

            this.removedTower = true;
            drawContextualUI.achievementQueue.push(ACH_DATA_SINGLES[1]);
        }
    }

    checkChangeName() {

        if (this.changedName) return;
        else {

            this.changedName = true;
            drawContextualUI.achievementQueue.push(ACH_DATA_SINGLES[2]);
        }
    }

    checkBuffedTower() {

        if (this.buffedTower) return;
        else {

            this.buffedTower = true;
            drawContextualUI.achievementQueue.push(ACH_DATA_SINGLES[3]);
        }
    }

    checkInspectedTile() {

        if (this.inspectedTile) return;
        else {

            this.inspectedTile = true;
            drawContextualUI.achievementQueue.push(ACH_DATA_SINGLES[4]);
        }
    }

    checkSceneryPlaced() {

        if (this.placedScenery) return;
        else {

            this.placedScenery = true;
            drawContextualUI.achievementQueue.push(ACH_DATA_SINGLES[5]);
        }
    }
    //#endregion
}

class EdictHandler {
    constructor(load) {

        let loadNull = (load === undefined);

        if (loadNull || load.edictKeys === undefined) this.edictKeys = {};
        else this.edictKeys = load.edictKeys;
    }

    addEdict(key) {

        this.edictKeys[key] = true;
    }

    hasEdict(key) {

        return this.edictKeys.hasOwnProperty(key);
    }

    checkIfPurchasable(iconData) {

        for (let i = 0; i < iconData.requires.length; i++) {

            if (!this.hasEdict(iconData.requires[i])) return false;
        }
        return true;
    }

    returnEdictState(iconData) {

        if (this.hasEdict(iconData.key)) return "bought";
        else if (this.checkIfPurchasable(iconData)) return "buyable";
        else return "locked";
    }
}

class EdictCache {
    constructor() {

        if (tempSettings.usingMobile) {

            this.affectedBuildingResources = mathUtils.mobileDeepCopy(BUILDING_DATA);
            this.affectedPathResources = mathUtils.mobileDeepCopy(PATH_DATA);
            this.resourceBase = mathUtils.mobileDeepCopy(RESOURCE_BASES);
        }
        else {

            this.affectedBuildingResources = structuredClone(BUILDING_DATA);
            this.affectedPathResources = structuredClone(PATH_DATA);
            this.resourceBase = structuredClone(RESOURCE_BASES);
        }
        this.needsOffset = new Array(4).fill(1);
        this.regionBoost = REGION_BOOST_BASE;

        this.landmarkScenery = LANDMARK_SCENERY_VALUE;
        this.meteorSpawnTime = METEOR_SPAWNTIME;
    }
    
    resetResources() {

        if (tempSettings.usingMobile) {

            this.affectedBuildingResources = mathUtils.mobileDeepCopy(BUILDING_DATA);
            this.affectedPathResources = mathUtils.mobileDeepCopy(PATH_DATA);
            this.resourceBase = mathUtils.mobileDeepCopy(RESOURCE_BASES);
        }
        else {

            this.affectedBuildingResources = structuredClone(BUILDING_DATA);
            this.affectedPathResources = structuredClone(PATH_DATA);
            this.resourceBase = structuredClone(RESOURCE_BASES);
        }
        this.needsOffset = new Array(4).fill(1);
        this.regionBoost = REGION_BOOST_BASE;

        this.landmarkScenery = LANDMARK_SCENERY_VALUE;
        this.meteorSpawnTime = METEOR_SPAWNTIME;
    }

    processResourceChange(type, id, resource, change) {

        if (type == "tower") this.affectedBuildingResources[id].resource.count[resource] *= change;
        else if (type == "path") this.affectedPathResouces[id].resource.count[resource] *= change;
        else if (type == "landmark") this.landmarkScenery *= change;
    }

    processNeedsChange(type, id, resource, change) {

        if (type == "tower") this.affectedBuildingResources[id].needs.count[resource] *= change;
        else if (type == "path") this.affectedPathResouces[id].needs.count[resource] *= change;
    }

    changeResourceBase(resource, change) {

        this.resourceBase[resource] *= change;
    }

    changeNeedsOffset(resource, change) {

        this.needsOffset[resource] *= change;
    }

    changeHappinessBoost(change) {

        this.regionBoost *= change;
    }

    processEdictChanges(edicts) {

        this.resetResources();

        //#region Tier 1
        // Increase food production
        if (edicts.hasOwnProperty("forager-1")) this.processResourceChange("tower", 0, 0, 1.25);
        if (edicts.hasOwnProperty("cultivator-1")) this.processResourceChange("tower", 1, 0, 1.25);
        if (edicts.hasOwnProperty("hunter-1")) this.processResourceChange("tower", 3, 0, 1.25);
        if (edicts.hasOwnProperty("fishing-hut-1")) this.processResourceChange("tower", 4, 0, 1.25);

        // Reduce global food needs
        if (edicts.hasOwnProperty("all-food-1")) this.changeNeedsOffset(0, 0.95);

        // Increase worker production
        if (edicts.hasOwnProperty("cave-hut-1")) this.processResourceChange("tower", 2, 1, 1.5);
        if (edicts.hasOwnProperty("settlement-1")) this.processResourceChange("tower", 6, 1, 1.5);

        // Increase beauty
        if (edicts.hasOwnProperty("firepit-1")) this.processResourceChange("tower", 7, 3, 0.5);

        // Reduce global worker needs
        if (edicts.hasOwnProperty("all-worker-1")) this.changeNeedsOffset(1, 0.95);

        // Increase region happiness boost
        if (edicts.hasOwnProperty("happy-boost-1")) this.changeHappinessBoost(2);
        //#endregion

        //#region Tier 2
        // Food
        if (edicts.hasOwnProperty("rancher-1")) this.processResourceChange("tower", 8, 0, 1.25);
        if (edicts.hasOwnProperty("farmland-1")) this.processResourceChange("tower", 11, 0, 1.25);
        if (edicts.hasOwnProperty("trawler-1")) this.processResourceChange("tower", 12, 0, 1.25);

        // More beauty
        if (edicts.hasOwnProperty("stone-mason-1")) this.processResourceChange("tower", 9, 3, 0.5);
        if (edicts.hasOwnProperty("rancher-2")) this.processResourceChange("tower", 8, 3, 0.5);

        // Less workers
        if (edicts.hasOwnProperty("lumberjack-1")) this.processResourceChange("tower", 13, 1, 0.6);

        // Increase region happiness boost
        if (edicts.hasOwnProperty("happy-boost-2")) this.changeHappinessBoost(2);
        //#endregion

        //#region Tier 3
        // Boost all water food buildings
        if (edicts.hasOwnProperty("water-food-1")) {

            this.processResourceChange("tower", 4, 0, 1.25);
            this.processResourceChange("tower", 12, 0, 1.25);
            this.processResourceChange("tower", 16, 0, 1.25);
            this.processResourceChange("tower", 26, 0, 1.25);
            this.processResourceChange("tower", 34, 0, 1.25);
        }

        // Boost all land food buildings
        if (edicts.hasOwnProperty("land-food-1")) {

            this.processResourceChange("tower", 0, 0, 1.15);
            this.processResourceChange("tower", 1, 0, 1.15);
            this.processResourceChange("tower", 3, 0, 1.15);

            this.processResourceChange("tower", 8, 0, 1.15);
            this.processResourceChange("tower", 11, 0, 1.15);
            this.processResourceChange("tower", 14, 0, 1.15);

            this.processResourceChange("tower", 25, 0, 1.15);
            this.processResourceChange("tower", 28, 0, 1.15);

            this.processResourceChange("tower", 35, 0, 1.15);
            this.processResourceChange("tower", 39, 0, 1.15);
        }

        // Charcoaler beauty
        if (edicts.hasOwnProperty("charcoaler-1")) this.processResourceChange("tower", 19, 3, 0.5);

        // Reduce global beauty needs
        if (edicts.hasOwnProperty("all-beauty-1")) this.changeNeedsOffset(3, 0.90);

        // Stoneworks reduce workers
        if (edicts.hasOwnProperty("stoneworks-1")) this.processResourceChange("tower", 22, 1, 0.75);

        // Reduce global worker needs
        if (edicts.hasOwnProperty("all-worker-2")) this.changeNeedsOffset(1, 0.90);

        // Cheaper paths
        if (edicts.hasOwnProperty("cheaper-paths")) {
            for (let i = 0; i < this.affectedPathResources.length; i++) {
                this.affectedPathResources[i].price *= 0.5;
            }
        }

        // Increase region happiness boost
        if (edicts.hasOwnProperty("happy-boost-3")) this.changeHappinessBoost(2);
        //#endregion

        //#region Tier 4
        // Increase beauty
        if (edicts.hasOwnProperty("colosseum-1")) this.processResourceChange("tower", 24, 3, 1.25);
        if (edicts.hasOwnProperty("town-house-1")) this.processResourceChange("tower", 27, 3, 1.25);
        if (edicts.hasOwnProperty("manor-1")) this.processResourceChange("tower", 31, 3, 1.25);

        // Landmark beauty
        if (edicts.hasOwnProperty("landmark-beauty-1")) this.processResourceChange("landmark", 0, 0, 1.5);

        // Power
        if (edicts.hasOwnProperty("windmill-1")) this.processResourceChange("tower", 28, 2, 1.5);
        if (edicts.hasOwnProperty("all-power-1")) this.changeNeedsOffset(2, 0.90);

        // Food
        if (edicts.hasOwnProperty("brewery-1")) this.processResourceChange("tower", 25, 0, 1.5);
        if (edicts.hasOwnProperty("galleon-1")) this.processResourceChange("tower", 26, 0, 1.5);
        if (edicts.hasOwnProperty("all-food-2")) this.changeNeedsOffset(0, 0.9);

        // Increase region happiness boost
        if (edicts.hasOwnProperty("happy-boost-4")) this.changeHappinessBoost(2);
        //#endregion

        //#region Tier 5
        // Reduce negative beauty
        if (edicts.hasOwnProperty("powerplant-1")) this.processResourceChange("tower", 32, 3, 0.7);
        if (edicts.hasOwnProperty("canning-plant-1")) this.processResourceChange("tower", 39, 3, 0.7);

        // Reduce building costs
        if (edicts.hasOwnProperty("building-cost-1")) {

            for (let i = 0; i < this.affectedBuildingResources.length; i++) this.affectedBuildingResources[i].price *= 0.9;
            if (buttonList.children.length == 8) drawUI.drawBuildingButtons(true);
        }
        // Increase meteor spawn
        if (edicts.hasOwnProperty("meteor-spawn-1")) this.meteorSpawnTime *= 0.75;

        // Power
        if (edicts.hasOwnProperty("powerplant-2")) this.processResourceChange("tower", 32, 2, 1.5);
        if (edicts.hasOwnProperty("lighthouse-1")) this.processNeedsChange("tower", 33, 2, 0.75);
        if (edicts.hasOwnProperty("apartment-1")) this.processNeedsChange("tower", 36, 2, 0.75);
        if (edicts.hasOwnProperty("townhall-1")) this.processNeedsChange("tower", 38, 2, 0.75);

        // Increase region happiness boost
        if (edicts.hasOwnProperty("happy-boost-5")) this.changeHappinessBoost(2);
        //#endregion
    }
}

class BoardTile{

    constructor(type) {

        this.type = type;
        this.metaData = {};
    }

    createTowerData(x, y, buildingId) {

        this.metaData.x = x;
        this.metaData.y = y;
        this.metaData.buildingId = buildingId;

        this.metaData.population = 0;
        this.metaData.earnings = 0;
        this.metaData.bordersPath = false;
        this.metaData.boostBonus = 100;

        this.metaData.resource = new Array(4).fill(0);
        this.metaData.needs = new Array(4).fill(0);
    }

    createLandmarkData(x, y, landmarkType, landmarkId) {

        this.metaData.x = x;
        this.metaData.y = y;
        this.metaData.landmarkType = landmarkType;
        this.metaData.landmarkId = landmarkId;

        this.metaData.resource = new Array(4).fill(0);
    }

    createPathData(x, y, pathId) {

        this.metaData.x = x;
        this.metaData.y = y;
        this.metaData.pathId = pathId;
        this.marchCache = 0;

        this.metaData.resource = new Array(4).fill(0);
        this.metaData.needs = new Array(4).fill(0);
    }

    createSceneryData(x, y, sceneryId) {

        this.metaData.x = x;
        this.metaData.y = y;
        this.metaData.sceneryId = sceneryId;
        this.marchCache = 0;

        this.metaData.resource = new Array(4).fill(0);
        this.metaData.needs = new Array(4).fill(0);
    }
}

class MapGenerator{
    constructor(mapSize, compressionFactor, landmarkDensity, seed, waterLevel, moistureLevel) {

        this.mapSize = mapSize;
        this.compressionFactor = compressionFactor;
        this.landmarkDensity = landmarkDensity / 1.5;

        if (seed === undefined) this.seed = Math.random();
        else this.seed = seed;

        this.tileValues = [10, 18, 28, 38, 53, 88, 98];
        this.landmarkChance = [0.025, 0.05, 0.075, 0.1, 0.1, 0.25, 0.65];
        
        this.valueMap = new Array(this.mapSize).fill().map(() => Array(this.mapSize).fill(0));
        this.envMap = new Array(this.mapSize).fill().map(() => Array(this.mapSize).fill(0));

        if (landmarkDensity !== undefined) this.#editLandmarkChance(this.landmarkDensity);
        this.#editTileValues(this.compressionFactor, waterLevel, moistureLevel);
    }

    #editTileValues(compressionFactor, waterLevel, moistureLevel) {

        // Make smaller rivers when map comression lower
        if (compressionFactor < 2) {

            let shrinkFactor = 2 / compressionFactor;
            for (let i = 0; i < this.tileValues.length; i++) {

                this.tileValues[i] /= shrinkFactor;
            }
        }

        if (waterLevel !== undefined) {

            let waterFactor = (1 - waterLevel) * 20;
            for (let i = 0; i < this.tileValues.length; i++) {

                this.tileValues[i] -= waterFactor;
            }
        }

        if (moistureLevel !== undefined) {

            for (let i = 3; i < 7; i++) {

                this.tileValues[i] /= moistureLevel;
            }
        }
    }

    #editLandmarkChance(value) {

        for (let i = 0; i < this.landmarkChance.length; i++) {
            
            this.landmarkChance[i] *= value;
        }
    }

    generateMap() {

        noise.seed(this.seed);
        let envArray = new Array(this.mapSize).fill().map(() => Array(this.mapSize).fill(0));

        for (let y = 0; y < this.mapSize; y++) {
            for (let x = 0; x < this.mapSize; x++) {

                let value = noise.simplex2(((y + 10) * this.compressionFactor) / 100, ((x + 10) * this.compressionFactor) / 100);
                value = Math.abs(value * 100);
                
                let id = this.tileValues.length - 1;
                for (let i = 0; i < this.tileValues.length; i++) {

                    if (value <= this.tileValues[i]) {

                        id = i;
                        break;
                    }
                }
                this.valueMap[x][y] = value;
                envArray[x][y] = id;
            }
        }
        this.envMap = envArray;
        return envArray;
    }

    generateLandmarks(boardMap) {

        for (let y = 0; y < this.mapSize; y++) {
            if (y <= 0 || y >= this.mapSize - 1) continue;

            for (let x = 0; x < this.mapSize; x++) {
                if (x <= 0 || x >= this.mapSize - 1) continue;

                let value = this.valueMap[y][x];
                let id = this.envMap[y][x];
                if (value == 0) value = this.landmarkChance[id];
                let placeLandmark = ((value * y) % 1) < this.landmarkChance[id];

                if (placeLandmark) {

                    boardMap[x][y] = new BoardTile("landmark");
                    let genLandmark = this.#returnLandmarkId(value, id, x, y);
                    boardMap[x][y].createLandmarkData(x, y, genLandmark.type, genLandmark.id);
                }
                // Keep generation identical per-seed
                // -----------------------------------------
                // Deep Water   |0| Rock (1)
                // Mid Water    |1| Rock (0, 1)
                // Shoreline    |2| Rock (0)
                // Beach        |3| Rock (2)
                // Light Grass  |4| Rock (2) Tree (0, 1)
                // Mid Grass    |5| Rock (2, 3) Tree (0, 1, 2)
                // Dark Grass   |6| Rock (2, 3) Tree (1, 2, 3)
            }
        }
    }

    #returnLandmarkId(value, id, x, y) {

        let landmarkId;
        if (id == 0) {

            landmarkId = {
                type: "r", 
                id: 1,
                x: x,
                y: y
            };
        }
        else if (id == 1) {

            let id = (value % 1 < .5) ? 0 : 1;
            landmarkId = {
                type: "r", 
                id: id,
                x: x,
                y: y
            };
        }
        else if (id == 2) {

            landmarkId = {
                type: "r", 
                id: 0,
                x: x,
                y: y
            };
        }
        else if (id == 3) {

            landmarkId = {
                type: "r", 
                id: 2,
                x: x,
                y: y
            };
        }
        else if (id == 4) {
            let type, id;
            if (value % 1 < .10) {
                
                type = "r";
                id = 2;
            }
            else {

                type = "t";
                id = (value % 1 < 0.60) ? 0 : 1;
            }
            landmarkId = {
                type: type, 
                id: id,
                x: x,
                y: y
            };
        }
        else if (id == 5) {
            let type, id;
            if (value % 1 < .05) {
                
                type = "r";
                id = (value % 1 < 0.035) ? 2 : 3;
            }
            else {

                type = "t";
                id = (value % 1 < 0.25) ? 0 : (value % 1 < 0.65) ? 1 : 2;
            }
            landmarkId = {
                type: type, 
                id: id,
                x: x,
                y: y
            };
        }
        else if (id == 6) {
            let type, id;
            if (value % 1 < .025) {
                
                type = "r";
                id = 3;
            }
            else {

                type = "t";
                id = (value % 1 < 0.60) ? 2 : 3;
            }
            landmarkId = {
                type: type, 
                id: id,
                x: x,
                y: y
            };
        }
        return landmarkId;
    }

    calculateMarchingIndicies(groundTiles) {

        let marchReference;
        if (groundTiles !== undefined) marchReference = groundTiles;
        else marchReference = this.envMap;

        let marchIndicies = new Array(this.mapSize).fill(0).map(() => Array(this.mapSize).fill(0));

        for (let x = 0; x < this.mapSize; x ++) {
            for (let y = 0; y < this.mapSize; y++) {

                marchIndicies[y][x] = 0;
                let id = marchReference[y][x];
                
                // If check would go out of bounds, skip for now
                if ((y - 1) < 0 || (y + 1) > this.mapSize - 1 || (x - 1) < 0 || (x + 1) > this.mapSize - 1) continue;

                // Check four cardinal directions
                let top = false, left = false, bottom = false, right = false;
                if (marchReference[y][x + 1] > id) right = true;   //   B  
                if (marchReference[y - 1][x] > id) top = true;     // C x A <- Counter-clockwise from here
                if (marchReference[y][x - 1] > id) left = true;    //   D  
                if (marchReference[y + 1][x] > id) bottom = true;  // Make this better
                                                   
                // Full
                let index = 0;
                if (top && left && bottom && right) index = 0;
        
                // "C" shaped
                else if (right && top && left) index = 1;
                else if (top && left && bottom) index = 2;
                else if (left && bottom && right) index = 3;
                else if (bottom && right && top) index = 4;
                
                // Corner
                else if (right && top) index = 5;
                else if (top && left) index = 6;
                else if (left && bottom) index = 7;
                else if (bottom && right) index = 8;

                // Set march index
                marchIndicies[y][x] = index;
            }
        }
        return marchIndicies;
    }
}

class PerformanceHandler{
    constructor(historyLength) {

        this.historyLength = historyLength;

        this.drawFps = new Array(historyLength).fill(0);
        this.uiFps = new Array(historyLength).fill(0);
        this.particleFps = new Array(historyLength).fill(0);

        this.functionTimes = [];
    }

    // Write performance data
    addFpsPoint(type, value) {

        if (type == "update") {

            this.drawFps.unshift(value);
            this.drawFps.pop();
        }
        else if (type == "ui") {

            this.uiFps.unshift(value);
            this.uiFps.pop();
        }
        else if (type == "particle") {

            this.particleFps.unshift(value);
            this.particleFps.pop();
        }
    }

    returnAvgFps(type) {

        if (type == "update") {

            let avg = this.drawFps.reduce(function(a, b) { return a + b; }) / this.historyLength;
            avg = Math.round((avg + Number.EPSILON) * 100) / 100;
            return avg;
        }
        else if (type == "ui") {

            let avg = this.uiFps.reduce(function(a, b) { return a + b; }) / this.historyLength;
            avg = Math.round((avg + Number.EPSILON) * 100) / 100;
            return avg;
        }
        else if (type == "particle") {

            let avg = this.particleFps.reduce(function(a, b) { return a + b; }) / this.historyLength;
            avg = Math.round((avg + Number.EPSILON) * 100) / 100;
            return avg;
        }
    }

    timeFunction(id) {

        for (let i = 0; i < this.functionTimes.length; i++) {
    
            if (this.functionTimes[i].id == id) {
    
                let time = performance.now() - this.functionTimes[i].startTime;
                this.functionTimes.splice(i, 1);
                return time;
            }
        }
        this.functionTimes.push({
            id: id,
            startTime: performance.now()
        });
    }
}

class SaveHandler {
    constructor() {
    }

    removeCacheVariables(gameSave) {

        return {
            worldSettings: gameSave.worldSettings,
            environment: gameSave.environment,
            player: gameSave.player,
            boardState: gameSave.boardState,
            stats: gameSave.stats
        };
    }

    hasExistingSave() {

        let save = JSON.parse(localStorage.getItem("regionidle-save"));
        if (save === null) return false;
        else return true;
    }

    // Export gamestate as a .json file
    // https://stackoverflow.com/questions/19721439/download-json-object-as-a-file-from-browser
    downloadSave(gameState) {

        let saveObj = {
            gameState: this.removeCacheVariables(gameState),
            saveFormat:  SAVE_FORMAT,
            gameVersion:  VERSION_STR
        };

        var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(saveObj));
        var downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href",     dataStr);
        downloadAnchorNode.setAttribute("download", gameState.player.name + ".json");
        document.body.appendChild(downloadAnchorNode); // required for firefox
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
    }

    importLocalStorage(gameSave) {

        let save = gameSave;
        let saveString = JSON.stringify(save);
        localStorage.setItem("regionidle-save", saveString);
    }

    checkSaveFormat() {

        if (!this.hasExistingSave()) return "empty";

        let saveString = localStorage.getItem("regionidle-save");
        let gameSave = JSON.parse(saveString);

        let format = gameSave.saveFormat;
        if (format <= 2 || format === undefined) return "out-of-date";
        else if (format != SAVE_FORMAT) return "must-update-save";
        else return "valid";
    }

    saveLocalStorage(gameState, settings) {

        let save = {
            gameState: gameState,
            saveFormat: SAVE_FORMAT,
            gameVersion: VERSION_STR
        }

        let gameSettings = {
            settings: settings,
            saveFormat: SAVE_FORMAT,
            gameVersion: VERSION_STR
        }

        let saveString = JSON.stringify(save);
        localStorage.setItem("regionidle-save", saveString);

        let settingString = JSON.stringify(gameSettings);
        localStorage.setItem("regionidle-settings", settingString);
    }

    loadSettings() {

        if (localStorage.getItem("regionidle-settings") === null) return new GameSettings();
        let settingString = localStorage.getItem("regionidle-settings");
        let settingSave = JSON.parse(settingString);

        return settingSave;
    }

    loadLocalStorage() {

        let saveString = localStorage.getItem("regionidle-save");
        let gameSave = JSON.parse(saveString);

        if (gameSave.saveFormat === undefined) {

            gameSave.gameState = this.#convertSave(1, gameSave);
        }
        else if (gameSave.saveFormat != SAVE_FORMAT) {

            gameSave.gameState = this.#convertSave(gameSave.saveFormat, gameSave.gameState);
        }
        return gameSave.gameState;
    }

    #convertSave(format, gameState) {

        if (format == 1 || format === undefined) {

            // Generate boardtile array from existing landmarks/towers
            let boardMap = 
                new Array(gameState.worldSettings.boardSize).fill().map(() => 
                Array(gameState.worldSettings.boardSize).fill(new BoardTile("null")));

            let len = gameState.boardState.towers.length;
            for (let i = 0; i < len; i++) {

                let tower = gameState.boardState.towers[i];
                boardMap[tower.x][tower.y] = new BoardTile("tower");
                boardMap[tower.x][tower.y].createTowerData(tower.x, tower.y, tower.id);
            }
            len = gameState.environment.landmarks.length;
            for (let i = 0; i < len; i++) {

                let landmark = gameState.environment.landmarks[i];
                boardMap[landmark.x][landmark.y] = new BoardTile("landmark");
                boardMap[landmark.x][landmark.y].createLandmarkData(landmark.x, landmark.y, landmark.type, landmark.id);
            }
            gameState.boardState.boardMap = boardMap;

            // Change attribute names
            gameState.player.buildingsOwned = gameState.player.buildings;
            gameState.boardState.perBuildingEarnings = gameState.boardState.earningsPerBuilding;

            // Remove old attributes
            delete gameState.player.buildings;
            delete gameState.boardState.earningsPerBuilding;
            delete gameState.boardState.towers;
            delete gameState.environment.landmarks;
        }
        return gameState;
    }
}

class AmbientSound{
    constructor(settings) {

        this.groundTiles;
        this.mapSize;

        this.playingWind = false;
        this.playingTerrain = false;
        this.playingWeather = false;

        //#region Ambient loops
        SFX_WIND_LOOP.loop = true;
        SFX_OCEAN_LOOP.loop = true;
        SFX_SHORE_LOOP.loop = true;
        SFX_FOREST_LOOP.loop = true;
        SFX_RAIN_LOOP.loop = true;
        SFX_HEAVYRAIN_LOOP.loop = true;
        //#endregion

        this.playWeather = settings.drawWeather;
        this.volumeLevel = settings.volumeAmb;

        this.weatherState;
        this.zoomLevel;
        this.hasFocus = true;
    }

    calculateAmbience() {

        if (!this.hasFocus || this.volumeLevel == 0) {

            this.playingTerrain = false;
            this.playingWind = false;
            this.playingWeather = false;

            SFX_WIND_LOOP.pause();

            SFX_OCEAN_LOOP.pause();
            SFX_SHORE_LOOP.pause();
            SFX_FOREST_LOOP.pause();
            
            SFX_RAIN_LOOP.pause();
            SFX_HEAVYRAIN_LOOP.pause();
            return;
        }
        this.#soundWind();
        this.#soundWorld();
        this.#soundWeather();
    }

    #getViewRect() {

        let rect = RECT_GAMEBOARD;
        let realTileSize = rect.width / this.mapSize;

        return {
            top: (-rect.top / realTileSize), 
            left: (-rect.left / realTileSize),
            bottom: ((-rect.top + WINDOW_INNERHEIGHT) / realTileSize),
            right: ((-rect.left + WINDOW_INNERWIDTH) / realTileSize)
        };
    }

    #getEnvironment() {

        let viewRect = this.#getViewRect();

        let startX = mathUtils.clamp(Math.floor(viewRect.left), 0, this.mapSize - 1);
        let startY = mathUtils.clamp(Math.floor(viewRect.top), 0, this.mapSize - 1);

        let endX = mathUtils.clamp(Math.floor(viewRect.right), 0, this.mapSize - 1);
        let endY = mathUtils.clamp(Math.floor(viewRect.bottom), 0, this.mapSize - 1);

        let waterTiles = 0, landTiles = 0, shoreTiles = 0;
        for (let x = startX; x < endX; x++) {
            for (let y = startY; y < endY; y++) {

                if (this.groundTiles[y][x] > 2) landTiles++;
                else if (this.groundTiles[y][x] == 2) shoreTiles++;
                else waterTiles++;
            }
        }
        
        let totalTiles = mathUtils.clamp(waterTiles + landTiles + shoreTiles, 1, 1000);
        let waterRatio = waterTiles / totalTiles;
        let shoreRatio = mathUtils.clamp((shoreTiles / totalTiles) * 2, 0, 1);
        let landRatio = landTiles / totalTiles;
        return {land: landRatio, shore: shoreRatio, water: waterRatio};
    }

    #soundWeather() {

        if (this.weatherState >= WEATHER_THRESHOLDS[2] && this.playWeather) {

            if (!this.playingWeather) {

                this.playingWeather = true;
                SFX_RAIN_LOOP.play();
                SFX_HEAVYRAIN_LOOP.play();
            }
        }
        else {

            SFX_RAIN_LOOP.pause();
            SFX_HEAVYRAIN_LOOP.pause();
            this.playingWeather = false;
        }
        if (this.playingWeather) {

            let rainThresh = (this.weatherState - WEATHER_THRESHOLDS[2]) * (1 / (1 - WEATHER_THRESHOLDS[2]));
            let heavyrainThresh = (this.weatherState - WEATHER_THRESHOLDS[3]) * (1 / (1 - WEATHER_THRESHOLDS[3]));

            SFX_RAIN_LOOP.volume = mathUtils.clamp(rainThresh * this.volumeLevel, 0.01, 1);
            SFX_HEAVYRAIN_LOOP.volume = mathUtils.clamp(heavyrainThresh * this.volumeLevel, 0.01, 1);
        }
    }

    #soundWorld() {

        let terrainVols = this.#getEnvironment();
        if (this.zoomLevel > 0.10) {

            if (!this.playingTerrain) {

                this.playingTerrain = true;
                SFX_OCEAN_LOOP.play();
                SFX_FOREST_LOOP.play();
                SFX_SHORE_LOOP.play();
            }
        }
        else {
            
            this.playingTerrain = false;
            SFX_OCEAN_LOOP.pause();
            SFX_FOREST_LOOP.pause();
            SFX_SHORE_LOOP.pause();
        }
        if (this.playingTerrain) {

            SFX_FOREST_LOOP.volume = mathUtils.clamp(terrainVols.land * this.volumeLevel * (this.zoomLevel), 0.01, 1);
            SFX_OCEAN_LOOP.volume = mathUtils.clamp(terrainVols.water * this.volumeLevel * (this.zoomLevel), 0.01, 1);
            SFX_SHORE_LOOP.volume = mathUtils.clamp(terrainVols.shore * this.volumeLevel * (this.zoomLevel), 0.01, 1);
        } 
    }

    #soundWind() {
        
        if (this.zoomLevel < 0.15) {

            if (!this.playingWind) {

                this.playingWind = true;
                SFX_WIND_LOOP.play();
            }
        }
        else {

            this.playingWind = false;
            SFX_WIND_LOOP.pause();
        }
        if (this.playingWind) SFX_WIND_LOOP.volume = mathUtils.clamp((0.15 - this.zoomLevel), 0.01, 0.4) * this.volumeLevel;
    }
}