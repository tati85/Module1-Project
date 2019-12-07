// window.onload = function() {
//     document.getElementById("start-button").onclick = function() {
//         startGame();
//     };

//     function startGame() {
//         const myGame = new Game();
//         myGame.init();



//     }
// };
window.addEventListener("load", () => {
    const myGame = new Game();
    //   console.log("what: ", game);
    myGame.init();
});