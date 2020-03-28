// 1.Create grid
// 2.Place players randomly on the board
// 3.
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
}

// places players randomly 
function placePlayers(player) {
	let coordinates = {
		row: this.randomNum(),
		column: this.randomNum()
	};
	// occupied by barrier
	let isTaken = $(`[data-row="${coordinates.row}"][data-column="${coordinates.column}"]`).hasClass("barrier");
	// occupied by player
	let isAlsoTaken = $(`[data-row="${coordinates.row}"][data-column="${coordinates.column}"]`).hasClass("playerTaken");
	if (isTaken) {
		return this.placePlayers(player);
	} else if (isAlsoTaken) {
		return this.placePlayers(player);
	} else {
		$(`[data-row="${coordinates.row}"][data-column="${coordinates.column}"]`).addClass(player.playerName).addClass("taken");
		player.playerPos = coordinates;
		placeImg(player.playerImage, player.playerPos);
	}
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

let knight = new Player ("knight",knightImg,100,{row:0,column:0});
let dragon = new Player ("dragon",dragonImg,100,{row:8,column:8});

let player = (knight,dragon);

// barriers
class Barrier {
	constructor(image,position) {
		this.barrierImage = image;
		this.barrierPos = position;
	}
}

// wall
let wallImg = document.createElement("img");
wallImg.src = 'assets/img/wall.png';
wallImg.id = 'wall';
wallImg.className = 'wall1';

let wall = new Barrier(wallImg, {row:0,column:0});
// let tree = new Barrier();
let barrier = (wall)
// create barriers and place them at random squares
function createBarrier(barrier) {
	let coordinates = {
		row: this.randomNum(),
		column: this.randomNum()
	};
	let hasBarrier = $(`[data-row="${coordinates.row}"][data-column="${coordinates.column}"]`).hasClass("barrier");
	if (hasBarrier) {
		return this.createBarrier(barrier);
	} else {
		$(`[data-row="${coordinates.row}"][data-column="${coordinates.column}"]`).addClass("barrier taken");
	}
}

function placeBarriers() {
	for(let i = 0; i < 12; i++) {
		this.createBarrier();
	}
}

// weapons
class Weapon {
	constructor(name,damage,image) {
		this.name = name;
		this.damage = damage;
		this.image = image;
	}
}
// sword
let swordImg = document.createElement("img");
swordImg.src = 'assets/img/sword.png';
swordImg.id = 'sword';
swordImg.className = 'weapon1'

// fire
let fireImg = document.createElement("img");
fireImg.src = 'assets/img/fire.png';
fireImg.id = 'fire';
fireImg.className = 'weapon2'

let sword = new Weapon ("sword",10,swordImg);
let fire = new Weapon ("fire",10,fireImg);

let weapon = (sword,fire);

function placeWeapons () {
	for(let i = 0; i < 12; i++) {
		this.createWeapon();
	}
}

function createWeapon(weapon) {
	let coordinates = {
		row: this.randomNum(),
		column: this.randomNum()
	};
	let hasWeapon = $(`[data-row="${coordinates.row}"][data-column="${coordinates.column}"]`).hasClass("weapon");
	if (hasWeapon) {
		return this.createWeapon(weapon);
	} else {
		$(`[data-row="${coordinates.row}"][data-column="${coordinates.column}"]`).addClass("weapon occupied");
	}
}

let activePlayer = knight;

function moveTo (newPosition) {
	// let coordinates = {
	// 	row: this.randomNum(),
	// 	column: this.randomNum()
	// };
	// let lastPosition = coordinates;
	// lastPosition = Object.assign({}, coordinates);
	// coordinates = newPosition;
	// set active player position to new position(param)
	$(`[data-row="${newPosition.row}"][data-column="${newPosition.column}"]`).addClass(activePlayer.playerName).addClass("taken");
	console.log(activePlayer.playerPos)
	console.log(newPosition);
	placeImg(activePlayer.playerImage, newPosition);
	activePlayer.playerPos = newPosition;

}
function movePlayer(event){
		const element = event.target;
		console.log(element);
		const newPosition = {
			column: (element.dataset.column),
          	row: (element.dataset.row)
		}
		console.log(newPosition)
		moveTo(newPosition);
}
function highlightBox(){
	
}
// Showing available movement fields on a game board for active player
function showMovementField(){
//add css class classList.add ("highlight")
}
$(window).on("load", function() {
		document.getElementById("newGameBtn").addEventListener("click", function() {
				createGrid();
					$('.grid-item').click(function(e) {
						console.log('click');
						movePlayer(e)
					})
				placePlayers(knight);
				placePlayers(dragon);
				placeBarriers(wall);
				placeWeapons(sword);
				placeWeapons(fire);
				console.log(barrier);
				console.log(weapon);
				console.log(player)
		});     
});

