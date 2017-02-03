var unzipedMain = new zip.fs.FS();
//Function Used to open Gaudi files
function openGaudi()
{
  //Create input files html
  gaudiObject=new gaudi();
  $fileInput=$("<input type='file' accept='application/zip' id='file-input'></input>");
  $($fileInput).click();

  $($fileInput).on("change", function(){
      unZip(this.files[0]);
   });
}

function gaudi()
{
  this.representations=[];
  this.typesOfScores=[];
}

function representation(name, scores)
{
  this.scores=scores;
  this.structure=name;
}

function unZip(loadedFile)
{
  console.log(loadedFile);
  unzipedMain.importBlob(loadedFile, function()
  {
      mainDirectory=unzipedMain.root.children[0].children;
      mainDirectory[findPositionInDirectory(mainDirectory, ".gaudi-output")].getText(function(outPutFile)
      {
        readOutputFile(outPutFile);
        openInicialRepresentation(mainDirectory);
      });
  });
}

function findPositionInDirectory(directory, findThis)
{
  for(var i=0;i<directory.length; i++ )
  {
    if(directory[i].name.indexOf(findThis)!=-1)
    {
      return i;
    }
  }
}

function readOutputFile(textData)
{
  var score;
  var a=textData.split("\n");
	for(var i=a.indexOf("GAUDI.objectives:")+1; i<a.indexOf("GAUDI.results:"); i++)
	{
      score=a[i].substr(2, a[i].indexOf(" ",3)-2);
      gaudiObject.typesOfScores.push(score);
	}

  for(var i=a.indexOf("GAUDI.results:")+1; i<a.length-1; i=i+(gaudiObject.typesOfScores.length+1))
  {
    var repName=a[i].substr(0,a[i].length-1);
    var repScore=[];

    for(var j=i+1; j<i+1+(gaudiObject.typesOfScores.length); j++)
    {
      repScore.push(a[j].substr(3));
    }

    gaudiObject.representations.push(new representation(repName, repScore));
  }
  createGaudiPopUp();
}


function openInicialRepresentation(dir)
{
  var secondUnZip = new zip.fs.FS();
  dir[findPositionInDirectory(dir,"00.zip")].getBlob(true, function(a)
  {
    secondUnZip.importBlob(a,function()
    {
      loadFirstRepresentation(secondUnZip.entries);
    })
  });
}

function loadFirstRepresentation(directoryFilesArray)
{
  var mol2ArrayIndex=[];
  for(var i=1; i<directoryFilesArray.length; i++)
  {
    if(directoryFilesArray[i].name.indexOf(".mol2")!=-1)
    {
        mol2ArrayIndex.push(i);
    }
  }
  loadAsyncfileToStage(directoryFilesArray, mol2ArrayIndex, 0);
}

function loadAsyncfileToStage(fileObject, mol2ArrayIndex, iteration)
{
    fileObject[mol2ArrayIndex[iteration]].getText(function(pdbData)
    {
      var stringBlob = new Blob( [ pdbData ], { type: 'text/plain'} );
      stage.loadFile(stringBlob, { ext: "mol2", defaultRepresentation: true,} ).then(
        function(representationObject)
        {
          var name=fileObject[mol2ArrayIndex[iteration]].name;
          representationObject.name=name.substring(name.lastIndexOf("_")+1,name.length-5);
          struct.push(new Structure(representationObject));
           if(mol2ArrayIndex[iteration+1]!=undefined)
           {
             loadAsyncfileToStage(fileObject, mol2ArrayIndex, iteration+1);
          }
        });
      });
}

 function createGaudiPopUp()
 {
   $table=$("<table></table>").attr("border","1");
   $titleRow=$("<tr></tr>");
   $titleElement=$("<th></th>").html("Representation Name");
   $($titleRow).append($titleElement);
   $titleElement=null;
   for(var i=0; i<gaudiObject.typesOfScores.length; i++)
   {
     $titleElement=$("<th></th>").html(gaudiObject.typesOfScores[i]);
     $($titleRow).append($titleElement);
     $titleElement=null;
   }
   $($table).append($titleRow);

   for(var i=0; i<gaudiObject.representations.length; i++)
   {
     $tableLine=$("<tr></tr>").click(function(){
     /* ENCARA SA DE DEFINIR*/
        updateRepresentation($(this.childNodes[0]).html());
      });
     $repName=$("<td></td>").html(gaudiObject.representations[i].structure);
     $($tableLine).append($repName);

     for(var j=0; j<gaudiObject.typesOfScores.length; j++)
     {
       $scores=$("<td></td>").html(gaudiObject.representations[i].scores[j].substr(0,11));
       $($tableLine).append($scores);
     }
     $($table).append($tableLine);
     $tableLine=null;
   }
   $div=$("<div></div>").attr("width","auto");
   $($div).append($table);
   $($div).dialog({height: 300,
     resizable: true,
      width: "auto",
    overflow:"auto"}); //afegir boto maximitzar i minimitzar
 }

function closeGaudi()
{
  gaudiObject=null;
}

function updateRepresentation(zipFileName)
{
    var insideZip = new zip.fs.FS();
    var dir=unzipedMain.root.children[0].children;
    dir[findPositionInDirectory(dir,zipFileName.substr(2))].getBlob(true, function(a)
  {
      insideZip.importBlob(a, function()
    {
        checkFilesAndUpdateRepresentation(insideZip.entries);
    });
  });
}

function checkFilesAndUpdateRepresentation(directoryFilesArray)
{
  var j=0;
  var indexArray=[]
  for(var i=1; i<directoryFilesArray.length; i++)
  {
    if(directoryFilesArray[i].name.indexOf(".mol2")!=-1)
    {
      indexArray.push(i);
    }
  }
  syncUpdateRepresentation(directoryFilesArray, indexArray, 0);
}
function syncUpdateRepresentation(directoryFilesArray, indexArray, i)
{
  directoryFilesArray[indexArray[i]].getText(function(textString)
  {
    mol2ToCoordinates(textString, i);
    if(directoryFilesArray[indexArray[i+1]]!=undefined)
    {
      syncUpdateRepresentation(directoryFilesArray, indexArray, i+1);
    }
  });
}

mol2ToCoordinates = function(text, fileName)
{
	var coordinates=[];
	var b=null;
	var a=text.split("\n");
	for(var i=a.indexOf("@<TRIPOS>ATOM")+1; i<a.indexOf("@<TRIPOS>BOND"); i++)
	{
			b=a[i].split(" ");
			b=ifIsSpaceRemove(b);
			coordinates.push(b[2]);
			coordinates.push(b[3]);
			coordinates.push(b[4]);
	}
  stage.compList[fileName].structure.updatePosition(coordinates);
  stage.compList[fileName].updateRepresentations();
}


function ifIsSpaceRemove(array)
{
	for(var i = array.length - 1; i >= 0; i--)
	{
    if(array[i] === "")
		{
       array.splice(i, 1);
    }
	}
	return array;
}
