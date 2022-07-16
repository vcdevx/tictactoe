const gameBoard = (() => {
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

        clearNameForm();
    })
    const clearNameForm = () => {
        blackBackground.style.display = 'none';
        playerNameSelection.style.display = 'none';
    }
})();



const displayController = () => {
    const boardHTML = document.querySelectorAll('.board');
    for (let i = 0; i < gameBoard.board.length; i++) {
        boardHTML[i].innerText = gameBoard.board[i];
    }
}



const playGame = (() => {
    let playerTurn = 0;
    const {board} = gameBoard;

    let boardHTML = document.querySelectorAll('.board');
    let playerSwitch = () => {
        if (playerTurn == 1) {
        boardHTML.forEach(el => { el.addEventListener('click', (e) => {
            if (board[`${e.target.id}`] === '') {
            e.stopPropagation();
            board[`${e.target.id}`] = user1.marker;
            }
            displayController();
            playerTurn = 0;
            playerSwitch();
    })
        })
    } else {
            boardHTML.forEach(el => { el.addEventListener('click', (e) => {
                if (board[`${e.target.id}`] === '') {
                e.stopPropagation();
                board[`${e.target.id}`] = user2.marker;
                }
                displayController();
                playerTurn = 1; 
                playerSwitch();
            })
    })
}
}

playerSwitch();
return {playerTurn}
})();




//Check name & board status
const checkName = () => {
    console.log(user1)
    console.log(user2)
    console.log(gameBoard.board)
    console.log(playGame.playerTurn)
}