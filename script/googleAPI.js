function googleApi(){
  $(document).ready(function() {
    $.getJSON("http://www.telize.com/geoip?callback=?",
    function(json) {
      sessionStorage.latitude = json.latitude;
      sessionStorage.longitude = json.longitude;
    }
  );
});
var id = 0;
var latitude = Number(sessionStorage.latitude);
var longitude = Number(sessionStorage.longitude);
var coordinates = {lat: latitude, lng: longitude};
var service = new google.maps.places.PlacesService(document.getElementById('poop'));
var url = window.location.search.substring(1);
var n = url.substring(2, url.indexOf("&s"));
for(i = 0; i < n.length; i++){
  if(n.charAt(i) == '+')
  {
    n = n.substring(0,i) + " " + n.substring(i+1, n.length);
  }
}
console.log(n);
service.nearbySearch({
  location: coordinates,
  radius: 5000,
  name: n
}, callback1);
function callback1(place, status) {
  console.log(status);
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    console.log(place[0].place_id);
    id = place[0].place_id;
  }
  var request = {placeId: id};
  service = new google.maps.places.PlacesService(document.getElementById('poop'));
  service.getDetails(request, callback2);
  function callback2(place, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      $(".bus-rating").text(place.rating);
      $(".bus-name").text(place.name);
      $("#address").text(place.formatted_address);
      $("#phone").text(place.formatted_phone_number)
      $("#reviewnum").text(place.user_ratings_total);
      $("#monday").text(place.opening_hours.weekday_text[0]);
      $("#tuesday").text(place.opening_hours.weekday_text[1]);
      $("#wednesday").text(place.opening_hours.weekday_text[2]);
      $("#thursday").text(place.opening_hours.weekday_text[3]);
      $("#friday").text(place.opening_hours.weekday_text[4]);
      $("#saturday").text(place.opening_hours.weekday_text[5]);
      $("#sunday").text(place.opening_hours.weekday_text[6]);

      //ratings array
      var ratings = [];
      for (i = 0; i < 5; i++) {
        ratings[i] = place.reviews[i].rating;
      }

      //date array
      var dateOfReview = [];
      for (i = 0; i < 5; i++) {
        dateOfReview[i] = moment.unix(place.reviews[i].time).format("MM/DD/YYYY");
        dateOfReview.reverse();
      }

      var randomScalingFactor = function(){ return 9};
      var lineChartData = {
        labels : dateOfReview,
        datasets : [
          {
            label: "My First dataset",
            fillColor : "RGBA(49, 25, 58, .5)",
            strokeColor : "RGBA(49, 25, 58, 1)",
            pointColor : "RGBA(227, 39, 90, .5)",
            pointStrokeColor : "RGBA(227, 39, 90, 1)",
            pointHighlightFill : "RGBA(227, 39, 90, 1)",
            pointHighlightStroke : "RGBA(227, 39, 90, .5)",
            data : ratings
          }
        ]
      }

      var ctx = document.getElementById("canvas").getContext("2d");
      window.myLine = new Chart(ctx).Line(lineChartData, {responsive: true});

    }
  }
}
}