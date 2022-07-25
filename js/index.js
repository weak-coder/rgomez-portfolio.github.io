// let scroll = 0;
// addEventListener("wheel", (e) => {
//     scroll += e.deltaY;
// })

const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");


function resize() {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    c.fillStyle = "white";
    c.fillRect(0, 0, canvas.width, canvas.height);
}

resize();

addEventListener("resize", () => {
    resize();
})

const runRightPng = [];
const runLeftPng = [];
const fly = [];
const flyReverse = []

function getImage(move) {
    if (move == "run right") {
        for (let index = 0; index < 21; index++) {

            if (index <= 9) {
                runRightPng.push("./assets/img/run right alien/p1_walk0" + index + ".png");
            }
            else {
                runRightPng.push("./assets/img/run right alien/p1_walk" + index + ".png");
            }
        }
    }
    if (move == "run left") {
        for (let index = 0; index < 21; index++) {

            if (index <= 9) {
                runLeftPng.push("./assets/img/run left alien/p1_walk0" + index + ".png");
            }
            else {
                runLeftPng.push("./assets/img/run left alien/p1_walk" + index + ".png");
            }
        }
    }
    if (move == "fly") {
        for (let index = 0; index < 11; index++) {

            if (index <= 9) {
                fly.push("./assets/img/bird/skeleton-animation_0" + index + ".png");
            }
            else {
                fly.push("./assets/img/bird/skeleton-animation_" + index + ".png");
            }
        }
    }
    if (move == "fly reverse") {
        for (let index = 0; index < 11; index++) {

            if (index <= 9) {
                flyReverse.push("./assets/img/bird reverse/skeleton-animation_0" + index + ".png");
            }
            else {
                flyReverse.push("./assets/img/bird reverse/skeleton-animation_" + index + ".png");
            }
        }
    }
}
getImage("run right");
getImage("run left");
getImage("fly");
getImage("fly reverse");


function imageCreator(imgSrc) {
    const image = new Image();
    image.src = imgSrc;
    return image;
}


class Character {
    constructor() {
        this.position = {
            x: 100,
            y: canvas.height - 238
        }
        this.velocity = {
            x: 0,
            y: 0
        }
        this.aspect = {
            width: 72,
            height: 97
        }
        this.gravity = 0.3;
        this.image = imageCreator();
    }
    render() {
        const { x, y } = this.position;
        c.drawImage(this.image, x, y,);
    }
    update() {
        if (this.position.y + this.aspect.height + this.velocity.y <= canvas.height) {
            this.position.y += this.velocity.y;
            this.velocity.y += this.gravity;
            this.render();
        }
        else {
            this.velocity.y = 0;
        }
        this.position.x += this.velocity.x;
    }
}

class Platform {
    constructor(x, y, width, height, imgSrc) {
        this.position = {
            x,
            y
        }
        this.aspect = {
            width,
            height
        }
        this.image = imageCreator(imgSrc);
    }
    render() {
        const { x, y } = this.position;
        const { width: w, height: h } = this.aspect;
        c.fillStyle = "brown";
        // c.fillRect(x, y, w, h);
        c.drawImage(this.image, x, y, w, h)
    }
}
const platformImg = "./assets/img/tile_1.png";
// const backgroundImg0 = "./assets/img/background/sky.png";
// const backgroundImg1 = "./assets/img/background/rocks_1.png";
const character = new Character();
const bird = new Character();
const platformers = [
    new Platform(0, canvas.height - 60, 850, 60, platformImg),
    new Platform(850, canvas.height - 60, 900, 60, platformImg),
    new Platform(1845, canvas.height - 60, 1450, 60, platformImg),
    new Platform(3490, canvas.height - 60, 1450, 60, platformImg),
    new Platform(4935, canvas.height - 60, 1445, 60, platformImg),
    new Platform(6565, canvas.height - 60, 1450, 60, platformImg)
]
const backgrounds = [
    new Platform(300, 0, 1545, canvas.height, "./assets/img/background/Artboard_1.png"),
    new Platform(1845, 0, 1545, canvas.height, "./assets/img/background/Artboard_2.png"),
    new Platform(3390, 0, 1545, canvas.height, "./assets/img/background/Artboard_3.png"),
    new Platform(4930, 0, 1545, canvas.height, "./assets/img/background/Artboard_4.png"),
    new Platform(6475, 0, 1545, canvas.height, "./assets/img/background/Artboard_5.png"),
]
let isPressed = {
    left: false,
    right: false,
    up: false

}
let index = 0;
let birdIndex = 0;
// let move = ""
// addEventListener("wheel", ({ deltaY }) => {
//     if (deltaY >= 0) {
//         console.log(deltaY);
//         isPressed.right = true;
//     }
//     else if(deltaY == -100){
//         console.log(deltaY);
//         isPressed.left = true;
//     }
// })
addEventListener("keydown", ({ key }) => {
    switch (key) {
        case "ArrowUp":
            isPressed.up = true;
            character.velocity.y = -10;
            break;
        case "ArrowLeft":
            isPressed.left = true;
            break;
        case "ArrowRight":
            isPressed.right = true;
            break;
    }
})
addEventListener("keyup", ({ key }) => {
    switch (key) {
        case "ArrowUp":
            isPressed.up = false;
            break;
        case "ArrowLeft":
            isPressed.left = false;
            break;
        case "ArrowRight":
            isPressed.right = false;
            break;
    }
})

const form = document.querySelector("#form")

function moveCharacter() {
    if (index < 12 && isPressed.left == false) {
        character.image = imageCreator(runRightPng[index])
    }
    else if (index < 12 && isPressed.right == false) {
        character.image = imageCreator(runLeftPng[index])
    }
    else {
        index = 0;
    }
    if (birdIndex < 11 && isPressed.left == false) {
        bird.image = imageCreator(fly[birdIndex])
        bird.position.x = character.position.x - 250;
        bird.position.y = character.position.y - 200;
        bird.gravity = 0;
    }
    else if(birdIndex < 11 && isPressed.right == false){
        bird.image = imageCreator(flyReverse[birdIndex])
        bird.position.x = character.position.x - 250;
        bird.position.y = character.position.y - 200;
        bird.gravity = 0;
    }
    else {
        birdIndex = 0;
    }
}

function animate() {

    requestAnimationFrame(animate);
    index++;
    birdIndex++;
    if (character.position.y + character.aspect.height + character.velocity.y <= canvas.height) {
        c.fillStyle = "#282E37";
        c.fillRect(0, 0, canvas.width, canvas.height);
    }
    ////// MOVE THE CHARACTER TO RIGHT AUTOMATICALLY 
    if (isPressed.right == true && character.position.x + character.aspect.width < canvas.width / 2) {
        character.velocity.x = 4;
    }
    else if (isPressed.left == true) {
        character.velocity.x = -4;
    }
    else {
        character.velocity.x = 0;

    }
    moveCharacter();

    backgrounds.forEach(background => {
        if (isPressed.right == true) {
            if (character.position.x >= platformers[5].position.x + (platformers[5].aspect.width / 2) - 75) {
                background.position.x -= 0;
            }
            else {
                background.position.x -= 4;
            }
        }
        else if (isPressed.left == true) {
            background.position.x += 4;
        }
        background.render();
    });;
    ///// MOVE THE PLATFORM TO LEFT AUTOMATICALLY
    platformers.forEach((platformer, platformnum, platform) => {
        if (
            character.position.y + character.aspect.height < platformer.position.y &&
            character.position.y + character.aspect.height + character.velocity.y > platformer.position.y &&
            character.position.x + character.aspect.width > platformer.position.x &&
            character.position.x < platformer.position.x + platformer.aspect.width
        ) {
            character.velocity.y = 0;
        }
        // AUTOJUMP
        // if ((platformer.position.x + platformer.aspect.width - 20 <= character.position.x) && (platform[platformnum + 1].position.x >= character.position.x + character.aspect.width)) {
        //     character.velocity.y = -5;
        // }
        if (character.position.x >= platform[5].position.x + (platform[5].aspect.width / 2) - 75) {
            platformer.position.x -= 0;
            character.velocity.x = 0;
            birdIndex = 0;
            index = 0;
            form.style.visibility = "visible";

        }
        else if (isPressed.right == true) {
            platformer.position.x -= 4
            form.style.visibility = "hidden";
        }
        else if (isPressed.left == true) {
            platformer.position.x += 4
        }
        platformer.render();
    });
    character.update();
    bird.update();
}

animate();
