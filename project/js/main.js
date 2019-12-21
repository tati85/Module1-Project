let canvasWidth;
let canvasHeight;
var sound = document.getElementById("sound1");
let asteroidsNumber = localStorage.getItem("asteroids") || 8;
console.log(localStorage.getItem("asteroids"), '>>>>')




window.addEventListener("load", () => {
    sound = document.getElementById("sound1");
    sound.play();
    console.log("load");


    function startGame() {
        const myGame = new Game();

        myGame.init();
    }
    startGame();
});