const board = document.getElementById('board');
const gameScreen = document.getElementById('gameScreen');
const resultMessage = document.getElementById('resultMessage');
const newGameBtn = document.getElementById('newGameBtn');

let currentPlayer = 'X';
const cells = Array.from({ length: 9 });

cells.forEach((_, index) => {
  const cell = document.createElement('div');
  cell.classList.add('cell');
  cell.dataset.index = index;
  cell.addEventListener('click', () => cellClicked(index));
  board.appendChild(cell);
});

function cellClicked(index) {
  if (cells[index] || checkWinner()) return;
  cells[index] = currentPlayer;
  render();
  if (checkWinner()) {
    showResult(`${currentPlayer} wins!`);
  } else if (cells.every(cell => cell)) {
    showResult('It\'s a draw!');
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  }
}

function checkWinner() {
  const winConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
  ];

  return winConditions.some(condition => {
    const [a, b, c] = condition;
    return cells[a] && cells[a] === cells[b] && cells[a] === cells[c];
  });
}

function render() {
  cells.forEach((value, index) => {
    const cell = board.children[index];
    cell.textContent = value || '';
  });
}

function showResult(message) {
  resultMessage.textContent = message;
  gameScreen.classList.remove('hidden');
}

newGameBtn.addEventListener('click', () => {
  cells.fill(null);
  currentPlayer = 'X';
  render();
  gameScreen.classList.add('hidden');
});
