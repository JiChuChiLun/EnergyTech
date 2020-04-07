// 自动筛子
IDRegistry.genBlockID("autoSaieve");
Block.createBlock("autoSaieve",[
    {name:"Auto Sieve",texture:[["autoSieveBottom",0],["autoSieveTop",0],["autoSieveSide",0]],inCreative:true}
],"transparent");

Model.AutoSaieve(BlockID.autoSaieve,0);
Machine.setDrop("autoSaieve",BlockID.machineCasing);
Callback.addCallback("PreLoaded",function(){
    Recipes.addShaped({id:BlockID.autoSaieve,count:1,data:0},["ada","aca","b b"],["a",ItemID.plateIron,0,"b",ItemID.stickIron,0,"c",BlockID.machineCasing,0,"d",ItemID.gearIron,0]);
});

var GuiAutoSaieve = new UI.StandartWindow({
    standart:{
        header:{text:{text:Translation.translate("Auto Sieve")}},
        inventory:{standart:true},
        background:{standart:true}
    },

    drawing:[
        {type:"bitmap",x:900,y:325,bitmap:"logo",scale:GUI_SCALE},
        {type:"bitmap",x:350,y:50,bitmap:"energyBackground",scale:GUI_SCALE},
        {type:"bitmap",x:600,y:175,bitmap:"arrowBackground",scale:GUI_SCALE}
    ],

    elements:{
        "slotInput":{type:"slot",x:500,y:175,bitmap:"slotBlank",scale:GUI_SCALE},
        "scaleArrow":{type:"scale",x:600,y:175,direction:0,value:0.5,bitmap:"arrowScale",scale:GUI_SCALE},
        "slotOutput1":{type:"slot",x:700,y:75,bitmap:"slotBlank",scale:GUI_SCALE,isValid:function(){return false;}},
        "slotOutput2":{type:"slot",x:760,y:75,bitmap:"slotBlank",scale:GUI_SCALE,isValid:function(){return false;}},
        "slotOutput3":{type:"slot",x:820,y:75,bitmap:"slotBlank",scale:GUI_SCALE,isValid:function(){return false;}},
        "slotOutput4":{type:"slot",x:880,y:75,bitmap:"slotBlank",scale:GUI_SCALE,isValid:function(){return false;}},
        "slotOutput5":{type:"slot",x:700,y:135,bitmap:"slotBlank",scale:GUI_SCALE,isValid:function(){return false;}},
        "slotOutput6":{type:"slot",x:760,y:135,bitmap:"slotBlank",scale:GUI_SCALE,isValid:function(){return false;}},
        "slotOutput7":{type:"slot",x:820,y:135,bitmap:"slotBlank",scale:GUI_SCALE,isValid:function(){return false;}},
        "slotOutput8":{type:"slot",x:880,y:135,bitmap:"slotBlank",scale:GUI_SCALE,isValid:function(){return false;}},
        "slotOutput9":{type:"slot",x:700,y:195,bitmap:"slotBlank",scale:GUI_SCALE,isValid:function(){return false;}},
        "slotOutput10":{type:"slot",x:760,y:195,bitmap:"slotBlank",scale:GUI_SCALE,isValid:function(){return false;}},
        "slotOutput11":{type:"slot",x:820,y:195,bitmap:"slotBlank",scale:GUI_SCALE,isValid:function(){return false;}},
        "slotOutput12":{type:"slot",x:880,y:195,bitmap:"slotBlank",scale:GUI_SCALE,isValid:function(){return false;}},
        "slotOutput13":{type:"slot",x:700,y:255,bitmap:"slotBlank",scale:GUI_SCALE,isValid:function(){return false;}},
        "slotOutput14":{type:"slot",x:760,y:255,bitmap:"slotBlank",scale:GUI_SCALE,isValid:function(){return false;}},
        "slotOutput15":{type:"slot",x:820,y:255,bitmap:"slotBlank",scale:GUI_SCALE,isValid:function(){return false;}},
        "slotOutput16":{type:"slot",x:880,y:255,bitmap:"slotBlank",scale:GUI_SCALE,isValid:function(){return false;}},

        "scaleEnergy":{type:"scale",x:350 + GUI_SCALE * 6,y:50 + GUI_SCALE * 6,direction:1,value:0.5,bitmap:"energyScale",scale:GUI_SCALE},

        "slotUpgrade1":{type:"slot",x:370,y:325,bitmap:"slotCircuit",isValid:Upgrade.isValidUpgrade},
        "slotUpgrade2":{type:"slot",x:430,y:325,bitmap:"slotCircuit",isValid:Upgrade.isValidUpgrade},
        "slotUpgrade3":{type:"slot",x:490,y:325,bitmap:"slotCircuit",isValid:Upgrade.isValidUpgrade},
        "slotUpgrade4":{type:"slot",x:550,y:325,bitmap:"slotCircuit",isValid:Upgrade.isValidUpgrade},
    }
});

Machine.registerMachine(BlockID.autoSaieve,{
    defaultValues:{
        tier:2,
        progress:0,
        work_time:160,
        energy_consumption:8
    },

    setDefaultValues: function(){
        this.data.tier = this.defaultValues.tier;
        this.data.work_time = this.defaultValues.work_time;
		this.data.energy_storage = this.defaultValues.energy_storage;
		this.data.energy_consumption = this.defaultValues.energy_consumption;
    },
    
    tick:function(){
		Upgrade.executeUpgrades(this);
        StorageInterface.checkHoppers(this);

        var input = this.container.getSlot("slotInput"),recipe = Recipe.getRecipeResult("AutoSaieve",[input.id,input.data]);
        if(recipe){if(this.data.energy >= this.data.energy_consumption){
            this.data.energy -= this.data.energy_consumption;
            this.data.progress += 1 / this.data.work_time;
            if(this.data.progress.toFixed(3) >= 1){
                input.count -= 1;
                var output = recipe[Math.floor(Math.random() * recipe.length)];
                if(Math.random() * 25 <= output.random){
                    this.setOutput(output.id,random(output.minCount,output.maxCount),output.data);
                }
                this.container.validateAll();
                this.data.progress = 0;
            }
        }} else {this.data.progress = 0;}

        this.container.setScale("scaleArrow",Math.round(this.data.progress / 1 * 22) / 22);
        this.container.setScale("scaleEnergy",this.data.energy / this.getEnergyStorage());
    },

    setOutput:function(id,count,data){
        for(var slot = 1;slot < 17;slot++){
            var output = this.container.getSlot("slotOutput" + slot);
            if(output.id == 0 || output.id == id && output.data == data && output.count < 64){
                if(output.count + count > 64){
                    var output_count = 64 - output.count;
                    output.id = id,output.data = data,output.count += output_count;
                    this.setOutput(id,(output.count + count - 64) - output_count,data);
                } else {
                    output.id = id,output.data = data,output.count += count;
                }
                return true;
            }
        }
        World.drop(this.x + 0.5,this.y + 1.5,this.z + 0.5,id,count,data);
    },

    energyReceive:Machine.energyReceive,
    getGuiScreen:function(){return GuiAutoSaieve;}
});
StorageInterface.createInterface(BlockID.autoSaieve,{
	slots:{
		"slotInput":{input:true},
        "slotOutput1":{output:true},
        "slotOutput2":{output:true},
        "slotOutput3":{output:true},
        "slotOutput4":{output:true},
        "slotOutput5":{output:true},
        "slotOutput6":{output:true},
        "slotOutput7":{output:true},
        "slotOutput8":{output:true},
        "slotOutput9":{output:true},
        "slotOutput10":{output:true},
        "slotOutput11":{output:true},
        "slotOutput12":{output:true},
        "slotOutput13":{output:true},
        "slotOutput14":{output:true},
        "slotOutput15":{output:true},
        "slotOutput16":{output:true}
	},
	isValidInput:function(item){return Recipe.getRecipeResult("AutoSaieve",[item.id,item.data])?true:false;}
});