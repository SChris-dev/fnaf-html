// containers
const menuContainer = document.getElementById('menuContainer');
const instructionContainer = document.getElementById('instructionContainer');
const gameContainer = document.getElementById('gameContainer');

// elements
const usernameInput = document.getElementById('usernameInput');
const instructionBtn = document.getElementById('instructionBtn');
const closeInstructionBtn = document.getElementById('closeInstructionBtn');
const startBtn = document.getElementById('startBtn');
const continueBtn = document.getElementById('continueBtn');
const menuTitle = document.querySelector('.menu-title');
const bgMenu = document.querySelector('.bg-menu');
const theIntro = document.querySelector('.the-intro');
const theTransition = document.querySelector('.the-transition');

// local save data
let currentUser = null;
let currentProgress = 1;

// helpers
function getUsers() {
    return JSON.parse(localStorage.getItem('fnaf_html_users')) || [];
}

function saveUsers(users) {
    localStorage.setItem('fnaf_html_users', JSON.stringify(users));
}

function findUser(name) {
    const users = getUsers();
    return users.find(u => u.name.toLowerCase() === name.toLowerCase());
}

function updateUserProgress(nightCount) {
    const users = getUsers();
    const user = users.find(u => u.name.toLowerCase() === currentUser.name.toLowerCase());
    if (user) {
        user.nightCounter = nightCount;
        saveUsers(users);
        currentUser.nightCounter = nightCount;
    }
}

// event listeners
// input validation
function validateInput() {
    let username = usernameInput.value;
    startBtn.disabled = username.trim() === '';
    let existingUser = findUser(username);
    continueBtn.disabled = !existingUser;
}

usernameInput.addEventListener('input', validateInput);
validateInput();

// instructions
instructionBtn.addEventListener('click', () => {
    instructionContainer.style.display = 'flex';
})

closeInstructionBtn.addEventListener('click', () => {
    instructionContainer.style.display = 'none';
})

// game start
startBtn.addEventListener('click', () => {
    const username = usernameInput.value.trim();
    if (!username) return;

    let users = getUsers();
    let userIndex = users.findIndex(u => u.name === username);

    if (userIndex !== -1) {
        users[userIndex].nightCounter = 1;
        currentUser = users[userIndex];
    } else {
        currentUser = { name: username, nightCounter: 1 };
        users.push(currentUser);
    }

    saveUsers(users);

    currentProgress = currentUser.nightCounter;

    theTransition.classList.add('start-transition');
    setTimeout(() => {
        menuContainer.style.display = 'none';
        instructionContainer.style.display = 'none';
        menuTitle.style.display = 'none';
        bgMenu.style.background = 'black';
    }, 2000);

    setTimeout(() => {
        theTransition.classList.remove('start-transition');
    }, 2000);

    setTimeout(() => {
        theIntro.style.display = 'block';
    }, 2000);

    setTimeout(() => {
        theTransition.classList.add('start-transition');
    }, 8000);

    setTimeout(() => {
        theTransition.classList.remove('start-transition');
        gameContainer.style.display = 'flex';
        theIntro.style.background = 'black';
        gameStart(currentProgress);
    }, 10000);
    
})

// continue
continueBtn.addEventListener('click', () => {
    const username = usernameInput.value.trim();
    const user = findUser(username);

    if (!user) return;

    currentUser = user;
    currentProgress = user.nightCounter;

    theTransition.classList.add('start-transition');
    setTimeout(() => {
        menuContainer.style.display = 'none';
        instructionContainer.style.display = 'none';
        menuTitle.style.display = 'none';
        bgMenu.style.background = 'black';
    }, 2000);

    setTimeout(() => {
        theTransition.classList.remove('start-transition');
    }, 2000);
    setTimeout(() => {
        theTransition.classList.remove('start-transition');
        gameContainer.style.display = 'flex';
        theIntro.style.background = 'black';
        gameStart(currentProgress);
    }, 2000);
})