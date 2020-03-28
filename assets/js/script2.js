// Function to draw the grid
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
// Function to get cell position
function getPosition(rowPosition, colPosition) {
    return $(`[data-row="${rowPosition}"][data-column="${colPosition}"]`);
}