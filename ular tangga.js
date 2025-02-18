const boardSize = 100;
const snakes = { 16: 6, 47: 26, 49: 11, 56: 53, 62: 19, 64: 60, 87: 24, 93: 73, 95: 75, 98: 78 };
const ladders = { 1: 38, 4: 14, 9: 31, 21: 42, 28: 84, 36: 44, 51: 67, 71: 91, 80: 100 };

let playerPositions = [0, 0];
let currentPlayer = 0;

function createBoard() {
    const board = document.getElementById("board");
    for (let i = boardSize; i > 0; i--) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.innerText = i;
        board.appendChild(cell);
    }
}

function rollDice() {
    const diceValue = Math.floor(Math.random() * 6) + 1;
    const newPosition = playerPositions[currentPlayer] + diceValue;

    if (newPosition <= boardSize) {
        playerPositions[currentPlayer] = newPosition;

        // Cek ular atau tangga
        if (snakes[playerPositions[currentPlayer]]) {
            playerPositions[currentPlayer] = snakes[playerPositions[currentPlayer]];
            showMessage(`Pemain ${currentPlayer + 1} tergigit ular!`);
        } else if (ladders[playerPositions[currentPlayer]]) {
            playerPositions[currentPlayer] = ladders[playerPositions[currentPlayer]];
            showMessage(`Pemain ${currentPlayer + 1} naik tangga!`);
        } else {
            showMessage(`Pemain ${currentPlayer + 1} maju ${diceValue} langkah.`);
        }
    }

    updateBoard();
    checkWinner();
}

function updateBoard() {
    const cells = document.querySelectorAll(".cell");
    cells.forEach(cell => cell.classList.remove("snake", "ladder"));
    cells[playerPositions[0]].classList.add("snake");
    cells[playerPositions[1]].classList.add("ladder");

    document.getElementById("currentPlayer").innerText = `Pemain ${currentPlayer + 1} Giliran`;
}

function checkWinner() {
    if (playerPositions[currentPlayer] === boardSize) {
        showMessage(`Pemain ${currentPlayer + 1} menang!`);
        document.getElementById("rollDice").disabled = true;
    } else {
        currentPlayer = (currentPlayer + 1) % 2;
    }
}

function showMessage(message) {
    document.getElementById("message").innerText = message;
}

document.getElementById("rollDice").addEventListener("click", rollDice);
createBoard();