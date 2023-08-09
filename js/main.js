//© 2023 - 2023 www.idleregion.com - All Rights Reserved.

document.addEventListener("DOMContentLoaded", async e => {
    
    let loadContext = document.getElementById("loading-context");
    let loadHolder = document.getElementById("loading-screen");
    let loadVersion = document.getElementById("loading-version");
    loadVersion.textContent = `v${VERSION_STR}`;

    loadContext.textContent = "Loading Images"
    await loadAllImages();

    loadContext.textContent = "Loading Fonts"
    await awaitFontLoad();

    loadContext.textContent = "Click to Continue"
    loadHolder.addEventListener("click", function() {

        loadHolder.remove();
        gameMain.setupGame();
    });
});

gameMain = function() {

    this.startingGame = true;
    function setupGame() {

        saveHandler = new SaveHandler();
        gameSettings = new GameSettings();
        tempSettings = new TempSettings();
        gameState = new GameState();
        perfHandler = new PerformanceHandler(15);
    
        fluffUtils.showUI(false);
        drawContextualUI.drawStartScreen();
        EventListeners.addEventListeners();
    
        if (!saveHandler.hasExistingSave()) {
    
            drawContextualUI.removeLoadError();
            drawContextualUI.drawGameStartCanvas();
        }
        else {
            
            this.startingGame = false;
            gameState = new GameState(saveHandler.loadLocalStorage());
            gameMain.startGame();
        }
    }

    function startGame() {

        let checkFormat = saveHandler.checkSaveFormat();
        if (checkFormat != "out-of-date") drawContextualUI.removeLoadError();
        else if (checkFormat == "out-of-date") return;
    
        EventListeners.addKeyControls();
        let loadSettings = saveHandler.loadSettings();
        
        let saveVer = loadSettings.gameVersion;
        if (saveVer === undefined || saveVer != VERSION_STR) drawContextualUI.drawAlertCanvas("new-version", saveVer);
        else drawContextualUI.drawAlertCanvas("welcome-back");
    
        gameSettings = new GameSettings(loadSettings.settings);
        ambientSound = new AmbientSound(gameSettings);
        warningCanvas = drawBoard.createWarningCanvas();
        fluffUtils.announceCheats();

        //#region Draw ui
        fluffUtils.showUI(true);
        fluffUtils.generateBuildingButtons();
        drawBoard.drawDayNightCycle();
        drawUI.drawRockCanvas();
        drawUI.drawRegionNameCanvas();
        drawUI.drawBuildingButtons();
        drawUI.drawTierSelector();
        drawUI.drawBuyQuantity();
        drawUI.drawHelpControlPanel();
        drawUI.drawInventoryArrows();
        drawUI.drawTileSelectors();
        drawUI.drawControlPanel();
        drawUI.drawEdictButton();
        fluffUtils.resizeGUI();
        fluffUtils.generateNewsTickerText();
        drawUI.toggleNewsTicker();
        
        if(gameSettings.showFps) document.getElementById("fps-holder").style.display = "block";
        else document.getElementById("fps-holder").style.display = "none";

        EventListeners.toggleHintsPanel();
        EventListeners.toggleHintsPanel();
        //#endregion
    
        //#region Cache
        mapCache = new MapCache(gameState.worldSettings.boardSize);
        let mapGen = new MapGenerator(gameState.worldSettings.boardSize);
        mapCache.marchCache = mapGen.calculateMarchingIndicies(gameState.environment.ground);
        drawBoard.generateBuildingSpriteCache();
        //#endregion
    
        //#region Sound
        ambientSound.mapSize = gameState.worldSettings.boardSize;
        ambientSound.groundTiles = gameState.environment.ground;
        ambientSound.volumeLevel = gameSettings.volumeAmb;
        //#endregion
    
        //#region Render game map
        drawBoard.generateWaterMask();
        drawBoard.setBoardCanvasSize();
        drawBoard.drawGroundCanvas();
        drawBoard.drawObjectCanvas();
        drawBoard.drawGridCanvas();
        drawBoard.drawBorderCanvas();
        drawBoard.drawEffectCanvas();
        drawBoard.drawCursorCanvas();
        if (tempSettings.usingMobile) EventListeners.mobileMoveBoard(boardHolder);
        else EventListeners.moveGameBoard(boardHolder);
        
        //#endregion
    
        // Start game loop
        window.requestAnimationFrame(updateDraw);
    
        // Resize ui
        window.dispatchEvent(new Event("resize"));
        boardHolder.dispatchEvent(new WheelEvent("wheel", {deltaY: -100, deltaMode: 1}));
    }

    //#region Running functions
    this.objectChangeCache = [];
    function updateDraw() {

        perfHandler.timeFunction("update");
        window.requestAnimationFrame(updateDraw);
        EventListeners.boardMovable = true;

        for (let i = 0; i < objectChangeCache.length; i++) {

            drawBoard.drawObjectCanvas(objectChangeCache[0]);
            objectChangeCache.shift();
        }
        
        //#region Time of day calcs
        if (!gameSettings.freezeTime) {
    
            let dayLength = gameState.worldSettings.dayLength;
            let timeInc = (Date.now() - gameState.player.timeOfLastUpdate) / 1000;
            if (gameState.worldSettings.timeOfDay + timeInc >= dayLength) gameState.worldSettings.timeOfDay = 0;
            else gameState.worldSettings.timeOfDay += timeInc;
        } 
        else gameState.worldSettings.timeOfDay = 480;
        //#endregion
    
        //#region Frame update
        randomLighting();
        drawUI.drawBuildingButtons();
        gameState.tickDownMeteors();
        gameState.tickDownEffects();
        gameState.handleMeteorSpawn();
        gameState.calculateBoardOutput();
        gameState.updatePlayerBalance();
        drawContextualUI.achievementPopup();
        drawUI.drawInventory();
        if (gameSettings.cursorState != "none") drawBoard.drawCursorCanvas();
        warningCanvas.update(warningCtx, gameState.boardState.boardMap, gameState.currentCalcStep);
        //#endregion

        perfHandler.addFpsPoint("update", perfHandler.timeFunction("update"));
        macroFrameTimers();
    }

    //#region Macro frame fire timers
    this.skyCount = 0;
    this.skyFire = 2;

    this.infrequentCount = 0;
    this.infrequentFire = 4;

    this.rockStateCount = 0;
    this.rockStateFire = 6;

    this.particleCount = 0;
    this.particleFire = 7;

    this.secondCount = 0;
    this.secondFire = 60;

    this.saveCount = 0;
    this.saveFire = 600;
    //#endregion

    function macroFrameTimers() {

        this.infrequentCount++;
        this.particleCount++;
        this.secondCount++;
        this.rockStateCount++;
        this.skyCount++;
        this.saveCount++;
        
        //#region Check if fired
        if (infrequentCount > infrequentFire) {

            infrequentUpdate();
            infrequentCount = 0;
        }

        if (particleCount > particleFire) {

            particleUpdate();
            particleCount = 0;
        }
        
        if (secondCount > secondFire) {

            secondUpdate();
            secondCount = 0;
        }

        if (rockStateCount > rockStateFire) {

            handleRockState();
            rockStateCount = 0;
        }

        if (skyCount > skyFire) {

            skyUpdate();
            skyCount = 0;
        }

        if (saveCount > saveFire) {

            autoSave();
            saveCount = 0;
        }
        //#endregion
    }

    function infrequentUpdate() {

        if (lastRollingClicks + rollingClicks != 0) drawUI.drawRockCanvas();
        drawUI.drawInventoryArrows();
    }

    function skyUpdate() {

        drawUI.drawFps();
        drawUI.drawScoreCanvas();
        if (!gameSettings.freezeTime) drawBoard.drawDayNightCycle();
    }

    function particleUpdate() {

        perfHandler.timeFunction("particle");
        
        processWeather();
        ambientSound.calculateAmbience();
        drawUI.drawPowerupCanvas();
        drawBoard.drawReflectionCanvas();
        drawBoard.drawEffectCanvas();
        
        perfHandler.addFpsPoint("particle", perfHandler.timeFunction("particle"));
    }

    function secondUpdate() { 

        if (tempSettings.browser == "opera" && !tempSettings.rightClickOperaWarned && alertWindow.innerHTML == "") {

            tempSettings.rightClickOperaWarned = true;
            drawContextualUI.drawAlertCanvas("opera-right-click");
        }
        if (tempSettings.usingMobile && !tempSettings.mobileWarned && alertWindow.innerHTML == "") {

            tempSettings.mobileWarned = true;
            drawContextualUI.drawAlertCanvas("mobile-warning");
        }
        fluffUtils.setFavicon();
        drawUI.drawHintPanel(); 
    }

    function autoSave() {

        fluffUtils.generateNewsTickerText();
        if (gameSettings.autoSave) saveHandler.saveLocalStorage(gameState, gameSettings);
    }
    //#endregion

    return {
        setupGame: setupGame,
        startGame: startGame,
        updateDraw: updateDraw,
        infrequentUpdate: infrequentUpdate,
        particleUpdate: particleUpdate,
        autoSave: autoSave,
        secondUpdate: secondUpdate,
        startingGame: startingGame,
        objectChangeCache: objectChangeCache
    }
}();

var clickedLast = false;
var rollingClicks = 0;
var lastRollingClicks = 0;
function handleRockState() {

    lastRollingClicks = rollingClicks;
    if (clickedLast) {

        rollingClicks = Math.min(5, rollingClicks + 1);
        clickedLast = false;
    }
    else rollingClicks = Math.max(0, rollingClicks - 1);
}