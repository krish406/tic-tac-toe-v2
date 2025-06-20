// let Player = function(character){
//     this.character = character;
//     this.won = false;
// }

// Player.prototype.placeCharacter = function(location){
//     board[location] = this.character;
// }

// Player.prototype.toggleWin = function(){
//     this.won = !this.won;
// }

// let player1 = new Player(character)

/*
so i need to make the player be able to place and its win state needs to be toggleable
it needs to have access to the board so the player has to be nested inside the board scope 
somehow...
*/

const Board = (function(){
    let board = [[' ',' ',' '],[' ',' ',' '],[' ',' ',' ']];

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
        drawBoard();
    }

    return {
        drawBoard, 
        editBoard
    }
})();

const Player = function(name, symbol){
    const editBoard = Board.editBoard;
    return {name, symbol, editBoard}
};

const playerOne = Player('Krish', 'O');
playerOne.editBoard(5);
