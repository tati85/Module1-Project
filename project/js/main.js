var spriteData;

$(document).ready(function() {
    // $.getJSON('images/texture.json', function(sprite) {

    //     window.spriteData = JSON.parse(sprite);
    // });
    spriteData = (function() {
        var json = null;
        $.ajax({
            'async': false,
            'global': false,
            'url': 'images/texture.json',
            'dataType': "json",
            'success': function(data) {
                json = data;
            }
        });
        return json;
    })();


    window.addEventListener("load", () => {
        const myGame = new Game();
        console.log(window.spriteData)

        myGame.init();
    });
});