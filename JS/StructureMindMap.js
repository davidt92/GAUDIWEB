Structure.prototype.onCreateMindMap = function ()
{
  //first node: STRUCTURE->(StructureName)
  var Structure=this;
  var root=mindMap.root;
  var structureNode=root.createNewNode(mindMap.nodes[1],Structure.name, function(self){
    if(self.active==true)
    {
      self.active=false;
      Structure.visibility=false;
      return false;
    }
  else
  {
    self.active=true;
    Structure.visibility=true;
    return true;
  }});


  var layersNode=root.createNewNode(structureNode,"Layers",function(self){
    if(self.active==true)
    {
      self.active=false;
      for(var i=0; i<Structure.layers.length; i++)
      {
        for(var j=0; j<Structure.layers[i].subLayers.length; j++)
        {
          Structure.layers[i].subLayers[j].visibility=false;
        }
      }
      return false;
    }
  else
  {
    self.active=true;
    for(var i=0; i<Structure.layers.length; i++)
    {
      for(var j=0; j<Structure.layers[i].subLayers.length; j++)
      {
        Structure.layers[i].subLayers[j].visibility=true;
      }
    }
    return true;
  }
  Structure.layers[0].subLayers[2].visibility=true;
});

  var resiudesNode=root.createNewNode(structureNode,"Residues",function(self){
    if(self.active==true)
    {
      self.active=false;
      Structure.layers[0].subLayers[2].visibility=false;
      return false;
    }
  else
  {
    self.active=true;
    Structure.layers[0].subLayers[2].visibility=true;
    return true;
  }});

  //-1, we dont want the BallStick in sublayers
  var defaultLayerNode=root.createNewNode(layersNode,"Default",function(self){
    if(self.active==true)
    {
      self.active=false;
      Structure.layers[0].subLayers[0].visibility=false;
      Structure.layers[0].subLayers[1].visibility=false;
      return false;
    }
  else
  {
    self.active=true;
    Structure.layers[0].subLayers[0].visibility=true;
    Structure.layers[0].subLayers[1].visibility=true;
    return true;
  }});

  var typeOfResidue=this.BallStick.residuesType;
  var residue;
    for(var i=0; i<typeOfResidue.length;i++)
    {
        residue=root.createNewNode(resiudesNode,typeOfResidue[i].name,
          function(self){
          self.object.visible=false;
          console.log(self.object);
            /*if(self.active==true)
            {
              self.active=false;
              self.object.visible=false;
              self.object.exeChanges();
              //return false;
            }
            else
            {
              self.active=true;
              self.object.visible=true;
              self.object.exeChanges();
              //return true;
          }*/
          self.object.visible=false;
          self.object.exeChanges();
        }, typeOfResidue[i]);

      for(var j=0; j<typeOfResidue[i].residue.length;j++)
      {
        root.createNewNode(residue,typeOfResidue[i].residue[j].position,function(self){
          if(self.active==true)
          {
            self.active=false;
            self.object.visible=false;
            return false;
          }
        else
        {
          self.active=true;
          self.object.visible=true;
          return true;
        }}, typeOfResidue[i].residue[j]);
      }

    }
}
