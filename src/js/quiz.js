const questions = [
    {
        question: "What is the fastest speed that anything can travel in the universe?",
        options: [
            "Speed of light (299,792 kilometers per second)",
            "Speed of sound (343 meters per second)",
            "Speed of a rocket (40,000 kilometers per hour)",
            "Speed of electricity (close to speed of light)"
        ],
        correct: 0
    },
    {
        question: "Which planet has the most moons in our solar system?",
        options: ["Jupiter", "Saturn", "Uranus", "Neptune"],
        correct: 1
    },
    {
        question: "What is the hardest natural substance on Earth?",
        options: ["Gold", "Iron", "Diamond", "Titanium"],
        correct: 2
    }
];

let currentQuestion = 0;
let score = 0;
let attempts = 0;
const maxAttempts = 3;
const basePoints = 100;
const penaltyPerAttempt = 25;
const questionContainer = document.getElementById('question-container');
const feedbackDiv = document.getElementById('feedback');

function calculateScore(attempts) {
    return Math.max(basePoints - (attempts - 1) * penaltyPerAttempt, 0);
}

function loadQuestion() {
    const question = questions[currentQuestion];
    questionContainer.innerHTML = `
        <div class="question">
            <i class="fas fa-flask mr-2"></i>${question.question}
        </div>
        <div class="options">
            ${question.options.map((option, index) => `
                <button class="option-btn" onclick="checkAnswer(${index})">
                    <i class="fas fa-atom mr-2"></i>${option}
                </button>
            `).join('')}
        </div>
    `;
}

function checkAnswer(selectedIndex) {
    const question = questions[currentQuestion];
    attempts++;

    if (selectedIndex === question.correct) {
        const questionScore = calculateScore(attempts);
        score += questionScore;
        
        feedbackDiv.innerHTML = `
            <i class="fas fa-check-circle"></i> 
            Correct! You earned ${questionScore} points
        `;
        feedbackDiv.className = 'feedback correct';
        
        setTimeout(() => {
            nextQuestion();
            attempts = 0; // Reset attempts for next question
        }, 1500);
    } else {
        if (attempts >= maxAttempts) {
            feedbackDiv.innerHTML = `
                <i class="fas fa-times-circle"></i> 
                Maximum attempts reached. Moving to next question...
            `;
            setTimeout(() => {
                nextQuestion();
                attempts = 0; // Reset attempts for next question
            }, 1500);
        } else {
            feedbackDiv.innerHTML = `
                <i class="fas fa-times-circle"></i> 
                Try again! Attempts left: ${maxAttempts - attempts}
            `;
        }
        feedbackDiv.className = 'feedback incorrect';
    }
    feedbackDiv.style.display = 'block';
}

function nextQuestion() {
    currentQuestion++;
    if (currentQuestion < questions.length) {
        loadQuestion();
        feedbackDiv.style.display = 'none';
    } else {
        showFinalScreen();
    }
}

function showFinalScreen() {
    const percentage = Math.round((score / (questions.length * basePoints)) * 100);
    questionContainer.innerHTML = `
        <div class="final-screen">
            <h2><i class="fas fa-trophy text-warning mb-4"></i></h2>
            <h3>Quiz Complete!</h3>
            <div class="score-summary">
                <p class="lead">Your Score: ${score} points</p>
                <p>Percentage: ${percentage}%</p>
            </div>
            <div class="name-entry-form mt-4">
                <h4>Submit Your Score</h4>
                <input type="text" id="playerName" class="form-control mb-3" placeholder="Your Name" required>
                <input type="text" id="schoolName" class="form-control mb-3" placeholder="Your School" required>
                <button class="btn btn-primary" onclick="submitScore()">
                    <i class="fas fa-trophy mr-2"></i>Submit Score
                </button>
            </div>
        </div>
    `;
}

function submitScore() {
    const playerName = document.getElementById('playerName').value;
    const schoolName = document.getElementById('schoolName').value;
    
    if (!playerName || !schoolName) {
        alert('Please enter both your name and school!');
        return;
    }

    const scoreData = {
        name: playerName,
        school: schoolName,
        score: score,
        timestamp: new Date().toISOString()
    };

    // Store in localStorage for demonstration
    let leaderboard = JSON.parse(localStorage.getItem('leaderboard') || '[]');
    leaderboard.push(scoreData);
    leaderboard.sort((a, b) => b.score - a.score);
    localStorage.setItem('leaderboard', JSON.stringify(leaderboard));

    // Show success message and redirect
    window.location.href = 'success.html';
}

// Load first question when page loads
window.onload = loadQuestion;