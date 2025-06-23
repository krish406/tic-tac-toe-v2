const Board = (function(){
    let board = [[' ',' ',' '],[' ',' ',' '],[' ',' ',' ']];
    let available_locations = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    let currentSymbol = '';

    const changeSymbol = function(){
        currentSymbol = this.symbol;
    }
    
    const createBoard = function(){
        let squares = document.querySelectorAll('.square');
        squares.forEach((square, index) => {
            square.addEventListener('click', () => {
                let indexToFind = available_locations.indexOf(index + 1);
                if (indexToFind > -1){
                    square.textContent = available_locations[indexToFind];
                    available_locations.splice(indexToFind, 1);
                }
                else{
                    console.log('index has been taken!!');
                }
            });
        })
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

        return true;
    }

    return {
        createBoard, 
        checkBoard, 
        changeSymbol
    }
})();

const Player = function(name, symbol){
    let winState = false;
    
    const getWinState = () => {
        return winState;
    }

    let toggleWinState = () => {
        winState = !winState;
    }

    return {name, symbol, getWinState, toggleWinState}
};

const gameController = (function(){
    let playerWon = false;
    let roundCounter = 1;
    let turn = ""; //Placeholder
    const checkBoard = Board.checkBoard;

    let playerOne = Player('Krish', 'O');
    let playerTwo = Player('Yash', 'X');
    
    const choosePlayer = function(){
        if(roundCounter % 2 == 1){
            turn = "Player One";
        }
        else{
            turn = "Player Two";
        }
    }

    const playGame = function(){
        while(!playerWon){
            choosePlayer();
    
            if(turn === "Player One"){
                playerOne.editBoard(locations[random]);
            }

            else if(turn === "Player Two"){
                playerTwo.editBoard(locations[random]);
            }
            
            if(checkBoard()){
                playerWon = true;
                break;
            };

            roundCounter++;
        }
    }
    return {
        playGame
    }
})();

Board.createBoard();