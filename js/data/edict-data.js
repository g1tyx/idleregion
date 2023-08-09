const EDICT_BOOK_DATA = [
    {
        title: "Edicts",
        icon: [],
        lines: []
    },
    {
        title: "Tier 1",
        icon: [
            {
                name: "Extra Apples",
                description: "Increase Forager food production by 25%",
                key: "forager-1",
                cost: 500,
                requires: [],
                spriteIndex: [0, 0],
                position: [0, 0]
            },
            {
                name: "Advanced Fertilizer", 
                description: "Increase Cultivator food production by 25%",
                key: "cultivator-1",
                cost: 5000,
                requires: ["forager-1"],
                spriteIndex: [1, 0],
                position: [0, 1]
            },
            {
                name: "Sharper Spears", 
                description: "Increase Hunter food production by 25%",
                key: "hunter-1",
                cost: 50000,
                requires: ["cultivator-1"],
                spriteIndex: [2, 0],
                position: [0, 2]
            },
            {
                name: "Bronze Age Bait", 
                description: "Increase Fishing Hut food production by 25%",
                key: "fishing-hut-1",
                cost: 500000,
                requires: ["hunter-1"],
                spriteIndex: [3, 0],
                position: [0, 3]
            },
            {
                name: "Smaller Portions", 
                description: "Decreases global food requirement by 5%",
                key: "all-food-1",
                cost: 2500000,
                requires: ["fishing-hut-1"],
                spriteIndex: [4, 0],
                position: [0, 4]
            },
            {
                name: "Extra Caverns",
                description: "Increases Cave Hut worker production by 50%",
                key: "cave-hut-1",
                cost: 2500,
                requires: [],
                spriteIndex: [5, 0],
                position: [2, 0]
            },
            {
                name: "Village Apprentice",
                description: "Increases Settlement worker production by 50%",
                key: "settlement-1",
                cost: 250000,
                requires: [],
                spriteIndex: [6, 0],
                position: [4, 0]
            },
            {
                name: "Pretty Flames",
                description: "Reduces Fire Pit negative beauty by 50%",
                key: "firepit-1",
                cost: 650000,
                requires: ["cave-hut-1", "settlement-1"],
                spriteIndex: [7, 0],
                position: [3, 1]
            },
            {
                name: "3 Day Weekend",
                description: "Decreases global worker requirement by 5%",
                key: "all-worker-1",
                cost: 3450000,
                requires: ["firepit-1"],
                spriteIndex: [8, 0],
                position: [3, 2]
            },
            {
                name: "Harvest Festival",
                description: "Regional happiness bonus increased by 100%",
                key: "happy-boost-1",
                cost: 12500000,
                requires: ["all-worker-1", "all-food-1"],
                spriteIndex: [9, 0],
                position: [3, 4]
            },
        ],
    },
    {
        title: "Tier 2",
        icon: [
            {
                name: "Larger Troughs",
                description: "Increase Rancher food production by 25%",
                key: "rancher-1",
                cost: 3500000,
                requires: [],
                spriteIndex: [0, 1],
                position: [0, 0]
            },
            {
                name: "Irrigation Systems",
                description: "Increase Farmland food production by 25%",
                key: "farmland-1",
                cost: 24680000,
                requires: ["rancher-1"],
                spriteIndex: [1, 1],
                position: [0, 1]
            },
            {
                name: "Wider Nets",
                description: "Increase Trawler food production by 25%",
                key: "trawler-1",
                cost: 53100000,
                requires: ["farmland-1"],
                spriteIndex: [2, 1],
                position: [0, 2]
            },
            {
                name: "Muffled Chisels",
                description: "Reduces Stone Mason negative beauty by 50%",
                key: "stone-mason-1",
                cost: 8500000,
                requires: [],
                spriteIndex: [3, 1],
                position: [2, 0]
            },
            {
                name: "Pretty Pigs",
                description: "Reduces Rancher negative beauty by 50%",
                key: "rancher-2",
                cost: 12500000,
                requires: ["stone-mason-1"],
                spriteIndex: [4, 1],
                position: [2, 2]
            },
            {
                name: "Sharper Axes",
                description: "Decreases Lumberjack worker requirement by 40%",
                key: "lumberjack-1",
                cost: 36000000,
                requires: [],
                spriteIndex: [5, 1],
                position: [4, 0]
            },
            {
                name: "Land Expansion",
                description: "Decreases natural landmark removal price by 50%",
                key: "landmark-1",
                cost: 64200000,
                requires: ["lumberjack-1"],
                spriteIndex: [6, 1],
                position: [4, 2]
            },
            {
                name: "Cause for Celebration",
                description: "Regional happiness bonus increased by 100%",
                key: "happy-boost-2",
                cost: 180000000,
                requires: ["landmark-1", "rancher-2", "trawler-1"],
                spriteIndex: [7, 1],
                position: [2, 4]
            },
        ],
    },
    {
        title: "Tier 3",
        icon: [
            {
                name: "Deep Sea Harvesting",
                description: "Boost Food production of all water buildings by 25%",
                key: "water-food-1",
                cost: 2345000000,
                requires: [],
                spriteIndex: [0, 2],
                position: [0, 0]
            },
            {
                name: "Crop Rotation",
                description: "Boost Food production of all land buildings by 15%",
                key: "land-food-1",
                cost: 4567000000,
                requires: ["water-food-1"],
                spriteIndex: [1, 2],
                position: [0, 2]
            },
            {
                name: "Furnace Filtration",
                description: "Reduces Charcoaler negative beauty by 50%",
                key: "charcoaler-1",
                cost: 1250000000,
                requires: [],
                spriteIndex: [2, 2],
                position: [2, 0]
            },
            {
                name: "Smog-Tinted Glasses",
                description: "Decreases global beauty requirement by 10%",
                key: "all-beauty-1",
                cost: 4500000000,
                requires: ["charcoaler-1"],
                spriteIndex: [3, 2],
                position: [2, 1]
            },
            {
                name: "Softer Marble",
                description: "Decreases Stoneworks worker requirement by 25%",
                key: "stoneworks-1",
                cost: 5550000000,
                requires: [],
                spriteIndex: [4, 2],
                position: [4, 0]
            },
            {
                name: "4 Day Weekend",
                description: "Decreases global worker requirement by 10%",
                key: "all-worker-2",
                cost: 16400000000,
                requires: ["stoneworks-1"],
                spriteIndex: [5, 2],
                position: [4, 1]
            },
            {
                name: "All Roads Lead to You",
                description: "Decreases all pathing costs by 50%",
                key: "cheaper-paths",
                cost: 24100000000,
                requires: ["all-worker-2", "all-beauty-1"],
                spriteIndex: [6, 2],
                position: [3, 2]
            },
            {
                name: "Renaissance Fair",
                description: "Regional happiness bonus increased by 100%",
                key: "happy-boost-3",
                cost: 99000000000,
                requires: ["cheaper-paths", "land-food-1"],
                spriteIndex: [7, 2],
                position: [1.5, 4]
            },
        ],
    },
    {
        title: "Tier 4",
        icon: [
            {
                name: "Clean-Up Crew",
                description: "Increases Colosseum beauty by 25%",
                key: "colosseum-1",
                cost: 45000000000,
                requires: [],
                spriteIndex: [0, 3],
                position: [0, 0]
            },
            {
                name: "A New Coat of House Paint",
                description: "Increases Town House beauty by 25%",
                key: "town-house-1",
                cost: 115000000000,
                requires: ["colosseum-1"],
                spriteIndex: [1, 3],
                position: [0, 1]
            },
            {
                name: "Get Off My Lawn!",
                description: "Increases Manor beauty by 25%",
                key: "manor-1",
                cost: 864000000000,
                requires: ["town-house-1"],
                spriteIndex: [2, 3],
                position: [0, 2]
            },
            {
                name: "Stop and Smell the Roses",
                description: "Increases Natural Landmark's beauty by 50%",
                key: "landmark-beauty-1",
                cost: 1234000000000,
                requires: ["manor-1"],
                spriteIndex: [3, 3],
                position: [0, 3]
            },
            {
                name: "Greased Gears",
                description: "Increases Windmill power production by 50%",
                key: "windmill-1",
                cost: 321000000000,
                requires: [],
                spriteIndex: [4, 3],
                position: [2, 0]
            },
            {
                name: "Efficient Powerlines",
                description: "Decreases global power requirement by 10%",
                key: "all-power-1",
                cost: 950000000000,
                requires: ["windmill-1"],
                spriteIndex: [5, 3],
                position: [2, 2]
            },
            {
                name: "Denser Hops (idk how beer is made)",
                description: "Increase Brewery food production by 50%",
                key: "brewery-1",
                cost: 64000000000,
                requires: [],
                spriteIndex: [6, 3],
                position: [4, 0]
            },
            {
                name: "Harpoons.",
                description: "Increase Galleon food production by 50%",
                key: "galleon-1",
                cost: 128000000000,
                requires: ["brewery-1"],
                spriteIndex: [7, 3],
                position: [4, 1]
            },
            {
                name: "Super Food",
                description: "Decreases global food requirement by 10%",
                key: "all-food-2",
                cost: 512000000000,
                requires: ["galleon-1"],
                spriteIndex: [8, 3],
                position: [4, 2]
            },
            {
                name: "National Holiday",
                description: "Regional happiness bonus increased by 100%",
                key: "happy-boost-4",
                cost: 4125000000000,
                requires: ["all-food-2", "all-power-1", "landmark-beauty-1"],
                spriteIndex: [9, 3],
                position: [2, 4]
            },
        ],
    },
    {
        title: "Tier 5",
        icon: [
            {
                name: "Smokestack Filters",
                description: "Reduces Power Plant negative beauty by 30%",
                key: "powerplant-1",
                cost: 21000000000000,
                requires: [],
                spriteIndex: [0, 4],
                position: [0, 0]
            },
            {
                name: "Recycled Tin",
                description: "Reduces Canning Plant negative beauty by 30%",
                key: "canning-plant-1",
                cost: 350000000000000,
                requires: ["powerplant-1"],
                spriteIndex: [1, 4],
                position: [0, 2]
            },
            {
                name: "Material Surplus",
                description: "Reduce the cost of all buildings by 10%",
                key: "building-cost-1",
                cost: 9999000000000,
                requires: [],
                spriteIndex: [2, 4],
                position: [2, 0]
            },
            {
                name: "Eye in the Sky",
                description: "Decrease time between meteor spawns by 25%",
                key: "meteor-spawn-1",
                cost: 16500000000000,
                requires: ["building-cost-1"],
                spriteIndex: [3, 4],
                position: [2, 2]
            },
            {
                name: "High-Power Boilers",
                description: "Increase Power Plant power production by 50%",
                key: "powerplant-2",
                cost: 31500000000000,
                requires: [],
                spriteIndex: [4, 4],
                position: [4, 0]
            },
            {
                name: "Efficient Bulbs",
                description: "Decrease Lighthouse power requirement by 25%",
                key: "lighthouse-1",
                cost: 38000000000000,
                requires: ["powerplant-2"],
                spriteIndex: [5, 4],
                position: [4, 1]
            },
            {
                name: "Heat Conservation",
                description: "Decrease Apartment power requirement by 25%",
                key: "apartment-1",
                cost: 52000000000000,
                requires: ["lighthouse-1"],
                spriteIndex: [6, 4],
                position: [4, 2]
            },
            {
                name: "Manual Paper Shredders",
                description: "Decrease Town Hall power requirement by 25%",
                key: "townhall-1",
                cost: 64200000000000,
                requires: ["apartment-1"],
                spriteIndex: [7, 4],
                position: [4, 3]
            },
            {
                name: "World's Fair",
                description: "Regional happiness bonus increased by 100%",
                key: "happy-boost-5",
                cost: 555000000000000,
                requires: ["meteor-spawn-1", "canning-plant-1", "townhall-1"],
                spriteIndex: [8, 4],
                position: [2, 4]
            },
        ],
    },
];