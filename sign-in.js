// sign-in.js

document.addEventListener('DOMContentLoaded', function () {
    // Select the form element
    const signInForm = document.getElementById('sign-in');
 
    // Add a submit event listener to the form
    signInForm.addEventListener('submit', function (event) {
        // Prevent the default form submission behavior
        event.preventDefault();
       
        // Call the signIn function
        signIn();
    });

    function signIn() {
        localStorage.removeItem('userEmail');
    localStorage.removeItem('otherUserRelatedData');
        const email = document.getElementById('inputEmail').value;
        const password = document.getElementById('inputPassword').value;

        // Create user object
        const user = { email, password };

        // Make a POST request to the server
        fetch('http://localhost:3000/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Invalid credentials');
            }
        })
        .then(data => {
            console.log(data);

            // Assuming the server response includes the user's email
            const userEmail = data.email;

            
            localStorage.setItem('userEmail', userEmail);

            alert('User logged in successfully');

            // Redirect to the home page (index.html)
            window.location.href = 'index.html';
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Failed to log in');
        });
    }
});
