var turn = 'X';
var total_turns_played = 0;
var selections = new Array();

//[0,1,2]
//[3,4,5]
//[6,7,8]
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
	console.log(`player ${turn} marked ${obj.id}!`);

	if (turn == 'X' ) {
		obj.setAttribute("class", 'green-player');
		turn = 'O';
	} else {
		obj.setAttribute("class", 'red-player');
		turn = 'X';
	}

	obj.setAttribute("disabled", 'disabled');
	total_turns_played++;
	if (total_turns_played == 9){
		console.log(`player X marked [${selections['X']}]`);
		console.log(`player O marked [${selections['O']}]`);
		alert("Board is full!");
	}
}