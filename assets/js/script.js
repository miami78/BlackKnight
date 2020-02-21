// game Setup
class Game {
	constructor(gameContainer) {
		this.availableCells = [];
		this.unavailableCells = [];
		this.gameContainerElement = gameContainer;
		this.gameGridElement = this.gameContainerElement.querySelector('.grid');
	}
	init(){
		const GRID_SIZE = 10;
		const PLAYERS = [
			{
				name: 'Knight',
				className: 'player1',
				health: 100,
				attack: 10
			},
			{
				name: 'Dragon',
				className: 'player2',
				health: 100,
				attack: 10

			}
		];
	// Grid
	new Grid(this.gameGridElement,GRID_SIZE, this);
	// Player
	new Player(GRID_SIZE,PLAYERS[0], this);
	new Player(GRID_SIZE,PLAYERS[1], this);
	// Engine
	new Engine(PLAYERS,this)
	}
}
// // players
// class Player {
//     constructor(type,weapon,health,position)	{
// 		this.playerType = type,
// 		this.playerWeapon = weapon,
// 		this.health = health,
// 		this.playerPos = position
// 	}
// } 

// let knight = new Player ("knight","<img src='assets/img/player1.png' id='knight' class='player1' alt='Knight'>",100, {col:0,row:0})
// let dragon = new Player ("dragon","<img src='../img/player2.png' id='dragon' class='player2' alt='Dragon'>",100, {col:8,row:8})


// weapons

// class Weapon {
// 	constructor(name,damage,image) {
// 		this.name = name;
// 		this.damage = damage;
// 		this.image = image;
// 	}
// }
// let sword = new Weapon ("sword","<img src='../img/weapon1.png' id='sword' class='weapon' alt='Sword");
// let fire = new Weapon ("fire","<img src='../img/weapon2.png' id='fire' class='weapon' alt='Fire");

// obstacles

let wall = "";
let tree = "";

// Random number function
function randomNum() {
	return Math.floor(Math.random() * (11 -1) + 1);
}

class Grid {
	constructor(container, size, game) {
	  this.gridContainer = container;
	  this.gridSize = size;
	  this.game = game;
	  this.createGrid();
	}
// Creates the grid
createGrid() {
	for(let rows = 0; rows < this.size; rows++){                
		for(let columns = 1; columns < this.size; columns++){    
			this.gridContainer.appendChild(this.generateGrid(rows,columns));
			this.game.availableCells.push([rows, columns])
			// $('.grid-container').append('<div class= "grid-item"</div>')
		}
	}
}
generateGrid(rows, columns) {
	const gridItem = document.createElement('div');
	gridItem.classList.add('grid-item');
	gridItem.classList.add(`cell_${rows}_${columns}`);
	gridItem.setAttribute('data-rows', rows);
	gridItem.setAttribute('data-columns', columns);
	return gridItem;
}
}
let game = new Game(document.querySelector('#game'));
game.init();
// // places players randomly 
// function placePlayers(player) {
// 	let coordinates = {
// 		x: this.randomNum(),
// 		y: this.randomNum()
// 	};
// 	player.playerPos = coordinates;
// }

// // create barriers at random squares
// function createBarrier() {
// 	let coordinates = {
// 		x: this.randomNum(),
// 		y: this.randomNum()
// 	};
// }

// function placeImg (image, position){
// 	// take position 
// 	// use line 52 as reference, what is position 'data type'
// 	$('[data-x=1][data-y=1]').append(image)
// }

// let activePlayer = knight;
// placeImg(knight.playerWeapon, knight.playerPos);




