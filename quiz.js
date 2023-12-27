// quiz.js

document.addEventListener('DOMContentLoaded', function () {
    // Attach a click event listener to all "Start Quiz" buttons
    var quizButtons = document.querySelectorAll('.quiz-container button');

    quizButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            // Get the language and level from the associated quiz container
           // Find the h3 element within the container
           var quizContainer = button.closest('.quiz-container');
           var languageHeader = quizContainer.querySelector('h3');
           // Split the h3 content to extract language and level
           var languageLevel = languageHeader.textContent.split(': ')[1];
           var language = languageLevel.split(' - ')[0];
           var level = languageLevel.split(' - ')[1];

            // Redirect to quiz.html with query parameters
        if(this.id==="stn"){
           
            window.location.href = 'quiz.html?language=' + language + '&level=' + level;
        }
       else if(this.id==="ld"){
        window.location.href = 'leaderboard.html?language=' + language + '&level=' + level;
       }
        });
    });
});
