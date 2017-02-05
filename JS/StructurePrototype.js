Structure.prototype.createLayer=function()
{
  this.layers.push(new layerObject(this));
}

Structure.prototype.onCreate=function()
{
    this.div=createStructureRepresentation(this);
    this.layers.push(new layerObject(this, "Default"));
    for(i=0; i<this.struct.reprList.length;i++)
    {
      this.layers[0].createSubLayer(this.struct.reprList[i]);
    }
    this.BallStick=this.layers[0].subLayers[2];
    this.residuesType=this.residuesType.concat(residuesMap(this));
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
    res.push(new residuesTypeObject(listOfResidueType[i].resname,i));
  }


  var listOfResidues=self.struct.structure.residueStore.residueTypeId;
  var position=0;

  for(var i=0; i<listOfResidues.length; i++)
  {
    position=i+1;
    res[listOfResidues[i]].residue.push(new residuesObject(position));
  }
  return res;
}

function residuesTypeObject(name, i)
{
  this.name=name;
  this.resTypeId=i;
  this.residue=[];
  this._visible=true;
  setterGetterResiduesType(this);
}

function residuesObject(position)
{
  this.position=position;
  this._parentVisible=true;
  this._visible=true;
  this._isVisible=true;
  setterGetterResidues(this);
}
