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
        // check for legal move
        let valid = true
        if (board[row][column].getValue() === 0){
            board[row][column].updateValue(marker);
            valid = true;
        } else {
            valid = false
        }
        
        //check if all spots filled
        let fullBoard = true;
        for (let i = 0; i < rows; i++){
            for (let j = 0; j < columns; j++){
                let currentSpace = board[i][j].getValue();
                if (currentSpace === 0){
                    fullBoard = false;
                    break
                }
            }
            if (fullBoard === false){
                break
            }
        }

        //check for winner
        let winner = false;

        if (board[row][0].getValue() === marker && board[row][1].getValue() === marker && board[row][2].getValue() === marker){
            winner = true;
        } else if (board[0][column].getValue() === marker && board[1][column].getValue() === marker && board[2][column].getValue() === marker){
            winner = true;
        } else if(row === 0 && column === 0 || row === 1 && column === 1 || row === 2 && column === 2){
            if (board[0][0].getValue() === marker && board[1][1].getValue() === marker && board[2][2].getValue() === marker){
                winner = true;
            }
        } else if(row === 2 && column === 0 || row === 1 && column === 1 || row === 0 && column === 2) {
            if (board[2][0].getValue() === marker && board[1][1].getValue() === marker && board[0][2].getValue() === marker){
                winner = true;
            }
        }

        return {valid, fullBoard, winner}
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
    let gameOver = false;
    // play one round
    const playRound = function(){
        while(!gameOver){
            //activePlayer selects move
            let keepGoing = true;
            let moveResults ;

            while(keepGoing){
                let playerRow = prompt(`${activePlayer.name}, you're up! What row do you want to place your marker in?`);
                playerRow -= 1;
                let playerColumn = prompt("What column do you want to go in?");
                playerColumn -= 1;
                moveResults = playingBoard.updateBoard(playerRow, playerColumn, activePlayer.marker);

            // check if move is legal
                if (moveResults.valid){
                    keepGoing = false;
                } else {
                    console.log("Invalid Selection. Try again");
                }
            }

            playingBoard.displayBoard();

            // check for win condition or full board
            if (moveResults.fullBoard){
                console.log("GAME OVER");
                return gameOver = true;
                // return
            }

            if (moveResults.winner){
                console.log(`${activePlayer.name} wins!`)
                gameOver = true;
                return
            }

            // change activePlayer
            if (activePlayer.playerNumber === 1){
                activePlayer = playerCreation.players[1];
            } else {
                activePlayer = playerCreation.players[0];
            }

            // playRound()
        }
    }
    //playRound();
    return {playRound}
}


let startGame = Gameflow();
startGame.playRound();
