// quiz.js

document.addEventListener('DOMContentLoaded', function () {
    // Extract language and level from the URL query parameters
    var urlParams = new URLSearchParams(window.location.search);
    var language = urlParams.get('language');
    var level = urlParams.get('level');

    // Make an AJAX request to the server to fetch questions
    fetchQuestions(language, level);

    function fetchQuestions(language, level) {
        // Make an AJAX request to the server to fetch questions
        fetch('http://localhost:3001/startQuiz?language=' + language + '&level=' + level)
            .then(response => response.json())
            .then(questions => displayQuestions(questions))
            .catch(error => console.error('Error fetching questions:', error));
    }

    function displayQuestions(questions) {
        // Display the questions as needed on the client side
        var quizContainer = document.getElementById('quiz-container');
        quizContainer.innerHTML = ''; // Clear previous content

        questions.forEach(function (question, index) {
            var questionDiv = document.createElement('div');
            questionDiv.className = 'question'; // Add the 'question' class
            questionDiv.innerHTML = '<p>Question ' + (index + 1) + ': ' + question.question + '</p>';

            // Display options as separate boxes
            var optionsContainer = document.createElement('div');
            optionsContainer.className = 'options';

            question.options.forEach(function (option, optionIndex) {
                var optionDiv = document.createElement('div');
                optionDiv.className = 'option-box'; // Add a class for styling
                optionDiv.innerHTML = '<label><input type="radio" name="question' + index + '" value="' + option + '"> ' + option + '</label>';
                optionsContainer.appendChild(optionDiv);
            });

            questionDiv.appendChild(optionsContainer);
            quizContainer.appendChild(questionDiv);
        });

        // Add a submit button
        var submitButton = document.createElement('button');
        submitButton.innerHTML = 'Submit Answers';
        submitButton.addEventListener('click', function () {
            calculateScore(questions);
        });

        quizContainer.appendChild(submitButton);
    }

    function calculateScore(questions) {
        // Calculate the score based on user input
        var score = 0;
        var totalQuestions = questions.length;
    
        questions.forEach(function (question, index) {
            var selectedOption = document.querySelector('input[name="question' + index + '"]:checked');
            var correctOption = getCorrectOption(question);
    
            if (selectedOption && selectedOption.value === correctOption) {
                score++;
            }
        });
    
        // Calculate the percentage
        var percentage = (score / totalQuestions) * 100;
    
        // Record the quiz attempt on the server
        recordQuizAttempt(score, totalQuestions, percentage);
    }
    
    function getCorrectOption(question) {
        // Map correct answer to option (A, B, C, D)
        var optionsMap = {
            "A": question.options[0],
            "B": question.options[1],
            "C": question.options[2],
            "D": question.options[3],
        };
    
        return optionsMap[question.answer];
    }
    
    function recordQuizAttempt(score, totalQuestions, percentage) {
        // Extract language and level from the URL query parameters
        var urlParams = new URLSearchParams(window.location.search);
        var language = urlParams.get('language');
        var level = urlParams.get('level');
        var userEmail = localStorage.getItem('userEmail');
    
        // Make an AJAX request to the server to record the quiz attempt
        fetch('http://localhost:3002/quiz', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: userEmail,
                language: language,
                level: level,
                score: score,
                totalQuestions: totalQuestions,
                percentage: percentage,
            }),
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            alert('Quiz attempt recorded successfully. Your Score: ' + score + '/' + totalQuestions + ' (' + percentage.toFixed(2) + '%)');
        })
        .catch(error => console.error('Error recording quiz attempt:', error));
    }
    

    
});
