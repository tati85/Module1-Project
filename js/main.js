let canvasWidth;
let canvasHeight;
var sound = document.getElementById("sound1");




window.addEventListener("load", () => {
    console.log("load");
    sound = document.getElementById("sound1");
    sound.play();


    function startGame() {
        const myGame = new Game();

        myGame.init();
    }
    startGame();
});