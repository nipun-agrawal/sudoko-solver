const gridContainer = document.getElementById('sudoku-grid');
const SIZE = 9;
let cells = [];

function createGrid() {
  for (let row = 0; row < SIZE; row++) {
    cells[row] = [];
    for (let col = 0; col < SIZE; col++) {
      const input = document.createElement('input');
      input.type = 'number';
      input.min = 1;
      input.max = 9;
      input.classList.add('cell');
      gridContainer.appendChild(input);
      cells[row][col] = input;
    }
  }
}

function getGridValues() {
  return cells.map(row => row.map(cell => parseInt(cell.value) || 0));
}

function setGridValues(grid) {
  for (let row = 0; row < SIZE; row++) {
    for (let col = 0; col < SIZE; col++) {
      cells[row][col].value = grid[row][col] !== 0 ? grid[row][col] : '';
    }
  }
}

function isValid(grid, row, col, num) {
  for (let x = 0; x < SIZE; x++) {
    if (grid[row][x] === num || grid[x][col] === num) return false;
  }
  const startRow = row - (row % 3);
  const startCol = col - (col % 3);
  for (let i = 0; i < 3; i++)
    for (let j = 0; j < 3; j++)
      if (grid[startRow + i][startCol + j] === num) return false;

  return true;
}

function solve(grid) {
  for (let row = 0; row < SIZE; row++) {
    for (let col = 0; col < SIZE; col++) {
      if (grid[row][col] === 0) {
        for (let num = 1; num <= 9; num++) {
          if (isValid(grid, row, col, num)) {
            grid[row][col] = num;
            if (solve(grid)) return true;
            grid[row][col] = 0;
          }
        }
        return false;
      }
    }
  }
  return true;
}

function solveSudoku() {
  const grid = getGridValues();
  if (solve(grid)) {
    setGridValues(grid);
    alert("Sudoku Solved!");
  } else {
    alert("No solution exists!");
  }
}

function resetGrid() {
  cells.forEach(row => row.forEach(cell => cell.value = ''));
}

createGrid();
