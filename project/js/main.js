var spriteData;
var spriteAsteroids;
let canvasWidth;
let canvasHeight;

$(document).ready(function() {

    spriteData = (function() {
        let json = null;
        $.ajax({
            'async': false,
            'global': false,
            'url': 'images/spaceShips/redSS.json',
            'dataType': "json",
            'success': function(data) {
                json = data;
            }
        });
        return json;
    })();
    spriteAsteroids = (function() {
        let json = null;
        $.ajax({
            'async': false,
            'global': false,
            'url': 'images/asteroids/asteroids.json',
            'dataType': "json",
            'success': function(data) {
                json = data;
            }
        });
        return json;
    })();


    window.addEventListener("load", () => {
        console.log("load")
        const myGame = new Game();
        myGame.init();
    });
});