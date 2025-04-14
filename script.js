// canvas
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 1280;
canvas.height = 720;

// load images

// office
const officeBg = new Image();
officeBg.src = './Sprites/room_office/office_place_fix.png'

// lit office
const litOverlays = {
    left: new Image(),
    right: new Image()
}

litOverlays.left.src = './Sprites/room_office/left_door_lit.png';
litOverlays.right.src = './Sprites/room_office/right_door_lit.png';

// buttons office
const buttonSprites = {
    left: {
        default: new Image(),
        bothOn: new Image(),
        doorOn: new Image(),
        lightOn: new Image()
    },
    right: {
        default: new Image(),
        bothOn: new Image(),
        doorOn: new Image(),
        lightOn: new Image()
    }
}

buttonSprites.left.default.src = './Sprites/office_buttons/left_side/left_button_default.png';
buttonSprites.left.bothOn.src = './Sprites/office_buttons/left_side/left_button_both_on.png';
buttonSprites.left.doorOn.src = './Sprites/office_buttons/left_side/left_button_door_on.png';
buttonSprites.left.lightOn.src = './Sprites/office_buttons/left_side/left_button_light_on.png';

buttonSprites.right.default.src = './Sprites/office_buttons/right_side/right_button_default.png';
buttonSprites.right.bothOn.src = './Sprites/office_buttons/right_side/right_button_both_on.png';
buttonSprites.right.doorOn.src = './Sprites/office_buttons/right_side/right_button_door_on.png';
buttonSprites.right.lightOn.src = './Sprites/office_buttons/right_side/right_button_light_on.png';

// office doors
const doorImage = new Image();
doorImage.src = './Sprites/room_office/office_doors.png';

// game variables

// office background system
let mouseX = canvas.width / 2;
let bgOffsetX = 0;

// office button states (door & lights)
let leftDoor = false;
let leftLight = false;

let rightDoor = false;
let rightLight = false;

// office door animations
let leftDoorFrame = 0;
let rightDoorFrame = 0;

let leftDoorClosing = 0;
let leftDoorOpening = 0;

let rightDoorClosing = 0;
let rightDoorOpening = 0;

const doorFrameDelay = 2;
let doorDelayCounter = 0;

// ? door frames
const leftDoorFrames = [
    { x: 0, y: 78 },
    { x: 253, y: 78 },
    { x: 502, y: 78 },
    { x: 751, y: 78 },
    { x: 1000, y: 78 },
    { x: 1249, y: 78 },
    { x: 1498, y: 78 },
    { x: 253, y: 799 },
    { x: 502, y: 799 },
    { x: 751, y: 799 },
    { x: 1000, y: 799 },
    { x: 1249, y: 799 },
    { x: 1498, y: 799 },
    { x: 253, y: 1520 },
    { x: 502, y: 1520 },
    { x: 751, y: 1520 },
    { x: 1000, y: 1520 },
]

const rightDoorFrames = [
    { x: 0, y: 78 },
    { x: 253, y: 78 },
    { x: 502, y: 78 },
    { x: 751, y: 78 },
    { x: 1000, y: 78 },
    { x: 1249, y: 78 },
    { x: 1498, y: 78 },
    { x: 253, y: 799 },
    { x: 502, y: 799 },
    { x: 751, y: 799 },
    { x: 1000, y: 799 },
    { x: 1249, y: 799 },
    { x: 1498, y: 799 },
    { x: 253, y: 1520 },
    { x: 502, y: 1520 },
    { x: 751, y: 1520 },
    { x: 1000, y: 1520 },
]

const doorFrameWidth = 224;
const doorFrameHeight = 720;

function updateDoorAnimations() {
    if (++doorDelayCounter >= doorFrameDelay) {
        doorDelayCounter = 0;

        // left
        if (leftDoorClosing && leftDoorFrame < leftDoorFrames.length - 1) {
            leftDoorFrame++;
            if (leftDoorFrame === leftDoorFrames.length - 1) leftDoorClosing = false;
        } else if (leftDoorOpening && leftDoorFrame > 0) {
            leftDoorFrame--;
            if (leftDoorFrame === 0) leftDoorOpening = false;
        }

        // right
        if (rightDoorClosing && rightDoorFrame < rightDoorFrames.length - 1) {
            rightDoorFrame++;
            if (rightDoorFrame === rightDoorFrames.length - 1) rightDoorClosing = false;
        } else if (rightDoorOpening && rightDoorFrame > 0) {
            rightDoorFrame--;
            if (rightDoorFrame === 0) rightDoorOpening = false;
        }
    }
}

// event listeners
// camera office movement
canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouseX = e.clientX - rect.left;
})

// office buttons detection
canvas.addEventListener('click', (e) => {
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left + bgOffsetX;
    const mouseY = e.clientY - rect.top;

    // left side
    if (mouseX >= 1 && mouseX <= 1 + 75 && mouseY >= 300 && mouseY <= 300 + 50) {
        if (!leftDoor) {
            leftDoorClosing = true;
            leftDoorOpening = false;
        } else {
            leftDoorClosing = false;
            leftDoorOpening = true;
        }

        leftDoor = !leftDoor;
    }
    if (mouseX >= 1 && mouseX <= 1 + 75 && mouseY >= 385 && mouseY <= 385 + 50) {
        leftLight = !leftLight;
        rightLight = false;
    }

    // right side
    if (mouseX >= 1480 && mouseX <= 1480 + 75 && mouseY >= 300 && mouseY <= 300 + 50) {
        if (!rightDoor) {
            rightDoorClosing = true;
            rightDoorOpening = false;
        } else {
            rightDoorClosing = false;
            rightDoorOpening = true;
        }

        rightDoor = !rightDoor;
    }
    if (mouseX >= 1480 && mouseX <= 1480 + 75 && mouseY >= 385 && mouseY <= 385 + 50) {
        rightLight = !rightLight;
        leftLight = false;
    }
})

// game drawings
// draw office
function drawOfficeBg() {
    if (!officeBg.complete) return;

    const maxOffset = officeBg.width - canvas.width;
    const percent = mouseX / canvas.width;
    bgOffsetX = percent * maxOffset;

    ctx.drawImage(officeBg, bgOffsetX, 0, canvas.width, canvas.height, 0, 0, canvas.width, canvas.height);
}

// draw lit office rooms
function drawLitRoom() {

    if (leftLight && litOverlays.left.complete) {
        ctx.drawImage(litOverlays.left, bgOffsetX, 0, canvas.width, canvas.height, 0, 0, canvas.width, canvas.height);
    } else if (rightLight && litOverlays.right.complete) {
        ctx.drawImage(litOverlays.right, bgOffsetX, 0, canvas.width, canvas.height, 0, 0, canvas.width, canvas.height);
    }
}

// draw office buttons
function drawOfficeButtons() {
    // left
    let leftImg;
    if (leftDoor && leftLight) leftImg = buttonSprites.left.bothOn;
    else if (leftDoor) leftImg = buttonSprites.left.doorOn;
    else if (leftLight) leftImg = buttonSprites.left.lightOn;
    else leftImg = buttonSprites.left.default;

    // right
    let rightImg;
    if (rightDoor && rightLight) rightImg = buttonSprites.right.bothOn;
    else if (rightDoor) rightImg = buttonSprites.right.doorOn;
    else if (rightLight) rightImg = buttonSprites.right.lightOn;
    else rightImg = buttonSprites.right.default;

    if (!leftImg.complete && !rightImg.complete) return;

    ctx.drawImage(leftImg, 1 - bgOffsetX, 250);
    ctx.drawImage(rightImg, 1480 - bgOffsetX, 250);
}

// draw office doors
function drawDoors() {
    const right = rightDoorFrames[rightDoorFrame];
    const left = leftDoorFrames[leftDoorFrame];


    // left
    ctx.save();
    ctx.scale(-1, 1);

    const flippedX = -(0 - bgOffsetX + 300);
    ctx.drawImage(doorImage, left.x, left.y, doorFrameWidth, doorFrameHeight, flippedX, 0, doorFrameWidth, doorFrameHeight);

    ctx.restore();

    // right
    ctx.drawImage(doorImage, right.x, right.y, doorFrameWidth, doorFrameHeight, 1300 - bgOffsetX, 0, doorFrameWidth, doorFrameHeight);
}

// game loop
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // office
    drawOfficeBg();
    drawLitRoom();
    drawDoors();
    drawOfficeButtons();
    updateDoorAnimations();

    requestAnimationFrame(gameLoop);
}

function gameStart() {
    gameLoop();
}