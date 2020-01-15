var width;
var height;
var imageScale;
var imageObject;
var isImageInput = false;


function debug_alert(info) {
    //alert(info);
    console.log(info);
}

function countUtf8Bytes(s){
    var b = 0, i = 0, c
    for(;c=s.charCodeAt(i++);b+=c>>11?3:c>>7?2:1);
    return b
}

function roundToNDecimalPlaces(value, decimalPlaces) {
    return Number(Math.round(parseFloat(value + 'e' + decimalPlaces)) + 'e-' + decimalPlaces);
}

function encodeImageFileAsURL() {
    debug_alert("encodeImageFileAsURL has begun");
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

        const base64 = fileReader.result.split(",").pop();
        debug_alert("Image file uploaded has " + countUtf8Bytes(base64) + " bytes.");

        img.onload = function() {
            width = img.width; // image is loaded; sizes are available
            height = img.height;
        };
        
        sendToBackend(base64);
      }
      fileReader.readAsDataURL(fileToLoad);
    }
  }

  function sendToBackend(base64String) {
    debug_alert("sendToBackend has begun");
    if (window.XMLHttpRequest) {
        // code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    } else {
        // code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log("sendToBackend: Sent successfully to backend");
            isImageInput = true;
        }
    };
    
    //console.log(base64String);
    xmlhttp.open("POST","./set-data", true);
    xmlhttp.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xmlhttp.setRequestHeader('Content-type', 'text/plain');
    xmlhttp.send(base64String);
}

function submitImages() {
    debug_alert("submitImages has begun");
    if (isImageInput == false) {
        debug_alert(NO_IMAGE_WARNING_STRING);
        return;
    }
    imageScale = document.getElementById("imageScaleInput").value;
    analyzeImage();
}

function analyzeImage() {
    debug_alert("analyzeImage has begun");
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
    debug_alert("displayValues has begun");
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
        totArea += rectHeight * rectWidth / imageScale;
    }
    totCost = totArea * costConv;
    totCarbon = totArea * carbonConv;
    document.getElementById("totalArea").innerHTML = roundToNDecimalPlaces(totArea,2) + " meters squared";
    document.getElementById("totalCarbon").innerHTML = roundToNDecimalPlaces(totCarbon,2) + " tons of carbon";
    document.getElementById("totalCost").innerHTML = "$" + roundToNDecimalPlaces(totCost,2) + " CDN";
}