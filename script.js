let gameBoard = (() => {
    let board = ['', '', '', 
                 '', '', '', 
                 '', '', ''];
    return {board}
})();


function Player (name, marker) {
    this.name = name;
    this.marker = marker;
}

let user1;
let user2;



const playerCreation = (() => {
    const blackBackground = document.querySelector('.blackBackground')
    const playerNameSelection = document.querySelector('.playerNameSelection')
    const startBtn = document.getElementById('startBtn')
    startBtn.addEventListener('click', () => {
        let playerOneInput = document.getElementById('playerOne');
        let playerOneName = playerOneInput.value || 'Player 1';

        let playerTwoInput = document.getElementById('playerTwo');
        let playerTwoName = playerTwoInput.value || 'Player 2';
        
        const playerX = new Player(playerOneName, 'X');
        const playerO = new Player(playerTwoName, 'O');
            
        user1 = playerX;
        user2 = playerO;
        
        //removes the name form and starts a new game
        clearNameForm();
        playGame.addClick();
    })

    const clearNameForm = () => {
        blackBackground.style.display = 'none';
        playerNameSelection.style.display = 'none';
    }

    return {blackBackground}
})();


//updates the board every time a move is made
const displayController = () => {
    const boardHTML = document.querySelectorAll('.board');
    for (let i = 0; i < gameBoard.board.length; i++) {
        boardHTML[i].innerText = gameBoard.board[i];
    }
}



const playGame = (() => {

    let playerTurn = 0
    let playerName = ""

    let {board} = gameBoard;
    let boardHTML = document.querySelectorAll('.board');
    let winAnnouncement = document.querySelector('.winAnnouncement');
    let restartBtn = document.getElementById('restartBtn');
    
    //place marker and swap between player turns
    let playerMoves = (e) => {
        if (playerTurn == 0) {
            if (e.target.textContent == '') {
            e.stopPropagation();
            board[`${e.target.id}`] = user1.marker;
            playerName = user1.name;
            checkWin();
            switchPlayer();
            }
        } else if (playerTurn == 1) {
            if (e.target.textContent == '') {
            e.stopPropagation();
            board[`${e.target.id}`] = user2.marker;
            playerName = user2.name;
            checkWin();
            switchPlayer();
            }
}
displayController();
}

//add and remove clickability from the gameboard
function addClick() {
    boardHTML.forEach((el) => el.addEventListener('click', playerMoves))
}

function removeClick() {
    boardHTML.forEach((el) => el.removeEventListener('click', playerMoves))    
}

const switchPlayer = () => {
    playerTurn === 0 ? playerTurn = 1 : playerTurn = 0;
}

const checkWin = () => {

    if (board[0] === board[1] && board[1] === board[2] && board[0] !== '') {gameOver(); console.log(`${playerName} Wins!`)} 
    if (board[3] === board[4] && board[4] === board[5] && board[3] !== '') {gameOver(); console.log(`${playerName} Wins!`)}
    if (board[6] === board[7] && board[7] === board[8] && board[6] !== '') {gameOver(); console.log(`${playerName} Wins!`)}
    if (board[0] === board[3] && board[3] === board[6] && board[0] !== '') {gameOver(); console.log(`${playerName} Wins!`)}
    if (board[1] === board[4] && board[4] === board[7] && board[1] !== '') {gameOver(); console.log(`${playerName} Wins!`)}
    if (board[2] === board[5] && board[5] === board[8] && board[2] !== '') {gameOver(); console.log(`${playerName} Wins!`)}
    if (board[0] === board[4] && board[4] === board[8] && board[0] !== '') {gameOver(); console.log(`${playerName} Wins!`)}
    if (board[2] === board[4] && board[4] === board[6] && board[2] !== '') {gameOver(); console.log(`${playerName} Wins!`)}
    if (board[0] !== '' && board[1] !== '' && board[2] !== '' && board[3] !== '' && board[4] !== '' && board[5] !== '' && board[6] !== '' && board[7] !== '' && board[8] !== '') {draw();}
}


const restartGame = () => {

    addClick();

    board = ['', '', '', '', '', '', '', '', ''];
    gameBoard.board = board;
    playerTurn = 0
    restartBtn.style.visibility = 'hidden';
    winAnnouncement.textContent = ""
    winAnnouncement.visibility = 'hidden';
    displayController();
    console.log(board)
    console.log(gameBoard.board)
}

const gameOver = () => {
    removeClick();
    restartBtn.style.visibility = 'visible';
    restartBtn.addEventListener('click', restartGame);
    winAnnouncement.textContent = `${playerName} Wins!`
}

const draw = () => {
    removeClick();
    restartBtn.style.visibility = 'visible';
    restartBtn.addEventListener('click', restartGame);
    winAnnouncement.textContent = `The Game Ends in a Draw!`
}
return {
    addClick,
}
})();
