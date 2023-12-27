document.addEventListener('DOMContentLoaded', function () {
    // Add an event listener to the "English" anchor tag
    var urlParams = new URLSearchParams(window.location.search);
    var Language = urlParams.get('language');
    // Fetch the user's email from local storage
    const userEmail = localStorage.getItem('userEmail');
  console.log(Language);
    // Make a request to the server to get English-related questions
    fetch(`http://localhost:3000/questions?language=${Language}&userEmail=${userEmail}`)       
    .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(difficultyLevel => {
            let a = difficultyLevel; // Assuming difficultyLevel is a string representing difficulty level

            // Make a request to the server to get questions based on language and difficulty level
            fetch(`http://localhost:3001/questions?language=${Language}&level=${a}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    return response.json();
                })
                .then(questions => {
                    displayQuestions(questions);
                })
                .catch(error => console.error('Error fetching questions:', error));
        })
        .catch(error => console.error('Error fetching difficulty level:', error));

    // Function to display questions on the client side
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
    

});
