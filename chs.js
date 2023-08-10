/*

 @name    : 锅巴汉化 - Web汉化插件
 @author  : 麦子、JAR、小蓝、好阳光的小锅巴
 @version : V0.6.1 - 2019-07-09
 @website : http://www.g8hh.com
 @idle games : http://www.gityx.com
 @QQ Group : 627141737

*/

//1.汉化杂项
var cnItems = {
    _OTHER_: [],

    //未分类：
    'Save': '保存',
    'Export': '导出',
    'Import': '导入',
    'Settings': '设置',
    'Achievements': '成就',
    'Statistics': '统计',
    'Changelog': '更新日志',
    'Hotkeys': '快捷键',
    'ALL': '全部',
    'Default': '默认',
    'AUTO': '自动',
    'default': '默认',
    "points": "点数",
    "Reset for +": "重置得到 + ",
    "Currently": "当前",
    "Effect": "效果",
    "Cost": "成本",
    "Goal:": "目标:",
    "Reward": "奖励",
    "Start": "开始",
    "Exit Early": "提前退出",
    "Finish": "完成",
    "Milestone Gotten!": "获得里程碑！",
    "Milestones": "里程碑",
    "Completed": "已完成",
    "Default Save": "默认存档",
    "Delete": "删除",
    "No": "否",
    "Saves": "存档",
    "Options": "选项",
    "Yes": "是",
    "Are you sure?": "你确定吗？",
    "Edit Name": "编辑名称",
    "Info": "信息",
    "Currently:": "当前:",
    "Appearance": "外观",
    "How the game looks.": "游戏看起来如何。",
    "Theme": "主题",
    "Show milestones": "显示里程碑",
    "Show TPS meter at the bottom-left corner of the page.": "在页面左下角显示 TPS。",
    "Show TPS": "显示 TPS",
    "None": "无",
    "Align modifier units": "对齐概览单位",
    "Align numbers to the beginning of the unit in modifier view.": "在概览视图中将数字与单元的开头对齐。",
    "Select which milestones to display based on criterias.": "根据标准选择要显示的里程碑。",
    "All": "全部",
    "Classic": "经典",
    "Configurable": "可配置",
    "Duplicate": "复制",
    "Click to Continue": "点击继续",
    "Idle Region": "区域放置",
    "Loading": "加载中",
    "Loading Fonts": "加载字体",
    "Loading Images": "加载图像",
    "test text": "测试文本",
    "Your save file appears to be broken or too far out of date. Press \"F\" to continue.": "您的保存文件似乎已损坏或过时。 按“F”继续。",
    "Residents happy with surroundings but yearn for more": "居民对周围环境感到满意，但渴望更多",
    "\"I'm pretty sure its raining.\"": "“我敢肯定在下雨。”",
    "\"I'm stunned by the beauty here\"": "\“我被这里的美丽惊呆了”",
    "< Overview": "< 概览",
    "Food supplies dwindling as residents demand more": "由于居民需求增加，食品供应减少",
    "Local pigs find solace in freshly mudded ground": "当地的猪在新泥泞的土地上找到了安慰",
    "Wild Expanse's air quality reaches all time high": "辽阔荒野 的空气质量达到历史最高水平",
    "\"I'm pretty sure its sunny.\"": "“我很确定天气晴朗。”",
    "Poor rations cut into citizen's morale": "口粮不足削弱了公民的士气",
    "Residents proud to be living in such beautiful region": "居民为生活在如此美丽的地区而感到自豪",
    "Some of these changes may break older saves (sorry).": "其中一些更改可能会破坏旧的保存（抱歉）。",
    "This game is currently a work in progress.": "该游戏目前还在开发中。",
    "Updates may be frequent and might change or introduce new game elements.": "更新可能会很频繁，并且可能会更改或引入新的游戏元素。",
    "Welcome to Idle Region!": "欢迎来到区域放置！",
    "Wild Expanse's weather outlook sunny": "Wild Expense 天气预报 晴",
    "• Use the side panel to purchase a Forager": "• 使用侧面面板购买 采集者",
    "Wild Expanse Residents starving as food supplies dwindle": "食物供应减少，荒野居民挨饿了",
    "• Blue-titled towers produce money and will boost surrounding tiles in a radius that is specific to each tower.": "• 蓝色标题的塔会产生金钱，并会在每个塔特定的半径内增强周围的地块。",
    "• Click the Forager in your inventory to select it, and then place it onto some grass": "• 单击库存中的觅食者将其选中，然后将其放置在草地上",
    "• Green-titled towers produce money and also house population for your region when placed on the map.": "• 绿色标题的塔楼放置在地图上时可以为您所在地区带来金钱并容纳人口。",
    "• Use the side panel to purchase a Forager": "• 使用侧面板购买 Forager",
    "• Yellow-titled towers are the most basic and will only produce money.": "• 黄色标题的塔是最基本的，只会产生金钱。",
    "A pretty pile of petals": "一堆漂亮的花瓣",
    "A shady place to stay": "一个阴凉的住宿地点",
    "A shrub octad": "灌木八角形",
    "A small amount of greenery": "少量绿化",
    "A sure sign of ceramic activity": "陶瓷活动的明确标志",
    "A:   Achievements window": "A：成就窗口",
    "Ancient wonders": "古代奇观",
    "Asphalt assault": "沥青袭击",
    "Bobbing for apples": "鲍勃苹果",
    "Brick Road": "砖路",
    "Building Effects": "建筑效果",
    "Buildings": "建筑物",
    "Buildings are color-coded based on effects they have when placed onto the map:": "建筑物根据放置在地图上时的效果进行颜色编码：",
    "Bushes": "灌木丛",
    "Cave Den": "洞穴巢穴",
    "Citizens praise sunny skies, loathe hot weather": "市民称赞晴天，厌恶炎热天气",
    "Cobblestone Path": "鹅卵石路",
    "Control + Click: Quick-select hovered tower": "Control + 单击：快速选择悬停塔",
    "Ctrl + Number: Change tile type": "Ctrl + 数字：更改图块类型",
    "Cultivator": "耕耘者",
    "Dense Trees": "茂密的树木",
    "E-R: Adjust game board zoom": "E-R：调整游戏板缩放",
    "Each signed law has a cost, or a previous requirement that must be met in order to be purchased.": "每项签署的法律都有一定的成本，或者必须满足之前的要求才能购买。",
    "Edicts": "法令",
    "Edicts can be a very powerful resource when dealing with resource shortcomings in your region.": "在处理您所在地区的资源短缺问题时，法令可以成为非常强大的资源。",
    "Fire Pit": "火坑",
    "Fishing Hut": "钓鱼小屋",
    "Flower Bed": "花坛",
    "Forager": "觅食者",
    "Fulfilling these requests will boost the overall production in your region, and your earnings per-click.": "满足这些要求将提高您所在地区的整体产量以及每次点击的收入。",
    "Garden": "花园",
    "Garden (Inverted)": "花园（倒置）",
    "Gardenway": "花园小路",
    "Going off the rails": "出轨",
    "H:   Help window": "H：帮助窗口",
    "Highway": "高速公路",
    "Hunter": "猎人",
    "I deliver the goods": "我发货",
    "Keys 1 - 8: Select tower": "键 1 - 8：选择塔",
    "Light in the dark": "黑暗中的光",
    "Light Trees": "稀疏的树",
    "More longevity": "更长寿",
    "My other roommate is a bear": "我的另一个室友是一只熊",
    "Natural Landmarks": "自然地标",
    "O:   Options window": "O：选项窗口",
    "Obelisk": "方尖碑",
    "Offline earnings are capped at a two hour maximum. This may be changed in the future.": "离线收入上限为两小时。 这将来可能会改变。",
    "Organized organics": "有组织的有机物",
    "Organized organics, but inverted": "有组织的有机物，但倒置",
    "P:   Edicts window": "P：法令窗口",
    "Part the blue seas": "分开蓝色的大海",
    "Paved Street": "铺好的街道",
    "Population and Strategies": "人口与策略",
    "Q:   Toggle map grid": "问：切换地图网格",
    "Railroad": "铁路",
    "Region Needs": "地区需求",
    "Resources are affected the same way that earnings are calculated, taking the tile's boost bonus and any bordering path's production bonus.": "资源受到影响的方式与计算收入的方式相同，采用图块的提升奖励和任何边界路径的生产奖励。",
    "Right Click + Drag: Move the game board": "右键单击+拖动：移动游戏板",
    "S:   Stats window": "S：统计窗口",
    "Scroll Wheel: Adjust game board zoom": "滚轮：调整游戏板缩放",
    "Settlement": "定居点",
    "Shift + Number: Change building tier": "Shift + 数字：更改建筑层",
    "Some are more expensive to remove than others, so factor that in when you pick a starting location.": "有些的移除成本比其他的要高，因此在选择起始位置时要考虑到这一点。",
    "Some buildings will require a path in any of the 4 bordering tiles to function at max capacity.": "有些建筑物需要在 4 个边界块中的任何一个上有一条路径才能以最大容量运行。",
    "Some towers may have a combination of effect types. All of their effects will work the same as described above, and their names will show a gradient between the speficied effect types.": "有些塔可能具有多种效果类型的组合。 它们的所有效果都将与上述相同，并且它们的名称将显示指定效果类型之间的渐变。",
    "Speedy speedy": "快快快",
    "Stonehenge": "巨石阵",
    "Storehouse": "仓库",
    "The path more traveled": "更多走出来的路",
    "The scenic route": "风景路线",
    "There are a handful of resources your region needs to stay happy.": "您所在的地区需要一些资源才能保持快乐。",
    "There goes the neighborhood": "那里去邻居",
    "Tier: 1": "等级：1",
    "Tilling enriches the soil": "耕作使土壤肥沃",
    "To view a breakdown of your resources, refer either to the Overview window or the first page of your edict book.": "要查看资源的详细信息，请参阅“概述”窗口或法令书的第一页。",
    "Towering above all": "高耸于一切之上",
    "Towers will either request or supply one of these resources, and are tallied globally.": "塔将请求或提供其中一种资源，并在全局范围内进行统计。",
    "Trodden Path": "走出来的路",
    "Two birds with one stone": "一石二鸟",
    "W:   Toggle boost grid": "W：切换增强网格",
    "When you buy a building from the menu on the left, it is added to your inventory. You can then place this building onto the map.": "当您从左侧菜单购买建筑物时，它将添加到您的库存中。 然后您可以将该建筑物放置到地图上。",
    "Wild Expanse Residents starving as food supplies dwindle": "食物供应减少，辽阔荒野 居民挨饿了",
    "Wooden Bridge": "木桥",
    "X:   Toggle tile destroyer": "X：切换地块破坏者",
    "You can organize your region's towers based on your style of play - either idle, active, or a mixture of both.": "您可以根据您的游戏风格来组织您所在地区的塔楼 - 闲置、活动或两者的混合。",
    "You can remove the natural landmarks on the map at a cost based on your current earnings per-second.": "您可以删除地图上的自然地标，费用取决于您当前的每秒收入。",
    "You can use the edict book to pass laws and gain new tower upgrades": "您可以使用法令书来通过法律并获得新的塔升级",
    "You can't tuna fish, but you can fish tuna": "你不能钓金枪鱼，但你可以钓金枪鱼",
    "Your earnings-per-second are based on the combined earnings from buildings on the map.": "您的每秒收入基于地图上建筑物的综合收入。",
    "Your region's population correlates directly to how much you earn per-click. (plus any regional happiness bonus)": "您所在地区的人口与您每次点击赚取的收入直接相关。 （加上任何地区幸福奖金）",
    "Z:   Toggle tile inspector": "Z：切换图块检查器",
    "Crop season in full swing as summer rays bolster field growth": "夏季阳光促进田地生长，作物季节如火如荼地进行",
    "Inspected a Tile With the Tile Inspector": "使用地块检查器检查地块",
    "Meteorologists predict heavy rain in the coming days": "气象学家预测未来几天将有大雨",
    "What Do We Have Here?": "我们有什么在这里？",
    "Wild Expanse": "辽阔荒野",
    "A New Coat of House Paint": "房屋油漆的新涂层",
    "Advanced Fertilizer": "高级肥料",
    "All Roads Lead to You": "条条大路通向你",
    "Ambience Volume": "环境音量",
    "Audio": "音频",
    "Audio Settings": "音频设置",
    "Boost Food production of all land buildings by 15%": "将所有土地建筑的粮食产量提高 15%",
    "Boost Food production of all water buildings by 25%": "将所有水建筑的粮食产量提高 25%",
    "Bronze Age Bait": "青铜时代诱饵",
    "Cause for Celebration": "庆祝的理由",
    "Chalk Scratch": "粉笔划痕",
    "Clean-Up Crew": "清洁人员",
    "Click the Giant Rock 10 Times": "单击巨石 10 次",
    "Crop Rotation": "轮作",
    "Decrease Apartment power requirement by 25%": "将公寓电力需求减少 25%",
    "Decrease Lighthouse power requirement by 25%": "将灯塔电力需求减少 25%",
    "Decrease time between meteor spawns by 25%": "流星生成间隔时间缩短 25%",
    "Decrease Town Hall power requirement by 25%": "将市政厅电力需求减少 25%",
    "Decreases all pathing costs by 50%": "将所有路径成本降低 50%",
    "Decreases global beauty requirement by 10%": "全局美容要求降低 10%",
    "Decreases global food requirement by 10%": "全局粮食需求量减少 10%",
    "Decreases global food requirement by 5%": "全局粮食需求量减少 5%",
    "Decreases global power requirement by 10%": "将全局电力需求降低 10%",
    "Decreases global worker requirement by 10%": "全局工人需求减少 10%",
    "Decreases global worker requirement by 5%": "全局工人需求减少 5%",
    "Decreases Lumberjack worker requirement by 40%": "将伐木工工人需求减少 40%",
    "Decreases natural landmark removal price by 50%": "将自然地标移除价格降低 50%",
    "Decreases Stoneworks worker requirement by 25%": "将 石材厂 工人需求减少 25%",
    "Deep Sea Harvesting": "深海捕捞",
    "Denser Hops (idk how beer is made)": "密集啤酒花（不知道啤酒是如何酿造的）",
    "Earn $50 Clicking the Giant Rock": "点击巨石赚取 $50",
    "Efficient Bulbs": "高效灯泡",
    "Efficient Powerlines": "高效的电力线",
    "Enable Autosave": "启用自动保存",
    "Enable Lightning": "启用闪电",
    "Enable Tower Lights": "启用塔灯",
    "Enable Water Reflections": "启用水中倒影",
    "Enable Weather": "启用天气",
    "Extra Apples": "额外的苹果",
    "Extra Caverns": "额外的洞穴",
    "Eye in the Sky": "天空之眼",
    "Furnace Filtration": "炉过滤",
    "Game": "游戏",
    "Game Settings": "游戏设置",
    "Get Off My Lawn!": "从我的草坪上离开！",
    "Graphics": "图形",
    "Graphics Settings": "图形设置",
    "Grass": "草地",
    "Greased Gears": "润滑齿轮",
    "Gui Scale:  Small  Medium  Large": "Gui 规模: 小 中 大",
    "Harpoons.": "鱼叉。",
    "Harvest Festival": "丰收节日",
    "Heat Conservation": "保温",
    "High-Power Boilers": "大功率锅炉",
    "Increase Brewery food production by 50%": "将啤酒厂食品产量提高 50%",
    "Increase Cultivator food production by 25%": "耕耘者粮食产量增加 25%",
    "Increase Farmland food production by 25%": "农田粮食产量增加 25%",
    "Increase Fishing Hut food production by 25%": "将钓鱼小屋粮食产量提高 25%",
    "Increase Forager food production by 25%": "将觅食者粮食产量提高 25%",
    "Increase Galleon food production by 50%": "帆船粮食产量增加 50%",
    "Increase Hunter food production by 25%": "猎人粮食产量增加 25%",
    "Increase Power Plant power production by 50%": "将发电厂发电量提高 50%",
    "Increase Rancher food production by 25%": "将牧场主粮食产量提高 25%",
    "Increase Trawler food production by 25%": "拖网渔船粮食产量增加 25%",
    "Increases Cave Hut worker production by 50%": "将 Cave Hut 工人的产量提高 50%",
    "Increases Colosseum beauty by 25%": "斗兽场的美丽程度提高 25%",
    "Increases Manor beauty by 25%": "庄园美丽度提高 25%",
    "Increases Natural Landmark's beauty by 50%": "使自然地标的美丽度提高 50%",
    "Increases Settlement worker production by 50%": "将定居点工人的产量提高 50%",
    "Increases Town House beauty by 25%": "联排别墅美观度提高 25%",
    "Increases Windmill power production by 50%": "将风车发电量提高 50%",
    "Irrigation Systems": "灌溉系统",
    "Join the Idle Region Discord!": "加入区域放置 Discord！",
    "Land": "土地",
    "Land Expansion": "土地扩张",
    "Larger Troughs": "更大的槽",
    "Locked Achievement": "锁定成就",
    "Manual Paper Shredders": "手动碎纸机",
    "Material Surplus": "物质剩余",
    "Muffled Chisels": "消音凿子",
    "National Holiday": "法定假日",
    "Permanent Day": "永久日",
    "Pretty Flames": "漂亮的火焰",
    "Pretty Pigs": "漂亮的猪",
    "Recycled Tin": "再生锡",
    "Reduce the cost of all buildings by 10%": "将所有建筑物的成本降低 10%",
    "Reduces Canning Plant negative beauty by 30%": "罐头厂负面美感减少 30%",
    "Reduces Charcoaler negative beauty by 50%": "减少烧炭者负面美感 50%",
    "Reduces Fire Pit negative beauty by 50%": "火坑负面美感减少 50%",
    "Reduces Power Plant negative beauty by 30%": "电厂负面美感减少 30%",
    "Reduces Rancher negative beauty by 50%": "减少 Rancher 负面美感 50%",
    "Reduces Stone Mason negative beauty by 50%": "石匠负面美感减少 50%",
    "Regional happiness bonus increased by 100%": "区域幸福加成提升100%",
    "Renaissance Fair": "文艺复兴博览会",
    "Return": "返回",
    "Rock Clicker": "石头点击者",
    "Sharper Axes": "更锋利的斧头",
    "Sharper Spears": "更锋利的矛",
    "Shore": "海岸",
    "Show Fps": "显示帧率",
    "Show News Ticker": "显示新闻动态",
    "Show Raw Resource Numbers": "显示原始资源编号",
    "Smaller Portions": "较小份量",
    "Smog-Tinted Glasses": "雾霾有色眼镜",
    "Smokestack Filters": "烟囱过滤器",
    "Social Links": "社交链接",
    "Socials": "社交",
    "Softer Marble": "较软的大理石",
    "Stop and Smell the Roses": "停下来闻闻玫瑰花香",
    "Super Food": "超级食物",
    "UI Volume": "用户界面音量",
    "Unknown Requirement": "未知要求",
    "Village Apprentice": "乡村学徒",
    "Wider Nets": "更广泛的网络",
    "World's Fair": "世界博览会",
    "#1 Apple Distributor": "#1 苹果经销商",
    "A Humble Beginning": "卑微的开始",
    "A Meteor Has Landed": "一颗流星降落了",
    "Building": "建筑",
    "Earn $100 in Your Region": "在您所在地区赚取 $100",
    "Find it on the map and click to gain a powerup!": "在地图上找到它并单击即可获得能量提升！",
    "Fruit trees spring up around Wild Expanse": "Wild Expanse 周围果树如雨后春笋般生长",
    "Industries clamoring to fill positions": "各行业争先恐后地填补职位空缺",
    "Local wildlife stirred by expanding settlement": "扩大定居点扰动了当地野生动物",
    "Meteorologists urge Wild Expanse citizens to stay inside": "气象学家敦促 Wild Expanse 居民呆在室内",
    "Path": "道路",
    "Path network springs up through Wild Expanse": "路径网络在 辽阔荒野 中涌现",
    "Place 1 Building": "放置 1 建筑",
    "Scenery": "风景",
    "• Place the Cultivator so that its boost radius covers the Forager": "• 放置耕耘者，使其提升半径覆盖范围内的觅食者",
    "Community markets turn into ghost towns as worker supply dwindles": "随着工人供应的减少，社区市场变成了鬼城",
    "Region experiences once-in-a-lifetime solar eclipse": "该地区经历千载难逢的日食",
    "Stores shutting down due to lack of employment": "商店因缺乏就业机会而关门",
    "\"I would live in Wild Expanse\" - Sam_Chug": "“我会住在Wild Expanse” - Sam_Chug",
    "\"My fires went out.\" - Wild Expanse Charcoaler": "“我的火熄灭了。”——辽阔荒野烧炭者",
    "Dozens of new residents roll into Wild Expanse": "数十名新居民涌入 辽阔荒野",
    "Earn $10,000 in Your Region": "在您所在地区赚取 $10,000",
    "Local wolves howl at full moon": "当地狼在满月时嚎叫",
    "Meteorologists assure fair weather in the coming days": "气象学家保证未来几天天气晴朗",
    "Residents stunned by untouched environment": "居民对未受破坏的环境感到震惊",
    "Stargazers dumbfounded by falling rocks": "观星者被落下的岩石惊呆了",
    "Ten Big Ones": "十大人物",
    "Wild Expanse children find time to play in the rain": "辽阔荒野 的孩子们有时间在雨中玩耍",
    "Wild Expanse Fields raise maize in new corn craze": "辽阔荒野 在新的玉米热潮中种植玉米",
    "\"Finally, some fresh meat.\" - Wild Expanse Hunter": "“终于来了一些新鲜的肉。”——狂野猎人",
    "\"I hope there isn't a bear in here\" - Cave Explorer": "“我希望这里没有熊”——洞穴探险家",
    "\"Thanks for playing Idle Region!\" - Sam_Chug": "“感谢您玩《区域放置》！” - Sam_Chug",
    "*Sticks thumb up* *Dramatially turns thumb down slowly*": "*竖起拇指* *急剧地缓慢地向下转动拇指*",
    "A beacon in the dark": "黑暗中的灯塔",
    "Apartments": "公寓",
    "Automatic log chopper": "自动伐木",
    "Battlement barrier": "城垛屏障",
    "Bazaar": "市场",
    "Blacksmith": "铁匠",
    "Brewery": "啤酒厂",
    "Brick sculpters": "砖雕师",
    "Burns stuff... to make something burnable?": "燃烧东西……使东西可燃？",
    "Canal": "运河",
    "Canning Plant": "罐头厂",
    "Car corral": "车棚",
    "Cargo Ship": "货船",
    "Castle Wall": "城堡墙",
    "Ceramist": "陶艺家",
    "Charcoaler": "炭化器",
    "Chipping away": "小打小闹",
    "Chop chop chop": "砍砍砍砍",
    "Colosseum": "斗兽场",
    "Come sail away": "快来扬帆远航",
    "Courthouse": "法院",
    "Erm... where are the corners...": "呃……角落在哪里……",
    "Farmland": "农田",
    "Fishy on me": "我身上有鱼腥味",
    "Fortress": "堡垒",
    "From the earth": "来自地球",
    "Galleon": "帆船",
    "Geometry objectified": "几何对象化",
    "Great deals!": "超值优惠！",
    "Hi-diddly-ho neighborino": "嘿嘿嘿邻居",
    "Hospital": "医院",
    "Hut": "小屋",
    "I grow the corn": "我种玉米",
    "Industrial Junk": "工业垃圾",
    "It's over when the fish jumps...": "当鱼跳起来的时候就结束了",
    "Junk Pile": "垃圾堆",
    "Keep off the grass": "不要踩踏草坪",
    "Keep the cows at home": "把牛留在家里",
    "Lays down the law": "制定法律",
    "Lighthouse": "灯塔",
    "Log Cabin": "木屋",
    "Long-term food solution": "长期食品解决方案",
    "Lumberjack": "伐木工",
    "Manor": "庄园",
    "Miner": "矿工",
    "Must be placed on grass": "必须放置在草地上",
    "Must be placed on land": "必须放置在陆地上",
    "Must be placed on shoreline": "必须放置在海岸线上",
    "Once fired": "一旦被解雇",
    "One big house": "一间大房子",
    "One kind of liquid gold": "一种液体黄金",
    "Our mayor, rendered in gold": "我们的市长，以金色呈现",
    "Packed in": "包装于",
    "Park": "公园",
    "Parking Lot": "停车场",
    "Power Plant": "发电厂",
    "Pure metal": "纯金属",
    "Put the air to work": "让空气发挥作用",
    "Pyramid": "金字塔",
    "Rancher": "牧场主",
    "Rock Buster": "摇滚克星",
    "Roundhouse": "圆屋",
    "Safe and sound": "安然无恙",
    "Sawmill": "锯木厂",
    "Scalpel please": "请用手术刀",
    "Shore/land": "岸/陆",
    "Shore/water": "岸边/水域",
    "Simple, rustic, honest, local": "简单、质朴、诚实、本土",
    "Some extra juice": "一些额外的果汁",
    "Statue": "雕塑",
    "Stone Mason": "石匠",
    "Stoneworks": "石材厂",
    "Stow away": "收起",
    "Town Hall": "市政厅",
    "Town Houses": "联排别墅",
    "Trawler": "拖网渔船",
    "Tubes and pipes": "管材和管道",
    "Two if by sea": "两个如果是海上的话",
    "Warehouse": "仓库",
    "Waste not, want not": "不浪费，不想要",
    "Water": "水",
    "Wet means of transport": "潮湿的交通工具",
    "Wharf": "码头",
    "What is wattle? And what is daub?": "什么是荆棘？ 什么是涂抹？",
    "Windmill": "风车",
    "Yea or nay": "是或否",
    "A Place to Walk": "散步的地方",
    "Country Roads": "乡村道路",
    "Goods fill up brand new Storehouse in Wild Expanse": "货物填满了 辽阔荒野 的全新仓库",
    "Happy Little Tree": "快乐小树",
    "Must be placed on shores or water": "必须放置在海岸或水上",
    "Placed a Scenery Tile": "放置了风景瓷砖",
    "The Road Less Traveled": "少有人走的路",
    "Citizens take to the ocean as new Fishing Hut built": "随着新钓鱼小屋的建成，市民们开始走向大海",
    "A Small Gathering": "小型聚会",
    "Boosted a Tower With Another Tower": "用另一座塔提升一座塔",
    "Citizens working overtime as workforce dwindles": "随着劳动力减少，公民加班",
    "Earn $500,000 in Your Region": "在您所在地区赚取 500,000 美元",
    "Fishy Money": "可疑的钱",
    "Now We're Cooking!": "现在我们做饭了！",
    "Reached 10 Region Population": "达到10个地区人口",
    "Residents find community in new Settlement": "居民在新定居点找到社区",
    "Residents skipping the brunch, sources say": "消息人士称，居民不吃早午餐",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    // 图标代码，不能汉化
    "Jacorb's Games": "Jacorb's Games",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "Scientific": "科学计数法",
    "Standard": "标准",
    "Blind": "盲文",
    "Letters": "字母",
    "Mixed Engineering": "混合工程",
    "Mixed Scientific": "混合科学",
    "Chemistry": "化学",
    "Engineering": "工程符号",
    "By Jacorb90": "By Jacorb90",
    "content_copy": "content_copy",
    "library_books": "library_books",
    "discord": "discord",
    "drag_handle": "drag_handle",
    "edit": "edit",
    "forum": "forum",
    "content_paste": "content_paste",
    "delete": "delete",
    "info": "info",
    "settings": "settings",

    //树游戏
    'Loading...': '加载中...',
    'ALWAYS': '一直',
    'HARD RESET': '硬重置',
    'Export to clipboard': '导出到剪切板',
    'INCOMPLETE': '不完整',
    'HIDDEN': '隐藏',
    'AUTOMATION': '自动',
    'NEVER': '从不',
    'ON': '打开',
    'OFF': '关闭',
    'SHOWN': '显示',
    'Play Again': '再次游戏',
    'Keep Going': '继续',
    'The Modding Tree Discord': '模型树Discord',
    'You have': '你有',
    'It took you {{formatTime(player.timePlayed)}} to beat the game.': '花费了 {{formatTime(player.timePlayed)}} 时间去通关游戏.',
    'Congratulations! You have reached the end and beaten this game, but for now...': '恭喜你！ 您已经结束并通关了本游戏，但就目前而言...',
    'Main Prestige Tree server': '主声望树服务器',
    'Reach {{formatWhole(ENDGAME)}} to beat the game!': '达到 {{formatWhole(ENDGAME)}} 去通关游戏!',
    "Loading... (If this takes too long it means there was a serious error!": "正在加载...（如果这花费的时间太长，则表示存在严重错误！",
    'Loading... (If this takes too long it means there was a serious error!)←': '正在加载...（如果时间太长，则表示存在严重错误！）←',
    'Main\n\t\t\t\tPrestige Tree server': '主\n\t\t\t\t声望树服务器',
    'The Modding Tree\n\t\t\t\t\t\t\tDiscord': '模型树\n\t\t\t\t\t\t\tDiscord',
    'Please check the Discord to see if there are new content updates!': '请检查 Discord 以查看是否有新的内容更新！',
    'aqua': '水色',
    'AUTOMATION, INCOMPLETE': '自动化，不完整',
    'LAST, AUTO, INCOMPLETE': '最后，自动，不完整',
    'NONE': '无',
    'P: Reset for': 'P: 重置获得',
    'Git游戏': 'Git游戏',
    'QQ群号': 'QQ群号',
    'x': 'x',
    'QQ群号:': 'QQ群号:',
    '* 启用后台游戏': '* 启用后台游戏',
    '更多同类游戏:': '更多同类游戏:',
    'i': 'i',
    'I': 'I',
    'II': 'I',
    'III': 'III',
    'IV': 'IV',
    'V': 'V',
    'VI': 'VI',
    'VII': 'VII',
    'VIII': 'VIII',
    'X': 'X',
    'XI': 'XI',
    'XII': 'XII',
    'XIII': 'XIII',
    'XIV': 'XIV',
    'XV': 'XV',
    'XVI': 'XVI',
    'A': 'A',
    'B': 'B',
    'C': 'C',
    'D': 'D',
    'E': 'E',
    'F': 'F',
    'G': 'G',
    'H': 'H',
    'I': 'I',
    'J': 'J',
    'K': 'K',
    'L': 'L',
    'M': 'M',
    'N': 'N',
    'O': 'O',
    'P': 'P',
    'Q': 'Q',
    'R': 'R',
    'S': 'S',
    'T': 'T',
    'U': 'U',
    'V': 'V',
    'W': 'W',
    'X': 'X',
    'Y': 'Y',
    'Z': 'Z',
    'v0.3.3a': 'v0.3.3a',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',

}


//需处理的前缀，此处可以截取语句开头部分的内容进行汉化
//例如：Coin: 13、Coin: 14、Coin: 15... 这种有相同开头的语句
//可以在这里汉化开头："Coin: ":"金币: "
var cnPrefix = {
    "\n": "\n",
    "                   ": "",
    "                  ": "",
    "                 ": "",
    "                ": "",
    "               ": "",
    "              ": "",
    "             ": "",
    "            ": "",
    "           ": "",
    "          ": "",
    "         ": "",
    "        ": "",
    "       ": "",
    "      ": "",
    "     ": "",
    "    ": "",
    "   ": "",
    "  ": " ",
    " ": " ",
    //树游戏
    "\t\t\t": "\t\t\t",
    "\n\n\t\t": "\n\n\t\t",
    "\n\t\t": "\n\t\t",
    "\t": "\t",
    "Show Milestones: ": "显示里程碑：",
    "Autosave: ": "自动保存: ",
    "Offline Prod: ": "离线生产: ",
    "Completed Challenges: ": "完成的挑战: ",
    "High-Quality Tree: ": "高质量树贴图: ",
    "Offline Time: ": "离线时间: ",
    "Theme: ": "主题: ",
    "Anti-Epilepsy Mode: ": "抗癫痫模式：",
    "In-line Exponent: ": "直列指数：",
    "Single-Tab Mode: ": "单标签模式：",
    "Time Played: ": "已玩时长：",
    "Shift-Click to Toggle Tooltips: ": "Shift-单击以切换工具提示：",
    "Notation: ": "符号: ",
    "Tier: ": "层级: ",
    "Workers: ": "工人: ",
    "Food:": "食物:",
    "Beauty:": "美观:",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
}

//需处理的后缀，此处可以截取语句结尾部分的内容进行汉化
//例如：13 Coin、14 Coin、15 Coin... 这种有相同结尾的语句
//可以在这里汉化结尾：" Coin":" 金币"
var cnPostfix = {
    "                   ": "",
    "                  ": "",
    "                 ": "",
    "                ": "",
    "               ": "",
    "              ": "",
    "             ": "",
    "            ": "",
    "           ": "",
    "          ": "",
    "         ": "",
    "        ": "",
    "       ": "",
    "      ": "",
    "     ": "",
    "    ": "",
    "   ": "",
    "  ": "  ",
    " ": " ",
    "\n": "\n",
    "\n\t\t\t": "\n\t\t\t",
    "\t\t\n\t\t": "\t\t\n\t\t",
    "\t\t\t\t": "\t\t\t\t",
    "\n\t\t": "\n\t\t",
    "\t": "\t",
    " - Local Meteorologist": " - 当地气象学家",
    " - Wild Expanse Bystander": " - 辽阔荒野 旁观者",
    "": "",
    "": "",
    "": "",
    "": "",
}

//需排除的，正则匹配
var cnExcludeWhole = [
    /^(\d+)$/,
    /^\s*$/, //纯空格
    /^([\d\.]+):([\d\.]+)$/,
    /^([\d\.]+):([\d\.]+):([\d\.]+)$/,
    /^([\d\.]+):([\d\.]+):([\d\.]+):([\d\.]+)$/,
    /^([\d\.]+):([\d\.]+):([\d\.]+):([\d\.]+):([\d\.]+)$/,
    /^([\d\.]+)h ([\d\.]+)m ([\d\.]+)s$/,
    /^([\d\.]+)y ([\d\.]+)d ([\d\.]+)h$/,
    /^([\d\.]+)\-([\d\.]+)\-([\d\.]+)$/,
    /^([\d\.]+)e(\d+)$/,
    /^([\d\.]+)$/,
    /^\$([\d\.]+)$/,
    /^\(([\d\.]+)\)$/,
    /^([\d\.]+)\%$/,
    /^    ([\d\.]+)\%$/,
    /^([\d\.]+)\/([\d\.]+)$/,
    /^\(([\d\.]+)\/([\d\.]+)\)$/,
    /^成本(.+)$/,
    /^\(([\d\.]+)\%\)$/,
    /^([\d\.]+):([\d\.]+):([\d\.]+)$/,
    /^([\d\.]+)K$/,
    /^([\d\.]+)M$/,
    /^([\d\.]+)B$/,
    /^([\d\.]+) K$/,
    /^([\d\.]+) M$/,
    /^([\d\.]+) B$/,
    /^([\d\.]+) T$/,
    /^([\d\.]+) Qi$/,
    /^([\d\.]+) Qa$/,
    /^([\d\.]+)s$/,
    /^([\d\.]+)x$/,
    /^x([\d\.]+)$/,
    /^([\d\.,]+)$/,
    /^\$([\d\.,]+)$/,
    /^\+([\d\.,]+)$/,
    /^\-([\d\.,]+)$/,
    /^([\d\.,]+)x$/,
    /^x([\d\.,]+)$/,
    /^([\d\.,]+) \/ ([\d\.,]+)$/,
    /^([\d\.]+)e([\d\.,]+)$/,
    /^\$([\d\.]+)e([\d\.,]+)$/,
    /^([\d\.,]+)\/([\d\.]+)e([\d\.,]+)$/,
    /^([\d\.]+)e([\d\.,]+)\/([\d\.]+)e([\d\.,]+)$/,
    /^([\d\.]+)e\+([\d\.,]+)$/,
    /^e([\d\.]+)e([\d\.,]+)$/,
    /^x([\d\.]+)e([\d\.,]+)$/,
    /^([\d\.]+)e([\d\.,]+)x$/,
    /^[\u4E00-\u9FA5]+$/
];
var cnExcludePostfix = [
]

//正则替换，带数字的固定格式句子
//纯数字：(\d+)
//逗号：([\d\.,]+)
//小数点：([\d\.]+)
//原样输出的字段：(.+)
//换行加空格：\n(.+)
var cnRegReplace = new Map([
    [/^([\d\.]+) hours ([\d\.]+) minutes ([\d\.]+) seconds$/, '$1 小时 $2 分钟 $3 秒'],
    [/^You are gaining (.+) elves per second$/, '你每秒获得 $1 精灵'],
    [/^You have (.+) points$/, '你有 $1 点数'],
    [/^Place (.+) Paths$/, '放置 $1 道路'],
    [/^Next at (.+) points$/, '下一个在 $1 点数'],
    [/^Click the Giant Rock (.+) Times$/, '点击巨石 $1 次'],
    [/^You\'ve earned (.+) since the last time you were here, (.+) seconds ago.$/, '自您上次访问此处（$2 秒前）以来，您已赚取 $1。'],
    [/^Main:(.+)ms\nFX:(.+)ms$/, 'Main:$1ms\nFX:$2ms'],
	[/^([\d\.]+)\/sec$/, '$1\/秒'],
	[/^([\d\.,]+)\/sec$/, '$1\/秒'],
	[/^([\d\.,]+) OOMs\/sec$/, '$1 OOMs\/秒'],
	[/^([\d\.]+) OOMs\/sec$/, '$1 OOMs\/秒'],
	[/^([\d\.]+)e([\d\.,]+)\/sec$/, '$1e$2\/秒'],
    [/^requires ([\d\.]+) more research points$/, '需要$1个研究点'],
    [/^([\d\.]+)e([\d\.,]+) points$/, '$1e$2 点数'],
    [/^([\d\.]+) elves$/, '$1 精灵'],
    [/^([\d\.]+) Beauty$/, '$1 美观'],
    [/^([\d\.]+) Power$/, '$1 电力'],
    [/^\-([\d\.]+) Beauty$/, '\-$1 美观'],
    [/^Produces: \-([\d\.]+) Beauty$/, '产生：\-$1 美观'],
    [/^Produces: ([\d\.]+) Beauty$/, '产生：$1 美观'],
    [/^Produces: ([\d\.]+) Food$/, '产生：$1 食物'],
    [/^Produces: ([\d\.]+) Workers$/, '产生：$1 工人'],
    [/^Requires: ([\d\.]+) Workers$/, '需要：$1 工人'],
    [/^Requires: ([\d\.]+) Power$/, '需要：$1 电力'],
    [/^Produces: ([\d\.]+) Power$/, '产生：$1 电力'],
    [/^([\d\.]+)d ([\d\.]+)h ([\d\.]+)m$/, '$1天 $2小时 $3分'],
    [/^([\d\.]+)e([\d\.,]+) elves$/, '$1e$2 精灵'],
    [/^([\d\.,]+) elves$/, '$1 精灵'],
    [/^([\d\.,]+) Day Weekend$/, '$1 天周末'],
    [/^\*(.+) to electricity gain$/, '\*$1 到电力增益'],
    [/^Cost: (.+) points$/, '成本：$1 点数'],
    [/^Req: (.+) elves$/, '要求：$1 精灵'],
    [/^Req: (.+) \/ (.+) elves$/, '要求：$1 \/ $2 精灵'],
    [/^Usages: (\d+)\/$/, '用途：$1\/'],
    [/^workers: (\d+)\/$/, '工人：$1\/'],

]);