document.addEventListener("DOMContentLoaded", function () {
    const orderSummary = document.getElementById("order-summary");
    const orderTotal = document.getElementById("order-total");

    // Retrieve order details from sessionStorage
    const order = JSON.parse(sessionStorage.getItem("order")) || [];
    let total = 0;

    if (order.length > 0) {
        order.forEach(item => {
            const price = item.price || 0;
            const name = item.productName || "Unnamed Product";
            total += price;

            let li = document.createElement("li");
            li.textContent = `${name} - $${price.toFixed(2)}`;
            orderSummary.appendChild(li);
        });
    } else {
        orderSummary.innerHTML = "<li>No items found.</li>";
    }

    orderTotal.textContent = total.toFixed(2);

    // Generate and show order number
    const orderNumber = Math.floor(100000 + Math.random() * 900000); // 6-digit
    const section = document.querySelector("main section");
    const orderNumDisplay = document.createElement("p");
    orderNumDisplay.innerHTML = `Your order number is <strong>#${orderNumber}</strong>.`;
    section.insertBefore(orderNumDisplay, orderSummary);

    // Clear sessionStorage after displaying
    sessionStorage.removeItem("order");
});
