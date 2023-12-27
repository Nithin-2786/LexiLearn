Installation and Setup

Unzip the file: Locate the output_file.json file within the unzipped directory.

Import quiz questions into MongoDB:

 Connect to your MongoDB instance.

 Create a database named QuizQuestion.

 Within the QuizQuestion database, create a collection named Questions.

 Import the data from output_file.json into the Questions collection.

Run the server code:

 Open a terminal and navigate to the project directory.

 Run the following commands in separate terminals:

 node Server.js (port 3001)

 node Server2.js (port 3002)

 node userdata.js (port 3000)

Open the index.html file:

 Open index.html in a web browser.

Usage

 Sign in or register:

  If you have an account, sign in using the provided form.

  If you don't have an account, click the "signup" link to create one.

Access the home page:

After successful sign-in,you'll be redirected to the home page.
Take a quiz:

  In the "Basic Version" container, click the "Get Started" button.

  You'll see the number of available quizzes and a leaderboard.

  Click the "Start Quiz" button to begin a quiz.

Answer questions:
  Questions are displayed dynamically on the quiz.html page.

  Answer each question and proceed to the next one.
View results:
  Upon completing the quiz, you'll receive your results in an alert message.

  To view results of previous quizzes, click on "Profile" on the home page.

Technical Details

Front-end: HTML, JavaScript, CSS (Bootstrap)

Back-end: Node.js

Database: MongoDB

Mobile responsiveness: Bootstrap framework

Test:Questions in the test suggested based on user performance

Additional Notes

Create a MongoDB database named userDatabase to store user credentials.