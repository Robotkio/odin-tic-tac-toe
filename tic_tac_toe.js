/* core tic tac toe game function, all it does is enforce game
   rules and play
*/
function ticTacToe () {
    const board = [[0,0,0], [0,0,0], [0,0,0]];
    let currentPlayer = 1;
    let turns = 0;
    let gameStatus = 0;
    /* gameStatus tracks the state of the game:
       -1 : game ended in a draw
        0 : game continues 
        1 : player 1 has won
        2 : player 2 has won
    */
    const newGame = () => {
        gameStatus = 0;
        currentPlayer = 1;
        turns = 0;
        board[0] = [0,0,0];
        board[1] = [0,0,0];
        board[2] = [0,0,0];
    };
    const whosTurn = () => {
        return currentPlayer;
    };
    const getBoard = () => {
        return Array.from(board);
    }
    /* attempts to make a play as the current player
       returns game status 
    */
    const play = (x, y) => {
        if(gameStatus) { return gameStatus };
        if(board[y][x]) { return 0; }
        board[y][x] = currentPlayer; 
        turns++;
        currentPlayer = currentPlayer === 1 ? 2 : 1;
        return updateGameState();
    };
    /* checks state of game and returns new state */
    const updateGameState = () => {
        // can't win before turn 5
        if(turns < 5) {
            return gameStatus = 0;
        }
        // start with all the columns
        let allSets = Array.from(board);
        // add all the rows
        for(let y = 0; y <= 2; y++) {
            allSets.push([board[0][y],board[1][y],board[2][y]]);
        }
        // add the two diagonals 
        allSets.push([board[0][0],board[1][1],board[2][2]]);
        allSets.push([board[2][0],board[1][1],board[0][2]]);
        // check them all
        for(let i = 0; i < allSets.length; i++) {
            // ignore set if it starts with 0
            if(!allSets[i][0]) { continue; }
            // check if set matches
            if(allSets[i][0] === allSets[i][1] && 
               allSets[i][0] === allSets[i][2]) {
                return gameStatus = allSets[i][0];
            }
        }
        // if 9 turns then tie
        if(turns >= 9) { 
            return gameStatus = -1;
        }
        return gameStatus = 0;
    }
    return { newGame, play, getBoard, whosTurn };
}