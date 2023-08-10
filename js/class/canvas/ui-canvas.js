//© 2023 - 2023 www.idleregion.com - All Rights Reserved.

class OutlineText{

    drawText(ctx, size, color, string, x, y, lineWidth, textAlign) {

        ctx.lineJoin = "round";
        ctx.font = `${size}px DM Mono`;
        ctx.strokeStyle = "black";
        ctx.lineWidth = lineWidth;
        ctx.textAlign = textAlign;
        ctx.strokeText(string, x, y);
        ctx.fillStyle = color;
        ctx.fillText(string, x, y);
    }

    drawFancyText(ctx, size, color, string, x, y, lineWidth, textAlign) {

        ctx.lineJoin = "round";
        ctx.font = `${size}px Noto Serif`;
        ctx.strokeStyle = "black";
        ctx.lineWidth = lineWidth;
        ctx.textAlign = textAlign;
        ctx.strokeText(string, x, y);
        ctx.fillStyle = color;
        ctx.fillText(string, x, y);
    }

    measureText(ctx, size, color, string, x, y, lineWidth, textAlign) {

        ctx.lineJoin = "round";
        ctx.font = `${size}px DM Mono`;
        ctx.strokeStyle = "black";
        ctx.lineWidth = lineWidth;
        ctx.textAlign = textAlign;
        return ctx.measureText(string).width;
    }

    drawGradientText(ctx, size, colorArray, string, x, y, lineWidth, textAlign) {

        ctx.lineJoin = "round";
        ctx.font = `${size}px DM Mono`;
        ctx.strokeStyle = "black";
        ctx.lineWidth = lineWidth;
        ctx.textAlign = textAlign;

        let textWidth = ctx.measureText(string).width
        let gradient;
        if (textAlign == "center") {

            gradient = ctx.createLinearGradient(
                x - (textWidth / 2), 0, 
                x + (textWidth / 2), 0
            );
        }
        else {

            gradient = ctx.createLinearGradient(
                x, 0, 
                x + textWidth, 0
            );
        }
        for (let i = 0; i < colorArray.length; i++) {

            let stop = (i / (colorArray.length - 1));
            gradient.addColorStop(stop, colorArray[i]);
        }
        ctx.strokeText(string, x, y);
        ctx.fillStyle = gradient;
        ctx.fillText(string, x, y);
    }

    drawWrapText(ctx, size, color, string, x, y, lineWidth, textAlign, maxWidth, breakHeight) {

        ctx.lineJoin = "round";
        ctx.font = `${size}px DM Mono`;
        ctx.strokeStyle = "black";
        ctx.lineWidth = lineWidth;
        ctx.textAlign = textAlign;

        let words = string.split(" ");
        let lines = [];
        let currentLine = words[0];

        let len = words.length;
        for (let i = 1; i < len; i++) {

            let word = words[i];
            let width = ctx.measureText(currentLine + " " + word).width;
            if (width < maxWidth) {

                currentLine += " " + word;
            }
            else {

                lines.push(currentLine);
                currentLine = word;
            }
        }
        lines.push(currentLine);

        len = lines.length;
        for (let i = 0; i < len; i++) {

            ctx.strokeText(lines[i], x, y + (i * breakHeight));
            ctx.fillStyle = color;
            ctx.fillText(lines[i], x, y + (i * breakHeight));
        }
    }

    drawLine(ctx, x1, y1, x2, y2, color, width) {

        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = color;
        ctx.lineWidth = width;
        ctx.stroke();
        ctx.closePath();
    }
}

class NumberHelper{
    
    /**
     * @param number Length of number (in triple 0's)
     * @returns Compound shortened number denominator
     */
    #returnNumberDenom(length) {

        if (length < 10) return NUMBER_DENOMS_SUBPREFIX[length];
        else return `${NUMBER_DENOMS_PREFIX[length % 10]}${NUMBER_DENOMS_SUFFIX[Math.floor(length / 10)]}`;
    }

    /**
     * @param number Round number
     * @returns Number formatted to #.## + denominator
     */
    returnShortHandNumber(number) {

        let numString = number.toString();
        let leading = numString.length % 3;

        if (numString.length <= 3) return number;
        else {

            if (leading == 0) {

                let denom = this.#returnNumberDenom(Math.floor(numString.length / 3) - 2);
                return `${numString.substring(0, 3)}${denom}`;
            }
            else {

                let denom = this.#returnNumberDenom(Math.floor(numString.length / 3) - 1);
                return (`${numString.substring(0, leading)}.${numString.substring(leading, 3)}${denom}`);
            }
        }
    }

    /**
     * @param number Round number
     * @returns Number formatted to ###.### + denominator
     */
    returnLongHandNumber(number) {

        let numString = number.toString();
        if (numString.includes(".")) numString = numString.split(".")[0];

        let leading = ((numString.length + 2) % 3) + 1;
        if (numString.length <= 6) return number;
        else {

            let denom = this.#returnNumberDenom(Math.floor((numString.length - 1) / 3) - 1);
            return (`${numString.substring(0, leading)}.${numString.substring(leading, leading + 3)}${denom}`);
        }
    }
}

class RegionNameCanvas{
    constructor(regionName) {

        this.regionName = regionName;
    }

    #setCanvasSize(canvas) {

        canvas.width = 256;
        canvas.height = 48;
    }

    #drawBackground(canvas, ctx) {

        ctx.drawImage(
            UI_NAME_HOLDER,
            0, 0,
            canvas.width, canvas.height
        );
    }

    #drawRegionName(canvas, ctx) {

        let outlineText = new OutlineText();
        let fontSize = Math.min((230 / this.regionName.length) * 1.5, 26);
        outlineText.drawText(ctx, fontSize, "white", cnItem(this.regionName), (canvas.width / 2), 32, 4, "center");
    }

    draw(canvas, ctx) {

        this.#setCanvasSize(canvas);
        this.#drawBackground(canvas, ctx);
        this.#drawRegionName(canvas, ctx);
    }
}

class ScoreCanvas{
    constructor(canvas, ctx, balance, earnings, population) {

        this.balance = balance;
        this.earnings = earnings;
        this.population = population;

        this.lastBalance;
        this.lastEarnings;
        this.lastPopulation;

        this.outlineText = new OutlineText();
        this.numberHelper = new NumberHelper();

        this.#setCanvasSize(canvas);
        this.#drawBackground(ctx);
    }

    #setCanvasSize(canvas) {

        canvas.width = 256;
        canvas.height = 120;
    }

    #drawBackground(ctx) {

        ctx.drawImage(
            UI_SCORE_HOLDER,
            0, 0,
            ctx.canvas.width, ctx.canvas.height
        );
    }

    #drawScore(ctx) {

        let balance = Math.floor(this.balance);
        balance = balance.toLocaleString("fullwide", {useGrouping: false});
        balance = this.numberHelper.returnLongHandNumber(balance);

        let earnings = Math.round((this.earnings + Number.EPSILON) * 100) / 100;
        earnings = earnings.toLocaleString("fullwide", {useGrouping: false});
        earnings = this.numberHelper.returnLongHandNumber(earnings);

        let population = this.numberHelper.returnLongHandNumber(this.population);

        if (balance != this.lastBalance) {

            ctx.clearRect(0, 0, 256, 40);
            ctx.drawImage(UI_SCORE_HOLDER, 0, 0, 256, 40, 0, 0, 272, 40);
            this.outlineText.drawText(
                ctx, 20, 
                "white",
                `$${balance}`,
                14, 31,
                4, "left"
            );
        }

        if (earnings != this.lastEarnings) {

            ctx.clearRect(0, 40, 256, 40);
            ctx.drawImage(UI_SCORE_HOLDER, 0, 40, 256, 40, 0, 40, 272, 40);
            this.outlineText.drawText(
                ctx, 20, 
                "white",
                `$${earnings}/秒`,
                14, 68,
                4, "left"
            );
        }
        
        if (population != this.lastPopulation) {

            ctx.clearRect(0, 80, 256, 40);
            ctx.drawImage(UI_SCORE_HOLDER, 0, 80, 256, 40, 0, 80, 272, 40);
            this.outlineText.drawText(ctx, 20, 
                "white",
                `人口: ${population}`,
                14, 104,
                4, "left"
            );
        }

        this.lastBalance = balance;
        this.lastEarnings = earnings;
        this.lastPopulation = population;
    }

    draw(canvas, ctx, balance, earnings, population) {

        if (balance !== undefined) {

            this.balance = balance;
            this.earnings = earnings;
            this.population = population;
        }

        this.#drawScore(ctx);
    }
}

class RockCanvas{
    constructor(buttonState, clicks) {

        this.buttonState = buttonState;
        this.clicks = clicks;
    }

    #setCanvasSize(canvas) {

        canvas.width = 256;
        canvas.height = 176;
    }

    #drawBackground(canvas, ctx) {

        ctx.drawImage(
            UI_ROCK_HOLDER,
            0, 0,
            canvas.width, canvas.height
        );
    }

    #drawButton(ctx) {

        ctx.drawImage(
            UI_ROCK_BREAK,
            this.buttonState * 128, 0,
            128, 128,
            50, 5,
            156, 156
        );
        if (this.clicks > 0) return;
        let outlineText = new OutlineText();
        outlineText.drawText(ctx, 36, "white", "点我!", ctx.canvas.width / 2, (ctx.canvas.height / 2) + 6, 4, "center");
    }

    draw(canvas, ctx) {

        this.#setCanvasSize(canvas);
        this.#drawBackground(canvas, ctx);
        this.#drawButton(ctx);
    }
}

class PowerupCanvas{
    constructor(effects) {

        this.effects = effects;
        this.iconSize = 64;
    }

    #setCanvasSize(canvas) {

        canvas.width = 256;
        canvas.height = this.iconSize * Math.ceil(this.effects.length / 4);
    }

    #drawEffects(canvas, ctx) {

        let width = Math.min(this.effects.length, 4) * this.iconSize;
        let height = Math.ceil(this.effects.length / 4) * this.iconSize;

        let osc = new OffscreenCanvas(width, height);
        let oscCtx = osc.getContext("2d");

        let outlineText = new OutlineText();

        for (let i = 0; i < this.effects.length; i++) {

            let effect = this.effects[i];
            let seedX = effect.spriteIndex * this.iconSize;

            let posX = (i % 4) * this.iconSize;
            let posY = Math.floor(i / 4) * this.iconSize;

            oscCtx.drawImage(
                UI_POWERUP_SPRITES,
                seedX, 0, this.iconSize, this.iconSize,
                posX, posY, this.iconSize, this.iconSize
            );

            let timeLeft = Math.ceil(effect.lifetime);
            outlineText.drawText(oscCtx, 32, "white", timeLeft, posX + (0.5 * this.iconSize), posY + 44, 4, "center");
        }
        ctx.drawImage(
            osc,
            (canvas.width / 2) - (osc.width / 2), 0,
            osc.width, osc.height
        );
    }
    draw(canvas, ctx) {

        this.#setCanvasSize(canvas);
        this.#drawEffects(canvas, ctx);
    }
}

class BuildingButton{
    constructor(buildingId, playerOwned, canAfford, quantity) {

        this.playerOwned = playerOwned;             // Building-this owned by player
        this.buildingId = buildingId;               // ID of building
        this.building = BUILDING_DATA[buildingId];  // Data of building
        this.canAfford = canAfford;
        this.quantity = quantity;
    }

    #setCanvasSize(ctx) {

        ctx.canvas.width = 240;
        ctx.canvas.height = 80;
    }

    //#region Get text style
    #returnColorArrayOfBuildingType(effect) {

        let colors = [];
        if (effect.populationBonus != 0) colors.push(COLOR_POPULATION);
        if (effect.boostBonus != 0) colors.push(COLOR_BOOST);
        if (colors.length == 0) colors.push(COLOR_PRODUCTION);
        return colors;
    }

    #returnColorOfBuildingType(effect) {

        if (effect.populationBonus == Math.max(effect.boostBonus / 100, effect.populationBonus)) return "#4ff065";
        else if ((effect.boostBonus / 100) == Math.max(effect.boostBonus / 100, effect.populationBonus)) return "#4f8ff0";
        else return COLOR_PRODUCTION;
    }
    //#endregion

    #drawBackground(ctx) {

        ctx.drawImage(
            UI_BUILDING_BUTTON,
            0, 0,
            240, 80
        );
    }

    #drawSprite(ctx) {

        let posX = (this.buildingId % 8) * TILE_PIXEL_SIZE;
        let posY = Math.floor(this.buildingId / 8) * TILE_PIXEL_SIZE;

        ctx.globalAlpha = 0.33;
        ctx.fillStyle = this.#returnColorOfBuildingType(this.building.effect);
        ctx.fillRect(
            6, 6,
            32, 32
        );
        ctx.globalAlpha = 0.66;
        ctx.fillRect(
            8, 8,
            28, 28
        );
        ctx.globalAlpha = 1;
        //#endregion

        ctx.drawImage(
            UI_BUILDING_BUTTON_ICONS,
            posX, posY,
            TILE_PIXEL_SIZE, TILE_PIXEL_SIZE,
            6, 6,
            TILE_PIXEL_SIZE, TILE_PIXEL_SIZE 
        );
    }

    #writeInfo(ctx) {

        let numberHelper = new NumberHelper();
        let outlineText = new OutlineText();

        //let curQuantity = ;

        //#region Building info
        let name = this.building.building_name;
        let price = mathUtils.returnBuildingPrice(this.buildingId, this.quantity);
        let owned = this.playerOwned;

        price = price.toLocaleString("fullwide", {useGrouping: false});
        price = numberHelper.returnShortHandNumber(price);
        //#endregion

        //#region Name
        let textColor = this.#returnColorArrayOfBuildingType(this.building.effect);
        if (textColor.length > 1) {

            outlineText.drawGradientText(
                ctx, 24, 
                textColor,
                cnItem(name),
                48, 32,
                4, "left"
            );
        }
        else {

            outlineText.drawText(
                ctx, 24, 
                textColor,
                cnItem(name),
                48, 32,
                4, "left"
            );
        }
        //#endregion

        //#region Price, Owned
        let priceColor
        if (this.canAfford ? priceColor = "white" : priceColor = "red");
        outlineText.drawText(ctx, 20, 
            priceColor,
            `$${price}`,
            10, 65,
            4, "left"
        );
        outlineText.drawText(ctx, 20, 
            "white",
            `拥有: ${owned}`,
            104, 65,
            4, "left"
        );
        //#endregion

    }

    #drawGreyout(ctx) {

        ctx.fillStyle = "rgba(0, 0, 0, 0.33)";
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    }

    draw(ctx) {

        this.#setCanvasSize(ctx);
        this.#drawBackground(ctx);
        this.#drawSprite(ctx);
        this.#writeInfo(ctx);
        if (!this.canAfford) this.#drawGreyout(ctx);
    }
}

class Inventory{
    constructor(ctx, inventory, balance, settings, placeType, edictCache, hasPlacedFirst) {

        this.slotSize = 80;
        this.itemSize = 64;

        this.inventory = inventory;
        this.balance = balance;

        this.tier = settings.selTier;
        this.selecting = (settings.cursorState == "select");
        this.selBuilding = settings.selBuilding;
        this.placeType = placeType;

        this.hasPlacedFirst = hasPlacedFirst;

        this.invRect;
        this.lastInventory = new Array(inventory.length).fill(-1);
        this.hoverCache = new Array(8).fill(0);
        this.pathAffordCache = new Array(8).fill(false);
        this.sceneryAffordCache = new Array(SCENERY_DATA.length).fill(false);
        this.lastPlaceType;
        this.lastTier;

        this.edictCache = edictCache;
        
        this.#setCanvasSize(ctx);
    }

    #setCanvasSize(ctx) {
        
        ctx.canvas.width = this.slotSize * 4;
        ctx.canvas.height = this.slotSize * 2;
    }

    //#region Find cursor
    #getRealRect() {

        let realRect = COMPSTYLE_INVENTORYPANEL;
        let fakeRect = RECT_INVENTORYPANEL;

        return {
            left: fakeRect.left + parseFloat(realRect.paddingLeft),
            right: fakeRect.right - parseFloat(realRect.paddingRight),
            top: fakeRect.top + parseFloat(realRect.paddingTop),
            bottom: fakeRect.bottom - parseFloat(realRect.paddingBottom),
            width: fakeRect.width - (parseFloat(realRect.paddingLeft) + parseFloat(realRect.paddingRight)),
            height: fakeRect.height - (parseFloat(realRect.paddingTop) + parseFloat(realRect.paddingBottom))
        }
    }

    #boardLocationFromCursor() {

        let realTileSize = this.invRect.width / 4;
        return {
            x: Math.floor((EventListeners.mousePos.x - this.invRect.left) / realTileSize), 
            y: Math.floor((EventListeners.mousePos.y - this.invRect.top) / realTileSize)};
    }

    #returnMouseInCanvas() {

        if (EventListeners.mousePos.y == 0) return false;
        if ((EventListeners.mousePos.x >= this.invRect.left && EventListeners.mousePos.x <= this.invRect.right) &&
             EventListeners.mousePos.y >= this.invRect.top && EventListeners.mousePos.y <= this.invRect.bottom) return true;
        else return false;
    }

    #findHoveredItem(selectedPos) {
        
        return selectedPos.x + (selectedPos.y * 4);
    }
    //#endregion

    #drawInventoryItems(canvas, ctx) {

        let invSprite;
        if (this.placeType == "building") invSprite = BUILDING_ICONS;
        else if (this.placeType == "path") invSprite = PATH_ICONS;
        else if (this.placeType == "scenery") invSprite = SCENERY_ICONS;

        let selectedPos = this.#boardLocationFromCursor();
        selectedPos.x = mathUtils.clamp(selectedPos.x, 0, 3);
        selectedPos.y = mathUtils.clamp(selectedPos.y, 0, 1);

        let selectedItem = this.#findHoveredItem(selectedPos);
        let mouseInCanvas = this.#returnMouseInCanvas();

        let sizeDiff = (this.slotSize - this.itemSize) / 2;
        let tierOffset = this.tier * 192;

        let pathAfford = new Array(8).fill(false);
        for (let i = 0; i < this.edictCache.affectedPathResources.length; i++) {

            if (this.balance >= this.edictCache.affectedPathResources[i].price) pathAfford[i] = true;
        }

        let sceneryAfford = new Array(SCENERY_DATA.length).fill(false);
        for (let i = 0; i < SCENERY_DATA.length; i++) {

            if (this.balance >= SCENERY_DATA[i].price) sceneryAfford[i] = true;
        }

        let outlineText = new OutlineText();
        let numberHelper = new NumberHelper();

        if (mouseInCanvas) {
            
            if ((selectedPos.y < 2 && selectedPos.y >= 0) &&
                (selectedPos.x < 4 && selectedPos.x >= 0)) drawContextualUI.drawInventoryTooltip(selectedItem);
        }

        for (let i = 0; i < 8; i++) {
            
            let hovered = 0;
            if (mouseInCanvas && selectedItem == i) hovered = this.itemSize;
            if (this.selBuilding - 1 == i) hovered = this.itemSize * 2;

            let sourceX = this.itemSize * i;
            let sourceY = hovered;
            let drawX = (i % 4) * this.slotSize + sizeDiff;
            let drawY = sizeDiff + (this.slotSize * Math.floor(i / 4));

            let inventorySlot = i + (this.tier * 8);
            if (this.placeType == "building") {

                if (this.inventory[inventorySlot] != this.lastInventory[inventorySlot] ||
                    hovered != this.hoverCache[i] ||
                    this.lastPlaceType != this.placeType ||
                    this.lastTier == this.tier) {

                    ctx.drawImage(
                        INVENTORY_SLOT,
                        (i % 4) * this.slotSize, Math.floor(i / 4) * this.slotSize,
                        this.slotSize, this.slotSize
                    );
        
                    ctx.drawImage(
                        invSprite,                
                        sourceX, sourceY + tierOffset,
                        this.itemSize, this.itemSize,
                        drawX, drawY,
                        this.itemSize, this.itemSize
                    );

                    let countColor = (this.inventory[(this.tier * 8) + i] == 0) ? "gray" : "white";
                    outlineText.drawText(ctx, 22, countColor, this.inventory[inventorySlot], drawX + 64, drawY + 64, 4, "right");
                }
            }
            else if (this.placeType == "path") {

                if (pathAfford[i] != this.pathAffordCache[i] ||
                    hovered != this.hoverCache[i] ||
                    this.lastPlaceType != this.placeType) {

                    ctx.drawImage(
                        INVENTORY_SLOT,
                        (i % 4) * this.slotSize, Math.floor(i / 4) * this.slotSize,
                        this.slotSize, this.slotSize
                    );
            
                    ctx.drawImage(
                        invSprite,                
                        sourceX, sourceY + tierOffset,
                        this.itemSize, this.itemSize,
                        drawX, drawY,
                        this.itemSize, this.itemSize
                    );
                        
                    let pathCost = this.edictCache.affectedPathResources[i].price;
                    let costColor = (pathCost < this.balance) ? "white" : "red";
                    let costString = pathCost.toLocaleString("fullwide", {useGrouping: false});
                    costString = numberHelper.returnShortHandNumber(costString);
                    outlineText.drawText(ctx, 18, costColor, `$${costString}`, drawX + 64, drawY + 64, 3, "right");
                }
            }
            else if (this.placeType == "scenery") {

                if (sceneryAfford[i] != this.sceneryAffordCache[i] ||
                    hovered != this.hoverCache[i] ||
                    this.lastPlaceType != this.placeType ||
                    this.lastTier == this.tier) {

                    ctx.drawImage(
                        INVENTORY_SLOT,
                        (i % 4) * this.slotSize, Math.floor(i / 4) * this.slotSize,
                        this.slotSize, this.slotSize
                    );

                    ctx.drawImage(
                        invSprite,                
                        sourceX, sourceY + tierOffset,
                        this.itemSize, this.itemSize,
                        drawX, drawY,
                        this.itemSize, this.itemSize
                    );

                    let sceneryCost = SCENERY_DATA[i + (this.tier * 8)].price;
                    let costColor = (sceneryCost < this.balance) ? "white" : "red";
                    let costString = sceneryCost.toLocaleString("fullwide", {useGrouping: false});
                    costString = numberHelper.returnShortHandNumber(costString);
                    outlineText.drawText(ctx, 18, costColor, `$${costString}`, drawX + 64, drawY + 64, 3, "right");
                }
            }
            this.hoverCache[i] = hovered;
        }
        this.lastInventory = this.inventory;
        this.lastPlaceType = this.placeType;
        this.lastTier = this.tier;
        this.pathAffordCache = pathAfford;
    }

    #drawHintText(ctx) {

        if (this.tier != 0 || this.placeType != "building") return;

        let outlineText = new OutlineText();
        outlineText.drawWrapText(ctx, 24, "white", "把我放地图上!", ((this.slotSize - this.itemSize) / 2) + 32, 36, 4, "center", 64, 24);
    }

    draw (canvas, ctx, inventory, balance, settings, placeType, edictCache, hasPlacedFirst) {
        
        if (inventory !== undefined) {

            this.slotSize = 80;
            this.itemSize = 64;

            this.inventory = inventory;
            this.balance = balance;

            this.tier = settings.selTier;
            this.selecting = (settings.cursorState == "select");
            this.selBuilding = settings.selBuilding;
            this.placeType = placeType;

            this.hasPlacedFirst = hasPlacedFirst;
            this.edictCache = edictCache;

            this.invRect;
        }

        this.invRect = this.#getRealRect();
        this.#drawInventoryItems(canvas, ctx);
        if (this.hasPlacedFirst) this.#drawHintText(ctx);
    }
}

class ControlPanel{
    constructor(settings) {

        this.settings = settings;

        this.slotSize = 80;
        this.itemSize = 64;
    }

    #setCanvasSize(canvas) {

        canvas.width = this.slotSize * 6;
        canvas.height = this.slotSize;
    }

    #drawSlots(ctx) {

        for (let i = 0; i < 6; i++) {

            ctx.drawImage(
                CONTROL_SLOT,
                0, 0, 
                this.slotSize, this.slotSize,
                i * this.slotSize, 0,
                this.slotSize, this.slotSize
            );
        }
    }

    #drawItems(ctx) {

        let outlineText = new OutlineText();
        let offset = (this.slotSize - this.itemSize) / 2

        let controlArray = ["Q", "W", "E", "R", "Z", "X"];
        let settingArray = [
            this.settings.showGrid,
            this.settings.showBuff,
            true,
            true,
            this.settings.cursorState == "inspect",
            this.settings.cursorState == "delete"
        ];

        for (let i = 0; i < 6; i++) {

            let srcY = settingArray[i] ? 64 : 0;
            ctx.drawImage(
                CONTROL_ICONS,
                i * this.itemSize, srcY,
                this.itemSize, this.itemSize,
                (this.slotSize * i) + offset, offset,
                this.itemSize, this.itemSize
            );
            outlineText.drawText(ctx, 24, "white", controlArray[i], (this.slotSize * i) + offset, 20, 4, "left");
        }
    }

    draw(canvas, ctx, settings) {

        if (settings !== undefined) {

            this.settings = settings;
        }

        this.#setCanvasSize(canvas);
        this.#drawSlots(ctx);
        this.#drawItems(ctx);
    }
}

class HelpControlPanel{
    constructor() {

        this.slotSize = 80;
        this.iconSize = 64;
    }

    #setCanvasSize(canvas) {

        canvas.width = this.slotSize;
        canvas.height = this.slotSize * 4;
    }

    #drawPanel(ctx) {

        let outlineText = new OutlineText();
        let hotkeys = ["H", "O", "S", "A"];

        let padding = (this.slotSize - this.iconSize) / 2;
        for (let i = 0; i < 4; i++) {

            ctx.drawImage(
                INVENTORY_SLOT,
                0, 0,
                this.slotSize, this.slotSize,
                0, this.slotSize * i,
                this.slotSize, this.slotSize
            );

            ctx.drawImage(
                HELP_ICONS,
                i * this.iconSize, 0,
                this.iconSize, this.iconSize,
                padding, (this.slotSize * i) + padding,
                this.iconSize, this.iconSize
            );

            outlineText.drawText(ctx, 16, "white", hotkeys[i], 10, 20 + (i * this.slotSize), 4, "left");
        }
    }
    draw (canvas, ctx) {

        this.#setCanvasSize(canvas);
        this.#drawPanel(ctx);
    }
}

class GameHelpPanel{
    
    #setCanvasSize(canvas) {

        canvas.width = 400;
        canvas.height = 2400;
    }

    #drawHelpPanel(canvas, ctx) {

        let outlineText = new OutlineText();
        let startY = 64;

        outlineText.drawText(ctx, 30, "white", "游戏帮助", (canvas.width / 2), 25, 4, "center");
        outlineText.drawLine(ctx, 0, 36, canvas.width, 36, "white", 4);

        for (let i = 0; i < HELP_STRINGS.length; i++) {

            if (i != 0) {

                outlineText.drawLine(ctx, 0, startY, canvas.width, startY, "white", 1);
                startY += 25;
            }
            outlineText.drawWrapText(ctx, 16, "gold", cnItem(HELP_STRINGS[i].title), (canvas.width / 2), startY, 4, "center", canvas.width, 20);
            startY += 15;
            outlineText.drawLine(ctx, 0, startY, canvas.width, startY, "white", 1);
            startY += 25;

            for (let j = 0; j < HELP_STRINGS[i].strings.length; j++) {

                let stringLength = outlineText.measureText(ctx, 14, "white", cnItem(HELP_STRINGS[i].strings[j]), 0, startY, 4, "left");
                
                if (stringLength >= canvas.width - 15) {

                    outlineText.drawWrapText(ctx, 14, "white", cnItem(HELP_STRINGS[i].strings[j]), 0, startY, 4, "left", canvas.width - 15, 20);

                    let lineInc = Math.ceil(stringLength / (canvas.width - 15)) * 25;
                    startY += lineInc;
                }
                else {

                    outlineText.drawText(ctx, 14, "white", cnItem(HELP_STRINGS[i].strings[j]), 0, startY, 4, "left");
                    startY += 25;
                }
            }
        }

        outlineText.drawText(ctx, 14, "white", "点击菜单返回游戏", canvas.width, canvas.height - 3, 4, "right");
    }

    draw(canvas, ctx) {

        this.#setCanvasSize(canvas);
        this.#drawHelpPanel(canvas, ctx);
    }
}

class GameStatsPanel{
    constructor(player, board, world, stats, edicts) {

        this.player = player;
        this.board = board;
        this.world = world;
        this.stats = stats;
        this.edicts = edicts;
    }

    #setCanvasSize(canvas) {

        canvas.width = 400;
        canvas.height = 600;
    }

    #drawCanvas(canvas, ctx) {

        let outlineText = new OutlineText();
        let numberHelper = new NumberHelper();

        outlineText.drawText(ctx, 30, "white", "游戏统计", (canvas.width / 2), 25, 4, "center");
        outlineText.drawLine(ctx, 0, 36, canvas.width, 36, "white", 4);

        //#region Date started (x time ago)
        let dateStarted = new Date(this.player.dateCreated).toDateString();
        let timeAgo = ((Date.now() - this.player.dateCreated) / 1000);
        let timeAgoDenom = "";
        if (timeAgo >= 86400) {

            timeAgo /= 86400;
            timeAgoDenom = "Days";
        }
        else if (timeAgo >= 3600) {

            timeAgo /= 3600;
            timeAgoDenom = "Hours";
        }
        else if (timeAgo >= 60) {

            timeAgo /= 60;
            timeAgoDenom = "Minutes";
        }
        else timeAgoDenom = "Seconds";
        timeAgo = Math.round((timeAgo + Number.EPSILON) * 100) / 100;
        //#endregion

        //#region Play time
        let timePlayed = this.stats.playTime;
        let timePlayedDenom = "";
        if (timePlayed >= 86400) {

            timePlayed /= 86400;
            timePlayedDenom = "Days";
        }
        else if (timePlayed >= 3600) {

            timePlayed /= 3600;
            timePlayedDenom = "Hours";
        }
        else if (timePlayed >= 60) {

            timePlayed /= 60;
            timePlayedDenom = "Minutes";
        }
        else timePlayedDenom = "Seconds";
        timePlayed = Math.round((timePlayed + Number.EPSILON) * 100) / 100;
        //#endregion

        // In-game days
        let ingameTime = ((Date.now() - this.player.dateCreated) / 1000) / (this.world.dayLength);
        ingameTime = Math.round((ingameTime + Number.EPSILON) * 100) / 100;

        //#region Other stats
        let buildingsPlaced = 0;
        for (let i = 0; i < this.board.buildingsPlaced.length; i++) buildingsPlaced += this.board.buildingsPlaced[i];

        let pathsPlaced = 0;
        for (let i = 0; i < this.board.pathsPlaced.length; i++) pathsPlaced += this.board.pathsPlaced[i];

        let sceneryPlaced = 0;
        for (let i = 0; i < this.board.sceneryPlaced.length; i++) sceneryPlaced += this.board.sceneryPlaced[i];

        let rockEarnings = numberHelper.returnLongHandNumber(Math.floor(this.stats.rockEarnings).toLocaleString("fullwide", {useGrouping: false}));
        let totalEarnings = numberHelper.returnLongHandNumber(Math.floor(this.stats.totalEarnings.toLocaleString("fullwide", {useGrouping: false})));

        let maxBoost = this.stats.highestBoost;
        let edictsPurchased = Object.keys(this.edicts.edictKeys).length;
        //#endregion

        let startY = 64;
        let incY = 20;

        //#region Write stats
        outlineText.drawText(ctx, 14, "white", `区域: ${this.player.name}`, 10, startY, 4, "left");                               startY += incY;
        outlineText.drawText(ctx, 14, "white", `成立: ${dateStarted} (${timeAgo} ${timeAgoDenom} ago)`, 10, startY, 4, "left");  startY += incY;
        outlineText.drawText(ctx, 14, "white", `游戏时长: ${timePlayed} ${timePlayedDenom}`, 10, startY, 4, "left");                startY += incY;
        outlineText.drawText(ctx, 14, "white", `游戏中过去的天数: ${ingameTime}`, 10, startY, 4, "left");                         startY += incY * 2;

        outlineText.drawText(ctx, 14, "white", `放置的建筑: ${buildingsPlaced}`, 10, startY, 4, "left");                      startY += incY;
        outlineText.drawText(ctx, 14, "white", `放置的道路: ${pathsPlaced}`, 10, startY, 4, "left");                              startY += incY;
        outlineText.drawText(ctx, 14, "white", `放置的景色: ${sceneryPlaced}`, 10, startY, 4, "left");                        startY += incY;
        outlineText.drawText(ctx, 14, "white", `最高提升地块: ${maxBoost}%`, 10, startY, 4, "left");                        startY += incY;
        outlineText.drawText(ctx, 14, "white", `购买的法令: ${edictsPurchased}`, 10, startY, 4, "left");                        startY += incY * 2;

        outlineText.drawText(ctx, 14, "white", `点击石头的次数: ${this.stats.rockClicks}`, 10, startY, 4, "left");              startY += incY;
        outlineText.drawText(ctx, 14, "white", `石头点击收益: $${rockEarnings}`, 10, startY, 4, "left");                     startY += incY;
        outlineText.drawText(ctx, 14, "white", `总计获得的区域: $${totalEarnings}`, 10, startY, 4, "left");                  startY += incY * 2;

        outlineText.drawText(ctx, 14, "white", `收获的陨石: ${this.stats.meteorClicks}`, 10, startY, 4, "left");          startY += incY * 2;

        outlineText.drawText(ctx, 14, "white", `地图种子: ${this.world.worldSeed}`, 10, startY, 4, "left");                         startY += incY;

        outlineText.drawText(ctx, 14, "white", "点击菜单返回游戏", canvas.width, canvas.height - 3, 4, "right");
        //#endregion
    }

    draw(canvas, ctx) {

        this.#setCanvasSize(canvas);
        this.#drawCanvas(canvas, ctx);
    }
}

class AchievementPanel{

    constructor(unlocked, total) {

        this.unlocked = unlocked;
        this.total = total;
    }

    #setCanvasSize(canvas) {

        canvas.width = 400;
        canvas.height = 600;
    }

    #drawText(canvas, ctx) {

        let outlineText = new OutlineText();
        outlineText.drawText(ctx, 30, "white", `成就 (${this.unlocked}/${this.total})`, (canvas.width / 2), 25, 4, "center");
        outlineText.drawLine(ctx, 0, 36, canvas.width, 36, "white", 4);

        outlineText.drawLine(ctx, 0, canvas.height - 37, canvas.width, canvas.height - 37, "white", 4);
        outlineText.drawText(ctx, 14, "white", "点击菜单返回游戏", canvas.width, canvas.height - 10, 4, "right");
    }

    draw(canvas, ctx) {

        this.#setCanvasSize(canvas);
        this.#drawText(canvas, ctx);
    }
}

class ToolTip{

    constructor(tooltipData) {

        this.tooltipData = tooltipData;
    }

    #setCanvasSize(canvas) {

        canvas.width = 300;
        
        if (this.tooltipData.hasOwnProperty("cost")) canvas.height = 75;
        else canvas.height = 50;
    }

    #drawText(canvas, ctx) {

        let outlineText = new OutlineText();

        let textWidth = outlineText.measureText(ctx, 16, "white", cnItem(this.tooltipData.description), canvas.width / 2, 45, 4, "center");
        let titleWidth = outlineText.measureText(ctx, 20, "gold", cnItem(this.tooltipData.name), canvas.width / 2, 16, 4, "center");
        let newWidth = Math.max(textWidth, titleWidth);

        let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        canvas.width = Math.max((newWidth + 10), 240);
        ctx.putImageData(imageData, 0, 0);

        outlineText.drawText(ctx, 20, "gold", cnItem(this.tooltipData.name), canvas.width / 2, 16, 4, "center");
        outlineText.drawLine(ctx, 0, 23, canvas.width, 23, "white", 2);
        outlineText.drawText(ctx, 16, "white", cnItem(this.tooltipData.description), canvas.width / 2, 45, 4, "center");

        if (this.tooltipData.hasOwnProperty("cost")) {

            let numberHelper = new NumberHelper();
            let cost = Math.round((this.tooltipData.cost + Number.EPSILON) * 100) / 100;
            cost = cost.toLocaleString("fullwide", {useGrouping: false});
            cost = numberHelper.returnLongHandNumber(cost);

            outlineText.drawText(ctx, 16, "white", `成本: $${cost}`, canvas.width / 2, 70, 4, "center");
        }
    }

    draw(canvas, ctx) {

        this.#setCanvasSize(canvas);
        this.#drawText(canvas, ctx);
    }
}

class GameSettingsPanel{
    
    #setCanvasSize(canvas) {

        canvas.width = 400;
        canvas.height = 500;
    }

    #drawSettingsPanel(canvas, ctx, page) {

        let outlineText = new OutlineText();
        
        let settingsData;
        if (page == "game") settingsData = SETTINGS_STRINGS[0];
        else if (page == "graphics") settingsData = SETTINGS_STRINGS[1];
        else if (page == "audio") settingsData = SETTINGS_STRINGS[2];
        else if (page == "social") settingsData = SETTINGS_STRINGS[3];

        outlineText.drawText(ctx, 30, "white", cnItem(settingsData.title), (canvas.width / 2), 25, 4, "center");
        outlineText.drawLine(ctx, 0, 36, canvas.width, 36, "white", 4);

        let startY = 72;
        let incY = (page == "audio") ? 64 : 40;

        for (let i = 0; i < settingsData.strings.length; i++) {

            if (settingsData.strings[i] == "sep-line") {

                startY += 10;
                outlineText.drawLine(ctx, 0, startY, canvas.width, startY, "white", 3);
                startY += incY;
                continue;
            }
            outlineText.drawText(ctx, 16, "white", cnItem(settingsData.strings[i]), 40, startY, 4, "left");
            startY += incY;
        }
    }

    draw(canvas, ctx, page) {

        this.#setCanvasSize(canvas);
        this.#drawSettingsPanel(canvas, ctx, page);
    }
}

class EdictButton{
    constructor(canvas, ctx) {

        this.canvas = canvas;
        this.ctx = ctx;

        this.#setCanvasSize();
        this.#drawImage();
        this.#drawText();
    }

    #setCanvasSize() {

        this.canvas.width = 240;
        this.canvas.height = 40;
    }

    #drawImage() {

        this.ctx.drawImage(
            EDICT_BUTTON,
            0, 0, this.canvas.width, this.canvas.height
        )
    }

    #drawText() {

        let outlineText = new OutlineText();
        outlineText.drawText(this.ctx, 28, "white", "查看法令", 120, 30, 4, "center");
    }
}

class TierSelector{
    constructor(tier) {
        
        this.tier = tier;
    }

    #setCanvasSize(ctx) {

        ctx.canvas.width = 240;
        ctx.canvas.height = 40;
    }

    #drawUI(canvas, ctx) {

        ctx.drawImage(
            UI_TIER_SELECT,
            0, 0, 192, 32,
            0, 0, canvas.width, canvas.height
        )
    }

    #drawText(ctx) {

        let outlineText = new OutlineText();
        let tierString = `Tier: ${this.tier + 1}`;
        outlineText.drawText(ctx, 26, "LightGreen", cnItem(tierString), ctx.canvas.width / 2, 28, 4, "center");
    }

    draw(canvas, ctx) {

        this.#setCanvasSize(ctx);
        this.#drawUI(canvas, ctx);
        this.#drawText(ctx);
    }
}

class BuyQuantity{
    constructor(quantity) {

        this.quantity = quantity;
    }

    #setCanvasSize(canvas) {

        canvas.width = 240;
        canvas.height = 40;
    }

    #drawButtons(ctx) {

        let oneY   = (this.quantity == 1)  ? 32 : 0;
        let fiveY  = (this.quantity == 5)  ? 32 : 0;
        let fiftyY = (this.quantity == 50) ? 32 : 0;

        ctx.drawImage(
            UI_BUY_QUANTITY,
            0, oneY,
            64, 32,
            0, 0,
            80, 40
        );
        ctx.drawImage(
            UI_BUY_QUANTITY,
            64, fiveY,
            64, 32,
            80, 0,
            80, 40
        );
        ctx.drawImage(
            UI_BUY_QUANTITY,
            128, fiftyY,
            64, 32,
            160, 0,
            80, 40
        );
    }

    #drawText(ctx) {

        let outlineText = new OutlineText();

        let oneColor   = (this.quantity == 1)  ? "white" : "grey";
        let fiveColor  = (this.quantity == 5)  ? "white" : "grey";
        let fiftyColor = (this.quantity == 50) ? "white" : "grey";

        let oneY   = (this.quantity == 1)  ? 33 : 29;
        let fiveY  = (this.quantity == 5)  ? 33 : 29;
        let fiftyY = (this.quantity == 50) ? 33 : 29;

        outlineText.drawText(ctx, 28, oneColor,   "1x",   40, oneY,   4, "center");
        outlineText.drawText(ctx, 28, fiveColor,  "5x",  120, fiveY,  4, "center");
        outlineText.drawText(ctx, 28, fiftyColor, "50x", 200, fiftyY, 4, "center");
    }

    draw(canvas, ctx) {

        this.#setCanvasSize(canvas);
        this.#drawButtons(ctx);
        this.#drawText(ctx);
    }
}

// TODO: refine this system
class AlertCanvas{
    constructor(alertObj, context, content) {

        this.alertObj = alertObj;
        this.context = context;
        this.content = content;
    }

    #setCanvasSize(canvas) {

        if (this.context == "opera-right-click") canvas.width = 500;
        else canvas.width = 400;

        canvas.height = 300;
    }

    #processContext() {

        let contentString = "";
        switch(this.context) {

            case "welcome-back":
            default:
                // Format time away string
                let awayString = "";
                if (this.content.timeAway >= 86400) awayString = `${Math.round(((this.content.timeAway / 86400) + Number.EPSILON) * 100) / 100} days`
                else if (this.content.timeAway >= 3600) awayString = `${Math.round(((this.content.timeAway / 3600) + Number.EPSILON) * 100) / 100} hours`
                else if (this.content.timeAgo >= 60) awayString = `${Math.round(((this.content.timeAway / 60) + Number.EPSILON) * 100) / 100} minutes`
                else awayString = `${Math.round((this.content.timeAway + Number.EPSILON) * 100) / 100} seconds`

                let numberHelper = new NumberHelper();
                let earnedAway = numberHelper.returnLongHandNumber(this.content.earnings.toLocaleString("fullwide", {useGrouping: false}));
                
                contentString = `You've earned $${earnedAway} since the last time you were here, ${awayString} ago.`;
                this.alertObj.strings.splice(3, 0, contentString);
                break;

            case "new-version":

                if (this.content === undefined) this.content = "0.1.0";
                contentString = `Last Ver: v${this.content} -> New Ver: v${VERSION_STR}`
                this.alertObj.strings.splice(1, 0, contentString);
                break;

            case "opera-right-click":

                break;

            case "mobile-warning":

                break;
        }
    }

    #drawText(canvas, ctx) {

        let outlineText = new OutlineText();
        this.#processContext();

        // Title
        outlineText.drawText(ctx, 20, "white", cnItem(this.alertObj.title), canvas.width / 2, 20, 6, "center");
        outlineText.drawLine(ctx, 0, 30, canvas.width, 30, "white", 2);

        // Lines
        let extraLine = 0;
        for (let i = 0; i < this.alertObj.strings.length; i++) {

            outlineText.drawWrapText(ctx, 14, "white", cnItem(this.alertObj.strings[i]), 0, 55 + ((i + extraLine) * 30), 4, "left", canvas.width, 20);
            if (this.alertObj.strings[i].length >= 47) extraLine++;
        }
    }

    #drawClose(canvas, ctx) {

        let outlineText = new OutlineText();

        outlineText.drawText(ctx, 14, "white", `v${VERSION_STR}`, 5, canvas.height - 5, 4, "left");
        outlineText.drawText(ctx, 14, "white", "点击浮窗以继续", canvas.width - 5, canvas.height - 5, 4, "right");
    }

    draw (canvas, ctx) {

        this.#setCanvasSize(canvas);
        this.#drawText(canvas, ctx);
        this.#drawClose(canvas, ctx);
    }
}

class BuildingTooltip{
    constructor(buildingId, boardState, player, buildingCache, type) {

        this.buildingId = buildingId;
        this.boardState = boardState;
        this.player = player;
        this.type = type;
        
        if (type == "building") this.building = buildingCache.affectedBuildingResources[buildingId];
        else if (type == "path") this.building = buildingCache.affectedPathResources[buildingId];
        else if (type == "scenery") this.building = SCENERY_DATA[buildingId];
    }

    #setCanvasSize(canvas) {

        canvas.width = 380;
        canvas.height = 255;
    }

    #drawTitle(canvas, ctx) {

        let outlineText = new OutlineText();
        outlineText.drawText(ctx, 22, "white", cnItem(this.building.building_name), 2, 18, 4, "left");
        outlineText.drawText(ctx, 12, `hsla(0, 0%, 60%, 1)`, cnItem(this.building.description), 2, 34, 4, "left");

        // Splitter
        outlineText.drawLine(ctx, 0, 40, canvas.width - 0, 40, "white", 2);
    }

    #getResourceStringArray() {

        let strings = [];
        let hasResource = false;
        for (let i = 0; i < this.building.resource.count.length; i++) {

            if (this.building.resource.count[i] == 0) continue;

            let resourceString = "";
            if (!hasResource) {

                hasResource = true;
                resourceString = "Produces: ";
            }
            else resourceString = "          ";
            let resourceRound = Math.round((this.building.resource.count[i] + Number.EPSILON) * 100) / 100;
            resourceString += `${resourceRound} ${RESOURCE_STRINGS[i]}`
            strings.push(resourceString);
        }
        return strings;
    }

    #getNeedsStringArray() {

        let strings = [];
        let hasNeed = false;
        for (let i = 0; i < this.building.needs.count.length; i++) {

            if (this.building.needs.count[i] == 0) continue;

            let needString = "";
            if (!hasNeed) {

                hasNeed = true;
                needString = "Requires: ";
            }
            else needString = "          ";
            let needRound = Math.round((this.building.needs.count[i] + Number.EPSILON) * 100) / 100;
            needString += `${needRound} ${RESOURCE_STRINGS[i]}`;
            strings.push(needString);
        }
        return strings;
    }

    #drawPathInformation(canvas, ctx) {

        //#region Grab path variables
        let numberHelper = new NumberHelper();

        let price = this.building.price;
        price = numberHelper.returnLongHandNumber(price.toLocaleString("fullwide", {useGrouping: false}));

        let quality = this.building.quality;
        let placeStyle = this.building.place_style;
        if (this.building.place_style == "shoreland") placeStyle = "shore/land";
        else if (this.building.place_style == "shorewater") placeStyle = "shore/water";
        placeStyle = placeStyle.charAt(0).toUpperCase() + placeStyle.slice(1);

        let placeAmount = this.boardState.pathsPlaced[this.buildingId];
        //#endregion

        let outlineText = new OutlineText();
        let posY = 58;
        let incY = 18;

        outlineText.drawText(ctx, 14, "white", `价格: $${price}`, 0, posY, 2, "left"); posY += incY;
        outlineText.drawText(ctx, 14, "white", `放置:`+ cnItem(`${placeStyle}`) +` 地块`, 0, posY, 2, "left"); posY += incY;
        outlineText.drawText(ctx, 14, "white", `${quality}x 产量到相邻地块`, 0, posY, 2, "left"); posY += incY;
        if (placeAmount != 0) { outlineText.drawText(ctx, 14, "white", `${placeAmount} 放置的道路`, 0, posY, 2, "left"); posY += incY; }

        posY -= (incY - 10); 
        outlineText.drawLine(ctx, 0, posY, 150, posY, "white", 2);
        posY += incY;

        let resourceStrings = this.#getResourceStringArray();
        for (let i = 0; i < resourceStrings.length; i++) {

            outlineText.drawText(ctx, 14, "white", cnItem(resourceStrings[i]), 0, posY, 2, "left"); posY += incY;
        }

        let needStrings = this.#getNeedsStringArray();
        for (let i = 0; i < needStrings.length; i++) {

            outlineText.drawText(ctx, 14, "white", cnItem(needStrings[i]), 0, posY, 2, "left"); posY += incY;
        }
        //#endregion

        let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        canvas.height = posY - 10;
        ctx.putImageData(imageData, 0, 0);
    }

    #drawBuildingInformation(canvas, ctx) {

        //#region Grab building variables
        let numberHelper = new NumberHelper();
        let baseYield = numberHelper.returnLongHandNumber(this.building.production.toLocaleString("fullwide", {useGrouping: false}));

        let population = this.boardState.perBuildingPop[this.buildingId];
        let populationString = numberHelper.returnLongHandNumber(population.toLocaleString("fullwide", {useGrouping: false}));

        let earningSec = this.boardState.perBuildingEarnings[this.buildingId];
        let percentTotal = Math.round((100 * (earningSec / this.player.earnings) + Number.EPSILON) * 100) / 100;
        let totalTowers = this.boardState.buildingsPlaced[this.buildingId];
        let earningString = numberHelper.returnLongHandNumber(earningSec.toLocaleString("fullwide", {useGrouping: false}));
        
        let populationBonus = this.building.effect.populationBonus;
        let populationBonusString = numberHelper.returnLongHandNumber(populationBonus.toLocaleString("fullwide", {useGrouping: false}));
        let boostBonus = this.building.effect.boostBonus;

        let placeStyle = this.building.place_style;
        if (this.building.place_style == "shoreland") placeStyle = "shore/land";
        else if (this.building.place_style == "shorewater") placeStyle = "shore/water";
        placeStyle = placeStyle.charAt(0).toUpperCase() + placeStyle.slice(1);
        //#endregion

        let outlineText = new OutlineText();
        let posY = 58;
        let incY = 18;

        //#region Building stats
        outlineText.drawText(ctx, 14, "white", `基础生产: $${baseYield}`, 0, posY, 2, "left"); posY += incY;
        outlineText.drawText(ctx, 14, "white", `放置: `+ cnItem(`${placeStyle}`) +` 地块`, 0, posY, 2, "left"); posY += incY;
        if (populationBonus > 0) { outlineText.drawText(ctx, 14, "white", `容纳 ${populationBonusString} 人`, 0, posY, 2, "left"); posY += incY; }
        if (boostBonus > 0) { outlineText.drawText(ctx, 14, "white", `提升生产率 ${(boostBonus)}%`, 0, posY, 2, "left"); posY += incY; }
        if (this.building.requires_path) { outlineText.drawText(ctx, 14, "white", `需要道路连接`, 0, posY, 2, "left"); posY += incY; }

        if (earningSec > 0 || totalTowers > 0 || population > 0) {

            posY -= (incY - 10); 
            outlineText.drawLine(ctx, 0, posY, 150, posY, "white", 2);
            posY += incY;
        }

        if (earningSec > 0) { outlineText.drawText(ctx, 14, "white", `赚取 $${earningString}/秒 (${percentTotal}%)`, 0, posY, 2, "left"); posY += incY; }
        if (totalTowers > 0) { outlineText.drawText(ctx, 14, "white", `${totalTowers} 放置的塔楼`, 0, posY, 2, "left"); posY += incY; }
        if (population > 0) { outlineText.drawText(ctx, 14, "white", `可以容纳 ${populationString} 人`, 0, posY, 2, "left"); posY += incY; }
        //#endregion

        //#region Resources
        posY -= (incY - 10); 
        outlineText.drawLine(ctx, 0, posY, 150, posY, "white", 2);
        posY += incY;

        let resourceStrings = this.#getResourceStringArray();
        for (let i = 0; i < resourceStrings.length; i++) {

            outlineText.drawText(ctx, 14, "white", cnItem(resourceStrings[i]), 0, posY, 2, "left"); posY += incY;
        }

        let needStrings = this.#getNeedsStringArray();
        for (let i = 0; i < needStrings.length; i++) {

            outlineText.drawText(ctx, 14, "white", cnItem(needStrings[i]), 0, posY, 2, "left"); posY += incY;
        }
        //#endregion

        // Set canvas height to fit text
        let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        canvas.height = posY - 10;
        ctx.putImageData(imageData, 0, 0);
    }

    #drawSceneryInformation(canvas, ctx) {

        //#region Grab variables
        let numberHelper = new NumberHelper();

        let price = this.building.price;
        price = numberHelper.returnLongHandNumber(price.toLocaleString("fullwide", {useGrouping: false}));

        let placeStyle = this.building.place_style;
        if (this.building.place_style == "shoreland") placeStyle = "shore/land";
        else if (this.building.place_style == "shorewater") placeStyle = "shore/water";
        placeStyle = placeStyle.charAt(0).toUpperCase() + placeStyle.slice(1);

        let placeAmount = this.boardState.sceneryPlaced[this.buildingId];
        //#endregion

        //#region Write text
        let outlineText = new OutlineText();
        let posY = 58;
        let incY = 18;

        outlineText.drawText(ctx, 14, "white", `价格: $${price}`, 0, posY, 2, "left"); posY += incY;
        outlineText.drawText(ctx, 14, "white", `放置: `+ cnItem(`${placeStyle}`) +` 地块`, 0, posY, 2, "left"); posY += incY;
        if (placeAmount != 0) { outlineText.drawText(ctx, 14, "white", `${placeAmount} 放置的风景`, 0, posY, 2, "left"); posY += incY; }
        //#endregion

        //#region Resource
        posY -= (incY - 10); 
        outlineText.drawLine(ctx, 0, posY, 150, posY, "white", 2);
        posY += incY;

        let resourceStrings = this.#getResourceStringArray();
        for (let i = 0; i < resourceStrings.length; i++) {

            outlineText.drawText(ctx, 14, "white", cnItem(resourceStrings[i]), 0, posY, 2, "left"); posY += incY;
        }

        let needStrings = this.#getNeedsStringArray();
        for (let i = 0; i < needStrings.length; i++) {

            outlineText.drawText(ctx, 14, "white", cnItem(needStrings[i]), 0, posY, 2, "left"); posY += incY;
        }
        //#endregion

        let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        canvas.height = posY - 10;
        ctx.putImageData(imageData, 0, 0);
    }

    #drawEffectRadius(canvas, ctx) {

        let radius = this.building.effect.effectCoords;
        let len = radius.length;
        if (len == 1) return;

        // Resize canvas if too small to fit effect image
        if (canvas.height < 150) {

            let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            canvas.height = 152;
            ctx.putImageData(imageData, 0, 0);
        }

        //#region Find dimensions of effect radius
        let maxX = Math.max.apply(null, radius.map(e => e.x));
        let minX = Math.min.apply(null, radius.map(e => e.x));
        let maxY = Math.max.apply(null, radius.map(e => e.y));
        let minY = Math.min.apply(null, radius.map(e => e.y));

        let width = maxX - minX;
        let height = maxY - minY;

        let offsetX = (width < height) ? minX - minY : 0;
        let offsetY = (height < width) ? minY - minX : 0;
        //#endregion

        // Set tile size for rendering effect radius
        let mapSize = 100;
        let tileSize = mapSize / Math.max(width + 1, height + 1);
        let posX = 270;
        let posY = 49;

        //#region Floor
        let groundX = 0;
        if (this.building.place_style == "land" || this.building.place_style == "all" || this.building.place_style == "grass") groundX = 512;
        if (this.building.place_style == "shore" || this.building.place_style == "shoreland" || this.building.place_style == "shorewater") groundX = 256;
        if (this.building.place_style == "water") groundX = 128;
        ctx.drawImage(
            GROUND_MAP,
            groundX, 0, 128, 128,
            posX, posY, mapSize, mapSize
        );
        //#endregion

        //#region Building
        let cacheSprite = BUILDING_SPRITE_CACHE[this.buildingId];

        let shrinkRatio = 1;
        offsetX = 0, offsetY = 0;
        if (cacheSprite.width > cacheSprite.height) {

            shrinkRatio = 100 / cacheSprite.width;
            offsetY = (cacheSprite.width - cacheSprite.height) * shrinkRatio / 2;
        }
        else if (cacheSprite.width < cacheSprite.height) {

            shrinkRatio = 100 / cacheSprite.height;
            offsetX = (cacheSprite.height - cacheSprite.width) * shrinkRatio / 2;
        }
        else shrinkRatio = 100 / cacheSprite.width;

        ctx.drawImage(
            cacheSprite,
            0, 0, cacheSprite.width, cacheSprite.height,
            posX + offsetX, posY + offsetY, cacheSprite.width * shrinkRatio, cacheSprite.height * shrinkRatio
        );
        //#endregion

        //#region Grid
        ctx.beginPath();
        for (let i = 0; i < Math.max(width, height); i++) {

            ctx.moveTo(posX + ((i + 1) * tileSize), posY);
            ctx.lineTo(posX + ((i + 1) * tileSize), posY + mapSize);
        }
        for (let i = 0; i < Math.max(width, height); i++) {

            ctx.moveTo(posX, posY + ((i + 1) * tileSize));
            ctx.lineTo(posX + mapSize, posY + ((i + 1) * tileSize));
        }
        ctx.strokeStyle = "rgba(0, 0, 0, 0.33)"
        ctx.lineWidth = 1;
        ctx.stroke();
        //#endregion

        ctx.strokeStyle = `#8d6f49`;
        ctx.lineWidth = 4;
        ctx.strokeRect(posX - 2, posY - 2, 102, 102);
    }

    #drawPathCircle(canvas, ctx) {

        if (canvas.height < 150) {

            let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            canvas.height = 148;
            ctx.putImageData(imageData, 0, 0);
        }

        // Set tile size for rendering effect radius
        let mapSize = TILE_PIXEL_SIZE * 3;
        let tileSize = TILE_PIXEL_SIZE;
        let posX = 270;
        let posY = 49;

        //#region Draw flavor
        let groundX = 0;
        if (this.building.place_style == "land" || this.building.place_style == "all" || this.building.place_style == "grass") groundX = 512;
        if (this.building.place_style == "shore" || this.building.place_style == "shoreland" || this.building.place_style == "shorewater") groundX = 256;
        if (this.building.place_style == "water") groundX = 128;
        ctx.drawImage(
            GROUND_MAP,
            groundX, 0, 128, 128,
            posX, posY, mapSize, mapSize
        );
        //#endregion

        //#region Draw path circle
        let spriteIndex, spriteSheet;
        if (this.type == "path") {

            spriteSheet = PATH_MARCH_ATLAS;
            spriteIndex = this.buildingId * tileSize;
        }
        else if (this.type == "scenery") {

            spriteSheet = SCENERY_MARCH_ATLAS;
            spriteIndex = this.building.march_index * tileSize;
        }
        for (let i = 0; i < 2; i++) {

            ctx.drawImage(
                spriteSheet,
                spriteIndex, 9 * tileSize,
                tileSize, tileSize,
                posX + 32, posY + (32 * (i * 2)),
                tileSize, tileSize
            );
            ctx.drawImage(
                spriteSheet,
                spriteIndex, 10 * tileSize,
                tileSize, tileSize,
                posX + (32 * (i * 2)), posY + 32,
                tileSize, tileSize
            );
        }
        ctx.drawImage(
            spriteSheet,
            spriteIndex, 0 * tileSize,
            tileSize, tileSize,
            posX + 32, posY + 32,
            tileSize, tileSize
        );
        //#endregion

        ctx.strokeStyle = `#8d6f49`;
        ctx.lineWidth = 4;
        ctx.strokeRect(posX - 2, posY - 2, 98, 98);
    }

    draw(canvas, ctx) {

        this.#setCanvasSize(canvas);
        this.#drawTitle(canvas, ctx);
        if (this.type == "building") {

            this.#drawBuildingInformation(canvas, ctx);
            this.#drawEffectRadius(canvas, ctx);
        }
        else if (this.type == "path") {

            this.#drawPathInformation(canvas, ctx);
            this.#drawPathCircle(canvas, ctx);
        }

        else if (this.type == "scenery") {

            this.#drawSceneryInformation(canvas, ctx);
            if (this.building.fx.isMarching) this.#drawPathCircle(canvas, ctx);
        }
    }
}

class NewGameSettings{
    
    #setCanvasSize(canvas) {

        canvas.width = 700;
        canvas.height = 380;
    }

    #drawText(canvas, ctx) {

        let outlineText = new OutlineText();

        outlineText.drawText(ctx, 30, "white", "地图和文明设置", canvas.width / 2, 25, 4, "center");
        outlineText.drawLine(ctx, 0, 36, canvas.width, 36, "white", 3);

        let startY = 60;

        outlineText.drawText(ctx, 18, "white", "区域名称:", 0, startY, 4, "left");           startY += 55;
        outlineText.drawText(ctx, 18, "white", "地图种子:", 0, startY, 4, "left");              startY += 55;
        outlineText.drawText(ctx, 18, "white", "地形定义:", 0, startY, 4, "left");    startY += 45;
        outlineText.drawText(ctx, 18, "white", "景观密度:", 0, startY, 4, "left");       startY += 45;
        outlineText.drawText(ctx, 18, "white", "水源等级:", 0, startY, 4, "left");           startY += 45;
        outlineText.drawText(ctx, 18, "white", "湿度等级:", 0, startY, 4, "left");        startY += 45;
        outlineText.drawText(ctx, 18, "white", "地图尺寸:", 0, startY, 4, "left");              startY += 25;
        outlineText.drawText(ctx, 18, "white", "    中    大", 0, startY, 4, "left");

        outlineText.drawText(ctx, 28, "white", "预设", 625, 70, 4, "center");
        outlineText.drawLine(ctx, 560, 80, 690, 80, "white", 3);
        outlineText.drawLine(ctx, 550, 36, 550, 380, "white", 3);
    }

    draw(canvas, ctx) {

        this.#setCanvasSize(canvas);
        this.#drawText(canvas, ctx);
    }
}

class PreviewBoard{
    constructor(board, landmarks) {

        this.board = board;
        this.landmarks = landmarks;

        this.mapSize = board.length;

        this.groundSize = 256 / this.mapSize;
        this.landmarkSize = 256 / (this.mapSize * 2);

        this.terrainColors = [
            "#1a237e",
            "#3949ab",
            "#c6e6c7",
            "#fff59d",
            "#8bc34a",
            "#558b2f",
            "#33691e"
        ];

        this.terrainCheck = new Array(7).fill(false);
        this.landmarkCheck = false;
    }

    #setCanvasWidth(canvas) {

        canvas.width = 256;
        canvas.height = 256;
    }

    #drawBoard(ctx) {

        let len = this.board.length;
        for (let i = 0; i < len; i++) {

            for (let j = 0; j < len; j++) {

                ctx.fillStyle = this.terrainColors[this.board[i][j]];
                this.terrainCheck[this.board[i][j]] = true;
                ctx.fillRect(j * this.groundSize, i * this.groundSize, this.groundSize, this.groundSize);
            }
        }
    }

    #drawLandmarks(ctx) {

        ctx.fillStyle = "black";
        let len = this.board.length;
        if (len > 0) this.landmarkCheck = true;
        for (let y = 0; y < len; y++) {

            for (let x = 0; x < len; x++) {

                if (this.landmarks[x][y] == null) continue;

                let posX = (this.landmarks[x][y].metaData.x * this.groundSize) + 1;
                let posY = (this.landmarks[x][y].metaData.y * this.groundSize) + 1;
    
                ctx.fillRect(posX, posY, this.landmarkSize, this.landmarkSize);
            }
        }
    }

    #drawBorder(ctx) {

        ctx.strokeStyle = "#8d6f49";
        ctx.lineWidth = 8;
        ctx.strokeRect(0, 0, this.board.length * 4, this.board.length * 4);
    }

    draw(canvas, ctx) {

        this.#setCanvasWidth(canvas);
        this.#drawBoard(ctx);
        this.#drawLandmarks(ctx);
        this.#drawBorder(ctx);

        this.terrainCheck = [this.terrainCheck[1], this.terrainCheck[2], this.terrainCheck[4]];
        let boardError = (this.terrainCheck.includes(false) || !this.landmarkCheck) ? true : false;
        return {error: boardError, landmark: this.landmarkCheck, terrain: this.terrainCheck};
    }
}

class PreviewError{
    constructor(boardCheck) {

        this.boardCheck = boardCheck;

        this.terrainNames = [
            "water",
            "shore",
            "field",
        ];
    }

    #setCanvasSize(canvas) {

        canvas.width = 450;
        canvas.height = 200;
    }

    #drawText(canvas, ctx) {

        let outlineText = new OutlineText();

        outlineText.drawText(ctx, 24, "white", "生成警告", (canvas.width / 2), 25, 4, "center");
        outlineText.drawLine(ctx, 0, 36, canvas.width, 36, "white", 2);

        let startY = 56;
        outlineText.drawWrapText(ctx, 16, "white", cnItem(START_ERROR_STRINGS[0]), 0, startY, 4, "left", canvas.width, 20);
        startY += 40;

        let missingTerrain = [];
        for (let i = 0; i < this.boardCheck.terrain.length; i++) {

            if (!this.boardCheck.terrain[i]) missingTerrain.push(this.terrainNames[i]);
        }

        if (missingTerrain.length > 0) {

            outlineText.drawWrapText(ctx, 16, "red", `地图没有 ${missingTerrain.join(", ")} 地块.`, 0, startY, 4, "left", canvas.width, 18);
            if (!this.boardCheck.landmark) startY += 40;
        }
        
        if (!this.boardCheck.landmark) outlineText.drawText(ctx, 16, "red", `地图没有 地标 地块.`, 0, startY, 4, "left");

        let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        canvas.height = startY + 5;
        ctx.putImageData(imageData, 0, 0);
    }

    draw(canvas, ctx) {

        this.#setCanvasSize(canvas);
        this.#drawText(canvas, ctx);
    }
}

class InspectPopup{
    constructor(selPos, boostTile, groundTile, selTile, earnings) {

        this.selPos = selPos;

        this.groundTile = groundTile;
        this.boostTile = boostTile;
        this.selTile = selTile;

        this.earnings = earnings;
    }

    #setCanvasSize(canvas) {

        canvas.width = 350;
        canvas.height = 250;
    }

    #drawText(canvas, ctx) {

        let outlineText = new OutlineText();
        let numberHelper = new NumberHelper();

        outlineText.drawText(ctx, 20, "white", "地块检查员", (canvas.width / 2), 15, 4, "center");
        outlineText.drawLine(ctx, 0, 25, canvas.width, 25, "white", 2);

        let startY = 45;
        let incY = 20;
        outlineText.drawText(ctx, 15, "white", `位置:   ${this.selPos.x}x, ${this.selPos.y}y`, 0, startY, 4, "left"); startY += incY;
        let tileString = GROUND_TILE_STRINGS[this.groundTile];
        tileString = tileString.charAt(0).toUpperCase() + tileString.slice(1);
        outlineText.drawText(ctx, 15, "white", `地形:    ${tileString}`, 0, startY, 4, "left");

        if (this.boostTile != 100) {

            startY += incY;
            let boostString = `${this.boostTile}%`;
            outlineText.drawText(ctx, 15, "white", `地块提升: ${boostString}`, 0, startY, 4, "left");
        }

        if (this.selTile.type == "landmark") {

            startY += incY;

            let landmark = this.selTile.metaData;
            let landmarkString = (landmark.landmarkType == "r") ? "Rock" : "Tree";
            
            //#region Landmark cost
            let cost = mathUtils.returnLandmarkPrice(landmark);

            cost = Math.floor(cost).toLocaleString("fullwide", {useGrouping: false});
            cost = `${numberHelper.returnShortHandNumber(cost)}`;
            //#endregion

            if (cost == "NaN" || cost == "0") outlineText.drawText(ctx, 15, "white", `Landmark:   ${landmarkString}`, 0, startY, 4, "left");
            else outlineText.drawText(ctx, 15, "white", `地标:   ${landmarkString} ($${cost} 去移除)`, 0, startY, 4, "left");
        }
        else if (this.selTile.type == "tower") {

            startY += incY;

            //#region Get building stats
            let metaData = this.selTile.metaData;
            let buildingData = BUILDING_DATA[metaData.buildingId - 1];

            let earnings = Math.round((metaData.earnings + Number.EPSILON) * 100) / 100;
            earnings = earnings.toLocaleString("fullwide", {useGrouping: false});
            earnings = `${numberHelper.returnLongHandNumber(earnings)}`;

            let population = metaData.population.toLocaleString("fullwide", {useGrouping: false});
            population = `${numberHelper.returnLongHandNumber(population)}`;
            //#endregion

            //#region Write building stats
            outlineText.drawText(ctx, 15, "white", `塔:      ${buildingData.building_name}`, 0, startY, 4, "left"); startY += incY;
            outlineText.drawText(ctx, 15, "white", `赚取:      $${earnings}/秒`, 0, startY, 4, "left");
            if (population != "0") {

                startY += incY;
                outlineText.drawText(ctx, 15, "white", `人口: ${population} 人`, 0, startY, 4, "left");
            } 
            if (buildingData.requires_path && !metaData.bordersPath) {

                startY += incY;
                outlineText.drawText(ctx, 15, "red", `需要道路以完整生产!`, 0, startY, 4, "left");
            }
            //#endregion

        }
        else if (this.selTile.type == "path") {

            startY += incY;

            let pathData = PATH_DATA[this.selTile.metaData.pathId - 1];

            outlineText.drawText(ctx, 15, "white", `道路:       ${pathData.building_name}`, 0, startY, 4, "left"); startY += incY;
            outlineText.drawText(ctx, 15, "white", `奖励:      ${pathData.quality}x 到相邻地块`, 0, startY, 4, "left");
        }
        else if (this.selTile.type == "scenery") {

            startY += incY;

            let metaData = this.selTile.metaData;
            let sceneryData = SCENERY_DATA[metaData.sceneryId - 1];

            outlineText.drawText(ctx, 15, "white", `风景:    ${sceneryData.building_name}`, 0, startY, 4, "left");
        }

        // Resource production
        if (this.selTile.type != "null") {

            let metaData = this.selTile.metaData;
            let produces = false;
            for (let i = 0; i < 4; i++) {

                if (metaData.resource[i] != 0) {
                    
                    startY += incY;

                    let productionString = "";
                    if (!produces) {

                        productionString = "Produces:   ";
                        produces = true;
                    }
                    else productionString = "            "

                    let resourceValue = Math.round((metaData.resource[i] + Number.EPSILON) * 100) / 100;
                    productionString += `${resourceValue} ${RESOURCE_STRINGS[i]}`
                    
                    outlineText.drawText(ctx, 15, "white", cnItem(productionString), 0, startY, 4, "left");
                }
            }
        }

        // Resource needs
        if (this.selTile.type == "tower" || this.selTile.type == "path" || this.selTile.type == "scenery") {

            let metaData = this.selTile.metaData;
            let needs = false;
            for (let i = 0; i < 4; i++) {

                if (metaData.needs[i] != 0) {
                    
                    startY += incY;

                    let requiresString = "";
                    if (!needs) {

                        requiresString = "Requires:   ";
                        needs = true;
                    }
                    else requiresString = "            "

                    let needsValue = Math.round((metaData.needs[i] + Number.EPSILON) * 100) / 100;
                    requiresString += `${needsValue} ${RESOURCE_STRINGS[i]}`
                    
                    outlineText.drawText(ctx, 15, "white", cnItem(requiresString), 0, startY, 4, "left");
                }
            }
        }

        let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        canvas.height = startY + 5;
        ctx.putImageData(imageData, 0, 0);
    }

    draw(canvas, ctx) {

        this.#setCanvasSize(canvas);
        this.#drawText(canvas, ctx);
    }
}

class PatchNoteCanvas{

    #setCanvasSize(canvas) {

        canvas.width = 500;
        canvas.height = 600;
    }

    #drawUpdates(canvas, ctx) {

        let outlineText = new OutlineText();

        let startY = 64;
        let incY = 20;

        outlineText.drawText(ctx, 30, "white", "更新日志", (canvas.width / 2), 25, 4, "center");
        outlineText.drawLine(ctx, 0, 36, canvas.width, 36, "white", 4);

        for (let i = UPDATE_PATCHNOTES.length - 1; i >= 0; i--) {

            let updateTitle = `v${UPDATE_PATCHNOTES[i].version} - ${UPDATE_PATCHNOTES[i].version_title}`;
            outlineText.drawText(ctx, 20, "white", updateTitle, 5, startY, 4, "left");

            let lineWidth = outlineText.measureText(ctx, 20, "white", updateTitle, 5, startY, 4, "left"); startY += 8;
            outlineText.drawLine(ctx, 0, startY, lineWidth + 10, startY, "white", 2); startY += incY;

            // Check if notes may extend past canvas bounds
            if (canvas.height < startY + (incY * UPDATE_PATCHNOTES[i].version_changes.length * 3)) {

                let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                canvas.height = startY + (incY * UPDATE_PATCHNOTES[i].version_changes.length * 3);
                ctx.putImageData(imageData, 0, 0);
            }

            // Write notes
            for (let j = 0; j < UPDATE_PATCHNOTES[i].version_changes.length; j++) {

                outlineText.drawText(ctx, 20, "white", "•", 2, startY + 2, 4, "left");
                let lineWidth = outlineText.measureText(ctx, 16, "white", `${UPDATE_PATCHNOTES[i].version_changes[j]}`, 20, startY, 4, "left");

                if (lineWidth >= canvas.width - 10) {

                    outlineText.drawWrapText(ctx, 16, "white", `${UPDATE_PATCHNOTES[i].version_changes[j]}`, 20, startY, 4, "left", canvas.width - 10, incY);
                    startY += incY * Math.ceil(lineWidth / canvas.width);
                }
                else {

                    outlineText.drawText(ctx, 16, "white", `${UPDATE_PATCHNOTES[i].version_changes[j]}`, 20, startY, 4, "left");
                    startY += incY;
                }
            }
            startY += 32;
        }

        let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        canvas.height = Math.max(startY, 600);
        ctx.putImageData(imageData, 0, 0);

        outlineText.drawText(ctx, 14, "white", "点击浮窗以返回游戏", canvas.width - 5, canvas.height - 5, 4, "right");
    }

    draw(canvas, ctx) {

        this.#setCanvasSize(canvas);
        this.#drawUpdates(canvas, ctx);
    }
}

class InventoryArrows{
    constructor(canvas, dir, activated, tier, placeStyle) {

        this.dir = dir;
        this.activated = activated;
        this.#setCanvasSize(canvas);

        this.tier = tier;
        this.lastTier;
        this.placeType = placeStyle;
        this.lastPlaceType;
    }

    #setCanvasSize(canvas) {

        canvas.width = 32;
        canvas.height = 32;
    }

    #drawArrow(ctx) {

        if (this.lastPlaceType == this.placeType && this.tier == this.lastTier) return;

        let imgX = (this.dir == "left") ? 0 : 32;
        let imgY = (this.activated) ? 0 : 32;

        ctx.drawImage(
            INVENTORY_ARROWS,
            imgX, imgY,
            32, 32,
            0, 0,
            32, 32
        );
        this.lastTier = this.tier;
        this.lastPlaceType = this.placeType;
    }

    draw(ctx, dir, activated, tier, placeType) {

        if (dir !== undefined) {

            this.dir = dir;
            this.activated = activated;

            this.tier = tier;
            this.placeType = placeType;
        }
        this.#drawArrow(ctx);
    }
}

class TileTypeSelector{
    constructor(type, selected) {

        this.type = type;
        this.selected = selected;
    }

    #setCanvasSize(canvas) {

        canvas.width = 150;
        canvas.height = 25;
    }

    #drawText(ctx) {

        let outlineText = new OutlineText();
        let typeString = this.type.charAt(0).toUpperCase() + this.type.slice(1);

        let selColor = (this.selected) ? "white" : "grey";

        outlineText.drawText(ctx, 24, selColor, cnItem(typeString), 10, 20, 4, "left");
    }

    draw(canvas, ctx) {

        this.#setCanvasSize(canvas);
        this.#drawText(ctx);
    }
}

class HintCanvas{
    constructor(settings, tutorialState, roadlessBuildings, resources, regionNeeds, resourceBoost) {

        this.settings = settings;

        this.tutorialState = tutorialState;
        this.roadlessBuildings = roadlessBuildings;

        this.resources = resources;
        this.regionNeeds = regionNeeds;
        this.resourceBoost = resourceBoost;
    }

    #setCanvasSize(canvas) {

        canvas.width = 240;
        canvas.height = 500;
    }

    #checkForErrors() {

        if (this.roadlessBuildings == 0) return false;
        else return true;
    }

    #drawText(canvas, ctx) {

        let outlineText = new OutlineText();

        outlineText.drawText(ctx, 24, "white", "概览", (canvas.width / 2), 20, 4, "center");
        outlineText.drawLine(ctx, 0, 26, canvas.width, 26, "white", 2);

        let startY = 50;
        let incY = 16;

        let i = 0, hasWrittenTutorial = false;
        for (let key of Object.entries(this.tutorialState)) {

            if (key[1]) {

                if (!hasWrittenTutorial) {

                    outlineText.drawText(ctx, 20, "white", "教程", 0, startY, 4, "left"); startY += 5;
                    outlineText.drawLine(ctx, 0, startY, canvas.width, startY, "white", 2); startY += incY + 3;
                    hasWrittenTutorial = true;
                }

                let measure = outlineText.measureText(ctx, 14, "white", cnItem(TUTORIAL_STRINGS[i]), 0, startY, 4, "left");
                let wrap = Math.ceil(measure / canvas.width);
                if (wrap > 1) outlineText.drawWrapText(ctx, 14, "white", cnItem(TUTORIAL_STRINGS[i]), 0, startY, 4, "left", canvas.width, 16);
                else outlineText.drawText(ctx, 14, "white", cnItem(TUTORIAL_STRINGS[i]), 0, startY, 4, "left");
                startY += incY * (wrap + 2.5);
            }
            i++;
        }
        if (hasWrittenTutorial) startY -= incY;

        //#region Needs
        outlineText.drawText(ctx, 20, "white", "地区需求", 0, startY, 4, "left"); startY += 5;
        outlineText.drawLine(ctx, 0, startY, canvas.width, startY, "white", 2); startY += incY + 3;

        // there are probably better ways to do this lmao
        let spacing = ["    ", " ", "   ", "  "];

        for (let i = 0; i < 4; i++) {

            if (this.regionNeeds[i] == 0) continue;

            if (this.settings.realResourceNumbers) {

                let roundResource, roundNeeds;
                if (this.resources[i] >= 1000 || this.regionNeeds[i] >= 1000) {

                    roundResource = Math.round(this.resources[i]);
                    roundNeeds = Math.round(this.regionNeeds[i]);
                }
                else {

                    roundResource = Math.round((this.resources[i] + Number.EPSILON) * 100) / 100;
                    roundNeeds = Math.round((this.regionNeeds[i] + Number.EPSILON) * 100) / 100;
                }

                let satisfaction = mathUtils.clamp(this.resources[i] / this.regionNeeds[i], 0, 1.50);
                if (isNaN(satisfaction)) satisfaction = 0;
                let color = `hsla(${satisfaction * 120}, 100%, 50%, 1)`;
                
                outlineText.drawText(
                    ctx, 14, color, 
                    cnItem(`${RESOURCE_STRINGS[i]}:${spacing[i]}${roundResource}/${roundNeeds}`),
                    0, startY, 4, "left"
                );
            }
            else {

                let satisfaction = mathUtils.clamp(this.resources[i] / this.regionNeeds[i], 0, 1.50);
                if (isNaN(satisfaction)) satisfaction = 0;
                let satisfactionString = `${Math.round((satisfaction + Number.EPSILON) * 100)}%`;
                let color = `hsla(${satisfaction * 120}, 100%, 50%, 1)`;
            
                outlineText.drawText(
                    ctx, 14, color, 
                    cnItem(`${RESOURCE_STRINGS[i]}:${spacing[i]}${satisfactionString}`),
                    0, startY, 4, "left"
                );
            }
            startY += incY;
        }
        outlineText.drawText(
            ctx, 14, "white", 
            `幸福奖励: ${Math.round((this.resourceBoost + Number.EPSILON) * 100) / 100}x`,
            0, startY, 4, "left"
        );
        startY += incY;
        //#endregion

        //#region Errors
        if (this.#checkForErrors()) {

            startY += incY;
            outlineText.drawText(ctx, 20, "white", "电路板错误", 0, startY, 4, "left"); startY += 5;
            outlineText.drawLine(ctx, 0, startY, canvas.width, startY, "white", 2); startY += incY + 3;

            if (this.roadlessBuildings != 0) {

                outlineText.drawText(ctx, 16, "white", cnItem(`• ${this.roadlessBuildings}`) + ` 缺少道路`, 0, startY, 2, "left");
            }
        }
        //#endregion

        // Set canvas height to fit text
        let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        canvas.height = startY += incY;
        ctx.putImageData(imageData, 0, 0);
    }

    draw(canvas, ctx) {

        this.#setCanvasSize(canvas);
        this.#drawText(canvas, ctx);
    }
}

class MapBorderExample{
    constructor(style) {

        this.style = style;
    }

    #setCanvasSize(canvas) {

        canvas.width = 96;
        canvas.height = 96;
    }

    #drawBorderSprite(ctx) {

        let borderSprite = fluffUtils.returnMapBorderSprite(this.style);
        ctx.drawImage(
            borderSprite, 0, 0, 96, 96
        );
    }

    draw(canvas, ctx) {

        this.#setCanvasSize(canvas);
        this.#drawBorderSprite(ctx);
    }
}

//#region Edicts
class EdictBook{

    #setCanvasSize(canvas) {

        canvas.width = 152;
        canvas.height = 100;
    }

    #drawBook(canvas, ctx) {

        ctx.drawImage(EDICT_BOOK, 0, 0, canvas.width, canvas.height);
    }

    draw(canvas, ctx) {

        this.#setCanvasSize(canvas);
        this.#drawBook(canvas, ctx);
    }
}

class EdictText{
    constructor(canvas, ctx, page, edicts, resource, needs, resourceNumbers) {

        this.ctx = ctx;
        this.canvas = canvas;

        this.page = page;
        this.edicts = edicts;

        this.resource = resource;
        this.needs = needs;
        this.resourceNumbers = resourceNumbers;

        this.#setCanvasSize();
        this.#drawTitle();
        this.#drawLines();
    }

    #setCanvasSize() {

        this.canvas.width = 608;
        this.canvas.height = 400;
    }

    #drawTitle() {

        let outlineText = new OutlineText();
        outlineText.drawFancyText(this.ctx, 72, "hsla(0, 0%, 0%, 0.66)", cnItem(EDICT_BOOK_DATA[this.page].title), 160, 96, 0, "center");

        if (this.page == 0) this.#writeResources();

        if (this.page + 1 <= EDICT_BOOK_DATA.length - 1) {

            outlineText.drawFancyText(this.ctx, 72, "hsla(0, 0%, 0%, 0.66)", cnItem(EDICT_BOOK_DATA[this.page + 1].title), 448, 96, 0, "center");
            outlineText.drawLine(this.ctx, 324, 108, 564, 108, "hsla(0, 0%, 0%, 0.33)", 8);
            outlineText.drawLine(this.ctx, 326, 108, 562, 108, "hsla(0, 0%, 0%, 0.66)", 4);
        }
        outlineText.drawLine(this.ctx, 44, 108, 284, 108, "hsla(0, 0%, 0%, 0.33)", 8);
        outlineText.drawLine(this.ctx, 46, 108, 282, 108, "hsla(0, 0%, 0%, 0.66)", 4);
    }

    #writeResources() {

        let outlineText = new OutlineText();

        let startY = 142;
        let incY = 40;

        for (let i = 0; i < 4; i++) {

            if (this.needs[i] == 0) continue;

            let resourceString = "";
            let satisfaction = mathUtils.clamp(this.resource[i] / this.needs[i], 0, 1.50);
            if (this.resourceNumbers) {

                let roundResource, roundNeed;
                if (this.resource[i] >= 1000 || this.needs[i] >= 1000) {

                    roundResource = Math.round(this.resource[i]);
                    roundNeed = Math.round(this.needs[i]);
                }
                else {

                    roundResource = Math.round((this.resource[i] + Number.EPSILON) * 100) / 100;
                    roundNeed = Math.round((this.needs[i] + Number.EPSILON) * 100) / 100;
                }
                resourceString = `${roundResource}/${roundNeed}`;
            }
            else {

                if (isNaN(satisfaction)) satisfaction = 0;
                resourceString = `${Math.round((satisfaction + Number.EPSILON) * 100)}%`;
            }

            let stringColor = `hsla(${satisfaction * 120}, 100%, 50%, 0.85)`;
            outlineText.drawFancyText(this.ctx, 30, "hsla(0, 0%, 0%, 0.66)", RESOURCE_STRINGS[i], 36, startY, 0, "left");
            startY += 28;
            outlineText.drawFancyText(this.ctx, 26, stringColor, resourceString, 46, startY, 0, "left");
            startY += incY;
        }
    }

    #drawConnectorLine(purchased, posX, posY, x1, y1, x2, y2) {

        let iconSpacing = 48;
        this.ctx.beginPath();
        this.ctx.moveTo((x1 * iconSpacing) + posX, (y1 * iconSpacing) + posY);
        this.ctx.lineTo((x2 * iconSpacing) + posX, (y2 * iconSpacing) + posY);

        for (let i = 0; i < 4; i++) {

            if (purchased) this.ctx.strokeStyle = `rgba(0, 192, 0, ${(i + 1) * 0.15})`;
            else this.ctx.strokeStyle = `rgba(0, 0, 0, ${(i + 1) * 0.15})`;
            this.ctx.lineWidth = i + 1;
            this.ctx.stroke();
        }
    }

    #drawLines() {

        let posX = 70;
        let posY = 138;
        
        for (let i = 0; i < 2; i++) {

            if (this.page + i > EDICT_BOOK_DATA.length - 1) break;
            for (let j = 0; j < EDICT_BOOK_DATA[this.page + i].icon.length; j++) {

                let icon = EDICT_BOOK_DATA[this.page + i].icon[j];
                if (icon.requires.length == 0) continue;
                
                for (let k = 0; k < EDICT_BOOK_DATA[this.page + i].icon.length; k++) {

                    let searchIcon = EDICT_BOOK_DATA[this.page + i].icon[k];
                    if (icon.requires.includes(searchIcon.key)) {

                        let purchased = this.edicts.hasEdict(searchIcon.key);

                        this.#drawConnectorLine(
                            purchased, 
                            posX, posY, 
                            icon.position[0], icon.position[1], 
                            searchIcon.position[0], searchIcon.position[1]
                        );
                    }
                }
            }
            posX = 350;
        }
    }
}

class EdictPageArrow{
    constructor(canvas, ctx, page, direction) {

        this.canvas = canvas;
        this.ctx = ctx;

        this.page = page;
        this.direction = direction;

        this.#setCanvasSize();
        this.#drawArrows();
    }

    #setCanvasSize() {

        this.canvas.width = 16;
        this.canvas.height = 16;
    }

    #drawArrows() {
        
        //#region Left arrow
        if (this.direction == "left") {

            if (this.page - 2 >= 0) {

                this.ctx.drawImage(
                    EDICT_ARROWS, 
                    0, 0, 16, 16,
                    0, 0, 16, 16
                );
            }
            else {
    
                this.ctx.drawImage(
                    EDICT_ARROWS, 
                    0, 16, 16, 16,
                    0, 0, 16, 16
                );
            }
        }
        //#endregion

        //#region Right arrow
        else if (this.direction == "right") {

            if (this.page + 1 < EDICT_BOOK_DATA.length - 1) {

                this.ctx.drawImage(
                    EDICT_ARROWS, 
                    16, 0, 16, 16,
                    0, 0, 16, 16
                );
            }
            else {
    
                this.ctx.drawImage(
                    EDICT_ARROWS, 
                    16, 16, 16, 16,
                    0, 0, 16, 16
                );
            }
        }

        else if (this.direction == "close") {

            this.ctx.drawImage(
                EDICT_ARROWS, 
                32, 0, 16, 16,
                0, 0, 16, 16
            );
        }
        //#endregion
    }
}

class EdictPageIcon{

    constructor(canvas, ctx, iconData) {

        this.iconData = iconData;

        this.canvas = canvas;
        this.ctx = ctx;

        this.#setCanvasSize();
        if (iconData !== undefined) this.#drawIcon();
    }

    #setCanvasSize() {

        this.canvas.width = 20;
        this.canvas.height = 20;
    }

    #drawIcon() {

        let spriteX = this.iconData.spriteIndex[0] * 20;
        let spriteY = this.iconData.spriteIndex[1] * 20;

        this.ctx.drawImage(
            EDICT_ICON_SHEET,
            spriteX, spriteY, 20, 20,
            0, 0, 20, 20
        );
    }
}
//#endregion