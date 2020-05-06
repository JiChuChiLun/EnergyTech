// [特高压变压器]EV Transformer
IDRegistry.genBlockID("transformerEV");
Block.createBlock("transformerEV",[
    {name:"EV Transformer",texture:[["transformer_side",3],["transformer_side",3],["transformer_side",3],["transformer",3],["transformer_side",3],["transformer_side",3]],inCreative:true}
],"machine");
TileRenderer.setStandartModel(BlockID.transformerEV,[["transformer_side",3],["transformer_side",3],["transformer_side",3],["transformer",3],["transformer_side",3],["transformer_side",3]]);
TileRenderer.registerFullRotationModel(BlockID.transformerEV,0,[["transformer_side",3],["transformer_side",3],["transformer_side",3],["transformer",3],["transformer_side",3],["transformer_side",3]]);

Tooltip.tier(BlockID.transformerEV,4);
Callback.addCallback("PreLoaded",function(){
    Item.addCreativeGroup("transformer",Translation.translate("Transformer"),[BlockID.transformerEV]);
    Recipes.addShaped({id:BlockID.transformerEV,count:1,data:0},[
        "dcd",
        "aba",
        "dcd"
    ],["a",BlockID.coilSteel,0,"b",BlockID.machineCasing,2,"c",ItemID.partSteel,0,"d",ItemID.stickSteel,0]);
});

Machine.registerEUMachine(BlockID.transformerEV,{
	defaultValues:{
        meta:0,
        tier:4,
        mode:false
    },

    redstone:function(signal){
        var mode = signal.power > 0;
        if(mode != this.data.mode){
            this.data.mode = mode;
            EnergyNetBuilder.rebuildTileNet(this);
        }
    },

    energyTick:function(type,src){
        this.data.last_voltage = this.data.voltage;
        this.data.voltage = 0;
    
        var voltage_max = this.getMaxVoltage();
        if(this.data.mode){
            if(this.data.energy >= voltage_max){
                this.data.energy += src.add(voltage_max,voltage_max) - voltage_max;
            }
        } else {
            if(this.data.energy >= voltage_max / 4){
                var output = this.data.energy;
                this.data.energy += src.add(output,voltage_max / 4) - output;
            }
        }
    },

    renderer:function(){
        TileRenderer.mapAtCoords(this.x,this.y,this.z,this.id,this.data.meta);
    },

    energyReceive:Machine.energyReceive,
    isEnergySource:function(){return true;},
    destroy:function(){BlockRenderer.unmapAtCoords(this.x,this.y,this.z);},
    canReceiveEnergy:function(side){if(side == this.data.meta){return !this.data.mode;}return this.data.mode;},
    canExtractEnergy:function(side){if(side == this.data.meta){return this.data.mode;}return !this.data.mode;}
});

Block.registerPlaceFunction("transformerEV",function(coords,item,block){
    var place = canTileBeReplaced(block.id,block.data)?coords:coords.relative;
    World.setBlock(place.x,place.y,place.z,item.id,item.data);
    var rotation = TileRenderer.getBlockRotation(true);
    var tile = World.addTileEntity(place.x, place.y, place.z);
    tile.data.meta = rotation;
    TileRenderer.mapAtCoords(place.x,place.y,place.z,item.id,rotation);
});