let tournamentData = {
    players: {},
    rounds: {}
};

function saveTournament() {
    localStorage.setItem('tournamentData', JSON.stringify(tournamentData));
}

function loadTournament() {
    const savedData = localStorage.getItem('tournamentData');
    if (savedData) {
        tournamentData = JSON.parse(savedData);
    }
}

function generateTournament() {
    const numPlayers = parseInt(document.getElementById('numPlayers').value);
    const numRounds = parseInt(document.getElementById('numRounds').value);
    
    tournamentData = {
        players: {},
        rounds: {}
    };

    // Initialize players
    for (let i = 1; i <= numPlayers; i++) {
        tournamentData.players[`player${i}`] = {
            name: `Player ${i}`,
            score: 0
        };
    }

    // Initialize rounds
    for (let i = 1; i <= numRounds; i++) {
        tournamentData.rounds[`round${i}`] = {};
        let players = Object.keys(tournamentData.players);
        let shuffled = players.sort(() => 0.5 - Math.random());
        
        for (let j = 0; j < players.length - 1; j += 2) {
            let match = {
                player1: shuffled[j],
                player2: shuffled[j+1] || 'Bye',
                score1: 0,
                score2: 0
            };
            tournamentData.rounds[`round${i}`][`match${j/2+1}`] = match;
        }
    }

    saveTournament();
    updateTournamentDisplay();
}

function updateTournamentDisplay() {
    const tournament = document.getElementById('tournament');
    tournament.innerHTML = '';

    Object.keys(tournamentData.rounds).forEach((round) => {
        const roundEl = document.createElement('div');
        roundEl.className = 'round';
        roundEl.innerHTML = `<h2>${round}</h2>`;

        Object.keys(tournamentData.rounds[round]).forEach((match) => {
            const matchEl = document.createElement('div');
            matchEl.className = 'match';
            const matchData = tournamentData.rounds[round][match];

            const player1Name = tournamentData.players[matchData.player1]?.name || matchData.player1;
            const player2Name = tournamentData.players[matchData.player2]?.name || matchData.player2;

            matchEl.innerHTML = `
                <div class="player">
                    <input type="text" value="${player1Name}" oninput="updatePlayerName('${matchData.player1}', this.value)">
                    <input type="number" class="score" value="${matchData.score1}" oninput="updateScore('${round}', '${match}', 'score1', this.value)">
                </div>
                <div class="player">
                    <input type="text" value="${player2Name}" oninput="updatePlayerName('${matchData.player2}', this.value)">
                    <input type="number" class="score" value="${matchData.score2}" oninput="updateScore('${round}', '${match}', 'score2', this.value)">
                </div>
            `;

            roundEl.appendChild(matchEl);
        });

        tournament.appendChild(roundEl);
    });

    // Display total scores
    const scoresEl = document.createElement('div');
    scoresEl.innerHTML = '<h2>Total Scores</h2>';
    Object.keys(tournamentData.players).forEach(playerId => {
        const player = tournamentData.players[playerId];
        scoresEl.innerHTML += `<div>${player.name}: ${player.score}</div>`;
    });
    tournament.appendChild(scoresEl);
}

let tournamentData = {
    players: {},
    rounds: {}
};

function saveTournament() {
    localStorage.setItem('tournamentData', JSON.stringify(tournamentData));
}

function loadTournament() {
    const savedData = localStorage.getItem('tournamentData');
    if (savedData) {
        tournamentData = JSON.parse(savedData);
    }
}

function generateTournament() {
    const numPlayers = parseInt(document.getElementById('numPlayers').value);
    const numRounds = parseInt(document.getElementById('numRounds').value);
    
    tournamentData = {
        players: {},
        rounds: {}
    };

    // Initialize players
    for (let i = 1; i <= numPlayers; i++) {
        tournamentData.players[`player${i}`] = {
            name: `Player ${i}`,
            score: 0
        };
