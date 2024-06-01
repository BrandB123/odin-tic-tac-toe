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
        for (let i = 0; i < rows; i++){
            for (let j = 0; j < columns; j++){
                let printingSpace = document.querySelector(`.row-${i}.column-${j}`);
                if (board[i][j].getValue() === 0){
                    printingSpace.textContent = " ";
                } else {
                    printingSpace.textContent = board[i][j].getValue();
                }
            }
            document.querySelector(".class-1.class-2")
        }
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
    let player1Title = document.querySelector(`.player-1`);
    player1Title.textContent = playerCreation.players[0].name;

    let player2 = prompt("Player 2 Name: ")
    playerCreation.createPlayer(player2);
    let player2Title = document.querySelector(`.player-2`);
    player2Title.textContent = playerCreation.players[1].name;

    let activePlayer = playerCreation.players[0];
    let activePlayerTitle = document.querySelector(`.player-${activePlayer.playerNumber}`);
    activePlayerTitle.style.color = "red";

    // play one round
    // let gameOver = false;
    let body = document.querySelector("body");
    let endGameAnnouncement = document.createElement("div");
    endGameAnnouncement.className = "end-game";

    const playRound = function(event){
        //activePlayer selects move
        let keepGoing = true;
        let moveResults ;

        while(keepGoing){
            let target = event.target.classList;
            let playerRow = target[1];
            playerRow = playerRow.split("-");
            playerRow = Number(playerRow[1]);
            let playerColumn = target[2];
            playerColumn = playerColumn.split("-");
            playerColumn = Number(playerColumn[1]);
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
        if (moveResults.winner){
            endGameAnnouncement.textContent = `${activePlayer.name} wins!`;
            body.appendChild(endGameAnnouncement);
            console.log(`${activePlayer.name} wins!`)
            return
        }

        if (moveResults.fullBoard){
            endGameAnnouncement.textContent = "GAME OVER";
            body.appendChild(endGameAnnouncement);
            console.log("GAME OVER");
            return
        }

        // change activePlayer
        let activePlayerTitle = document.querySelector(`.player-${activePlayer.playerNumber}`);
        activePlayerTitle.style.color = "#eee";
        if (activePlayer.playerNumber === 1){
            activePlayer = playerCreation.players[1];
        } else {
            activePlayer = playerCreation.players[0];
        }
        activePlayerTitle = document.querySelector(`.player-${activePlayer.playerNumber}`);
        activePlayerTitle.style.color = "red";
    }
    return {playRound}
}

let startGame = Gameflow();

let gameContainer = document.querySelector(".game-container");
gameContainer.addEventListener("click", (event) => {
    startGame.playRound(event);
})
