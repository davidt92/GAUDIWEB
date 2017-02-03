function Structure(struct)
{
  this.struct=struct; // a vegades no funciona el altre
  var self=this;
  self.name=struct.name;
  self.layers=[];
  self.aminoAcids=[];
  self.layersParentDiv;
  self.onCreate();
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
  this.remove= function(){removeRepresentation(this)}; //No s'executa el primer cop
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
}


function createRepresentation(self)
{
  $label=$("<label></label>").attr("for","representation").html("Select a representation");
  $select=$("<select></select>").attr("name","representation","id","representation");
  var array=["axes", "backbone", "ball+stick", "base", "cartoon", "contact","distance", "helixorient", "hyperball", "label", "licorice", "line", "surface", "ribbon", "rocket", "rope", "spacefill", "trace", "tube", "unitcell"];
  for(var i=0; i<array.length; i++)
  {
    $($select).append($("<option></option>").html(array[i]));
  }

  $($select).selectmenu().attr("title","Select a representation").dialog({
      resizable: false,
      height: "auto",
      width: 400,
      modal: true,
      buttons: {
        Accept: function()
        {
          self.subLayers.push(new subLayerObject(self,self.structure.struct.addRepresentation(($select).val()))); //compList[0] sa de cambiar
          $( this ).dialog( "close" );
        },
        Cancel: function() {
          $( this ).dialog( "close" );
        }
      }
    });
}


function changeRepresentationParameters(representation)
{
  var parametersAtributes=representation.repr.parameters;
  var parameters=Object.keys(representation.getParameters());
  var inicialValue=null;

  $div=$("<div></div>");
  for(var i=0; i<parameters.length; i++)
  {
    if(parametersAtributes[parameters[i].toString()]!=undefined)
    {
      inicialValue=representation.getParameters()[parameters[i]];
      console.log(inicialValue);
      $tag=createInputTag(parameters[i], parametersAtributes, inicialValue, representation);
      if($tag!=null)
      {
        $label=$("<label></label>").attr("for",parameters[i]).addClass("inputParametersLayer").html(parameters[i]);
        $($div).append($label);
        $($div).append($tag);
        $($div).append("<br> <br>");
      }
    }
  }
  $($div).attr("title","Change representation parameters").dialog({
      resizable: false,
      height: 500,
      width: 500,
      modal: false,
      buttons: {
        Accept: function()
        {
          $( this ).dialog( "close" );
        }
      }
    });
}

function createInputTag(parameter, paramAtr, inicialValue, representation)
{
  var atributes = paramAtr[parameter.toString()];
  var atrib;

  switch (atributes.type)
  {

    case "number":

      $input=$("<input></input>");
      atrib=Object.keys(atributes);
      for(var i=0; i<atrib.length; i++)
      {
        if(atrib[i]=="precision")
        {
          var step="0.";
          var j=atributes[atrib[i].toString()]-1;
          for(var k=0; k<j; k++)
          {
              step=step.concat("0");
          }
          step=step.concat("1");
          $($input).attr("step",step);
        }
        else
        {
            $($input).attr(atrib[i],atributes[atrib[i].toString()]);
        }
      }

      $($input).change(function()
      {
        onChangeParameter(representation, parameter.toString(), $(this).val());
      });


      break;

    case "select":

      $input=$("<select></select>");
          atrib=Object.keys(atributes.options);
        for(var i=0; i<atrib.length; i++)
        {
          $option=$("<option></option>").attr("value",atrib[i]).html(atributes.options[atrib[i]].toString());
          if(atrib[i]==inicialValue)
          {
            $($option).attr("selected","selected");
          }
          $($input).append($option);
        }
        $($input).change(function()
        {
          onChangeParameter(representation, parameter.toString(), $(this).val());
        });
      break;
    case "boolean":

        $input=$("<input></input>").attr("type","checkbox");
        if(inicialValue==true)
        {
          $($input).attr("checked", true);
        }
        $($input).change(function()
        {
          onChangeParameter(representation, parameter.toString(), $(this).is(":checked"));
        });
      break;

    case "hidden":

        return null;
      break;

    default:
    return null;
  }
  return $input;

}

function onChangeParameter(representation, parameter, value)
{
  representation.repr[parameter]=value;
  for(var i=0; i<stage.compList.length; i++)
  {
        stage.compList[i].rebuildRepresentations();
  }
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
