
var measurement = "celsius";
var tempF = 0;



// Change the temperature measurement.
function changeMeasurement() {
  var id = event.target.id;
  if (id != measurement) {
    document.getElementById(measurement).classList.add('fade');
    document.getElementById(id).classList.remove('fade');
    measurement = id;
    console.log(measurement);

    if (tempF != 0) {
      switch(measurement) {
        case "celsius":
          temp.innerHTML = Math.floor((tempF -32) * 5 / 9) + "&#176;C";
          break;
        case "fahrenheit":
          temp.innerHTML = Math.floor(tempF) + "&#176;F";
          break;
        default:
          temp.innerHTML = tempF + "&#176;F";
      }
    }
  }
}


function bgInit() {
  var latLng = new google.maps.LatLng("-37.819851", "144.9736327");

  var mapOptions = {
    zoom: 15,
    streetViewControl: false,
    scaleControl: false,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    center: latLng
  };

  var map = new google.maps.Map(document.getElementById('mapsBG'), mapOptions);

}


function updateBackground(lat, lon) {

  var latLng = new google.maps.LatLng(lat, lon);

  var mapOptions = {
    zoom: 15,
    streetViewControl: false,
    scaleControl: false,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    center: latLng
  };

  var map = new google.maps.Map(document.getElementById('mapsBG'), mapOptions);

  console.log("Map function run");
}

function success(position) {
  var lat = position.coords.latitude,
      lon = position.coords.longitude,
      city = document.getElementById('city'),
      temp = document.getElementById('temp'),
      icon = document.getElementById('icon');

  var xhr = new XMLHttpRequest();

  // add ap id key
  xhr.open("GET", "https://crossorigin.me/https://api.darksky.net/forecast/2d34a028a93bb37ae50efbde27a51372/" + lat +"," + lon, true);

  xhr.onload = function() {

    var jsonData = JSON.parse(xhr.response);
    tempF = jsonData.currently.temperature;

    city.innerHTML = jsonData.name;

    if (measurement == "celsius") {
      temp.innerHTML = Math.floor(((tempF - 32) * 5) / 9) + "&#176;C";
    } else {
      // temp.innerHTML = Math.floor(tempC * (9 / 5) - 459.67) + "&#176;F";
      temp.innerHTML = Math.floor(tempF) + "&#176;F";
    }

    // updateBackground(lat, lon, jsonData.main.temp);
    updateBackground(lat, lon);

  }

  xhr.send();

};

function error() {
  city.innerHTML = "Unable to locate";
}



google.maps.event.addDomListener(window, 'load', bgInit);


document.addEventListener('DOMContentLoaded', function() {
   // your code here

   if ('geolocation' in navigator) {
     navigator.geolocation.getCurrentPosition(success, error);
   } else {
     city.innerHTML = "<span>Geolocation is not suported by your browser</span>";
   }

}, false);
