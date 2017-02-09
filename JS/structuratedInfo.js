function createStructuratedInfo(stage)
{
  gaudiWeb= new StructuratedInfo(stage);
}

function StructuratedInfo(stage)
{
  this.stage=stage;
  this.protein=[];
}

StructuratedInfo.prototype.addProtein=function(StructureComponent)
{
  this.protein.push(new ProteinStructure(StructureComponent));
}
///////////
function ProteinStructure(structComp)
{
  this.name=structComp.name;
  this.bio=[];
  this.chem=[];
}

ProteinStructure.prototype.addResidues = function (structure)
{
  var listOfresidueType=this.struct.structure.residueMap.list;
  for(var i=0; i<listOfResidueType.length; i++)
  {
    this.bio.push(new ResidueType(listOfResidueType[i].resname));
  }

  var listOfResidues=this.struct.structure.residueStore.residueTypeId;
  var resStore=this.struct.structure.residueStore.resno;
  
  for(var i=0; i<listOfResidues.length; i++)
  {
    this.bio[listOfResidues[i]].addPosition(resStore[i]);
  }
};

function ResidueType(name)
{
  this.name=name;
  this.positions=[];
}

ResidueType.prototype.addPosition=function(pos)
{
  this.positions.push(new Residue(pos));
}
function Residue(pos)
{
  this.position=pos
}

//////////
ProteinStructure.prototype.addLigand = function (StructureComponent)
{
  this.chem.push(new Ligand(StructureComponent));
};

function Ligand(structComp)
{
  this.name=structComp.name;
  this.resAtFiveAmstrongs;
  this.typesOfInteractions;
}
/*
Ligand.prototype.resAtFiveAmstrongs = function ()
{

};*/
