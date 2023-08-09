//© 2023 - 2023 www.idleregion.com - All Rights Reserved.

const VERSION_STR = "0.3.3a";

UPDATE_PATCHNOTES = [
    //#region 0.1
    {
        version: "0.1.1",
        version_title: "Tweaks and Rebalancing",
        version_changes: [
            "Style changes",
            "Changed buy quantities from 1/10/100 to 1/5/50",
            "Increased meteor spawn frequency (600 -> 300 seconds)",
            "Nerfed dividends meteorite powerup",
            "Rebalanced nearly every building and tower",
            "Added patchnotes window (You're looking at it right now!)",
            "Fixed bug where ambient sounds would freeze up",
            "Building tooltip tweaks",
            "Building's earning% overall should now be accurate",
            "Various menu tweaks",
            "Fixed incorrect %total when industrial revolution powerup active",
            "Fixed weird meteor behavior when game tab inactive",
            "Improved saving/loading functionality",
            "Reworked how game tiles are stored, expect bugs",
            "(Maybe) Performance improvements"
        ],
    },
    //#endregion

    //#region 0.2
    {
        version: "0.2.0",
        version_title: "Gameplay Overhaul",
        version_changes: [
            "Massive backend overhaul, expect some bugs",
            "Various quality of life additions",
            "Towers are now awarded per-building bought",
            "Earnings are now based on the towers placed on the board rather than those bought on the side bar",
            "Paths moved to separate window with some new paths added",
            "Paths now have a fixed cost, and no longer yield any money on their own",
            "Some buildings will now require a path connection for full production",
            "Added new Overview window with some starting tips and board alerts",
            "Fixed some issues with the tile inspector",
            "Fixed quick selecting",
            "Fixed inventory tooltip location",
            "Fixed first path achievement not triggering at one path placed",
            "Fixed tooltips displaying incorrect numbers when earnings boosted"
        ],
    },
    {
        version: "0.2.1",
        version_title: "Performance Improvements",
        version_changes: [
            "Massively improved CPU performance",
            "Reduced amount of drawing for most UI elements, expect some bugs",
        ],
    },
    {
        version: "0.2.2",
        version_title: "GUI Overhaul",
        version_changes: [
            "Multiple achievements will now queue to play after one another",
            "Resized some GUI elements",
            "Overhauled settings menu",
            "Added option to resize GUI in settings menu",
            "Added rain effect",
            "Fixed ambient sound playing when tab not in focus",
        ],
    },
    //#endregion

    //#region 0.3
    {
        version: "0.3.0",
        version_title: "Regional Resources",
        version_changes: [
            "Regions now require resources to work more efficiently. The totals of these resources are tallied and will give your earnings a boost if the requirements are met",
            "Edict book added to provide means for upgrading specific tower's resource production, along with other various upgrades",
            "General quality of life improvements",
            "Tons of bug fixes and small gameplay tweaks",
            "Added a link to the new official Discord server to the options menu"
        ],
    },
    {
        version: "0.3.1",
        version_title: "Hotfixes and Tablet Support",
        version_changes: [
            "Re-enabled play on mobile for now. Touch controls should work alright, but some devices still have trouble running the game correctly.",
            "Mobile play is more suited for tablets at the moment. Mobile phone gameplay is unpredictable.",
            "Added music to the map creation screen",
            "Fixed missing rain graphics",
        ],
    },
    {
        version: "0.3.2",
        version_title: "New Content and Fluff",
        version_changes: [
            "Added a new tier of buildings, and a page of edicts to go along with it",
            "Added an animated day/night cycle for the map creation screen",
            "Added a news ticker to show context-based headlines about your region",
            "Lighting performance increases",
            "Fixed scenery rating miscalculation",
            "Fixed bug where the cheaper path edict reflected incorrect prices when placing paths",
            "Fixed missing edict book hotkey",
            "Fixed error in highway sprites",
            "Work is being done to increase playability on mobile devices. Tablets and android devices should have no issue running the game at this time, but variances in viewport resolution between devices may affect playability."
        ],
    },
    {
        version: "0.3.3",
        version_title: "Pretty Regions",
        version_changes: [
            "New tab for scenery - these tiles increase the beauty of your region, but will also increase required resources",
            "New map size option in the map creation screen (Large maps may cause performance issues on less powerful computers)",
            "Added hotkey to quick-switch between tile types (ctrl + number)",
            "Added button to clear all player-placed tiles on map",
            "Reduced save file sizes",
            "Added missing tier-swap hotkey for tier 5",
            "Added missing favicons for tier 5 buildings",
            "Fixed Manor favicon not appearing when placed",
            "Fixed error in building-light generation, should work slightly faster now",
        ],
    },
    //#endregion
];