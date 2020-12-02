const canvas = document.getElementById("canvasId");
/** @type {CanvasRenderingContext2D} */
const context = canvas.getContext('2d');


const mario = new Image();
mario.src = 'assets/mario.png';
const MARIO_WIDTH = 32;
const MARIO_HEIGHT = 39;
let marioX = 0;
let marioY = 0;
mario.onload = () => {
    context.drawImage(mario, 0 * MARIO_WIDTH, 0 * MARIO_HEIGHT, MARIO_WIDTH, MARIO_HEIGHT, 0, 0, MARIO_WIDTH, MARIO_HEIGHT)
}




document.addEventListener("keydown", function (event) {
    context.clearRect(0, 0, 600, 400);

    var direciot = 0;

    switch (event.key) {
        case 'ArrowUp': {
            marioY -= 10;
            direciot = 4;
            break;
        }
        case 'ArrowDown': {
            marioY += 10;
            direciot = 0;
            break;
        }
        case 'ArrowLeft': {
            marioX -= 10;
            direciot = 2;
            break;
        }
        case 'ArrowRight': {
            marioX += 10;
            direciot = 2;
            break;
        }
    }



    // Conditions for the player to stay on the canvas

    if (canvas.width - 23 > marioX) {
        if (0 > marioX) {
            marioX = 0;
        }
    } else {
        marioX = canvas.width - 23;
    }

    if (canvas.height - 32 > marioY) {

        if (0 < marioY) {

        } else {

            marioY = 0;

        }
    } else {

        marioY = canvas.height - 32;

    }
    context.drawImage(mario, 0 * MARIO_WIDTH, direciot * MARIO_HEIGHT, MARIO_WIDTH, MARIO_HEIGHT, marioX, marioY, MARIO_WIDTH, MARIO_HEIGHT);
});




let counterAux = 0;
const socket = io();
document.getElementById('join-chat-button').addEventListener('click', function () {

    const input = document.getElementById('user-name');
    const userName = input.value;


    if (userName.length > 0) {
        document.getElementById('user-name-is-missing').classList.add('display-none');
        socket.emit('join-chat', userName);
    } else {
        document.getElementById('user-name-is-missing').classList.remove('display-none');
    }

})

document.getElementById('send-message-button').addEventListener('click', function () {

    const input = document.getElementById('message');
    const message = input.value;
    document.getElementById('message').value = null;
    socket.emit('send-message', message);


})

socket.on('joined-chat', function () {

    document.getElementById('join-chat').classList.add('display-none');
    document.getElementById('chat-container').classList.remove('display-none');


})

socket.on('new-message', function (message) {
    const messageContainer = document.getElementById('caht-messages');
    const messageElement = document.createElement('p');
    let textToColorate = stringSeparator(message);

    messageElement.innerHTML = textToColorate[1] + stringToColorate(textToColorate[2]);
    messageContainer.appendChild(messageElement);
})


socket.on('onlineUserCounter', function (number) {


    document.getElementById("user-number").innerHTML = number;

})



socket.on('counter', function (counter) {

    counterAux = counter;

    document.getElementById("insertCounter").innerHTML = counter;

})


document.getElementById('button-counter').addEventListener('click', function () {

    socket.emit('counter-server', counterAux);

})

socket.on('disconnect', function () {
    io.emit('user disconnected');
});


function stringSeparator(message) {

    let tag = message.match(/^(\S+)\s(.+)$/);

    return tag;
}




function stringToColorate(message) {

    console.log(message);

    if (document.getElementById('red').checked == true) {
        return " <a style='color:red;'>" + message + "</a>"

    }

    if (document.getElementById('blue').checked == true) {
        return " <a style='color:blue;'>" + message + "</a>"

    }

    if (document.getElementById('green').checked == true) {

        return " <a style='color:green;'>" + message + "</a>"

    }




    return message;
}

document.getElementById('create-game-button').addEventListener('click', function () {

    const input = document.getElementById('game-name-input');
    const userName = input.value;


    if (userName.length > 0) {
        document.getElementById('game-name-missing').classList.add('display-none');
        socket.emit('create-game', userName);
    } else {
        document.getElementById('game-name-missing').classList.remove('display-none');
    }

})


socket.on('game-loop', function () {

    document.getElementById('game-container').classList.remove('display-none');
    console.log("merge");

})