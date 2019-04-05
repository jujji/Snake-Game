var snake, food, squareSide, score, speed,
    moveDelay, direction, new_direction,
    addNew, cursors, scoreText, speedText, 
    textStyleLeft, textStyleRight;
	
var Game = {

    preload : function() {
		
		//Loading our images and json
        game.load.image('snake', './assets/images/snake.png');
        game.load.image('food', './assets/images/food.png');
		//game.load.json('green', 'config.json');
    },

    create : function() {

        snake = [];
        food = {};
		score = 0;
        speed = 0;
        squareSide = 15;
        moveDelay = 0;
        direction = 'right';
        new_direction = null;
        addNew = false;

        cursors = game.input.keyboard.createCursorKeys();


		//game.stage.backgroundColor = game.cache.getJSON('green');
        game.stage.backgroundColor = '#a8c256';
		
		//Adding Score and Speed at the screen
		textStyleLeft = { font: "bold 16px sans-serif", fill: "#c33149", align: "center" };
        textStyleRight = { font: "bold 20px sans-serif", fill: "#000", align: "center" };
		
        game.add.text(30, 20, "Score", textStyleLeft);
        scoreText = game.add.text(90, 18, score.toString(), textStyleRight);
		
        game.add.text(500, 20, "Speed", textStyleLeft);
        speedText = game.add.text(558, 18, speed.toString(), textStyleRight);


        // The snake will be 6 squares long and will begin at X = 150 and Y = 150
        for(var i = 0; i < 6; i++){
            snake[i] = game.add.sprite(150+i*squareSide, 150, 'snake');
        }

		//The first food
        this.generatefood();

    },

	generatefood: function(){
        var randomX = Math.floor(Math.random() * 40 ) * squareSide,
            randomY = Math.floor(Math.random() * 30 ) * squareSide;

        // Add a new food.
        food = game.add.sprite(randomX, randomY, 'food');
    },

update: function() {
	
	//Handle the key presses
    if (cursors.right.isDown && direction!='left')
    {
        new_direction = 'right';
    }
    else if (cursors.left.isDown && direction!='right')
    {
        new_direction = 'left';
    }
    else if (cursors.up.isDown && direction!='down')
    {
        new_direction = 'up';
    }
    else if (cursors.down.isDown && direction!='up')
    {
        new_direction = 'down';
    }

    // Maximum 10 of a speed
    speed = Math.min(10, Math.floor(score/5));
	
    //Speed value on the screen
    speedText.text = '' + speed;

    moveDelay++;

    if (moveDelay % (10 - speed) == 0) {

        //Here is the snake movement, we are removing the last cell (first element of the array) and add it as first cell (last element of the array)

		var firstCell = snake[snake.length - 1],
        lastCell = snake.shift(),
        oldLastCellx = lastCell.x,
        oldLastCelly = lastCell.y;
			
        if(new_direction){
            direction = new_direction;
            new_direction = null;
        }

        
        if(direction == 'right'){

            lastCell.x = firstCell.x + 15;
            lastCell.y = firstCell.y;
        }
        else if(direction == 'left'){
            lastCell.x = firstCell.x - 15;
            lastCell.y = firstCell.y;
        }
        else if(direction == 'up'){
            lastCell.x = firstCell.x;
            lastCell.y = firstCell.y - 15;
        }
        else if(direction == 'down'){
            lastCell.x = firstCell.x;
            lastCell.y = firstCell.y + 15;
        }
        snake.push(lastCell);
		console.log(typeof snake)
        firstCell = lastCell;
		
		if(addNew){
            snake.unshift(game.add.sprite(oldLastCellx, oldLastCelly, 'snake'));
            addNew = false;
        }
		
		//Checking the collision after the movement
        this.foodCollision();
        this.selfCollision(firstCell);
        this.wallCollision(firstCell);
    }

},

    // Checking if the snake is overlapping the food
	foodCollision: function() {
    for(var i = 0; i < snake.length; i++){
        if(snake[i].x == food.x && snake[i].y == food.y){
            addNew = true;
            food.destroy();
            this.generatefood();
			
			//Show current score to the screen
            score++;
            scoreText.text = score.toString();

        }
    }

},
    // Checking if the head is overlapping the body of the snake
	selfCollision: function(head) {
    for(var i = 0; i < snake.length - 1; i++){
        if(head.x == snake[i].x && head.y == snake[i].y){
            game.state.start('Game_Over');
        }
    }

},
    // Checking if the head is touching the wall
	wallCollision: function(head) {
    if(head.x >= 600 || head.x < 0 || head.y >= 450 || head.y < 0){
        game.state.start('Game_Over');
    }
}

};