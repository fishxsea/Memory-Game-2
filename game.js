// querySelectors
///
const container = document.querySelector('#game-container');
const gameBoard = document.querySelector('#game-board');
const restart = document.querySelector('#restart');
const body = document.querySelector('body');

const colors = [
	'red',
	'orange',
	'yellow',
	'green',
	'blue',
	'darkblue',
	'purple',
	'pink',
];

// function bgPopulate(parent) {
// 	for (let i = 0; i < 30; i++) {
// 		const bgCell = document.createElement('div');
// 		bgCell.classList.add('bg-cell');
// 		parent.appendChild(bgCell);
// 	}
// }
// bgPopulate(bg);

function randomShuffle(arr) {
	for (let i = arr.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[arr[i], arr[j]] = [arr[j], arr[i]];
	}
	return arr;
}

function createBoard(parent) {
	const shuffledColors = randomShuffle([...colors, ...colors]);

	let grid = document.createElement('div');
	grid.classList.add('grid');

	// creates a row and appends it to the grid element
	for (let i = 0; i < 4; i++) {
		let rowDiv = document.createElement('div');
		rowDiv.classList.add('grid-row');
		grid.appendChild(rowDiv);

		for (let cell = 0; cell < 4; cell++) {
			const cellDiv = document.createElement('div');
			cellDiv.classList.add('grid-cell');
			cellDiv.style.backgroundColor = shuffledColors[i * 4 + cell];
			cellDiv.classList.add('hidden-style');
			rowDiv.appendChild(cellDiv);
		}
	}
	parent.appendChild(grid);
}

let activeColors = [];
let activeCells = [];

gameBoard.addEventListener('click', (e) => {
	const cellColor = e.target.style.backgroundColor;
	const targ = e.target.className;

	e.target.classList.remove('hidden-style');
	if (targ === 'grid-cell hidden-style') {
		e.target.classList.add('disable-input');
	}

	if (e.target.style.backgroundColor !== '') {
		activeColors.push(cellColor);
		activeCells.push(e);
	}

	if (activeCells.length === 2 && activeColors[0] !== activeColors[1]) {
		setTimeout(() => {
			activeCells[0].target.classList.add('hidden-style');
			e.target.classList.add('hidden-style');
			activeCells[0].target.classList.remove('disable-input');
			activeCells[1].target.classList.remove('disable-input');
			activeColors = [];
			activeCells = [];
			container.classList.remove('disable-input');
		}, 1000);
		container.classList.add('disable-input');
	}
	if (activeColors[0] === activeColors[1]) {
		activeCells[0].target.classList.add('disable-input', 'cell-down');
		activeCells[1].target.classList.add('disable-input', 'cell-down');
		activeColors = [];
		activeCells = [];
		setTimeout(() => {
			container.style.backgroundColor = '#713db0';
		}, 500);
		container.style.backgroundColor = '#894cd3';
	}

	// console.log(e);
	// console.log(cellColor);
});

restart.addEventListener('click', () => {
	gameBoard.innerText = '';
	activeCells = [];
	activeColors = [];
	createBoard(gameBoard);
});

createBoard(gameBoard);
