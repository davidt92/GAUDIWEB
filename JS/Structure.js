//getter setter of _residuesBallStickSelection residuesBS
function Structure(struct)
{
  this.struct=struct; // a vegades no funciona el altre
  var self=this;
  self.name=struct.name;
  self.layers=[];
  self.aminoAcids=[];
  self.layersParentDiv;
  self._residuesBallStickSelection=[];
  self.onCreate();
  self.onCreateSetterGetter();
  self.onCreateMindMap();
}

function layerObject(self, layerName)
{
  this.layerName= layerName||prompt("Insert name for  a new "+self.name+" layer"); //S'ha de provar
  this.structure=self;
  this.subLayersParentDiv;
  this.subLayers=[];
  this.visibleDiv;
  this.visible;
  this.layerDiv=createLayerRepresentation(this);
  this.changeVisibility = function(){
    if($(this.visibleDiv).hasClass("checkBoxChecked"))
    {
      $(this.visibleDiv).removeClass("checkBoxChecked");
      this.visible=false;
      for(var i=0; i<this.subLayers.length; i++)
      {
          this.subLayers[i].couldBeVisible=false;
          this.subLayers[i].representation.setVisibility(false);
      }
    }
    else
    {
      $(this.visibleDiv).addClass("checkBoxChecked");
      this.visible=true;

      for(var i=0; i<this.subLayers.length; i++)
      {
          this.subLayers[i].couldBeVisible=true;
          if($(this.subLayers[i].visibleDiv).hasClass("checkBoxChecked"))
          {
            this.subLayers[i].representation.setVisibility(true);
          }
      }
    }
  }

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

function subLayerObject(self, repr)
{
  this.representation=repr;
  this.layer=self;
  this.subLayerName=repr.name;
  this.visibleDiv;
  this.couldBeVisible=true;
  this.subLayerDiv=createSubLayerRepresentation(this);
  this.textBox;
  this.remove= function(){removeRepresentation(this)}; //No s'executa el primer cop
  this._visible=true;
  this.changeVisibility = function(){
    if($(this.visibleDiv).hasClass("checkBoxChecked"))
    {
      $(this.visibleDiv).removeClass("checkBoxChecked");
      this.representation.setVisibility(false);
    }
    else
    {
      $(this.visibleDiv).addClass("checkBoxChecked");
      if(this.couldBeVisible==true)
      {
          this.representation.setVisibility(true);
      }
    }
  }
/*
  Object.defineProperties(this, {"visibility": {
             "get": function()
             {
                return this._visible;
              },
             "set": function(visValue)
             {
               if(visValue==true)
               {
                 $(this.visibleDiv).removeClass("checkBoxChecked");
                 this.representation.setVisibility(false);
               }
               else
               {
                 $(this.visibleDiv).addClass("checkBoxChecked");
                 if(this.couldBeVisible==true)
                 {
                     this.representation.setVisibility(true);
                 }
               }
              }
        }
    });*/
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

function removeStructure(self)
{
  //remove the structure, the layers and all the sublayers from the right panel
  console.log(self);
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
