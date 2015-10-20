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
var n = url.substring(url.indexOf("&q")+3, url.length);
for(i = 0; i < n.length; i++){
  if(n.charAt(i) == '+')
  {
    n = n.substring(0,i) + " " + n.substring(i+1, n.length);
  }
}
  var request = {placeId: n};
  service = new google.maps.places.PlacesService(document.getElementById('poop'));
  service.getDetails(request, callback2);
  function callback2(place, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      try{
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
    } catch(error){}
      //ratings array
      var ratings = [];
      //date array
      var dateOfReview = [];
      var n = 0;
      try{
      while(n < place.reviews.length){
        if(n<=4){
          ratings[n] = place.reviews[n].rating;
          dateOfReview[n] = place.reviews[n].time;

          //dateOfReview[n] = moment.unix(place.reviews[n].time).format("MM/DD/YYYY");
        }else {
          ratings[n] = n;
        }
        n++;
      }
    }catch(error){}
      //sorting array
      var dateHolder;
      var ratingHolder
      for (i = 0; i < dateOfReview.length; i++) {
        for (j = 1; j < i; j++) {
          if(dateOfReview[j] < dateOfReview[i]) {
            dateHolder = dateOfReview[i];
            dateOfReview[i] = dateOfReview[j];
            dateOfReview[j] = dateHolder;

            ratingHolder = ratings[i];
            ratings[i] = ratings[j];
            ratings[j] = ratingHolder;
          }
        }
      }
      //unix to date
      for (i = 0; i < dateOfReview.length; i++) {
        dateOfReview[i] = moment.unix(dateOfReview[i]).format("MM/DD/YYYY");
      }

      //reverse arrays
      ratings.reverse();
      dateOfReview.reverse();

      //adding vales to fix scale
      ratings[5] = 0;
      ratings[6] = 5;

      //Average over last 5
      var avg = 0;
      for (i = 0; i < ratings.length; i++) {
        avg += ratings[i];
      }
      avg /= ratings.length;
      avg = avg.toFixed(2);

      //percent difference
      var totalRating = $(".bus-rating").text();
      var timesDifference = avg / totalRating;
      var percentChange = timesDifference * 100;
      var percentChange = percentChange.toFixed(2);

      if(percentChange < 50) {
        $("#lastFive").text("Over the las 5 reviews, " + place.name + " has declined. Their rating is " + percentChange + "% of what it used to be.")
      } else if (percentChange >= 50 && percentChange < 100) {
        $("#lastFive").text(place.name + " is beginning to decline. Their average review has gone down " + (100 - percentChange).toFixed(2) + "%.");
      } else if (percentChange >= 100 && percentChange < 150) {
        $("#lastFive").text(place.name + " has been making a turn for the better. Their average review has gone up " + (percentChange - 100).toFixed(2) + "%.");
      } else {
        $("#lastFive").text(place.name + " is doing very well recently. Their average review has gone up " + (percentChange - 100).toFixed(2) + "%.");
      }

      //populating

      //GRAPH
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
