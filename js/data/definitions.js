//© 2023 - 2023 www.idleregion.com - All Rights Reserved.

//#region Operational Constants
let zoom = 1;
const TILE_PIXEL_SIZE = 32;
const SAVE_FORMAT = 3;

const MAX_TIME_AWAY_EARNING = 7200;
const METEOR_SPAWNTIME = 300;
const METEOR_DESPAWN = 45;
const PRICE_MOD = 1.125;
const NO_PATH_PENALTY = 0.5;

// chunk width in tiles
var CHUNK_WIDTH = 8;

const RESOURCE_NEED_GROWTH = 0.30103;
const RESOURCE_BASES = [6.5, 9, 5, 4];
const LANDMARK_SCENERY_VALUE = 0.5;
const EMPTYGROUND_SCENERY_VALUE = 0.25;
const REGION_BOOST_BASE = 0.1;

const BOOST_CLICK_MULT = 50;
const BOOST_EARN_MULT = 2;

const COLOR_PRODUCTION = "#f0da4f";
const COLOR_BOOST = "#4f8ff0";
const COLOR_POPULATION = "#4ff065";

const GUI_SIZES = [
    [24, 19.2, 240],    // Tier canvas
    [24, 19.2, 240],    // Quantity canvas
    [24, 19.2, 240],    // Buy buttons
    [25, 20, 256],     // Score canvi
    [32, 26, 320],     // Inventory
    [38, 31.6, 380],   // Building tooltip
    [3, 2.6, 32],      // Inventory arrows
    [32, 26, 320],     // Control panel
    [12, 11.7, 150],    // Performance counter
    [7, 6, 80],        // Options panel
    [12, 11.7, 150],    // Tile type selectors
    [0.1, 1, 0.8],      // Performance font size
    [0.2, 2, 2],        // Advice-title font size
    [24, 19.2, 240],    // Hint canvas
    [24, 19.2, 240],    // Open edict button
];

const ACTIVE_EFFECTS = [
    {
        name: "Industrial Revolution",
        code: "boostearn",
        description: "Double all earnings for 2 minutes",
        spriteIndex: 0,
        lifetime: 120,
    },
    {
        name: "Brittle Rocks",
        code: "boostclick",
        description: "Rock earnings increased 50x for 10 seconds",
        spriteIndex: 2,
        lifetime: 10,
    },
    {
        name: "Dividends",
        code: "addsum",
        description: "This rock had a bunch of money in it!",
        spriteIndex: 0,
        lifetime: 0,
    },
];

const LANDMARK_REMOVAL_COST = [
    [20, 150, 15, 100], // Rock
    [15, 25, 50, 100],  // Tree
];

const WEATHER_THRESHOLDS = [
    0.0,    // Clear
    0.6,    // Cloudy
    0.72,   // Rain
    0.82,   // Thunderstorm
    1       // Max
];

const WEATHER_DIM = [
    1,  // Bottom
    1,  // Clear
    10, // Cloudy
    33, // Rain
    50, // Storm
    50, // Max
];

// Colors for background
const TIME_CYCLE_COLORS_TOP = [
    [216, 98, 17],
    [212, 199, 13],
    [210, 100, 12],
    [205, 100, 15],
    [205, 100, 20],
    [198, 100, 28],
    [198, 93, 40],
    [191, 83, 60],
    [176, 51, 70],
    [176, 51, 75],
    [176, 51, 80],
    [62, 58, 83],
    [50, 95, 66],
    [40, 97, 66],
    [26, 100, 72],
    [29, 98, 67],
    [22, 86, 62],
    [353, 81, 60],
    [332, 52, 53],
    [274, 49, 35],
    [259, 64, 29],
    [229, 58, 24],
    [233, 70, 22],
    [232, 85, 20]
];

const TIME_CYCLE_COLORS_BOT = [
    [210, 99, 12],
    [208, 100, 8],
    [206, 100, 7],
    [207, 100, 9],
    [207, 96, 11],
    [205, 100, 20],
    [204, 89, 36],
    [198, 88, 46],
    [193, 78, 48],
    [193, 78, 50],
    [193, 78, 65],
    [179, 54, 60],
    [152, 46, 76],
    [63, 71, 75],
    [49, 100, 70],
    [49, 100, 68],
    [48, 100, 65],
    [43, 99, 62],
    [30, 93, 55],
    [12, 70, 50],
    [337, 52, 44],
    [285, 42, 36],
    [264, 59, 25],
    [235, 56, 18],
];
//#endregion

//#region Strings
const RESOURCE_STRINGS = [
    "Food",
    "Workers",
    "Power",
    "Beauty"
];

const NUMBER_DENOMS_SUBPREFIX = [
    "k",
    "m",
    "b",
    "t",
    "qa",
    "qi",
    "sx",
    "sp",
    "o",
    "n"
];

const NUMBER_DENOMS_PREFIX = [
    "",
    "u",
    "d",
    "t",
    "qa",
    "qi",
    "sx",
    "sp",
    "o",
    "n",
];

const NUMBER_DENOMS_SUFFIX = [
    "",
    "D",
    "V",
    "T",
    "QA",
    "QI",
    "SX",
    "SP",
    "O",
    "N",
    "CE",
    "CED"
];

const GAME_MESSAGES = [
    {
        title: "Welcome to Idle Region!",
        strings: [
            "This game is currently a work in progress.", 
            "Updates may be frequent and might change or introduce new game elements.",
            "Some of these changes may break older saves (sorry)."
        ],
        image: 0
    },
    {
        title: "Welcome to Idle Region!",
        strings: [
            "The game has been updated since you've last played. Some game elements may have changed.",
            "The changelog can be viewed in the settings menu."
        ],
        image: 0
    },
    {
        title: "Opera Browser Warning!",
        strings: [
            "Opera's default settings disables dragging the map with right click.",
            "You can enable this feature by enabling the following setting:",
            "Settings -> Advanced -> Shortcuts -> Disable Mouse Gestures"
        ],
        image: 0
    },
    {
        title: "Mobile Warning!",
        strings: [
            "This game hasn't been -fully- ported to mobile just yet.",
            "Tablets should have no problem running the game, but mobile phones are unpredictable at the moment.",
        ],
        image: 0
    }
];

const GROUND_TILE_STRINGS = [
    "deep water",
    "water",
    "shore",
    "beach",
    "field",
    "forest",
    "jungle"
];

const HELP_STRINGS = [
    {
        title: "Buildings",
        strings: [
            "When you buy a building from the menu on the left, it is added to your inventory. You can then place this building onto the map.",
            "Some buildings will require a path in any of the 4 bordering tiles to function at max capacity.",
            "Your earnings-per-second are based on the combined earnings from buildings on the map.",
            "Offline earnings are capped at a two hour maximum. This may be changed in the future.",
        ]
    },
    {
        title: "Building Effects",
        strings: [
            "Buildings are color-coded based on effects they have when placed onto the map:",
            "• Yellow-titled towers are the most basic and will only produce money.",
            "• Green-titled towers produce money and also house population for your region when placed on the map.",
            "• Blue-titled towers produce money and will boost surrounding tiles in a radius that is specific to each tower.",
            "Some towers may have a combination of effect types. All of their effects will work the same as described above, and their names will show a gradient between the speficied effect types.",
        ]
    },
    {
        title: "Population and Strategies",
        strings: [
            "Your region's population correlates directly to how much you earn per-click. (plus any regional happiness bonus)",
            "You can organize your region's towers based on your style of play - either idle, active, or a mixture of both.",
        ]
    },
    {
        title: "Region Needs",
        strings: [
            "There are a handful of resources your region needs to stay happy.",
            "Towers will either request or supply one of these resources, and are tallied globally.",
            "Resources are affected the same way that earnings are calculated, taking the tile's boost bonus and any bordering path's production bonus.",
            "Fulfilling these requests will boost the overall production in your region, and your earnings per-click.",
            "To view a breakdown of your resources, refer either to the Overview window or the first page of your edict book."
        ]
    },
    {
        title: "Edicts",
        strings: [
            "You can use the edict book to pass laws and gain new tower upgrades",
            "Each signed law has a cost, or a previous requirement that must be met in order to be purchased.",
            "Edicts can be a very powerful resource when dealing with resource shortcomings in your region.",
        ]
    },
    {
        title: "Natural Landmarks",
        strings: [
            "You can remove the natural landmarks on the map at a cost based on your current earnings per-second.",
            "Some are more expensive to remove than others, so factor that in when you pick a starting location.",
        ]
    },
    {
        title: "Hotkeys",
        strings: [
            "Keys 1 - 8: Select tower",
            "Shift + Number: Change building tier",
            "Ctrl + Number: Change tile type",
            "Control + Click: Quick-select hovered tower",
            "Right Click + Drag: Move the game board",
            "Scroll Wheel: Adjust game board zoom",
            "",
            "Q:   Toggle map grid",
            "W:   Toggle boost grid",
            "E-R: Adjust game board zoom",
            "Z:   Toggle tile inspector",
            "X:   Toggle tile destroyer",
            "",
            "H:   Help window",
            "O:   Options window",
            "S:   Stats window",
            "A:   Achievements window",
            "P:   Edicts window"
        ]
    }
];

const SETTINGS_STRINGS = [
    {
        title: "Game Settings",
        strings: [
            "Permanent Day",
            "Show Fps",
            "Show News Ticker",
            "Show Raw Resource Numbers",
            "Enable Autosave",
            "Gui Scale:  Small  Medium  Large",
            "sep-line"
        ]
    },
    {
        title: "Graphics Settings",
        strings: [
            "Enable Tower Lights",
            "Enable Water Reflections",
            "Enable Weather",
            "Enable Lightning"
        ]
    },
    {
        title: "Audio Settings",
        strings: [
            "UI Volume",
            "Ambience Volume"
        ]
    },
    {
        title: "Social Links",
        strings: [
            "  Join the Idle Region Discord!"
        ]
    },
]

const TUTORIAL_STRINGS = [
    "• Click the giant rock to earn some money",
    "• Use the side panel to purchase a Forager",
    "• Click the Forager in your inventory to select it, and then place it onto some grass",
    "• Place the Cultivator so that its boost radius covers the Forager"
];

const START_ERROR_STRINGS = [
    "Some towers require specific terrain. Generating without them may slow progression."
];

const NEWS_TICKER_STRINGS = [
    //#region Needs
    {
        group: "food-bad",
        strings: [
            "Poor rations cut into citizen's morale",
            "Food supplies dwindling as residents demand more",
            "[region] Residents starving as food supplies dwindle"
        ]
    },
    {
        group: "food-mid",
        strings: [
            "Citizens skimping out on breakfast fancies",
            "Residents skipping the brunch, sources say",
        ]
    },
    {
        group: "food-good",
        strings: [
            "Citizens fawn over new health food craze",
            "Masses praise mayor for food flourishment",
            "[region] food stores bursting at the seams as supplies boom"
        ]
    },
    {
        group: "workers-bad",
        strings: [
            "Industries clamoring to fill positions",
            "Stores shutting down due to lack of employment",
            "Community markets turn into ghost towns as worker supply dwindles"
        ]
    },
    {
        group: "workers-mid",
        strings: [
            "Citizens working overtime as workforce dwindles",
            "\"I could use a few more workers\" - Local Industry Mogul"
        ]
    },
    {
        group: "workers-good",
        strings: [
            "Residents earning more than ever, sources say",
            "Industry booms as workforce grows ever stronger",
            "\"Business is booming in [region]!\" - Local Market"
        ]
    },
    {
        group: "power-bad",
        strings: [
            "Citizens cut back as region electricity dwindles",
            "Region left in the dark after electrical blackout",
            "City faces power surge as power demands skyrocket"
        ]
    },
    {
        group: "power-mid",
        strings: [
            "Residents toast bread, but can't toast toast",
            "[region] in power equilibrium as electrical demand grows"
        ]
    },
    {
        group: "power-good",
        strings: [
            "[region] buildings light up as electricital grid flourishes",
            "Neon signs glowing following electrical grid expansion",
            "[region] announces \"City of Lights\" festival"
        ]
    },
    {
        group: "beauty-bad",
        strings: [
            "Citizens complain about poor environment",
            "\"I can't stand looking around\" - [region] Resident",
            "Looming smog clouds mar [region]'s beauty"
        ]
    },
    {
        group: "beauty-mid",
        strings: [
            "Residents happy with surroundings but yearn for more",
            "Citizens take a stroll through [region]'s parks"
        ]
    },
    {
        group: "beauty-good",
        strings: [
            "\"I'm stunned by the beauty here\" - [region] Bystander",
            "Residents proud to be living in such beautiful region",
            "[region]'s air quality reaches all time high"
        ]
    },
    //#endregion

    //#region Tiers
    {
        group: "random-tier-1",
        strings: [
            "Region experiences once-in-a-lifetime solar eclipse",
            "Local wolves howl at full moon",
            "Residents stunned by untouched environment",
            "Local wildlife stirred by expanding settlement",
            "[region] Fields raise maize in new corn craze",
            "Dozens of new residents roll into [region]",
            "Path network springs up through [region]",
            "Stargazers dumbfounded by falling rocks",
        ]
    },
    {
        group: "random-tier-2",
        strings: [
            "Region experiences once-in-a-lifetime solar eclipse",
            "Local wolves find residence in bustling village",
            "News of [region] spreads to surrounding villages",
            "Hundreds of new residents roll into [region]",
            "\"Mooooooooooo\" - [region] Cow",
            "Residents unsettled by loud cattle, moods wane",
        ]
    },
    {
        group: "random-tier-3",
        strings: [
            "Region experiences once-in-a-lifetime solar eclipse",
            "Thousands of new residents roll into [region]",
            "[region] Clay finds new home as fired brick",
            "\"Ceramics changed my life\" - [region] Bystander",
            "Productivity flourishes as metal tools flood industries",
        ]
    },
    {
        group: "random-tier-4",
        strings: [
            "Region experiences once-in-a-lifetime solar eclipse",
            "Millions of new residents roll into [region]",
            "Colosseum tickets half-off for tonights show",
            "Seas stuffed as several ships set sail",
            "Timber industry looking to expand with more sawmills"
        ]
    },
    {
        group: "random-tier-5",
        strings: [
            "Region experiences once-in-a-lifetime solar eclipse",
            "Billions of new residents roll into [region]",
            "Citizens feel at home in [region]",
            "\"Lighthouses make us all feel safer\" - [region] Sailor",
            "\"Our shelves are filling up!\" - Warehouse Owner",
            "Citizens of [region] more healthy than ever",
            "\"Canned food makes life much easier\" - Local Chef"
        ]
    },
    //#endregion

    //#region First buildings
    {
        group: "building-first",
        strings: [
            "Fruit trees spring up around [region]",
            "Fertile soil discovered in [region], farming ensues",
            "\"I hope there isn't a bear in here\" - Cave Explorer",
            "\"Finally, some fresh meat.\" - [region] Hunter",
            "Citizens take to the ocean as new Fishing Hut built",
            "Goods fill up brand new Storehouse in [region]",
            "Residents find community in new Settlement",
            "[region] citizens see bright future in new Fire Pit",
            "Cow's moos heard for miles around new Rancher",
            "\"I just love chipping stones\" - Local Stone Mason",
            "Civilians cheer as new Roundhouse rolls into town",
            "Citizens take advantage of fertile soil, plant corn",
            "Shores around [region] bustle as new Trawlers sail",
            "Trees tremble as Lumberjack finds new spot in [region]",
            "Residents set up shop in new Bazaar",
            "[region] finds home in new Log Cabin",
            "Shores in [region] bustling following new Wharf",
            "\"Clay is the way\" - [region] Ceramist",
            "Hut ushers in new era of living quality in [region]",
            "Region finds fuel for fire as new Charcoaler built",
            "\"We've got a lot to dig\" - [region] Miner",
            "\"My ears are ringing\" - [region] Blacksmith",
            "\"My love for chipping stones grows stronger\" - Local Stoneworker",
            "\"I've never felt safer\" - Fortress Resident",
            "Colosseum celebrates grand opening with gladiator fights",
            "Booze flood the streets as Brewery sets up in [region]",
            "Oceans becoming smaller as new Galleon sets sail",
            "Residents pack into town houses as region expands",
            "Citizens hypnotized by new Windmill's fans",
            "Trees running scared as new Sawmill opens up",
            "Criminals run for the hills as new Courthouse opens",
            "Civilians sitting pretty in new [region] Manor",
            "Region cheers as powerlines draped through streets",
            "Sailors find solace in new Lighthouse",
            "\"I've never seen anything like it\" - Local Dockhand",
            "[region] Warehouse promises to end storage crisis",
            "Residents packed wall to wall in new Apartment",
            "\"I've never felt better\" - Local Bystander",
            "City passes new Town Hall into law",
            "Tin cans flood the market as new Canning Plant opens"
        ]
    },
    //#endregion

    //#region Weather
    {
        group: "weather-clear",
        strings: [
            "Citizens praise sunny skies, loathe hot weather",
            "Crop season in full swing as summer rays bolster field growth",
            "[region]'s weather outlook sunny",
            "\"I'm pretty sure its sunny.\" - Local Meteorologist",
            "Meteorologists predict heavy rain in the coming days"
        ]
    },
    {
        group: "weather-rain",
        strings: [
            "\"Where's the sun?\" - Confused Bystander",
            "\"I'm pretty sure its raining.\" - Local Meteorologist",
            "[region] children find time to play in the rain",
            "Local pigs find solace in freshly mudded ground",
            "Meteorologists assure fair weather in the coming days"
        ]
    },
    {
        group: "weather-storm",
        strings: [
            "\"My hat blew away in the storm.\" - Local Meteorologist",
            "Monsoon season pounds [region], citizens hope for fair weather",
            "Meteorologists urge [region] citizens to stay inside",
            "Meteorologists assure fair weather in the coming days",
            "\"My fires went out.\" - [region] Charcoaler"
        ]
    },
    //#endregion

    //#region Missing roads
    {
        group: "missing-roads",
        strings: [
            "\"We're stuck!\" - Trapped Civilians",
            "Local building missing road connection, residents trapped",
            "\"We can't do business like this.\" - Trapped Industry Mogul",
            "City planners urge mayor to build more roads"
        ]
    },
    //#endregion

    //#region Rare messages
    {
        group: "rare-messages",
        strings: [
            "\"Thanks for playing Idle Region!\" - Sam_Chug",
            "\"Space coming eventually!\" - Sam_Chug",
            "\"Nice region!\" - Sam_Chug",
            "\"I would live in [region]\" - Sam_Chug"
        ]
    },
    //#endregion

];
//#endregion

//#region Region name
const REGION_NAME_PREFIX = [

    "New",
    "The",
    "Epic",
    "East",
    "West",
    "North",
    "South",
    "Green",
    "Lesser",
    "Silver",
    "Land of",
    "Greater",
    "Emerald",
    "Northeast",
    "Northwest",
    "Southeast",
    "Southwest"
];

const REGION_NAME_MIDDLE = [

    "Ve",
    "Mab",
    "Mal",
    "Civ",
    "Land",
    "Sylv",
    "Lake",
    "Wild",
    "Epic",
    "Hela",
    "Heli",
    "Wood",
    "Bubuu",
    "River",
    "Forest",
    "Boulder"
];

const REGION_NAME_SUFFIX = [

    "ia",
    "na",
    "ica",
    "ania",
    "land",
    "ford",
    "burg",
    "wood",
    "topia",
    "borea",
    "ville",
    "opolis",
    "landia",
    " Span",
    " Land",
    " Zone",
    " Ridge",
    " Order",
    " Grove",
    " Nation",
    " Shores",
    " Expanse",
];
//#endregion

//#region Achievement Data
const ACH_DATA_TOTALEARNINGS = [
    {
        name: "#1 Apple Distributor",
        description: "Earn $100 in Your Region",
        thresh: 100
    },
    {
        name: "Ten Big Ones",
        description: "Earn $10,000 in Your Region",
        thresh: 10000
    },
    {
        name: "Fishy Money",
        description: "Earn $500,000 in Your Region",
        thresh: 500000
    },
    {
        name: "Ceramic Currency",
        description: "Earn $1 Million in Your Region",
        thresh: 1000000
    },
    {
        name: "Ten Bigger Ones",
        description: "Earn $10 Million in Your Region",
        thresh: 10000000
    },
    {
        name: "Hard To Imagine",
        description: "Earn $1 Billion in Your Region",
        thresh: 1000000000
    },
    {
        name: "10 Zeroes",
        description: "Earn $10 Billion in Your Region",
        thresh: 10000000000
    },
    {
        name: "Dividends",
        description: "Earn $1 Trillion in Your Region",
        thresh: 1000000000000
    },
];

const ACH_DATA_TOTALCLICKS = [
    {
        name: "Rock Clicker",
        description: "Click the Giant Rock 10 Times",
        thresh: 10
    },
    {
        name: "Rock Buster",
        description: "Click the Giant Rock 100 Times",
        thresh: 100
    },
    {
        name: "Rock Splitter",
        description: "Click the Giant Rock 1,000 Times",
        thresh: 1000
    },
    {
        name: "Rocksploder",
        description: "Click the Giant Rock 2,500 Times",
        thresh: 2500
    },
    {
        name: "Rock Annihilator",
        description: "Click the Giant Rock 5,000 Times",
        thresh: 5000
    },
];

const ACH_DATA_ROCKEARNINGS = [
    {
        name: "Chalk Scratch",
        description: "Earn $50 Clicking the Giant Rock",
        thresh: 50
    },
    {
        name: "Green Rocks",
        description: "Earn $1,000 Clicking the Giant Rock",
        thresh: 1000
    },
    {
        name: "(Hard)-Earned",
        description: "Earn $10,000 Clicking the Giant Rock",
        thresh: 10000
    },
    {
        name: "Sedimentary Tender",
        description: "Earn $100,000 Clicking the Giant Rock",
        thresh: 100000
    },
    {
        name: "Gneiss.",
        description: "Earn $1 Million Clicking the Giant Rock",
        thresh: 1000000
    },
    {
        name: "Cold Hard Cash",
        description: "Earn $10 Million Clicking the Giant Rock",
        thresh: 10000000
    },
    {
        name: "Craving Minerals",
        description: "Earn $100 Million Clicking the Giant Rock",
        thresh: 100000000
    },
    {
        name: "Transmutation",
        description: "Earn $1 Billion Clicking the Giant Rock",
        thresh: 1000000000
    },
    {
        name: "A st(R)ock Split",
        description: "Earn $10 Billion Clicking the Giant Rock",
        thresh: 10000000000
    },
    {
        name: "Gold to Cash",
        description: "Earn $100 Billion Clicking the Giant Rock",
        thresh: 100000000000
    },
];

const ACH_DATA_BUILDINGSOWNED = [
    {
        name: "Your First Orchard",
        description: "Own 1 Building",
        thresh: 1
    },
    {
        name: "Townscape",
        description: "Own 25 Buildings",
        thresh: 25
    },
    {
        name: "Centuplicate",
        description: "Own 100 Buildings",
        thresh: 100
    },
    {
        name: "Village Architect",
        description: "Own 250 Buildings",
        thresh: 250
    },
    {
        name: "Town Scape",
        description: "Own 500 Buildings",
        thresh: 500
    },
    {
        name: "One Thousand Buildings",
        description: "Own 1,000 Buildings",
        thresh: 1000
    },
    {
        name: "Everything but the Kitchen Sink",
        description: "Own 1,500 Buildings",
        thresh: 1500
    },
    {
        name: "City Scape",
        description: "Own 2,000 Buildings",
        thresh: 2000
    },
    {
        name: "Everything AND the Kitchen Sink",
        description: "Own 2,500 Buildings",
        thresh: 2500
    },
    {
        name: "As Far as the Eye Can See",
        description: "Own 3,000 Buildings",
        thresh: 3000
    },
];

const ACH_DATA_PATHSPLACED = [
    {
        name: "A Place to Walk",
        description: "Place 1 Paths",
        thresh: 1
    },
    {
        name: "The Road Less Traveled",
        description: "Place 10 Paths",
        thresh: 10
    },
    {
        name: "Country Roads",
        description: "Place 25 Paths",
        thresh: 25
    },
    {
        name: "Just Stretching My Legs",
        description: "Place 50 Paths",
        thresh: 50
    },
    {
        name: "Infrastructure Upgrade",
        description: "Place 100 Paths",
        thresh: 100
    },
    {
        name: "Electric Avenue",
        description: "Place 150 Paths",
        thresh: 150
    },
    {
        name: "Block After Block",
        description: "Place 200 Paths",
        thresh: 200
    },
    {
        name: "Just ONE More Lane Bro",
        description: "Place 250 Paths",
        thresh: 250
    },
];

const ACH_DATA_TOWERSPLACED = [
    {
        name: "A Humble Beginning",
        description: "Place 1 Building",
        thresh: 1
    },
    {
        name: "Band",
        description: "Place 25 Buildings",
        thresh: 25
    },
    {
        name: "Village",
        description: "Place 50 Buildings",
        thresh: 50
    },
    {
        name: "Homestead",
        description: "Place 100 Buildings",
        thresh: 100
    },
    {
        name: "Locality",
        description: "Place 150 Buildings",
        thresh: 150
    },
    {
        name: "Town",
        description: "Place 200 Buildings",
        thresh: 200
    },
    {
        name: "Municipality",
        description: "Place 250 Buildings",
        thresh: 250
    },
    {
        name: "Metropolis",
        description: "Place 300 Buildings",
        thresh: 300
    },
    {
        name: "Conurbation",
        description: "Place 350 Buildings",
        thresh: 350
    },
    {
        name: "City",
        description: "Place 400 Buildings",
        thresh: 400
    },
    {
        name: "Megacity",
        description: "Place 450 Buildings",
        thresh: 450
    },
    {
        name: "Gigalopolis",
        description: "Place 500 Buildings",
        thresh: 500
    },
];

const ACH_DATA_POPULATION = [
    {
        name: "A Small Gathering",
        description: "Reached 10 Region Population",
        thresh: 10
    },
    {
        name: "A Modest Crowd",
        description: "Reached 100 Region Population",
        thresh: 100
    },
    {
        name: "A Large Assemblage",
        description: "Reached 1,000 Region Population",
        thresh: 1000
    },
    {
        name: "A Region Legion",
        description: "Reached 10,000 Region Population",
        thresh: 10000
    },
    {
        name: "A Real Rabble",
        description: "Reached 50,000 Region Population",
        thresh: 50000
    },
    {
        name: "A Packed Arena",
        description: "Reached 100,000 Region Population",
        thresh: 100000
    },
    {
        name: "A Massive Multitude",
        description: "Reached 500,000 Region Population",
        thresh: 500000
    },
    {
        name: "A Sea of Faces",
        description: "Reached 1 Million Region Population",
        thresh: 1000000
    },
];

const ACH_DATA_TILEBOOST = [
    {
        name: "Twice the Power",
        description: "Increase a Tile's Production to 2x",
        thresh: 200
    },
    {
        name: "Threefold Throughput",
        description: "Increase a Tile's Production to 3x",
        thresh: 300
    },
    {
        name: "Quad Capability",
        description: "Increase a Tile's Production to 4x",
        thresh: 400
    },
    {
        name: "Sextuple Strength",
        description: "Increase a Tile's Production to 6x",
        thresh: 600
    },
    {
        name: "Octuple Output",
        description: "Increase a Tile's Production to 8x",
        thresh: 800
    },
    {
        name: "Mega Manufacturing",
        description: "Increase a Tile's Production to 10x",
        thresh: 1000
    }
];

const ACH_DATA_METEORCLICKS = [
    {
        name: "Whats This?",
        description: "Harvest 1 Meteorite",
        thresh: 1
    },
    {
        name: "Heads Up!",
        description: "Harvest 5 Meteorites",
        thresh: 5
    },
    {
        name: "Celestial Supplier",
        description: "Harvest 10 Meteorites",
        thresh: 10
    },
    {
        name: "Galactic Gifts",
        description: "Harvest 25 Meteorites",
        thresh: 25
    },
    {
        name: "From the Stars",
        description: "Harvest 50 Meteorites",
        thresh: 50
    },
];

const ACH_DATA_EDICTSFINISHED = [
    {
        name: "Under New Management",
        description: "Buy All Tier 1 Edicts",
        thresh: "happy-boost-1"
    },
    {
        name: "Sphere of Influence",
        description: "Buy All Tier 2 Edicts",
        thresh: "happy-boost-2"
    },
    {
        name: "Administrative Efforts",
        description: "Buy All Tier 3 Edicts",
        thresh: "happy-boost-3"
    },
    {
        name: "Executive Order",
        description: "Buy All Tier 4 Edicts",
        thresh: "happy-boost-4"
    },
    {
        name: "Big Brother",
        description: "Buy All Tier 5 Edicts",
        thresh: "happy-boost-5"
    },
];

const ACH_DATA_SINGLES = [
    {
        name: "Nature Hater",
        description: "Removed a Natural Landmark"
    },
    {
        name: "Actually, Nevermind",
        description: "Removed a Tile"
    },
    {
        name: "Hello, My Name Is _____",
        description: "Changed The Name of Your Region"
    },
    {
        name: "Now We're Cooking!",
        description: "Boosted a Tower With Another Tower"
    },
    {
        name: "What Do We Have Here?",
        description: "Inspected a Tile With the Tile Inspector"
    },
    {
        name: "Happy Little Tree",
        description: "Placed a Scenery Tile"
    },
];

const ACH_DATA_LOCKED = [
    {
        name: "Locked Achievement",
        description: "Unknown Requirement"
    }
];

const ACH_DATA_LIST = [
    ACH_DATA_TOTALEARNINGS,
    ACH_DATA_ROCKEARNINGS,
    ACH_DATA_TOTALCLICKS,
    ACH_DATA_PATHSPLACED,
    ACH_DATA_TOWERSPLACED,
    ACH_DATA_POPULATION,
    ACH_DATA_TILEBOOST,
    ACH_DATA_METEORCLICKS,
    ACH_DATA_EDICTSFINISHED,
];

const ACH_IMAGE_LIST = [
    `./res/images/ui/achievement-icons/total-earnings.png?v=0-3-3a`,
    `./res/images/ui/achievement-icons/click-earnings.png?v=0-3-3a`,
    `./res/images/ui/achievement-icons/click-amount.png?v=0-3-3a`,
    `./res/images/ui/achievement-icons/paths-placed.png?v=0-3-3a`, 
    `./res/images/ui/achievement-icons/towers-placed.png?v=0-3-3a`, 
    `./res/images/ui/achievement-icons/population-icons.png?v=0-3-3a`,
    `./res/images/ui/achievement-icons/tile-boost.png?v=0-3-3a`, 
    `./res/images/ui/achievement-icons/meteor-clicks.png?v=0-3-3a`, 
    `./res/images/ui/achievement-icons/edicts-finished.png?v=0-3-3a`
];
//#endregion

//#region Load functions
// https://stackoverflow.com/questions/37854355/wait-for-image-loading-to-complete-in-javascript
async function loadImageSet(imageUrls) {

    const promiseArray = [];
    const imageArray = [];

    for (let url of imageUrls) {

        promiseArray.push(new Promise(resolve => {

            const img = new Image();
            img.onload = function() {

                resolve();
            }
            img.src = url;
            imageArray.push(img);
        }));
    }
    await Promise.all(promiseArray);
    return imageArray;
}

async function loadAllImages() {

    // Load score sprite
    let scoreImage = await loadImageSet(SCORE_SRC);
    UI_SCORE_HOLDER             = scoreImage[0];
    UI_ROCK_BREAK               = scoreImage[1];
    UI_ROCK_HOLDER              = scoreImage[2];
    UI_NAME_HOLDER              = scoreImage[3];
    UI_POWERUP_SPRITES          = scoreImage[4];
    
    // Load edict sprite
    let edictImage = await loadImageSet(EDICT_SRC);
    EDICT_BOOK                  = edictImage[0];
    EDICT_ARROWS                = edictImage[1];
    EDICT_ICON_SHEET            = edictImage[2];
    EDICT_BUTTON                = edictImage[3];

    // Load background sprite
    let backgroundImage = await loadImageSet(BACKGROUND_SRC);
    UI_PANEL_BG                 = backgroundImage[0];
    SKY_CLOUDY                  = backgroundImage[1];
    SKY_STARRY                  = backgroundImage[2];

    //#region Load control sprite
    let controlImage = await loadImageSet(CONTROL_SRC);
    INVENTORY_SLOT              = controlImage[0];
    BUILDING_ICONS              = controlImage[1];
    UI_BUILDING_BUTTON          = controlImage[2];
    UI_BUILDING_BUTTON_ICONS    = controlImage[3];
    UI_TIER_SELECT              = controlImage[4];
    CONTROL_ICONS               = controlImage[5];
    HELP_ICONS                  = controlImage[6];
    UI_BUY_QUANTITY             = controlImage[7];
    INVENTORY_ARROWS            = controlImage[8];
    PATH_ICONS                  = controlImage[9];
    PATH_SPRITES                = controlImage[10];
    CONTROL_SLOT                = controlImage[11];
    SCENERY_ICONS               = controlImage[12];
    SCENERY_SPRITES             = controlImage[13];
    //#endregion
    
    //#region Load cursor sprite
    let cursorImage = await loadImageSet(CURSOR_SRC);
    CURSOR_SELECT = cursorImage[0];
    CURSOR_DELETE = cursorImage[1];
    CURSOR_LOCKED = cursorImage[2];
    CURSOR_INSPECT = cursorImage[3];
    CURSOR_EFFECT = cursorImage[4];
    //#endregion

    //#region Load board sprite
    let boardImage = await loadImageSet(BOARD_SRC);
    GROUND_MAP                  = boardImage[0];
    BUILDING_SPRITES            = boardImage[1];
    GROUND_LANDMARKS            = boardImage[2];
    GROUND_METEOR               = boardImage[3];
    PATH_MARCH_ATLAS            = boardImage[4];
    TILE_WARNING                = boardImage[5];
    SCENERY_MARCH_ATLAS         = boardImage[6];
    //#endregion

    //#region Load boarder sprites
    let borderImage = await loadImageSet(BORDER_SRC);
    BORDER_AQUEDUCT = borderImage[0];
    BORDER_BRICK = borderImage[1];
    BORDER_SLEEK_BLACK = borderImage[2];
    BORDER_SLEEK_GREY = borderImage[3];
    BORDER_SLEEK_WHITE = borderImage[4];
    BORDER_WOOD_FANCY = borderImage[5];
    BORDER_WOOD = borderImage[6];
    //#endregion
}

async function awaitFontLoad() {

    while (true) {

        if (document.fonts.check("16px DM Mono")) break;
        await new Promise(resolve => setTimeout(resolve, 10));
    }
}
//#endregion

//#region Image sources
const CONTROL_SRC = [
    "./res/images/ui/layout/controls/inv-slot-2x.png?v=0-3-3a",         // Inventory Slot
    "./res/images/ui/layout/controls/inventory-icons-2x.png?v=0-3-3a",  // Building inventory icons
    "./res/images/ui/layout/controls/building-button.png?v=0-3-3a",     // Holder for button data
    "./res/images/ui/layout/controls/button-icons.png?v=0-3-3a",        // Icons for building buttons
    "./res/images/ui/layout/controls/tier-selector.png?v=0-3-3a",       // Horizontal tier-selection icons
    "./res/images/ui/layout/controls/board-controls-2x.png?v=0-3-3a",   // Board control icons
    "./res/images/ui/layout/controls/help-icons-2x.png?v=0-3-3a",       // Help icons
    "./res/images/ui/layout/controls/buy-quantity.png?v=0-3-3a",        // Purchase quantity buttons
    "./res/images/ui/layout/controls/arrow-controls.png?v=0-3-3a",      // Arrow controls
    "./res/images/ui/layout/controls/path-icons-2x.png?v=0-3-3a",       // Path inventory icons
    "./res/images/ui/layout/controls/path-icons.png?v=0-3-3a",          // Path placement cursor sprites
    "./res/images/ui/layout/controls/toggle-slot-2x.png?v=0-3-3a",      // Board control slots
    "./res/images/ui/layout/controls/scenery-icons-2x.png?v=0-3-3a",    // Scenery inventory sprites
    "./res/images/ui/layout/controls/scenery-sprites.png?v=0-3-3a",     // Scenery cursor sprites
];

const BACKGROUND_SRC = [
    "./res/images/ui/layout/backgrounds/panel-bg.png?v=0-3-3a",         // BG for ui panels
    "./res/images/ui/layout/backgrounds/cloudy-sky-highc.png?v=0-3-3a", // Cloudy sky
    "./res/images/ui/layout/backgrounds/starry-sky-ref.png?v=0-3-3a",   // Night sky
]

const SCORE_SRC = [
    "./res/images/ui/layout/score-panel/score-holder.png?v=0-3-3a",     // Holder for score text
    "./res/images/ui/layout/score-panel/rock-break.png?v=0-3-3a",       // Rock animation
    "./res/images/ui/layout/score-panel/rock-holder.png?v=0-3-3a",      // Rock holder
    "./res/images/ui/layout/score-panel/name-holder.png?v=0-3-3a",      // Region name holder
    "./res/images/ui/layout/score-panel/powerup-sprite-2x.png?v=0-3-3a",// Powerup sprites
];

const EDICT_SRC = [
    "./res/images/ui/layout/edict/edict-book.png?v=0-3-3a",             // Edict book
    "./res/images/ui/layout/edict/edict-controls.png?v=0-3-3a",         // Edict page arrows
    "./res/images/ui/layout/edict/edict-icon-sheet.png?v=0-3-3a",       // Edict icon sheet
    "./res/images/ui/layout/edict/edict-button.png?v=0-3-3a",           // Edict UI button
];

const CURSOR_SRC = [
    "./res/images/cursor/select-index.png?v=0-3-3a",   // Select cursor
    "./res/images/cursor/delete-index.png?v=0-3-3a",   // Delete cursor
    "./res/images/cursor/locked-index.png?v=0-3-3a",   // Locked cursor
    "./res/images/cursor/inspect-index.png?v=0-3-3a",  // Inspect cursor
    "./res/images/cursor/tile-radius.png?v=0-3-3a",    // Radius shown around cursor
];

const BORDER_SRC = [
    "./res/images/canvas/border/border-aqueduct.png?v=0-3-3a",
    "./res/images/canvas/border/border-brick.png?v=0-3-3a",
    "./res/images/canvas/border/border-sleek-black.png?v=0-3-3a",
    "./res/images/canvas/border/border-sleek-grey.png?v=0-3-3a",
    "./res/images/canvas/border/border-sleek-white.png?v=0-3-3a",
    "./res/images/canvas/border/border-wood-fancy.png?v=0-3-3a",
    "./res/images/canvas/border/border-wood.png?v=0-3-3a",
];

const BOARD_SRC = [
    "./res/images/canvas/ground-tilemaps.png?v=0-3-3a",                 // Ground tilemaps
    "./res/images/canvas/building-sprites.png?v=0-3-3a",                // Building sprites
    "./res/images/canvas/ground-landmarks.png?v=0-3-3a",                // Environment tiles
    "./res/images/canvas/meteor.png?v=0-3-3a",                          // Meteor sprite
    "./res/images/canvas/marching/path-marching-atlas.png?v=0-3-3a",    // Path marching atlas
    "./res/images/canvas/tile-warning.png?v=0-3-3a",                    // Tile warning
    "./res/images/canvas/marching/scenery-marching-atlas.png?v=0-3-3a", // Scenery marching atlas
];
//#endregion

//#region Image Vars
// Inventory
var INVENTORY_SLOT;
var BUILDING_ICONS;

var SCENERY_ICONS;
var SCENERY_SPRITES

var PATH_ICONS;
var PATH_SPRITES;

var INVENTORY_ARROWS;

// Edict
var EDICT_BOOK;
var EDICT_ARROWS;
var EDICT_ICON_SHEET;
var EDICT_BUTTON;

// Score
var UI_SCORE_HOLDER;
var UI_ROCK_HOLDER;
var UI_NAME_HOLDER;
var UI_ROCK_BREAK;
var UI_POWERUP_SPRITES;

// Building panel
var UI_BUILDING_BUTTON;
var UI_BUILDING_BUTTON_ICONS;
var UI_PANEL_BG;
var UI_TIER_SELECT;
var UI_BUY_QUANTITY;
var UI_TOOLTIP_DIAGRAM_BG;

// Control panel
var CONTROL_SLOT;
var CONTROL_ICONS;
var HELP_ICONS;

// Environment
var TILE_WARNING;
var GROUND_LANDMARKS;
var GROUND_METEOR;
var GROUND_MAP;
var SKY_CLOUDY;
var SKY_STARRY;

// Borders
var BORDER_AQUEDUCT;
var BORDER_BRICK;
var BORDER_SLEEK_BLACK;
var BORDER_SLEEK_GREY;
var BORDER_SLEEK_WHITE;
var BORDER_WOOD_FANCY;
var BORDER_WOOD;

// Buildings
var BUILDING_SPRITES;
var PATH_MARCH_ATLAS;
var SCENERY_MARCH_ATLAS;

// Cursor
var CURSOR_SELECT;
var CURSOR_DELETE;
var CURSOR_LOCKED;
var CURSOR_INSPECT;
var CURSOR_EFFECT;
//#endregion

//#region Sound res
const SFX_TOWER_PLACE = [
    new Audio("./res/sounds/towers/tower-placement-a.ogg?v=0-3-3a"),
    new Audio("./res/sounds/towers/tower-placement-b.ogg?v=0-3-3a"),
    new Audio("./res/sounds/towers/tower-placement-c.ogg?v=0-3-3a")
];

const SFX_TOWER_PLACE_WATER = [
    new Audio("./res/sounds/towers/tower-placement-water-a.ogg?v=0-3-3a"),
    new Audio("./res/sounds/towers/tower-placement-water-b.ogg?v=0-3-3a")
];

const SFX_EDICT_OPEN = [
    new Audio("./res/sounds/ui/book-open-a.ogg?v=0-3-3a"),
    new Audio("./res/sounds/ui/book-open-b.ogg?v=0-3-3a")
];

const SFX_EDICT_CLOSE = [
    new Audio("./res/sounds/ui/book-close-a.ogg?v=0-3-3a"),
    new Audio("./res/sounds/ui/book-close-b.ogg?v=0-3-3a")
];

const SFX_EDICT_PAGE = [
    new Audio("./res/sounds/ui/page-turn-a.ogg?v=0-3-3a"),
    new Audio("./res/sounds/ui/page-turn-b.ogg?v=0-3-3a")
];

const SFX_EDICT_PENCIL = [
    new Audio("./res/sounds/ui/edict-pencil-a.ogg?v=0-3-3a"),
    new Audio("./res/sounds/ui/edict-pencil-b.ogg?v=0-3-3a")
];

const SFX_ACHIEVEMENT = [
    new Audio("./res/sounds/ui/achievement-a.ogg?v=0-3-3a"),
    new Audio("./res/sounds/ui/achievement-b.ogg?v=0-3-3a"),
    new Audio("./res/sounds/ui/achievement-c.ogg?v=0-3-3a")
];

const SFX_ACHIEVEMENT_EGG = new Audio("./res/sounds/ui/achievement-egg.ogg?v=0-3-3a");

const SFX_BUILDING_BUY = [
    new Audio("./res/sounds/ui/buy-building-a.ogg?v=0-3-3a"),
    new Audio("./res/sounds/ui/buy-building-b.ogg?v=0-3-3a"),
    new Audio("./res/sounds/ui/buy-building-c.ogg?v=0-3-3a")
];

const SFX_REMOVE_TREE = [
    new Audio("./res/sounds/towers/tree-remove-a.ogg?v=0-3-3a"),
    new Audio("./res/sounds/towers/tree-remove-b.ogg?v=0-3-3a")
];

const SFX_REMOVE_ROCK = [
    new Audio("./res/sounds/towers/rock-remove-a.ogg?v=0-3-3a"),
    new Audio("./res/sounds/towers/rock-remove-b.ogg?v=0-3-3a")
];

const SFX_REMOVE_TOWER = [
    new Audio("./res/sounds/towers/remove-tower-a.ogg?v=0-3-3a"),
    new Audio("./res/sounds/towers/remove-tower-b.ogg?v=0-3-3a"),
    new Audio("./res/sounds/towers/remove-tower-c.ogg?v=0-3-3a")
];

const SFX_CLICK_BUTTON = [
    new Audio("./res/sounds/ui/click-button-a.ogg?v=0-3-3a"),
    new Audio("./res/sounds/ui/click-button-b.ogg?v=0-3-3a")
];

const SFX_ROCK_BREAK = [
    new Audio("./res/sounds/ui/rock-break-a.ogg?v=0-3-3a"),
    new Audio("./res/sounds/ui/rock-break-b.ogg?v=0-3-3a"),
    new Audio("./res/sounds/ui/rock-break-c.ogg?v=0-3-3a")
];

const SFX_THUNDER = [
    new Audio("./res/sounds/ambient/thunder-a.ogg?v=0-3-3a"),
    new Audio("./res/sounds/ambient/thunder-b.ogg?v=0-3-3a"),
    new Audio("./res/sounds/ambient/thunder-c.ogg?v=0-3-3a")
];

const METEOR_LAND = new Audio("./res/sounds/towers/meteor-land.ogg?v=0-3-3a");

//#region Ambience
const SFX_WIND_LOOP = new Audio("./res/sounds/ambient/wind-loop.ogg?v=0-3-3a");
const SFX_OCEAN_LOOP = new Audio("./res/sounds/ambient/ocean-loop.ogg?v=0-3-3a");
const SFX_SHORE_LOOP = new Audio("./res/sounds/ambient/shore-loop.ogg?v=0-3-3a");
const SFX_FOREST_LOOP = new Audio("./res/sounds/ambient/forest-loop.ogg?v=0-3-3a");
const SFX_RAIN_LOOP = new Audio("./res/sounds/ambient/rain-loop.ogg?v=0-3-3a");
const SFX_HEAVYRAIN_LOOP = new Audio("./res/sounds/ambient/heavyrain-loop.ogg?v=0-3-3a");
//#endregion

//#region Music
const MUSIC_MAPCREATION = new Audio("./res/sounds/music/map-creation.ogg?v=0-3-3a");
//#endregion

//#endregion
