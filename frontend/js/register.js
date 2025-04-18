document.getElementById('register-form').addEventListener('submit', async function (e) {
    e.preventDefault();
  
    const username = document.getElementById('username').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const errorDisplay = document.getElementById('register-error');
  
    try {
      const response = await fetch('http://localhost:5000/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, email, password })
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        errorDisplay.textContent = data.message || 'Registration failed.';
        return;
      }
  
      // Store JWT and user data
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
  
      // Redirect to store or home
      window.location.href = 'store.html';
  
    } catch (err) {
      errorDisplay.textContent = 'Something went wrong. Please try again later.';
      console.error('Register error:', err);
    }
  });
  