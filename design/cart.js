document.addEventListener("DOMContentLoaded", function () {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartCount = document.getElementById("count");
    const cartItemsContainer = document.getElementById("cart-items");
    const subtotalElement = document.getElementById("subtotal");
    const taxElement = document.getElementById("tax");
    const totalElement = document.getElementById("total");
    const shippingCost = 5.00;
    const taxRate = 0.10;
    
    function updateCartDisplay() {
        cartItemsContainer.innerHTML = "";
        let subtotal = 0;

        cart.forEach((item, index) => {
            const cartItem = document.createElement("li");
            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.title}" width="50">
                <span>${item.title} - $${item.price.toFixed(2)} (x${item.quantity})</span>
                <button class="remove-item" data-index="${index}">Remove</button>
            `;
            cartItemsContainer.appendChild(cartItem);
            subtotal += item.price * item.quantity;
        });
        
        cartCount.textContent = cart.length;
        subtotalElement.textContent = subtotal.toFixed(2);
        taxElement.textContent = (subtotal * taxRate).toFixed(2);
        totalElement.textContent = (subtotal + subtotal * taxRate + shippingCost).toFixed(2);
        localStorage.setItem("cart", JSON.stringify(cart));
    }
    
    document.querySelectorAll("#add-to-cart").forEach(button => {
        button.addEventListener("click", function (event) {
            const productElement = event.target.closest(".product-details");
            const product = {
                image: productElement.querySelector("img").src,
                title: productElement.querySelector("h2").textContent,
                price: parseFloat(productElement.querySelector("#product-price").textContent),
                quantity: 1
            };
            
            const existingItem = cart.find(item => item.title === product.title);
            if (existingItem) {
                existingItem.quantity++;
            } else {
                cart.push(product);
            }
            updateCartDisplay();
        });
    });

    cartItemsContainer.addEventListener("click", function (event) {
        if (event.target.classList.contains("remove-item")) {
            const index = event.target.getAttribute("data-index");
            cart.splice(index, 1);
            updateCartDisplay();
        }
    });
    
    updateCartDisplay();
    
    document.getElementById("Toggle-Dark-Mode").addEventListener("click", function () {
        document.body.classList.toggle("dark-mode");
        localStorage.setItem("darkMode", document.body.classList.contains("dark-mode"));
    });
    
    if (localStorage.getItem("darkMode") === "true") {
        document.body.classList.add("dark-mode");
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const wishlistButtons = document.querySelectorAll(".save-to-wishlist");

    wishlistButtons.forEach((button) => {
        button.addEventListener("click", function () {
            const productSection = this.closest(".product-details");

            const product = {
                image: productSection.querySelector("img").src,
                title: productSection.querySelector("h2").textContent,
                price: parseFloat(productSection.querySelector("#product-price").textContent),
            };

            let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

            // Prevent duplicate items in the wishlist
            const isExisting = wishlist.some((item) => item.title === product.title);
            if (!isExisting) {
                wishlist.push(product);
                localStorage.setItem("wishlist", JSON.stringify(wishlist));
                alert("Item added to Wishlist!");
            } else {
                alert("Item is already in your Wishlist!");
            }
        });
    });
});
