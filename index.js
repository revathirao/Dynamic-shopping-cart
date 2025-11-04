const productNameInput = document.getElementById('product-name');
const productPriceInput = document.getElementById('product-price');
const productQuantity = document.getElementById('product-quantity');
const addProductButton = document.getElementById('add-product');
const cart = document.getElementById('cart');
const totalPriceSpan = document.getElementById('total-price');

let cartList = [];
let totalPrice = 0;
// let userInputProductNme;
// let price;
// let quantity

// Function to update the total price
function updateTotalPrice(amount) {
    totalPrice += amount;
    totalPriceSpan.textContent = totalPrice.toFixed(2);
}

// Function to remove an item
function removeItem(event) {
    const item = event.target.closest('li');
    const price = parseFloat(item.dataset.price)|| 0;
    updateTotalPrice(-price);
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
       let  quantity = parseFloat(userInputQuantity)

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

    if (cartList.length === 0) {

        const li = document.createElement('li');
        li.textContent = "Shopping cart is empty";
        fragment.appendChild(li);    } 
    else {
        for (let i = 0; i < cartList.length; i++) {
            let li = document.createElement("li")
            li.textContent = `${cartList[i].userInputProductNme} - $${cartList[i].price.toFixed(2)}- Qty: ${cartList[i].quantity}`;
             li.appendChild(CreateRemoveButton());
            li.dataset.price = (cartList[i].price * cartList[i].quantity).toFixed(2);

            fragment.appendChild(li)
        }
       
    }
     cart.appendChild(fragment)
}

function CreateRemoveButton(){
  const removeBtn = document.createElement("button");
  removeBtn.textContent = "Remove"
   removeBtn.style.marginLeft = "10px"; // small spacing
     removeBtn.classList.add("remove-btn"); // optional for CSS

//   removeBtn.style.backgroundColor = "#ff4d4d";
//   removeBtn.style.color = "white";
//   removeBtn.style.border = "none";
//   removeBtn.style.padding = "5px 10px";
//   removeBtn.style.borderRadius = "5px";

removeBtn.addEventListener("click",removeItem)
  return removeBtn;

}

addProductButton.addEventListener("click", addProducts);
