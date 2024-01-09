const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb+srv://tapan:RLiSh6jDkBVuu46G@cluster0.x3ssukh.mongodb.net/', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
console.log('connected');

// Define the question schema
const questionSchema = new mongoose.Schema({
    language: String,
    level: String,
    question: String,
    options: [String],
    answer: String,
    
});

// Define the Question model
const Question = mongoose.model('Question', questionSchema, 'Questions');




async function getQuestions(language, level) {
    try {
        // Fetch 5 questions based on language and level
        const questions = await Question.find({ language, level }).limit(10);
        return questions;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

// Define a route to handle fetching questions
app.all('/startQuiz', async (req, res) => {
    try {
        const { language, level } = req.query;
        console.log('Received Query:', { language, level });

        // Fetch questions from the database and send them as JSON
        const questions = await getQuestions(language, level);
        console.log('Fetched questions:', questions);

        res.json(questions);
    } catch (error) {
        
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
app.get('/questions', async (req, res) => {
    try {
        // Extract language and user email from the request query parameters
        
        const language = req.query.language;
        const level = req.query.level;
        
        // Fetching the user data from the database
      

        // Logic to determine the user's performance and fetch questions accordingly
        
        const questions = await fetchQuestions(language,level);
        // Fetching questions based on the language and difficulty level
        

        // Sending the questions to the client
        res.json(questions);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
async function fetchQuestions(language, difficultyLevel) {
  
    //Fetching questions from a database
    if(difficultyLevel==='Beginner'){
    const questions = await Question.find({
        language: language,
        level:'Beginner' ,
    }).limit(7); 
    const questions1 = await Question.find({
        language: language,
        level:"Intermediate",
    }).limit(3);
    return [...questions, ...questions1];  

}
else{
    const questions = await Question.find({
        language: language,
        level:'Beginner' ,
    }).limit(5); 
    const questions1 = await Question.find({
        language: language,
        level:"Intermediate",
    }).limit(5);
    return [...questions, ...questions1];  

}

}


// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
