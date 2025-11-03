// ===== TIC-TAC-TOE NEON SCRIPT =====

const startBtn = document.getElementById("start-btn");
const restartBtn = document.getElementById("restart-btn");
const startScreen = document.getElementById("start-screen");
const gameContainer = document.getElementById("game");
const cells = document.querySelectorAll("[data-cell]");
const messageText = document.getElementById("message-text");
const winningMessage = document.getElementById("winning-message");

let circleTurn;

const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

startBtn.addEventListener("click", () => {
  startScreen.classList.add("hidden");
  gameContainer.classList.remove("hidden");
  startGame();
});

restartBtn.addEventListener("click", startGame);

function startGame() {
  circleTurn = false;
  cells.forEach(cell => {
    cell.textContent = "";
    cell.classList.remove("x", "o");
    cell.removeEventListener("click", handleClick);
    cell.addEventListener("click", handleClick, { once: true });
  });
  winningMessage.classList.add("hidden");
}

function handleClick(e) {
  const cell = e.target;
  const currentClass = circleTurn ? "O" : "X";
  placeMark(cell, currentClass);

  if (checkWin(currentClass)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    swapTurns();
  }
}

function endGame(draw) {
  if (draw) {
    messageText.textContent = "It's a Draw!";
  } else {
    messageText.textContent = `${circleTurn ? "O" : "X"} Wins! 🎉`;
  }
  winningMessage.classList.remove("hidden");
}

function isDraw() {
  return [...cells].every(cell => cell.textContent !== "");
}

function placeMark(cell, currentClass) {
  cell.textContent = currentClass;
  cell.style.color = currentClass === "X" ? "#00fff7" : "#ff00ff";
  cell.style.textShadow = currentClass === "X"
    ? "0 0 15px #00fff7, 0 0 30px #00fff7"
    : "0 0 15px #ff00ff, 0 0 30px #ff00ff";
}

function swapTurns() {
  circleTurn = !circleTurn;
}

function checkWin(currentClass) {
  return WINNING_COMBINATIONS.some(combination =>
    combination.every(index => cells[index].textContent === currentClass)
  );
}
