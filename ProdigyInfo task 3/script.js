// scripts.js
document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell'); // Select all cells
    const statusDisplay = document.getElementById('status'); // Status display
    const restartButton = document.getElementById('restart'); // Restart button
    const playComputerButton = document.getElementById('playComputer'); // Play with computer button

    let currentPlayer = 'X'; // Starting player
    let gameState = Array(9).fill(''); // Initial game state
    let gameActive = true; // Is the game active?
    let playWithComputer = false; // Are we playing with the computer?

    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    const handleCellClick = (event) => {
        const cell = event.target;
        const cellIndex = cell.getAttribute('data-index');

        if (gameState[cellIndex] !== '' || !gameActive) {
            return; // Ignore click if cell is already occupied or game is inactive
        }

        gameState[cellIndex] = currentPlayer; // Update game state
        cell.textContent = currentPlayer; // Update cell display

        if (checkWin()) {
            statusDisplay.textContent = `${currentPlayer} has won!`;
            gameActive = false;
        } else if (!gameState.includes('')) {
            statusDisplay.textContent = 'Game ended in a draw!';
            gameActive = false;
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X'; // Switch player
            statusDisplay.textContent = `It's ${currentPlayer}'s turn`;

            if (playWithComputer && currentPlayer === 'O') {
                setTimeout(computerPlay, 500); // Computer's turn after a delay
            }
        }
    };

    const checkWin = () => {
        return winningConditions.some(condition => {
            const [a, b, c] = condition;
            return gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c];
        });
    };

    const computerPlay = () => {
        let emptyCells = gameState
            .map((val, index) => val === '' ? index : null)
            .filter(val => val !== null);

        if (emptyCells.length > 0) {
            let randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
            gameState[randomCell] = 'O';
            cells[randomCell].textContent = 'O';

            if (checkWin()) {
                statusDisplay.textContent = `O has won!`;
                gameActive = false;
            } else if (!gameState.includes('')) {
                statusDisplay.textContent = 'Game ended in a draw!';
                gameActive = false;
            } else {
                currentPlayer = 'X';
                statusDisplay.textContent = `It's ${currentPlayer}'s turn`;
            }
        }
    };

    const restartGame = () => {
        gameActive = true;
        currentPlayer = 'X';
        gameState = Array(9).fill('');
        cells.forEach(cell => cell.textContent = '');
        statusDisplay.textContent = `It's ${currentPlayer}'s turn`;
        playWithComputer = false; // Reset to default mode
    };

    const startPlayWithComputer = () => {
        restartGame();
        playWithComputer = true;
    };

    cells.forEach(cell => cell.addEventListener('click', handleCellClick)); // Attach click handler to cells
    restartButton.addEventListener('click', restartGame); // Attach click handler to restart button
    playComputerButton.addEventListener('click', startPlayWithComputer); // Attach click handler to play with computer button

    statusDisplay.textContent = `It's ${currentPlayer}'s turn`;
});
