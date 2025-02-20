document.addEventListener("DOMContentLoaded", function () {
    const shippingName = document.getElementById("shipping-name");
    const shippingAddress = document.getElementById("shipping-address");
    const shippingCity = document.getElementById("shipping-city");
    const shippingZip = document.getElementById("shipping-zip");
    const shippingCountry = document.getElementById("shipping-country");
    
    const billingName = document.getElementById("billing-name");
    const billingAddress = document.getElementById("billing-address");
    const billingCity = document.getElementById("billing-city");
    const billingZip = document.getElementById("billing-zip");
    const billingCountry = document.getElementById("billing-country");
    
    const sameAsShipping = document.getElementById("same-as-shipping");
    
    sameAsShipping.addEventListener("change", function () {
        if (this.checked) {
            billingName.value = shippingName.value;
            billingAddress.value = shippingAddress.value;
            billingCity.value = shippingCity.value;
            billingZip.value = shippingZip.value;
            billingCountry.value = shippingCountry.value;
        } else {
            billingName.value = "";
            billingAddress.value = "";
            billingCity.value = "";
            billingZip.value = "";
            billingCountry.value = "";
        }
    });

    const paymentMethod = document.getElementById("payment-method");
    const cardType = document.getElementById("card-type");

    paymentMethod.addEventListener("change", function () {
        if (this.value === "card") {
            cardType.style.display = "block";
        } else {
            cardType.style.display = "none";
        }
    });

    // Fetch and display order items
    const orderThingsContainer = document.getElementById("order-things");
    const totalPriceElement = document.getElementById("total-price");
    
    let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    let total = 0;

    cartItems.forEach(item => {
        const itemElement = document.createElement("p");
        itemElement.textContent = `${item.name} - $${item.price} x ${item.quantity}`;
        orderThingsContainer.appendChild(itemElement);
        total += item.price * item.quantity;
    });

    totalPriceElement.textContent = `$${total.toFixed(2)}`;

    // Place order
    const placeOrderButton = document.getElementById("place-order");
    const loadingSpinner = document.getElementById("loading");
    const orderMessage = document.getElementById("order");
    
    placeOrderButton.addEventListener("click", function () {
        loadingSpinner.classList.remove("hidden");
        setTimeout(() => {
            loadingSpinner.classList.add("hidden");
            orderMessage.textContent = "Your order has been placed successfully!";
            orderMessage.classList.remove("hidden");
            localStorage.removeItem("cart");
        }, 2000);
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const orderThingsContainer = document.getElementById("order-things");
    const totalPriceElement = document.getElementById("total-price");

    let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    let total = 0;

    orderThingsContainer.innerHTML = ""; // Clear previous items

    cartItems.forEach(item => {
        const itemElement = document.createElement("div");
        itemElement.classList.add("order-item");
        itemElement.innerHTML = `
            <img src="${item.image}" alt="${item.title}" width="50">
            <span>${item.title} (x${item.quantity})</span>
            <span>$${(item.price * item.quantity).toFixed(2)}</span>
        `;
        orderThingsContainer.appendChild(itemElement);
        total += item.price * item.quantity;
    });

    totalPriceElement.textContent = `$${total.toFixed(2)}`;
});

const darkModeToggle = document.getElementById("Toggle-Dark-Mode");

darkModeToggle.addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");
    localStorage.setItem("darkMode", document.body.classList.contains("dark-mode"));
});

// Preserve dark mode on page reload
document.addEventListener("DOMContentLoaded", function () {
    if (localStorage.getItem("darkMode") === "true") {
        document.body.classList.add("dark-mode");
    }
});
