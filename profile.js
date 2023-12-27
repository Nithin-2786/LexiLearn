document.addEventListener('DOMContentLoaded', function () {
    // Fetch the user's email from local storage
    const userEmail = localStorage.getItem('userEmail');

    // Make a request to the server to retrieve user data
    fetch(`http://localhost:3002/user?email=${userEmail}`)
        .then(response => response.json())
        .then(user => {
            // Check if quizAttempts data is available
            if (user.quizAttempts && user.quizAttempts.length > 0) {
                // Build the HTML table
                const table = buildTable(user.quizAttempts);

                // Create a div for user profile information
                const userProfileDiv = document.createElement('div');
                userProfileDiv.className = 'user-profile';
                userProfileDiv.textContent = `User Email: ${userEmail}`;

                // Append the user profile div to the profile page
                const profileContainer = document.getElementById('profile-container');
                profileContainer.appendChild(userProfileDiv);

                // Append the table to the profile page
                profileContainer.appendChild(table);
            } else {
                console.log('No quiz attempts data available.');
            }
        })
        .catch(error => {
            console.error('Error fetching user data:', error);
        });

    // Function to build an HTML table from quizAttempts data
    function buildTable(quizAttempts) {
        const table = document.createElement('table');
        table.className = 'quiz-attempts-table';

        // Create table header
        const headerRow = table.insertRow(0);
        const headerCells = ['Language', 'Level', 'Score', 'Total Questions', 'Percentage'];
        headerCells.forEach(headerCell => {
            const cell = headerRow.insertCell();
            cell.textContent = headerCell;
        });

        // Create table rows with quizAttempts data
        quizAttempts.forEach(attempt => {
            const row = table.insertRow();
            const cells = [attempt.language, attempt.level, attempt.score, attempt.totalQuestions, attempt.percentage];
            cells.forEach(cellValue => {
                const cell = row.insertCell();
                cell.textContent = cellValue;
            });
        });

        return table;
    }
});
