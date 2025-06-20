const Board = (function(){
    let board = [[' ',' ',' '],[' ',' ',' '],[' ',' ',' ']];
    let available_locations = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    const drawBoard = function(){
        board.forEach((row, index) => {
            row.forEach((cell, index) => {
                if (index < 2){
                    process.stdout.write(cell + '|');
                }
                else if (index == 2){
                    process.stdout.write(cell);
                }
            });
            if (index < 2){
                console.log('');
                console.log('-+-+-')
            }
        });
        console.log();
        console.log();
    }

    const editBoard = function(location){
        let row = Math.floor((location - 1) / 3);
        let column = (location - 1) % 3;
        board[row][column] = this.symbol;
        available_locations[location] = ' ';
        drawBoard();
    }

    const showRemaining = function(){
        available_locations.forEach(value => {
            if(value != ' '){
                process.stdout.write(value + ' ');
                console.log();
            }
        });
    }

    const checkBoard = function(){
        for(let i = 0; i < 3; i++){
            if ((board[i][0] != ' ' && board[i][1] != ' ' && board[i][2] != ' ') && (board[i][0] === board[i][1]) && (board[i][1] === board[i][2])){
                return true;
            }
        }

        for(let j = 0; j < 3; j++){
            if ((board[0][j] != ' ' && board[1][j] != ' ' && board[2][j] != ' ') && (board[0][j] === board[1][j]) && (board[1][j] === board[2][j])) {
                return true;
            }
        }

        if((board[0][0] === board[1][1]) && (board[1][1] === board[2][2]) && (board[0][0] != ' ' && board[1][1] != ' ' && board[2][2] != ' ')){
            return true;
        }

        if((board[2][0] === board[1][1]) && (board[1][1] === board[0][2]) && (board[2][0] != ' ' && board[1][1] != ' ' && board[0][2] != ' ')){
            return true;
        }

        for(let i = 0; i < 3; i++){
            for(j = 0; j < 3; j++){
                if(board[i][j] === ' '){
                    return false;
                }
            }
        }

        return false;
    }

    return {
        drawBoard, 
        editBoard, 
        checkBoard, 
        showRemaining
    }
})();

const Player = function(name, symbol){
    const editBoard = Board.editBoard;
    let winState = false;
    
    const getWinState = () => {
        return winState;
    }

    let toggleWinState = () => {
        winState = !winState;
    }

    return {name, symbol, editBoard, getWinState, toggleWinState}
};

// const gameController = function(playerOne, playerTwo){
//     let playerWon = false;
//     let roundCounter = 1;
//     let turn = "";
//     const checkBoard = Board.checkBoard;
    
//     const choosePlayer = function(){
//         if(roundCounter % 2 == 1){
//             turn = "Player One";
//         }
//         else{
//             turn = "Player Two";
//         }
//     }

//     const playGame = function(){
//         while(!playerWon){
//             choosePlayer();
//             if(turn === "Player One"){
//                 playerOne.editBoard();
//             }

//             else if(turn === "Player Two"){
//                 playerTwo.editBoard();
//             }

//             if(checkBoard()){
//                 playerWon = true;
//                 break;
//             };

//             roundCounter++;
//         }
//     }
// }

let playerOne = Player('Krish', 'O');
let playerTwo = Player('Yash', 'X');

console.log(Board.checkBoard());