// varibles
let menuBtn = document.querySelector("#menu-bar");
let mobileNav = document.querySelector(".mobile-nav");
let closeMenuBtn = document.querySelector("#close-nav");
let closeProductsBtn = document.querySelector("#close-product");
let opneProductsBtn = document.querySelector("#cart-btn");
let productMenu = document.querySelector(".my-products");
let dropDownBtn = document.querySelector("#dowp-down");
let dropDownItem = document.querySelector(".drow-down-item");
let userName = document.querySelector('#user')
let userNameElem = document.querySelector('.fa-user');
//search varibles
let searchToggole = document.querySelector("#search-toggole");
let searchBar = document.querySelector(".search-bar-container");
let searchBarInput = document.getElementById("search-bar");
let searchBtn = document.getElementById("search");
let searchFilterBtn = document.getElementById("search-filter-btn");
let filterMenu = document.querySelector(".search-filter-menu");
let closeFilters = document.getElementById("close-filters");
let filterCheckboxes_category = document.querySelectorAll(
  ".category .form-check-input"
);
let filterCheckboxes_size = document.querySelectorAll(
  ".size .form-check-input"
);
let checkedCategories = [];
let checkedSizes = [];
let priceRange = [];


// start function
searchToggole.addEventListener("click", () => {
  searchBar.classList.toggle("active");
  mobileNav.classList.remove("active");
});
menuBtn.addEventListener("click", () => {
  searchBar.classList.add("active");
  mobileNav.classList.add("active");
  productMenu.classList.remove("active");
});
closeMenuBtn.addEventListener("click", () => {
  mobileNav.classList.remove("active");
});
dropDownBtn.addEventListener("click", () => {
  dropDownItem.classList.toggle("active");
});
opneProductsBtn.addEventListener("click", () => {
  let cartItem = JSON.parse(localStorage.getItem("myProducts"));
  if (cartItem != null && Object.keys(cartItem).length != 0) {
    productMenu.classList.add("active");
    mobileNav.classList.remove("active");
  }
});
closeProductsBtn.addEventListener("click", () => {
  productMenu.classList.remove("active");
});
userNameElem.addEventListener('click', () => {
  window.location = 'register.html'
})
let user = localStorage.getItem('user');
if (user != null) {
  userName.innerHTML = user
}
// setitem function
// setitem function

// ******************************************************
let result;
let x;
function setItem(product) {
  x = result
  let cartItem = JSON.parse(localStorage.getItem("myProducts"));
  if (cartItem != null) {
    if (cartItem[product] == undefined) {
      cartItem = {
        ...cartItem,
        [product]: productsDB[product],
      };
      cartItem[product].qty = 0;
      totalCost(product);
    }else{
      result = confirm('this item already exist do you want increase quantity')
      if (result) {
        cartItem[product].qty += 1;
        totalCost(product);
      }else{
        console.log(result);
      }
    }
  } else {
    productsDB[product].qty = 1;
    cartItem = {
      [product]: productsDB[product],
    };
    totalCost(product);
  }
  localStorage.setItem("myProducts", JSON.stringify(cartItem));
  drawMenuProducts();
  
  showTotalCost();
}
// draw products from localStorage
function drawMenuProducts() {
  let myProducts = JSON.parse(localStorage.getItem("myProducts"));
  let productsMenuContainer = document.querySelector(".myProduct");
  let cartNumber = document.querySelector("#cart-btn span");
  if (myProducts && productsMenuContainer) {
    productsMenuContainer.innerHTML = "";
    Object.values(myProducts).map((product) => {
      productsMenuContainer.innerHTML += `<div class="products-details">
      <div class="products-info">
        <img src= ${product.imgURL} alt="">
        <span>${product.title}</span>
      </div>
      <div class="count-btn">
        <i onclick='decreaseQty(${
          product.id
        })' class="fa fa-minus" aria-hidden="true"></i>
        <span>${product.qty}</span>
        <i onclick='increaseQty(${
          product.id
        })' class="fa fa-plus" aria-hidden="true"></i>
      </div>
      <span id="prise">${product.price * product.qty}$</span>
      <i onclick='remove(${product.id})' class="fa fa-times" aria-hidden="true"></i>
    </div>`;
    });
  }
  if (myProducts != null) {
    cartNumber.innerHTML = Object.values(myProducts).length;
  }

}
drawMenuProducts();
// total cost function
function totalCost(product) {
  let cartItem = JSON.parse(localStorage.getItem("totlaCost"));
  if (cartItem != null) {
    localStorage.setItem("totlaCost", productsDB[product].price + cartItem);
  } else {
    localStorage.setItem("totlaCost", productsDB[product].price);
  }
}
// show total cost function
function showTotalCost() {
  let cartItem = JSON.parse(localStorage.getItem("myProducts"));
  let totalCost = JSON.parse(localStorage.getItem("totlaCost"));
  let totalCostEle = document.querySelector("#total-cost");
  if (totalCost != null) {
    totalCostEle.innerHTML = `Total Cost :  ${totalCost}$`;
  }
  if (cartItem != null) {
    if (Object.keys(cartItem).length == 0) {
      productMenu.classList.remove("active");
    }
  }
}
// decreaseQty function
function decreaseQty(product) {
  let cartItem = JSON.parse(localStorage.getItem("myProducts"));
  let totalCost = JSON.parse(localStorage.getItem("totlaCost"));
  if (cartItem[product].qty > 1) {
    localStorage.setItem("totlaCost", totalCost - cartItem[product].price);
    cartItem[product].qty -= 1;
  } else {
    cartItem[product].qty = 1;
  }
  localStorage.setItem("myProducts", JSON.stringify(cartItem));
  drawMenuProducts();
  showTotalCost();
}
// increaseQty functio
function increaseQty(product) {
  let cartItem = JSON.parse(localStorage.getItem("myProducts"));
  let totalCost = JSON.parse(localStorage.getItem("totlaCost"));
  if (cartItem[product].qty >= 1) {
    localStorage.setItem("totlaCost", totalCost + cartItem[product].price);
    cartItem[product].qty += 1;
  } else {
    cartItem[product].qty += 1;
  }
  localStorage.setItem("myProducts", JSON.stringify(cartItem));
  drawMenuProducts();
  showTotalCost();
}
// remove function
function remove(product) {
  let cartItem = JSON.parse(localStorage.getItem("myProducts"));
  let totalCost = JSON.parse(localStorage.getItem("totlaCost"));
  localStorage.setItem(
    "totlaCost",
    totalCost - cartItem[product].qty * cartItem[product].price
  );

  delete cartItem[product];
  localStorage.setItem("myProducts", JSON.stringify(cartItem));
  drawMenuProducts();
  showTotalCost();
  // if (cartItem != null) {
  //   if (Object.keys(cartItem).length == 0) {
  //     productMenu.classList.remove("active");
  //     window.location = 'index.html'
  //   }
  // }
}
// end add to cart ******************************************************** (sohaip)
//************************************* */
// ************search******************
//************************************** */

// search when preess Enter
searchBarInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    gotoSearchPage();
  }
});
// search when click on search button

searchBtn.addEventListener("click", (e) => {
  e.preventDefault();

  gotoSearchPage();
});

// open filter menu

searchFilterBtn.addEventListener("click", (e) => {
  e.preventDefault();
  filterMenu.classList.add("active");
});

// close filter menu
closeFilters.addEventListener("click", () => {
  filterMenu.classList.remove("active");
});
// go to search page to see the search results
function gotoSearchPage() {

  if (window.Location != "search.html") {
    window.location = `search.html?text=${searchBarInput.value}`;
  } else {
    let params = new URLSearchParams(window.location.search);
    params.set("text", searchBarInput.value);
  }
  priceRange = [rangeInput[0].value, rangeInput[1].value];
  localStorage.setItem('priceRange', JSON.stringify(priceRange));


}
//*************************************  end search/

// start filter

addEvents_chexboxesFilter(filterCheckboxes_category, checkedCategories, 'checkedCategories');
addEvents_chexboxesFilter(filterCheckboxes_size, checkedSizes, 'checkedSizes');

function addEvents_chexboxesFilter(elements, resultArr, ls_name) {
  elements.forEach((box) => {
    box.addEventListener("click", (e) => {
      let checked = e.target.nextElementSibling.innerHTML.trim().toLowerCase();
      // if checked
      if (e.target.checked) {
        // add it to local storage to send it to search page
        resultArr = [...resultArr, checked];
        localStorage.setItem(
          ls_name,
          JSON.stringify(resultArr)
        );
      }
      // if unchecked
      else {
        // if it have been added before , delete it
        if (resultArr.includes(checked)) {
          resultArr = resultArr.filter(
            (item) => item !== checked
          );
          localStorage.setItem(
            ls_name,
            JSON.stringify(resultArr)
          );
        }
      }
    });
  });
}
//*** */ price range***
const rangeInput = document.querySelectorAll(".range-input input"),
  priceInput = document.querySelectorAll(".price-input input"),
  range = document.querySelector(".slider .progress");
let priceGap = 100;

priceInput.forEach((input) => {
  input.addEventListener("input", (e) => {
    let minPrice = parseInt(priceInput[0].value),
      maxPrice = parseInt(priceInput[1].value);

    if (maxPrice - minPrice >= priceGap && maxPrice <= rangeInput[1].max) {
      if (e.target.className === "input-min") {
        rangeInput[0].value = minPrice;
        range.style.left = (minPrice / rangeInput[0].max) * 100 + "%";
      } else {
        rangeInput[1].value = maxPrice;
        range.style.right = 100 - (maxPrice / rangeInput[1].max) * 100 + "%";
      }
    }
  });
});
rangeInput.forEach((input) => {
  input.addEventListener("input", (e) => {
    let minVal = parseInt(rangeInput[0].value),
      maxVal = parseInt(rangeInput[1].value);

    if (maxVal - minVal < priceGap) {
      if (e.target.className === "range-min") {
        rangeInput[0].value = maxVal - priceGap;
      } else {
        rangeInput[1].value = minVal + priceGap;
      }
    } else {
      priceInput[0].value = minVal;
      priceInput[1].value = maxVal;
      range.style.left = (minVal / rangeInput[0].max) * 100 + "%";
      range.style.right = 100 - (maxVal / rangeInput[1].max) * 100 + "%";
    }
  });
});
//end price range
// end filter
// //////////////////scroll
window.onscroll = function () {
  scrollFunction()
};

function scrollFunction() {
  let header = document.querySelector("header");
  let logo = document.querySelector(".logo");
  let links = document.querySelectorAll('header nav a');
  let icons = document.querySelectorAll('header nav i');
  let dropDownSpan = document.querySelectorAll('.drow-down-item span')
  dropDownSpan.forEach(span => {
    span.style.color = '#000'
  })
  if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
    header.classList.add('bg-dark');
    logo.classList.add('text-light');
    document.querySelector("#user").style.color = '#F7444E';

    links.forEach(link => {
      link.classList.add('text-light');
    });

    icons.forEach(icon => {
      icon.classList.add('text-light');
    });

  } else {
    header.classList.remove('bg-dark');
    logo.classList.remove('text-light');
    links.forEach(link => {
      link.classList.remove('text-light');
    });

    icons.forEach(icon => {
      icon.classList.remove('text-light');
    });

  }
}