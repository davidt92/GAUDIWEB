//create a function that is executed when residuesBallStickSelection propety is changed:
// https://github.com/arose/ngl/blob/master/doc/tutorials/selection-language.md
//S'HA DE MODIFICAR PER TAL DE QUE FUNCIONI AMB TOT
Structure.prototype.onCreateSetterGetter=function()
{
// if true, structure will be visible. If false, structure will be unvisible
Object.defineProperty(this, "visibility",{
  set: function(val)
  {
    if(val==true)
    {
      $(this.visibleDiv).addClass("checkBoxChecked");
      this.struct.setVisibility(true);
      this._visibility=true;
    }
    else
    {
      $(this.visibleDiv).removeClass("checkBoxChecked");
      this.struct.setVisibility(false);
      this._visibility=false;
    }
  },
  get: function()
  {
    return this._visibility;
  }
});
}

//setter and getter for the layers.
function setterGetterLayer(self)
{
  // if true, Layer will be visible. If false, Layer will be unvisible
  Object.defineProperty(self, "visibility",{
    set: function(val)
    {
      if(val==true)
      {
        $(this.visibleDiv).addClass("checkBoxChecked");
        this._visibility=true;

        for(var i=0; i<this.subLayers.length; i++)
        {
            this.subLayers[i].couldBeVisible=true;
            if($(this.subLayers[i].visibleDiv).hasClass("checkBoxChecked"))
            {
              this.subLayers[i].representation.setVisibility(true);
            }
        }
      }
      else
      {
        $(this.visibleDiv).removeClass("checkBoxChecked");
        this._visibility=false;

        for(var i=0; i<this.subLayers.length; i++)
        {
            this.subLayers[i].couldBeVisible=false;
            this.subLayers[i].representation.setVisibility(false);
        }
      }
    },
    get: function()
    {
      return this._visibility;
    }
  });
}

function setterGetterSublayer(self)
{
  // if true, Layer will be visible. If false, Layer will be unvisible
  Object.defineProperty(self, "visibility",{
    set: function(val)
    {
      if(val==true)
      {
        $(this.visibleDiv).addClass("checkBoxChecked");
        this._visibility=true;

        if(this.couldBeVisible==true)
        {
            this.representation.setVisibility(true);
        }
      }
      else
      {
        $(this.visibleDiv).removeClass("checkBoxChecked");
        this._visibility=false;

        this.representation.setVisibility(false);
      }
    },
    get: function()
    {
      return this._visibility;
    }
  });

  Object.defineProperty(self, "selection",{
  set: function(val){

    self.representation.setSelection(val);

    selectionFromStringToArrays(this, val);
    //Set canvas

    $(this.textBox).val(val);
    this.representation.setSelection(val);
  },
  get: function()
  {
      return this._selection;
  }
});

}

function selectionFromStringToArrays(self, val)
{
  var inputArray=val.split(" ");
  inputArray=inputArray.remove("");
  self._residuesName=[];
  self._residuesPosition=[];
  self._atomsName=[];

  for(var i=0; i< inputArray.length; i++)
  {
    if(/^[a-zA-Z]+$/.test(inputArray[i])==true&&inputArray[i].length==3)
    {
      self._residuesName.push(inputArray[i]);
    }
    else if(isNaN(inputArray[i])==false) //If it's a number
    {
      self._residuesPosition.push(inputArray[i])
    }
    else if(inputArray[i].indexOf("#")==0)
    {
      self._atomsName.push(inputArray[i]);
    }
  }
  console.log("resiudesName "+self._residuesName+" residuesPosition "+self._residuesPosition+" atomsName "+self._atomsName);
}
/*
function fromResiduesNameToResiduesPosition(self, residueName)
{
  var residueStore= residueName.representation.parent.structure.residueStore;
  var residueMap= residueName.representation.parent.structure.residueMap.list;
  residueStore.residueTypeId[]
}
*/
//MINDMAP TESTING


function setterGetterResiduesType(self)
{
  Object.defineProperty(self, "visible",{
  set: function(val){
    this._visible=val;
    if(val==true)
    {
      for(i=0;i<this.residues.length;i++)
      {
          this.residues[i].parentVisible=true;
      }
    }
    else
    {
      for(i=0;i<this.residues.length;i++)
      {
          this.residues[i].parentVisible=false;
      }
    }

  },
  get: function()
  {
      return this._visible;
  }
});
}




function setterGetterResidues(self)
{
  Object.defineProperty(self, "parentVisible",{
  set: function(val){
    this._parentVisible=val;
    if(val==true&&this.visible==true)
    {
        this.isVisible=true;
    }
    else
    {
      this.isVisible=false;
    }

  },
  get: function()
  {
      return this._parentVisible;
  }
});

Object.defineProperty(self, "visible",{
set: function(val){
  this._visible=val;
  if(this.parentVisible==true&&val==true)
  {
        this.isVisible=true;
  }
  else
  {
      this.isVisible=false;
  }

},
get: function()
{
    return this._visible;
}
});

Object.defineProperty(self, "isVisible",{
get: function()
{
    return this._isVisible;
}
});

}
