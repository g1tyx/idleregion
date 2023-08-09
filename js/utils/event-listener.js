//© 2023 - 2023 www.idleregion.com - All Rights Reserved.

EventListeners = function() {

    this.mousePos = {x: 0, y: 0};
    function addEventListeners() {

        // Handle zooming
        boardHolder.addEventListener("wheel", (e) => {
        
            // Base scaling factor off the smallest window dimension
            let minWindowSize = Math.min(WINDOW_INNERHEIGHT, WINDOW_INNERWIDTH);
            let windowRatio = minWindowSize / WINDOW_INNERWIDTH;
        
            // Scroll limits and vars
            let boardSqrt = Math.sqrt(gameState.worldSettings.boardSize)
            let minZoom = boardSqrt / windowRatio;
            let maxZoom = (2 / boardSqrt) / windowRatio;
            let zoomSpeed = 1 * zoom / 4;
        
            // Get mouse position in canvas
            var prevRect = gameBoard.getBoundingClientRect();
            var canvasMousePos = {x: (mousePos.x - prevRect.left) / prevRect.width, y: (mousePos.y - prevRect.top) / prevRect.height};
        
            let prevZoom = zoom;
            if (e.deltaY > 0) zoom = mathUtils.clamp(zoom - zoomSpeed, maxZoom, minZoom);     // down
            else if (e.deltaY < 0) zoom = mathUtils.clamp(zoom + zoomSpeed, maxZoom, minZoom);// up

            // Skip if zooom hasn't changed
            if (zoom == prevZoom) return;
        
            let len = boardCanvi.length;
            for (let i = 0; i < len; i++) boardCanvi[i].style.transform = `scale(${zoom * windowRatio})`;
        
            // Get mouse position in new canvas, divide by scale of new canvas
            var newRect = gameBoard.getBoundingClientRect();
            var newCanvasMousePos = {x: (mousePos.x - newRect.left) / newRect.width, y: (mousePos.y - newRect.top) / newRect.height};
        
            // Get mouse delta from previous canvas rect to new
            const mouseDelta = {x: (newCanvasMousePos.x - canvasMousePos.x) * newRect.width, y: (newCanvasMousePos.y - canvasMousePos.y) * newRect.width};
        
            for (let i = 0; i < len; i++) {
            
                boardCanvi[i].style.left = `${newRect.left + mouseDelta.x}px`;
                boardCanvi[i].style.top = `${newRect.top + mouseDelta.y}px`;
            }
        
            let zoomValue = ((zoom - maxZoom) / ((minZoom - maxZoom) / 2));
            ambientSound.zoomLevel = zoomValue;
            cacheUtils.cacheBoardRects();
        });

        if (!tempSettings.usingMobile) document.addEventListener("mousemove", desktopMouseMove);
        if (tempSettings.usingMobile) {

            document.addEventListener("touchmove", mobileMouseMove);
            document.addEventListener("touchstart", mobileMouseMove);
        }

        // Suppress context menu
        document.addEventListener("contextmenu", (e) => {
        
            e.preventDefault();
        });

        // Click rock
        rockCanvas.addEventListener("click", function() {
        
            gameState.earnClick();
            fluffUtils.playSound("rock-break");
            clickedLast = true;
        });

        // Change region name
        nameCanvas.addEventListener("click", function() {
        
            fluffUtils.playSound("building-buy");
            let newName = prompt("Rename Your Region (Leave Blank for Random Name):");
            if (newName == null || newName.length == 0) {
            
                newName = fluffUtils.randomizeRegionName();
            }
            else if (newName.length > 25) {
            
                newName = newName.slice(0, 25);
            }
            gameState.player.name = newName;
            gameState.player.achievements.checkChangeName();
            drawUI.drawRegionNameCanvas();
        });

        // Get selected index of inventory
        inventoryPanel.addEventListener("click", function() {
        
            let rect = RECT_INVENTORYPANEL;
            let realTileSize = rect.width / 4;
            selectedPos = {
                x: Math.floor((mousePos.x - rect.left) / realTileSize), 
                y: Math.floor((mousePos.y - rect.top) / realTileSize)
            };
        
            // Clear if already selected
            let index = selectedPos.x + (selectedPos.y * 4);
            if (index + 1 == gameSettings.selBuilding) {
            
                gameSettings.selBuilding = 0;
                gameSettings.cursorState = "none";
            }
            // Select if new
            else if (mathUtils.clamp(index, 0, 7) == index) {
            
                gameSettings.selBuilding = index + 1;
                gameSettings.cursorState = "select";
            }
            // Update cursor canvas
            drawBoard.drawCursorCanvas();
            fluffUtils.playSound("building-buy");
        });

        inventoryPanel.addEventListener("mouseout", function() {

            if (alertWindow.innerHTML != "") return;

            tooltipDialog.innerHTML = "";
            alertContainer.style.display = "none";
            drawContextualUI.invIndex = -1;
        });

        // Control panel
        controlPanel.addEventListener("click", function() {
        
            let rect = RECT_CONTROLPANEL;
            let realTileSize = rect.width / 6;
            selectedPos = {x: Math.floor((mousePos.x - rect.left) / realTileSize), y: Math.floor((mousePos.y - rect.top) / realTileSize)};
        
            if (selectedPos.x == 0) {
            
                gameSettings.showGrid = !gameSettings.showGrid;
            
                if (gameSettings.showGrid) gridCanvas.style.display = "block";
                else gridCanvas.style.display = "none";
            }
            if (selectedPos.x == 1) {
            
                gameSettings.showBuff = !gameSettings.showBuff;

                if (gameSettings.showBuff) {
                
                    drawBoard.drawBoostCanvas();
                    boostBoard.style.display = "block";
                }
                else boostBoard.style.display = "none";
            }
            if (selectedPos.x == 2) {
            
                // Trigger multiple times, regular zoom is too minimal
                for (let i = 0; i < 4; i++) boardHolder.dispatchEvent(new WheelEvent("wheel", {deltaY: -100, deltaMode: 1}));
            }
            if (selectedPos.x == 3) {
            
                for (let i = 0; i < 4; i++) boardHolder.dispatchEvent(new WheelEvent("wheel", {deltaY: 100, deltaMode: 1}));
            }
            if (selectedPos.x == 4) {

                if (gameSettings.cursorState == "inspect") gameSettings.cursorState = "none";
                else gameSettings.cursorState = "inspect";
                gameSettings.selBuilding = 0;
            }
            if (selectedPos.x == 5) {
            
                if (gameSettings.cursorState == "delete") gameSettings.cursorState = "none"
                else gameSettings.cursorState = "delete";
                gameSettings.selBuilding = 0;
            }
            drawUI.drawControlPanel();
            drawBoard.drawCursorCanvas();
            fluffUtils.playSound("building-buy");
        });

        // Click options
        optionsPanel.addEventListener("click", function() {
        
            let rect = RECT_OPTIONSPANEL;
            let realTileSize = rect.height / 4;
            selectedPos = {x: Math.floor((mousePos.x - rect.left) / realTileSize), y: Math.floor((mousePos.y - rect.top) / realTileSize)};
        
            if (selectedPos.y == 0) {
            
                drawContextualUI.drawHelpCanvas();
            }
            else if (selectedPos.y == 1) {
            
                drawContextualUI.drawSettingsCanvas();
            }
            else if (selectedPos.y == 2) {
            
                drawContextualUI.drawStatsCanvas();
            }
            else if (selectedPos.y == 3) {
            
                drawContextualUI.drawAchievementCanvas();
            }
            fluffUtils.playSound("building-buy");
        });

        //#region Handle placing tiles
        let mouseHold = false;
        window.addEventListener("mousedown", function(e) {
        
            var e = e || window.event;
            if (e.button === 0) mouseHold = true;
        });

        window.addEventListener("mouseup", function(e) {
        
            var e = e || window.event;
            if (e.button === 0) {
            
                boardUtils.lastPlacedPos = {x: -1, y: -1};
                mouseHold = false;
            }
        });

        cursorBoard.addEventListener("mousemove", function() {
        
            if (mouseHold) boardUtils.handleObjectTileChange();
        });

        cursorBoard.addEventListener("click", function(e) {
        
            // Quick-select building
            if (e.ctrlKey) {

                boardUtils.quickSelect();
                return;
            }

            if (gameSettings.cursorState == "inspect") {

                clearAlertCanvas();
                drawContextualUI.createInspectPopup();
            }

            // Click meteor
            if (gameState.environment.meteors.length > 0) {

                let selPos = boardUtils.returnGameBoardPos();
                let index = gameState.environment.meteors.findIndex(e => e.x === selPos.x && e.y === selPos.y);

                if (index != -1) {

                    let meteor = gameState.environment.meteors[index];

                    gameState.destroyMeteor(index);
                    gameState.addEffect(meteor.effect);

                    fluffUtils.playSound("remove-rock");

                    drawContextualUI.achievementQueue.push(meteor.effect);
                    gameState.stats.meteorClicks++;
                    gameState.player.achievements.checkMeteorClicks(gameState.stats.meteorClicks);

                    drawBoard.drawObjectCanvas(meteor);
                }
            }

            boardUtils.handleObjectTileChange();
        })
        //#endregion

        // Change tile type
        document.getElementById("place-type-holder").addEventListener("click", changeTileType);

        // Click tier selector
        tierCanvas.addEventListener("click", function() {
        
            let rect = RECT_TIERCANVAS;
            let arrowWidth = (rect.width / 6);
        
            gameSettings.placeType = "building";
            let pageLength = mathUtils.returnInventoryPageLength();
            if ((mousePos.x > rect.left && mousePos.x < (rect.left + arrowWidth)) &&
                (mousePos.y > rect.top && mousePos.y < rect.bottom)) {
                
                gameSettings.selTier = mathUtils.clamp(gameSettings.selTier - 1, 0, pageLength);
                fluffUtils.playSound("click-button");
            }
            if ((mousePos.x > (rect.right - arrowWidth) && mousePos.x < rect.right) &&
                (mousePos.y > rect.top && mousePos.y < rect.bottom)) {
                
                gameSettings.selTier = mathUtils.clamp(gameSettings.selTier + 1, 0, pageLength);
                fluffUtils.playSound("click-button");
            }

            fluffUtils.generateBuildingButtons();
            drawUI.drawBuildingButtons();
            drawUI.drawTileSelectors();
            drawUI.drawTierSelector();
            drawUI.drawInventory();
        });

        // Click buy quantity
        quantityCanvas.addEventListener("click", function() {
        
            let rect = RECT_QUANTITYCANVAS;
            let realTileSize = rect.width / 3;

            if (mousePos.x - rect.left < realTileSize) {
                gameSettings.buyQuantity = 1;
            }
            else if (mousePos.x - rect.left < realTileSize * 2) {
                gameSettings.buyQuantity = 5;
            }
            else if (mousePos.x - rect.left < realTileSize * 3) {
                gameSettings.buyQuantity = 50;
            }
            // Redraw building buttons
            drawUI.drawBuildingButtons(true);
            drawUI.drawBuyQuantity();
        
            // Play sound
            fluffUtils.playSound("click-button");
        });

        // Resize building button list on window resize
        window.onresize = function() {
        
            // Building buttons
            buttonList.style.height = "auto";
            let autoRect = buttonList.getBoundingClientRect();
            let screenHeight = window.innerHeight;
            let newHeight = Math.min((screenHeight - autoRect.top - 50), autoRect.height);
            buttonList.style.height = `${newHeight}px`;
        
            //#region Alert box
            if (document.getElementById("edict-book") != null) {

                let edictHolder = document.getElementById("edict-book-holder");

                let width, height;
                if (WINDOW_INNERHEIGHT > WINDOW_INNERWIDTH / 1.52) width = WINDOW_INNERWIDTH * 0.75, height = width / 1.52;
                else height = WINDOW_INNERHEIGHT * 0.75, width = height * 1.52;
                edictHolder.style.width = `${width}px`;
                edictHolder.style.height = `${height}px`;
            }

            let rect = alertWindow.getBoundingClientRect();
            alertWindow.style.left = `${(window.innerWidth / 2) - (rect.width / 2)}px`;
            alertWindow.style.top = `${(window.innerHeight / 2) - (rect.height / 2)}px`;
            //#endregion

            if (gameMain.startingGame) {

                if (document.getElementById("gamestart-dialog-error") == null) return;

                let startRect = document.getElementById("gamestart-dialog").getBoundingClientRect();
                let errorHolder = document.getElementById("gamestart-dialog-error");
                errorHolder.style.top = `${startRect.bottom + 20}px`;
            }

            cacheUtils.cacheRects();
            drawUI.setHintLocation();
        }

        // Check if tab focused or not
        document.addEventListener("visibilitychange", function() {

            if (!gameMain.startingGame) {

                if (document.hidden) ambientSound.hasFocus = false;
                else ambientSound.hasFocus = true;
                ambientSound.calculateAmbience();
            }
            fluffUtils.pauseMusic();
        });

        // Close dialog window
        alertWindow.addEventListener("click", function() {
        
            if (gameMain.startingGame || drawContextualUI.inSettingsMenu) return;
            clearAlertCanvas();
        });

        // Remove tooltip
        buttonList.addEventListener("mouseout", function() {
        
            tooltipDialog.innerHTML = "";
            alertContainer.style.display = "none";
        });

        //#region Inventory tier arrows
        document.getElementById("inventory-left-arrow").addEventListener("click", function() {

            fluffUtils.playSound("click-button");
            controlArrowTier("left");
        });

        document.getElementById("inventory-right-arrow").addEventListener("click", function() {

            fluffUtils.playSound("click-button");
            controlArrowTier("right");
        });
        //#endregion

        edictButtonCanvas.addEventListener("click", function() {

            fluffUtils.playSound("edict-open");
            clearAlertCanvas()
            drawUI.drawEdictBook();
        });

        // News ticker
        newsTickerText.addEventListener("click", function() {

            fluffUtils.playSound("click-button");
            fluffUtils.generateNewsTickerText();
        })
    }

    function mobileMouseMove(e) {

        mousePos.x = e.changedTouches[0].pageX;
        mousePos.y = e.changedTouches[0].pageY;

        if (gameSettings.cursorState != "none" && drawContextualUI.inspectPopup == true) {

            let selPos = boardUtils.returnGameBoardPos();
            if (document.getElementById(`inspect-tooltip-${selPos.x}-${selPos.y}`) == null) {

                clearAlertCanvas();
                drawContextualUI.inspectPopup = false;
            }
        }
    }

    function desktopMouseMove(e) {

        mousePos.x = e.clientX;
        mousePos.y = e.clientY;

        if (gameSettings.cursorState != "none" && drawContextualUI.inspectPopup == true) {

            let selPos = boardUtils.returnGameBoardPos();
            if (document.getElementById(`inspect-tooltip-${selPos.x}-${selPos.y}`) == null) {

                clearAlertCanvas();
                drawContextualUI.inspectPopup = false;
            }
        }
    }

    function toggleHintsPanel() {

        fluffUtils.playSound("click-button");
        gameSettings.showHints = !gameSettings.showHints;
        if (gameSettings.showHints) {

            hintCanvasContainer.style.display = "block";
            hintTitle.style.borderRadius = `10px 0 0 0`;
            hintTitle.textContent = ">";

            drawUI.setHintLocation();
            drawUI.drawHintPanel();
        }
        else {

            hintCanvasContainer.style.display = "none";
            hintTitle.style.borderRadius = `10px 0 0 10px`;
            hintTitle.textContent = "< Overview";

            drawUI.setHintLocation();
        }
    }

    function changeTileType(e) {

        fluffUtils.playSound("click-button");
        if (e.target.id.includes("building")) gameSettings.placeType = "building";
        else if (e.target.id.includes("path")) gameSettings.placeType = "path";
        else if (e.target.id.includes("scenery")) gameSettings.placeType = "scenery";

        gameSettings.selTier = 0;
        fluffUtils.generateBuildingButtons();
        drawUI.drawBuildingButtons();
        drawUI.drawTileSelectors();
        drawUI.drawTierSelector();
        drawUI.drawInventory()
    }

    function addKeyControls() {

        document.addEventListener("keydown", (e) => {

            // Delete
            if (e.code == "Delete" || e.code == "KeyX") {
            
                if (gameSettings.cursorState == "delete") gameSettings.cursorState = "none";
                else gameSettings.cursorState = "delete";
                gameSettings.selBuilding = 0;
            }

            // Back to null state
            else if (e.code == "Escape") {
            
                if (alertWindow.innerHTML == "" && gameSettings.cursorState == "none") {

                    drawContextualUI.drawSettingsCanvas();
                    return;
                }

                gameSettings.cursorState = "none";
                gameSettings.selBuilding = 0;

                // Escape out of alert
                if (gameMain.startingGame) return;
        
                alertWindow.innerHTML = "";
                alertContainer.style.display = "none";
            }
        
            //#region Control panel
            // Toggle rendering buff multipliers
            if (e.code == "KeyW") {
            
                gameSettings.showBuff = !gameSettings.showBuff;
            
                if (gameSettings.showBuff) {
                
                    drawBoard.drawBoostCanvas();
                    boostBoard.style.display = "block";
                }
                else boostBoard.style.display = "none";
            }
            // Toggle rendering board grid
            if (e.code == "KeyQ") {
            
                gameSettings.showGrid = !gameSettings.showGrid;
                if (!gameSettings.showGrid) gridCanvas.style.display = "none";
                else gridCanvas.style.display = "block";
            }
            // Zoom hotkeys
            if (e.code == "KeyE") {
            
                for (let i = 0; i < 4; i++) boardHolder.dispatchEvent(new WheelEvent("wheel", {deltaY: -100, deltaMode: 1}));
            }
            if (e.code == "KeyR") {
            
                for (let i = 0; i < 4; i++) boardHolder.dispatchEvent(new WheelEvent("wheel", {deltaY: 100, deltaMode: 1}));
            }
            // Inspect
            if (e.code == "KeyZ") {
            
                clearAlertCanvas();
                if (gameSettings.cursorState == "inspect") gameSettings.cursorState = "none";
                else gameSettings.cursorState = "inspect";
                gameSettings.selBuilding = 0;
            }
            //#endregion
        
            //#region Debug keys
            if (gameSettings.debugMode) {

                if (e.code == "KeyY") {
            
                    // Add money
                    let balAdd = prompt("How much money to add:");
                    if (/^[0-9]+$/.test(balAdd)) gameState.player.balance += Number(balAdd);
                }
                if (e.code == "KeyT") {
            
                    // Add money
                    let balAdd = prompt("Set Balance:");
                    if (/^[0-9]+$/.test(balAdd)) gameState.player.balance = Number(balAdd);
                }
                if (e.code == "KeyU") {
                
                    // Time forward
                    gameState.worldSettings.timeOfDay += 100;
                }
                if (e.code == "KeyM") {
                
                    // Weather up
                    gameState.worldSettings.weatherState = Math.min(gameState.worldSettings.weatherState + 0.05, 0.99);
                }
                if (e.code == "KeyN") {
                
                    // Weather down
                    gameState.worldSettings.weatherState = Math.max(gameState.worldSettings.weatherState - 0.05, 0.01);
                }
            }
            //#endregion
        
            //#region Menu Keys
            if (e.code == "KeyA") {
            
                // Achievement
                clearAlertCanvas()
                drawContextualUI.drawAchievementCanvas();
            }
            if (e.code == "KeyO") {
            
                // Settings
                clearAlertCanvas()
                drawContextualUI.drawSettingsCanvas();
            }
            if (e.code == "KeyH") {
            
                // Help
                clearAlertCanvas()
                drawContextualUI.drawHelpCanvas();
            }
            if (e.code == "KeyS") {
            
                // Achievement
                clearAlertCanvas()
                drawContextualUI.drawStatsCanvas();
            }
            if (e.code == "KeyP") {
                    
                clearAlertCanvas()
                drawUI.drawEdictBook();
            }
            //#endregion

            // Change selected tier
            if (e.shiftKey) {
            
                let newTier = null;
                if (e.code == "Digit1") newTier = 0;
                else if (e.code == "Digit2") newTier = 1;
                else if (e.code == "Digit3") newTier = 2;
                else if (e.code == "Digit4") newTier = 3;
                else if (e.code == "Digit5") newTier = 4;
                
                let pageLength = mathUtils.returnInventoryPageLength();
                if (newTier != null) {
                
                    if (pageLength < newTier) return;
                    gameSettings.selTier = newTier;

                    fluffUtils.generateBuildingButtons();
                    drawUI.drawBuildingButtons();
                    drawUI.drawTileSelectors();
                    drawUI.drawTierSelector();
                    drawUI.drawInventory();
                }
            }

            // Quick-select tile type
            if (e.ctrlKey) {

                e.preventDefault();

                let tileType = null;
                if (e.code == "Digit1") tileType = "building";
                else if (e.code == "Digit2") tileType = "path";
                else if (e.code == "Digit3") tileType = "scenery";

                if (tileType == null) return;

                let pageLength = mathUtils.returnInventoryPageLength(tileType);
                if (pageLength < gameSettings.selTier) gameSettings.selTier = 0;

                gameSettings.placeType = tileType;
                fluffUtils.generateBuildingButtons();
                drawUI.drawBuildingButtons();
                drawUI.drawTileSelectors();
                drawUI.drawTierSelector();
                drawUI.drawInventory();
            }

            // Unchoose tower
            if (parseInt(e.key) == gameSettings.selBuilding) {
            
                gameSettings.selBuilding = 0;
                gameSettings.cursorState = "none"
            }
            
            // Choose tower
            else if (mathUtils.clamp(parseInt(e.key), 1, 8) == parseInt(e.key)) {
            
                gameSettings.selBuilding = parseInt(e.key);
                gameSettings.cursorState = "select";
            }

            drawUI.drawControlPanel();
            drawBoard.drawCursorCanvas();
        });
    }

    function clearGameSave(e) {

        if (e.code == "KeyF") {

            // Disable downloading broken save (for now)
            //saveHandler.downloadSave(gameState);
            localStorage.removeItem("regionidle-save");
            location.reload() 
        }
    }

    function controlArrowTier(dir) {

        let pageLength = mathUtils.returnInventoryPageLength();
        if (dir == "left") gameSettings.selTier = mathUtils.clamp(gameSettings.selTier - 1, 0, pageLength);
        else if (dir == "right") gameSettings.selTier = mathUtils.clamp(gameSettings.selTier + 1, 0, pageLength);

        fluffUtils.generateBuildingButtons();
        drawUI.drawBuildingButtons();
        drawUI.drawTileSelectors();
        drawUI.drawTierSelector();
        drawUI.drawInventory();
    }

    // Click-drag board
    this.boardMovable = false;
    function moveGameBoard(element) {
        
        var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
        document.getElementById(element.id).onmousedown = dragMouseDown;
        
        function dragMouseDown(e) {
        
            if (("which" in e && e.which != 3) || ("button" in e && e.button != 2)) return;
            e = e || window.event;
            e.preventDefault();

            pos3 = e.clientX;
            pos4 = e.clientY;

            document.onmouseup = closeDragElement;
            document.onmousemove = elementDrag;
        }

        function elementDrag(e) {
        
            e = e || window.event;
            e.preventDefault();
        
            if (EventListeners.boardMovable) EventListeners.boardMovable = false;
            else return;

            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;

            let rect = gameBoard.getBoundingClientRect();
            let boardWidth = gameState.worldSettings.boardSize;
            let newTop = mathUtils.clamp(
                gameBoard.offsetTop - pos2,
                -rect.height + (rect.height / boardWidth), 
                window.innerHeight - (rect.height / boardWidth)
            );
            let newLeft = mathUtils.clamp(
                gameBoard.offsetLeft - pos1,
                -rect.width + (rect.width / boardWidth), 
                window.innerWidth - (rect.width / boardWidth)
            );
            
            // Move all boards
            boardHolder.style.display = "none";
            for (let i = 0; i < boardCanvi.length; i++) {
            
                boardCanvi[i].style.top =  `${newTop}px`;
                boardCanvi[i].style.left = `${newLeft}px`;
            }
            boardHolder.style.display = "block";
            cacheUtils.cacheBoardRects();
        }
        
        function closeDragElement() {
        
            document.onmouseup = null;
            document.onmousemove = null;
        }
    }

    function mobileMoveBoard(element) {

        var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
        document.getElementById(element.id).ontouchstart = dragMouseDown;

        function dragMouseDown(e) {
        
            pos3 = e.changedTouches[0].pageX;
            pos4 = e.changedTouches[0].pageY;

            document.ontouchend = closeDragElement;
            document.ontouchmove = elementDrag;
        }

        function elementDrag(e) {
        
            if (EventListeners.boardMovable) EventListeners.boardMovable = false;
            else return;

            pos1 = pos3 - e.changedTouches[0].pageX;
            pos2 = pos4 - e.changedTouches[0].pageY;
            pos3 = e.changedTouches[0].pageX;
            pos4 = e.changedTouches[0].pageY;

            let rect = gameBoard.getBoundingClientRect();
            let boardWidth = gameState.worldSettings.boardSize;
            let newTop = mathUtils.clamp(
                gameBoard.offsetTop - pos2,
                -rect.height + (rect.height / boardWidth), 
                window.innerHeight - (rect.height / boardWidth)
            );
            let newLeft = mathUtils.clamp(
                gameBoard.offsetLeft - pos1,
                -rect.width + (rect.width / boardWidth), 
                window.innerWidth - (rect.width / boardWidth)
            );
            
            // Move all boards
            boardHolder.style.display = "none";
            for (let i = 0; i < boardCanvi.length; i++) {
            
                boardCanvi[i].style.top =  `${newTop}px`;
                boardCanvi[i].style.left = `${newLeft}px`;
            }
            boardHolder.style.display = "block";
            cacheUtils.cacheBoardRects();
        }
        
        function closeDragElement() {
        
            document.ontouchend = null;
            document.ontouchmove = null;
        }
    }

    // Click buy building button
    function buyBuilding(button) {
        
        const index = Array.from(button.parentNode.children).indexOf(button);
        if (gameState.returnCanPurchaseBuilding(mathUtils.returnBuildingID(index, gameSettings.selTier), gameSettings.buyQuantity)) {
        
            let buildingId = index + (gameSettings.selTier * 8);
        
            gameState.player.balance -= mathUtils.returnBuildingPrice(buildingId, gameSettings.buyQuantity);
            gameState.player.buildingsOwned[buildingId] += gameSettings.buyQuantity;
        
            // Redraw button
            let newCanvas = new BuildingButton(
                buildingId, 
                gameState.player.buildingsOwned[buildingId],
                gameState.returnCanPurchaseBuilding(buildingId, gameSettings.buyQuantity),
                gameSettings.buyQuantity
            );
            let clickCanvas = buttonList.children.item(index);
            newCanvas.draw(clickCanvas.getContext("2d"));
            
            fluffUtils.playSound("building-buy");
            gameState.updateInventory();

            // Rerender tooltip
            let rect = buttonList.children.item(index).getBoundingClientRect();
            drawContextualUI.drawBuildingTooltip(rect, index);
        }
    }

    // Clear dialog
    function clearAlertCanvas() {

        alertWindow.innerHTML = "";
        alertContainer.style.display = "none";
    }

    return {
        addEventListeners: addEventListeners,
        moveGameBoard: moveGameBoard,
        buyBuilding: buyBuilding,
        addKeyControls: addKeyControls,
        mousePos: mousePos,
        boardMovable: boardMovable,
        clearAlertCanvas: clearAlertCanvas,
        clearGameSave: clearGameSave,
        controlArrowTier: controlArrowTier,
        toggleHintsPanel: toggleHintsPanel,
        mobileMoveBoard: mobileMoveBoard,
        desktopMouseMove: desktopMouseMove,
        mobileMouseMove: mobileMouseMove
    }
}();

// Prevent middle click bug
document.body.onmousedown = function (e) {

    if(e.button == 1) {

        e.preventDefault();
        return false;
    }
}