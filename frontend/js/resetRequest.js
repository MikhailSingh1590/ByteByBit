document.getElementById("resetRequestForm").addEventListener("submit", async (e) => {
    e.preventDefault();
  
    const email = document.getElementById("email").value;
    const messageElement = document.getElementById("message");
  
    try {
      const response = await fetch("http://localhost:5000/api/auth/request-password-reset", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email })
      });
  
      const data = await response.json();
  
      if (response.ok) {
        messageElement.textContent = "A password reset link has been sent to your email.";
        messageElement.style.color = "lightgreen";
      } else {
        messageElement.textContent = data.message || "An error occurred. Please try again.";
        messageElement.style.color = "red";
      }
    } catch (error) {
      messageElement.textContent = "Unable to send request. Please check your network.";
      messageElement.style.color = "red";
    }
  });
  