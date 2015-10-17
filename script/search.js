function search() {
  var service = new google.maps.places.PlacesService(document.getElementById('result_wrapper'));
  var coordinates = getLonLat();
  console.log(coordinates);
  var query = readGet();
  console.log(query);
  var resultIDArray = {};

  service.nearbySearch({
    location: coordinates,
    radius: 5000,
    name: query
  }, callback1);

  function callback1(place, status) {
    console.log(status);
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      console.log(place[0].place_id);
      for (i = 0; i < 10; i++) {
        resultIDArray[i] = place[i].place_id;
      }
    }
  return resultIDArray;
}

function readGet() {
  var url = window.location.search.substring(1);
  var n = url.substring(2, url.indexOf("&s"));
  for(i = 0; i < n.length; i++) {
    if(n.charAt(i) == '+') {
      n = n.substring(0,i) + " " + n.substring(i+1, n.length);
    }
  }
  return n;
}

function getLonLat() {
  $.getJSON("http://www.telize.com/geoip?callback=?", function(json) {
    sessionStorage.latitude = json.latitude;
    sessionStorage.longitude = json.longitude;
  });
  var latitude = Number(sessionStorage.latitude);
  var longitude = Number(sessionStorage.longitude);
  var coordinates = {lat: latitude, lng: longitude};
  return coordinates;
};
