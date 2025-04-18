document.getElementById('login-form').addEventListener('submit', async function (e) {
    e.preventDefault();
  
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const errorDisplay = document.getElementById('login-error');
  
    try {
      const response = await fetch('http://localhost:5000/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        errorDisplay.textContent = data.message || 'Login failed.';
        return;
      }
  
      // Store JWT token and maybe user info
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user)); // optional, based on what your backend sends
  
      // Redirect to homepage or store page
      window.location.href = 'store.html';
  
    } catch (err) {
      errorDisplay.textContent = 'Something went wrong. Please try again later.';
      console.error('Login error:', err);
    }
  });
  