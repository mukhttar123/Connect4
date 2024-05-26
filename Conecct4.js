var playerRed = "R";
var playerYellow = "Y";
var currPlayer = playerRed;

var gameOver = false;
var board;

var rows = 6;
var columns = 7;
var currColumns = []; // Menentukan baris (x) pada setiap kolom.

var scoreRed = 0;
var scoreYellow = 0;

window.onload = function() {
    setGame();
    document.getElementById("restartBtn").addEventListener("click", restartGame);
    document.getElementById("playMusicBtn").addEventListener("click", playMusic);
    document.getElementById("stopMusicBtn").addEventListener("click", stopMusic);
    updategiliran(); // Update indikator giliran pemain saat halaman dimuat
}

function setGame() {
    board = [];
    currColumns = [5, 5, 5, 5, 5, 5, 5];
    
    let boardElement = document.getElementById("board");
    boardElement.innerHTML = ''; // Bersihkan papan sebelum diisi ulang

    for (let r = 0; r < rows; r++) {
        let row = [];
        for (let c = 0; c < columns; c++) {
            row.push(' ');

            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            tile.classList.add("tile");
            tile.addEventListener("click", setPiece);
            boardElement.append(tile);
        }
        board.push(row);
    }
}

function setPiece() {
    if (gameOver) {
        return;
    }

    let coords = this.id.split("-");
    let r = parseInt(coords[0]);
    let c = parseInt(coords[1]);

    r = currColumns[c];

    if (r < 0) {
        return;
    }

    board[r][c] = currPlayer;
    let tile = document.getElementById(r.toString() + "-" + c.toString());
    if (currPlayer == playerRed) {
        tile.classList.add("red-piece");
        currPlayer = playerYellow;
    } else {
        tile.classList.add("yellow-piece");
        currPlayer = playerRed;
    }

    r -= 1;
    currColumns[c] = r;

    updategiliran(); // Update indikator giliran pemain setelah setiap gerakan
    checkWinner();
}

function checkWinner() {
    // horizontal
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns - 3; c++) {
            if (board[r][c] != ' ') {
                if (board[r][c] == board[r][c+1] && board[r][c+1] == board[r][c+2] && board[r][c+2] == board[r][c+3]) {
                    setWinner(r, c);
                    return;
                }
            }
        }
    }

    // vertical
    for (let c = 0; c < columns; c++) {
        for (let r = 0; r < rows - 3; r++) {
            if (board[r][c] != ' ') {
                if (board[r][c] == board[r+1][c] && board[r+1][c] == board[r+2][c] && board[r+2][c] == board[r+3][c]) {
                    setWinner(r, c);
                    return;
                }
            }
        }
    }

    // anti diagonal
    for (let r = 0; r < rows - 3; r++) {
        for (let c = 0; c < columns - 3; c++) {
            if (board[r][c] != ' ') {
                if (board[r][c] == board[r+1][c+1] && board[r+1][c+1] == board[r+2][c+2] && board[r+2][c+2] == board[r+3][c+3]) {
                    setWinner(r, c);
                    return;
                }
            }
        }
    }

    // diagonal
    for (let r = 3; r < rows; r++) {
        for (let c = 0; c < columns - 3; c++) {
            if (board[r][c] != ' ') {
                if (board[r][c] == board[r-1][c+1] && board[r-1][c+1] == board[r-2][c+2] && board[r-2][c+2] == board[r-3][c+3]) {
                    setWinner(r, c);
                    return;
                }
            }
        }
    }
}

function setWinner(r, c) {
    let winner = document.getElementById("winner");
    if (board[r][c] == playerRed) {
        winner.innerText = "Merah Menang Kuning Kalah";             
        scoreRed += 1;
    } else {
        winner.innerText = "Kuning Menang Merah Kalah";
        scoreYellow += 1;
    }
    gameOver = true;
    updateScores();
}

function updateScores() {
    document.getElementById("scoreRed").innerText = scoreRed;
    document.getElementById("scoreYellow").innerText = scoreYellow;
}

function restartGame() {
    currPlayer = playerRed;
    gameOver = false;
    document.getElementById("winner").innerText = "";
    setGame();
    updategiliran(); // Reset indikator giliran pemain saat game dimulai ulang
}

function playMusic() {
    document.getElementById("gameMusic").play();
}

function stopMusic() {
    document.getElementById("gameMusic").pause();
}

function updategiliran() {
    let giliran = document.getElementById("giliran");
    if (currPlayer == playerRed) {
        giliran.innerText = "Giliran: Pemain Merah";
        giliran.style.color = "#e74c3c";
    } else {
        giliran.innerText = "Giliran: Pemain Kuning";
        giliran.style.color = "#f1c40f";
    }
}
