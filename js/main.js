// start nav-bar
// set variable

let viewBtns;
let productsDiv = document.querySelector(".our-products .products");
let viewAllProducts_Btn = document.getElementById('all-products-btn')
let drawProducts;
// invoke function to draw the products
(drawProducts = (items, div) => {
  items.forEach((product) => {
    div.innerHTML += `
     <div class="col">
          <div div class = "card shadow product m-auto mb-3 position-relative" data-id = "${product.id}" >
            <img src="${product.imgURL}" class="card-img-top" alt="...">
            <div class="card-body d-flex  justify-content-between">
              <h5 class="card-title">${product.title}</h5>
              <span class="price">${product.price}$</span>
            </div>
            <div class="buttons">
              <button class=" rounded-pill mb-2 add-product">Add</button>
              <button class=" rounded-pill view-product">View</button>
            </div>
          </div>
        </div>
  `;
  });
  addEvent_ToAddBtn();
  addEvents_ToViewBtn();
})(productsDB, productsDiv);

function addEvents_ToViewBtn() {

  viewBtns = document.querySelectorAll(".our-products .product .view-product");

  viewBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      let product = e.target.parentElement.parentElement;
      localStorage.setItem(
        "product",
        JSON.stringify(product.getAttribute("data-id"))
      );
      window.location = "product.html";
    });
  });
}

function addEvent_ToAddBtn() {
  addBtn = document.querySelectorAll(".our-products .product .add-product");
  addBtn.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      let cartItem = localStorage.getItem("user")
      if (cartItem != null && Object.keys(cartItem).length != 0) {
        let product = e.target.parentElement.parentElement.getAttribute("data-id");

        setItem(product);

      } else {
        window.location = 'register.html'
      }
    });
  });
}
// setitem function
function setItem(product) {

  let cartItem = JSON.parse(localStorage.getItem("myProducts"));
  if (cartItem != null) {
    if (cartItem[product] == undefined) {
      cartItem = {
        ...cartItem,
        [product]: productsDB[product],
      };
      cartItem[product].qty = 0;
      cartItem[product].qty += 1;
      totalCost(product);
    }else{
     result = confirm('tthis item already exist do you want increase quantity')
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
if (viewAllProducts_Btn) {
  viewAllProducts_Btn.addEventListener('click', () => {
    window.location = 'allProducts.html';
  });
}
window.onscroll = function () {
  scrollFunction()
};

function scrollFunction() {
  let header = document.querySelector("header");
  let logo = document.querySelector(".logo");
  let links = document.querySelectorAll('header nav a');
  let icons = document.querySelectorAll('header nav i');
  let dropDownSpan = document.querySelectorAll('.drow-down-item span')
  dropDownSpan.forEach(span=>{
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
