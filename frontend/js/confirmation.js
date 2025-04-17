document.addEventListener("DOMContentLoaded", function () {
    const orderSummary = document.getElementById("order-summary");
    const orderTotal = document.getElementById("order-total");

    // Retrieve order details from sessionStorage
    const order = JSON.parse(sessionStorage.getItem("order")) || [];
    let total = 0;

    if (order.length > 0) {
        order.forEach(item => {
            total += item.price;
            let li = document.createElement("li");
            li.textContent = `${item.productName} - $${item.price.toFixed(2)}`;
            orderSummary.appendChild(li);
        });
    } else {
        orderSummary.innerHTML = "<li>No items found.</li>";
    }

    orderTotal.textContent = total.toFixed(2);
    sessionStorage.removeItem("order"); // Clear after displaying
});
