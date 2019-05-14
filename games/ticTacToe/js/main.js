var grid = [
	[0,3,0],
	[0,3,0],
	[3,0,3]
];

var active = true;
var turn = true;
var counter = 0;

var playerXwinCounter = 0;
var playerOwinCounter = 0;

var winnerH2 = document.getElementById('winner');
var resetBtn = document.getElementById('reset');
var currentTurn = document.getElementById('currentTurn');
var xWins = document.getElementById('xWins');
var xWinsValue = 0;
var oWins = document.getElementById('oWins');
var oWinsValue = 0;

[].forEach.call(document.querySelectorAll('.square'), (e)=> {
	e.addEventListener('click', ()=> {
		if (active == true) {

			let row = e.parentNode.getAttribute("data-row");
			let square = e.getAttribute("data-square");
			let value;

			if (e.innerText == "") {
				if (turn == true) {
					turn = false;
					value = 1;
					e.innerText = "X"
					currentTurn.innerText = "Player O Turn";
				} else {
					turn = true;
					value = 2;
					e.innerText = "O"
					currentTurn.innerText = "Player X Turn";
				}

				counter++;
				grid[row][square] = value;

				if (grid[0][0] === grid[1][1] && grid[0][0] === grid[2][2]) {
					winner(value);
				} else if (grid[0][2] === grid[1][1] && grid[0][2] === grid[2][0]) {
					winner(value);
				} else {
					for (var i = 0; i < grid.length; i++) {
						if (grid[i][0] === grid[i][1] && grid[i][0] === grid[i][2]) {
							winner(value);
							break;
						} else if (grid[0][i] === grid[1][i] && grid[0][i] === grid[2][i]) {
							winner(value);
							break;
						} else {
							if (counter == 9) {
								winner(3);
							}
						}
					}
				}
			}
		}
	});
});

function winner (turn) {
	active = false;
	let player = "";
	if (turn == 1) {
		player = "Player X Wins!";
		xWinsValue++;
		xWins.innerText = xWinsValue;
	} else if (turn == 2) {
		player = "Player O Wins!";
		oWinsValue++;
		oWins.innerText = oWinsValue;
	} else {
		player = "Its A Tie!"
	}

	winnerH2.innerText = player;
	winnerH2.style.display = "block";
	resetBtn.style.display = "block";
	currentTurn.style.display = "none";
}

resetBtn.addEventListener('click', ()=> {
	[].forEach.call(document.querySelectorAll('.square'), (e)=> {
		e.innerText = "";
	});

	turn = true;
	active = true;
	counter = 0;
	grid = [
		[0,3,0],
		[0,3,0],
		[3,0,3]
	];

	resetBtn.style.display = "none";
	winnerH2.style.display = "none";
	currentTurn.innerText = "Player X Turn";
	currentTurn.style.display = "block";
});
