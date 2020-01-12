var imageString = null;
const NO_IMAGE_WARNING_STRING  = "No image given!";
var width;
var height;
var imageScale;

function debug_alert(info) {
    //alert(info);
    console.log(info);
}

function encodeImageFileAsURL() {
    var filesSelected = document.getElementById("imageInput").files;
    if (filesSelected.length > 0) {
      var fileToLoad = filesSelected[0];
      var fileReader = new FileReader();

      fileReader.onload = function(fileLoadedEvent) {
        var srcData = fileLoadedEvent.target.result; // <--- data: base64
        var img = new Image;
        var newImage = document.createElement('img');

        newImage.src = srcData; 
        img.src = fileReader.result;

        document.getElementById("imageTest").innerHTML = newImage.outerHTML;
        imageString = document.getElementById("imageTest").innerHTML
        imageString = imageString.replace('"<img src="data:image/png;base64,"', '');
        imageString = imageString.replace('"<img src="data:image/png;base64,"', '');
        imageString = imageString.slice(0, -1);
        debug_alert("Converted Base64 version is " + imageString);

        img.onload = function() {
            width = img.width; // image is loaded; sizes are available
            height = img.height;
        };
      }
      fileReader.readAsDataURL(fileToLoad);
      // OVERWRITE /public/request.json
      
    }
  }

function submitImages() {
    console.log("Hi from submitImages");
    if (imageString == null) {
        debug_alert(NO_IMAGE_WARNING_STRING);
        return;
    }
    imageScale = document.getElementById("imageScaleInput").value;
    analyzeImage();
}

function analyzeImage() {
    if (window.XMLHttpRequest) {
        // code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    } else {
        // code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
            displayValues(this.responseText);
        }
    };
    xmlhttp.open("GET","./analyze-image");
    xmlhttp.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xmlhttp.send();
}

function displayValues(result) {
    // calculations
    var carbonConv = 5.87;
    var costConv = 111;
    var totArea = 0;
    var totCarbon = 0;
    var totCost = 0;
    var jsonResult;

    result = result.replace(/\s+/g, '').trim();
    jsonResult = JSON.parse(result);
    for(j of jsonResult.payload){
        var n = j.imageObjectDetection.boundingBox.normalizedVertices;
        var p1x = n[0].x * width;
        var p1y = n[0].y * height;
        var p2x = n[1].x * width;
        var p2y = n[1].y * height;
        var rectHeight = Math.sqrt((p2y-p1y)*(p2y-p1y));
        var rectWidth = Math.sqrt((p2x-p1x)*(p2x-p1x));
        totArea += rectHeight * rectWidth * imageScale;
    }
    totCost = totArea * costConv;
    totCarbon = totArea * carbonConv;
    document.getElementById("totalArea").innerHTML = totArea;
    document.getElementById("totalCarbon").innerHTML = totCarbon;
    document.getElementById("totalCost").innerHTML = totCost;
}