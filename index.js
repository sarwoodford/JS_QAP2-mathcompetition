const express = require('express');
const app = express();
const mathUtilities = require('./utils/mathUtilities');
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true })); // For parsing form data
app.use(express.static('public')); // To serve static files (e.g., CSS)

// initialize leaderboard to track top 10 streaks
let leaderboard = [];


//Some routes required for full functionality are missing here. Only get routes should be required
app.get('/', (req, res) => {
    // display recent streak or a message indicating that there aren't any
    const recentStreak = req.query.streak || 0; // streak default 0 if none recorded
    const message = recentStreak > 0 ? `Latest Streak: ${recentStreak}` : `No Recent Streaks`;
    res.render('index', {message, leaderboard});
});

app.get('/quiz', (req, res) => {
    const question = mathUtilities.getQuestion();
    const streak = req.query.streak || 0; // streak default is 0 if none recorded

    res.render('quiz', { question, streak: streak});
});

//Handles quiz submissions.
app.post('/quiz', (req, res) => {
    const { answer, streak, question } = req.body;
    const parseQuestion = JSON.parse(question);
    const isCorrect = mathUtilities.isCorrectAnswer( parseQuestion, answer );

    let newStreak = isCorrect ? parseInt(streak) + 1 : 0;

    // make sure incorrect answers reset streak and previous streak is pushed to leaderboard
    if (!isCorrect){
            leaderboard.push({ 
                streak: parseInt(streak), 
                date: new Date().toLocaleString(), 
                correctAnswers: parseInt(streak) 
            });

        leaderboard.sort(( a, b ) => b.streak - a.streak); // sort streaks highest to lowest
        leaderboard = leaderboard.slice(0, 10); // keep top 10 streaks 
        }
    console.log(`Answer: ${answer}`);
    console.log(leaderboard)
    console.log(`is correct: ${isCorrect}`);
    console.log(`current streak: ${streak}`);
    console.log(`updated streak: ${newStreak}`);

    res.redirect(`/quiz?streak=${newStreak}&question=${JSON.stringify(mathUtilities.getQuestion())}`);

    //answer will contain the value the user entered on the quiz page
    //Logic must be added here to check if the answer is correct, then track the streak and redirect properly
});

app.post('/exit', (req, res) => {
    const { streak } = req.body;

    if(parseInt(streak) > 0){
        leaderboard.push({
            streak: parseInt(streak),
            date: new Date().toLocaleString(),
            correctAnswers: parseInt(streak)
        });

        leaderboard.sort((a, b) => b.streak - a.streak);
        leaderboard = leaderboard.slice(0,10);
    }

    res.redirect(`/completion?streak=${streak}`);
});

app.get('/completion', ( req, res ) => {
    const currentStreak = req.query.streak || 0; // streak default 0 

    res.render('completion', { currentStreak });
});

app.get('/leaderboard', ( req, res ) => {
    res.render('leaderboard', { leaderboard });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});