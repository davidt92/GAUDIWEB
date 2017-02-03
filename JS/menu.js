$( document ).ready(function(){
  $menu=$("#menu").menu().hide();
  $menuButton=$("#menuButton");
  $($menuButton).click(function(){
    if($($menu).is(':visible'))
    {
      $($menu).hide();
    }
    else {
      $($menu).show();
    }
  });

  $($menu).hover(function()
  {
    $($menu).show();
  },
    function()
    {
      $($menu).hide();
    });


    $("#openMenu").click(function(){
        openFile();
    });
    $("#openGaudiMenu").click(function(){
        openGaudi();
    });
    $("#screenShotMenu").click(function(){
        onScreenshotOptionClick(stage);
    });
    $("#lightThemeMenu").click(function(){
        changeToWhiteTheme();
    });
    $("#darkThemeMenu").click(function(){
        changeToBlackTheme();
    });
    $("#prespectiveMenu").click(function(){
        changeCameraType(stage, "prespective");
    });
    $("#orthographicMenu").click(function(){
        changeCameraType(stage, "orthographic");
    });
    $("#spinOnMenu").click(function(){
        onSpinOnClick();
    });
    $("#spinOffMenu").click(function(){
        onSpinOffClick();
    });
    $("#fullScreenMenu").click(function(){
        fullScreen(stage);
    });
    $("#closeAll").click(function(){
      closeAll()
    });
});
