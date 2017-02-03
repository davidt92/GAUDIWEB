//inici fet per mi
//https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Function/bind
Node.prototype.setFirstColor = function(a)
{
  if(a==true)
  {
    this.active=true;
    this.el.removeClass("orangeBorder");
    this.el.addClass("greenBorder");
  }
  else if(a==false)
  {
    this.active=false;
    this.el.removeClass("orangeBorder");
    this.el.addClass("redBorder");
  }
}

Node.prototype.changeColorOfNode = function()
{
  if(this.active==true)
  {
    this.active=false;
    this.el.removeClass("greenBorder");
    this.el.addClass("redBorder");
  }
  else if(this.active==false)
  {
    this.active=true;
    this.el.removeClass("redBorder");
    this.el.addClass("greenBorder");
  }
  else
  {
    this.el.removeClass("orangeBorder");
    this.el.addClass("greenBorder");
    this.active=true;
  }
}

Node.prototype.onClickFunction = function (a)
{
  this.onClickExeFunction=a;
}
Node.prototype.functionArguments = function (arg)
{
  this.arguments=arg;
}
