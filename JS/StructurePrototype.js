Structure.prototype.createLayer=function()
{
  this.layers.push(new layerObject(this));
}

Structure.prototype.onCreate=function()
{
  var self=this
    self.div=createStructureRepresentation(this);
    self.layers.push(new layerObject(this, "Default"));
    for(i=0; i<self.struct.reprList.length;i++)
    {
      self.layers[0].createSubLayer(this.struct.reprList[i]);
    }
    self.layers[0].subLayers[2].residuesType=self.residuesType.concat(residuesMap(self));
    self.layers[0].subLayers[2].exeChanges=function(){return exeChanges(self.layers[0].subLayers[2])};
    self.BallStick=this.layers[0].subLayers[2];
}

function exeChanges(self)
{
  var arrayToExecute=[];
  for(var i=0; i<self.residuesType.length; i++)
  {
    for(var j=0; j<self.residuesType[i].residue.length; j++)
    {
      if(self.residuesType[i].residue[j].isVisible==true)
      {
        arrayToExecute.push(self.residuesType[i].residue[j].position);
      }
    }
  }
  //ALGO DE AQUI ESTA MALAMENT
  self.selection=arrayToExecute.join(" "); //<- ESTA MALAMENT
  //console.log(arrayToExecute);
  //return arrayToExecute;
}

Structure.prototype.removeStructure=function()
{
  stage.removeComponent(this.struct);
}


function residuesMap(self)
{
  var res=[];
  var listOfResidueType=self.struct.structure.residueMap.list;
  for(var i=0; i<listOfResidueType.length; i++)
  {
    res.push(new residuesTypeObject(listOfResidueType[i].resname,i, self));
  }

  var listOfResidues=self.struct.structure.residueStore.residueTypeId;
  var position=0;

  for(var i=0; i<listOfResidues.length; i++)
  {
    position=i+1;
    res[listOfResidues[i]].residue.push(new residuesObject(position, self));
  }
  return res;
}

function residuesTypeObject(name, i, self)
{
  this.exeChanges=function(){return self.BallStick.exeChanges()};
  this.name=name;
  this.resTypeId=i;
  this.residue=[];
  this._visible=true;
  setterGetterResiduesType(this);
}

function residuesObject(position, self)
{
  this.exeChanges=function(){return self.BallStick.exeChanges()};
  this.position=position;
  this._parentVisible=true;
  this._visible=true;
  this._isVisible=true;
  setterGetterResidues(this);
}
