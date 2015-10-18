function walmartApi(){
  var apiKey = vkxyfy6zmd4ddfg5ve6asw6a;

  function urlFormat(){
    var url = window.location.search.substring(1);
    var n = url.substring(2, url.indexOf("&s"));
    for(i = 0; i < n.length; i++){
      if(n.charAt(i) == '+')
      {
        n = n.substring(0,i) + " " + n.substring(i+1, n.length);
      }
    }
    console.log(n);
    return n;
  }
  function findProductIds(n) {
    $.getJSON("http://api.walmartlabs.com/v1/search?apiKey=" + apiKey + "&query=" + urlFormat, callback;
      var results = [];
      function callback(items) {
        for (i=0; i< items.length; i++){
          results [i] = items[i].itemId;
          console.log(results[i]);
        }
      }
      return results;
  }
  function getReviews(itemId){
    $.getJSON("http://api.walmartlabs.com/v1/reviews/" + itemID + "?apiKey=" + apiKey + "&format=json", callback);
    var reviewData = [];
    callback(reviews){
      for(i=0; i<reviews.length; i++){
        reviewData[i] = {reviews.overallRating.rating, reviews.submissionTime};
    }
    return reviewData;
    }
  }
}
