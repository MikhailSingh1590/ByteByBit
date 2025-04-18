document.getElementById("resetPasswordForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const newPassword = document.getElementById("newPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token"); // Assuming token is in the query params

    const resetMessageElement = document.getElementById("resetMessage");
    const submitButton = document.querySelector("button[type='submit']");

    // Clear any previous messages
    resetMessageElement.textContent = "";
    
    if (newPassword !== confirmPassword) {
        resetMessageElement.textContent = "Passwords do not match!";
        resetMessageElement.style.color = "red";
        return;
    }

    // Show loading message and disable the submit button
    submitButton.disabled = true;
    resetMessageElement.textContent = "Processing your request...";
    resetMessageElement.style.color = "blue";

    try {
        const response = await fetch("http://localhost:5000/api/auth/reset-password", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ token, newPassword })
        });

        const data = await response.json();

        if (response.ok) {
            resetMessageElement.textContent = "Password reset successful. You can now login with your new password.";
            resetMessageElement.style.color = "green";
            document.getElementById("resetPasswordForm").reset();  // Clear form fields

            // Optionally, redirect to the login page after a few seconds
            setTimeout(() => {
                window.location.href = "/login.html";  // Adjust the path accordingly
            }, 2000);
        } else {
            resetMessageElement.textContent = data.message || "Error occurred, try again.";
            resetMessageElement.style.color = "red";
        }
    } catch (error) {
        resetMessageElement.textContent = "An error occurred. Please try again later.";
        resetMessageElement.style.color = "red";
    } finally {
        // Re-enable the submit button
        submitButton.disabled = false;
    }
});
