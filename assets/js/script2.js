(function() {
// Random number function
const randomNum = function() {
	return Math.floor(Math.random() * (10 - 1) + 1);
}
// Function to get cell position
function getPosition(colPosition, rowPosition) {
    return $(`div[data-col="${colPosition}"][data-row="${rowPosition}"]`)[0];
}

// Game object constructor
function game() {
    this.gridContainer = document.getElementById('grid-container');
    this.player1 = null;
    this.player2 = null;
    this.barriers = [];
    this.weapons = game.WEAPONS;
    this.activePlayer = 'player1';
    
    const self = this;

    $(this.gridContainer).click(function(e) {
        const element = e.target;
        const newPossiblePosition = {
          col: Number(element.dataset.col),
          row: Number(element.dataset.row),
        };
        self.tryMoveActivePlayer(newPossiblePosition);
        self.showMoves(newPossiblePosition);
      });
}

const DEFAULT_WEAPON = 'sword';
game.WEAPONS = {
    sword: {
        key: 'sword',
        position: null,
        damage: 5
    },
    fire: {
        key: 'fire',
        position: null,
        damage: 5
    }
};
// https://www.w3schools.com/js/js_object_prototypes.asp
// Prototypes are the mechanism by which JavaScript objects inherit features from one another. 
// The JavaScript prototype property allows you to add new properties to object constructors,
// it also allows you to add new methods to objects constructors.

// Function to create player
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

// Player constructor
function Player(name, weapon) {
    this.name = name;
    this.weapon = game.WEAPONS[weapon];
    this.position = {col: 1,row: 1};
    this.health = 100;
    this.active = false;
}
// Get players position
Player.prototype.getPosition = function() {
    return getPosition(this.position.col, this.position.row);
};
// Checks if position is available
game.prototype.isPositionAvailable = function(position,callBack) {
    const cell =  getPosition(position.col, position.row);
    if(cell.classList.contains('taken')){
        console.log('position taken');
        callBack && callBack();
        return false;
    }
    return true;
};
// Puts a new class if cell is available
game.prototype.putClass = function(position,newClass,available) {
    const cell = getPosition(position.col, position.row);
    cell.classList.add(newClass);
    !available && cell.classList.add('taken');
};

game.prototype.removeClass = function(position, classToRemove) {
    const cell = getPosition(position.col, position.row);
    cell.classList.remove(classToRemove);
    cell.classList.remove('taken');
};
// Place barriers
game.prototype.placeBarrier = function() {
    const colPosition = randomNum();
    const rowPosition = randomNum();
    const position = {
      col: colPosition,
      row: rowPosition,
    };
    const self = this;
    const available = this.isPositionAvailable(position, function() {
        self.placeBarrier();
    });
    if(available) {
        this.barriers.push(position);
        this.putClass(position, 'barrier');
    }
};

// game.prototype.hasBarriers = function(oldPosition, newPosition) {
//     const direction = newPosition.col == oldPosition.col ? 'row' : 'col';
//     const
// }
game.prototype.placeWeapon = function(weapon) {
    const colPosition = randomNum();
    const rowPosition = randomNum();
    const position = {
      col: colPosition,
      row: rowPosition,
    };
    const self = this;

    const available = this.isPositionAvailable(position, function() {
        self.placeWeapon(weapon);
    });
    if(available) {
        this.weapons[weapon].position = position;
        this.putClass(position, weapon, true)
    }
}

game.prototype.placePlayer = function (player) {
    const colPosition = randomNum();
    const rowPosition = randomNum();
    const position = {
      col: colPosition,
      row: rowPosition,
    };
    const me = this;
    const available = this.isPositionAvailable(position, function() {
        me.placePlayer(player);
    });
    if(available) {
        this.putClass(position, player.name);
        player.moveTo (position, true);
    }
};
// Moves player to new position
Player.prototype.moveTo = function(newPosition) {
    this.lastPosition = Object.assign({}, this.position);
    this.position = newPosition;
};

game.prototype.movePlayer = function(player, newPosition) {
    console.log(player)
    this.removeClass(player.position, player.name);
    this.putClass(newPosition, player.name);
    player.moveTo(newPosition)
    console.log(newPosition)
}

// checks if player can move within 3 spaces
Player.prototype.canMoveTo = function(newPossiblePosition,callBack){
    const direction = newPossiblePosition.col === this.position.col ? 'row' : 'col';
    const differentCol = Math.abs(this.position.col - newPossiblePosition.col);
    const differentRow = Math.abs(this.position.row - newPossiblePosition.row);

    const validColPosition = direction === 'col' && differentCol <= 3 && differentRow === 0;
    const validRowPosition = direction === 'row' && differentRow <= 3 && differentCol === 0;

    const canMove = validColPosition || validRowPosition;
    canMove && callBack && callBack();
    return canMove;
}

game.prototype.tryMovePlayer = function(player, newPossiblePosition) {
    const self = this;
    player.canMoveTo(newPossiblePosition, function() {
      if (
        self.isPositionAvailable(newPossiblePosition) //&&
        // !self.hasBarriers(player.position, newPossiblePosition)
      ) {
        self.movePlayer(player, newPossiblePosition);
      }
    });
  };

game.prototype.tryMoveActivePlayer = function (newPossiblePosition){
    this.tryMovePlayer(this[this.activePlayer], newPossiblePosition);
};
// highlight function 
game.prototype.showMoves = function(position,player){
    console.log(position)
    const cell = player.canMoveTo(position.validColPosition, position.validRowPosition);
    cell.classList.add('highlight');
}

game.prototype.gameSetup = function() {
    this.barriers = [];
    this.weapons = game.WEAPONS;
    this.activePlayer = 'player1';
    this.createGrid();
    for (let i = 0; i < 13; i++) {
        this.placeBarrier([i]);
      }
    this.player1 = this.createPlayer1();
    this.player1.activePlayer = true;
    this.placePlayer(this.player1);
    this.player2 = this.createPlayer2();
    this.placePlayer(this.player2);
    this.placeWeapon('sword');
    this.placeWeapon('fire');
    console.log(this.player1)
    console.log(this.barriers)
    console.log(this.weapons)
};

$(window).on("load", function() {
    document.getElementById("newGameBtn").addEventListener("click", function() {
        const newGame = new game();
        newGame.gameSetup();
    });     
});
})();
