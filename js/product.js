// let userNamenav = document.querySelector('#user')
// let userNameElem = document.querySelector('.fa-user');
// userNameElem.addEventListener('click', ()=>{
//   window.location = 'register.html'
// })
// let user = localStorage.getItem('user');
// if (user != null) {
//   userNamenav.innerHTML = user
// }
// end user

let productId = JSON.parse(localStorage.getItem("product"));
let productTitle = document.querySelector(".p-title");
let productPrice = document.querySelector(".price");
let productDesc = document.querySelector(".desc");
let productImg = document.querySelector(".single-product img");
let addBtn = document.getElementById('addBtn');
let chosenSize = '';
let chosenColor = '';

(() => {
  let product = getProduct();
  productTitle.innerHTML = product.title;
  productPrice.innerHTML = product.price + "$";
  productDesc.innerHTML = product.desc;
  productImg.src = product.imgURL;
})();

function getProduct() {
  return (machedProduct = productsDB.find((item) => item.id == productId));
}
let sizesBtns = document.querySelectorAll('.sizes .btn-check');
sizesBtns.forEach((btn) => {

  btn.addEventListener('click', (e) => {

    chosenSize = e.target.nextElementSibling.innerHTML.toLowerCase();


  })
});
let colorBtns = document.querySelectorAll('.colores .btn-check');
colorBtns.forEach((btn) => {

  btn.addEventListener('click', (e) => {

    chosenColor = e.target.id;



  })
});
addBtn.addEventListener('click', (e) => {
  let cartItem = localStorage.getItem("user")
  if (cartItem != null && Object.keys(cartItem).length != 0) {
    setItem(productId);
  } else {
    window.location = 'register.html'
  }
});


function setItem(product) {
  console.log(result);
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
  cartItem[product].chosenSize = chosenSize;
  cartItem[product].chosenColor = chosenColor;
  localStorage.setItem("myProducts", JSON.stringify(cartItem));
  drawMenuProducts();
  showTotalCost();
}