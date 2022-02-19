var turn = 'X';
var total_turns_played = 0;
var selections = new Array();

//[0,1,2]
//[3,4,5]
//[6,7,8]
var win_indexes =  [
	[0,1,2],
	[3,4,5],
	[6,7,8],
	[0,3,6],
	[1,4,7],
	[2,5,8],
	[0,4,8],
	[2,4,6]
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
	checkPlayerHasAnyWinningPattern(turn);

	if (turn == 'X' ) {
		obj.setAttribute("class", 'green-player');
		turn = 'O';
	} else {
		obj.setAttribute("class", 'red-player');
		turn = 'X';
	}

	obj.setAttribute("disabled", 'disabled');
}

function checkPlayerHasAnyWinningPattern(player) {
	gameOver = false;
	player_selections = selections[player];
	for (var i=0; i < win_indexes.length; i++) {

		first_win_index = win_indexes[i][0];
		second_win_index = win_indexes[i][1];
		third_win_index = win_indexes[i][2];

		if(
			player_selections[first_win_index] === 1 &&
			player_selections[second_win_index] === 1 &&
			player_selections[third_win_index] === 1
		){
			
			// On winning disabled all boxes
			disableAllCells();
			setTimeout(function(){
				alert('Player '+player+' Won !!'); 
		   }, 1);
			break;
		} 
	}

	// If no one wins; declare DRAW
	if (total_turns_played == 9 && gameOver === false){
		setTimeout(function(){
			alert('Game Draw!');
   		}, 1);
		gameOver = true;	
	}
}

function disableAllCells() {

	var elements = document.getElementsByClassName("grid-cell");
	for (var i = 0; i < elements.length; i++) {
	  elements[i].disabled =true;
	}
} 