const balkanArtists = [
    "Severina", "Jala Brat", "Buba Corelli", "Tomson", 
    "Jelena Rozga", "Choda", "Baka Prase", "Ceca",
    "Hiljson", "Goca", "Klinac", "Nucci",
    "Karleuša", "Maja Suput", "Mario Vreco", "Aleksandra prijovic",
    "Devito", "Desingerica", "Seksi", "Popovska",
    "Nikolija", "Toni Cetinski", "Josipa Lisac", "KARLO Delač Čoka",
     "Nives Celzijus", "Ela Jerkovic",
     "Izabela Brnic", "Nugato",
    "Branko cigan sto bude sa marijom vrecom", "Aca Lukas", "Kereta",
    "Zdravko Čolić",, "Saša Matić", "Janko YT",
    "mmm goca mmm", "Mudja", "Goldenito",
    "Coby", "Voyage", "Breskvica", "Ceca", "Miroslav Škoro", "Halid Bešlić", "Peki", "High5"
    
];

let players = [];
let imposters = [];
let currentPlayerIndex = 0;
let innocentRole = "";
let imposterRole = "";

function startGame() {
    const playerCount = parseInt(document.getElementById('player-count').value);
    const imposterCount = parseInt(document.getElementById('imposter-count').value);
    
    players = [];
    
    // Uzmi imena igrača iz input polja
    for (let i = 1; i <= playerCount; i++) {
        const name = document.getElementById(`player${i}`).value.trim();
        if (name === '') {
            alert(`Molim upiši ime za igrača ${i}!`);
            return;
        }
        players.push(name);
    }
    
    // Provjeri da imposteri nisu više od igrača
    if (imposterCount >= players.length) {
        alert('Broj impostera mora biti manji od broja igrača!');
        return;
    }
    
    // Nasumično odaberi uloge
    const shuffledArtists = [...balkanArtists].sort(() => 0.5 - Math.random());
    innocentRole = shuffledArtists[0]; // Prva uloga za nevine
    imposterRole = shuffledArtists[1]; // Druga uloga za impostera
    
    // Nasumično odaberi impostera/e
    imposters = [];
    const playersCopy = [...players];
    
    for (let i = 0; i < imposterCount; i++) {
        const randomIndex = Math.floor(Math.random() * playersCopy.length);
        imposters.push(playersCopy[randomIndex]);
        playersCopy.splice(randomIndex, 1);
    }
    
    console.log('Igrači:', players);
    console.log('Imposteri:', imposters);
    console.log('Nevina uloga:', innocentRole);
    console.log('Imposter uloga:', imposterRole);
    
    // Počni igru
    currentPlayerIndex = 0;
    showGameScreen();
}

function showGameScreen() {
    document.getElementById('setup-screen').style.display = 'none';
    document.getElementById('game-screen').style.display = 'block';
    
    // Prikaži ime igrača
    document.getElementById('current-player-name').textContent = players[currentPlayerIndex];
    document.getElementById('reveal-btn').style.display = 'block';
    document.getElementById('role-display').style.display = 'none';
    document.getElementById('next-btn').style.display = 'none';
}

function revealRole() {
    const currentPlayer = players[currentPlayerIndex];
    const isImposter = imposters.includes(currentPlayer);
    
    let roleText, roleColor;
    
    if (isImposter) {
        roleText = `Ti si ${imposterRole}!`;
        roleColor = '#73010aff';
    } else {
        roleText = `Ti si ${innocentRole}!`;
        roleColor = '#73010aff';
    }
    
    document.getElementById('role-text').textContent = roleText;
    document.getElementById('role-text').style.color = roleColor;
    document.getElementById('role-display').style.display = 'block';
    document.getElementById('reveal-btn').style.display = 'none';
    document.getElementById('next-btn').style.display = 'block';
}

function nextPlayer() {
    currentPlayerIndex++;
    
    if (currentPlayerIndex >= players.length) {
        showFinalScreen();
    } else {
        showGameScreen();
    }
}

function showFinalScreen() {
    document.getElementById('game-screen').style.display = 'none';
    document.getElementById('final-screen').style.display = 'block';
}

// ... (sav postojeći kod gore)

function showImposters() {
    let imposterText;
    
    if (imposters.length === 1) {
        imposterText = `${imposters[0]} je bio ${imposterRole}! (IMPOSTER)`;
    } else {
        imposterText = `${imposters.join(' i ')} su bili ${imposterRole}! (IMPOSTERI)`;
    }
    
    // Dodaj i nevinnu ulogu
    imposterText += `\nSvi ostali su bili ${innocentRole}! (Nevini igrači)`;
        
    document.getElementById('imposter-names').textContent = imposterText;
    document.getElementById('imposter-reveal').style.display = 'block';
    
    // Prikaži oba gumba
    document.getElementById('new-round-btn').style.display = 'block';
    document.getElementById('exit-game-btn').style.display = 'block';
}

// NOVA FUNKCIJA - Nova runda s istim igračima
function newRound() {
    const imposterCount = parseInt(document.getElementById('imposter-count').value);
    
    // Nasumično odaberi NOVE uloge
    const shuffledArtists = [...balkanArtists].sort(() => 0.5 - Math.random());
    innocentRole = shuffledArtists[0]; // Nova uloga za nevine
    imposterRole = shuffledArtists[1]; // Nova uloga za impostera
    
    // Nasumično odaberi NOVE impostera/e
    imposters = [];
    const playersCopy = [...players];
    
    for (let i = 0; i < imposterCount; i++) {
        const randomIndex = Math.floor(Math.random() * playersCopy.length);
        imposters.push(playersCopy[randomIndex]);
        playersCopy.splice(randomIndex, 1);
    }
    
    console.log('NOVA RUNDA!');
    console.log('Novi imposteri:', imposters);
    console.log('Nova nevina uloga:', innocentRole);
    console.log('Nova imposter uloga:', imposterRole);
    
    // Sakrij final screen i vrati se na prvi igrač
    document.getElementById('final-screen').style.display = 'none';
    document.getElementById('imposter-reveal').style.display = 'none';
    document.getElementById('new-round-btn').style.display = 'none';
    document.getElementById('exit-game-btn').style.display = 'none';
    
    // Resetiraj na prvog igrača
    currentPlayerIndex = 0;
    showGameScreen();
}

// NOVA FUNKCIJA - Izlaz iz igre
function exitGame() {
    document.getElementById('setup-screen').style.display = 'block';
    document.getElementById('game-screen').style.display = 'none';
    document.getElementById('final-screen').style.display = 'none';
    document.getElementById('imposter-reveal').style.display = 'none';
    document.getElementById('new-round-btn').style.display = 'none';
    document.getElementById('exit-game-btn').style.display = 'none';
    
    // Obriši input polja
    for (let i = 1; i <= 15; i++) {
        const input = document.getElementById(`player${i}`);
        if (input) input.value = '';
    }
    
    // Resetiraj sve varijable
    currentPlayerIndex = 0;
    players = [];
    imposters = [];
    innocentRole = "";
    imposterRole = "";
}

// Stara funkcija se može obrisati ili promijeniti
function resetGame() {
    exitGame(); // Pozovi exitGame
}

// Dinamički pokazuj input polja ovisno o broju igrača
document.getElementById('player-count').addEventListener('change', function() {
    const count = parseInt(this.value);
    
    for (let i = 1; i <= 15; i++) {
        const inputGroup = document.getElementById(`player${i}`).parentElement;
        if (inputGroup) {
            inputGroup.style.display = i <= count ? 'block' : 'none';
        }
    }
});

// Inicijalizacija kada se stranica učita
document.addEventListener('DOMContentLoaded', function() {
    console.log('BalkanSUS igra učitana!');
});


// Inicijalizacija kada se stranica učita
document.addEventListener('DOMContentLoaded', function() {
    console.log('BalkanSUS igra učitana!');
});


