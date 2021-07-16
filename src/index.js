import './global.css';
import axios from "axios";

/* Jesse's Prod Account
const API_KEY = "f7073c13332f894e01b07436f1bab2f3"; // prod
const API_PATH = 'https://liveapi.yext.com/v2/accounts/me/reviewSubmission'; // prod
*/

// Jesse's QA Account
const API_KEY = "d1c315db5c0e3e73586da63e8dbdf7c8"; // QA
const API_PATH = 'https://liveapi-qa.yext.com/v2/accounts/me/reviewSubmission'; // QA

/*
// Aly's QA Account
const API_KEY = "d6503f45eda9eb678975eb317eef746e";
const API_PATH = 'https://liveapi-qa.yext.com/v2/accounts/me/reviewSubmission'; // QA
*/



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
    url: API_PATH,
    params: {api_key: API_KEY, v: '20210401'},
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