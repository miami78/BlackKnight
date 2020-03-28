(function() {
// Random number function
game.prototype.randomNum = function() {
	return Math.floor(Math.random() * (11 - 1) + 1);
}
// Function to get cell position
function getPosition(colPosition, rowPosition) {
    return document.querySelectorAll(
        `div[data-col="${colPosition}"][data-row="${rowPosition}"]`,
        )[0];
}
const DEFAULT_POSITION = {col: 0,row: 0,}

function Player(name,weapon) {
    this.name = name;
    this.weapon = game.DEFAULT_WEAPON[weapon];
    this.position = DEFAULT_POSITION;
    this.lastPosition = DEFAULT_POSITION;
}
// Function to place game setup
function game() {
    this.gridContainer = document.getElementById('grid-container');
    this.player1 = null;
    this.player2 = null;
    this.barriers = [];
    this.weapons = game.WEAPONS;
    this.activePlayer = 'player1';
    
    const self = this;
}
const DEFAULT_WEAPON = 'sword';
game.WEAPONS = {
    sword: {
        position: null,
        damage: 5
    },
    fire: {
        position: null,
        damage: 5
    }
};

game.prototype.createPlayer1 = function() {
    return new Player('player1', DEFAULT_WEAPON);
};

game.prototype.createPlayer2 = function() {
    return new Player('player2', DEFAULT_WEAPON);
};
// Function to draw the grid
game.prototype.createGrid = function() {
    let cells = '';
    for(let row = 1; row < 11; row++){                
		for(let col = 1; col < 11; col++){    
			cells += `<div class='grid-item' data-col=${col} data-row=${row} ></div>`;
		}
    }
    this.gridContainer.innerHTML = cells;
};

game.prototype.isPositionAvailable = function(coordinates,callBack) {
    const cell =  getPosition(coordinates.row, coordinates.col);
    if(cell.classList.contains('taken')){
        alert('position taken');
        callBack && callBack();
        return false;
    }
    return false;
}

game.prototype.putClass = function(coordinates,newClass,available) {
    const cell = getPosition(coordinates.row, coordinates.col);
    cell.classList.add(newClass);
    !available && cell.classList.add('taken');
};

game.prototype.placeBarrier = function() {
    let coordinates = {
        row: this.randomNum(),
        col: this.randomNum()
    };
    const self = this;
    const available = this.isPositionAvailable(coordinates, function() {
        self.placeBarrier();
    });
    if(available) {
        this.barriers.push(coordinates);
        this.putClass(coordinates, 'barrier');
    }
};
// Loop to place barriers
game.prototype.createBarrier = function(){
    for (let i = 0; i < 12; i++) {
        this.placeBarrier([i]);
    }
}
game.prototype.placeWeapon = function(weapon) {
    let coordinates = {
        row: this.randomNum(),
        col: this.randomNum()
    };
    const self = this;
    const available = this.isPositionAvailable(coordinates, function() {
        self.placeWeapon(weapon);
    });
    if(available) {
        this.weapons[weapon].coordinates = coordinates;
        this.putClass(coordinates, weapon, true)
    }
}

game.prototype.placePlayer = function (player) {
    let coordinates = {
        row: this.randomNum(),
        col: this.randomNum()
    };
    const self = this;
    const available = this.isPositionAvailable(coordinates, function() {
        this.placePlayer(player);
    });
    if(available) {
        this.putClass(coordinates, player.name);
    }
};

game.prototype.gameSetup = function() {
    this.barriers = [];
    this.createGrid();
    this.createBarrier();
    this.player1 = this.createPlayer1();
    this.placePlayer(this.player1);
    this.player2 = this.createPlayer2();
    this.placePlayer(this.player2);
    this.placeWeapon('sword');
    this.placeWeapon('fire');
};

const newGame = new game();
newGame.gameSetup();
})();
