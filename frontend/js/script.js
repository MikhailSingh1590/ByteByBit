document.getElementById("resetRequestForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    
    const response = await fetch("http://localhost:5000/api/auth/forgot-password", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email })
    });

    const data = await response.json();
    const messageElement = document.getElementById("message");

    if (response.ok) {
        messageElement.textContent = "Password reset link sent to your email.";
        messageElement.style.color = "green";
    } else {
        messageElement.textContent = data.message || "Error occurred, try again.";
        messageElement.style.color = "red";
    }
});
