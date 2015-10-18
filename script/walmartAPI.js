var apiKey = "vkxyfy6zmd4ddfg5ve6asw6a";
var reviewScores=[];
var reviewDates=[];
searchMart = function(item){
//var data = $.getJSON("http://api.walmartlabs.com/v1/search?apiKey=" + apiKey + "&query=" + item);
$.ajax({
  url:"http://api.walmartlabs.com/v1/search?apiKey=" + apiKey + "&query=" + item
}).done(function(response){
  // Anything within this function will be called AFTER the ajax call comes back
  console.log(getItems(response));
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
    console.log(reviews);
    getScores(reviews);
});
}
getScores = function(response, callback2){
      console.log(response);
     for(i = 0; i<response.length;i++) {
       reviewScores[i] = response[i].overallRating.rating;
     }
     callback3 = function(response){
        console.log(reviewScores);
        console.log(reviewDates);
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
       console.log("t");
       for(i = 0; i<response.length;i++) {
         reviewDates[i] = response[i].submissionTime;
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
// getItems = function(data){
//   return(data.items);
// }

getReviewsTable = function(data){
 return(data.reviews);
}
