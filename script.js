// canvas
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 1280;
canvas.height = 720;

// load audio & audio manager
const AudioManager = {
    sounds: {},

    load(name, src, options = {}) {
        const audio = new Audio(src);
        audio.volume = options.volume ?? 1;
        audio.loop = options.loop ?? false;
        this.sounds[name] = audio;
    },

    play(name, restart = true) {
        const sound = this.sounds[name];
        if (!sound) return;

        if (restart) {
            sound.currentTime = 0;
        }

        sound.play().catch(e => {
            console.warn(`Audio "${name}" couldn't play:`, e);
        });
    },

    pause(name) {
        const sound = this.sounds[name];
        if (sound) sound.pause();
    },

    stop(name) {
        const sound = this.sounds[name];
        if (sound) {
            sound.pause();
            sound.currentTime = 0;
        }
    },

    setVolume(name, volume) {
        const sound = this.sounds[name];
        if (sound) sound.volume = volume;
    },

    muteAll() {
        for (const key in this.sounds) {
            this.sounds[key].muted = true;
        }
    },

    unmuteAll() {
        for (const key in this.sounds) {
            this.sounds[key].muted = false;
        }
    }
};

function loadSounds(sounds) {
    for (const [name, path] of Object.entries(sounds)) {
        AudioManager.load(name, path);
    }
}

loadSounds({
    powerdown: './SFX/powerdown.wav',
    camera_open: './SFX/camera_open.wav',
    camera_close: './SFX/camera_close.wav',
    change_camera: './SFX/change_camera.wav',
    crowd_cheering: './SFX/crowd_cheering.wav',
    door_open_close: './SFX/door_open_close.wav',
    error: './SFX/error.wav',
    freddy_nose: './SFX/freddy_nose.wav',
    mid_game_ambience: './SFX/mid_game_ambience.wav',
    office_ambience: './SFX/office_ambience.wav',
    tape_sounds: './SFX/tape_sounds.wav',
    windowscare: './SFX/windowscare.wav',
    winning_bells: './SFX/winning_bells.wav',
    freddy_is_here: './SFX/freddy_is_here.wav',
});

function startAmbience() {
    AudioManager.load('office_ambience', './SFX/office_ambience.wav', { loop: true, volume: 0.3 });
    AudioManager.play('office_ambience');

    setTimeout(() => {
        AudioManager.stop('office_ambience');
        AudioManager.load('mid_game_ambience', './SFX/mid_game_ambience.wav', { loop: true, volume: 0.5 });
        AudioManager.play('mid_game_ambience');
    }, 12000);
}


// load images
// office
const officeBg = new Image();
officeBg.src = './Sprites/room_office/office_place_fix.png';

const officePowerOutBg = new Image();
officePowerOutBg.src = './Sprites/room_office/game_over.png';

const officeFreddyIsHereBg = new Image();
officeFreddyIsHereBg.src = './Sprites/room_office/freddy_is_here.png';

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

// camera stuff
const cameraSprites = {
    redDot: new Image(),
    border: new Image(),
    cams: new Image()
}

cameraSprites.redDot.src = './Sprites/camera_ui/camera_red_dot.png';
cameraSprites.border.src = './Sprites/camera_ui/camera_border.png';
cameraSprites.cams.src = './Sprites/camera_ui/camera_cams.png';

const cameraBar = new Image();
cameraBar.src = './Sprites/office_ui/camera_bar.png';

const cameraLiftImage = new Image();
cameraLiftImage.src = './Sprites/camera_ui/camera_lift.png';

// power system
const powerBarFrames = [
    { x: 1, y: 58 },
    { x: 106, y: 58 },
    { x: 211, y: 58 },
    { x: 316, y: 58 },
    { x: 1, y: 92 },   
];

const powerBarImage = new Image();
powerBarImage.src = './Sprites/camera_ui/camera_power.png';

// power ui texts
const uiSprites = {
    usageLabel: { x: 1, y: 42, w: 72, h: 14 },
    powerLeftLabel: { x: 1, y: 26, w: 137, h: 14 },
    digits: {
        '0': { x: 1, y: 2, w: 18, h: 22 },
        '1': { x: 20, y: 2, w: 18, h: 22 },
        '2': { x: 39, y: 2, w: 18, h: 22 },
        '3': { x: 58, y: 2, w: 18, h: 22 },
        '4': { x: 77, y: 2, w: 18, h: 22 },
        '5': { x: 96, y: 2, w: 18, h: 22 },
        '6': { x: 115, y: 2, w: 18, h: 22 },
        '7': { x: 134, y: 2, w: 18, h: 22 },
        '8': { x: 153, y: 2, w: 18, h: 22 },
        '9': { x: 172, y: 2, w: 18, h: 22 },
        '%': { x: 268, y: 2, w: 18, h: 22 },
    }
}

// night timer sprite
const nightTimerImage = new Image();
nightTimerImage.src = './Sprites/camera_ui/camera_night_timer.png';

const nightTimerSprites = {
    nightLabel: { x: 0, y: 0, w: 63, h: 14 },
    AMLabel: { x: 1, y: 64, w: 42, h: 25 },
    hourDigits: {
        '1': { x: 26, y: 33, w: 24, h: 30 },
        '2': { x: 51, y: 33, w: 24, h: 30 },
        '3': { x: 76, y: 33, w: 24, h: 30 },
        '4': { x: 101, y: 33, w: 24, h: 30 },
        '5': { x: 126, y: 33, w: 24, h: 30 },
    },
    nightDigits: {
        '1': { x: 80, y: 0, w: 14, h: 17 },
        '2': { x: 95, y: 0, w: 14, h: 17 },
        '3': { x: 110, y: 0, w: 14, h: 17 },
        '4': { x: 125, y: 0, w: 14, h: 17 },
        '5': { x: 140, y: 0, w: 14, h: 17 },
        '6': { x: 155, y: 0, w: 14, h: 17 },
        '7': { x: 170, y: 0, w: 14, h: 17 },
    }
}

// game variables
// night system (progression)
let nightStartTime = null;
let currentHour = 12;
let hourCount = 0;
let nightEnded = false;
let nightNumber = 1;

function startNight(night) {
    nightNumber = night;
    nightStartTime = Date.now();
    currentHour = 12;
    hourCount = 0;
    nightEnded = false;
}

function updateNightProgress() {
    if (nightEnded || nightStartTime === null) return;

    const now = Date.now();
    const elapsed = now - nightStartTime;
    const newHourCount = Math.floor(elapsed / 60000); // 20s per in-game hour

    if (newHourCount !== hourCount && newHourCount <= 6) {
        hourCount = newHourCount;
        currentHour = hourCount === 0 ? 12 : hourCount;
        // AudioManager.play('clock_chime');
        console.log(`🕒 It is now ${currentHour} AM`);
    }

    if (hourCount >= 6) {
        nightEnded = true;
        alert('You survived until 6 AM! 🎉');
    }
}


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

// core camera
let cameraLiftFrames = [
    { x: 2, y: 2 },
    { x: 1284, y: 2 },
    { x: 2566, y: 2 },
    { x: 3848, y: 2 },
    { x: 2, y: 724 },
    { x: 1284, y: 724 },
    { x: 2566, y: 724 },
    { x: 3848, y: 724 },
    { x: 2, y: 1446 },
    { x: 1284, y: 1446 },
    { x: 2566, y: 1446 },
];

const cameraLiftFrameWidth = canvas.width;
const cameraLiftFrameHeight = canvas.height;

let cameraIsOpen = false;
let cameraOpening = false;
let cameraClosing = false;
let cameraFrame = 0;
let cameraFrameDelay = 2;
let cameraDelayCounter = 0;

let cameraAnimationFinished = false;

function updateCameraAnimations() {
    if (++cameraDelayCounter >= cameraFrameDelay) {
        cameraDelayCounter = 0;

        if (cameraOpening && cameraFrame < cameraLiftFrames.length - 1) {
            cameraFrame++;
            if (cameraFrame === cameraLiftFrames.length - 1) {
                cameraOpening = false;
                cameraIsOpen = true;
                cameraAnimationFinished = true;
            }
        } else if (cameraClosing && cameraFrame > 0) {
            cameraFrame--;
            if (cameraFrame === 0) {
                cameraClosing = false;
                cameraIsOpen = false;
                cameraAnimationFinished = false;
            }
        }
    }
}

// rooms

const cameraRooms = [
    {
        name: "Show Stage",
        path: "./Sprites/rooms/show_stage/defined_show_stage.png",
        frameCount: 7,
        frameWidth: 1600,
        frameHeight: 720,
        image: new Image(),
        currentFrame: 0,
    },
    {
        name: "Backstage",
        path: "./Sprites/rooms/backstage/defined_backstage.png",
        frameCount: 4,
        frameWidth: 1600,
        frameHeight: 720,
        image: new Image(),
        currentFrame: 0
    },
    {
        name: "Dining Area",
        path: "./Sprites/rooms/dining_area/defined_dining_area.png",
        frameCount: 6,
        frameWidth: 1600,
        frameHeight: 720,
        image: new Image(),
        currentFrame: 0
    },
    {
        name: "East Hall",
        path: "./Sprites/rooms/east_hall/defined_east_hall.png",
        frameCount: 6,
        frameWidth: 1600,
        frameHeight: 720,
        image: new Image(),
        currentFrame: 0
    },
    {
        name: "East Hall Corner",
        path: "./Sprites/rooms/east_hall/defined_east_hall_corner.png",
        frameCount: 9,
        frameWidth: 1600,
        frameHeight: 720,
        image: new Image(),
        currentFrame: 0
    },
    {
        name: "Pirates Cove",
        path: "./Sprites/rooms/pirates_cove/defined_pirates_cove.png",
        frameCount: 5,
        frameWidth: 1600,
        frameHeight: 720,
        image: new Image(),
        currentFrame: 0
    },
    {
        name: "Restrooms",
        path: "./Sprites/rooms/restrooms/defined_restrooms.png",
        frameCount: 4,
        frameWidth: 1600,
        frameHeight: 720,
        image: new Image(),
        currentFrame: 0
    },
    {
        name: "Supply Closet",
        path: "./Sprites/rooms/supply_closet/defined_supply_closet.png",
        frameCount: 2,
        frameWidth: 1600,
        frameHeight: 720,
        image: new Image(),
        currentFrame: 0
    },
    {
        name: "West Hall",
        path: "./Sprites/rooms/west_hall/defined_west_hall.png",
        frameCount: 3, // 34
        frameWidth: 1600,
        frameHeight: 720,
        image: new Image(),
        currentFrame: 0
    },
    {
        name: "West Hall Corner",
        path: "./Sprites/rooms/west_hall/defined_west_hall_corner.png",
        frameCount: 6,
        frameWidth: 1600,
        frameHeight: 720,
        image: new Image(),
        currentFrame: 0
    },
];

cameraRooms.forEach(room => {
    room.image.src = room.path;
});

// camera system
let currentCamIndex = 0;
let cameraRoom = cameraRooms[currentCamIndex];

const defaultPan = {
    x: 0,
    direction: 1,
    delay: 5000,
    lastUpdate: Date.now()
};

cameraRooms.forEach(room => {
    if (room.frameWidth < 1600) return;

    room.pan = {
        ...defaultPan,
        maxX: 1600 - canvas.width
    };
});

function updateCameraPan(room, deltaTime) {
    if (!room.pan) return;

    const speed = 60;
    const moveAmount = speed * (deltaTime / 1000);

    room.pan.x += moveAmount * room.pan.direction;

    if (room.pan.x >= room.pan.maxX) {
        room.pan.x = room.pan.maxX;
        room.pan.direction = -1;
    } else if (room.pan.x <= 0) {
        room.pan.x = 0;
        room.pan.direction = 1;
    }
}

// camera zones (minimap)
const cameraZones = [
    { name: "Backstage", x: 800, y: 385, width: 60, height: 35 },
    { name: "Dining Area", x: 905, y: 355, width: 60, height: 35 },
    { name: "Show Stage", x: 925, y: 300, width: 60, height: 35 },
    { name: "East Hall", x: 1030, y: 550, width: 60, height: 35 },
    { name: "East Hall Corner", x: 1030, y: 590, width: 60, height: 35 },
    { name: "Pirates Cove", x: 875, y: 435, width: 60, height: 35 },
    { name: "Restrooms", x: 1140, y: 385, width: 60, height: 35 },
    { name: "Supply Closet", x: 840, y: 535, width: 60, height: 35 },
    { name: "West Hall", x: 925, y: 550, width: 60, height: 35 },
    { name: "West Hall Corner", x: 925, y: 590, width: 60, height: 35 }
];

// static screen
const staticEffect = {
    image: new Image(),
    path: "./Sprites/static_screen.png",
    frameCount: 7,
    frameWidth: 1280,
    frameHeight: 720,
    currentFrame: 0,
    frameDelay: 0,
    frameTimer: 0
};

staticEffect.image.src = staticEffect.path;

// power system
const powerSystem = {
    totalPower: 100,
    usageLevel: 0,
    lastUpdate: Date.now(),
    drainRates: [0.1, 0.25, 0.35, 0.5, 0.75]
};

function updatePowerUsage() {
    if (!gameRunning) return;
    let usage = 0;

    if (leftDoor) usage++;
    if (rightDoor) usage++;
    if (leftLight) usage++;
    if (rightLight) usage++;
    if (cameraIsOpen) usage++;

    powerSystem.usageLevel = Math.min(usage, 4);
    console.log(powerSystem.usageLevel);
}

function updatePowerSystem() {
    if (!gameRunning) return;
    const now = Date.now();
    const dt = (now - powerSystem.lastUpdate) / 1000;
    powerSystem.lastUpdate = now;

    const drain = powerSystem.drainRates[powerSystem.usageLevel];
    powerSystem.totalPower = Math.max(0, powerSystem.totalPower - drain * dt);

    console.log(powerSystem.totalPower);

    if (powerSystem.totalPower <= 0) {
        handlePowerOut();
    }
}

// GAME OVER (power out)
let freddyActive = false;
let freddyImageToggle = false;
let freddyTimer = 0;
let freddyStartDelay = 5000;
let freddyTriggered = false;

let moved = false;
let roomDark = false;
let roomDarkDelay = 0;
let powerOutTriggered = false;

function handlePowerOut() {
    if (powerOutTriggered) return;
    powerOutTriggered = true;

    AudioManager.stop('office_ambience');
    AudioManager.stop('mid_game_ambience');

    canvas.addEventListener('mousemove', () => {
        if (!moved) {
            moved = true;
            AudioManager.play('powerdown');
        }
    });

    freddyStartDelay = Date.now() + Math.random() * 5000 + 10000;

    leftDoorActive = false;
    rightDoorActive = false;
    leftLightActive = false;
    rightLightActive = false;
    cameraIsOpen = false;

    powerOut = true;

    leftLight = false;
    rightLight = false;

    leftDoorClosing = false;
    leftDoorOpening = true;

    rightDoorClosing = false;
    rightDoorOpening = true;
    
    if (leftDoor) {
        leftDoor = false;
        AudioManager.play('door_open_close');
    }

    if (rightDoor) {
        rightDoor = false;
        AudioManager.play('door_open_close');
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
        if (!leftDoor && !powerOut) {
            leftDoorClosing = true;
            leftDoorOpening = false;
            AudioManager.play('door_open_close');
            leftDoor = !leftDoor;
        } else if (leftDoor && !powerOut){
            leftDoorClosing = false;
            leftDoorOpening = true;
            AudioManager.play('door_open_close');
            leftDoor = !leftDoor;
        } else if (powerOut) {
            AudioManager.play('error');
        }

    }
    if (mouseX >= 1 && mouseX <= 1 + 75 && mouseY >= 385 && mouseY <= 385 + 50) {
        if (!powerOut) {
            leftLight = !leftLight;
            rightLight = false;
        } else {
            AudioManager.play('error');
        }
    }

    // right side
    if (mouseX >= 1480 && mouseX <= 1480 + 75 && mouseY >= 300 && mouseY <= 300 + 50) {
        if (!rightDoor && !powerOut) {
            rightDoorClosing = true;
            rightDoorOpening = false;
            AudioManager.play('door_open_close');
            rightDoor = !rightDoor;
        } else if (rightDoor && !powerOut) {
            rightDoorClosing = false;
            rightDoorOpening = true;
            AudioManager.play('door_open_close');
            rightDoor = !rightDoor;
        } else if (powerOut) {
            AudioManager.play('error');
        }

        
    }
    if (mouseX >= 1480 && mouseX <= 1480 + 75 && mouseY >= 385 && mouseY <= 385 + 50) {
        if (!powerOut) {
            rightLight = !rightLight;
            leftLight = false;
        } else {
            AudioManager.play('error');
        }
    }
})

// core camera stuff
canvas.addEventListener('click', (e) => {
    if (powerOut) return;
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    if (mouseX >= 350 && mouseX <= 950 && mouseY >= 640 && mouseY <= 720) {
        if (cameraIsOpen && !cameraClosing && !cameraOpening) {
            cameraClosing = true;
            cameraOpening = false;
            cameraAnimationFinished = false;
            AudioManager.play('camera_open');
        } else if (!cameraIsOpen && !cameraOpening && !cameraClosing) {
            cameraOpening = true;
            cameraClosing = false;
            AudioManager.play('camera_close');
        }
    }
})

// minimap camera
canvas.addEventListener('click', (e) => {
    if (!cameraIsOpen || cameraOpening || cameraClosing) return;

    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    for (let zone of cameraZones) {
        if (
            mouseX >= zone.x && mouseX <= zone.x + zone.width &&
            mouseY >= zone.y && mouseY <= zone.y + zone.height
        ) {
            AudioManager.play('change_camera');
            const roomIndex = cameraRooms.findIndex(r => r.name === zone.name);
            if (roomIndex !== -1) {
                currentCamIndex = roomIndex;
                console.log("Switched to:", zone.name);
            }
        }
    }
});

// game drawings
// draw night clock helper
function drawSpriteClock(sprite, dx, dy) {
    ctx.drawImage(
        nightTimerImage,
        sprite.x, sprite.y, sprite.w, sprite.h,
        dx, dy, sprite.w, sprite.h
    );
}

// draw night clock
function drawClockUI() {
    if (powerOut) return;
    
    const hourStr = currentHour.toString();
    let hourOffsetX = canvas.width - 200;

    for (let char of hourStr) {
        const digitSprite = nightTimerSprites.hourDigits[char];
        if (digitSprite) {
            drawSpriteClock(digitSprite, hourOffsetX + 50, 37);
            hourOffsetX += digitSprite.w + 2;
        }
    }

    drawSpriteClock(nightTimerSprites.AMLabel, hourOffsetX + 65, 40);

    drawSpriteClock(nightTimerSprites.nightLabel, canvas.width - 145, 83);

    const nightStr = nightNumber.toString();
    let nightOffsetX = canvas.width - 65;
    for (let char of nightStr) {
        const digit = nightTimerSprites.nightDigits[char];
        if (digit) {
            drawSpriteClock(digit, nightOffsetX, 80);
            nightOffsetX += digit.w + 2;
        }
    }
}

// draw office
function drawOfficeBg() {
    let bgImage;

    if (powerOut) {
        const now = Date.now();

        if (!freddyTriggered && now >= freddyStartDelay) {
            freddyTriggered = true;
            freddyActive = true;
            freddyTimer = now;
            roomDarkDelay = now + Math.random() * 5000 + 10000;
            AudioManager.play('freddy_is_here');
        }

        if (freddyActive) {
            if (now - freddyTimer > 500) {
                freddyImageToggle = !freddyImageToggle;
                freddyTimer = now;
            }
            
            if (freddyTriggered && !roomDark && now >= roomDarkDelay) {
                roomDark = true;
                AudioManager.stop('freddy_is_here');
            }
            

            bgImage = freddyImageToggle ? officeFreddyIsHereBg : officePowerOutBg;
        } else {
            bgImage = officePowerOutBg;
        }
    } else {
        bgImage = officeBg;
    }

    if (!bgImage.complete) return;

    if (roomDark) {
        bgImage = officePowerOutBg;
    }

    const maxOffset = bgImage.width - canvas.width;
    const percent = mouseX / canvas.width;
    bgOffsetX = percent * maxOffset;

    ctx.drawImage(bgImage, bgOffsetX, 0, canvas.width, canvas.height, 0, 0, canvas.width, canvas.height);
}

function drawDarkerOffice() {
    if (roomDark) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.9)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
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

function drawCameraBar() {
    if (!cameraBar.complete || powerOut) return;

    ctx.drawImage(cameraBar, 350, 640);
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

// draw core camera UI
function drawCameraUI() {
    if (!cameraIsOpen && !cameraOpening && !cameraClosing) return;

    if (!cameraSprites.border.complete || 
        !cameraSprites.cams.complete || 
        !cameraSprites.redDot.complete || 
        !cameraBar.complete) return;

    ctx.fillStyle = "white";
    ctx.font = "24px Consolas";
    ctx.fillText(cameraRooms[currentCamIndex].name, 900, 250);

    ctx.drawImage(cameraSprites.redDot, 40, 40);
    ctx.drawImage(cameraSprites.border, 0, 0);
    ctx.drawImage(cameraSprites.cams, 800, 300);
}


function drawCameraLift() {
    const frame = cameraLiftFrames[cameraFrame];
    ctx.drawImage(
        cameraLiftImage,
        frame.x,
        frame.y,
        cameraLiftFrameWidth,
        cameraLiftFrameHeight,
        0, 0,
        canvas.width, canvas.height
    );
}

// draw camera rooms
function drawCameraRoom(index) {
    const room = cameraRooms[index];
    const panX = room.pan ? room.pan.x : 0;

    ctx.drawImage(
        room.image,
        room.currentFrame * room.frameWidth + panX,
        0,
        canvas.width,
        canvas.height,
        0,
        0,
        canvas.width,
        canvas.height
    );
}




window.addEventListener('keydown', (e) => {
    if (cameraIsOpen && !cameraOpening && !cameraClosing) {
        if (e.key === 'ArrowRight') {
            currentCamIndex = (currentCamIndex + 1) % cameraRooms.length;
            console.log('right')
        }
        if (e.key === 'ArrowLeft') {
            currentCamIndex = (currentCamIndex - 1 + cameraRooms.length) % cameraRooms.length;
            console.log('left');
        }
    }
});

// draw static rooms
function drawCameraStatic() {
    staticEffect.frameTimer++;
    if (staticEffect.frameTimer >= staticEffect.frameDelay) {
        staticEffect.currentFrame = (staticEffect.currentFrame + 1) % staticEffect.frameCount;
        staticEffect.frameTimer = 0;
    }

    ctx.save();
    ctx.globalAlpha = 0.25;
    ctx.drawImage(
        staticEffect.image,
        staticEffect.currentFrame * staticEffect.frameWidth,
        0,
        staticEffect.frameWidth,
        staticEffect.frameHeight,
        0,
        0,
        canvas.width,
        canvas.height
    );
    ctx.restore();
}

// text system (the power)
function drawTextFromSprites(text, startX, startY) {
    let x = startX;

    for (let char of text) {
        const sprite = uiSprites.digits[char];
        if (!sprite) continue;

        ctx.drawImage(
            powerBarImage,
            sprite.x, sprite.y, sprite.w, sprite.h,
            x, startY, sprite.w, sprite.h
        );

        x += sprite.w + 2;
    }
}

// draw power UI
function drawPowerUI() {
    if (powerOut) return;

    let label = uiSprites.powerLeftLabel;
    ctx.drawImage(powerBarImage, label.x, label.y, label.w, label.h, 50, 620, label.w, label.h);

    let usage = uiSprites.usageLabel;
    ctx.drawImage(powerBarImage, usage.x, usage.y, usage.w, usage.h, 50, 660, usage.w, usage.h);

    const power = Math.max(0, Math.floor(powerSystem.totalPower)) + '%';
    drawTextFromSprites(power, 200, 615);

    const frame = powerBarFrames[powerSystem.usageLevel];
    const frameWidth = 103;
    const frameHeight = 32;

    const destX = 130;
    const destY = 650;

    ctx.drawImage(
        powerBarImage,
        frame.x, frame.y,
        frameWidth, frameHeight,
        destX, destY,
        frameWidth, frameHeight
    );
}




// game loop
let lastFrameTime = Date.now();
let gameRunning = false;
let powerOut = false;

function getDeltaTime() {
    const now = Date.now();
    const delta = now - lastFrameTime;
    lastFrameTime = now;
    return delta;
}


function gameLoop() {
    if (!gameRunning) return;
    const deltaTime = getDeltaTime();

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // office
    drawOfficeBg();
    drawLitRoom();
    drawDoors();
    drawOfficeButtons();
    drawCameraBar();
    updateDoorAnimations();
    drawDarkerOffice();

    // camera
    updateCameraAnimations();

    if (cameraIsOpen || cameraOpening || cameraClosing) {
        drawCameraLift();
    
        if (cameraAnimationFinished) {
            const room = cameraRooms[currentCamIndex];
            updateCameraPan(room, deltaTime);
            drawCameraRoom(currentCamIndex);
            drawCameraStatic();
            drawCameraUI();
        }
    
        drawCameraBar();
    }

    // power system
    updatePowerUsage();
    updatePowerSystem();
    drawPowerUI();

    // night system
    updateNightProgress();
    drawClockUI();


    requestAnimationFrame(gameLoop);
}

function gameStart(nightCounter) {
    powerSystem.lastUpdate = Date.now();
    gameRunning = true;
    gameLoop();
    startAmbience();
    startNight(nightCounter);
}