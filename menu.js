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

// event listeners
// input validation
function validateInput() {
    let username = usernameInput.value;

    startBtn.disabled = username.trim() === '';
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
    menuContainer.style.display = 'none';
    instructionContainer.style.display = 'none';
    gameContainer.style.display = 'flex';
    menuTitle.style.display = 'none';
    bgMenu.style.background = 'black';

    gameStart();
})