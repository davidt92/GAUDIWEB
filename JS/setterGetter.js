//create a function that is executed when residuesBallStickSelection propety is changed:
// https://github.com/arose/ngl/blob/master/doc/tutorials/selection-language.md
//S'HA DE MODIFICAR PER TAL DE QUE FUNCIONI AMB TOT
Structure.prototype.onCreateSetterGetter=function()
{
  Object.defineProperty(this, "residuesBS",{
  set: function(val){
    this._residuesBallStickSelection=[];
    this._residuesBallStickSelection.concat(val);
    //Set canvas
    //ULL NUMERO 2
    var stringText=val.join(" ");
    //Set right panel Ball+Stick value with the
    //ULL NUMERO 2
    $(this.layers[0].subLayers[2].textBox).val(stringText);
    this.layers[0].subLayers[2].representation.setSelection(stringText);
  },
  get: function()
  {
      return this._residuesBallStickSelection;
  }
});
}
