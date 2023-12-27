document.addEventListener('DOMContentLoaded', function () {
    // Select the form element
    const signUpForm = document.getElementById('sign-up');

    // Add a submit event listener to the form
    signUpForm.addEventListener('submit', function (event) {
        // Prevent the default form submission behavior
        event.preventDefault();

        // Call the signUp function
        signUp();
    });

    function signUp() {
        // Get form data
        const firstName = document.getElementById('inputFirstName').value;
        const lastName = document.getElementById('inputLastName').value;
        const email = document.getElementById('inputEmail').value;
        const password = document.getElementById('inputPassword').value;
        const rePassword = document.getElementById('inputRePassword').value;

        // Check if password and re-entered password match
        if (password !== rePassword) {
            document.getElementById('passwordError').textContent = 'Passwords do not match';
            return;
        }

        // Clear password error message
        document.getElementById('passwordError').textContent = '';

        // Create user object
        const user = { firstName, lastName, email, password };

        // Make a POST request to the server
        fetch('http://localhost:3000/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            alert('User registered successfully');
            
            // Redirect to the sign-in page
            window.location.href = './Sign-in.html';
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Failed to register user');
        });
        
    }
});
