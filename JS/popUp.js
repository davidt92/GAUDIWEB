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
      width: 420,
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

  var labelText=null;

  $div=$("<div></div>");
  for(var i=0; i<parameters.length; i++)
  {
    if(parametersAtributes[parameters[i].toString()]!=undefined)
    {
      inicialValue=representation.getParameters()[parameters[i]];
      $tag=createInputTag(parameters[i], parametersAtributes, inicialValue, representation);

      if($tag!=null)
      {
        labeltext=((parameters[i]).replace(/([A-Z])/g, " $1").toLowerCase()).capitalizeFirstLetter();
        $label=$("<label></label>").attr("for",parameters[i]).addClass("inputParametersLayer").html(labeltext);
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
