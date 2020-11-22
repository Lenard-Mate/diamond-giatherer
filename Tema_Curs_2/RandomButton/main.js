var c = document.getElementById("canvasId");
var ctx = c.getContext("2d");

document.getElementById("randomRectangle").addEventListener("click", function() {

    function randomR() {
        
        ctx.clearRect(0, 0, 600, 400);

        var x = Math.random() * 300;
        var y = Math.random() * 300;

        ctx.fillStyle = "#FF0000";
        ctx.fillRect(x, y, 150, 100);

    }

    randomR();

});