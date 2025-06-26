const Board = (function(){
    let board = [[' ', ' ', ' '], [' ', ' ', ' '], [' ', ' ', ' ']];
    let available_locations = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    let currentSymbol = '';

    let squares = document.querySelectorAll('.square');

    const locate = function(index){
        return available_locations.indexOf(index);
    }

    const board_splice = function(index){
        available_locations.splice(index, 1);
    }

    //if the board has an open space, return true (an empty space exists)
    //if the board is full return false
    const empty = function(){
        for(let i = 0; i < 3; i++){
            for(let j = 0; j < 3; j++){
                if(board[i][j] === ' '){
                    return true;
                }
            }
        }
        return false;
    }

    const changeSymbol = function(symbol){
        console.log(symbol);
        currentSymbol = symbol;
    }
    
    const modifyBoard = function(row, column){
        board[row][column] = currentSymbol;
        console.log(board);
        RenderBoard();
    }

    const RenderBoard = function(){
        squares.forEach((square, index) => {
            let row = Math.floor(index / 3);
            let column = index % 3;
            square.textContent = board[row][column];
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

        return false
    }

    return {
        checkBoard, 
        changeSymbol,
        modifyBoard,
        locate, 
        board_splice, 
        RenderBoard, 
        empty
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
    let round = 0;
    let winState = false;

    const modal = document.querySelector('dialog');
    modal.showModal();
    
    let playerOne = new Player('Krish', 'X');
    let playerTwo = new Player('Cristian', '0');
    let squares = document.querySelectorAll('.square');
    let game_text = document.querySelector('.gameplay-text');
    let currentPlayer = playerOne;


    const changePlayer = function(){
        if(round % 2 == 0){
            currentPlayer = playerOne;
        }

        else{
            currentPlayer = playerTwo;
        }
    }

    const createBoard = function(){
        game_text.textContent = `${currentPlayer.name}'s turn`;
        Board.changeSymbol(currentPlayer.symbol);
        
        squares.forEach((square, index) => {
            square.addEventListener('click', () => {
                if (!winState){
                    //find the square that was just clicked
                    let indexToFind = Board.locate(index + 1)
                    
                    //if the square hasn't been taken
                    if(indexToFind > -1){
                        
                        //modify the board at the specific location
                        Board.board_splice(indexToFind)
                        let row = Math.floor(index / 3);
                        let column = index % 3;
                        Board.modifyBoard(row, column);
                        
                        //after this modification, check if there is a win or tie
                        if(checkWinState()){
                            game_text.textContent = `${currentPlayer.name} Wins!!`
                        }

                        else if(!Board.empty()){
                            game_text.textContent = `Tie!!`;
                        }

                        //if there is no win or tie then we switch players
                        else{
                            round++;
                            changePlayer();
                            game_text.textContent = `${currentPlayer.name}'s turn`;
                            Board.changeSymbol(currentPlayer.symbol);
                        }

                    }

                    else{
                        console.log('cant render here');
                    }
                }
            });
        })
    }

    const checkWinState = function(){
        if (Board.checkBoard() || !Board.empty){
            winState = true;
        }
        return Board.checkBoard();
    }
    
    return {
        createBoard
    }
})();

gameController.createBoard();