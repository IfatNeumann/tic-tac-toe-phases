var turn = 'X';
var total_turns_played = 0;
var selections = new Array();

//[0,1,2]
//[3,4,5]
//[6,7,8]
var win_patterns =  [
	[1,1,1,0,0,0,0,0,0], // [0,1,2]
	[0,0,0,1,1,1,0,0,0], // [3,4,5]
	[0,0,0,0,0,0,1,1,1], // [6,7,8]
	[1,0,0,1,0,0,1,0,0], // [0,3,6]
	[0,1,0,0,1,0,0,1,0], // [1,4,7]
	[0,0,1,0,0,1,0,0,1], // [2,5,8]
	[1,0,0,0,1,0,0,0,1], // [0,4,8]
	[0,0,1,0,1,0,1,0,0], // [2,4,6]
];

selections['X'] = [0,0,0,0,0,0,0,0,0];
selections['O'] = [0,0,0,0,0,0,0,0,0];

function generateGame(){

	// Clearing board for new game
	document.getElementById('game-board').innerHTML = '';
	selections['X'] = [0,0,0,0,0,0,0,0,0];
	selections['O'] = [0,0,0,0,0,0,0,0,0];
	total_turns_played = 0;
	var unique_id = 0;
	
	// Generating board
	for (row=0; row<3; row++){
		for (col=0; col<3; col++) {
			var button = document.createElement("input");
			button.setAttribute("value", ' ');
			button.setAttribute("name", 'grid');
			button.setAttribute("class", 'grid-cell');
			button.setAttribute("type", 'button');
			button.setAttribute("onclick", "markCheck(this)");
			button.setAttribute("id", unique_id);
			document.getElementById('game-board').appendChild(button);
			unique_id++;
		}
		var breakline = document.createElement("br");
			document.getElementById('game-board').appendChild(breakline);
	}

}

function markCheck(obj){
	obj.value = turn;
	var cell = Number(obj.id);
	selections[turn][cell] = 1;
	total_turns_played++;
	checkPlayerHasAnyWinningPattern();

	if (turn == 'X' ) {
		obj.setAttribute("class", 'green-player');
		turn = 'O';
	} else {
		obj.setAttribute("class", 'red-player');
		turn = 'X';
	}

	obj.setAttribute("disabled", 'disabled');
}

function checkPlayerHasAnyWinningPattern() {
	gameOver = false; //game is over if someone wins

	for (var p=0; p < win_patterns.length; p++) {
		if (gameOver != true) { 
			gameOver = isContainingThisWinningPattern(selections[turn], win_patterns[p]);

			if ( gameOver === true ) {
				
				// On winning disabled all boxes
				disableAllCells();

				alert('Player '+turn+' Won !!');
				break;
			} 
		}
	}

	// If no one wins; declare DRAW
	if (total_turns_played == 9 && gameOver === false){
		alert('Game Draw!');
		gameOver = true;	
	}
}

// Verifying player's selections with a specific winning pattern
function isContainingThisWinningPattern(player_selections, win_pattern){
	var match = 0;
	for (var i=0; i < 9; i++) {
		if(player_selections[i] + win_pattern[i] == 2){
			match ++;
		}
	}

	if (match == 3){
		return true;
	}

	return false;
}

function disableAllCells() {

	var elements = document.getElementsByClassName("grid-cell");
	for (var i = 0; i < elements.length; i++) {
	  elements[i].disabled =true;
	}
} 