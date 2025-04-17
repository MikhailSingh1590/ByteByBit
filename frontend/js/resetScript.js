document.getElementById("resetPasswordForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const newPassword = document.getElementById("newPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token"); // Assuming token is in the query params

    if (newPassword !== confirmPassword) {
        document.getElementById("resetMessage").textContent = "Passwords do not match!";
        return;
    }

    const response = await fetch("http://localhost:5000/api/auth/reset-password", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ token, newPassword })
    });

    const data = await response.json();
    const messageElement = document.getElementById("resetMessage");

    if (response.ok) {
        messageElement.textContent = "Password reset successful. You can now login with your new password.";
        messageElement.style.color = "green";
    } else {
        messageElement.textContent = data.message || "Error occurred, try again.";
        messageElement.style.color = "red";
    }
});
