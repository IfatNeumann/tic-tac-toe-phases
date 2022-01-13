var turn = 'X';

function generateGame(){

	// Clearing board for new game
	document.getElementById('game-board').innerHTML = '';
	
	// Generating board
	for (row=0; row<3; row++){
		for (col=0; col<3; col++) {
			var button = document.createElement("input");
			button.setAttribute("value", ' ');
			button.setAttribute("name", 'grid');
			button.setAttribute("class", 'grid-cell');
			button.setAttribute("type", 'button');
			button.setAttribute("onclick", "markCheck(this)");
			document.getElementById('game-board').appendChild(button);
		}
		var breakline = document.createElement("br");
			document.getElementById('game-board').appendChild(breakline);
	}

}

function markCheck(obj){
	obj.value = turn;

	if (turn == 'X' ) {
		obj.setAttribute("class", 'green-player');
		turn = 'O';
	} else {
		obj.setAttribute("class", 'red-player');
		turn = 'X';
	}
	
	obj.setAttribute("disabled", 'disabled');
}