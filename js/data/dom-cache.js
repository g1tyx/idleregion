//© 2023 - 2023 www.idleregion.com - All Rights Reserved.

//#region Board canvas
const boardHolder = document.getElementById("game-board");

const groundBoard = document.getElementById("ground-tiles");
const reflectBoard = document.getElementById("reflect-canvas");
const gameBoard = document.getElementById("object-tiles");
const borderBoard = document.getElementById("border-tiles");
const effectBoard = document.getElementById("effect-tiles");
const warningBoard = document.getElementById("warning-tiles");
const cursorBoard = document.getElementById("cursor-tiles");

const gridCanvas = document.getElementById("grid-canvas");
const boostBoard = document.getElementById("boost-canvas");

const boardCanvi = [groundBoard, reflectBoard, gameBoard, borderBoard, effectBoard, warningBoard, cursorBoard, gridCanvas, boostBoard];
//#endregion

//#region Board canvas context
const groundCtx = groundBoard.getContext("2d", {alpha: false});
const reflectCtx = reflectBoard.getContext("2d");
const gameCtx = gameBoard.getContext("2d");
const borderCtx = borderBoard.getContext("2d");
const effectCtx = effectBoard.getContext("2d");
const warningCtx = warningBoard.getContext("2d");
const cursorCtx = cursorBoard.getContext("2d");

const gridCtx = gridCanvas.getContext("2d");
const boostCtx = boostBoard.getContext("2d");
//#endregion

//#region UI Canvas
const tierCanvas = document.getElementById("tier-picker");
const quantityCanvas = document.getElementById("buy-quantity");
const edictButtonCanvas = document.getElementById("edict-button");
const buttonList = document.getElementById("building-list");
const buttonHolder = document.getElementById("building-container");

const inventoryPanel = document.getElementById("inventory-slots");
const controlPanel = document.getElementById("control-slots");

const nameCanvas = document.getElementById("region-name");
const scorePanel = document.getElementById("score-canvas");
const rockCanvas = document.getElementById("click-rock");
const powerupCanvas = document.getElementById("powerups");

const hintCanvas = document.getElementById("hints-panel");
const perfUi = document.getElementById("fps");
const optionsPanel = document.getElementById("options-panel");

const leftInvArrow = document.getElementById("inventory-left-arrow");
const rightInvArrow = document.getElementById("inventory-right-arrow");

const newsTickerText = document.getElementById("news-ticker-text");
const newsTickerHolder = document.getElementById("news-ticker-container");
//#endregion

//#region UI canvas context
const tierCtx = tierCanvas.getContext("2d");
const quantityCtx = quantityCanvas.getContext("2d");
const edictButtonCtx = edictButtonCanvas.getContext("2d");

const inventoryCtx = inventoryPanel.getContext("2d", {alpha: false});
const controlCtx = controlPanel.getContext("2d", {alpha: false});

const nameCtx = nameCanvas.getContext("2d", {alpha: false});
const scoreCtx = scorePanel.getContext("2d", {alpha: false});
const rockCtx = rockCanvas.getContext("2d", {alpha: false});
const powerupCtx = powerupCanvas.getContext("2d");

const hintCtx = hintCanvas.getContext("2d", {willReadFrequently: true});
const optionsCtx = optionsPanel.getContext("2d", {alpha: false});

const leftInvArrowCtx = leftInvArrow.getContext("2d");
const rightInvArrowCtx = rightInvArrow.getContext("2d");
//#endregion

//#region Alerts
const alertContainer = document.getElementById("alert-container");
const alertWindow = document.getElementById("alert-dialog");
const tooltipDialog = document.getElementById("tooltip-dialog");

const hintContainer = document.getElementById("hints-container");
const hintTitle = document.getElementById("hints-title");
const hintCanvasContainer = document.getElementById("hint-canvas-container");
//#endregion

//#region Favicon
const favText = document.getElementById("favicon-text");
const favImage = document.getElementById("favicon-image");
//#endregion

//#region Client rect cache
var RECT_GAMEBOARD = gameBoard.getBoundingClientRect();

var RECT_INVENTORYPANEL = inventoryPanel.getBoundingClientRect();
var COMPSTYLE_INVENTORYPANEL = getComputedStyle(inventoryPanel);
var RECT_OPTIONSPANEL = optionsPanel.getBoundingClientRect();
var RECT_CONTROLPANEL = controlPanel.getBoundingClientRect();
var RECT_ROCKPANEL = rockCanvas.getBoundingClientRect();
var RECT_BUTTONLIST = buttonList.getBoundingClientRect();
var RECT_TIERCANVAS = tierCanvas.getBoundingClientRect();
var RECT_QUANTITYCANVAS = quantityCanvas.getBoundingClientRect();
var RECT_HELPCANVAS = hintCanvas.getBoundingClientRect();

var WINDOW_INNERWIDTH = window.innerWidth;
var WINDOW_INNERHEIGHT = window.innerHeight;
//groundBoard, cursorBoard, effectBoard, inventoryPanel, 
//#endregion

//#region Cached canvi
const BUILDING_SPRITE_CACHE = [];
//#endregion

//#region Settings element
//#region Buttons
const SETTINGS_PATCHNOTES = document.createElement("input");
SETTINGS_PATCHNOTES.setAttribute("type", "button");
SETTINGS_PATCHNOTES.classList.add("options-patch-button", "options-button");
SETTINGS_PATCHNOTES.value = "查看更新日志";
SETTINGS_PATCHNOTES.style.left = "188px";
SETTINGS_PATCHNOTES.addEventListener("click", function() {

    fluffUtils.playSound("click-button");
    EventListeners.clearAlertCanvas();
    let patchNoteHolder = document.createElement("div");
    patchNoteHolder.id = "gamestart-dialog";
    patchNoteHolder.classList.add("scrollbar");
    patchNoteHolder.style.overflowY = "scroll";
    patchNoteHolder.style.maxHeight = "600px";
    let patchCanvas = document.createElement("canvas");
    let patchCtx = patchCanvas.getContext("2d", {willReadFrequently: true});
    let drawPatch = new PatchNoteCanvas();
    drawPatch.draw(patchCanvas, patchCtx);
    patchNoteHolder.appendChild(patchCanvas);
    patchNoteHolder.addEventListener("click", function() {
        drawContextualUI.inSettingsMenu = false;
        EventListeners.clearAlertCanvas();
    });
    drawContextualUI.addToAlertWindow(patchNoteHolder);
});

const SETTINGS_FORCESAVE = document.createElement("input");
SETTINGS_FORCESAVE.setAttribute("type", "button");
SETTINGS_FORCESAVE.classList.add("options-button");
SETTINGS_FORCESAVE.value = "保存游戏";
SETTINGS_FORCESAVE.style.left = "188px";
SETTINGS_FORCESAVE.addEventListener("click", function() {

    saveHandler.saveLocalStorage(gameState, gameSettings);
    fluffUtils.playSound("click-button");
});

const SETTINGS_DOWNLOADSAVE = document.createElement("input");
SETTINGS_DOWNLOADSAVE.setAttribute("type", "button");
SETTINGS_DOWNLOADSAVE.classList.add("options-button");
SETTINGS_DOWNLOADSAVE.value = "导出存档";
SETTINGS_DOWNLOADSAVE.style.left = "311px";
SETTINGS_DOWNLOADSAVE.addEventListener("click", function() {

    saveHandler.downloadSave(gameState);
    fluffUtils.playSound("click-button");
});

const SETTINGS_IMPORTSAVE = document.createElement("input");
SETTINGS_IMPORTSAVE.setAttribute("type", "button");
SETTINGS_IMPORTSAVE.classList.add("options-button");
SETTINGS_IMPORTSAVE.value = "导入存档";
SETTINGS_IMPORTSAVE.style.left = "452px";
SETTINGS_IMPORTSAVE.addEventListener("click", function() {

    let fileInput = document.createElement("input");
    fluffUtils.playSound("click-button");
    fileInput.setAttribute("type", "file");
    fileInput.click();
    fileInput.onchange = e => {

        let file = e.target.files[0];
        let reader = new FileReader();
        reader.readAsText(file, "UTF-8");
        reader.onload = readerEvent => {

            let content = readerEvent.target.result;
            let gameSave = JSON.parse(content);
            saveHandler.importLocalStorage(gameSave);
            location.reload();
        }
    }
});

const SETTINGS_DELETESAVE = document.createElement("input");
SETTINGS_DELETESAVE.setAttribute("type", "button");
SETTINGS_DELETESAVE.classList.add("options-button-delete");
SETTINGS_DELETESAVE.value = "删除存档";
SETTINGS_DELETESAVE.style.color = "white";
SETTINGS_DELETESAVE.style.left = "188px";
SETTINGS_DELETESAVE.addEventListener("click", function() {

    // TODO: add alerting sound
    fluffUtils.playSound("click-button");
    let confirmDelete = document.createElement("input");
    confirmDelete.setAttribute("type", "button");
    confirmDelete.classList.add("options-button-delete");
    confirmDelete.value = "点击确认";
    confirmDelete.style.boxShadow = `0px 0px 10px 5px rgba(255, 128, 128, 0.5)`;
    confirmDelete.style.color = "white";
    confirmDelete.style.bottom = "20px";
    confirmDelete.style.left = "322px";
    confirmDelete.addEventListener("click", function() {

        fluffUtils.playSound("click-button");
        localStorage.removeItem("regionidle-save");
        location.reload();
    });
    let settingsBox = document.getElementById("settings-panel");
    settingsBox.appendChild(confirmDelete);
});

const SETTINGS_CLEARTILES = document.createElement("input");
SETTINGS_CLEARTILES.setAttribute("type", "button");
SETTINGS_CLEARTILES.classList.add("options-button-delete");
SETTINGS_CLEARTILES.value = "清除全部地块";
SETTINGS_CLEARTILES.style.color = "white";
SETTINGS_CLEARTILES.style.left = "188px";
SETTINGS_CLEARTILES.addEventListener("click", function() {

    // TODO: add alerting sound
    fluffUtils.playSound("click-button");
    let confirmClear = document.createElement("input");
    confirmClear.setAttribute("type", "button");
    confirmClear.classList.add("options-button-delete");
    confirmClear.value = "点击确认";
    confirmClear.style.boxShadow = `0px 0px 10px 5px rgba(255, 128, 128, 0.5)`;
    confirmClear.style.color = "white";
    confirmClear.style.bottom = "70px";
    confirmClear.style.left = "362px";
    confirmClear.addEventListener("click", function() {

        boardUtils.clearAllTiles();
    });
    let settingsBox = document.getElementById("settings-panel");
    settingsBox.appendChild(confirmClear);
});

const SETTINGS_DISCORDBUTTON = document.createElement("input");
SETTINGS_DISCORDBUTTON.setAttribute("type", "button");
SETTINGS_DISCORDBUTTON.classList.add("discord-button");
SETTINGS_DISCORDBUTTON.value = "Idle Region Discord";
SETTINGS_DISCORDBUTTON.style.left = "274px";
SETTINGS_DISCORDBUTTON.addEventListener("click", function() {

    if (confirm("Open IdleRegion Discord?")) window.open("https://discord.gg/NGRQ268MUG", "_blank");
});

//#endregion

//#region Checkboxes
const SETTINGS_FREEZETIME = document.createElement("input");
SETTINGS_FREEZETIME.setAttribute("type", "checkbox");
SETTINGS_FREEZETIME.classList.add("settings-checkbox");
SETTINGS_FREEZETIME.addEventListener("change", function() {

    gameState.worldSettings.timeOfDay = 480;
    gameState.worldSettings.weatherState = 0.1;
    drawBoard.drawDayNightCycle();
    gameSettings.freezeTime = this.checked;
    fluffUtils.playSound("click-button");
});

const SETTINGS_TOGGLELIGHTS = document.createElement("input");
SETTINGS_TOGGLELIGHTS.setAttribute("type", "checkbox");
SETTINGS_TOGGLELIGHTS.classList.add("settings-checkbox");
SETTINGS_TOGGLELIGHTS.addEventListener("change", function() {

    gameSettings.drawLights = this.checked;
    fluffUtils.playSound("click-button");
});

const SETTINGS_TOGGLEREFLECTIONS = document.createElement("input");
SETTINGS_TOGGLEREFLECTIONS.setAttribute("type", "checkbox");
SETTINGS_TOGGLEREFLECTIONS.classList.add("settings-checkbox");
SETTINGS_TOGGLEREFLECTIONS.addEventListener("change", function() {

    gameSettings.drawReflections = this.checked;
    fluffUtils.playSound("click-button");
});

const SETTINGS_TOGGLEWEATHER = document.createElement("input");
SETTINGS_TOGGLEWEATHER.setAttribute("type", "checkbox");
SETTINGS_TOGGLEWEATHER.classList.add("settings-checkbox");
SETTINGS_TOGGLEWEATHER.addEventListener("change", function() {

    gameSettings.drawWeather = this.checked;
    ambientSound.playWeather = this.checked;
    fluffUtils.playSound("click-button");
});

const SETTINGS_TOGGLELIGHTNING = document.createElement("input");
SETTINGS_TOGGLELIGHTNING.setAttribute("type", "checkbox");
SETTINGS_TOGGLELIGHTNING.classList.add("settings-checkbox");
SETTINGS_TOGGLELIGHTNING.addEventListener("change", function() {

    gameSettings.drawLightning = this.checked;
    fluffUtils.playSound("click-button");
    drawUI.toggleNewsTicker();
});

const SETTINGS_TOGGLEFPS = document.createElement("input");
SETTINGS_TOGGLEFPS.setAttribute("type", "checkbox");
SETTINGS_TOGGLEFPS.classList.add("settings-checkbox");
SETTINGS_TOGGLEFPS.addEventListener("change", function() {

    gameSettings.showFps = !gameSettings.showFps;
    fluffUtils.playSound("click-button");
    if (gameSettings.showFps) document.getElementById("fps-holder").style.display = "block";
    else document.getElementById("fps-holder").style.display = "none";
});

const SETTINGS_TOGGLEAUTOSAVE = document.createElement("input");
SETTINGS_TOGGLEAUTOSAVE.setAttribute("type", "checkbox");
SETTINGS_TOGGLEAUTOSAVE.classList.add("settings-checkbox");
SETTINGS_TOGGLEAUTOSAVE.addEventListener("change", function() {

    gameSettings.autoSave = this.checked;
    fluffUtils.playSound("click-button");
});

const SETTINGS_TOGGLERESOURCENUM = document.createElement("input");
SETTINGS_TOGGLERESOURCENUM.setAttribute("type", "checkbox");
SETTINGS_TOGGLERESOURCENUM.classList.add("settings-checkbox");
SETTINGS_TOGGLERESOURCENUM.addEventListener("change", function() {

    gameSettings.realResourceNumbers = this.checked;
    fluffUtils.playSound("click-button");
});

const SETTINGS_TOGGLETICKER = document.createElement("input");
SETTINGS_TOGGLETICKER.setAttribute("type", "checkbox");
SETTINGS_TOGGLETICKER.classList.add("settings-checkbox");
SETTINGS_TOGGLETICKER.addEventListener("click", function() {

    gameSettings.showTicker = !gameSettings.showTicker;
    this.checked = gameSettings.showTicker;
    drawUI.toggleNewsTicker();
});

const SETTINGS_GUI_SMALL = document.createElement("input");
SETTINGS_GUI_SMALL.setAttribute("type", "checkbox");
SETTINGS_GUI_SMALL.classList.add("settings-checkbox");
SETTINGS_GUI_SMALL.style.left = "352px";
SETTINGS_GUI_SMALL.addEventListener("click", function() {

    gameSettings.guiSize = "small";
    this.checked = true;
    SETTINGS_GUI_MEDIUM.checked = false;
    SETTINGS_GUI_LARGE.checked = false;
    fluffUtils.resizeGUI();
});

const SETTINGS_GUI_MEDIUM = document.createElement("input");
SETTINGS_GUI_MEDIUM.setAttribute("type", "checkbox");
SETTINGS_GUI_MEDIUM.classList.add("settings-checkbox");
SETTINGS_GUI_MEDIUM.style.left = "424px";
SETTINGS_GUI_MEDIUM.addEventListener("click", function() {

    gameSettings.guiSize = "medium";
    this.checked = true;
    SETTINGS_GUI_SMALL.checked = false;
    SETTINGS_GUI_LARGE.checked = false;
    fluffUtils.resizeGUI();
});

const SETTINGS_GUI_LARGE = document.createElement("input");
SETTINGS_GUI_LARGE.setAttribute("type", "checkbox");
SETTINGS_GUI_LARGE.classList.add("settings-checkbox");
SETTINGS_GUI_LARGE.style.left = "496px";
SETTINGS_GUI_LARGE.addEventListener("click", function() {

    gameSettings.guiSize = "large";
    this.checked = true;
    SETTINGS_GUI_MEDIUM.checked = false;
    SETTINGS_GUI_SMALL.checked = false;
    fluffUtils.resizeGUI();
});
//#endregion

//#region Sliders
const SETTINGS_SLIDERVOLUMEUI = document.createElement("input");
SETTINGS_SLIDERVOLUMEUI.setAttribute("type", "range");
SETTINGS_SLIDERVOLUMEUI.classList.add("settings-slider");
SETTINGS_SLIDERVOLUMEUI.addEventListener("change", function() {

    gameSettings.volumeUI = SETTINGS_SLIDERVOLUMEUI.value / 100;
    fluffUtils.playSound("click-button");
});

const SETTINGS_SLIDERVOLUMEAMB = document.createElement("input");
SETTINGS_SLIDERVOLUMEAMB.setAttribute("type", "range");
SETTINGS_SLIDERVOLUMEAMB.classList.add("settings-slider");
SETTINGS_SLIDERVOLUMEAMB.addEventListener("change", function() {

    gameSettings.volumeAmb = SETTINGS_SLIDERVOLUMEAMB.value / 100;
    ambientSound.volumeLevel = gameSettings.volumeAmb;
    fluffUtils.playSound("click-button");
});
//#endregion
//#endregion
