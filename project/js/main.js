var spriteData;
var spriteAsteroids;
let canvasWidth;
let canvasHeight;
var sound = document.getElementById("sound1");

$(document).ready(function() {

    spriteData = (function() {
        let json = null;
        $.ajax({
            'async': false,
            'global': false,
            'url': '../images/redSS.json',
            'dataType': "json",
            'success': function(data) {
                json = data;
            }
        });
        return json;
    })();
    spriteAsteroids = (function() {
        let json1 = null;
        $.ajax({
            'async': false,
            'global': false,
            'url': 'images/asteroids/asteroids.json',
            'dataType': "json",
            'success': function(data) {
                json1 = data;
            }
        });
        return json1;
    })();


    window.addEventListener("load", () => {
        console.log("load");
        sound = document.getElementById("sound1");
        sound.play();
        const myGame = new Game();

        myGame.init();
    });
});