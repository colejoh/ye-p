var apiKey = "vkxyfy6zmd4ddfg5ve6asw6a";
var reviewScores=[];
var reviewDates=[];
searchMart = function(item){
//var data = $.getJSON("http://api.walmartlabs.com/v1/search?apiKey=" + apiKey + "&query=" + item);
$.ajax({
  url:"http://api.walmartlabs.com/v1/search?apiKey=" + apiKey + "&query=" + item
}).done(function(response){
  // Anything within this function will be called AFTER the ajax call comes back
  //console.log(getItems(response));
  var objectArray = getItems(response);
  var currentHTMLValue;
  for (i = 0; i < objectArray.length; i++) {
    currentHTMLValue = $("#main_wrapper").html();
    var desc = (objectArray[i].shortDescription.substring(0, 100)) + "...";
    $("#main_wrapper").html(currentHTMLValue +
      "<a href='../info/index.html?q=" + objectArray[i].itemId + "&type=product'><div class='container'><div class='row'><div class='product-wrapper'><div class='name'>"
        + objectArray[i].name +
      "</div><div class='priceAndRating'> $"
        + objectArray[i].salePrice + " • " + objectArray[i].customerRating +
      " / 5</div><div class='prodDesc'>"
        + desc +
      "</div></div></div></div></a><hr class='breaks'/>"
    );
  }
  console.log(objectArray[0]);
});
//console.log($.getJSON("http://api.walmartlabs.com/v1/search?apiKey=" + apiKey + "&query=" + item).responseJSON.start);
}
getIds = function(items){
  var IDs = [];
  for(i=0; i<items.length;i++) {
    results[i] = items[i].itemId;
  }
  return IDs;
}
getReviews = function(ID) {
  //console.log("http://api.walmartlabs.com/v1/reviews/" + ID + "?apiKey=" + apiKey);
$.ajax({
  url:"http://api.walmartlabs.com/v1/reviews/" + ID + "?apiKey=" + apiKey
}).done(function(response){
    var reviews = getReviewsTable(response);
    getScores(reviews);
});
}
getScores = function(response, callback2){
     for(i = 0; i<response.length;i++) {
       reviewScores[i] = response[i].overallRating.rating;
     }
     callback3 = function(response){
        //console.log(reviewScores);
        //console.log(reviewDates);
        //sorting
        var ratingHolder;
        var dateHolder;
        for (i = 0; i < (reviewDates.length); i++) {
          for (j = 1; j < reviewDates.length; j++) {
            var iDateArray = reviewDates[i].split("-");
            var jDateArray = reviewDates[j].split("-");

            //var iDate = new Date(iDateArray[0], iDateArray[1], iDateArray[2]);
            //var jDate = new Date(jDateArray[0], jDateArray[1], jDateArray[2]);

            var iDate = new Date(reviewDates[i]);
            var jDate = new Date(reviewDates[j]);
            console.log(iDate);
            console.log(jDate);

            var booleanThing = jDate > iDate;
            console.log(booleanThing);

            if (jDate < iDate) {
              dateHolder = reviewDates[i];
              reviewDates[i] = reviewDates[j];
              reviewDates[j] = dateHolder;

              ratingHolder = reviewScores[i];
              reviewScores[i] = reviewScores[j];
              reviewScores[j] = ratingHolder;
             }
           }
         }

        reviewScores[5] = 0;
        reviewScores[6] = 5;
        var lineChartData = {
         labels : reviewDates,
          datasets : [
          {
            label: "My First dataset",
            fillColor : "RGBA(49, 25, 58, .5)",
            strokeColor : "RGBA(49, 25, 58, 1)",
            pointColor : "RGBA(227, 39, 90, .5)",
            pointStrokeColor : "RGBA(227, 39, 90, 1)",
            pointHighlightFill : "RGBA(227, 39, 90, 1)",
            pointHighlightStroke : "RGBA(227, 39, 90, .5)",
            data : reviewScores
          }
          ]
        }
        var ctx = document.getElementById("canvas").getContext("2d");
        window.myLine = new Chart(ctx).Line(lineChartData, {responsive: true});
     }
     callback2 = function(response, callback3){
       for(i = 0; i<response.length;i++) {
         reviewDates[i] = (response[i].submissionTime).substring(0,9);
       }
          callback3(response);
      }
       callback2(response, callback3);
}
getReviewScores = function(data) {
   console.log("test");

}
// getReviewDates = function(reviews) {
//   var dates = [];
//   for(i = 0; i<reviews.length;i++) {
//     dates[i] = reviews[i].submissionTime;
//   }
//   return(dates);
// }
//
getItems = function(data){
   return(data.items);
}

getReviewsTable = function(data){
 return(data.reviews);
}
