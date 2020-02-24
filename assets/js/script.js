// game Setup

// Creates the grid
function createGrid() {
	for(let row = 1; row < 11; row++){                
		for(let column = 1; column < 11; column++){    
				$('.grid-container').append('<div class= "grid-item" data-row="'+row+'" data-column="'+column+'"></div>')
		}
	}
}

// Random number function
function randomNum() {
	return Math.floor(Math.random() * (11 - 1) + 1);
}

function placeImg (image, position){
	// take position 
	// use line 52 as reference, what is position 'data type'
	$(`[data-row="${position.row}"][data-column="${position.column}"]`).append(image);
	// $(`[data-row="1"][data-column="1"]`).append(knightImg);
	console.log($(`[data-row="1"][data-column="1"]`))
}

// places players randomly 
function placePlayers(player) {
	let coordinates = {
		row: this.randomNum(),
		column: this.randomNum()
	};
	player.playerPos = coordinates;
	placeImg(player.playerImage, player.playerPos);
}

// create barriers at random squares
function createBarrier(barrier) {
	let coordinates = {
		row: this.randomNum(),
		column: this.randomNum()
	};
}

// players
class Player {
    constructor(name,image,health,position)	{
		this.playerName = name,
		this.playerImage = image,
		this.health = health,
		this.playerPos = position
	}
} 
//knight
let knightImg = document.createElement("img");
knightImg.src = 'assets/img/player1.png';
knightImg.id = 'knight';
knightImg.className = 'player1';
//dragon
let dragonImg = document.createElement("img");
dragonImg.src = 'assets/img/player2.png';
dragonImg.id = 'dragon';
dragonImg.className = 'player2';

let knight = new Player ("knight",knightImg,100)
let dragon = new Player ("dragon",dragonImg,100)

let allPlayers = (knight, dragon);

// weapons
class Weapon {
	constructor(name,damage,image) {
		this.name = name;
		this.damage = damage;
		this.image = image;
	}
}
let sword = new Weapon ("sword","<img src='../img/weapon1.png' id='sword' class='weapon' alt='Sword");
// let fire = new Weapon ("fire","<img src='../img/weapon2.png' id='fire' class='weapon' alt='Fire");

// barriers

let wall = "";
let tree = "";

createGrid();
placePlayers(allPlayers);

