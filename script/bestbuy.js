var apiKey = "gjzavud4vw6puz7n7yuuhfxs";
var modelNum;
var reviews = [];
getData = function(modelNum) {
  $.ajax({
    url:"http://api.bestbuy.com/v1/products&modelNumber=" + modelNum + "?show=name,sku&apiKey=" + apiKey;
  }).done(function(response){
    getReviews = function(response){
      $.ajax({
        url:"http://api.bestbuy.com/v1/reviews(sku=" + response.prodcts[0].sku + "&apiKey=" + apiKey + "&show=rating,submissionTime"
      }).done = function(response){
        for(i=0;i<response.length;i++){
          reviews[i] = {response.rating, response.submissionTime};
        }
      }
    }
  })
}
setModelNum = function(num){
  modelNum = num;
}
getReviews = function(){
  return(reviews);
}
