let containerElem = document.querySelector('.cartPage .row')
let productsDiv = document.querySelector('.cartProducts');
let totalSpan = document.querySelector('#totcost');
let checkoutBtn = document.getElementById('checkoutBtn');
let total = localStorage.totlaCost ? localStorage.totlaCost : 0;

function drawProduct() {
    let cartItem = JSON.parse(localStorage.getItem('myProducts'));
    if (cartItem != null && Object.keys(cartItem).length != 0) {
        productsDiv.innerHTML = ""
        Object.values(cartItem).map(product => {
            productsDiv.innerHTML += `  <div class="product row my-3 bg-light  mx-1">
            <div class="col-2 img">
               <a class='goTOproduct' onclick='goTOproduct(${product.id})'> <img class="w-100 h-100" src="${product.imgURL}" alt=""></a>
            </div>
            <div class="col-3">
                <div class="title cellTitle">${product.title}</div>
                <div class="desc">${product.desc}</div>
                <div class="color">Color : ${product.chosenColor}</div>
                <div class="size">Size : ${product.chosenSize.toUpperCase()}</div>
            </div>
            <div class="col-2">
                <div class="cellTitle">Price</div>
                <div class="price">${product.price}$</div>
            </div>
            <div class="col-2">
                <div class="cellTitle">Quantity</div>
                <div class="qty">${product.qty}</div>
            </div>
            <div class="col-2">
                <div class="cellTitle">Total</div>
                <div class="total">${product.qty*product.price}$</div>
            </div>
            <div class="col-1 ps-2">
                <button class="delete" onclick='remove(${product.id})'>x</button>
            </div>
        </div>`;
        })
        totalSpan.textContent = total;
        checkoutBtn.addEventListener('click', () => {
            window.location = 'payment.html';
        })
        // addEvents_goTOproduct()
    } else {
        containerElem.innerHTML = `
        <div class='products-delted-all m-auto bg-danger text-light fs-4 text-center w-75 rounded pt-2'>Cart is Empty</div>
        `
        localStorage.removeItem('totlaCost')
    }
}
drawProduct()

function remove(product) {
    let cartItem = JSON.parse(localStorage.getItem("myProducts"));
    let totalCost = JSON.parse(localStorage.getItem("totlaCost"));
    localStorage.setItem("totlaCost", totalCost - cartItem[product].qty * cartItem[product].price);
    delete cartItem[product];
    localStorage.setItem("myProducts", JSON.stringify(cartItem));
    drawProduct()
    showTotalCost();
    drawMenuProducts();
}
showTotalCost();

function goTOproduct(id) {
    localStorage.setItem(
        "product",
        JSON.stringify(id)
    );
    window.location = "product.html";
}