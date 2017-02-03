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
}

Structure.prototype.changeVisibility = function()
{
  if($(this.visibleDiv).hasClass("checkBoxChecked"))
  {
    $(this.visibleDiv).removeClass("checkBoxChecked");
    this.struct.setVisibility(false);
  }
  else
  {
    $(this.visibleDiv).addClass("checkBoxChecked");
    this.struct.setVisibility(true);
  }
}

Structure.prototype.removeStructure=function()
{
  stage.removeComponent(this.struct);
}
