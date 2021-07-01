import './global.css';
import axios from "axios";

function importAll(r) {
    let images = {};
    r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
    return images;
}
  
const images = importAll(require.context('./images', false, /\.(png|jpe?g|svg)$/));

document.addEventListener("DOMContentLoaded", function(event) { 
  initializeButton(); 
});

function initializeButton(){
  let el = document.getElementById("submit-button");
  if(el){
    document.getElementById("submit-button").addEventListener("click", function() {
      let userInput = buildReview();

      console.log("Logging from here!!!", JSON.stringify(userInput));
      makeRequestToCreateReview(userInput);
    });
    console.log("event listener is not null")
  }
}


function buildReview(){
  console.log("buildReviewStarting...");
  let reviewerName = document.getElementById("reviewer-name").value; 
  let reviewText = document.getElementById("review-text").value;
  let reviewTitle = document.getElementById("review-title").value;
  let reviewerEmail = document.getElementById("reviewer-email").value;
  let reviewRating = document.getElementById("review-rating").value;
  let fit = document.getElementById("size-selector").value;
  console.log("Reviewer Name", reviewerName);
  console.log("Review Text", reviewText);
  console.log("Review Title", reviewTitle);
  console.log("Reviewer Email", reviewerEmail);
  console.log("Review Rating", reviewRating);
  console.log("Size", fit);
  

  let review = {
    entity: {id: entityId},
    authorName: reviewerName,
    title: reviewTitle,
    rating: reviewRating,
    content: reviewText,
    authorEmail: reviewerEmail,
    status: 'Quarantined',
    reviewLabelNames: [fit]
  };

  return review;
}

function makeRequestToCreateReview(review){
  const options = {
    method: 'POST',
    url: 'https://liveapi.yext.com/v2/accounts/me/reviewSubmission',
    params: {api_key: '540aecd783a3b40d28829b2fa7d52881', v: '20210401'},
    headers: {'Content-Type': 'application/json'}
  };
  options.data = review;
  console.log(JSON.stringify(options));
  
  // makes request
  axios.request(options).then(function (response) {
    console.log(response.data);
  }).catch(function (error) {
    console.error(error);
  });

}