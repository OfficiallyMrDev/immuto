// src/js/main.js

document.addEventListener('DOMContentLoaded', function() {
    const enterButton = document.getElementById('enter-challenge');

    if (enterButton) {
        enterButton.addEventListener('click', function() {
            window.location.href = 'pages/quiz.html';
        });
    }

    // Sample leaderboard data
    const leaderboardData = [
        { name: "Alex Johnson", score: 950 },
        { name: "Sarah Chen", score: 920 },
        { name: "Mike Smith", score: 890 },
        { name: "Emma Davis", score: 850 },
        { name: "Ryan Parker", score: 820 }
    ];

    // Populate leaderboard
    const leaderboardList = document.getElementById('leaderboard-list');
    if (leaderboardList) {
        leaderboardData.forEach((player, index) => {
            const item = document.createElement('div');
            item.className = 'leaderboard-item';
            item.innerHTML = `
                <div class="rank">#${index + 1}</div>
                <div class="player-name">${player.name}</div>
                <div class="score">${player.score} pts</div>
            `;
            leaderboardList.appendChild(item);
        });
    }

    // Add smooth scrolling to all links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Add admin controls
    const adminKey = 'immuto2025';
    
    // Check for admin access
    if (localStorage.getItem('adminAccess') === 'true') {
        const resetButton = document.getElementById('resetButton');
        if (resetButton) {
            resetButton.style.display = 'inline-block';
        }
    }

    // Add keyboard shortcut for admin access (Ctrl/Cmd + Shift + A)
    document.addEventListener('keydown', function(e) {
        if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'A') {
            const input = prompt('Enter admin key:');
            if (input === adminKey) {
                localStorage.setItem('adminAccess', 'true');
                location.reload();
            }
        }
    });
});

function resetLeaderboard() {
    if (confirm('Are you sure you want to reset the leaderboard? This cannot be undone!')) {
        localStorage.removeItem('leaderboard');
        localStorage.setItem('leaderboard', '[]');
        alert('Leaderboard has been reset');
        location.reload();
    }
}