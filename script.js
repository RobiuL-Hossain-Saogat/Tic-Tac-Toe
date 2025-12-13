document.addEventListener('DOMContentLoaded', () => {
const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const xScoreEl = document.getElementById('xScore');
const oScoreEl = document.getElementById('oScore');
const tiesEl = document.getElementById('ties');


let currentPlayer = 'X';
let gameActive = true;
let board = ['', '', '', '', '', '', '', '', ''];
let scores = { X: 0, O: 0, T: 0 };


const winPatterns = [
[0,1,2],[3,4,5],[6,7,8],
[0,3,6],[1,4,7],[2,5,8],
[0,4,8],[2,4,6]
];


cells.forEach((cell, index) => {
cell.addEventListener('click', () => handleClick(cell, index));
});


function handleClick(cell, index) {
if (board[index] || !gameActive) return;


board[index] = currentPlayer;
cell.textContent = currentPlayer;
cell.classList.add(currentPlayer.toLowerCase());


if (checkWin()) {
scores[currentPlayer]++;
updateScores();
statusText.textContent = `Player ${currentPlayer} wins!`;
gameActive = false;
return;
}


if (!board.includes('')) {
scores.T++;
updateScores();
statusText.textContent = "It's a tie!";
gameActive = false;
return;
}


currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
statusText.textContent = `Player ${currentPlayer}'s turn`;
}


function checkWin() {
return winPatterns.some(pattern =>
pattern.every(i => board[i] === currentPlayer)
);
}


function updateScores() {
xScoreEl.textContent = scores.X;
oScoreEl.textContent = scores.O;
tiesEl.textContent = scores.T;
}


function resetBoard() {
board = ['', '', '', '', '', '', '', '', ''];
cells.forEach(cell => {
cell.textContent = '';
cell.classList.remove('x', 'o');
});
currentPlayer = 'X';
gameActive = true;
statusText.textContent = "Player X's turn";
}


document.getElementById('restart').addEventListener('click', resetBoard);
});