
function setLayerName(structureName)
{
  $textBox=$("<input></input>").attr("type","text");
  $text=$("<div></div>").html("Insert name for  a new "+structureName+" layer").append($textBox).dialog({
      resizable: false,
      height: "auto",
      width: 400,
      modal: true,
      buttons: {
        Accept: function()
        {
          $( this ).dialog( "close" );
          return $textBox.val();
        }
      }
    });
}
