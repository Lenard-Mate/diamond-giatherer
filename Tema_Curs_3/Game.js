const gameLogic = function (options) {
    this.id = options.id
    this.players = options.players
    return this;
}


module.exports = {
    gameLogic
}