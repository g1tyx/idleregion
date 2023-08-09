//© 2023 - 2023 www.idleregion.com - All Rights Reserved.

drawBoard = function() {

    function setBoardCanvasSize() {

        let boardSize = gameState.worldSettings.boardSize * TILE_PIXEL_SIZE;
        for (let canvas of boardCanvi) {
    
            canvas.width = boardSize;
            canvas.height = boardSize;
            canvas.style.display = "block";
    
            let rect = canvas.getBoundingClientRect();
            canvas.style.left = `${(WINDOW_INNERWIDTH / 2) - (rect.width / 2)}px`;
            canvas.style.top = `${(WINDOW_INNERHEIGHT / 2) - (rect.height / 2)}px`;
        }
        // Effect boards need special treatment
        effectBoard.style.width = `${boardSize}px`;
        effectBoard.style.height = `${boardSize}px`;
        effectBoard.style.imageRendering = "auto";

        reflectBoard.style.width = `${boardSize}px`;
        reflectBoard.style.height = `${boardSize}px`;
        reflectBoard.style.imageRendering = "auto";

        boostBoard.style.imageRendering = "auto";

        // Show/hide buff grids
        drawBoard.drawGridCanvas();
        if (gameSettings.showGrid) gridCanvas.style.display = "block";
        else gridCanvas.style.display = "none";

        if (gameSettings.showBuff) {

            drawBoard.drawBoostCanvas();
            boostBoard.style.display = "block";
        }
        else boostBoard.style.display = "none";
    }

    function drawGroundCanvas() {

        let canvas = new GroundCanvas(
            TILE_PIXEL_SIZE,
            gameState.worldSettings.boardSize,
            gameState.environment.ground,
            mapCache.marchCache
        );
        canvas.draw(groundBoard, groundCtx);
    }

    function generateWaterMask() {

        canvas = new CreateWaterMask(
            mapCache.marchCache,
            gameState.environment.ground,
            gameState.worldSettings.boardSize
        );
        MASK_CANVAS = canvas.generate();
    }

    function generateBuildingSpriteCache() {

        for (let i = 0; i < BUILDING_DATA.length; i++) {

            let test = new BuildingSpriteCache(i);
            test.generateContext();
        }
    }

    var reflectionCanvas;
    function drawReflectionCanvas() {

        if (reflectionCanvas == null) {

            reflectionCanvas = new ReflectCanvas(
                gameState.worldSettings,
                gameState.returnWeatherValue(),
                gameSettings
            );
            reflectionCanvas.draw(reflectBoard, reflectCtx);
        }
        else {

            reflectionCanvas.draw(
                reflectBoard, 
                reflectCtx,
                gameState.worldSettings,
                gameState.returnWeatherValue(),
                gameSettings
            );
        }
    }

    var objectCanvas;
    function drawObjectCanvas(position) {

        if (objectCanvas == null) {

            objectCanvas = new ObjectCanvas(
                gameBoard,
                gameCtx,
                TILE_PIXEL_SIZE, 
                gameState.worldSettings.boardSize, 
                gameState.boardState.boardMap, 
                gameState.environment.meteors,
                position
            );
        }
        else {

            objectCanvas.draw(
                TILE_PIXEL_SIZE, 
                gameState.worldSettings.boardSize, 
                gameState.boardState.boardMap, 
                gameState.environment.meteors,
                position
            );
        }
    }

    function drawBorderCanvas() {

        let canvas = new BorderCanvas(
            TILE_PIXEL_SIZE,
            gameState.worldSettings.boardSize
        );
        canvas.draw(borderBoard, borderCtx);
    }

    var effectCanvas;
    function drawEffectCanvas() {

        if (effectCanvas == null) {

            effectCanvas = new EffectCanvas(
                TILE_PIXEL_SIZE,
                gameSettings,
                gameState.worldSettings,
                gameState.returnWeatherValue(),
                gameState.environment.meteors,
                gameState.boardState.boardMap,
                lightningState
            );
            effectCanvas.draw(effectBoard, effectCtx);
        }
        else {

            effectCanvas.draw(
                effectBoard, 
                effectCtx,
                gameSettings,
                gameState.worldSettings,
                gameState.returnWeatherValue(),
                gameState.environment.meteors,
                gameState.boardState.boardMap,
                lightningState
            );
        }
        if (lightningState > 0) lightningState--;
    }

    var previousCursorLoc = {x: -1, y: -1};
    var cursorCanvas;
    function drawCursorCanvas() {

        let selPos = boardUtils.returnGameBoardPos();
        if (selPos.x != mathUtils.clamp(selPos.x, 1, gameState.worldSettings.boardSize - 2) ||
            selPos.y != mathUtils.clamp(selPos.y, 1, gameState.worldSettings.boardSize - 2)) {

            if (cursorCanvas != null) cursorCanvas.clearCanvas(cursorBoard);
            return;
        }

        if (cursorCanvas == null) {

            cursorCanvas = new CursorCanvas(
                TILE_PIXEL_SIZE,
                gameState.worldSettings.boardSize,
                gameSettings,
                gameState.player,
                gameState.environment.ground[selPos.y][selPos.x],
                gameState.boardState.boardMap[selPos.x][selPos.y],
                gameState.player.achievements.buffedTower,
                gameState.edictCache,
                previousCursorLoc
            );
            cursorCanvas.draw(cursorBoard, cursorCtx);
        }
        else {

            cursorCanvas.draw(
                cursorCtx,
                gameSettings,
                gameState.player,
                gameState.environment.ground[selPos.y][selPos.x],
                gameState.boardState.boardMap[selPos.x][selPos.y],
                gameState.player.achievements.buffedTower,
                gameState.edictCache,
                previousCursorLoc
            );
        }
        previousCursorLoc = boardUtils.returnGameBoardPos();
    }

    function drawGridCanvas() {
    
        let canvas = new GridCanvas(
            TILE_PIXEL_SIZE,
            gameState.worldSettings.boardSize,
            gameSettings
        )
        canvas.draw(gridCanvas, gridCtx);
    }

    var boostCanvas;
    function drawBoostCanvas() {

        if (boostCanvas == null) {

            boostCanvas = new BoostCanvas(
                gameState.boardState.effectMap,
                gameSettings,
                gameState.worldSettings.boardSize
            )
            boostCanvas.draw(boostBoard, boostCtx);
        }
        else {

            boostCanvas.draw(
                boostBoard, boostCtx,
                gameState.boardState.effectMap,
                gameSettings
            )
        }
    }

    function createWarningCanvas() {

        let canvas = new WarningCanvas(gameState.worldSettings.boardSize);
        return canvas;
    }

    function drawDayNightCycle() {

        let weatherState = gameState.returnWeatherValue();
    
        let weatherDim = 0;
        if (gameSettings.drawWeather) {
    
            weatherDim = (WEATHER_DIM[weatherState.state + 1] - WEATHER_DIM[weatherState.state]) * weatherState.interpolate;
            weatherDim += WEATHER_DIM[weatherState.state];
            weatherDim = mathUtils.clamp(weatherDim / 50, 0.01, 0.99);
        }
    
        // Get current and next colors
        let len = TIME_CYCLE_COLORS_TOP.length;
        let hour = (gameState.worldSettings.timeOfDay / gameState.worldSettings.dayLength) * len;
        let minutes = hour % 1;
    
        // Get this and next color index
        let nextIndex;
        ((Math.floor(hour) + 1) >= len) ? nextIndex = 0 : nextIndex = (Math.floor(hour) + 1);
        let curIndex = Math.min(Math.floor(hour), len - 1);
        
        // Separate values for top and bottom of gradient
        let curTop = TIME_CYCLE_COLORS_TOP.clone()[curIndex];
        let nextTop = TIME_CYCLE_COLORS_TOP.clone()[nextIndex];
        let curBot = TIME_CYCLE_COLORS_BOT.clone()[curIndex];
        let nextBot = TIME_CYCLE_COLORS_BOT.clone()[nextIndex];
    
        // Interpolate between this and next hsl
        curTop = mathUtils.interpolateHSL(curTop, nextTop, minutes);
        curBot = mathUtils.interpolateHSL(curBot, nextBot, minutes);
    
        // Find shade and night state
        let dimAmount = (curTop[2] >= 45) ? 1 : (curTop[2]) / 45;
    
        curTop[1] *= (1 - weatherDim);
        curBot[1] *= (1 - weatherDim);
    
        curTop[2] -= Math.max((weatherDim * 25), 7);
        curBot[2] -= Math.max((weatherDim * 25), 7);
        
        if (dimAmount != 1) dimAmount = mathUtils.clamp(dimAmount + (weatherDim), 0, 0.9);
        if (weatherDim >= 0.5) dimAmount = mathUtils.clamp(dimAmount + (weatherDim), 0, 0.66);

        // Apply color
        boardHolder.style.background = (
            `linear-gradient(360deg, 
            hsl(${curBot[0]}, ${curBot[1]}%, ${curBot[2]}%, ${dimAmount + 0.5}) 15%, 
            hsl(${curTop[0]}, ${curTop[1]}%, ${curTop[2]}%, ${dimAmount}) 85%)`
        );

        let backImage = (weatherDim < 0.5) ? 
                        `,url('./res/images/ui/layout/backgrounds/night-sky.png?v=0-3-3a')` : 
                        `,url('./res/images/ui/layout/backgrounds/cloudy-sky.png?v=0-3-3a')`;

        if (dimAmount != 1) {

            boardHolder.style.background += backImage;
            boardHolder.style.backgroundPosition = `bottom 0px left ${minutes * 256}px`;
        }

        if (gameSettings.drawWeather) {

            let rainSpeed = 7000 * (1 + gameState.worldSettings.weatherState - WEATHER_THRESHOLDS[2]);
            if (gameState.worldSettings.weatherState > WEATHER_THRESHOLDS[3]) {

                effectBoard.style.background = `url(./res/images/ui/layout/backgrounds/rain-drops.png?v=0-3-3a)`;
                effectBoard.style.backgroundPosition = `top ${minutes * rainSpeed}px left ${minutes * (rainSpeed / 2)}px`;
            }
            else if (gameState.worldSettings.weatherState > WEATHER_THRESHOLDS[2]) {

                effectBoard.style.background = `url(./res/images/ui/layout/backgrounds/rain-drops-light.png?v=0-3-3a)`;
                effectBoard.style.backgroundPosition = `top ${minutes * rainSpeed}px left ${minutes * (rainSpeed / 2)}px`;
            }
            else effectBoard.style.background = "";
        }
        else effectBoard.style.background = "";

        // Style box shadow
        groundBoard.style.boxShadow = `0px 0px 60px 30px hsla(${curTop[0]}, ${curTop[1]}%, 20%, 0.33)`;
    }

    return {
        setBoardCanvasSize: setBoardCanvasSize,
        drawGroundCanvas: drawGroundCanvas,
        drawObjectCanvas: drawObjectCanvas,
        drawBorderCanvas: drawBorderCanvas,
        drawEffectCanvas: drawEffectCanvas,
        drawCursorCanvas: drawCursorCanvas,
        drawGridCanvas: drawGridCanvas,
        drawBoostCanvas: drawBoostCanvas,
        drawDayNightCycle: drawDayNightCycle,
        drawReflectionCanvas: drawReflectionCanvas,
        generateWaterMask: generateWaterMask,
        createWarningCanvas: createWarningCanvas,
        generateBuildingSpriteCache: generateBuildingSpriteCache
    }
}();

drawUI = function () {

    //#region Game controls
    var inventoryArrowLeft, inventoryArrowRight;
    function drawInventoryArrows() {

        if (inventoryArrowLeft == null) {

            inventoryArrowLeft = new InventoryArrows(
                leftInvArrow, 
                "left", 
                gameSettings.selTier != 0,
                gameSettings.selTier,
                gameSettings.placeType
            );
            inventoryArrowLeft.draw(leftInvArrowCtx);
        }
        else {

            inventoryArrowLeft.draw(
                leftInvArrowCtx, 
                "left", 
                gameSettings.selTier != 0,
                gameSettings.selTier,
                gameSettings.placeType
            );
        }
        
        let pageLength = mathUtils.returnInventoryPageLength();
        if (inventoryArrowRight == null) {

            inventoryArrowRight = new InventoryArrows(
                rightInvArrow, 
                "right", 
                Math.min(pageLength, gameSettings.selTier) != pageLength,
                gameSettings.selTier,
                gameSettings.placeType
            );
            inventoryArrowRight.draw(rightInvArrowCtx);
        }
        else {

            inventoryArrowRight.draw(
                rightInvArrowCtx, 
                "right", 
                Math.min(pageLength, gameSettings.selTier) != pageLength,
                gameSettings.selTier,
                gameSettings.placeType
            );
        }
    }

    function setHintLocation() {

        let optionsRect = RECT_OPTIONSPANEL;
        let extraHeight = optionsRect.height / 8;
        hintTop = optionsRect.bottom + extraHeight;
        hintContainer.style.top = `${hintTop}px`;

        hintContainer.style.height = "auto";
        let screenHeight = window.innerHeight;
        let autoRect = hintContainer.getBoundingClientRect();
        hintContainer.style.height = `${Math.min(screenHeight - autoRect.top - 50, autoRect.height)}px`;
    }

    function drawTileSelectors() {

        let building = document.getElementById("tile-type-building");
        let buildingCtx = building.getContext("2d");
        let buildingTitle = new TileTypeSelector("building", gameSettings.placeType == "building");
        buildingTitle.draw(building, buildingCtx);

        let path = document.getElementById("tile-type-path");
        let pathCtx = path.getContext("2d");
        let pathTitle = new TileTypeSelector("path", gameSettings.placeType == "path");
        pathTitle.draw(path, pathCtx);

        let scenery = document.getElementById("tile-type-scenery");
        let sceneryCtx = scenery.getContext("2d");
        let sceneryTitle = new TileTypeSelector("scenery", gameSettings.placeType == "scenery");
        sceneryTitle.draw(scenery, sceneryCtx);
    }

    var controlPanelCanvas;
    function drawControlPanel() {

        if (controlPanelCanvas == null) {

            controlPanelCanvas = new ControlPanel(gameSettings);
            controlPanelCanvas.draw(controlPanel, controlCtx);
        }
        else {

            controlPanelCanvas.draw(controlPanel, controlCtx, gameSettings);
        }
    }

    function drawHelpControlPanel() {

        canvas = new HelpControlPanel();
        canvas.draw(optionsPanel, optionsCtx);
    }

    var inventoryCanvas;
    function drawInventory() {

        let placeHint = !gameState.player.achievements.towerPlaced[0] && gameState.player.buildingsOwned[0] > 0;

        if (inventoryCanvas == null) {

            inventoryCanvas = new Inventory(
                inventoryCtx,
                gameState.player.towerInventory,
                gameState.player.balance,
                gameSettings,
                gameSettings.placeType,
                gameState.edictCache,
                placeHint
            );
            inventoryCanvas.draw(inventoryPanel, inventoryCtx);
        }
        else {

            inventoryCanvas.draw(
                inventoryPanel, 
                inventoryCtx,
                gameState.player.towerInventory,
                gameState.player.balance,
                gameSettings,
                gameSettings.placeType,
                gameState.edictCache,
                placeHint
            );
        }
    }
    //#endregion

    //#region Edict stuff
    function drawEdictBook() {

        page = gameSettings.lastEdictPage;
        drawContextualUI.inSettingsMenu = true;

        let edictHolder = document.createElement("div");
        edictHolder.id = "edict-holder";
        drawContextualUI.addToAlertWindow(edictHolder);

        //#region Book graphics
        let edictCanvas = document.createElement("canvas");
        let canvas = new EdictBook();
        canvas.draw(edictCanvas, edictCanvas.getContext("2d"));
        edictCanvas.id = "edict-book";

        let edictFluff = document.createElement("canvas");
        new EdictText(
            edictFluff, 
            edictFluff.getContext("2d"), 
            page, 
            gameState.player.edicts,
            gameState.boardState.resources,
            gameState.boardState.regionNeeds,
            gameSettings.realResourceNumbers
        );
        edictFluff.id = "edict-text";

        let bookHolder = document.createElement("div");
        bookHolder.id = "edict-book-holder";
        bookHolder.appendChild(edictCanvas);
        bookHolder.appendChild(edictFluff);
        //#endregion

        //#region Arrows
        let arrowHolder = document.createElement("div");
        arrowHolder.id = "edict-arrow-holder";

        let leftArrowCanvas = document.createElement("canvas");
        new EdictPageArrow(leftArrowCanvas, leftArrowCanvas.getContext("2d"), page, "left");
        leftArrowCanvas.id = "edict-arrow";
        leftArrowCanvas.addEventListener("click", function() {

            if (Math.max(0, gameSettings.lastEdictPage - 2) == gameSettings.lastEdictPage) return;

            gameSettings.lastEdictPage = Math.max(0, gameSettings.lastEdictPage - 2);
            fluffUtils.playSound("edict-turn");
            EventListeners.clearAlertCanvas();
            drawUI.drawEdictBook();
        });

        let rightArrowCanvas = document.createElement("canvas");
        new EdictPageArrow(rightArrowCanvas, rightArrowCanvas.getContext("2d"), page, "right");
        rightArrowCanvas.id = "edict-arrow";
        rightArrowCanvas.addEventListener("click", function() {

            if (gameSettings.lastEdictPage + 2 > EDICT_BOOK_DATA.length - 1) return;

            gameSettings.lastEdictPage = Math.min(EDICT_BOOK_DATA.length - 1, gameSettings.lastEdictPage + 2);
            fluffUtils.playSound("edict-turn");
            EventListeners.clearAlertCanvas();
            drawUI.drawEdictBook();
        });

        let closeEdictCanvas = document.createElement("canvas");
        new EdictPageArrow(closeEdictCanvas, closeEdictCanvas.getContext("2d"), page, "close");
        closeEdictCanvas.id = "edict-arrow";
        closeEdictCanvas.addEventListener("click", function() {

            drawContextualUI.inSettingsMenu = false;
            fluffUtils.playSound("edict-close");
            EventListeners.clearAlertCanvas();
        });

        arrowHolder.appendChild(leftArrowCanvas);
        arrowHolder.appendChild(closeEdictCanvas);
        arrowHolder.appendChild(rightArrowCanvas);
        //#endregion

        generateEdictIcons();

        //#region Size book
        let width, height;
        if (WINDOW_INNERHEIGHT > WINDOW_INNERWIDTH / 1.52) width = WINDOW_INNERWIDTH * 0.75, height = width / 1.52;
        else height = WINDOW_INNERHEIGHT * 0.75, width = height * 1.52;
        bookHolder.style.width = `${width}px`;
        bookHolder.style.height = `${height}px`;
        //#endregion

        edictHolder.appendChild(bookHolder);
        edictHolder.appendChild(arrowHolder);

        window.dispatchEvent(new Event("resize"));
    }

    function generateEdictIcons() {

        //#region Find DOM
        let edictHolder = document.getElementById("edict-holder");

        let leftIconHolder;
        if (document.getElementById("edict-left-page-icon-holder") == null) {

            leftIconHolder = document.createElement("div");
            leftIconHolder.id = "edict-left-page-icon-holder";
            leftIconHolder.classList.add("edict-page-left");
            edictHolder.appendChild(leftIconHolder);
        }
        else leftIconHolder = document.getElementById("edict-left-page-icon-holder");
        leftIconHolder.innerHTML = "";

        let rightIconHolder;
        if (document.getElementById("edict-right-page-icon-holder") == null) {

            rightIconHolder = document.createElement("div");
            rightIconHolder.id = "edict-right-page-icon-holder";
            rightIconHolder.classList.add("edict-page-right");
            edictHolder.appendChild(rightIconHolder);
        }
        else rightIconHolder = document.getElementById("edict-right-page-icon-holder");
        rightIconHolder.innerHTML = "";
        //#endregion

        let pageLeft = true;
        for (let i = 0; i < 2; i++) {

            if (page + i > EDICT_BOOK_DATA.length - 1) break;
            for (let j = 0; j < EDICT_BOOK_DATA[page + i].icon.length; j++) {

                let iconData = EDICT_BOOK_DATA[page + i].icon[j];

                let edictIcon = document.createElement("canvas");
                new EdictPageIcon(edictIcon, edictIcon.getContext("2d"), iconData);
                edictIcon.id = "edict-icon";

                if (pageLeft) leftIconHolder.appendChild(edictIcon);
                else rightIconHolder.appendChild(edictIcon);

                //#region Get edict state
                let iconState = gameState.player.edicts.returnEdictState(iconData);
                if (iconState == "bought") edictIcon.classList.add("edict-icon-bought");
                else if (iconState == "locked") edictIcon.classList.add("edict-icon-locked");
                else if (iconState == "buyable") {

                    if (gameState.player.balance >= iconData.cost) edictIcon.classList.add("edict-icon-buyable");
                    else edictIcon.classList.add("edict-icon-cantafford");
                }
                //#endregion

                edictIcon.style.left = `${iconData.position[0] * 20}%`;
                edictIcon.style.top = `${iconData.position[1] * 20}%`;
                
                edictIcon.addEventListener("mouseover", function() {

                    let tooltipCanvas = drawContextualUI.createTooltip(iconData);
                    tooltipCanvas.classList.add("edict-tooltip");

                    let thisRect = this.getBoundingClientRect();

                    tooltipCanvas.style.left = `${thisRect.left}px`;
                    tooltipCanvas.style.top = `${thisRect.top}px`;
                    tooltipCanvas.style.transform = `translate(-${(tooltipCanvas.width - (thisRect.width / 2)) / 2}px, -110%)`;

                    edictHolder.appendChild(tooltipCanvas);
                });
        
                edictIcon.addEventListener("mouseout", function() {

                    let tooltips = document.getElementsByClassName("edict-tooltip");
                    for (let tooltip of tooltips) tooltip.remove();
                });

                edictIcon.addEventListener("click", function() {

                    if (gameState.player.balance < iconData.cost) return;
                    if (gameState.player.edicts.returnEdictState(iconData) != "buyable") return;

                    edictIcon.classList.add("edict-icon-bought");
                    gameState.player.edicts.addEdict(iconData.key);
                    gameState.edictCache.processEdictChanges(gameState.player.edicts.edictKeys);
                    gameState.player.achievements.checkEdictsFinished(gameState.player.edicts);
                    gameState.player.balance -= iconData.cost;

                    let edictFluff = document.getElementById("edict-text");
                    new EdictText(
                        edictFluff, 
                        edictFluff.getContext("2d"), 
                        page, 
                        gameState.player.edicts,
                        gameState.boardState.resources,
                        gameState.boardState.regionNeeds,
                        gameSettings.realResourceNumbers
                    );
                    let tooltips = document.getElementsByClassName("edict-tooltip");
                    for (let tooltip of tooltips) tooltip.remove();

                    fluffUtils.playSound("edict-pencil");
                    generateEdictIcons();
                });
            }
            pageLeft = false;
        }
    }
    //#endregion

    //#region Region stats
    function drawHintPanel() {

        if (!gameSettings.showHints) return;

        let tutorialState = gameState.returnTutorialState();

        canvas = new HintCanvas(
            gameSettings,
            tutorialState, 
            gameState.roadlessBuildings,
            gameState.boardState.resources,
            gameState.boardState.regionNeeds,
            gameState.boardState.satisfactionBoost
        );
        canvas.draw(hintCanvas, hintCtx);
        drawUI.setHintLocation()
    }

    function drawRegionNameCanvas() {

        canvas = new RegionNameCanvas(gameState.player.name);
        canvas.draw(nameCanvas, nameCtx);
    }

    var scoreCanvas;
    function drawScoreCanvas() {

        if (scoreCanvas == null) {

            scoreCanvas = new ScoreCanvas(
                scorePanel,
                scoreCtx,
                gameState.player.balance,
                gameState.player.earnings, 
                gameState.boardState.population
            );
            scoreCanvas.draw(scorePanel, scoreCtx);
        }
        else {

            scoreCanvas.draw(
                scorePanel, 
                scoreCtx,
                gameState.player.balance,
                gameState.player.earnings, 
                gameState.boardState.population
            );
        }
    }
    
    function drawRockCanvas() {
        
        let canvas = new RockCanvas(rollingClicks, gameState.stats.rockClicks);
        canvas.draw(rockCanvas, rockCtx);
    }

    function drawPowerupCanvas() {

        if (gameState.player.activeEffects.length == 0) {

            powerupCanvas.style.display = "none";
            return;
        }
        else powerupCanvas.style.display = "block";

        let canvas = new PowerupCanvas(gameState.player.activeEffects);
        canvas.draw(powerupCanvas, powerupCtx);
    }
    //#endregion

    //#region Purchasing panel
    function drawBuildingButtons(quantityChange) {

        let canvi = buttonList;
        let tier = gameSettings.selTier;
        let updateIndex = [];
    
        for (let i = 0; i < 8; i++) {
    
            if (quantityChange) {
    
                updateIndex.push(i);
                continue;
            }
            let buildingId = mathUtils.returnBuildingID(i, tier);
            let canAfford = gameState.returnCanPurchaseBuilding(buildingId, gameSettings.buyQuantity);
    
            let button = canvi.childNodes.item(i);
    
            if (button.classList == "buy-building") updateIndex.push(i);
            else if (canAfford && button.classList.contains("buy-building-unafford")) updateIndex.push(i);
            else if (!canAfford && button.classList.contains("buy-building-afford")) updateIndex.push(i);
        }
    
        for (let i = 0; i < updateIndex.length; i++) {
    
            let buildingId = mathUtils.returnBuildingID(updateIndex[i], tier);
            let canAfford = gameState.returnCanPurchaseBuilding(buildingId, gameSettings.buyQuantity);
            let button = canvi.childNodes.item(updateIndex[i]);
    
            let canvas = new BuildingButton(
                buildingId, 
                gameState.player.buildingsOwned[buildingId], 
                canAfford,
                gameSettings.buyQuantity
            );
            canvas.draw(button.getContext("2d"));
    
            if (canAfford) button.className = "buy-building buy-building-afford";
            else button.className = "buy-building buy-building-unafford";
        }
    }

    function drawTierSelector() {
    
        let canvas = new TierSelector(gameSettings.selTier)
        canvas.draw(tierCanvas, tierCtx);
    }

    function drawBuyQuantity() {

        let canvas = new BuyQuantity(gameSettings.buyQuantity);
        canvas.draw(quantityCanvas, quantityCtx);
    }

    function drawEdictButton() {

        new EdictButton(edictButtonCanvas, edictButtonCtx);
    }
    //#endregion

    function toggleNewsTicker() {

        if (gameSettings.showTicker) newsTickerHolder.style.display = "block";
        else newsTickerHolder.style.display = "none";
        cacheUtils.cacheRects();
    }

    function drawFps() {

        perfUi.textContent = 
        `Main: ${perfHandler.returnAvgFps("update")}ms\nFX: ${perfHandler.returnAvgFps("particle")}ms`;
    }

    return {
        drawInventory: drawInventory,
        drawControlPanel: drawControlPanel,
        drawHelpControlPanel: drawHelpControlPanel,
        drawBuildingButtons: drawBuildingButtons,
        drawRegionNameCanvas: drawRegionNameCanvas,
        drawScoreCanvas: drawScoreCanvas,
        drawRockCanvas: drawRockCanvas,
        drawTierSelector: drawTierSelector,
        drawBuyQuantity: drawBuyQuantity,
        drawInventoryArrows: drawInventoryArrows,
        drawTileSelectors: drawTileSelectors,
        drawPowerupCanvas: drawPowerupCanvas,
        drawFps: drawFps,
        drawHintPanel: drawHintPanel,
        setHintLocation: setHintLocation,
        drawEdictBook: drawEdictBook,
        drawEdictButton: drawEdictButton,
        generateEdictIcons: generateEdictIcons,
        toggleNewsTicker: toggleNewsTicker
    }
}();

drawContextualUI = function () {

    //#region Tooltips
    function drawBuildingTooltip(buttonRect, index) {

        let tooltipCanvas = document.createElement("canvas");
        tooltipCanvas.id = "building-tooltip";

        let ctx = tooltipCanvas.getContext("2d", {willReadFrequently: true});
        let buildingId = mathUtils.returnBuildingID(index, gameSettings.selTier);
        let tooltip = new BuildingTooltip(
            buildingId, 
            gameState.boardState, 
            gameState.player,
            gameState.edictCache,
            "building"
        );
        tooltip.draw(tooltipCanvas, ctx);

        tooltipDialog.appendChild(tooltipCanvas);
        alertContainer.style.backgroundColor = "";
        alertContainer.style.zIndex = 11;
        alertContainer.style.display = "block";

        let tooltipRect = tooltipCanvas.getBoundingClientRect();
        let holderRect = RECT_BUTTONLIST;
        let ttLeft = holderRect.width;
        let ttTop = (buttonRect.top + tooltipRect.height > holderRect.bottom) ? holderRect.bottom - tooltipRect.height + 19 : buttonRect.top;
        tooltipDialog.style.left = `${ttLeft}px`;
        tooltipDialog.style.top = `${ttTop}px`;
    }

    this.invIndex = -1;
    function drawInventoryTooltip(index) {

        if (tempSettings.usingMobile) return;
        if (index == this.invIndex) return;
        if (alertWindow.innerHTML != "") return;

        this.invIndex = index;
        tooltipDialog.innerHTML = "";
        alertContainer.style.display = "none";

        let tooltipCanvas = document.createElement("canvas");
        tooltipCanvas.id = "building-tooltip";

        let ctx = tooltipCanvas.getContext("2d", {willReadFrequently: true});
        let buildingId = mathUtils.returnBuildingID(index, gameSettings.selTier);
        let tooltip = new BuildingTooltip(
            buildingId, 
            gameState.boardState, 
            gameState.player,
            gameState.edictCache,
            gameSettings.placeType
        );
        tooltip.draw(tooltipCanvas, ctx);

        tooltipDialog.appendChild(tooltipCanvas);
        alertContainer.style.backgroundColor = "";
        alertContainer.style.zIndex = 8;
        alertContainer.style.display = "block";

        let controlRect = RECT_CONTROLPANEL;
        let rockRect = RECT_ROCKPANEL;
        let ttLeft = rockRect.right;
        let ttTop = controlRect.bottom;
        tooltipDialog.style.left = `${ttLeft}px`;
        tooltipDialog.style.top = `${ttTop}px`;
    }

    this.inspectPopup = false;
    function createInspectPopup() {

        gameState.player.achievements.checkInspectedTile();

        let inspectHolder = document.createElement("div");
        inspectHolder.classList.add("inspect-canvas");
        
        let boardPos = boardUtils.returnGameBoardPos();
        let inspectCanvas = document.createElement("canvas");
        let inspectTooltip = new InspectPopup(
            boardPos,
            gameState.boardState.effectMap[boardPos.y][boardPos.x],
            gameState.environment.ground[boardPos.y][boardPos.x],
            gameState.boardState.boardMap[boardPos.x][boardPos.y],
            gameState.player.earnings
        );
        inspectTooltip.draw(inspectCanvas, inspectCanvas.getContext("2d", {willReadFrequently: true}));
        inspectHolder.appendChild(inspectCanvas);

        alertWindow.appendChild(inspectHolder);
        alertContainer.style.backgroundColor = "";
        alertContainer.style.zIndex = 30;
        alertContainer.style.display = "block";
        
        let boardRect = RECT_GAMEBOARD;
        inspectHolder.id = `inspect-tooltip-${boardPos.x}-${boardPos.y}`;
        let realTileSize = boardRect.width / gameState.worldSettings.boardSize;
        let ttLeft = boardRect.left + (boardRect.width * ((boardPos.x + 0.5) / gameState.worldSettings.boardSize));
        let ttTop = boardRect.top + (boardRect.height * ((boardPos.y + 0.5) / gameState.worldSettings.boardSize));

        inspectHolder.style.left = `${ttLeft}px`;
        inspectHolder.style.top = `${ttTop}px`;
        inspectHolder.style.transform = `translate(-50%, ${realTileSize}px)`;

        this.inspectPopup = true;
    }
    //#endregion

    //#region Alert canvas
    function drawAlertCanvas(type, gameVersion) {

        // New alert canvas
        let alertCanvas = document.createElement("canvas");
        let ctx = alertCanvas.getContext("2d");
        alertCanvas.id = "alert-canvas";
    
        switch(type) {

            case "welcome-back":
            default:

                // Earnings since gone
                let timeAway = (Date.now() - gameState.player.timeOfLastUpdate) / 1000;
                let awayEarnings = Math.floor(gameState.player.earnings * Math.min(timeAway, MAX_TIME_AWAY_EARNING));
                let awayContent = {earnings: awayEarnings, timeAway: timeAway};

                var canvas = new AlertCanvas(GAME_MESSAGES[0], type, awayContent);
                canvas.draw(alertCanvas, ctx);
                break;
            
            case "new-version":
                
                // Draw canvas
                var canvas = new AlertCanvas(GAME_MESSAGES[1], type, gameVersion);
                canvas.draw(alertCanvas, ctx);
                break;

            case "opera-right-click":

                var canvas = new AlertCanvas(GAME_MESSAGES[2], type);
                canvas.draw(alertCanvas, ctx);
                break;

            case "mobile-warning":

                var canvas = new AlertCanvas(GAME_MESSAGES[3], type);
                canvas.draw(alertCanvas, ctx);
                break;
        }

        // Append child
        addToAlertWindow(alertCanvas);
    }

    function addToAlertWindow(element) {

        // Append to alert canvas
        alertWindow.appendChild(element);
        alertContainer.style.backgroundColor = "rgba(0, 0, 0, 0.33)";
        alertContainer.style.zIndex = 30;
        alertContainer.style.display = "block";
        
        // Set window position
        let rect = alertWindow.getBoundingClientRect();
        alertWindow.style.left = `${(WINDOW_INNERWIDTH / 2) - (rect.width / 2)}px`;
        alertWindow.style.top = `${(WINDOW_INNERHEIGHT / 2) - (rect.height / 2)}px`;
    }
    //#endregion

    //#region Game start
    function drawGameStartCanvas() {

        // This all really is dogwater
        let gameStart = document.createElement("div");
        gameStart.id = "gamestart-dialog";

        fluffUtils.playMusic("map-creation");

        // Draw canvas stuff
        let gameStartCanvas = document.createElement("canvas");
        let gameStartCtx = gameStartCanvas.getContext("2d");
        let canvas = new NewGameSettings();
        canvas.draw(gameStartCanvas, gameStartCtx);
        gameStart.appendChild(gameStartCanvas);

        let startY = 78;

        // TODO: move to dom-cache
        //#region Create input boxes
        let nameBox = document.createElement("input");
        nameBox.setAttribute("maxlength", "25");
        nameBox.setAttribute("type", "text");
        nameBox.classList.add("gamestart-textbox");
        nameBox.id = "name-box";
        nameBox.value = fluffUtils.randomizeRegionName();
        nameBox.style.top = `${startY}px`; startY += 55;

        let seedBox = document.createElement("input");
        seedBox.setAttribute("type", "text");
        seedBox.classList.add("gamestart-textbox");
        seedBox.id = "seed-box";
        seedBox.value = Math.floor(Math.random() * 100000000);
        seedBox.style.top = `${startY}px`; startY += 50;

        let definitionSlider = document.createElement("input");
        definitionSlider.setAttribute("type", "range");
        definitionSlider.classList.add("gamestart-textbox");
        definitionSlider.id = "definition-slider"
        definitionSlider.value = 50;
        definitionSlider.style.top = `${startY}px`; startY += 45;
        definitionSlider.addEventListener("input", function() {

            drawContextualUI.drawPreviewMap();
        });

        let denseSlider = document.createElement("input");
        denseSlider.setAttribute("type", "range");
        denseSlider.classList.add("gamestart-textbox");
        denseSlider.id = "dense-slider"
        denseSlider.value = 50;
        denseSlider.style.top = `${startY}px`; startY += 45;
        denseSlider.addEventListener("input", function() {

            drawContextualUI.drawPreviewMap();
        });

        let waterSlider = document.createElement("input");
        waterSlider.setAttribute("type", "range");
        waterSlider.classList.add("gamestart-textbox");
        waterSlider.id = "water-slider"
        waterSlider.value = 50;
        waterSlider.style.top = `${startY}px`; startY += 45;
        waterSlider.addEventListener("input", function() {

            drawContextualUI.drawPreviewMap();
        });

        let moistureSlider = document.createElement("input");
        moistureSlider.setAttribute("type", "range");
        moistureSlider.classList.add("gamestart-textbox");
        moistureSlider.id = "moisture-slider"
        moistureSlider.value = 50;
        moistureSlider.style.top = `${startY}px`; startY += 48;
        moistureSlider.addEventListener("input", function() {

            drawContextualUI.drawPreviewMap();
        });

        let mapSizeSmall = document.createElement("input");
        mapSizeSmall.setAttribute("type", "checkbox");
        mapSizeSmall.classList.add("gamestart-checkbox");
        mapSizeSmall.id = "mapsize-small"
        mapSizeSmall.checked = true;
        mapSizeSmall.style.left = `20px`
        mapSizeSmall.style.top = `${startY}px`;
        mapSizeSmall.addEventListener("change", function() {

            document.getElementById("mapsize-large").checked = !document.getElementById("mapsize-large").checked;
            drawContextualUI.drawPreviewMap();
        });

        let mapSizeLarge = document.createElement("input");
        mapSizeLarge.setAttribute("type", "checkbox");
        mapSizeLarge.classList.add("gamestart-checkbox");
        mapSizeLarge.id = "mapsize-large"
        mapSizeLarge.checked = false;
        mapSizeLarge.style.left = `130px`
        mapSizeLarge.style.top = `${startY}px`;
        mapSizeLarge.addEventListener("change", function() {

            document.getElementById("mapsize-small").checked = !document.getElementById("mapsize-small").checked;
            drawContextualUI.drawPreviewMap();
        });
        //#endregion

        //#region Create buttons
        let randName = document.createElement("input");
        randName.setAttribute("type", "button");
        randName.classList.add("gamestart-randomize", "gamestart-button");
        randName.value = "🎲";
        randName.title = "Randomize Region Name";
        randName.style.top = "78px";
        randName.addEventListener("click", function() {

            // Randomize region name
            let regionName = document.getElementById("name-box");
            regionName.value = fluffUtils.randomizeRegionName();
            fluffUtils.playSound("click-button");
        });

        let randSeed = document.createElement("input");
        randSeed.setAttribute("type", "button");
        randSeed.classList.add("gamestart-randomize", "gamestart-button");
        randSeed.value = "🎲";
        randSeed.title = "Randomize Seed";
        randSeed.style.top = "133px";
        randSeed.addEventListener("click", function() {

            // Randomize seed
            document.getElementById("seed-box").value = Math.floor(Math.random() * 100000000);
            drawContextualUI.drawPreviewMap();
            fluffUtils.playSound("click-button");
        });

        let genPreview = document.createElement("input");
        genPreview.setAttribute("type", "button");
        genPreview.classList.add("gamestart-preview", "gamestart-button");
        genPreview.value = "上一个地图";
        genPreview.style.left = "265px";
        genPreview.addEventListener("click", function() {

            drawContextualUI.drawPreviewMap();
            fluffUtils.playSound("click-button");
        });

        let startGame = document.createElement("input");
        startGame.setAttribute("type", "button");
        startGame.classList.add("gamestart-preview", "gamestart-button");
        startGame.value = "开始游戏";
        startGame.style.right = "170px";
        startGame.style.backgroundColor = "hsla(131, 60%, 48%, 1)";
        startGame.addEventListener("click", function() {

            gameMain.startingGame = false;
            boardUtils.createNewBoard();
            fluffUtils.playSound("click-button");
            fluffUtils.playMusic("map-creation");
            alertWindow.innerHTML = "";
            alertContainer.style.display = "none";
        });
        //#endregion

        //#region Preset buttons
        let presetDefault = document.createElement("input");
        presetDefault.setAttribute("type", "button");
        presetDefault.classList.add("gamestart-preview", "gamestart-button");
        presetDefault.value = "默认";
        presetDefault.style.top = "105px";
        presetDefault.style.right = "25px";
        presetDefault.addEventListener("click", function() {

            document.getElementById("definition-slider").value = 50;
            document.getElementById("dense-slider").value = 50;
            document.getElementById("water-slider").value = 50;
            document.getElementById("moisture-slider").value = 50;
            document.getElementById("seed-box").value = Math.floor(Math.random() * 100000000);

            drawContextualUI.drawPreviewMap();
            fluffUtils.playSound("click-button");
        });

        let presetRiver = document.createElement("input");
        presetRiver.setAttribute("type", "button");
        presetRiver.classList.add("gamestart-preview", "gamestart-button");
        presetRiver.value = "河流";
        presetRiver.style.top = "155px";
        presetRiver.style.right = "25px";
        presetRiver.style.backgroundColor = "hsla(197, 56%, 54%, 1)";
        presetRiver.addEventListener("click", function() {

            document.getElementById("definition-slider").value = 20;
            document.getElementById("dense-slider").value = 15;
            document.getElementById("water-slider").value = 55;
            document.getElementById("moisture-slider").value = 40;
            document.getElementById("seed-box").value = Math.floor(Math.random() * 100000000);

            drawContextualUI.drawPreviewMap();
            fluffUtils.playSound("click-button");
        });

        let presetArid = document.createElement("input");
        presetArid.setAttribute("type", "button");
        presetArid.classList.add("gamestart-preview", "gamestart-button");
        presetArid.value = "干旱";
        presetArid.style.top = "205px";
        presetArid.style.right = "25px";
        presetArid.style.backgroundColor = "hsla(57, 47%, 73%, 1)";
        presetArid.addEventListener("click", function() {

            document.getElementById("definition-slider").value = 25;
            document.getElementById("dense-slider").value = 35;
            document.getElementById("water-slider").value = 45;
            document.getElementById("moisture-slider").value = 15;
            document.getElementById("seed-box").value = Math.floor(Math.random() * 100000000);

            drawContextualUI.drawPreviewMap();
            fluffUtils.playSound("click-button");
        });

        let presetArch = document.createElement("input");
        presetArch.setAttribute("type", "button");
        presetArch.classList.add("gamestart-preview", "gamestart-button");
        presetArch.value = "群岛";
        presetArch.style.top = "255px";
        presetArch.style.right = "25px";
        presetArch.style.backgroundColor = "hsla(167, 40%, 64%, 1)";
        presetArch.addEventListener("click", function() {

            document.getElementById("definition-slider").value = 85;
            document.getElementById("dense-slider").value = 45;
            document.getElementById("water-slider").value = 85;
            document.getElementById("moisture-slider").value = 45;
            document.getElementById("seed-box").value = Math.floor(Math.random() * 100000000);

            drawContextualUI.drawPreviewMap();
            fluffUtils.playSound("click-button");
        });

        let presetJungle = document.createElement("input");
        presetJungle.setAttribute("type", "button");
        presetJungle.classList.add("gamestart-preview", "gamestart-button");
        presetJungle.value = "丛林";
        presetJungle.style.top = "305px";
        presetJungle.style.right = "25px";
        presetJungle.style.backgroundColor = "hsla(107, 76%, 29%, 1)";
        presetJungle.addEventListener("click", function() {

            document.getElementById("definition-slider").value = 25;
            document.getElementById("dense-slider").value = 50;
            document.getElementById("water-slider").value = 60;
            document.getElementById("moisture-slider").value = 45;
            document.getElementById("seed-box").value = Math.floor(Math.random() * 100000000);

            drawContextualUI.drawPreviewMap();
            fluffUtils.playSound("click-button");
        });

        let presetRandom = document.createElement("input");
        presetRandom.setAttribute("type", "button");
        presetRandom.classList.add("gamestart-preview", "gamestart-button");
        presetRandom.value = "随机";
        presetRandom.style.top = "355px";
        presetRandom.style.right = "25px";
        presetRandom.style.backgroundColor = "hsla(300, 76%, 30%, 1)";
        presetRandom.addEventListener("click", function() {

            document.getElementById("definition-slider").value = Math.floor(Math.random() * 100);
            document.getElementById("dense-slider").value = Math.floor(Math.random() * 100);
            document.getElementById("water-slider").value = Math.floor(Math.random() * 100);
            document.getElementById("moisture-slider").value = Math.floor(Math.random() * 100);
            document.getElementById("seed-box").value = Math.floor(Math.random() * 100000000);

            drawContextualUI.drawPreviewMap();
            fluffUtils.playSound("click-button");
        });
        //#endregion

        let previewHolder = document.createElement("div");
        previewHolder.id = "map-preview-holder";

        //#region Append elements
        gameStart.appendChild(nameBox);
        gameStart.appendChild(seedBox);

        gameStart.appendChild(definitionSlider);
        gameStart.appendChild(denseSlider);
        gameStart.appendChild(waterSlider);
        gameStart.appendChild(moistureSlider);
        gameStart.appendChild(mapSizeSmall);
        gameStart.appendChild(mapSizeLarge);

        gameStart.appendChild(presetDefault);
        gameStart.appendChild(presetRiver);
        gameStart.appendChild(presetArid);
        gameStart.appendChild(presetArch);
        gameStart.appendChild(presetJungle);
        gameStart.appendChild(presetRandom);

        gameStart.appendChild(randName);
        gameStart.appendChild(randSeed);
        gameStart.appendChild(genPreview);
        gameStart.appendChild(startGame);

        gameStart.appendChild(previewHolder);
        //#endregion

        // Append to alert canvas
        addToAlertWindow(gameStart);
        alertContainer.style.backgroundColor = "";
        drawContextualUI.drawPreviewMap();
        this.inSettingsMenu = false;
    }

    function drawPreviewMap() {

        let seed = document.getElementById("seed-box").value;
        seed = mathUtils.seedFromString(seed);
    
        let definition = Math.max(document.getElementById("definition-slider").value / 25, 0.025);
        let density = document.getElementById("dense-slider").value / 50;
        let waterLevel = document.getElementById("water-slider").value / 50;
        let moistureLevel = document.getElementById("moisture-slider").value / 50;
        let mapSize = (document.getElementById("mapsize-small").checked) ? 64 : 128;
    
        let mapGen = new MapGenerator(
            mapSize, 
            definition, 
            density, 
            seed, 
            waterLevel,
            moistureLevel
        );
        let ground = mapGen.generateMap();
        let landmarks = new Array(mapSize).fill().map(() => Array(mapSize).fill(null));
        mapGen.generateLandmarks(landmarks);
    
        let previewCanvas = document.createElement("canvas");
        let previewCtx = previewCanvas.getContext("2d");
        let mapPreview = new PreviewBoard(ground, landmarks);
        let boardChecks = mapPreview.draw(previewCanvas, previewCtx);

        if (boardChecks.error) drawStartError(boardChecks);
        else if (document.getElementById("gamestart-dialog-error") != null) document.getElementById("gamestart-dialog-error").remove();
    
        previewCanvas.style.imageRendering = "auto";
        let previewHolder = document.getElementById("map-preview-holder");
        previewHolder.innerHTML = "";
        previewHolder.appendChild(previewCanvas);
    }

    function removeLoadError() {

        if (document.getElementById("error-holder") != null) document.getElementById("error-holder").remove();
        document.removeEventListener("keydown", EventListeners.clearGameSave);
    }

    function showMobileError() {
        
        let errorHolder;
        if (document.getElementById("error-text") != null) errorHolder = document.getElementById("error-text");
        else return;
        
        errorHolder.textContent = "Idle Region is not yet supported on mobile devices."
        errorHolder.style.fontSize = "5em";
        document.removeEventListener("keydown", EventListeners.clearGameSave);
    }

    this.lastPress = 0
    function drawStartScreen() {

        let errorHolder = document.createElement("div");
        errorHolder.classList.add("error-holder");
        errorHolder.id = "error-holder";

        let errorMessage = document.createElement("p");
        errorMessage.classList.add("error-text");
        errorMessage.id = "error-text";
        errorMessage.textContent = "Your save file appears to be broken or too far out of date. Press \"F\" to continue."

        document.addEventListener("keydown", EventListeners.clearGameSave);

        errorHolder.appendChild(errorMessage);
        boardHolder.appendChild(errorHolder);

        boardHolder.style.background = (
            `linear-gradient(360deg, 
            hsl(235, 56%, 18%, 1) 15%, 
            hsl(232, 85%, 20%, 0.15) 85%),
            url('./res/images/ui/layout/backgrounds/night-sky.png?v=0-3-3a')`
        );

        window.requestAnimationFrame(animateStartScreen);
    }

    this.gameStartTime = 0;
    this.gameStartDayLength = 8000;
    function animateStartScreen() {

        if (gameStartTime + 1 > gameStartDayLength) gameStartTime = 0;
        else gameStartTime += 1

        // Get current and next colors
        let len = TIME_CYCLE_COLORS_TOP.length;
        let hour = (gameStartTime / gameStartDayLength) * len;
        let minutes = hour % 1;
    
        // Get this and next color index
        let nextIndex;
        ((Math.floor(hour) + 1) >= len) ? nextIndex = 0 : nextIndex = (Math.floor(hour) + 1);
        let curIndex = Math.min(Math.floor(hour), len - 1);
        
        // Separate values for top and bottom of gradient
        let curTop = TIME_CYCLE_COLORS_TOP.clone()[curIndex];
        let nextTop = TIME_CYCLE_COLORS_TOP.clone()[nextIndex];
        let curBot = TIME_CYCLE_COLORS_BOT.clone()[curIndex];
        let nextBot = TIME_CYCLE_COLORS_BOT.clone()[nextIndex];
    
        // Interpolate between this and next hsl
        curTop = mathUtils.interpolateHSL(curTop, nextTop, minutes);
        curBot = mathUtils.interpolateHSL(curBot, nextBot, minutes);
    
        // Find shade and night state
        let dimAmount = (curTop[2] >= 45) ? 1 : (curTop[2]) / 45;
    
        if (dimAmount != 1) dimAmount = mathUtils.clamp(dimAmount, 0, 0.9);

        // Apply color
        boardHolder.style.background = (
            `linear-gradient(360deg, 
            hsl(${curBot[0]}, ${curBot[1]}%, ${curBot[2]}%, ${dimAmount + 0.5}) 15%, 
            hsl(${curTop[0]}, ${curTop[1]}%, ${curTop[2]}%, ${dimAmount}) 85%)`
        );

        if (dimAmount != 1) {

            boardHolder.style.background += `,url('./res/images/ui/layout/backgrounds/night-sky.png?v=0-3-3a')`;
            boardHolder.style.backgroundPosition = `bottom 0px left ${minutes * 256}px`;
        }

        if (!gameMain.startingGame) window.cancelAnimationFrame(animateStartScreen);
        else window.requestAnimationFrame(animateStartScreen);
    }

    function drawStartError(boardChecks) {

        let errorHolder = document.getElementById("gamestart-dialog-error");
        if (errorHolder == null) {

            errorHolder = document.createElement("div");
            errorHolder.id = "gamestart-dialog-error";
        }

        errorHolder.innerHTML = "";

        let errorCanvas = document.createElement("canvas");
        let errorCtx = errorCanvas.getContext("2d");
        let errorPrint = new PreviewError(boardChecks);
        errorPrint.draw(errorCanvas, errorCtx);
        errorHolder.appendChild(errorCanvas);

        let startRect = document.getElementById("gamestart-dialog").getBoundingClientRect();
        errorHolder.style.top = `${startRect.bottom + 10}px`;

        // Append to alert canvas
        alertWindow.appendChild(errorHolder);
    }
    //#endregion

    //#region Option canvi
    function drawStatsCanvas() {

        // This is even more dogwater than the gamestart div
        let statsMenu = document.createElement("div");
        statsMenu.id = "gamestart-dialog";

        // Draw canvas stuff
        let statsCanvas = document.createElement("canvas");
        let statsCtx = statsCanvas.getContext("2d");
        canvas = new GameStatsPanel(
            gameState.player,
            gameState.boardState,
            gameState.worldSettings,
            gameState.stats,
            gameState.player.edicts
        );
        canvas.draw(statsCanvas, statsCtx)
        statsMenu.appendChild(statsCanvas);

        // Append to alert canvas
        addToAlertWindow(statsMenu);
        this.inSettingsMenu = false;
    }

    function drawHelpCanvas() {
    
        let helpMenu = document.createElement("div");
        helpMenu.classList.add("scrollbar");
        helpMenu.id = "gamestart-dialog";
        helpMenu.style.maxHeight = "600px";
        helpMenu.style.overflowY = "scroll";
    
        // Draw canvas stuff
        let helpCanvas = document.createElement("canvas");
        let helpCtx = helpCanvas.getContext("2d");
        canvas = new GameHelpPanel();
        canvas.draw(helpCanvas, helpCtx)
        helpMenu.appendChild(helpCanvas);
    
        // Append to alert canvas
        addToAlertWindow(helpMenu);
        this.inSettingsMenu = false;
    }

    this.inSettingsMenu = false;
    function drawSettingsCanvas(page) {

        if (page === undefined) page = "game";
        this.inSettingsMenu = true;

        let settingsMenu = document.createElement("div");
        settingsMenu.id = "settings-panel";

        // Draw canvas stuff
        let settingsCanvas = document.createElement("canvas");
        let settingsCtx = settingsCanvas.getContext("2d");
        canvas = new GameSettingsPanel();
        canvas.draw(settingsCanvas, settingsCtx, page)
        settingsMenu.appendChild(settingsCanvas);

        let settingsContainer = document.createElement("div");
        settingsContainer.id = "settings-container";
        
        //#region Append settings items
        let startY = 71;
        if (page == "game") {

            let incY = 40;
            SETTINGS_FREEZETIME.style.top = `${startY}px`; startY += incY;
            SETTINGS_FREEZETIME.checked = gameSettings.freezeTime;
            settingsMenu.appendChild(SETTINGS_FREEZETIME);

            SETTINGS_TOGGLEFPS.style.top = `${startY}px`; startY += incY;
            SETTINGS_TOGGLEFPS.checked = gameSettings.showFps;
            settingsMenu.appendChild(SETTINGS_TOGGLEFPS);

            SETTINGS_TOGGLETICKER.style.top = `${startY}px`; startY += incY;
            SETTINGS_TOGGLETICKER.checked = gameSettings.showTicker;
            settingsMenu.appendChild(SETTINGS_TOGGLETICKER);

            SETTINGS_TOGGLERESOURCENUM.style.top = `${startY}px`; startY += incY;
            SETTINGS_TOGGLERESOURCENUM.checked = gameSettings.realResourceNumbers;
            settingsMenu.appendChild(SETTINGS_TOGGLERESOURCENUM);

            SETTINGS_TOGGLEAUTOSAVE.style.top = `${startY}px`; startY += 70;
            SETTINGS_TOGGLEAUTOSAVE.checked = gameSettings.autoSave;
            settingsMenu.appendChild(SETTINGS_TOGGLEAUTOSAVE);


            SETTINGS_GUI_SMALL.style.top = `${startY}px`;
            SETTINGS_GUI_SMALL.checked = gameSettings.guiSize == "small";
            settingsMenu.appendChild(SETTINGS_GUI_SMALL);

            SETTINGS_GUI_MEDIUM.style.top = `${startY}px`;
            SETTINGS_GUI_MEDIUM.checked = gameSettings.guiSize == "medium";
            settingsMenu.appendChild(SETTINGS_GUI_MEDIUM);

            SETTINGS_GUI_LARGE.style.top = `${startY}px`; startY += 50;
            SETTINGS_GUI_LARGE.checked = gameSettings.guiSize == "large";
            settingsMenu.appendChild(SETTINGS_GUI_LARGE);


            SETTINGS_FORCESAVE.style.top = `${startY}px`;
            settingsMenu.appendChild(SETTINGS_FORCESAVE);

            SETTINGS_DOWNLOADSAVE.style.top = `${startY}px`;
            settingsMenu.appendChild(SETTINGS_DOWNLOADSAVE);

            SETTINGS_IMPORTSAVE.style.top = `${startY}px`; startY += 50;
            settingsMenu.appendChild(SETTINGS_IMPORTSAVE);

            SETTINGS_PATCHNOTES.style.top = `${startY}px`; startY += 50
            settingsMenu.appendChild(SETTINGS_PATCHNOTES);

            SETTINGS_CLEARTILES.style.bottom = `70px`;
            settingsMenu.appendChild(SETTINGS_CLEARTILES);

            SETTINGS_DELETESAVE.style.bottom = `20px`;
            settingsMenu.appendChild(SETTINGS_DELETESAVE);
        }
        else if (page == "graphics") {

            let incY = 40;
            SETTINGS_TOGGLELIGHTS.style.top = `${startY}px`; startY += incY;
            SETTINGS_TOGGLELIGHTS.checked = gameSettings.drawLights;
            settingsMenu.appendChild(SETTINGS_TOGGLELIGHTS);

            SETTINGS_TOGGLEREFLECTIONS.style.top = `${startY}px`; startY += incY;
            SETTINGS_TOGGLEREFLECTIONS.checked = gameSettings.drawReflections;
            settingsMenu.appendChild(SETTINGS_TOGGLEREFLECTIONS);

            SETTINGS_TOGGLEWEATHER.style.top = `${startY}px`; startY += incY;
            SETTINGS_TOGGLEWEATHER.checked = gameSettings.drawWeather;
            settingsMenu.appendChild(SETTINGS_TOGGLEWEATHER);

            SETTINGS_TOGGLELIGHTNING.style.top = `${startY}px`; startY += incY;
            SETTINGS_TOGGLELIGHTNING.checked = gameSettings.drawLightning;
            settingsMenu.appendChild(SETTINGS_TOGGLELIGHTNING);
        }
        else if (page == "audio") {

            startY += 28;
            let incY = 64;
            SETTINGS_SLIDERVOLUMEUI.style.top = `${startY}px`; startY += incY;
            SETTINGS_SLIDERVOLUMEUI.value = gameSettings.volumeUI * 100;
            settingsMenu.appendChild(SETTINGS_SLIDERVOLUMEUI);

            SETTINGS_SLIDERVOLUMEAMB.style.top = `${startY}px`; startY += incY;
            SETTINGS_SLIDERVOLUMEAMB.value = gameSettings.volumeAmb * 100;
            settingsMenu.appendChild(SETTINGS_SLIDERVOLUMEAMB);
        }
        else if (page == "social") {

            startY = 100;
            let incY = 64;
            SETTINGS_DISCORDBUTTON.style.top = `${startY}px`; startY += incY;
            settingsMenu.appendChild(SETTINGS_DISCORDBUTTON);
        }
        //#endregion

        //#region Settings tabs
        let tabContainer = document.createElement("div");
        tabContainer.id = "options-tab-container";

        // TODO: condense this
        let gameTab = document.createElement("div");
        gameTab.id = "options-tab";
        gameTab.textContent = "Game";
        if (page == "game") gameTab.classList.add("options-tab-selected");
        else gameTab.classList.add("options-tab-unselected");
        gameTab.addEventListener("click", function() {

            fluffUtils.playSound("click-button");
            EventListeners.clearAlertCanvas();
            drawContextualUI.drawSettingsCanvas("game");
        });

        let graphicsTab = document.createElement("div");
        graphicsTab.id = "options-tab";
        graphicsTab.textContent = "Graphics";
        if (page == "graphics") graphicsTab.classList.add("options-tab-selected");
        else graphicsTab.classList.add("options-tab-unselected");
        graphicsTab.addEventListener("click", function() {

            fluffUtils.playSound("click-button");
            EventListeners.clearAlertCanvas();
            drawContextualUI.drawSettingsCanvas("graphics");
        });

        let audioTab = document.createElement("div");
        audioTab.id = "options-tab";
        audioTab.textContent = "Audio";
        if (page == "audio") audioTab.classList.add("options-tab-selected");
        else audioTab.classList.add("options-tab-unselected");
        audioTab.addEventListener("click", function() {

            fluffUtils.playSound("click-button");
            EventListeners.clearAlertCanvas();
            drawContextualUI.drawSettingsCanvas("audio");
        });

        let socialTab = document.createElement("div");
        socialTab.id = "options-tab";
        socialTab.textContent = "Socials";
        if (page == "audio") socialTab.classList.add("options-tab-selected");
        else socialTab.classList.add("options-tab-unselected");
        socialTab.addEventListener("click", function() {

            fluffUtils.playSound("click-button");
            EventListeners.clearAlertCanvas();
            drawContextualUI.drawSettingsCanvas("social");
        });

        let returnTab = document.createElement("div");
        returnTab.id = "options-tab";
        returnTab.textContent = "Return"
        returnTab.classList.add("options-tab-unselected");
        returnTab.addEventListener("click", function() {

            fluffUtils.playSound("click-button");
            this.inSettingsMenu = false;
            EventListeners.clearAlertCanvas();
        });

        tabContainer.appendChild(gameTab);
        tabContainer.appendChild(graphicsTab);
        tabContainer.appendChild(audioTab);
        tabContainer.appendChild(socialTab);
        tabContainer.appendChild(returnTab);
        //#endregion

        settingsContainer.appendChild(tabContainer);
        settingsContainer.appendChild(settingsMenu);

        // Append to alert canvas
        addToAlertWindow(settingsContainer);
    }
    //#endregion

    //#region Achievement canvas
    function drawAchievementCanvas() {

        // This is even more dogwater than the gamestart div
        let achievementMenu = document.createElement("div");
        achievementMenu.classList.add("scrollbar");
        achievementMenu.id = "gamestart-dialog";
        achievementMenu.style.maxHeight = "600px";
        achievementMenu.style.overflowY = "hidden";

        // Icon holder div
        let iconHolder = document.createElement("div");
        iconHolder.classList.add("ach-icon-holder");
        let achievements = gameState.player.achievements;

        // Generate achievement icons
        let singleIncrement = 0, multiIncrement = 0;
        for (let key of Object.entries(achievements)) {

            // Single
            if (!Array.isArray(key[1])) {

                if (key[1]) createAchievementIcon(
                    40 * singleIncrement, `./res/images/ui/achievement-icons/single-icons.png?v=0-3-3a`, 
                    iconHolder, true, ACH_DATA_SINGLES[singleIncrement]
                );
                else createAchievementIcon(
                    0, `./res/images/ui/achievement-icons/achievement-locked.png?v=0-3-3a`, 
                    iconHolder, false, ACH_DATA_LOCKED[0]
                );
                singleIncrement++;
                continue;
            }
            // Multiple
            else {

                for (let i = 0; i < key[1].length; i++) {

                    if (key[1][i]) createAchievementIcon(
                        (40 * i), ACH_IMAGE_LIST[multiIncrement], 
                        iconHolder, true, ACH_DATA_LIST[multiIncrement][i]
                    );
                    else createAchievementIcon(
                        0, `./res/images/ui/achievement-icons/achievement-locked.png?v=0-3-3a`, 
                        iconHolder, false, ACH_DATA_LOCKED[0]
                    );
                }
                multiIncrement++;
            }
        }

        // Draw canvas stuff
        let achievementCanvas = document.createElement("canvas");
        let achievementCtx = achievementCanvas.getContext("2d");
        let achTotals = achievements.countAchievements();
        canvas = new AchievementPanel(achTotals.unlocked, achTotals.total);
        canvas.draw(achievementCanvas, achievementCtx)
        achievementMenu.appendChild(achievementCanvas);
        achievementMenu.appendChild(iconHolder);

        // Append to alert canvas
        addToAlertWindow(achievementMenu);
        this.inSettingsMenu = false;
    }

    function createAchievementIcon(imgX, imgSrc, iconParent, unlocked, tooltipData) {

        let achIcon = document.createElement("div");
        achIcon.classList.add("achievement-icon");
        achIcon.style.borderRadius = "5px";

        if (unlocked) achIcon.classList.add("achievement-icon-unlocked");
        else achIcon.classList.add("achievement-icon-locked");

        achIcon.addEventListener("mouseover", function() {

            let tooltipCanvas = createTooltip(tooltipData);

            tooltipCanvas.classList.add("achievement-tooltip");
            tooltipCanvas.style.transform = `translate(${-(tooltipCanvas.width / 2)}px, -90px)`;
            this.appendChild(tooltipCanvas);
        });

        achIcon.addEventListener("mouseout", function() { this.innerHTML = ""; });
        achIcon.style.background = `url(${imgSrc}) ${-imgX}px 0`;
        iconParent.appendChild(achIcon);
    }

    function createTooltip(tooltipData) {

        let tooltipCanvas = document.createElement("canvas");
        let tooltipCtx = tooltipCanvas.getContext("2d");

        let tooltip = new ToolTip(tooltipData);
        tooltip.draw(tooltipCanvas, tooltipCtx);

        return tooltipCanvas;
    }

    this.achievementShowing = false;
    this.achievementQueue = [];
    this.egg = false;
    function achievementPopup() {

        if (achievementQueue.length >= 4) egg = true;
        if (achievementShowing == true || achievementQueue.length == 0) return;

        tooltipData = achievementQueue[0];
        achievementQueue.shift()

        let tooltipCanvas = createTooltip(tooltipData);
        let tooltipHolder = document.getElementById("achievement-popup");

        if (egg && achievementQueue.length == 0) {

            fluffUtils.playSound("achievement-egg");
            egg = false;
        }
        else fluffUtils.playSound("achievement");
        achievementShowing = true;

        tooltipHolder.innerHTML = "";
        tooltipHolder.appendChild(tooltipCanvas);
        tooltipHolder.style.width = `${tooltipCanvas.width}px`;
        
        tooltipHolder.style.animation = "none";
        tooltipHolder.offsetHeight;
        tooltipHolder.style.animation = "achievement-popup 3s";

        setTimeout(function() {
            achievementShowing = false;
        }, 3000);
    }
    //#endregion

    return {
        drawBuildingTooltip: drawBuildingTooltip,
        drawInventoryTooltip: drawInventoryTooltip,
        drawAlertCanvas: drawAlertCanvas,
        drawGameStartCanvas: drawGameStartCanvas,
        drawHelpCanvas: drawHelpCanvas,
        drawSettingsCanvas: drawSettingsCanvas,
        drawPreviewMap: drawPreviewMap,
        drawStartScreen: drawStartScreen,
        drawStatsCanvas: drawStatsCanvas,
        drawAchievementCanvas: drawAchievementCanvas,
        achievementPopup: achievementPopup,
        createInspectPopup: createInspectPopup,
        removeLoadError: removeLoadError,
        achievementQueue: achievementQueue,
        addToAlertWindow: addToAlertWindow,
        createTooltip: createTooltip,
        showMobileError: showMobileError,
        animateStartScreen: animateStartScreen
    }
}();