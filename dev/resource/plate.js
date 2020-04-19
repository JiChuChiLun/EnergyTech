// 铜板
IDRegistry.genItemID("plateCopper");
Item.createItem("plateCopper","Copper Plate",{name:"plateCopper"});

// 锡板
IDRegistry.genItemID("plateTin");
Item.createItem("plateTin","Tin Plate",{name:"plateTin"});

// 铁板
IDRegistry.genItemID("plateIron");
Item.createItem("plateIron","Iron Plate",{name:"plateIron"});

// 钢板
IDRegistry.genItemID("plateSteel");
Item.createItem("plateSteel","Steel Plate",{name:"plateSteel"});

// 金板
IDRegistry.genItemID("plateGold");
Item.createItem("plateGold","Gold Plate",{name:"plateGold"});

// 碳板
IDRegistry.genItemID("plateCarbon");
Item.createItem("plateCarbon","Carbon Plate",{name:"plateCarbon"});

// 钨板
IDRegistry.genItemID("plateTungsten");
Item.createItem("plateTungsten","Tungsten Plate",{name:"plateTungsten"});

// 青金石板
IDRegistry.genItemID("plateLapis");
Item.createItem("plateLapis","Lapis Plate",{name:"plateLapis"});

// 铅板
IDRegistry.genItemID("plateLead");
Item.createItem("plateLead","Lead Plate",{name:"plateLead"});

// 铝板
IDRegistry.genItemID("plateAluminium");
Item.createItem("plateAluminium","Aluminium Plate",{name:"plateAluminium"});

// 锑板
IDRegistry.genItemID("plateAntimony");
Item.createItem("plateAntimony","Antimony Plate",{name:"plateAntimony"});

// 恩奈特合金板
IDRegistry.genItemID("plateEnete");
Item.createItem("plateEnete","Enete Alloy Plate",{name:"plateEnete"});

// 铅锑合金板
IDRegistry.genItemID("plateLeadAntimony");
Item.createItem("plateLeadAntimony","Lead-Antimony Alloy Plate",{name:"plateLeadAntimony"});

// 电路板
IDRegistry.genItemID("plateCircuit");
Item.createItem("plateCircuit","Circuit Plate",{name:"plateCircuit"});

// 塑料板
IDRegistry.genItemID("platePlastic");
Item.createItem("platePlastic","Plastic Plate",{name:"platePlastic"});

Callback.addCallback("PreLoaded",function(){
    Item.addCreativeGroup("plate",Translation.translate("Plate"),[
        ItemID.plateCopper,
        ItemID.plateTin,
        ItemID.plateIron,
        ItemID.plateSteel,
        ItemID.plateGold,
        ItemID.plateCarbon,
        ItemID.plateTungsten,
        ItemID.plateLapis,
        ItemID.plateLead,
        ItemID.plateAluminium,
        ItemID.plateAntimony,
        ItemID.plateEnete,
        ItemID.plateLeadAntimony,
        ItemID.plateCircuit,
        ItemID.platePlastic
    ]);

    Recipes.addFurnace(ItemID.resin,ItemID.platePlastic);

    Recipe.addCompressorRecipe({id:ItemID.ingotCopper,data:0},{id:ItemID.plateCopper,count:1,data:0});
    Recipe.addCompressorRecipe({id:ItemID.ingotTin,data:0},{id:ItemID.plateTin,count:1,data:0});
    Recipe.addCompressorRecipe({id:265,data:0},{id:ItemID.plateIron,count:1,data:0});
    Recipe.addCompressorRecipe({id:ItemID.ingotSteel,data:0},{id:ItemID.plateSteel,count:1,data:0});
    Recipe.addCompressorRecipe({id:266,data:0},{id:ItemID.plateGold,count:1,data:0});
    Recipe.addCompressorRecipe({id:ItemID.dustCarbon,data:0},{id:ItemID.plateCarbon,count:1,data:0});
    Recipe.addCompressorRecipe({id:ItemID.ingotTungsten,data:0},{id:ItemID.plateTungsten,count:1,data:0});
    Recipe.addCompressorRecipe({id:351,data:4},{id:ItemID.plateLapis,count:1,data:0});
    Recipe.addCompressorRecipe({id:ItemID.ingotLead,data:0},{id:ItemID.plateLead,count:1,data:0});
    Recipe.addCompressorRecipe({id:ItemID.ingotAluminium,data:0},{id:ItemID.plateAluminium,count:1,data:0});
    Recipe.addCompressorRecipe({id:ItemID.ingotLeadAntimony,data:0},{id:ItemID.plateLeadAntimony,count:1,data:0});
    Recipe.addCompressorRecipe({id:ItemID.ingotAntimony,data:0},{id:ItemID.plateAntimony,count:1,data:0});

    var hammer = Tool.getAllTool("Hammer");
    for(var i in hammer){
        Recipe.addShapeless({id:ItemID.plateCopper,count:1,data:0},[{id:ItemID.ingotCopper,data:0},{id:ItemID.ingotCopper,data:0}],hammer[i]);
        Recipe.addShapeless({id:ItemID.plateTin,count:1,data:0},[{id:ItemID.ingotTin,data:0},{id:ItemID.ingotTin,data:0}],hammer[i]);
        Recipe.addShapeless({id:ItemID.plateIron,count:1,data:0},[{id:265,data:0},{id:265,data:0}],hammer[i]);
        Recipe.addShapeless({id:ItemID.plateSteel,count:1,data:0},[{id:ItemID.ingotSteel,data:0},{id:ItemID.ingotSteel,data:0}],hammer[i]);
        Recipe.addShapeless({id:ItemID.plateGold,count:1,data:0},[{id:266,data:0},{id:266,data:0}],hammer[i]);
        Recipe.addShapeless({id:ItemID.plateCarbon,count:1,data:0},[{id:ItemID.dustCarbon,data:0},{id:ItemID.dustCarbon,data:0}],hammer[i]);
        Recipe.addShapeless({id:ItemID.plateTungsten,count:1,data:0},[{id:ItemID.ingotTungsten,data:0},{id:ItemID.ingotTungsten,data:0}],hammer[i]);
        Recipe.addShapeless({id:ItemID.plateLapis,count:1,data:0},[{id:351,data:4},{id:351,data:4}],hammer[i]);
        Recipe.addShapeless({id:ItemID.plateLead,count:1,data:0},[{id:ItemID.ingotLead,data:0},{id:ItemID.ingotLead,data:0}],hammer[i]);
        Recipe.addShapeless({id:ItemID.plateAluminium,count:1,data:0},[{id:ItemID.ingotAluminium,data:0},{id:ItemID.ingotAluminium,data:0}],hammer[i]);
        Recipe.addShapeless({id:ItemID.plateLeadAntimony,count:1,data:0},[{id:ItemID.ingotLeadAntimony,data:0},{id:ItemID.ingotLeadAntimony ,data:0}],hammer[i]);
        Recipe.addShapeless({id:ItemID.plateAntimony,count:1,data:0},[{id:ItemID.ingotAntimony,data:0},{id:ItemID.ingotAntimony,data:0}],hammer[i]);
        Recipe.addShapeless({id:ItemID.plateEnete,count:1,data:0},[{id:ItemID.ingotEnete,data:0},{id:ItemID.ingotEnete,data:0}],hammer[i]);
        Recipe.addShapeless({id:ItemID.plateCircuit,count:1,data:0},[{id:ItemID.platePlastic,data:0},{id:ItemID.dustSiliconDioxide,data:0}],hammer[i]);
    }
});