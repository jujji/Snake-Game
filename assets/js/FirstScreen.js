var Menu = {

    preload : function() {
        // Loading the image of the First screen
        game.load.image('FirstScreen', './assets/images/FirstScreen.png');
    },

    create: function () {
        this.add.button(0, 0, 'FirstScreen', this.startGame, this);
    },

    startGame: function () {
        // Starting the game
        this.state.start('Game');

    }
};