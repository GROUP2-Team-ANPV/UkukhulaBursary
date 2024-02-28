export function LoginScript(){
    document.addEventListener('DOMContentLoaded', function () {
        const loginForm = document.getElementById('loginForm');
    
        loginForm.addEventListener('submit', function (event) {
            event.preventDefault();
    
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
    
            fetch('http://localhost:5263/api/Auth/Login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: username, 
                    password: password
                })
            })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Login failed');
                }
            })
            .then(data => {
                const token = data.message; 
                sessionStorage.setItem('token', token); // Store token in session storage
                window.location.href = '/dashboard.html'; 
            })
            .catch(error => {
                console.error('Login error:', error.message);
                alert('Login failed. Please check your credentials and try again.');
            });
        });
    });
}

