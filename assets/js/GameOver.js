var Game_Over = {

    preload : function() {
        // Loading the image of the gameover
        game.load.image('gameover', './assets/images/gameover.png');
    },
	
    create : function() {

        this.add.button(0, 0, 'gameover', this.startGame, this);

        // Adding last score text
        game.add.text(235, 350, "LAST SCORE:", { font: "bold 16px sans-serif", fill: "#c29979", align: "center"});
        game.add.text(350, 348, score.toString(), { font: "bold 20px sans-serif", fill: "#f3d9b1", align: "center" });

    },
	
    startGame: function () {
        this.state.start('Game');
    }

};