//© 2023 - 2023 www.idleregion.com - All Rights Reserved.

Array.prototype.clone = function() {

    return this.map(e => Array.isArray(e) ? e.clone() : e);
}

cacheUtils = function() {

    function cacheRects() {

        RECT_GAMEBOARD = gameBoard.getBoundingClientRect();
        
        RECT_INVENTORYPANEL = inventoryPanel.getBoundingClientRect();
        COMPSTYLE_INVENTORYPANEL = getComputedStyle(inventoryPanel);
        RECT_OPTIONSPANEL = optionsPanel.getBoundingClientRect();
        RECT_CONTROLPANEL = controlPanel.getBoundingClientRect();
        RECT_ROCKPANEL = rockCanvas.getBoundingClientRect();
        RECT_BUTTONLIST = buttonList.getBoundingClientRect();
        RECT_TIERCANVAS = tierCanvas.getBoundingClientRect();
        RECT_QUANTITYCANVAS = quantityCanvas.getBoundingClientRect();
        RECT_HELPCANVAS = hintCanvas.getBoundingClientRect();
        
        WINDOW_INNERWIDTH = window.innerWidth;
        WINDOW_INNERHEIGHT = window.innerHeight;
    }

    function cacheBoardRects() {

        RECT_GAMEBOARD = gameBoard.getBoundingClientRect();
    }

    return {
        cacheRects: cacheRects,
        cacheBoardRects: cacheBoardRects
    }
}();

mathUtils = function() {

    function clamp(a, x, y) {
        
        return Math.min(Math.max(a, x), y);
    }

    function interpolateHSL(cur, next, step) {

        let dist = next[0] - cur[0];
        if (dist > 180) cur[0] += 360;
    
        for (let i = 0; i < cur.length; i++) {
        
            let distTop = (next[i] - cur[i]);
            cur[i] = cur[i] + (distTop * step);
        }
        return cur;
    }

    function roundToNearestVal(value, round) {
    
        return (Math.round(value * (1 / round)) / (1 / round));
    }

    function returnBuildingID(index, tier) {

        return (index + (tier * 8));
    }

    function seedFromString(string) {

        if (/^[0-9]+$/.test(string)) return Number(string);
    
        let value = 1;
        for (let i = 0; i < string.length; i++) {
    
            value *= (string.charCodeAt(i) / 10);
        }
        value = value.toString();
        if (value.length > 2) {
    
            let midPoint = Math.floor(value.length / 2);
            value = value.slice(0, midPoint) + "." + value.slice(midPoint, value.length);
        }
        return parseFloat(value);
    }

    function returnLandmarkPrice(landmark) {

        // Find cost of landmark removal
        let landmarkPrice = (landmark.landmarkType == "r") ? 
        Math.floor(gameState.player.earnings * LANDMARK_REMOVAL_COST[0][landmark.landmarkId]) : // Rock
        Math.floor(gameState.player.earnings * LANDMARK_REMOVAL_COST[1][landmark.landmarkId]);  // Tree

        if (gameState.player.edicts.hasEdict("landmark-1")) landmarkPrice /= 2;
        return landmarkPrice;
    }

    function returnBuildingPrice(buildingId, quantity) {

        // Building Price * (Building Quantity^2 / Building Price Modifier)
        let baseCost = gameState.edictCache.affectedBuildingResources[buildingId].price;
        let priceMod = PRICE_MOD;
        let curQuantity = gameState.player.buildingsOwned[buildingId];
        
        let price = 0;
        for (let i = 0; i < quantity; i++) {

            price += Math.ceil(baseCost * Math.pow(priceMod, curQuantity + i));
        }
        return price;
    }

    function returnInventoryPageLength(tileType) {

        if (tileType === undefined) tileType = gameSettings.placeType;
        
        if      (tileType == "building") return Math.floor(BUILDING_DATA.length / 8) - 1;
        else if (tileType == "path") return Math.floor(PATH_DATA.length / 8) - 1;
        else if (tileType == "scenery") return Math.floor(SCENERY_DATA.length / 8) - 1;
        else return 0;
    }

    function mobileDeepCopy(item) {

        let returnCopy;
        if (Array.isArray(item)) {

            returnCopy = new Array(item.length);
            for (let i = 0; i < item.length; i++) {

                returnCopy[i] = JSON.parse(JSON.stringify(item[i]));
            }
            return returnCopy;
        }
        else {

            returnCopy = JSON.parse(JSON.stringify(item));
            return returnCopy;
        }
    }

    function returnObjectWithKey(array, keyName, key) {

        for (let i = 0; i < array.length; i++) {

            if (array[i][keyName] == key) return array[i];
        }
    }

    return {
        clamp: clamp,
        interpolateHSL: interpolateHSL,
        roundToNearestVal: roundToNearestVal,
        returnBuildingID: returnBuildingID,
        seedFromString: seedFromString,
        returnLandmarkPrice: returnLandmarkPrice,
        returnInventoryPageLength: returnInventoryPageLength,
        returnBuildingPrice: returnBuildingPrice,
        returnObjectWithKey: returnObjectWithKey,
        mobileDeepCopy: mobileDeepCopy
    }
}();

fluffUtils = function() {

    function announceCheats() {

        console.log("If you're here to cheat, I'll make it easier for you.");
        console.log("Enter 'debug()' to toggle debug mode on and off.");
    }

    function resizeGUI() {

        let resizeFactor = 1;
        if (gameSettings.guiSize == "large") resizeFactor = 1.25;
        else if (gameSettings.guiSize == "small") resizeFactor = 0.75;

        let newSizes = GUI_SIZES.clone();
        for (let i = 0; i < newSizes.length; i++) {

            for (let j = 0; j < newSizes[i].length; j++) {

                newSizes[i][j] *= resizeFactor;
            }
        }

        tierCanvas.style.width = `clamp(${newSizes[0][0]}px, ${newSizes[0][1]}vw, ${newSizes[0][2]}px)`;
        quantityCanvas.style.width = `clamp(${newSizes[1][0]}px, ${newSizes[1][1]}vw, ${newSizes[1][2]}px)`;

        let buyButtons = document.getElementsByClassName("buy-building");
        for (let button of buyButtons) button.style.width = `clamp(${newSizes[2][0]}px, ${newSizes[2][1]}vw, ${newSizes[2][2]}px)`;
        let scoreCanvi = document.getElementsByClassName("score-canvas");
        for (let canvas of scoreCanvi) canvas.style.width = `clamp(${newSizes[3][0]}px, ${newSizes[3][1]}vw, ${newSizes[3][2]}px)`;
        
        inventoryPanel.style.width = `clamp(${newSizes[4][0]}px, ${newSizes[4][1]}vw, ${newSizes[4][2]}px)`;

        // #building-tooltip width: clamp(160px, 32vw, 400px); 5
        
        let invArrows = document.getElementsByClassName("inventory-arrow");
        for (let arrow of invArrows) arrow.style.width = `clamp(${newSizes[6][0]}px, ${newSizes[6][1]}vw, ${newSizes[6][2]}px)`;

        controlPanel.style.width = `clamp(${newSizes[7][0]}px, ${newSizes[7][1]}vw, ${newSizes[7][2]}px)`;

        //document.getElementsByClassName("performance-counter").style.width = `clamp(${newSizes[8][0]}px, ${newSizes[8][1]}vw, ${newSizes[8][2]}px)`; 8

        optionsPanel.style.width = `clamp(${newSizes[9][0]}px, ${newSizes[9][1]}vw, ${newSizes[9][2]}px)`;

        let placeTypeSelectors = document.getElementsByClassName("place-type-selector");
        for (let selector of placeTypeSelectors) selector.style.width = `clamp(${newSizes[10][0]}px, ${newSizes[10][1]}vw, ${newSizes[10][2]}px)`;

        // #fps font-size: clamp(0.2em, 1vw, 0.8em); 11
        // .hints-title font-size: clamp(0.4em, 2vw, 2em); 12

        hintCanvas.style.width = `clamp(${newSizes[13][0]}px, ${newSizes[13][1]}vw, ${newSizes[13][2]}px)`;
        edictButtonCanvas.style.width = `clamp(${newSizes[14][0]}px, ${newSizes[14][1]}vw, ${newSizes[14][2]}px)`;

        window.dispatchEvent(new Event("resize"));
    }

    function findBrowser(userAgent) {

        if (userAgent.match(/OPR|Opera/i)) return "opera";
        else if (userAgent.match(/firefox|fxios/i)) return "firefox";
        else if (userAgent.match(/chrome|chromium|crios/i)) return "chromium";
        else if (userAgent.match(/edge/i)) return "chromium";
        else if (userAgent.match(/safari/i)) return "safari";
        else return "unknown";
    }

    function randomizeRegionName() {

        let randomName = "";
        if (Math.random() > 0.66) {
    
            randomName += (REGION_NAME_PREFIX[Math.floor(Math.random() * REGION_NAME_PREFIX.length)]) + " ";
        }
        randomName +=
        (REGION_NAME_MIDDLE[Math.floor(Math.random() * REGION_NAME_MIDDLE.length)]) +
        (REGION_NAME_SUFFIX[Math.floor(Math.random() * REGION_NAME_SUFFIX.length)]);
        return randomName;
    }

    function playSound(type) {

        switch(type) {

            case "tower-placed":
                index = Math.floor(Math.random() * SFX_TOWER_PLACE.length);
                sound = SFX_TOWER_PLACE[index].cloneNode();
                sound.volume = gameSettings.volumeUI / 2;
                break;

            case "tower-placed-water":
                index = Math.floor(Math.random() * SFX_TOWER_PLACE_WATER.length);
                sound = SFX_TOWER_PLACE_WATER[index].cloneNode();
                sound.volume = gameSettings.volumeUI;
                break;

            case "remove-tower":
                index = Math.floor(Math.random() * SFX_REMOVE_TOWER.length);
                sound = SFX_REMOVE_TOWER[index].cloneNode();
                sound.volume = gameSettings.volumeUI / 2;
                break;

            case "remove-tree":
                index = Math.floor(Math.random() * SFX_REMOVE_TREE.length);
                sound = SFX_REMOVE_TREE[index].cloneNode();
                sound.volume = gameSettings.volumeUI;
                break;

            case "remove-rock":
                index = Math.floor(Math.random() * SFX_REMOVE_ROCK.length);
                sound = SFX_REMOVE_ROCK[index].cloneNode();
                sound.volume = gameSettings.volumeUI;
                break;

            case "building-buy":
                index = Math.floor(Math.random() * SFX_BUILDING_BUY.length);
                sound = SFX_BUILDING_BUY[index].cloneNode();
                sound.volume = gameSettings.volumeUI;
                break;

            case "click-button":
                index = Math.floor(Math.random() * SFX_CLICK_BUTTON.length);
                sound = SFX_CLICK_BUTTON[index].cloneNode();
                sound.volume = gameSettings.volumeUI;
                break;

            case "rock-break":
                index = Math.floor(Math.random() * SFX_ROCK_BREAK.length);
                sound = SFX_ROCK_BREAK[index].cloneNode();
                sound.volume = gameSettings.volumeUI;
                break;

            case "edict-open":
                index = Math.floor(Math.random() * SFX_EDICT_OPEN.length);
                sound = SFX_EDICT_OPEN[index].cloneNode();
                sound.volume = gameSettings.volumeUI;
                break;

            case "edict-close":
                index = Math.floor(Math.random() * SFX_EDICT_CLOSE.length);
                sound = SFX_EDICT_CLOSE[index].cloneNode();
                sound.volume = gameSettings.volumeUI;
                break;

            case "edict-turn":
                index = Math.floor(Math.random() * SFX_EDICT_PAGE.length);
                sound = SFX_EDICT_PAGE[index].cloneNode();
                sound.volume = gameSettings.volumeUI;
                break;

            case "edict-pencil":
                index = Math.floor(Math.random() * SFX_EDICT_PENCIL.length);
                sound = SFX_EDICT_PENCIL[index].cloneNode();
                sound.volume = gameSettings.volumeUI;
                break;

            case "achievement":

                index = Math.floor(Math.random() * (SFX_ACHIEVEMENT.length));
                sound = SFX_ACHIEVEMENT[index].cloneNode();
                sound.volume = gameSettings.volumeUI;
                break;

            case "achievement-egg":

                sound = SFX_ACHIEVEMENT_EGG.cloneNode();
                sound.volume = gameSettings.volumeUI;
                break;

            case "meteor-land":
                sound = METEOR_LAND.cloneNode();
                sound.volume = gameSettings.volumeUI;
                break;

            case "thunder":
                index = Math.floor(Math.random() * SFX_THUNDER.length);
                sound = SFX_THUNDER[index].cloneNode();
                sound.volume = gameSettings.volumeAmb * 0.3;
                break;

            default:
                return;
        }
        sound.play();
    }
    
    this.currentSong = MUSIC_MAPCREATION.cloneNode();
    this.musicPlaying = false;
    function playMusic(type) {

        if (!currentSong.paused) {

            currentSong.pause();
            currentSong.loop = false;
            musicPlaying = false;
            return;
        }

        switch(type) {

            case "map-creation":
                currentSong = MUSIC_MAPCREATION.cloneNode();
                currentSong.loop = true;
                musicPlaying = true;
                break;

            default:
                return;
        }
        currentSong.play();
    }

    function pauseMusic() {

        if (!currentSong.paused && musicPlaying) {

            currentSong.pause();
            return;
        }
        else if (currentSong.pause && musicPlaying) {

            currentSong.play();
        }
    }

    function setFavicon() {
    
        let numberHelper = new NumberHelper();
        let balanceString = Math.floor(gameState.player.balance).toLocaleString("fullwide", {useGrouping: false});
        balanceString = numberHelper.returnShortHandNumber(balanceString);
        favText.textContent = `${gameState.player.name} - $${balanceString}`;
    
        let houseIndex = [2, 6, 10, 15, 18, 23, 27, 31, 36, 38];
        let highestHouse = 0;
        for (let i = 0; i < houseIndex.length; i++) {
    
            if (gameState.boardState.buildingsPlaced[houseIndex[i]] > 0) highestHouse = i;
        }
        favImage.href = `./res/images/ui/house-favicon/h${highestHouse + 1}.ico?v=0-3-3a`;
    }

    function showUI(show) {

        let uiContainer = document.getElementById("ui-container");
        if (show) {
    
            uiContainer.style.display = "flex";
        }
        else if (!show) {
    
            uiContainer.style.display = "none";
        }
    }

    function generateBuildingButtons() {

        buttonList.innerHTML = "";
        for (let i = 0; i < 8; i++) {
    
            var newCanvas = document.createElement("canvas");
            newCanvas.addEventListener("click", function() {
    
                EventListeners.buyBuilding(this);
            });
            newCanvas.addEventListener("mouseover", function() {
    
                let index = Array.from(this.parentNode.children).indexOf(this);
                let rect = this.getBoundingClientRect();
                drawContextualUI.drawBuildingTooltip(rect, index);
            });
            newCanvas.classList.add("buy-building");
            buttonList.appendChild(newCanvas);
        }

        //#region Size buttons
        let resizeFactor = 1;
        if (gameSettings.guiSize == "large") resizeFactor = 1.25;
        else if (gameSettings.guiSize == "small") resizeFactor = 0.75;

        let newSizes = GUI_SIZES.clone();
        for (let j = 0; j < newSizes[2].length; j++) newSizes[2][j] *= resizeFactor;

        let buyButtons = document.getElementsByClassName("buy-building");
        for (let button of buyButtons) button.style.width = `clamp(${newSizes[2][0]}px, ${newSizes[2][1]}vw, ${newSizes[2][2]}px)`;
        //#endregion
    }

    function changeMapBorder(style) {

        gameSettings.mapBorder = style;
        drawBoard.drawBorderCanvas();
    }

    function returnMapBorderSprite(style) {

        if (style === undefined) style = gameSettings.mapBorder;

        if      (style == "wood-fancy") return BORDER_WOOD_FANCY;
        else if (style == "wood") return BORDER_WOOD;
        else if (style == "sleek-black") return BORDER_SLEEK_BLACK;
        else if (style == "sleek-grey") return BORDER_SLEEK_GREY;
        else if (style == "sleek-white") return BORDER_SLEEK_WHITE;
        else if (style == "aqueduct") return BORDER_AQUEDUCT;
        else if (style == "brick") return BORDER_BRICK;
    }

    function generateNewsTickerText() {

        let tickerPool = [];

        //#region Get needs
        let needsTickerNames = ["food", "workers", "power", "beauty"];
        for (let i = 0; i < 4; i++) {

            if (gameState.boardState.regionNeeds[i] == 0) continue;
            let satisfaction = gameState.boardState.resources[i] / gameState.boardState.regionNeeds[i];

            let tickerSuffix = ""
            if (satisfaction < 0.5) tickerSuffix = "bad";
            else if (satisfaction < 1) tickerSuffix = "mid";
            else if (satisfaction >= 1) tickerSuffix = "good";

            tickerPool.push(mathUtils.returnObjectWithKey(NEWS_TICKER_STRINGS, "group", `${needsTickerNames[i]}-${tickerSuffix}`));
        }
        //#endregion

        //#region Highest tier and building firsts
        let highestTier = 0;
        let firstBuildings = {strings: []};
        let firstBuildingStrings = mathUtils.returnObjectWithKey(NEWS_TICKER_STRINGS, "group", `building-first`);
        for (let i = 0; i < gameState.boardState.buildingsPlaced.length; i++) {

            if (gameState.boardState.buildingsPlaced[i] == 0) continue;
            highestTier = Math.floor(i / 8) + 1;

            if (gameState.boardState.buildingsPlaced[i] == 1) firstBuildings.strings.push(firstBuildingStrings.strings[i]);
        }
        if (highestTier != 0) tickerPool.push(mathUtils.returnObjectWithKey(NEWS_TICKER_STRINGS, "group", `random-tier-${highestTier}`));
        if (firstBuildings.strings.length != 0) tickerPool.push(firstBuildings);
        //#endregion

        //#region Weather
        let weatherState = ""
        if (gameState.worldSettings.weatherState < WEATHER_THRESHOLDS[2]) weatherState = "weather-clear";
        else if (gameState.worldSettings.weatherState < WEATHER_THRESHOLDS[3]) weatherState = "weather-rain";
        else if (gameState.worldSettings.weatherState < WEATHER_THRESHOLDS[4]) weatherState = "weather-storm";
        tickerPool.push(mathUtils.returnObjectWithKey(NEWS_TICKER_STRINGS, "group", weatherState));
        //#endregion

        //#region Missing roads
        if (gameState.roadlessBuildings != 0) tickerPool.push(mathUtils.returnObjectWithKey(NEWS_TICKER_STRINGS, "group", "missing-roads"));
        //#endregion

        //#region Rare messages
        if (Math.random() > 0.95) tickerPool.push(mathUtils.returnObjectWithKey(NEWS_TICKER_STRINGS, "group", "rare-messages"));
        //#endregion

        // Get string
        let poolIndex = Math.floor(Math.random() * tickerPool.length);
        let stringIndex = Math.floor(Math.random() * tickerPool[poolIndex].strings.length);
        let tickerString = tickerPool[poolIndex].strings[stringIndex];

        if (tickerString.includes("[region]")) tickerString = tickerString.replace("[region]", gameState.player.name);
        newsTickerText.textContent = tickerString;

        return;
        console.clear();
        console.log(tickerPool)
        for (let i = 0; i < tickerPool.length; i++) {

            for (let j = 0; j < tickerPool[i].strings.length; j++) console.log(tickerPool[i].strings[j]);
        }
    }

    return {
        randomizeRegionName: randomizeRegionName,
        playSound: playSound,
        setFavicon: setFavicon,
        showUI: showUI,
        generateBuildingButtons: generateBuildingButtons,
        findBrowser: findBrowser,
        resizeGUI: resizeGUI,
        playMusic: playMusic,
        pauseMusic: pauseMusic,
        generateNewsTickerText: generateNewsTickerText,
        changeMapBorder: changeMapBorder,
        returnMapBorderSprite: returnMapBorderSprite,
        announceCheats: announceCheats
    }
}();

boardUtils = function() {

    function quickSelect() {

        let selPos = boardUtils.returnGameBoardPos();
        let selTile = gameState.boardState.boardMap[selPos.x][selPos.y];
        let metaData = selTile.metaData;

        let towerIndex = 0, tierIndex = 0;

        if (selTile.type == "null") return;
        else if (selTile.type == "tower") {

            let selTower = metaData.buildingId - 1;
            
            towerIndex = (selTower % 8) + 1;
            tierIndex = Math.floor(selTower / 8);
            gameSettings.placeType = "building";
        }
        else if (selTile.type == "path") {

            let selPath = metaData.pathId;

            towerIndex = selPath;
            tierIndex = 0;
            gameSettings.placeType = "path";
        }
        else if (selTile.type == "scenery") {

            let selScenery = metaData.sceneryId - 1;

            towerIndex = (selScenery % 8) + 1;
            tierIndex = Math.floor(selScenery / 8);
            gameSettings.placeType = "scenery";
        }
        
        gameSettings.selTier = tierIndex;
        gameSettings.selBuilding = towerIndex;
        gameSettings.cursorState = "select";

        fluffUtils.generateBuildingButtons();
        drawUI.drawBuildingButtons(true);
        drawUI.drawTileSelectors();
        drawUI.drawTierSelector();
        drawUI.drawInventory()
    }

    function clearAllTiles() {

        for (let y = 0; y < gameState.worldSettings.boardSize; y++) {
            for (let x = 0; x < gameState.worldSettings.boardSize; x++) {

                if (gameState.boardState.boardMap[x][y].type == "null" || gameState.boardState.boardMap[x][y].type == "landmark") continue;

                gameState.removeTile(x, y);
                gameMain.objectChangeCache.push({x: x, y: y});
            }
        }
    }

    // Test spawn meteors
    function spamMeteor(n) {

        if (n === undefined) n = 100;
        for (let i = 0; i < n; i++) spawnMeteor();
    }

    function spawnMeteor(x, y) {
        
        // Pick valid spot
        let spawnLandmark = false;
        if (x === undefined) {
            
            // Try 50 times
            for (let i = 0; i < 50; i++) {

                x = Math.floor(Math.random() * gameState.worldSettings.boardSize);
                y = Math.floor(Math.random() * gameState.worldSettings.boardSize);

                x = mathUtils.clamp(x, 1, gameState.worldSettings.boardSize - 2);
                y = mathUtils.clamp(y, 1, gameState.worldSettings.boardSize - 2);

                let isLand = gameState.environment.ground[y][x] > 2;
                let isEmpty = (gameState.boardState.boardMap[x][y].type == "null");

                if (isLand && isEmpty) {

                    spawnLandmark = true;
                    break;
                }
            }
        }
        else spawnLandmark = true;

        if (spawnLandmark) {

            let meteor = new MeteorPowerup(x, y);
            gameState.environment.meteors.push(meteor);
            drawBoard.drawObjectCanvas(meteor);
            fluffUtils.playSound("meteor-land");
            drawContextualUI.achievementQueue.push({
                name: "A Meteor Has Landed", 
                description: "Find it on the map and click to gain a powerup!"
            });
        }
    }

    function createNewBoard() {

        let saveName = document.getElementById("name-box").value;
        let seed = mathUtils.seedFromString(document.getElementById("seed-box").value);

        let definition = Math.max(document.getElementById("definition-slider").value / 25, 0.025);
        let density = document.getElementById("dense-slider").value / 50;
        let waterLevel = document.getElementById("water-slider").value / 50;
        let moistureLevel = document.getElementById("moisture-slider").value / 50;
        let mapSize = (document.getElementById("mapsize-small").checked) ? 64 : 128;

        if (saveName == "") saveName = fluffUtils.randomizeRegionName();

        mapGen = new MapGenerator(
            mapSize,
            definition, 
            density, 
            seed, 
            waterLevel, 
            moistureLevel
        );
        
        gameState = new GameState(
            {
                worldSettings: {
                    worldSeed: seed, 
                    timeOfDay: 480, 
                    boardSize: mapSize
                }
            },
            {
                player: {
                    timeOfLastUpdate: Date.now(), 
                    dateCreated: Date.now()
                }
            },
        );
        gameState.environment.ground = mapGen.generateMap();
        gameState.player.name = saveName;
        mapGen.generateLandmarks(gameState.boardState.boardMap);
        gameMain.startGame();
    }
    
    function returnGameBoardPos() {

        const rect = RECT_GAMEBOARD;
        const realTileSize = rect.width / gameState.worldSettings.boardSize;
        return {x: Math.floor((EventListeners.mousePos.x - rect.left) / realTileSize), y: Math.floor((EventListeners.mousePos.y - rect.top) / realTileSize)};
    }

    function setTile(clickPos) {

        if (gameSettings.selBuilding == 0) return false;

        let buildingId, tile, validTerrain, hasInventory, placementPrice = 0;
        if (gameSettings.placeType == "building") {

            buildingId = gameSettings.selBuilding + (gameSettings.selTier * 8);
            tile = new BoardTile("tower");
            tile.createTowerData(clickPos.x, clickPos.y, buildingId);

            validTerrain = gameState.returnCanPlaceOnTerrain(clickPos, BUILDING_DATA[buildingId - 1].place_style);
            hasInventory = gameState.player.towerInventory[buildingId - 1] > 0;
        }
        else if (gameSettings.placeType == "path") {

            buildingId = gameSettings.selBuilding;
            tile = new BoardTile("path");
            tile.createPathData(clickPos.x, clickPos.y, buildingId);

            validTerrain = gameState.returnCanPlaceOnTerrain(
                clickPos, 
                gameState.edictCache.affectedPathResources[buildingId - 1].place_style
            );
            hasInventory = gameState.player.balance >= gameState.edictCache.affectedPathResources[buildingId - 1].price;

            if (placementPrice > gameState.player.balance) return false;
        }
        else if (gameSettings.placeType == "scenery") {

            buildingId = gameSettings.selBuilding + (gameSettings.selTier * 8);
            tile = new BoardTile("scenery");
            tile.createSceneryData(clickPos.x, clickPos.y, buildingId);

            validTerrain = gameState.returnCanPlaceOnTerrain(clickPos, SCENERY_DATA[buildingId - 1].place_style);
            hasInventory = gameState.player.balance >= SCENERY_DATA[buildingId - 1].price;
        }
        
        // Check if placable
        if (!validTerrain) return false;
        let tileEmpty = gameState.returnIfTowerEmpty(clickPos);
        let landmarkEmpty = gameState.returnIfLandmarkEmpty(clickPos);

        // Spot empty, place new
        if (hasInventory && (tileEmpty && landmarkEmpty)) {

            gameState.addTile(tile);
            return true;
        }
        // Spot filled, remove old and place new
        else if (hasInventory) {

            // Landmark at index
            if (!landmarkEmpty) {

                placementPrice += mathUtils.returnLandmarkPrice(gameState.boardState.boardMap[clickPos.x][clickPos.y].metaData);
                if (placementPrice > gameState.player.balance || gameState.player.earnings <= 0) return false;

                gameState.player.balance -= placementPrice;
                gameState.removeTile(clickPos.x, clickPos.y);
                gameState.addTile(tile);
                return true;
            }
            // Tower at index
            else if (!tileEmpty) {

                if (placementPrice > gameState.player.balance) return false;

                gameState.player.balance -= placementPrice;
                gameState.removeTile(clickPos.x, clickPos.y);
                gameState.addTile(tile);
                return true;
            }
        }
        return false;
    }

    function deleteTile(clickPos) {

        let tileEmpty = gameState.returnIfTowerEmpty(clickPos);
        let landmarkEmpty = gameState.returnIfLandmarkEmpty(clickPos);

        // If deleting tower
        if (!tileEmpty) {

            gameState.removeTile(clickPos.x, clickPos.y);
            gameState.player.achievements.checkRemoveTower();

            fluffUtils.playSound("remove-tower");
            return true;
        }
        // If deleting landmark
        else if (!landmarkEmpty) {

            // Get landmark price
            let price = mathUtils.returnLandmarkPrice(gameState.boardState.boardMap[clickPos.x][clickPos.y].metaData);
            if (price > gameState.player.balance || gameState.player.earnings <= 0) return;

            gameState.player.balance -= price;
            
            let landmark = gameState.boardState.boardMap[clickPos.x][clickPos.y].metaData;
            if (landmark.landmarkType == "t") fluffUtils.playSound("remove-tree");
            else fluffUtils.playSound("remove-rock");

            gameState.removeTile(clickPos.x, clickPos.y);
            gameState.player.achievements.checkRemoveLandmark();
            return true;
        }
        return false;
    }

    this.lastPlacedPos = {x: -1, y: -1};
    function handleObjectTileChange() {

        // Get click location
        let clickPos = boardUtils.returnGameBoardPos();
        if (clickPos.x == this.lastPlacedPos.x && clickPos.y == this.lastPlacedPos.y) return;

        // Check if inside border
        if (clickPos.x == 0 || clickPos.x >= gameState.worldSettings.boardSize - 1 ||
            clickPos.y == 0 || clickPos.y >= gameState.worldSettings.boardSize - 1) return;

        // Handle placement
        let boardChange = false;
        if (gameSettings.cursorState == "select") boardChange = setTile(clickPos);
        else if (gameSettings.cursorState == "delete") boardChange = deleteTile(clickPos);

        // Only do board calculations if board changes
        if (boardChange) {

            this.lastPlacedPos = clickPos;
            gameState.updateInventory();

            gameMain.objectChangeCache.push(clickPos);
            drawBoard.drawBoostCanvas();

            if (gameSettings.cursorState == "select") {

                let clickTerrain = gameState.environment.ground[clickPos.y][clickPos.x];
                if (clickTerrain > 2) fluffUtils.playSound("tower-placed");
                else fluffUtils.playSound("tower-placed-water");
            }

            if (gameSettings.placeType == "scenery") gameState.player.achievements.checkSceneryPlaced();
        }
    }

    return {
        createNewBoard: createNewBoard,
        returnGameBoardPos: returnGameBoardPos,
        handleObjectTileChange: handleObjectTileChange,
        spawnMeteor: spawnMeteor,
        spamMeteor: spamMeteor,
        quickSelect: quickSelect,
        setTile: setTile,
        deleteTile: deleteTile,
        clearAllTiles: clearAllTiles
    }
}();

function debug() {
    
    if (typeof gameSettings === "undefined") return;
    gameSettings.debugMode = !gameSettings.debugMode;

    if (gameSettings.debugMode) {

        console.log("Welcome to debug mode!");
        console.log("Keypress Commands:");
        console.log(" - Y: Add specified amount of money");
        console.log(" - T: Set current money to specified amount");
        console.log(" - U: Move time of day forward");
        console.log(" - M: Make weather more stormy");
        console.log(" - N: Make weather more clear");
        console.log("");
        console.log("Type 'debug()' again to disable debug mode");
    }
    else console.log("Debug mode disabled.");
}

// TODO: move this somewhere else
var weatherRandomStep = 0;
var weatherRandomGoal = Math.random();
function processWeather() {

    // gameState.worldSettings.weatherState = 0.8;
    // ambientSound.weatherState = gameState.worldSettings.weatherState;
    // return;

    let maxSteps = 1200;

    let curState = gameState.worldSettings.weatherState;
    let changeValue = mathUtils.clamp((weatherRandomGoal - curState) / ((weatherRandomStep / maxSteps) * 100), -0.005, 0.005);

    gameState.worldSettings.weatherState = mathUtils.clamp(gameState.worldSettings.weatherState + changeValue, 0.02, 0.98);
    ambientSound.weatherState = gameState.worldSettings.weatherState;

    if (weatherRandomStep + 1 > maxSteps) {

        weatherRandomStep = 0;
        weatherRandomGoal = Math.random();
    }
    weatherRandomStep++;
}

var lastLightning = Date.now();
var lightningState = 0;
function randomLighting() {

    if (Date.now() - lastLightning <= 2000 || !gameSettings.drawWeather || !gameSettings.drawLightning) return;
    if (gameState.worldSettings.weatherState >= WEATHER_THRESHOLDS[3]) {

        if (Math.random() > 0.999) {

            fluffUtils.playSound("thunder");
            lastLightning = Date.now();
            lightningState = 2;
        }
    }
}