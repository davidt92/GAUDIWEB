function createStructureRepresentation(self)
{
  $checkBox=$("<div></div>").addClass("checkBox checkBoxChecked").click(function(){
    if(self.visibility==true)
    {
      self.visibility=false;
    }
    else
    {
      self.visibility=true;
    }
  });

  self.visibleDiv=$checkBox;

  $text=$("<div></div>").addClass("textStructureLayer").html(self.name);
  $button=$("<button></button>").addClass("addSublayerButton").html("+").click(function()
  {
    self.createLayer();
  });
  $StructureDiv=$("<div></div>").addClass("panelBox Structure"); //display:none com si ja no existsis

  $($StructureDiv).append($checkBox).append($text).append($button);

  $layersParentDiv=$("<div></div>");
  self.layersParentDiv=$layersParentDiv;

  $($layersParentDiv).append($StructureDiv);
  $("#panelLayer").append($layersParentDiv);

  $($checkBox).mouseup(function()
  {
    clearTimeout(pressTimer);
    $(self.layersParentDiv).removeClass("removeRepresentation").css('background-color','inherit');
    return false;
    }).mousedown(function(){
    // Set timeout
    //For Making possible to click on checkBox
    setTimeout(function(){
    $(self.layersParentDiv).addClass("removeRepresentation").css("background","red");
    pressTimer = window.setTimeout(function() {removeStructure(self)},1000);
    return false;}, 1);
  });
  return $StructureDiv;
}


function createLayerRepresentation(self)
{
  $checkBox=$("<div></div>").addClass("checkBox checkBoxChecked").click(function(){
    if(self.visibility==true)
    {
      self.visibility=false;
    }
    else {
      self.visibility=true;
    }

  });
  self.visibleDiv=$checkBox;
  self.isVisible=true;
  $text=$("<div></div>").addClass("textStructureLayer").html(self.layerName);
  $button=$("<button></button>").addClass("addSublayerButton").html("+").click(function()
  {
    self.createSubLayer();
  });
  $layerDiv=$("<div></div>").addClass("panelBox Layer"); //display:none com si ja no existsis
  $($layerDiv).append($checkBox).append($text).append($button);
  $div=$("<div></div>");
  self.subLayersParentDiv=$div;
  $($div).append($layerDiv);
  $(self.structure.layersParentDiv).append($div);

  $($checkBox).mouseup(function()
  {
    clearTimeout(pressTimer);
    $(self.layerDiv[0].parentNode).removeClass("removeRepresentation").css('background-color','inherit');
    return false;
    }).mousedown(function(){
    // Set timeout
    //For Making possible to click on textbox
    setTimeout(function(){
    $(self.layerDiv[0].parentNode).addClass("removeRepresentation").css("background","red");
    pressTimer = window.setTimeout(function() {removeLayer(self)},1000);
    return false;}, 1);
  });

  return $layerDiv;
}

function createSubLayerRepresentation(self)
{
  //Pop up
  $checkBox=$("<div></div>").addClass("checkBox checkBoxChecked").click(function(){
    if(self.visibility==true)
    {
      self.visibility=false;
    }
    else {
      self.visibility=true;
    }
  });
  self.visibleDiv=$checkBox;
  $text=$("<div></div>").addClass("textSublayer").html(self.subLayerName+"<br>");
  $textBox=$("<input></input>").attr("type","text").addClass("textBoxSubLayer").on("keydown",function(e) {
    if(e.keyCode == 13)
    {
      self.selection=$(this).val();
    }
  }); /*sa de cambiar*/
  self.textBox=$textBox;
  $($text).append($textBox);

  $button=$("<button></button>").addClass("addSublayerButton").html("P").click(function()
  {
    changeRepresentationParameters(self.representation);
  });

  $subLayerDiv=$("<div></div>").addClass("panelBox SubLayer"); //display:none com si ja no existsis
  $($subLayerDiv).append($checkBox).append($text).append($button);

  $(self.layer.subLayersParentDiv).append($subLayerDiv);

  $($checkBox).mouseup(function()
  {
    clearTimeout(pressTimer);
    $(self.subLayerDiv).removeClass("removeRepresentation").css('background-color','inherit');
    return false;
    }).mousedown(function(){
    // Set timeout
    //For Making possible to click on textbox
    setTimeout(function(){
    $(self.subLayerDiv).addClass("removeRepresentation").css("background","red");
    pressTimer = window.setTimeout(function() {removeRepresentation(self)},1000);
    return false;}, 1);
  });

  return $subLayerDiv;
}
