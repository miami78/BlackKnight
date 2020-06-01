(function() {

    // Random number function
    const randomNum = function() {
        return Math.floor(Math.random() * (10 - 1) + 1);
    };
    
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
    
    const DEFAULT_WEAPON = 'sword';
    game.WEAPONS = {
        player1sword: {
            key: 'player1sword',
            position: null,
            damage: 10,
            img:"<img src= https://res.cloudinary.com/dfqr8gqss/image/upload/v1590586770/BlackKnight/sword_qz2ido.gif>"
        },
        player2sword: {
            key: 'player2sword',
            position: null,
            damage: 10,
            img:"<img src= https://res.cloudinary.com/dfqr8gqss/image/upload/v1590586770/BlackKnight/sword_qz2ido.gif>"
        },
        sword: {
            key: 'sword',
            position: null,
            damage: 10,
            img:"<img src= https://res.cloudinary.com/dfqr8gqss/image/upload/v1590586770/BlackKnight/sword_qz2ido.gif>"
        },
        fire: {
            key: 'fire',
            position: null,
            damage: 15,
            img:"<img src= https://res.cloudinary.com/dfqr8gqss/image/upload/v1590586765/BlackKnight/fire_hheehz.gif>"
        },
        magic: {
            key: "magic",
            position: null,
            damage: 20,
            img:"<img src= https://res.cloudinary.com/dfqr8gqss/image/upload/v1590586778/BlackKnight/magic_y0biuz.gif>"
        },
        staff: {
            key: "staff",
            position: null,
            damage: 25,
            img:"<img src= https://res.cloudinary.com/dfqr8gqss/image/upload/v1590586769/BlackKnight/staff_ushxa4.png>"
        }
    };
    
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
        this.placeWeapon('magic');
        this.placeWeapon('staff');
        this.getPlayerStats();
        console.log(this.player1);
        console.log(this.barriers);
        console.log(this.weapons);  
    };
    // https://www.w3schools.com/js/js_object_prototypes.asp
    // Prototypes are the mechanism by which JavaScript objects inherit features from one another. 
    // The JavaScript prototype property allows you to add new properties to object constructors,
    // it also allows you to add new methods to objects constructors.
    
    // Function to create player
    game.prototype.createPlayer1 = function() {
        return new Player('player1', 'player1sword');
    };
    game.prototype.createPlayer2 = function() {
        return new Player('player2', 'player2sword');
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
        this.lastPosition = {col: 1,row: 1};
        this.health = 100;
        this.inTurn = false;
        this.fighting = false;
        this.defending = false;
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
        console.log(newClass);
        const cell = getPosition(position.col, position.row);
        cell.classList.add(newClass);
        !available && cell.classList.add('taken');
    };
    
    game.prototype.putWeaponInfo = function(position) {
        const cell = getPosition(position.col, position.row);
        console.log(newClass + "is in this position")
        cell.classList.add('sword');
    };
    
    game.prototype.removeClass = function(position, classToRemove) {
        const cell = getPosition(position.col, position.row);
        console.log(cell);
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
            this.putClass(position, weapon, true);
            console.log(weapon)
        }
    };
    
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
            player.moveTo (position, true);
            this.putClass(position, player.name);
        }
    };
    
    game.prototype.hasBarriers = function(fromPosition, toPosition) {
        const direction = toPosition.col == fromPosition.col ? 'row' : 'col';
        const diff = direction === 'col'
          ? fromPosition.col - toPosition.col
          : fromPosition.row - toPosition.row;
    
        let col = direction === 'col' ? fromPosition.col - 1 : fromPosition.col;
        let row = direction === 'row' ? fromPosition.row - 1 : fromPosition.row;
    
        if (diff < 0) {
          col = direction === 'col' ? fromPosition.col + 1 : fromPosition.col;
          row = direction === 'row' ? fromPosition.row + 1 : fromPosition.row;
        }
    
        const fromPositionWay = { col: col, row: row };
    
        const cell = getPosition(fromPositionWay.col, fromPositionWay.row);
        if (!cell) {
          return false;
        }
        if (cell.classList.contains('barrier')) {
        console.log('barrier exists');
          return true;
        }
    
        if (Math.abs(diff) !== Math.abs(fromPosition[direction] - fromPositionWay[direction])) {
          return this.hasBarriers(fromPositionWay, toPosition);
        }
    
        return false;
    }
    // Moves player to new position
    Player.prototype.moveTo = function(newPosition) {
        console.log(newPosition);
        this.lastPosition = Object.assign({}, this.position);
        console.log(this.lastPosition);
        this.position = newPosition;
        
    };
    
    game.prototype.movePlayer = function(player, newPosition) {
        console.log(player);
        // Remove class player from old position
        this.removeClass(player.position, player.name);
        // Set new position and name of player to the new position cell
        this.putClass(newPosition, player.name);
    
        player.moveTo(newPosition);
        console.log(newPosition);
        this.switchWeapon(player);
        console.log(player.weapon);
        
    };
    
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
    };
    
    game.prototype.tryMovePlayer = function(player, newPossiblePosition) {
        const self = this;
        const cell = getPosition(newPossiblePosition.col, newPossiblePosition.row);
        player.canMoveTo(newPossiblePosition, function() {
            if (
              self.isPositionAvailable(newPossiblePosition) &&
              !self.hasBarriers(player.position, newPossiblePosition)
            ) 
            if (cell.classList.contains('highlight')) {
                console.log(self.activePlayer)
                self.movePlayer(player, newPossiblePosition);
                self.removeShowMove();
                
                self.switchActivePlayer();
                
                self.showAllMoves(self[self.activePlayer].position);
            }
        });
    
        
    };
      
    game.prototype.tryMoveActivePlayer = function (newPossiblePosition){
        this.tryMovePlayer(this[this.activePlayer], newPossiblePosition);
        console.log(this.activePlayer);
    };
    
    // highlight function 
    game.prototype.showMove = function(position){
        const cell = getPosition(position.col, position.row);
        cell.classList.add('highlight');
    };
    
    //Remove highlight function
    game.prototype.removeShowMove = function(){
        //store all cell from showallmoves or get all of the cells that are highligted
        // jquery get all elements with a certain class
        let AllHighlightedCells = document.getElementsByClassName("highlight");
    
        while (AllHighlightedCells[0]) {
            AllHighlightedCells[0].classList.remove("highlight")
        }
    };
    
    // shows possible moves north south west and east of players position
    game.prototype.showAllMoves = function(position){
        let newPosition = {
          col: position.col,
          row: position.row,
        };
        for (let i = 0; i < 3; i++) {
            // down
            newPosition.row += 1;
            const cell = getPosition(newPosition.col, newPosition.row);
            if (newPosition.row > 0 && newPosition.row < 11 && false === cell.classList.contains('barrier')){
                this.showMove(newPosition);
            } 
            else {
                break;
            }
        }
        newPosition.row = position.row;
    
        for (let i = 0; i < 3; i++) {
            // right
            newPosition.col += 1;
            const cell = getPosition(newPosition.col, newPosition.row);
            if (newPosition.col > 0 && newPosition.col < 11 && false === cell.classList.contains('barrier')){
                this.showMove(newPosition);
            } else {
                break;
            }
        }
        newPosition.col = position.col;
    
        for (let i = 0; i < 3; i++) {
            // up
            newPosition.row -= 1;
            const cell = getPosition(newPosition.col, newPosition.row);
            if (newPosition.row > 0 && newPosition.row < 11 && false === cell.classList.contains('barrier')){
                this.showMove(newPosition);
            } else {
                break;
            }
        }
        newPosition.row = position.row;
    
        for (let i = 0; i < 3; i++) {
            // left
            newPosition.col -= 1;
            const cell = getPosition(newPosition.col, newPosition.row);
            if (newPosition.col > 0 && newPosition.col < 11 && false === cell.classList.contains('barrier')){
                this.showMove(newPosition);
            } else {
                break;
            }
        }
        newPosition.col = position.col;
    };
    
    game.prototype.findWeaponByPosition = function(newPosition) {
        // change the parameter from a weapon to the new position,
        // inside the function check for each weapon class in that tile eg sword / fire
        return Object
        .values(this.weapons)
        .find(weapon => weapon.position && weapon.position.col === newPosition.col && weapon.position.row === newPosition.row);
    };
    
    game.prototype.switchWeapon = function(player) {
        const position = player.position;
        const newWeapon = this.findWeaponByPosition(position);
        if (newWeapon) {
            //put old weapon down
            this.weapons[player.weapon.key].position = position;
            this.putClass(position,player.weapon.key, true);
            this.getPlayerStats()
            //set new weapon
            this.weapons[newWeapon.key].position = null;
            this.removeClass(position, newWeapon.key);
            player.weapon = this.weapons[newWeapon.key];
            this.getPlayerStats()
        }
    }
    // make a helper function that returns a player whose turn it is
    game.prototype.switchActivePlayer = function() {
        // move turn to next player
        this.activePlayer = this.activePlayer === 'player1' ? 'player2' : 'player1';
        const passivePlayer = this.activePlayer === 'player1' ? 'player2' : 'player1';
    
        this[this.activePlayer].activePlayer = true;
        this[passivePlayer].activePlayer = false;
    
     
    }
    
    game.prototype.isReadyToFight = function() {
        // get player1 position
        const colPlayer1 = this.player1.position.col;
        const rowPlayer1 = this.player1.position.row;
        // get player2 position
        const colPlayer2 = this.player2.position.col;
        const rowPlayer2 = this.player2.position.row;
    
        const diffCol = Math.abs(colPlayer1 - colPlayer2);
        const diffRow = Math.abs(rowPlayer1 - rowPlayer2);
    
        //checks if players are close to each other 
        const colClose = diffCol === 1 && diffRow === 0;
        const rowClose = diffRow === 1 && diffCol === 0;
    
        if (colClose || rowClose) {
            let fightmode = document.querySelector('#fight')
            console.log(fightmode)
            fightmode.innerHTML = "FIGHT!"
            console.log("Player ready to fight")
    
            return true;
        }
        return false;
    };
    game.prototype.getPlayerStats = function() {
        // Knight stats
        let knightHealth = document.querySelector('#knightHealthInput');
        let knightAttack = document.querySelector('#knightAttackInput');
        let knightWeapon = document.querySelector('#knightWeaponPanel');
        
        knightHealth.innerHTML = this.player1.health;
        knightAttack.innerHTML = this.player1.weapon.damage;
        knightWeapon.innerHTML = this.player1.weapon.img;
        console.log(this.player1.weapon)
    
        // Dragon stats
        let dragonHealth = document.querySelector('#dragonHealthInput');
        let dragonAttack = document.querySelector('#dragonAttackInput');
        let dragonWeapon = document.querySelector('#dragonWeaponPanel');
        
        dragonHealth.innerHTML = this.player2.health;
        dragonAttack.innerHTML = this.player2.weapon.damage;
        dragonWeapon.innerHTML = this.player2.weapon.img;
    }; 

    game.prototype.enableFightButton = function () {
        const p1Attack = document.getElementById("P1Attack");
        const p2Attack = document.getElementById("P2Attack");
        const p1Defend = document.getElementById("P1Defend");
        const p2Defend = document.getElementById("P2Defend");
        console.log(p1Attack, p2Attack, p1Defend, p2Defend)
        const player = this[this.activePlayer];
        console.log(player)
        console.log(this.activePlayer)
        if(this.activePlayer == 'player1'){
            p1Attack.classList.remove('disabled')
            p1Defend.classList.remove('disabled')
            p2Attack.classList.add('disabled')
            p2Defend.classList.add('disabled')
        } else {
            p2Attack.classList.remove('disabled')
            p2Defend.classList.remove('disabled')
            p1Attack.classList.add('disabled')
            p1Defend.classList.add('disabled')
        }
    } 
    game.prototype.createActionButtonsEvents = function() {
        const $actions = Array.from(document.querySelectorAll(".action"));
        $actions.forEach(($action) => {
            $action.addEventListener("click", (e) => {
                const actionType = e.target.dataset.actiontype;
                console.log(actionType)
                console.log($actions)
                const player = e.target.dataset.playerkey;
                console.log(player)
                if (player != this.activePlayer)
                return window.alert(
                    `You can't perform an action because the active player is: ${this.activePlayer}`
                );
        
                switch (actionType) {
                case "attack":
                    this.performAction({ type: "attack" });
                    break;
                case "defense":
                    this.performAction({ type: "defense" });
                    break;
                default:
                    break;
                }

                if(this.player1.health > 0 && this.player2.health > 0){
                    //
                } else {
                    this.player2.health <= 0 &&
                        alert('PLAYER 1 WINS !!!');
                    this.player1.health <= 0 &&
                        alert('PLAYER 2 WINS !!!');
                    this.gameSetup();
                }
            });
        });

    }
    game.prototype.performAction = function(action) {
        console.log(action);
        switch (action.type) {
          case "attack":
              const opponent = this[
                this.activePlayer == 'player1' ? 'player2' : 'player1'
              ];
            const activePlayer = this[this.activePlayer];
            console.log(this.activePlayer)
            // perform attack
            opponent.health -= (opponent.defending ? activePlayer.weapon.damage / 2 : activePlayer.weapon.damage);
            this.getPlayerStats()
            console.log("health" + opponent.health + " weapon" + activePlayer.weapon.damage) 
            // turn of the defense because is only available for one turn
            opponent.defending = false;
            break;
          case "defense":
              this[this.activePlayer].defending = true;
            break;
          default:
            break;
        }

        // toggle the active player
        this.activePlayer = this.activePlayer == 'player1' ? 'player2' : 'player1';
        this.enableFightButton()

    }
    game.prototype.tryFight = function() {
        const self = this;
        console.log(this.activePlayer)
        if (!self.isReadyToFight()){
            return;
        }
        self.enableFightButton()
        
    
    };
    
    $(window).on("load", function() {
        document.getElementById("newGameBtn").addEventListener("click", function() {
            const newGame = new game();
            newGame.gameSetup();
            newGame.createActionButtonsEvents();
        });     
    });
    })();
