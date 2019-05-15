var grid = [
	[0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0]
];

// The grid is filled with 0s because 1s and 2s are used as player colours
//
// How the pieces work:
//	The grid is 7 pieces along and 6 pieces high
//	So the bottom left piece will have the placement of x:0,y:0
//	And the top right piece will have the placement of x:6,y:5
//
// So the checking part will go through each piece and check the pieces around them. If a line of 4 pieces are found, then that player wins.

var turn = 1;
// 1 is red's turn, 2 is yellow's turn

var pieces = [];

// Each piece will be stored as an object. these objects will contain its x value, y value and what color the piece is
// {x:1,y:1,color:1},
// {x:2,y:1,color:2},
// {x:3,y:1,color:1},
// {x:4,y:1,color:2}

var active = true;
// Makes sure that the board can not be changed after someone wins

var playerTitle = document.getElementById('player');

var redWins = 0;
var yellowWins = 0;
var redWinsText = document.getElementById('redWins');
var yellowWinsText = document.getElementById('yellowWins');
var resetBtn = document.getElementById('reset');

resetBtn.addEventListener('click', reset);

function addPiece (x) {
	if (active) {
		let row = -1;
		for (var i = grid.length-1; i >= 0; i--) {
			row++;
			if (grid[i][x] == 0) {
				grid[i][x] = turn;

				pieces.push({x:x,y:row,color:turn});

				let currentRow = document.querySelector('[data-row="'+row+'"]');
				let square = currentRow.querySelector('[data-square="'+x+'"]');

				if (turn == 1) {
					square.innerHTML = '<div class="token red"></div>';
					playerTitle.innerText = "Player Yellow turn";
					turn = 2;
				} else {
					square.innerHTML = '<div class="token yellow"></div>';
					playerTitle.innerText = "Player Red turn";
					turn = 1;
				}

				winCheck(turn);
				break;
			}
		}
	}
}



function winCheck (actualTurn) {
	if (actualTurn == 1) {
		actualTurn = 2;
		titleText = "Yellow Wins!";
	} else {
		actualTurn = 1;
		titleText = "Red Wins!";
	}

	for (var i = 0; i < pieces.length; i++) {
		if (pieces.some(e => e.x === pieces[i].x && e.y === pieces[i].y && e.color === actualTurn)) {
			if (pieces.some(e => e.x === pieces[i].x && e.y === pieces[i].y+1 && e.color === actualTurn)) {
				if (pieces.some(e => e.x === pieces[i].x && e.y === pieces[i].y+2 && e.color === actualTurn)) {
					if (pieces.some(e => e.x === pieces[i].x && e.y === pieces[i].y+3 && e.color === actualTurn)) {
						winner(actualTurn, titleText);
						break;
					}
				}
			} else if (pieces.some(e => e.x === pieces[i].x+1 && e.y === pieces[i].y+1 && e.color === actualTurn)) {
				if (pieces.some(e => e.x === pieces[i].x+2 && e.y === pieces[i].y+2 && e.color === actualTurn)) {
					if (pieces.some(e => e.x === pieces[i].x+3 && e.y === pieces[i].y+3 && e.color === actualTurn)) {
						winner(actualTurn, titleText);
						break;
					}
				}
			} else if (pieces.some(e => e.x === pieces[i].x-1 && e.y === pieces[i].y+1 && e.color === actualTurn)) {
				if (pieces.some(e => e.x === pieces[i].x-2 && e.y === pieces[i].y+2 && e.color === actualTurn)) {
					if (pieces.some(e => e.x === pieces[i].x-3 && e.y === pieces[i].y+3 && e.color === actualTurn)) {
						winner(actualTurn, titleText);
						break;
					}
				}
			} else if (pieces.some(e => e.x+1 === pieces[i].x && e.y === pieces[i].y && e.color === actualTurn)) {
				if (pieces.some(e => e.x+2 === pieces[i].x && e.y === pieces[i].y && e.color === actualTurn)) {
					if (pieces.some(e => e.x+3 === pieces[i].x && e.y === pieces[i].y && e.color === actualTurn)) {
						winner(actualTurn, titleText);
						break;
					}
				}
			}
		}
	}
	if (active == true && pieces.length == 42) {
		winner(3, "It's a tie!");
	}
}

function winner (player, titleText) {
	active = false;
	playerTitle.innerText = titleText;

	if (player == 1) {
		redWins++;
		redWinsText.innerText = redWins;
	} else if (player == 2) {
		yellowWins++;
		yellowWinsText.innerText = yellowWins;
	}

	resetBtn.style.display = "block";
}

function reset () {
	grid = [
		[0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0]
	];
	active = true;
	pieces = [];
	turn = 1;

	[].forEach.call(document.querySelectorAll('.square'), (box)=> {
		box.innerHTML = '';
	});

	playerTitle.innerText = "Player Red turn";
	resetBtn.style.display = "none";
}
