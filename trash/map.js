import game from './game.js';

game.prototype.createGrid = function() {
    let cells = '';
    for(let row = 1; row < 11; row++){                
        for(let col = 1; col < 11; col++){    
            cells += `<div class='grid-item' data-col=${col} data-row=${row} ></div>`;
        }
    }
    this.gridContainer.innerHTML = cells;
};