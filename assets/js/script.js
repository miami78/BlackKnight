// game Setup

// players
let knight = {
	playerType: "knight",
	playerImage: "<img src='../img/player1.png' id='knight' class='player' alt='Knight'>",
	health: 100,
	playerPos: {
		col: 0,
		row: 0
	}
}

let dragon = {
	playerType: "dragon",
	playerImage: "<img src='../img/player2.png' id='dragon' class='player' alt='Dragon'>",
	health: 100,
	playerPos: {
		col: 0,
		row: 0
	}
}

// weapons

let sword = "<img src='../img/weapon1.png' id='sword' class='weapon' alt='Sword";
let fire = "<img src='../img/weapon2.png' id='fire' class='weapon' alt='Fire";

// obstacles

let wall = "";
let tree = "";

// Random number function
function randomNum() {
	return Math.floor(Math.random() * (11 -1) + 1);
}

// Creates the grid
function createGrid() {
	for(let x = 1; x < 11; x++){                //rows
		for(let y = 1; y < 11; y++){            //columns
			$('.grid-container').append('<div class= "grid-item" data-x="'+x+'" data-y="'+y+'"></div>')
		}
	}
}
createGrid();

// places players randomly 



