function Gameboard() {
    const rows = 3;
    const columns = 3;
    const board = [];

    function space() {
        let value = 0;
        return {
            getValue: function(){
                return value
            },
            updateValue: function(marker){
                return value = marker;
            }
        };
    }

    for (let i = 0; i < rows; i++){
        board[i] = [];
        for (let j = 0; j < columns; j++){
            board[i].push(space());
        }
    }

    let getBoard = function(){
        // returns an instance of a blank board 
        return board;
    }

    let updateBoard = function(row, column, marker){
        // check if space is empty and place marker if empty
        if (board[row][column].getValue() === 0){
            board[row][column].updateValue(marker);
            return
        } else {
            return
        }
    }

    let displayBoard = function(){
        let printingBoard = [];
        for (let i = 0; i < rows; i++){
            printingBoard[i] = [];
            for (let j = 0; j < columns; j++){
                if (board[i][j].getValue() === 0){
                    printingBoard[i].push(" ");
                } else {
                    printingBoard[i].push(board[i][j].getValue());
                }
            }
        }
        console.log(printingBoard);
    }

    return {getBoard, updateBoard, displayBoard}
}

// Player factory
function Players() {
    let players = [];

    let createPlayer = function(name){
        if (players.length === 0){
            players.push({name: name, marker: "X", playerNumber: 1})
        } else {
            players.push({name: name, marker: "O", playerNumber: 2});
        }
    }

    return {players, createPlayer};
}

// Gameflow factory
function Gameflow(){
    // set up empty gameboard and players
    let playingBoard = Gameboard();
    let playerCreation = Players();
    playingBoard.displayBoard();

    // set up players
    let player1 = prompt("Player 1 Name: ")
    playerCreation.createPlayer(player1);
    console.log(playerCreation.players[0]);

    let player2 = prompt("Player 2 Name: ")
    playerCreation.createPlayer(player2);
    console.log(playerCreation.players[1]);

    let activePlayer = playerCreation.players[0];
    // play one round
    function playRound(){
        let playerRow = prompt(`${activePlayer.name}, you're up! What row do you want to place your marker in?`);
        playerRow -= 1;
        let playerColumn = prompt("What column do you want to go in?");
        playerColumn -= 1;
        playingBoard.updateBoard(playerRow, playerColumn, activePlayer.marker)
        playingBoard.displayBoard();
        if (activePlayer.playerNumber === 1){
            activePlayer = playerCreation.players[1];
        } else {
            activePlayer = playerCreation.players[0];
        }
        
        // add logic to check for playing in an already taken spot
        // add logic to check for winner
    }

    playRound();
    playRound();

}


let startGame = Gameflow();
