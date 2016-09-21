// var icons = {
//   "clear": "",
//   ""
// }


var measurement = "celsius";

// Change the temperature measurement.
function changeMeasurement() {
  var id = event.target.id;

  if (id != measurement) {
    document.getElementById(measurement).classList.add('fade');
    document.getElementById(id).classList.remove('fade');
    measurement = id;
    console.log(measurement);

  //!!!!! Need to update the value of temp when measurmennt change button is clicked !!!!!
    // if (id == "celsius") {
    //
    // } else {
    //   temp.innerHTML =
    // }

  }
}

function bgInit() {
  var latLng = new google.maps.LatLng("-37.819851", "144.9736327");

  var mapOptions = {
    zoom: 15,
    streetViewControl: false,
    scaleControl: false,
    mapTypeId: google.maps.MapTypeId.SATELLITE,
    center: latLng
  };

  var map = new google.maps.Map(document.getElementById('mapsBG'), mapOptions);

}

google.maps.event.addDomListener(window, 'load', bgInit);


function updateBackground(lat, lon) {
  console.log("Latitude: " + lat);
  console.log("Longitude: " + lon);

  var latLng = new google.maps.LatLng(lat, lon);
  console.log("LatLng: " + latLng);

  var mapOptions = {
    zoom: 15,
    streetViewControl: false,
    scaleControl: false,
    mapTypeId: google.maps.MapTypeId.SATELLITE,
    center: latLng
  };
  console.log("Map Options: " + mapOptions);

  var map = new google.maps.Map(document.getElementById('mapsBG'), mapOptions);
  console.log("Map Obj: " + map);

  console.log("Map function run");
}


function geoFindMe() {
  var city = document.getElementById('city');
  var temp = document.getElementById('temp');

  if (!navigator.geolocation) {
    city.innerHTML = "<span>Geolocation is not suported by your browser</span>";
  }

  function success(position) {
    var lat = position.coords.latitude;
    var lon = position.coords.longitude;

    // output.innerHTML = "<span>Latitude: " + latitude + "<br>Longitude: " + longitude + "</span>";

    var xhr = new XMLHttpRequest();
    // add ap id key
    xhr.open("GET", "http://api.openweathermap.org/data/2.5/weather?lat=" + lat +"&lon=" + lon + "&appid=", true);
    xhr.onload = function() {
      var jsonData = JSON.parse(xhr.response);
      city.innerHTML = jsonData.name;
      if (measurement == "celsius") {
        temp.innerHTML = Math.floor(jsonData.main.temp - 273.15) + "&#176;C";
      } else {
        temp.innerHTML = Math.floor(jsonData.main.temp * (9 / 5) - 459.67) + "&#176;F";
      }

      // updateBackground(lat, lon, jsonData.main.temp);
      updateBackground(lat, lon);
    }
    xhr.send();



  };

  function error() {
    city.innerHTML = "Unable to locate";
  }

  navigator.geolocation.getCurrentPosition(success, error);

}
