var starterBox = document.getElementById('startBox');
var playAmount = document.getElementById('connectAmount');
var playButton = document.getElementById('playButton');
var errorMsg = document.getElementById('error');
var scoreBoard = document.getElementById('scoreboard');

var amountNumber = 0;
var bestResult = [];

playButton.addEventListener('click', ()=> {
	amountNumber = parseInt(playAmount.value);
	if (amountNumber > 2 && amountNumber <= 50) {
		if (amountNumber % 1 === 0) {
			makeGame();
		} else {
			errorMsg.innerText = "You cant use a decimal!";
			errorMsg.style.display = 'block';
		}
	} else {
		errorMsg.innerText = "You must have a number larget than 2, or smaller than 50 to play! (If you really want to go larger than 50, just change the number 50 on line 12 of main.js in the connectUltimate folder. though it is not recommended)";
		errorMsg.style.display = 'block';
	}
	for (var i = 0; i < amountNumber; i++) {
		bestResult.push(false);
	}
});

var grid = [];
var boxSize = 0;
var tokenSize = 0;
var turn = 1;
var gridBox = document.getElementById('grid');

function makeGame () {
	active = true;
	errorMsg.style.display = 'none;';
	grid = [];
	starterBox.style.display = 'none';
	for (var i = 0; i < (amountNumber+2); i++) {
		let row = [];
		for (var v = 0; v < (amountNumber+3); v++) {
			row.push(0);
		}
		grid.push(row);
	}

	boxSize = 480 / grid.length;
	tokenSize = boxSize - (boxSize / 10);
	let newGrid = '';
	for (var i = grid.length; i >= 0; i--) {
		if (i - 1 == -1) {
			newGrid += '<div class="row buttonSplit">';
		} else {
			newGrid += '<div class="row" data-row="'+(i-1)+'">';
		}
		for (var v = 0; v < grid[0].length; v++) {
			if (i - 1 == -1) {
				newGrid += '<button type="button" name="button" onclick="addPiece('+v+')">O</button>';
			} else {
				if (i-1 == 0) {
					if (v == (grid[0].length - 1)) {
						newGrid += '<div class="square borderBottom borderRight" data-square="'+v+'" style="height: '+boxSize+'px;  width: '+boxSize+'px;"></div>';
					} else {
						newGrid += '<div class="square borderBottom" data-square="'+v+'" style="height: '+boxSize+'px;  width: '+boxSize+'px;"></div>';
					}
				} else {
					if (v == (grid[0].length - 1)) {
						newGrid += '<div class="square borderRight" data-square="'+v+'" style="height: '+boxSize+'px;  width: '+boxSize+'px;"></div>';
					} else {
						newGrid += '<div class="square" data-square="'+v+'" style="height: '+boxSize+'px;  width: '+boxSize+'px;"></div>';
					}
				}
			}
		}
		newGrid += '</div>';
	}
	gridBox.style.display = 'flex';
	gridBox.innerHTML = newGrid;
	scoreBoard.style.display = 'block';
}

var turn = 1;
var pieces = [];
var active = true;

var playerTitle = document.getElementById('player');

var redWins = 0;
var yellowWins = 0;
var redWinsText = document.getElementById('redWins');
var yellowWinsText = document.getElementById('yellowWins');
var resetBtn = document.getElementById('reset');
var changeBtn = document.getElementById('change');

resetBtn.addEventListener('click', reset);
changeBtn.addEventListener('click', changeMode);

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
					square.innerHTML = '<div class="token red" style="height: '+tokenSize+'px; width: '+tokenSize+'px;"></div>';
					playerTitle.innerText = "Player Yellow turn";
					turn = 2;
				} else {
					square.innerHTML = '<div class="token yellow" style="height: '+tokenSize+'px; width: '+tokenSize+'px;"></div>';
					playerTitle.innerText = "Player Red turn";
					turn = 1;
				}

				winCheck(turn);
				break;
			}
		}
	}
}

function winCheckStatment (token, x1, x2, y1, y2, newCurrentTurn) {
	if (pieces.some(e => e.color === newCurrentTurn)) {
		if (pieces.some(e => e.x+x1 === pieces[token].x+x2 && e.y+y1 === pieces[token].y+y2 && e.color === newCurrentTurn)) {
			return true;
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
		for (var j = 0; j < bestResult.length; j++) {
			if (winCheckStatment(i, 0, 0, 0, j, actualTurn)) {
				bestResult[j] = true;
			} else if (winCheckStatment(i, 0, j, 0, j, actualTurn)) {
				bestResult[j] = true;
			} else if (winCheckStatment(i, 0, -j, 0, j, actualTurn)) {
				bestResult[j] = true;
			} else if (winCheckStatment(i, j, 0, 0, 0, actualTurn)) {
				bestResult[j] = true;
			} else {
				break;
			}
		}
	}
	if (bestResult[0] == true) {
		if (bestResult.every( (val, i, arr) => val === arr[0] )) {
			winner(actualTurn, titleText);
		}
	}
	if (active == true && pieces.length == (amountNumber+2)*(amountNumber+3)) {
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
	changeBtn.style.display = "block";
}

function reset () {
	makeGame();
	active = true;
	pieces = [];
	bestResult = [];
	turn = 1;

	[].forEach.call(document.querySelectorAll('.square'), (box)=> {
		box.innerHTML = '';
	});

	playerTitle.innerText = "Player Red turn";
	resetBtn.style.display = "none";
	changeBtn.style.display = "none";
}

function changeMode () {
	gridBox.innerHTML = '';
	turn = 1;
	playerTitle.innerText = "Player Red turn";
	resetBtn.style.display = "none";
	changeBtn.style.display = "none";
	starterBox.style.display = 'block';
	scoreBoard.style.display = "none";
	pieces = [];
	bestResult = [];
}