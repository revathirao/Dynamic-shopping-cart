const productNameInput = document.getElementById('product-name');
const productPriceInput = document.getElementById('product-price');
const productQuantity = document.getElementById('product-quantity');
const addProductButton = document.getElementById('add-product');
const cart = document.getElementById('cart');
const totalPriceSpan = document.getElementById('total-price');

let cartList = [];
let totalPrice = 0;

// Function to update the total price
function updateTotalPrice(amount) {
    totalPrice += amount;
    totalPriceSpan.textContent = totalPrice.toFixed(2);
}

// Function to remove an item
function removeItem(event) {
  const item = event.target.closest('li');  
    // Find index of the item in the cartList
    const index = Array.from(cart.children).indexOf(item);

    if (index > -1) {
        // Subtract that item's total from the totalPrice
        const itemTotal = cartList[index].price * cartList[index].quantity;
        totalPrice -= itemTotal;
        totalPriceSpan.textContent = totalPrice.toFixed(2);

        // Remove from cartList array
        cartList.splice(index, 1);
    }

    // Remove from DOM
    item.remove();
}


function addProducts() {
    let userInputProductNme = productNameInput.value.trim();
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
    let price = parseFloat(userInputProducPrice)
    let quantity = parseFloat(userInputQuantity)

    if (isNaN(price) || price < 0) {
        alert("Enter a valid positive number for price");
        return;
    }
    else if (isNaN(quantity) || quantity < 1) {
        alert("Enter a valid quantity (at least 1)");
        return;
    }

    else if (Math.round(price * 100) !== price * 100) {
        alert("Price can have at most 2 decimal places");
        return;
    }

    cartList.push({ userInputProductNme, price, quantity })
    displayCart();
    updateTotalPrice(price * quantity)

    // Clear inputs
    productNameInput.value = "";
    productPriceInput.value = "";
    productQuantity.value = "";
}

addProductButton.addEventListener("click", addProducts);


function displayCart() {
    cart.replaceChildren();
    const fragment = document.createDocumentFragment();

    if (cartList.length === 0) {

        const li = document.createElement('li');
        li.textContent = "Shopping cart is empty";
        fragment.appendChild(li);
    }
    else {
        for (let i = 0; i < cartList.length; i++) {
            
            let li = document.createElement("li")
            li.textContent = `${cartList[i].userInputProductNme} - $${cartList[i].price.toFixed(2)} - Qty: ${cartList[i].quantity}`;

            // Add the calculated price from the data attribute to the item’s text
            const itemPrice = calculatePrice(cartList[i].price, cartList[i].quantity).toFixed(2);
            li.textContent += ` - Item Total: $${itemPrice}`; // Append item price info

            li.dataset.price = itemPrice; // Store price in the data attribute for later use

            li.appendChild(CreateRemoveButton());

            li.dataset.price = calculatePrice(cartList[i].price, cartList[i].quantity).toFixed(2);


            li.appendChild(createupDateButton(i))
            fragment.appendChild(li)
        }

    }
    cart.appendChild(fragment)
}

function calculatePrice(price, qty) { return price * qty }

function CreateRemoveButton() {
    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove"
    removeBtn.style.marginLeft = "10px"; // small spacing
    removeBtn.classList.add("remove-btn"); // optional for CSS
    removeBtn.addEventListener("click", removeItem);
    return removeBtn;

}

function createupDateButton(index) {
    let upDateBtn = document.createElement("button");
    upDateBtn.textContent = "Update"
    upDateBtn.style.marginLeft = "10px"; // small spacing
    upDateBtn.classList.add("update-btn"); // optional for CSS
    upDateBtn.addEventListener("click", function () {
        updateItem(index);
    });

    return upDateBtn;
}

function updateItem(index) {
    let newQuantity = prompt("Enter new quantity:", cartList[index].quantity);
    if (newQuantity === null) return;
    newQuantity = parseInt(newQuantity);

    if (isNaN(newQuantity) || newQuantity < 1) {
        alert("Enter a valid quantity (at least 1)");
        return;
    }

    cartList[index].quantity = newQuantity;

    // Recalculate total
    totalPrice = cartList.reduce((sum, item) => sum + item.price * item.quantity, 0);
    totalPriceSpan.textContent = totalPrice.toFixed(2);
    displayCart();

}


