let info = document.querySelector(".matched-products .info");
let matchedDiv = document.querySelector(".matched-products .products");
let filterd_categories = localStorage.checkedCategories ?
  JSON.parse(localStorage.checkedCategories) : [];
let filterd_prices = localStorage.checkedSizes ?
  JSON.parse(localStorage.checkedSizes) : [];
let filterd_priceRange = localStorage.priceRange ?
  JSON.parse(localStorage.priceRange) : [];

drawSearchResult();

function drawSearchResult() {
  let text = getTextFromURL();

  let categories_matches = [];
  let sizes_matches = [];
  let price_matches = [];
  let matchesArr = [];
  // get matches product 
  // 1- matches text
  let text_matches = productsDB.filter((item) => {
    return item.title.trim().toLowerCase().includes(text.trim().toLowerCase());
  });
  //  2- matches category
  if (filterd_categories.length) {

    filterd_categories.forEach((item) => {

      let res = productsDB.filter(product => product.category == item);
      categories_matches = [...categories_matches, ...res];
    });
  }
  // 3- matched sizes
  if (filterd_prices.length) {

    filterd_prices.forEach((item) => {

      let res = productsDB.filter(product => product.sizes.includes(item));
      sizes_matches = [...sizes_matches, ...res];
    });
  }

  // 4- matched price
  price_matches = productsDB.filter((item) => {

    return item.price >= Number(filterd_priceRange[0]) && item.price <= Number(filterd_priceRange[1]);

  });

  // then get all matches in one array

  let data = [categories_matches, sizes_matches, price_matches, text_matches]

  // get rid of empty arrays if they where sizes or categories because they're optional
  if (categories_matches.length == 0 || sizes_matches.length == 0) {
    data = data.filter(item => item.length != 0);
  }

  //  get the intersection of all filterd arrays
  matchesArr = data.reduce((a, b) => a.filter(c => b.includes(c)));

  matchedDiv.innerHTML = "";

  if (matchesArr.length && text_matches.length) {
    info.innerHTML = ` You searched for <i class="fas fa-quote-left fa-2xs"></i>
                ${text} <i class="fas fa-quote-right fa-2xs"></i>    <span class='ms-4 text-danger fs-6'>(${matchesArr.length})Matches</span> `;
    drawProducts(matchesArr, matchedDiv); // this function in main.js
  } else {
    info.innerHTML = `
    Sorry, there are no matches for <i class="fas fa-quote-left fa-2xs"></i>
                <span >${text}</span> <i class="fas fa-quote-right fa-2xs"></i>
      `;
  }
  localStorage.checkedCategories ? (localStorage.checkedCategories = "") : "";
  localStorage.checkedSizes ? (localStorage.checkedSizes = "") : "";
  localStorage.priceRange ? (localStorage.priceRange = "") : "";
}

function getTextFromURL() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const text = urlParams.get("text");
  return text;
}