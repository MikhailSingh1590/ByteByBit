let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(productName, price) {
    cart.push({ productName, price });
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${productName} added to cart!`);
}

function loadCart() {
    const cartList = document.getElementById('cart-list');
    const cartTotal = document.getElementById('cart-total');
    cartList.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
        total += item.price;
        let li = document.createElement('li');
        li.textContent = `${item.productName} - $${item.price.toFixed(2)}`;
        cartList.appendChild(li);
    });

    cartTotal.textContent = total.toFixed(2);
}

document.addEventListener("DOMContentLoaded", function() {
    if (document.getElementById('cart-list')) {
        loadCart();
    }

    const checkoutForm = document.getElementById('checkoutForm');
    if (checkoutForm) {
        checkoutForm.addEventListener("submit", async function (event) {
            event.preventDefault();

            // Collect form data
            const name = document.getElementById("name").value;
            const address = document.getElementById("address").value;
            const payment = document.getElementById("payment").value;
            const email = document.getElementById("email").value; // Ensure checkout form has an email input

            // Validate email
            if (!email) {
                alert("Please enter your email.");
                return;
            }

            // Validate if cart is empty
            if (cart.length === 0) {
                alert("Your cart is empty!");
                return;
            }

            // Save order details for confirmation page
            sessionStorage.setItem("order", JSON.stringify(cart));

            // Prepare the order details (products, prices, and user info)
            const order = cart.map(item => ({
                productName: item.productName,
                price: item.price
            }));

            // Send order confirmation email
            try {
                let response = await fetch("http://localhost:5000/api/email/send-confirmation", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ email, name, address, payment, order })
                });

                let result = await response.json();
                if (response.ok) {
                    alert("Confirmation email sent!");
                    localStorage.removeItem("cart"); // Clear the cart after purchase
                    window.location.href = "confirmation.html"; // Redirect to confirmation page
                } else {
                    alert("Error sending email: " + result.message);
                }
            } catch (error) {
                alert("Failed to send email. Please try again.");
            }
        });
    }
});


document.addEventListener('DOMContentLoaded', () => {
    // Load cart from localStorage
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const cartList = document.getElementById('cart-summary-list');
    const totalDisplay = document.getElementById('cart-summary-total');
  
    if (cartList && totalDisplay) {
      let total = 0;
      cartItems.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.name} - $${item.price} x ${item.quantity}`;
        cartList.appendChild(li);
        total += item.price * item.quantity;
      });
      totalDisplay.textContent = total.toFixed(2);
    }
  
    // Form validation for email
    const checkoutForm = document.getElementById('checkoutForm');
    if (checkoutForm) {
      checkoutForm.addEventListener('submit', e => {
        const emailInput = document.getElementById('email');
        const emailError = document.getElementById('email-error');
        if (!emailInput.value.includes('@')) {
          e.preventDefault();
          emailError.textContent = "Please enter a valid email address.";
          emailError.style.color = "red";
        } else {
          emailError.textContent = "";
        }
      });
    }
  });


  document.addEventListener("DOMContentLoaded", () => {
    const burger = document.getElementById("burger");
    const navLinks = document.getElementById("nav-links");
  
    burger.addEventListener("click", () => {
      navLinks.classList.toggle("active");
    });
  });
  
  
  
  