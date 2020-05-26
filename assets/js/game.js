// Random number function
const randomNum = function() {
    return Math.floor(Math.random() * (10 - 1) + 1);
};

// Function to get cell position
function getPosition(colPosition, rowPosition) {
    return $(`div[data-col="${colPosition}"][data-row="${rowPosition}"]`)[0];
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
    
// Function to create player
game.prototype.createPlayer1 = function() {
    return new Player('player1', DEFAULT_WEAPON);
};
game.prototype.createPlayer2 = function() {
    return new Player('player2', DEFAULT_WEAPON);
};


// Game object constructor
export default function game() {
    this.gridContainer = document.getElementById('grid-container');
    this.player1 = null;
    this.player2 = null;
    this.barriers = [];
    this.weapons = game.WEAPONS;
    this.activePlayer = 'player1';
    this.defending = false;
    
    const self = this;

    $(this.gridContainer).click(function(e) {
        const element = e.target;
        const newPossiblePosition = {
            col: Number(element.dataset.col),
            row: Number(element.dataset.row),
        };
        self.tryMoveActivePlayer(newPossiblePosition);
        self.tryFight();
        });
}


game.prototype.gameSetup = function() {
    this.barriers = [];
    this.weapons = game.WEAPONS;
    this.activePlayer = 'player1';

    this.createGrid();
    // loop that creates barriers
    for (let i = 0; i < 13; i++) {
        this.placeBarrier([i]);
    }

    this.player1 = this.createPlayer1();
    this.player1.activePlayer = true;
    this.placePlayer(this.player1);

    this.showAllMoves(this.player1.position);
    this.player2 = this.createPlayer2();
    this.placePlayer(this.player2);

    if (this.isReadyToFight()) {
        this.gameSetup();
        return;
    }
    this.placeWeapon('sword');
    this.placeWeapon('fire');
    this.getPlayerStats()
    console.log(this.player1);
    console.log(this.barriers);
    console.log(this.weapons);  
};

$(window).on("load", function() {
    document.getElementById("newGameBtn").addEventListener("click", function() {
        const newGame = new game();
        newGame.gameSetup();
    });     
});
