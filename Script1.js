// JavaScript source code
let board = [];
let WIDTH = 7;
let HEIGHT = 6;
let currentPlayer = 1;
document.body.style.backgroundImage = "url('https://wallpaperaccess.com/full/5620839.jpg')";

function startGame() {

    let start = document.getElementById("start");
    let gameBox = document.getElementById("game");
    /*let gameBoxBorder = document.getElementsByClassName("gameWindow");*/
    start.classList.add("playing");
    //gameContainer.classList.remove("hiddenGameWindow");
    //gameContainer.classList.add("gameWindow");
    document.body.style.backgroundImage = "url('https://wallpaperaccess.com/full/5620839.jpg')";
    /*gameContainer.style.display = "block";*/
    /*gameBox.style.display = "flex";*/

}

let startBtn = document.getElementById("start-button");
startBtn.addEventListener("click", startGame);

function makeBoard() {
    // TODO: set "board" to empty HEIGHT x WIDTH matrix array
    for (let row = 0; row < HEIGHT; row++) {
        board.push(Array.from({ length: WIDTH }));
    }

}

function makeRealBoard() {

    let realBoard = document.getElementById("board");

    let topofBoard = document.createElement("tr");
    topofBoard.setAttribute("id", "top-column");
    topofBoard.addEventListener("click", playerClick);


    for (let x = 0; x < WIDTH; x++) {
        let topCell = document.createElement("td");
        topCell.setAttribute("id", x);
        topCell.classList.add("myTopCells");
        /*topCell.innerText = "Drop a Tile";*/  /*i decided i didnt want any text here.*/
        topofBoard.append(topCell);

    }
    realBoard.append(topofBoard);

    for (let y = 0; y < HEIGHT; y++) {
        let row = document.createElement("tr");
        for (let x = 0; x < WIDTH; x++) {
           let cell = document.createElement("td");
            cell.setAttribute("id", `${y}-${x}`);
            cell.classList.add("myCells");
            row.append(cell);
        }
        realBoard.append(row);
    }
}

function chooseDropDownColumn(x) {
    for (let y = HEIGHT - 1; y >= 0; y--) {
        if (!board[y][x]) {
            return y;
        }
    }
    return null;
}

function placeTile(y, x) {
    let tile = document.createElement("div");
    tile.classList.add('piece'); /*create this class in cs*/
    tile.classList.add(`player${currentPlayer}`); /*create this player1 + player 2 class in cs*/
    let tileParent = tile.parentElement;
    const takenSpace = document.getElementById(`${y}-${x}`);

    takenSpace.append(tile);
    takenSpace.style.backgroundColor = "rgba(227, 171, 204, 0.39)";
    /*currentPlayer = currentPlayer === 1 ? 2 : 1;*/

}

function endGame(msg) {
    alert(msg);
    // TODO: pop up alert message
    endGameScreen();
}

function playerClick(evt) {
    // get x from ID of clicked cell
    let x = +evt.target.id;

    // get next spot in column (if none, ignore click)
    let y = chooseDropDownColumn(x);
    if (y === null) {
        return;
    }

    // place piece in board and add to HTML table

    // TODO: add line to update in-memory board


    board[y][x] = currentPlayer;
    placeTile(y, x);


    if (checkForWin()) {


        return endGame(`Player ${currentPlayer} is the winner!`);
    }
    if (board.every(row => row.every(cell => cell))) {
        return endGame('Tie!');
    }
    currentPlayer = currentPlayer === 1 ? 2 : 1;

}

function checkForWin() {
    function _win(cells) {

        return cells.every(
            ([y, x]) =>
                y >= 0 &&
                y < HEIGHT &&
                x >= 0 &&
                x < WIDTH &&
                board[y][x] === currentPlayer
        );
    }
    for (var y = 0; y < HEIGHT; y++) {
        for (var x = 0; x < WIDTH; x++) {
            var horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
            var vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
            var diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
            var diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

            if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
                return true;
            }
        }
    }

}

function endGameScreen() {
    let start = document.getElementById("start");
    let gameBox = document.getElementById("game");
    let button = document.getElementById("start-button");
    let restartButton = document.getElementById("restart-button");
    /*button.innerText = "Play Again?";*/
    /*document.body.style.backgroundColor = "black";*/
    button.style.visibility = "hidden";
    restartButton.style.visibility = 'visible';
    start.classList.remove("playing");
    gameContainer.classList.remove("gameWindow");
    gameContainer.classList.add("hiddenGameWindow");
}


makeBoard();
makeRealBoard();
console.log(board);


