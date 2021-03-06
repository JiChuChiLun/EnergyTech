// [破碎机]Crusher
IDRegistry.genBlockID("crusher");
Block.createBlock("crusher",[
    {name:"Crusher",texture:[["machine_bottom",1],["crusher_top",0],["machine_side",1],["crusher",0],["machine_side",1],["machine_side",1]],inCreative:true}
],"machine");
TileRenderer.setStandartModel(BlockID.crusher,[["machine_bottom",1],["crusher_top",0],["machine_side",1],["crusher",0],["machine_side",1],["machine_side",1]]);
TileRenderer.registerRotationModel(BlockID.crusher,0,[["machine_bottom",1],["crusher_top",0],["machine_side",1],["crusher",0],["machine_side",1],["machine_side",1]]);
TileRenderer.registerRotationModel(BlockID.crusher,4,[["machine_bottom",1],["crusher_top",1],["machine_side",1],["crusher",0],["machine_side",1],["machine_side",1]]);
TileRenderer.registerRotationModel(BlockID.crusher,8,[["machine_bottom",1],["crusher_top",1],["machine_side",1],["crusher",1],["machine_side",1],["machine_side",1]]);
TileRenderer.registerRotationModel(BlockID.crusher,12,[["machine_bottom",1],["crusher_top",1],["machine_side",1],["crusher",2],["machine_side",1],["machine_side",1]]);
TileRenderer.registerRotationModel(BlockID.crusher,16,[["machine_bottom",1],["crusher_top",1],["machine_side",1],["crusher",3],["machine_side",1],["machine_side",1]]);

MachineRegistry.setDrop("crusher",BlockID.machineCasing,1);
Callback.addCallback("PreLoaded",function(){
	Recipes.addShaped({id:BlockID.crusher,count:1,data:0},[
        "aba",
        "aca",
        "ded"
    ],["a",ItemID.stickIron,0,"b",ItemID.electricMotor,0,"c",ItemID.circuit,0,"d",ItemID.plateIron,0,"e",BlockID.machineCasing,1]);
});

var GuiCrusher = new UI.StandartWindow({
    standart:{
        header:{text:{text:Translation.translate("Crusher")}},
        inventory:{standart:true},
        background:{standart:true}
    },

    drawing:[
        {type:"bitmap",x:900,y:325,bitmap:"logo",scale:GUI_SCALE},
        {type:"bitmap",x:350,y:50,bitmap:"energy_background",scale:GUI_SCALE},
        {type:"bitmap",x:600,y:175 + GUI_SCALE * 2,bitmap:"arrow_background",scale:GUI_SCALE},
		{type:"bitmap",x:700 - GUI_SCALE * 4,y:75 - GUI_SCALE * 4,bitmap:"infoSmall",scale:GUI_SCALE}
    ],
    
    elements:{
        "slotInput":{type:"slot",x:350 + GUI_SCALE * 43,y:175,bitmap:"slot_empty",scale:GUI_SCALE},
        "scaleArrow":{type:"scale",x:600,y:175 + GUI_SCALE * 2,direction:0,value:0.5,bitmap:"arrow_scale",scale:GUI_SCALE},
        "slotOutput":{type:"slot",x:720,y:175,bitmap:"slot_empty",scale:GUI_SCALE,isValid:function(){return false;}},
        "textEnergy":{type:"text",font:GUI_TEXT,x:700,y:75,width:300,height:TEXT_SIZE,text:Translation.translate("Energy: ") + "0/0Eu"},
        "scaleEnergy":{type:"scale",x:350 + GUI_SCALE * 6,y:50 + GUI_SCALE * 6,direction:1,value:0.5,bitmap:"energy_scale",scale:GUI_SCALE},

        "slotUpgrade1":{type:"slot",x:370,y:325,bitmap:"slot_circuit",isValid:UpgradeRegistry.isValidUpgrade},
		"slotUpgrade2":{type:"slot",x:430,y:325,bitmap:"slot_circuit",isValid:UpgradeRegistry.isValidUpgrade},
		"slotUpgrade3":{type:"slot",x:490,y:325,bitmap:"slot_circuit",isValid:UpgradeRegistry.isValidUpgrade},
        "slotUpgrade4":{type:"slot",x:550,y:325,bitmap:"slot_circuit",isValid:UpgradeRegistry.isValidUpgrade}
    }
});

MachineRegistry.registerEUMachine(BlockID.crusher,{
    defaultValues:{
        meta:0,
        tier:2,
        progress:0,
        work_time:320,
        isActive:false,
        energy_consumption:4
    },

    upgrades:["energyStorage","overclocker","transformer"],

	initValues:function(){
        this.data.tier = this.defaultValues.tier;
        this.data.work_time = this.defaultValues.work_time;
		this.data.energy_storage = this.defaultValues.energy_storage;
		this.data.energy_consumption = this.defaultValues.energy_consumption;
	},
	
	tick: function(){
        this.renderer();
		UpgradeRegistry.executeUpgrades(this);
        StorageInterface.checkHoppers(this);

        var input = this.container.getSlot("slotInput");
        var recipe = RecipeRegistry.getRecipeResult("Crusher",[input.id,input.data]);
        if(recipe){if(this.data.energy >= this.data.energy_consumption){
            this.activate();    
            this.data.energy -= this.data.energy_consumption;
            this.data.progress += 1 / this.data.work_time;
            
            if(this.data.progress.toFixed(3) >= 1){
                this.setOutputSlot("slotOutput",recipe.id,recipe.count,recipe.data),input.count--;
                this.container.validateAll();
                this.data.progress = 0;
            }
        } else {this.deactive();}} else {this.deactive(),this.data.progress = 0;}

        this.container.setScale("scaleEnergy",parseInt(this.data.energy / this.getEnergyStorage() * 47) / 47);
        this.container.setScale("scaleArrow",parseInt(this.data.progress / 1 * 22) / 22);
        this.container.setText("textEnergy",Translation.translate("Energy: ") + this.data.energy + "/" + this.getEnergyStorage() + "Eu");
    },

    renderer:function(){
        TileRenderer.mapAtCoords(this.x,this.y,this.z,this.id,this.data.meta + (this.data.isActive?4 * (parseInt(this.data.progress / 1 * 4 * 10) % 4) + 4:0));
    },
    
    getGuiScreen:function(){
        return GuiCrusher;
    },

    energyReceive:MachineRegistry.energyReceive
});

TileRenderer.setRotationPlaceFunction(BlockID.crusher);
StorageInterface.createInterface(BlockID.crusher,{
	slots:{
		"slotInput":{input:true},
        "slotOutput":{output:true}
	},
	isValidInput:function(item){
		return RecipeRegistry.getRecipeResult("Crusher",[item.id,item.data])?true:false;
	}
});