document.addEventListener('DOMContentLoaded', function () {
    const leaderboardContainer = document.getElementById('leaderboard-container');

    // Extract language and level from the URL query parameters
    const urlParams = new URLSearchParams(window.location.search);
    const language = urlParams.get('language');
    const level = urlParams.get('level');

    // Make an AJAX request to the server to fetch leaderboard data
    fetch(`http://localhost:3000/leaderboard?language=${language}&level=${level}`)
        .then(response => response.json())
        .then(leaderboardData => displayLeaderboard(leaderboardData))
        .catch(error => console.error('Error fetching leaderboard data:', error));

    function displayLeaderboard(leaderboardData) {
        // Clear previous content
        leaderboardContainer.innerHTML = '';

        // Create and append leaderboard table
        const table = document.createElement('table');
        table.innerHTML = `
            <thead>
                <tr>
                    <th>Username</th>
                    <th>Language</th>
                    <th>Level</th>
                    <th>Score</th>
                    <th>Total Questions</th>
                    <th>Percentage</th>
                </tr>
            </thead>
            <tbody>
                <!-- Leaderboard data will be inserted here -->
            </tbody>
        `;
        leaderboardContainer.appendChild(table);

        // Add data to the table
        const tbody = table.querySelector('tbody');
        leaderboardData.forEach(entry => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${entry.username}</td>
                <td>${entry.language}</td>
                <td>${entry.level}</td>
                <td>${entry.score}</td>
                <td>${entry.totalQuestions}</td>
                <td>${entry.percentage}</td>
            `;
            tbody.appendChild(row);
        });
    }
});
