let targetNumber;
let guessList = [];
let playerName = '';
let guessCount = 0;

window.onload = () => {
    playerName = prompt("Welcome to Purple Tech! What's your name?") || 'Player';
    loadLeaderboard();
    startNewGame();
};

function startNewGame() {
    const min = parseInt(document.getElementById('min').value) || 1;
    const max = parseInt(document.getElementById('max').value) || 100;
    targetNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    guessList = [];
    guessCount = 0;
    document.getElementById('result').textContent = `🎯 New number generated between ${min} and ${max}`;
    document.getElementById('feedback').textContent = 'Start guessing!';
    updateGuessList();
}

document.getElementById('generateBtn').addEventListener('click', startNewGame);

document.getElementById('revealBtn').addEventListener('click', () => {
    document.getElementById('feedback').textContent = `🕵️‍♂️ The answer is: ${targetNumber}`;
});

document.getElementById('guessBtn').addEventListener('click', () => {
    const guess = parseInt(document.getElementById('guessInput').value);
    const feedbackEl = document.getElementById('feedback');

    if (isNaN(guess)) {
        feedbackEl.textContent = 'Please enter a valid number.';
        return;
    }

    guessCount++;
    guessList.push(guess);
    updateGuessList();

    const diff = Math.abs(guess - targetNumber);

    if (guess === targetNumber) {
        feedbackEl.textContent = `🎉 Congratulations, ${playerName}! You guessed it in ${guessCount} tries.`;
        saveScore(playerName, guessCount);
        loadLeaderboard();
    } else if (guess < targetNumber) {
        if (diff > 30) {
            feedbackEl.textContent = '📉 Way too low!';
        } else if (diff > 15) {
            feedbackEl.textContent = '⬇️ Too low!';
        } else {
            feedbackEl.textContent = '↘️ A little low!';
        }
    } else {
        if (diff > 30) {
            feedbackEl.textContent = '📈 Way too high!';
        } else if (diff > 15) {
            feedbackEl.textContent = '⬆️ Too high!';
        } else {
            feedbackEl.textContent = '↗️ A little high!';
        }
    }
});

function updateGuessList() {
    const listEl = document.getElementById('guessList');
    listEl.innerHTML = '';
    guessList.forEach((guess, index) => {
        const li = document.createElement('li');
        li.textContent = `Guess ${index + 1}: ${guess}`;
        listEl.appendChild(li);
    });
}

function saveScore(name, score) {
    const leaderboard = JSON.parse(localStorage.getItem('purpleTechLeaderboard')) || [];
    leaderboard.push({ name, score });
    leaderboard.sort((a, b) => a.score - b.score);
    localStorage.setItem('purpleTechLeaderboard', JSON.stringify(leaderboard));
}

function loadLeaderboard() {
    const leaderboard = JSON.parse(localStorage.getItem('purpleTechLeaderboard')) || [];
    const listEl = document.getElementById('leaderboard');
    listEl.innerHTML = '';
    leaderboard.forEach((entry, index) => {
        const li = document.createElement('li');
        li.textContent = `${index + 1}. ${entry.name} - ${entry.score} guesses`;
        listEl.appendChild(li);
    });
}

document.getElementById('clearLeaderboardBtn').addEventListener('click', () => {
    localStorage.removeItem('purpleTechLeaderboard');
    loadLeaderboard();
});
