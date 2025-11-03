const productNameInput = document.getElementById('product-name');
const productPriceInput = document.getElementById('product-price');
const productQuantity = document.getElementById('product-quantity');
const addProductButton = document.getElementById('add-product');
const cart = document.getElementById('cart');
const totalPriceSpan = document.getElementById('total-price');

let cartList = [];
let totalPrice = 0;
let userInputProductNme;
let price;
let quantity

// Function to update the total price
function updateTotalPrice(amount) {
    totalPrice += amount;
    totalPriceSpan.textContent = totalPrice.toFixed(2);
}

// Function to remove an item
function removeItem(event) {
    const item = event.target.closest('li');
    const price = parseFloat(item.dataset.price);
    updateTotalPrice(-price);
    item.remove();
}

function addProducts() {
    userInputProductNme = productNameInput.value.trim();
    let userInputProducPrice = productPriceInput.value.trim();
    let userInputQuantity = productQuantity.value.trim()

    if (userInputProductNme === "") {
        alert("Enter the product name")
        return;
    } else if (userInputProducPrice === "") {
        alert("Enter the product price")
        return
    } else if (userInputQuantity === "") {
        alert("Enter the Quantity")
        return
    }
    // create textcontent for product name and price
    price = parseFloat(userInputProducPrice)
    quantity = parseFloat(userInputQuantity)

    if (isNaN(price) || price < 0) {
        alert("Enter a valid positive number for price");
        return;
    }
    if (isNaN(quantity) || quantity < 1) {
        alert("Enter a valid quantity (at least 1)");
        return;
    }

    cartList.push({ userInputProductNme, price, quantity })
    displayCart();
    // //create li
    // let li = document.createElement("li")
    // li.textContent = `${userInputProductNme} - $${price.toFixed(2)}- Qty: ${quantity}`;

    // //append the li to ul_Shoppinglist
    // cart.appendChild(li)

    // Clear inputs
    productNameInput.value = "";
    productPriceInput.value = "";
    productQuantity.value = "";
}

function displayCart() {
    cart.replaceChildren();
    const fragment = document.createDocumentFragment();

    if (cartList === 0) {
        alert("Shopping cart is emplty")
    } else {
        for (let i = 0; i < cartList.lengtht; i++) {
            let li = document.createElement("li")
            li.textContent = `${userInputProductNme} - $${price.toFixed(2)}- Qty: ${quantity}`;

            fragment.appendChild(li)

        }
        cart.appendChild(fragment)
    }
}