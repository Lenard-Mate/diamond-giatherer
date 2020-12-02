const playerLogic = function () {

    this.x = 80;
    this.y = 127;
    this.dx = 0;
    this.dy = 0;
    this.imageId = '';
    this.direction = 'down';
    this.imageStartPoints = {
        right: [193, 225],
        left: [131, 161],
        down: [65, 98],
        up: [0, 33],

    };



    return this;
}

module.exports = {
    playerLogic
}