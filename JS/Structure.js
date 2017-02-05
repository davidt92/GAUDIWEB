//getter setter of _residuesBallStickSelection residuesBS
function Structure(struct)
{
  this._visibility=true;

  this.struct=struct; // a vegades no funciona el altre
  var self=this;
  self.name=struct.name;
  self.layers=[];
  self.residuesType=[];
  self.layersParentDiv;
  this.BallStick;
  self.onCreate();
  self.onCreateSetterGetter();
  self.onCreateMindMap();
}

function removeStructure(self)
{
  //remove the structure, the layers and all the sublayers from the right panel
  $(self.layersParentDiv).remove();
  //remove all representations inside the structure form stage
  self.removeStructure();
  //remove structure from struct array
  for(var i=0; i<struct.length; i++)
  {
    if(struct[i]==self)
    {
      struct.splice(i,1);
    }
  }
}

function layerObject(self, layerName)
{
  this.layerName= layerName||prompt("Insert name for  a new "+self.name+" layer"); //S'ha de provar
  this.structure=self;
  this.subLayersParentDiv;
  this.subLayers=[];
  this.visibleDiv;
  this.layerDiv=createLayerRepresentation(this);
  setterGetterLayer(this);

  this._visibility=true;

  this.createSubLayer= function(repr)
  {
    if(repr==undefined)
    {
      createRepresentation(this);
    }
    else
    {
      this.subLayers.push(new subLayerObject(this, repr));
    }

  }
}

function removeLayer(self)
{
  //Removes all the representations inside the sublayer from the stage
  for(var i=0; i<self.subLayers.length; i++)
  {
    stage.removeComponent(self.subLayers[i].representation);
  }
//remove layer from the struct object
  for(var i=0; i<self.structure.layers.length; i++)
  {
    if(self.structure.layers[i]==self)
    {
      self.structure.layers.splice(i,1);
    }
  }
  //removes the layer and all the sublayers from the right panel
  $(self.layerDiv[0].parentNode).remove();
}

function subLayerObject(self, repr)
{
  this.representation=repr;
  this.layer=self;
  this.subLayerName=repr.name;
  this.visibleDiv;
  this.couldBeVisible=true;
  this.subLayerDiv=createSubLayerRepresentation(this);
  this.textBox;
  this.remove=function(){removeRepresentation(this)}; //No s'executa el primer cop

  this._visibility=true;
  self._residuesName=[];
  self._residuesPosition=[];
  self._atomsName=[];
  setterGetterSublayer(this);
}

function removeRepresentation(self)
{
  $(self.subLayerDiv).remove();

  stage.removeComponent(self.representation);//Borra imatge
  for(var i=0; i<self.layer.subLayers.length; i++)
  {
    if(self.layer.subLayers[i]==self)
    {
      self.layer.subLayers.splice(i,1);
    }
  }
}
