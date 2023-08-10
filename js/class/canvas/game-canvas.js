//© 2023 - 2023 www.idleregion.com - All Rights Reserved.

class BorderCanvas{
    constructor(tileSize, mapSize) {

        this.tileSize = tileSize;
        this.mapSize = mapSize;
    }

    #clearCanvas(canvas, ctx) {

        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    #drawBorder(ctx) {

        let borderSprite = fluffUtils.returnMapBorderSprite();

        // Sides
        let farSide = (this.mapSize - 1) * this.tileSize;
        for (let i = 0; i < this.mapSize; i++) {

            // Top row
            ctx.drawImage(
                borderSprite,
                32, 0, 32, 32,
                i * this.tileSize, 0, 32, 32
            );

            // Bottom row
            ctx.drawImage(
                borderSprite,
                32, 64, 32, 32,
                i * this.tileSize, farSide, 32, 32
            );

            // Left
            ctx.drawImage(
                borderSprite,
                0, 32, 32, 32,
                0, i * this.tileSize, 32, 32
            );

            // Right
            ctx.drawImage(
                borderSprite,
                64, 32, 32, 32,
                farSide, i * this.tileSize, 32, 32
            );
        }

        //#region Corners
        // TL
        ctx.drawImage(
            borderSprite,
            0, 0, 32, 32,
            0, 0, 32, 32
        );

        // TR
        ctx.drawImage(
            borderSprite,
            64, 0, 32, 32,
            farSide, 0, 32, 32
        );

        // BL
        ctx.drawImage(
            borderSprite,
            0, 64, 32, 32,
            0, farSide, 32, 32
        );

        // BR
        ctx.drawImage(
            borderSprite,
            64, 64, 32, 32,
            farSide, farSide, 32, 32
        );
        //#endregion
    }

    draw(canvas, ctx) {

        this.#clearCanvas(canvas, ctx);
        this.#drawBorder(ctx);
    }
}

class CursorCanvas{
    constructor(tileSize, boardSize, settings, player, groundTile, boardTile, hasBoosted, edictCache, prevLoc) {

        this.tileSize = tileSize;
        this.boardSize = boardSize;

        if (settings === undefined) return;
        this.tierIndex = settings.selBuilding;
        this.tier = settings.selTier;
        this.placeType = settings.placeType;

        this.earnings = player.earnings;
        this.balance = player.balance;
        this.inventory = player.towerInventory;

        this.buildingId = (this.tierIndex + (this.tier * 8) - 1);
        this.selectedCount = this.inventory[this.buildingId];

        this.buildingCache = edictCache.affectedBuildingResources;
        this.pathCache = edictCache.affectedPathResources;

        this.boardTile = boardTile;
        this.groundTile = groundTile;

        this.hasBoosted = hasBoosted;
        this.cursorState = settings.cursorState;

        this.prevLoc = prevLoc;
        this.prevHeldId;
        this.prevTier;
        this.lastCursorState;
    }

    #clearCanvas(ctx) {

        ctx.clearRect((this.prevLoc.x - 7) * this.tileSize,(this.prevLoc.y - 7) * this.tileSize, 15 * this.tileSize, 15 * this.tileSize);
    }

    //#region Board state
    #boardLocationFromCursor() {

        let rect = RECT_GAMEBOARD;
        let realTileSize = rect.width / this.boardSize;
        return {x: Math.floor((EventListeners.mousePos.x - rect.left) / realTileSize), y: Math.floor((EventListeners.mousePos.y - rect.top) / realTileSize)};
    }

    #returnCanPlaceOnTerrain() {

        let placeStyle;
        if (this.placeType == "building") placeStyle = this.buildingCache[this.buildingId].place_style;
        else if (this.placeType == "path") placeStyle = this.pathCache[this.buildingId].place_style;
        else if (this.placeType == "scenery") placeStyle = SCENERY_DATA[this.buildingId].place_style;

        if (placeStyle == "all") return true;
        else if (placeStyle == "land" && this.groundTile > 2) return true;
        else if (placeStyle == "shore" && this.groundTile == 2) return true;
        else if (placeStyle == "water" && this.groundTile < 2) return true;
        else if (placeStyle == "grass" && this.groundTile >= 4) return true;
        else if (placeStyle == "shoreland" && this.groundTile >= 2) return true;
        else if (placeStyle == "shorewater" && this.groundTile <= 3) return true;
        else return false;
    }
    //#endregion

    #drawDeleteCursor(ctx, selectedPos) {

        if ((this.prevLoc.x == selectedPos.x && this.prevLoc.y == selectedPos.y) && 
             this.cursorState == this.lastCursorState) return;

        this.#clearCanvas(ctx);
        ctx.drawImage(
            CURSOR_DELETE,
            selectedPos.x * this.tileSize, selectedPos.y * this.tileSize
        );
    }

    #drawSelectCursor(ctx, selectedPos) {

        let outlineText = new OutlineText();

        let hasInventory = this.selectedCount > 0;
        let validTerrain = this.#returnCanPlaceOnTerrain();
        let spriteSrc;

        if (this.prevHeldId == this.buildingId && 
           (this.prevLoc.x == selectedPos.x && this.prevLoc.y == selectedPos.y) && 
            this.cursorState == this.lastCursorState &&
            this.tier == this.prevTier) return;

        this.#clearCanvas(ctx);

        if (this.placeType == "path") {

            spriteSrc = PATH_SPRITES;
            this.tier = 0;

            let canAfford = (this.balance >= this.pathCache[this.buildingId].price);
            if (!canAfford || !validTerrain) ctx.drawImage(CURSOR_LOCKED, selectedPos.x * this.tileSize, selectedPos.y * this.tileSize);
            else ctx.drawImage(CURSOR_SELECT, selectedPos.x * this.tileSize, selectedPos.y * this.tileSize);

            ctx.drawImage(
                spriteSrc,
                (this.tierIndex - 1) * this.tileSize, (this.tier * this.tileSize),
                this.tileSize, this.tileSize,
                selectedPos.x * this.tileSize, selectedPos.y * this.tileSize,
                this.tileSize, this.tileSize
            );
        }
        else if (this.placeType == "building") {

            spriteSrc = BUILDING_SPRITES;
            if (!hasInventory || !validTerrain) ctx.drawImage(CURSOR_LOCKED, selectedPos.x * this.tileSize, selectedPos.y * this.tileSize);
            else ctx.drawImage(CURSOR_SELECT, selectedPos.x * this.tileSize, selectedPos.y * this.tileSize);

            let cacheSprite = BUILDING_SPRITE_CACHE[this.buildingId];
            let offsetX = Math.floor(cacheSprite.width / this.tileSize / 2) * this.tileSize;
            let offsetY = Math.floor(cacheSprite.height / this.tileSize / 2) * this.tileSize;

            ctx.drawImage(
                cacheSprite,
                0, 0,
                cacheSprite.width, cacheSprite.height,
                (selectedPos.x * this.tileSize) - offsetX, (selectedPos.y * this.tileSize) - offsetY,
                cacheSprite.width, cacheSprite.height,
            );
        }
        else if (this.placeType == "scenery") {

            spriteSrc = SCENERY_SPRITES;
            
            let canAfford = (this.balance >= SCENERY_DATA[this.buildingId].price);
            if (!canAfford || !validTerrain) ctx.drawImage(CURSOR_LOCKED, selectedPos.x * this.tileSize, selectedPos.y * this.tileSize);
            else ctx.drawImage(CURSOR_SELECT, selectedPos.x * this.tileSize, selectedPos.y * this.tileSize);

            ctx.drawImage(
                spriteSrc,
                (this.tierIndex - 1) * this.tileSize, (this.tier * this.tileSize),
                this.tileSize, this.tileSize,
                selectedPos.x * this.tileSize, selectedPos.y * this.tileSize,
                this.tileSize, this.tileSize
            );
        }

        if (!validTerrain) {

            let building;
            if (this.placeType == "building") building = this.buildingCache[this.buildingId];
            else if (this.placeType == "path") building = this.pathCache[this.buildingId];
            else if (this.placeType == "scenery") building = SCENERY_DATA[this.buildingId];

            let terrainString = "";
            if (building.place_style == "shore") terrainString = "Must be placed on shoreline";
            else if (building.place_style == "water") terrainString = "Must be placed in ocean";
            else if (building.place_style == "land") terrainString = "Must be placed on land";
            else if (building.place_style == "grass") terrainString = "Must be placed on grass";
            else if (building.place_style == "shoreland") terrainString = "Must be placed on shores or land";
            else if (building.place_style == "shorewater") terrainString = "Must be placed on shores or water";

            outlineText.drawWrapText(
                ctx, 16, "red", cnItem(terrainString),
                (selectedPos.x * this.tileSize) + 16, 
                ((selectedPos.y + 1) * this.tileSize) - 58,
                2, "center", 160, 20
            );
        }
        this.prevHeldId = this.buildingId;
        this.prevTier = this.tier;
    }

    #drawEffectRadius(ctx, id, x, y) {

        let building = this.buildingCache[id];
        let effectCoords = building.effect.effectCoords;

        for (let i = 0; i < effectCoords.length; i++) {

            if (effectCoords[i].x == 0 && effectCoords[i].y == 0) return;

            let radX = x - effectCoords[i].x;
            let radY = y - effectCoords[i].y;

            ctx.drawImage(
                CURSOR_EFFECT,
                radX * this.tileSize, radY * this.tileSize,
                this.tileSize, this.tileSize
            );
        }
    }

    #drawInspectCursor(ctx, selectedPos) {

        if ((this.prevLoc.x == selectedPos.x && this.prevLoc.y == selectedPos.y) && 
             this.cursorState == this.lastCursorState) return;

        this.#clearCanvas(ctx);
        ctx.drawImage(
            CURSOR_INSPECT,
            selectedPos.x * this.tileSize, selectedPos.y * this.tileSize
        );
    }

    #drawCursor(ctx) {

        let selectedPos = this.#boardLocationFromCursor();
        let outlineText = new OutlineText();

        // Check if inside border
        if (selectedPos.x <= 0 || selectedPos.x >= this.boardSize - 1 ||
            selectedPos.y <= 0 || selectedPos.y >= this.boardSize - 1) return;

        //#region Draw cursors
        if (this.cursorState == "delete") {

            this.#drawDeleteCursor(ctx, selectedPos);
        }
        else if (this.cursorState == "select") {
            
            this.#drawSelectCursor(ctx, selectedPos);
        }
        else if (this.cursorState == "inspect") {

            this.#drawInspectCursor(ctx, selectedPos);
        }
        else {

            this.#clearCanvas(ctx);
            return;
        };
        //#endregion

        // Find hovered landmark
        let onLandmark = (this.boardTile.type == "landmark");

        //#region If hovering over landmark
        if (onLandmark) {

            let landmark = this.boardTile.metaData;

            let costString;
            let costColor = "red";
            let numberHelper = new NumberHelper();

            if (this.earnings == 0) costString = "-X-";
            else {

                // Find cost of landmark removal
                let cost = mathUtils.returnLandmarkPrice(landmark);
                costString = `$${numberHelper.returnShortHandNumber(Math.floor(cost).toLocaleString("fullwide", {useGrouping: false}))}`;

                // Style text green if affordable
                if (cost <= this.balance) costColor = "green";
            }
            
            // Write cost text
            outlineText.drawText(
                ctx, 16, costColor, costString,
                (selectedPos.x * this.tileSize) + 16, 
                ((selectedPos.y + 1) * this.tileSize) + 20,
                2, "center"
            );
        }
        //#endregion

        //#region Draw inspected building's radius
        if (this.boardTile.type == "tower" && this.cursorState == "inspect") {

            let buildingId = this.boardTile.metaData.buildingId - 1;
            if (this.buildingCache[buildingId].effect.boostBonus == 0) return;
            this.#drawEffectRadius(ctx, buildingId, selectedPos.x, selectedPos.y);
        }
        //#endregion
    }

    clearCanvas(canvas) {

        canvas.width = this.boardSize * this.tileSize;
        canvas.height = this.boardSize * this.tileSize;
    }

    draw(ctx, settings, player, groundTile, boardTile, hasBoosted, edictCache, prevLoc) {
        
        if (settings !== undefined) {

            this.tierIndex = settings.selBuilding;
            this.tier = settings.selTier;
            this.placeType = settings.placeType;

            if (player === undefined) return;
            this.earnings = player.earnings;
            this.balance = player.balance;
            this.inventory = player.towerInventory;

            this.buildingId = (this.tierIndex + (this.tier * 8) - 1);
            this.selectedCount = this.inventory[this.buildingId];

            this.buildingCache = edictCache.affectedBuildingResources;
            this.pathCache = edictCache.affectedPathResources;

            this.boardTile = boardTile;
            this.groundTile = groundTile;

            this.hasBoosted = hasBoosted;
            this.cursorState = settings.cursorState;
            this.prevLoc = prevLoc;
        }

        this.#drawCursor(ctx);
        this.lastCursorState = this.cursorState;
    }
}

class BuildingSpriteCache{
    constructor(id) {

        this.buildingId = id;
        this.building = BUILDING_DATA[id];

        this.tileSize = TILE_PIXEL_SIZE;

        this.pixWidth = 1;
        this.pixHeight = 1;
        this.width = this.tileSize;
        this.height = this.tileSize;
    }

    #getSpriteWidth() {

        let radius = this.building.effect.effectCoords;

        let maxX = Math.max.apply(null, radius.map(e => e.x));
        let minX = Math.min.apply(null, radius.map(e => e.x));
        let maxY = Math.max.apply(null, radius.map(e => e.y));
        let minY = Math.min.apply(null, radius.map(e => e.y));

        this.pixWidth = (maxX - minX + 1);
        this.pixHeight = (maxY - minY + 1);
        this.width = (maxX - minX + 1) * this.tileSize;
        this.height = (maxY - minY + 1) * this.tileSize;
    }

    #drawRadius(ctx) {

        let radius = this.building.effect.effectCoords;
        for (let i = 0; i < radius.length; i++) {

            if (radius[i].x == 0 && radius[i].y == 0) continue;

            let tileX = radius[i].x + Math.floor(this.pixWidth / 2);
            let tileY = radius[i].y + Math.floor(this.pixHeight / 2);

            ctx.drawImage(
                CURSOR_EFFECT,
                tileX * this.tileSize, tileY * this.tileSize, 
                this.tileSize, this.tileSize
            );
        }
    }

    #drawSprite(ctx) {

        ctx.drawImage(
            BUILDING_SPRITES,
            ((this.buildingId % 8) * 32), (Math.floor(this.buildingId / 8) * 32),
            32, 32,
            Math.floor(this.pixWidth / 2) * this.tileSize, Math.floor(this.pixHeight / 2) * this.tileSize,
            this.tileSize, this.tileSize
        );
    }

    #testSprite(canvas, ctx) {

        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    generateContext() {

        if (this.building.effect.boostBonus != 0) this.#getSpriteWidth();

        let osc = new OffscreenCanvas(this.width, this.height);
        let oscCtx = osc.getContext("2d", {willReadFrequently: true});

        if (this.building.effect.boostBonus != 0) this.#drawRadius(oscCtx);
        this.#drawSprite(oscCtx);

        //this.#testSprite(osc, oscCtx);

        BUILDING_SPRITE_CACHE.push(osc);
    }
}

class EffectCanvas{
    constructor(tileSize, settings, worldSettings, weatherIndex, meteors, boardMap, lightning) {

        this.settings = settings;
        this.worldSettings = worldSettings;
        this.mapSize = worldSettings.boardSize;
        
        this.isNightTime = false;
        this.viewRect;

        this.boardMap = boardMap;
        this.meteors = meteors;
        this.weatherIndex = weatherIndex;
        this.lightning = lightning;

        this.maxChunkStep = Math.pow(CHUNK_WIDTH, 2);               // Tiles in chunk
        this.chunkCount = Math.pow(this.mapSize / CHUNK_WIDTH, 2);  // Chunks on board
        this.boardChunkWidth = Math.sqrt(this.chunkCount);          // Width of board in chunks
        this.chunkStep = 0;                                         // Current tile step in chunk
        this.boardCache = new Array(this.mapSize).fill().map(() => Array(this.mapSize).fill(0));

        this.tileSize = tileSize / this.settings.lightRes;
    }
    
    #clearCanvas(canvas) {

        canvas.width = this.mapSize * this.tileSize;
        canvas.height = this.mapSize * this.tileSize;
    }

    #getViewRect(canvas) {

        let rect = RECT_GAMEBOARD;
        let realTileSize = rect.width / this.mapSize;

        this.viewRect = {
            top: (-rect.top / realTileSize) - 2, 
            left: (-rect.left / realTileSize) - 2,
            bottom: ((-rect.top + WINDOW_INNERHEIGHT) / realTileSize) + 2,
            right: ((-rect.left + WINDOW_INNERWIDTH) / realTileSize) + 2
        };
    }

    #checkIfInView(x, y) {

        if (x < this.viewRect.left || x > this.viewRect.right || 
            y < this.viewRect.top || y > this.viewRect.bottom) return false;

        else return true;
    }

    #getWeatherShade() {

        let weatherState = this.weatherIndex;
        let weatherDim = (WEATHER_DIM[weatherState.state + 1] - WEATHER_DIM[weatherState.state]) * weatherState.interpolate;
        weatherDim += WEATHER_DIM[weatherState.state];
        weatherDim = mathUtils.clamp(weatherDim / 60, 0.02, 0.98);
        return weatherDim;
    }

    #returnIfNightTime(dimness) {

        if (dimness >= 45) return false;
        else return true;
    }

    #drawShade(canvas, ctx) {

        let weatherDim = 0.01;
        if (this.settings.drawWeather) weatherDim = this.#getWeatherShade();

        let len = TIME_CYCLE_COLORS_BOT.length;
        let hour = (this.worldSettings.timeOfDay / this.worldSettings.dayLength) * len;
        let minutes = hour % 1;

        let nextIndex;
        ((Math.floor(hour) + 1) >= len) ? nextIndex = 0 : nextIndex = (Math.floor(hour) + 1);
        let curIndex = Math.min(Math.floor(hour), len - 1);

        let curColor = TIME_CYCLE_COLORS_BOT.clone()[curIndex];
        let nextColor = TIME_CYCLE_COLORS_BOT.clone()[nextIndex];

        curColor = mathUtils.interpolateHSL(curColor, nextColor, minutes);
        
        let dimAmount;
        if (curColor[2] >= 45) dimAmount = 0.15;
        else dimAmount = 0.9 * ((55 - curColor[2]) / 55);

        curColor[1] *= (1 - weatherDim);
        curColor[2] -= (weatherDim * 50);
        dimAmount = mathUtils.clamp(dimAmount + (weatherDim / 4), 0, 0.8);

        this.isNightTime = this.#returnIfNightTime(curColor[2]);

        let shade = `hsla(${curColor[0]}, ${curColor[1]}%, ${curColor[2]}%, ${dimAmount})`;

        // Fill map
        ctx.fillStyle = shade;
        ctx.fillRect(
            0, 0, canvas.width, canvas.height
        );
    }

    #buildLightList(ctx) {

        for (let j = 0; j < 4; j++) {

            for (let i = 0; i < this.chunkCount; i++) {

                let tileX = this.chunkStep % CHUNK_WIDTH;
                let tileY = Math.floor(this.chunkStep / CHUNK_WIDTH);
    
                let checkX = ((i % this.boardChunkWidth) * CHUNK_WIDTH) + tileX;
                let checkY = (Math.floor(i / this.boardChunkWidth) * CHUNK_WIDTH) + tileY;

                if (checkX == 0 || checkX >= this.mapSize - 1 || checkY == 0 || checkY >= this.mapSize - 1) continue;
                if (this.boardMap[checkX][checkY].type != "tower") {
    
                    this.boardCache[checkX][checkY] = 0;
                    continue;
                }
    
                let buildingData = BUILDING_DATA[this.boardMap[checkX][checkY].metaData.buildingId - 1];
                if (!buildingData.fx.isLightSource) continue;
    
                //if (this.boardCache[checkX][checkY] == buildingData.fx.lightStrength && this.isNightTime) continue;
                if (this.isNightTime) this.boardCache[checkX][checkY] = buildingData.fx.lightStrength;
                else this.boardCache[checkX][checkY] = 0;
                
                //ctx.fillRect(checkX * this.tileSize, checkY * this.tileSize, this.tileSize, this.tileSize);
                //console.log(checkX, checkY);
            }
            if (this.chunkStep + 1 >= this.maxChunkStep) this.chunkStep = 0;
            else this.chunkStep++;
        }
    }

    #drawLightSources(ctx) {

        let radiusInc = this.tileSize / 2;
        let endAngle = 2 * Math.PI;
        let lightRes = this.settings.lightRes;

        //#region Draw lights
        let offCanvas = new OffscreenCanvas(this.mapSize * this.tileSize, this.mapSize * this.tileSize);
        let offCtx = offCanvas.getContext("2d");
        offCtx.fillStyle = `rgba(255, 255, 255, ${0.10})`;

        // Build tower list
        let towerList = [];
        for (let y = 1; y < this.mapSize - 2; y++) {
            for (let x = 1; x < this.mapSize - 2; x++) {

                if (this.boardCache[x][y] == 0 || !this.#checkIfInView(x, y)) continue;
                else towerList.push({light: this.boardCache[x][y], x: x, y: y});
            }
        }

        // Draw building lights
        let thisTowers, nextTowers = towerList;
        for (let l = 0; l < 10; l++) {

            offCtx.beginPath();
            thisTowers = nextTowers;
            nextTowers = [];

            let len = thisTowers.length;
            for (let i = 0; i < len; i++) {
                
                if (thisTowers[i].light < l) continue;

                let posX = (thisTowers[i].x + 0.5) * this.tileSize;
                let posY = (thisTowers[i].y + 0.5) * this.tileSize;

                let randRad = radiusInc + (Math.random() / lightRes);
                offCtx.moveTo(posX, posY);
                offCtx.arc(posX, posY, l * randRad, 0, endAngle);

                nextTowers.push(thisTowers[i]);
            }
            offCtx.closePath();
            offCtx.fill();
        }

        // Do meteors
        for (let l = 0; l < 4; l++) {

            offCtx.beginPath();
            for (let j = 0; j < this.meteors.length; j++) {

                let meteor = this.meteors[j];
                let posX = (meteor.x + 0.5) * this.tileSize;
                let posY = (meteor.y + 0.5) * this.tileSize;

                let randRad = radiusInc + (Math.random() / lightRes);
                offCtx.moveTo(posX, posY);
                offCtx.arc(posX, posY, l * randRad, 0, endAngle);
            }
            offCtx.closePath();
            offCtx.fill();
        }
        ctx.globalCompositeOperation = "destination-out";
        ctx.drawImage(offCanvas, 0, 0);
        ctx.globalCompositeOperation = "source-over";
        //#endregion
    }

    #drawLightning(canvas, ctx) {

        ctx.fillStyle = `hsla(46, 42%, 78%, ${this.lightning * 0.33})`;
        ctx.fillRect(0, 0, canvas.height, canvas.width);
    }

    draw(canvas, ctx, settings, worldSettings, weatherIndex, meteors, boardMap, lightning) {

        if (settings !== undefined) {

            this.settings = settings;
            this.worldSettings = worldSettings;
            this.mapSize = worldSettings.boardSize;
            
            this.isNightTime = false;
            this.viewRect;
    
            this.boardMap = boardMap;
            this.meteors = meteors;
            this.weatherIndex = weatherIndex;
            this.lightning = lightning;
        }

        this.#getViewRect(canvas);
        this.#clearCanvas(canvas);

        if (!this.settings.freezeTime) this.#drawShade(canvas, ctx);
        if (this.settings.drawLights) this.#buildLightList(ctx);
        if (this.isNightTime && this.settings.drawLights) this.#drawLightSources(ctx);
        if (this.lightning != 0 && this.settings.drawLightning) this.#drawLightning(canvas, ctx);
    }
}

class ReflectCanvas{
    constructor(worldSettings, weatherIndex, settings) {

        this.boardSize = worldSettings.boardSize;

        this.timeOfDay = worldSettings.timeOfDay;
        this.dayLength = worldSettings.dayLength;
        this.weatherState = worldSettings.weatherState;

        this.settings = settings;

        this.weatherIndex = weatherIndex;
        this.weatherDim = this.#getWeatherShade();
        this.isNightTime = false;
        this.curShade;

        this.canvasRes = 8;
    }

    #returnMinute() {

        let len = TIME_CYCLE_COLORS_TOP.length;
        let hour = (this.timeOfDay / (this.dayLength * 8)) * len;
        return hour % 1;
    }

    #getWeatherShade() {

        let weatherState = this.weatherIndex;
        let weatherDim = (WEATHER_DIM[weatherState.state + 1] - WEATHER_DIM[weatherState.state]) * weatherState.interpolate;
        weatherDim += WEATHER_DIM[weatherState.state];
        weatherDim = mathUtils.clamp(weatherDim / 60, 0.02, 0.98);
        return weatherDim;
    }

    #setCanvasSize(canvas) {

        canvas.width = this.boardSize * this.canvasRes;
        canvas.height = this.boardSize * this.canvasRes;
    }

    #returnIfNightTime(dimness) {

        if (dimness >= 35) return false;
        else return true;
    }

    #returnDimness() {

        let weatherDim = 0.01;
        if (this.settings.drawWeather) weatherDim = this.#getWeatherShade();

        let len = TIME_CYCLE_COLORS_BOT.length;
        let hour = (this.timeOfDay / this.dayLength) * len;
        let minutes = hour % 1;

        let nextIndex;
        ((Math.floor(hour) + 1) >= len) ? nextIndex = 0 : nextIndex = (Math.floor(hour) + 1);
        let curIndex = Math.min(Math.floor(hour), len - 1);

        let curColor = TIME_CYCLE_COLORS_BOT.clone()[curIndex];
        let nextColor = TIME_CYCLE_COLORS_BOT.clone()[nextIndex];
        curColor = mathUtils.interpolateHSL(curColor, nextColor, minutes);

        this.isNightTime = this.#returnIfNightTime(curColor[2]);

        let dimAmount;
        if (curColor[2] >= 45) dimAmount = 0.15;
        else dimAmount = 0.9 * ((55 - curColor[2]) / 55);

        curColor[1] *= (1 - weatherDim);
        curColor[2] -= (weatherDim * 50);
        dimAmount = mathUtils.clamp(dimAmount + (weatherDim / 2), 0, 0.6);

        this.curShade = curColor;
        return dimAmount;
    }

    #returnSky(canvas) {

        let skyCanvas = new OffscreenCanvas(canvas.width, canvas.height);
        let skyCtx = skyCanvas.getContext("2d");
        skyCtx.fillStyle = `hsla(${this.curShade[0]}, ${this.curShade[1]}%, ${this.curShade[2]}%, ${1})`;
        skyCtx.fillRect(0, 0, canvas.width, canvas.height);
        let skyImage = skyCanvas;

        let weatherDim = this.#getWeatherShade();
        if (this.isNightTime) skyImage = SKY_STARRY;
        if (weatherDim > 0.5 && this.settings.drawWeather) skyImage = SKY_CLOUDY;
        return skyImage;
    }

    #drawReflection(canvas, ctx) {

        let osc = new OffscreenCanvas(canvas.width * 2, canvas.height);
        let oscCtx = osc.getContext("2d");
        
        let pattern = oscCtx.createPattern(this.#returnSky(canvas), "repeat");
        oscCtx.fillStyle = pattern;
        oscCtx.fillRect(0, 0, osc.width, osc.height);

        ctx.drawImage(MASK_CANVAS, 0, 0);
        let minute = this.#returnMinute();
        ctx.globalCompositeOperation = "source-in";
        ctx.drawImage(osc, (canvas.width * minute) - canvas.width, 0);
    }

    draw(canvas, ctx, worldSettings, weatherIndex, settings) {

        if (worldSettings !== undefined) {

            this.boardSize = worldSettings.boardSize;

            this.timeOfDay = worldSettings.timeOfDay;
            this.dayLength = worldSettings.dayLength;
            this.weatherState = worldSettings.weatherState;

            this.settings = settings;

            this.weatherIndex = weatherIndex;
            this.weatherDim = this.#getWeatherShade();
            this.isNightTime = false;
            this.curShade;

            this.canvasRes = 8;
        }

        this.#returnDimness();
        this.#setCanvasSize(canvas);
        if (this.settings.drawReflections) this.#drawReflection(canvas, ctx);
    }
}

class CreateWaterMask{

    constructor(marchCache, groundTiles, boardSize) {

        this.boardSize = boardSize;
        this.marchCache = marchCache;
        this.groundTiles = groundTiles;

        this.canvasRes = 8;
    }

    #returnPointSet(marchIndex) {

        let max = this.canvasRes;
        let half = this.canvasRes / 2;
        let third = this.canvasRes * 0.75;
        let quarter = this.canvasRes * 0.25;

        if      (marchIndex == 1) return [0, max, max, max, half, third];
        else if (marchIndex == 2) return [max, 0, max, max, third, half];
        else if (marchIndex == 3) return [0, 0, max, 0, half, quarter];
        else if (marchIndex == 4) return [0, max, quarter, half, 0, 0];
        else if (marchIndex == 5) return [0, 0, 0, max, max, max];
        else if (marchIndex == 6) return [0, max, max, max, max, 0];
        else if (marchIndex == 7) return [0, 0, max, max, max, 0];
        else if (marchIndex == 8) return [0, 0, 0, max, max, 0];
    }

    #maskWater(maskCtx) {

        let rectSize = (maskCtx.canvas.width / this.boardSize);

        maskCtx.beginPath();
        maskCtx.fillStyle = `rgba(255, 255, 255, 0.5)`;
        for (let i = 0; i < this.boardSize; i++) {
            for (let j = 0; j < this.boardSize; j++) {

                if (this.groundTiles[j][i] > 2) continue;

                if (this.groundTiles[j][i] == 2 && this.marchCache[j][i] > 0) {
                    
                    let marchPath = this.#returnPointSet(this.marchCache[j][i]);

                    maskCtx.moveTo(
                        marchPath[0] + (i * rectSize), 
                        marchPath[1] + (j * rectSize)
                    );
                    for (let k = 1; k < marchPath.length / 2; k++) {

                        maskCtx.lineTo(
                            marchPath[k * 2] + (i * rectSize), 
                            marchPath[(k * 2) + 1] + (j * rectSize)
                        );
                    }
                }
                else {

                    maskCtx.moveTo(i * rectSize, j * rectSize);
                    maskCtx.rect(i * rectSize, j * rectSize, rectSize, rectSize);
                }
            }
        }
        maskCtx.closePath();
        maskCtx.fill();
    }

    generate() {

        let maskCanvas = new OffscreenCanvas(this.boardSize * this.canvasRes, this.boardSize * this.canvasRes);
        let maskCtx = maskCanvas.getContext("2d", {willReadFrequently: true});
        this.#maskWater(maskCtx);
        return maskCanvas;
    }
}

class GroundCanvas{
    constructor(tileSize, mapSize, ground, marchCache) {

        this.tileSize = tileSize;
        this.mapSize = mapSize;

        this.ground = ground;
        this.marchIndex = marchCache;

        this.bgTileSize = 128;
    }

    #clearCanvas(canvas, ctx) {

        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    //https://stackoverflow.com/questions/25701798/a-reusable-function-to-clip-images-into-polygons-using-html5-canvas
    #drawPartialTile(ctx, pointSet, imageSource, drawLoc) {

        ctx.save();
        ctx.beginPath();

        ctx.moveTo(pointSet[0] + drawLoc[0], pointSet[1] + drawLoc[1]);
        let len = pointSet.length / 2;
        for(let i = 1; i < len; i++) {

            ctx.lineTo(pointSet[i * 2] + drawLoc[0], pointSet[(i * 2) + 1] + drawLoc[1]);
        }
        ctx.closePath();

        ctx.lineWidth = 0;
        ctx.strokeStyle = "transparent"
        ctx.stroke();

        ctx.clip();
        ctx.drawImage(
            GROUND_MAP, 
            imageSource[0], imageSource[1],
            this.tileSize, this.tileSize,
            drawLoc[0], drawLoc[1],
            this.tileSize, this.tileSize
        );
        ctx.restore();
    }

    #returnPointSet(marchIndex) {

        if (marchIndex == 1) return [0, 0, 0, 32, 16, 24, 32, 32, 32, 0];
        else if (marchIndex == 2) return [0, 0, 0, 32, 32, 32, 24, 16, 32, 0];
        else if (marchIndex == 3) return [0, 0, 0, 32, 32, 32, 32, 0, 16, 8];
        else if (marchIndex == 4) return [0, 0, 8, 16, 0, 32, 32, 32, 32, 0];
        else if (marchIndex == 5) return [0, 0, 32, 32, 32, 0];
        else if (marchIndex == 6) return [0, 0, 0, 32, 32, 0];
        else if (marchIndex == 7) return [0, 0, 0, 32, 32, 32];
        else if (marchIndex == 8) return [0, 32, 32, 32, 32, 0];
    }

    #drawGroundTiles(ctx) {

        for (let i = 0; i < this.mapSize; i++) {

            for (let j = 0; j < this.mapSize; j++) {

                let marchIndex = this.marchIndex[j][i];
                let newMaterial = (marchIndex == 0) ? this.ground[j][i] : mathUtils.clamp(this.ground[j][i] + 1, 0, 6);

                let boardX = i * this.tileSize, boardY = j * this.tileSize;
                let imageX = ((i % 4) * this.tileSize) + (newMaterial * 128);
                let imageY = ((j % 4) * this.tileSize);

                // If tile is marched
                if (marchIndex != 0) {

                    let prevX = ((i % 4) * this.tileSize) + (this.ground[j][i] * 128);
                    let pointSet = this.#returnPointSet(marchIndex);
                    
                    // Draw tile underneath
                    ctx.drawImage(
                        GROUND_MAP,
                        prevX, imageY, 
                        this.tileSize, this.tileSize,
                        boardX, boardY,
                        this.tileSize, this.tileSize
                    );

                    // Draw marched tile
                    this.#drawPartialTile(ctx, pointSet, [imageX, imageY], [boardX, boardY]);

                // If not marched, draw full tile
                } else {

                    ctx.drawImage(
                        GROUND_MAP,
                        imageX, imageY, 
                        this.tileSize, this.tileSize,
                        boardX, boardY,
                        this.tileSize, this.tileSize
                    );
                }
            }
        }
    }

    draw(canvas, ctx) {

        this.#clearCanvas(canvas, ctx);
        this.#drawGroundTiles(ctx);
    }
}

class ObjectCanvas{
    constructor(canvas, ctx, tileSize, boardSize, boardMap, meteors, updatePosition) {

        this.tileSize = tileSize;
        this.boardSize = boardSize;
        this.backgroundTileSize = 128;

        this.boardMap = boardMap;
        this.meteors = meteors;

        this.ctx = ctx;
        this.canvas = canvas;

        this.updatePosition = updatePosition;

        this.#drawBoard(this.ctx);
        this.#drawMeteors(this.ctx);
    }

    #returnPathIndex(x, y) {

        let tileMarchingType;
        let top = false, left = false, bottom = false, right = false;
        if (this.boardMap[x][y].type == "path") {

            tileMarchingType = PATH_DATA[this.boardMap[x][y].metaData.pathId - 1].fx.marchingType;
            if (this.boardMap[x][y + 1].type == "path" && PATH_DATA[this.boardMap[x][y + 1].metaData.pathId - 1].fx.marchingType == tileMarchingType) bottom = true;
            if (this.boardMap[x - 1][y].type == "path" && PATH_DATA[this.boardMap[x - 1][y].metaData.pathId - 1].fx.marchingType == tileMarchingType) left = true;
            if (this.boardMap[x][y - 1].type == "path" && PATH_DATA[this.boardMap[x][y - 1].metaData.pathId - 1].fx.marchingType == tileMarchingType) top = true;
            if (this.boardMap[x + 1][y].type == "path" && PATH_DATA[this.boardMap[x + 1][y].metaData.pathId - 1].fx.marchingType == tileMarchingType) right = true;
        }
        else if (this.boardMap[x][y].type == "tower") {

            // TODO: this needs a lot of work but isnt supported by any buildings as of yet
            // Needs support for different marching styles (row, column, etc.)
            if (!BUILDING_DATA[this.boardMap[x][y].metaData.buildingId - 1].fx.isMarching) return;
            tileMarchingType = BUILDING_DATA[this.boardMap[x][y].metaData.buildingId - 1].fx.marchingType;
            if (BUILDING_DATA[(this.boardMap[x][y + 1].type == "tower") ? this.boardMap[x][y + 1].metaData.buildingId - 1 : 1].fx.marchingType == tileMarchingType) bottom = true; //   B  
            if (BUILDING_DATA[(this.boardMap[x - 1][y].type == "tower") ? this.boardMap[x - 1][y].metaData.buildingId - 1 : 1].fx.marchingType == tileMarchingType) left = true;   // C x A <- Counter-clockwise from here
            if (BUILDING_DATA[(this.boardMap[x][y - 1].type == "tower") ? this.boardMap[x][y - 1].metaData.buildingId - 1 : 1].fx.marchingType == tileMarchingType) top = true;    //   D  
            if (BUILDING_DATA[(this.boardMap[x + 1][y].type == "tower") ? this.boardMap[x + 1][y].metaData.buildingId - 1 : 1].fx.marchingType == tileMarchingType) right = true;  // Make this better
        }
        else if (this.boardMap[x][y].type == "scenery") {

            if (!SCENERY_DATA[this.boardMap[x][y].metaData.sceneryId - 1].fx.isMarching) return;
            tileMarchingType = SCENERY_DATA[this.boardMap[x][y].metaData.sceneryId - 1].fx.marchingType;
            if (this.boardMap[x][y + 1].type == "scenery" && SCENERY_DATA[this.boardMap[x][y + 1].metaData.sceneryId - 1].fx.marchingType == tileMarchingType) bottom = true;
            if (this.boardMap[x - 1][y].type == "scenery" && SCENERY_DATA[this.boardMap[x - 1][y].metaData.sceneryId - 1].fx.marchingType == tileMarchingType) left = true;
            if (this.boardMap[x][y - 1].type == "scenery" && SCENERY_DATA[this.boardMap[x][y - 1].metaData.sceneryId - 1].fx.marchingType == tileMarchingType) top = true;
            if (this.boardMap[x + 1][y].type == "scenery" && SCENERY_DATA[this.boardMap[x + 1][y].metaData.sceneryId - 1].fx.marchingType == tileMarchingType) right = true;
        }
        //#region Return march index
        // Full
        if (top && left && bottom && right) return 0;
    
        // "C" shaped
        else if (right && top && left)      return 1;
        else if (top && left && bottom)     return 2;
        else if (left && bottom && right)   return 3;
        else if (bottom && right && top)    return 4;
        
        // Corner
        else if (right && top)              return 5;
        else if (top && left)               return 6;
        else if (left && bottom)            return 7;
        else if (bottom && right)           return 8;

        // Line
        else if (bottom && top)             return 9;
        else if (left && right)             return 10;

        // Edge
        else if (right)                     return 11;
        else if (top)                       return 12;
        else if (left)                      return 13;
        else if (bottom)                    return 14;

        // None
        else return 15;
        //#endregion
    }

    #drawTower(tile) {

        let tower = tile.metaData;
        
        let spriteX = (tower.buildingId - 1) % 8;
        let spriteY = Math.floor((tower.buildingId - 1) / 8);

        this.ctx.drawImage(
            BUILDING_SPRITES,
            spriteX * this.tileSize, spriteY * this.tileSize,
            this.tileSize, this.tileSize,
            tower.x * this.tileSize, tower.y * this.tileSize,
            this.tileSize, this.tileSize
        );
    }

    #drawLandmark(tile) {

        let landmark = tile.metaData;

        let sourceY = (landmark.landmarkType == "r") ? 0 : 1;
        sourceY *= this.tileSize;
        let sourceX = landmark.landmarkId * this.tileSize;

        this.ctx.drawImage(
            GROUND_LANDMARKS,
            sourceX, sourceY,
            this.tileSize, this.tileSize,
            landmark.x * this.tileSize, landmark.y * this.tileSize,
            this.tileSize, this.tileSize
        );
    }

    #drawPath(tile) {

        let path = tile.metaData;
        
        let marchIndex = this.#returnPathIndex(path.x, path.y) * TILE_PIXEL_SIZE;
        let pathSprite = (path.pathId - 1) * TILE_PIXEL_SIZE;

        this.ctx.drawImage(
            PATH_MARCH_ATLAS,
            pathSprite, marchIndex,
            this.tileSize, this.tileSize,
            path.x * this.tileSize, path.y * this.tileSize,
            this.tileSize, this.tileSize
        );
    }

    #drawScenery(tile) {

        let scenery = tile.metaData;

        if (SCENERY_DATA[scenery.sceneryId - 1].fx.isMarching) {
            
            let marchIndex = this.#returnPathIndex(scenery.x, scenery.y) * TILE_PIXEL_SIZE;
            let scenerySprite = SCENERY_DATA[scenery.sceneryId - 1].march_index * TILE_PIXEL_SIZE;
        
            this.ctx.drawImage(
                SCENERY_MARCH_ATLAS,
                scenerySprite, marchIndex,
                this.tileSize, this.tileSize,
                scenery.x * this.tileSize, scenery.y * this.tileSize,
                this.tileSize, this.tileSize
            );
        }
        else {

            let spriteX = (scenery.sceneryId - 1) % 8;
            let spriteY = Math.floor((scenery.sceneryId - 1) / 8);
    
            this.ctx.drawImage(
                SCENERY_SPRITES,
                spriteX * this.tileSize, spriteY * this.tileSize,
                this.tileSize, this.tileSize,
                scenery.x * this.tileSize, scenery.y * this.tileSize,
                this.tileSize, this.tileSize
            );
        }
    }

    #drawBoard() {

        let len = this.boardSize;
        for (let y = 0; y < len; y++) {
            for (let x = 0; x < len; x++) {

                let tile = this.boardMap[x][y];

                if (tile.type == "tower") this.#drawTower(tile);
                else if (tile.type == "landmark") this.#drawLandmark(tile);
                else if (tile.type == "path") this.#drawPath(tile);
                else if (tile.type == "scenery") this.#drawScenery(tile);
            }
        }
    }

    #drawMeteors() {

        for (let i = 0; i < this.meteors.length; i++) {

            let meteor = this.meteors[i];
            this.ctx.drawImage(
                GROUND_METEOR,
                meteor.x * this.tileSize, meteor.y * this.tileSize,
                this.tileSize, this.tileSize
            );
        }
    }

    #updateSurroundingPath(posX, posY) {

        for (let x = posX - 1; x < posX + 2; x++) {
            for (let y = posY -1; y < posY + 2; y++) {

                if (x < 0 || x > this.boardSize - 1 || y < 0 || y > this.boardSize - 1) continue;

                let tile = this.boardMap[x][y];
                let metaData = tile.metaData;

                let structureData;
                let spriteSheet;
                let tileSet;
                if (tile.type == "tower") structureData = BUILDING_DATA[metaData.buildingId - 1];
                else if (tile.type == "path") {

                    structureData = PATH_DATA[metaData.pathId - 1];
                    spriteSheet = PATH_MARCH_ATLAS;
                    tileSet = (metaData.pathId - 1) * TILE_PIXEL_SIZE;
                }
                else if (tile.type == "scenery") {

                    structureData = SCENERY_DATA[metaData.sceneryId - 1];
                    spriteSheet = SCENERY_MARCH_ATLAS;
                    tileSet = structureData.march_index * TILE_PIXEL_SIZE;
                }
                else if (tile.type == "null" || tile.type == "landmark") continue;

                // in future, reference whatever marching spritesheets
                // for now, only paths are marched
                if (structureData.fx.isMarching) {

                    let placeX = x * this.tileSize;
                    let placeY = y * this.tileSize;
                    let marchIndex = this.#returnPathIndex(x, y);

                    this.ctx.clearRect(placeX, placeY, this.tileSize, this.tileSize);
                    this.ctx.drawImage(
                        spriteSheet,
                        tileSet, marchIndex * this.tileSize,
                        this.tileSize, this.tileSize,
                        placeX, placeY,
                        this.tileSize, this.tileSize
                    );
                }
            }
        }
    }

    updateAtPosition() {

        // Clear previous index
        let placeX = this.updatePosition.x * this.tileSize;
        let placeY = this.updatePosition.y * this.tileSize;
        this.ctx.clearRect(placeX, placeY, this.tileSize, this.tileSize);

        // Check for meteor
        if (this.updatePosition instanceof MeteorPowerup) {

            let index = this.meteors.findIndex(e => e.x === this.updatePosition.x && e.y === this.updatePosition.y);
            if (index != -1) {

                this.ctx.drawImage(
                    GROUND_METEOR,
                    placeX, placeY,
                    this.tileSize, this.tileSize
                );
            }
            return;
        }
        
        // Get tile
        let tile = this.boardMap[this.updatePosition.x][this.updatePosition.y];
        let metaData = tile.metaData;

        let structureData;
        if (tile.type == "tower") structureData = BUILDING_DATA[metaData.buildingId - 1];
        else if (tile.type == "path") structureData = PATH_DATA[metaData.pathId - 1];
        else if (tile.type == "scenery") structureData = SCENERY_DATA[metaData.sceneryId - 1];

        // Add building to canvas
        this.#updateSurroundingPath(this.updatePosition.x, this.updatePosition.y);
        if (tile.type == "null") return;

        let spriteX, spriteY;
        let spriteSrc;
        if (tile.type == "tower") {

            spriteX = (metaData.buildingId - 1) % 8;
            spriteY = Math.floor((metaData.buildingId - 1) / 8);
            spriteSrc = BUILDING_SPRITES;
        }
        else if (tile.type == "path") {

            spriteX = (metaData.pathId - 1);
            spriteY = this.#returnPathIndex(metaData.x, metaData.y);
            spriteSrc = PATH_SPRITES;
        }
        else if (tile.type == "scenery") {

            spriteX = (metaData.sceneryId - 1) % 8;
            spriteY = Math.floor((metaData.sceneryId - 1) / 8);
            spriteSrc = SCENERY_SPRITES;
        }

        if (!structureData.fx.isMarching) {
            this.ctx.drawImage(
                spriteSrc,
                spriteX * this.tileSize, spriteY * this.tileSize,
                this.tileSize, this.tileSize,
                placeX, placeY,
                this.tileSize, this.tileSize
            );
        }
    }

    draw(tileSize, boardSize, boardMap, meteors, updatePosition) {

        if (tileSize !== undefined) {

            this.tileSize = tileSize;
            this.boardSize = boardSize;
            this.backgroundTileSize = 128;
            
            this.boardMap = boardMap;
            this.meteors = meteors;
            
            this.updatePosition = updatePosition;
        }
        this.updateAtPosition();
    }
};

class BoostCanvas{
    constructor(effectMap, settings, mapSize) {

        this.tileSize = TILE_PIXEL_SIZE;
        this.effectMap = effectMap;
        this.settings = settings;

        this.boardCache = new Array(mapSize).fill().map(() => Array(mapSize).fill(100));
    }

    #returnHeatmapColor(value) {

        let color = Math.min((value * 10), 200);
        return `hsla(${color}, 100%, 50%, 0.33)`;
    }

    #drawHeatMap(ctx) {

        let outlineText = new OutlineText();

        let len = this.effectMap.length;
        for (let i = 0; i < len; i++) {
            for (let j = 0; j < len; j++) {

                if (this.effectMap[j][i] == this.boardCache[j][i]) continue;

                let drawX = i * this.tileSize;
                let drawY = j * this.tileSize;

                // Clear and redraw colored rect
                ctx.clearRect(drawX, drawY, this.tileSize, this.tileSize);

                if (this.effectMap[j][i] == 100) continue;
                ctx.fillStyle = this.#returnHeatmapColor(this.effectMap[j][i] / 100);
                ctx.fillRect(
                    drawX, drawY,
                    this.tileSize, this.tileSize);

                // Write boost amount
                let bonus = `${this.effectMap[j][i]}%`;
                outlineText.drawText(ctx, 9, "white", bonus, drawX + 16, drawY + 20, 3, "center");

                this.boardCache[j][i] = this.effectMap[j][i];
            }
        }
    }

    draw(canvas, ctx, effectMap, settings) {
        
        if (effectMap !== undefined) {

            this.tileSize = TILE_PIXEL_SIZE;
            this.effectMap = effectMap;
            this.settings = settings;
        }
        if (this.settings.showBuff) this.#drawHeatMap(ctx);
    }
}

class GridCanvas{
    constructor(tileSize, mapSize, settings) {

        this.tileSize = tileSize;
        this.mapSize = mapSize;
        
        this.settings = settings;
    }

    #clearCanvas(canvas, ctx) {

        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    #drawGrid(canvas, ctx) {

        ctx.beginPath();
        for (let i = 0; i < canvas.width + 1; i += this.tileSize) {

            ctx.moveTo(i, 1);
            ctx.lineTo(i, canvas.height);
        }
        for (let i = 0; i < canvas.height + 1; i += this.tileSize) {

            ctx.moveTo(1,  i);
            ctx.lineTo(canvas.width, i);
        }
        ctx.strokeStyle = "rgba(0, 0, 0, 0.15)";
        ctx.lineWidth = 3;
        ctx.stroke();
        ctx.strokeStyle = "rgba(64, 64, 64, 0.15)";
        ctx.lineWidth = 1;
        ctx.stroke()
    }

    draw(canvas, ctx) {

        this.#clearCanvas(canvas, ctx);
        this.#drawGrid(canvas, ctx);
    }
}

class WarningCanvas{
    constructor(boardSize) {

        this.tileSize = TILE_PIXEL_SIZE;

        this.chunkX = 0;
        this.chunkY = 0;
        this.chunkStep = 0;

        this.chunkWidth = boardSize / CHUNK_WIDTH;
        this.chunkSize = boardSize / this.chunkWidth;

        this.boardMap;
        this.boardCache = new Array(boardSize).fill().map(() => Array(boardSize).fill(false));
    }

    #drawWarnings(ctx) {

        //console.log(this.chunkX, this.chunkY)
        // the issue is that this isn't called per-chunk check, so it falls out of sync and has delay
        // should keep a cache of which alerts have already been drawn, if different, draw or erase

        for (let y = this.chunkY; y < this.chunkY + this.chunkSize; y++) {

            for (let x = this.chunkX; x < this.chunkX + this.chunkSize; x++) {

                if (this.boardMap[x][y].type == "tower") {

                    let tile = this.boardMap[x][y].metaData;
                    let structureData = BUILDING_DATA[tile.buildingId - 1];

                    // Check if needs warning
                    let bordersPath = tile.bordersPath;
                    let requiresPath = structureData.requires_path;

                    let drawAlert = (!bordersPath && requiresPath);

                    if (drawAlert == this.boardCache[x][y]) continue;
                    else this.boardCache[x][y] = drawAlert;

                    if (!drawAlert) {
                    
                        ctx.clearRect(
                            tile.x * this.tileSize, tile.y * this.tileSize,
                            this.tileSize, this.tileSize
                        );
                    }
                    else {

                        ctx.drawImage(
                            TILE_WARNING,
                            tile.x * this.tileSize, tile.y * this.tileSize,
                            this.tileSize, this.tileSize
                        );
                    }
                }
                else {

                    if (this.boardCache[x][y]) {

                        ctx.clearRect(
                            x * this.tileSize, y * this.tileSize,
                            this.tileSize, this.tileSize
                        );
                        this.boardCache[x][y] = false;
                    }
                }
            }
        }
    }

    update(ctx, boardMap, chunkStep) {

        this.boardMap = boardMap;
        this.chunkStep = chunkStep;

        //this.chunkX = this.chunkSize * (this.chunkStep % CHUNK_WIDTH);
        //this.chunkY = this.chunkSize * Math.floor(this.chunkStep / CHUNK_WIDTH);

        this.chunkX = this.chunkSize * (this.chunkStep % this.chunkWidth);
        this.chunkY = this.chunkSize * Math.floor(this.chunkStep / this.chunkWidth);

        //this.#clearCanvas(ctx);
        this.#drawWarnings(ctx);
    }
}