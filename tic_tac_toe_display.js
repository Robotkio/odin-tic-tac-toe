function t3Displayer (displayID) {
    // constant values
    const player1SvcData = ["alpha-x-box-outline","M9,7H11L12,9.5L13,7H15L13,12L15,17H13L12,14.5L11,17H9L11,12L9,7M5,3H19A2,2 0 0,1 21,5V19A2,2 0 0,1 19,21H5A2,2 0 0,1 3,19V5A2,2 0 0,1 5,3M5,5V19H19V5H5Z"];
    const player2SvcData = ["alpha-o-box-outline","M5,3H19A2,2 0 0,1 21,5V19A2,2 0 0,1 19,21H5A2,2 0 0,1 3,19V5A2,2 0 0,1 5,3M5,5V19H19V5H5M11,7H13A2,2 0 0,1 15,9V15A2,2 0 0,1 13,17H11A2,2 0 0,1 9,15V9A2,2 0 0,1 11,7M11,9V15H13V9H11Z"];
    const blankSpaceSvcData = ["checkbox-blank-outline","M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3M19,5V19H5V5H19Z"];
    const player1Class = "player-1";
    const player2Class = "player-2";
    const inactivePlayerClass = "inactive-player";
    const tieClass = "tie";
    const id = displayID;
    // element queries
    const boardContainer = document.querySelector(`#${id} .board-container`);
    const p1Tab = document.querySelector(`#${id} .player-tab.player-1`);
    const p2Tab = document.querySelector(`#${id} .player-tab.player-2`);
    const game = ticTacToe();
    const resetButton = document.querySelector(`#${id} .reset-button`);
    const dispBoard = document.querySelector(`#${id} .board`);
    // setup
    resetButton.addEventListener("click", () => {
        newGame();
    });
    // methods
    const _makeSvc = (t, d) => {
        const svc = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svc.setAttribute("xmlns", "http://www.w3.org/2000/svg");
        svc.setAttribute("viewBox", "0 0 24 24");
        const title = document.createElement("title");
        title.innerText = t;
        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttribute("d", d);
        svc.appendChild(title);
        svc.appendChild(path);
        return svc;
    };
    const newGame = () => {
        game.newGame();
        _render();
        _addClickFunctions();
    };
    const _render = () => {
        _renderTabs();
        _renderBoard();
    };
    const _clearBoard = () => {
        const cells = document.querySelectorAll(`#${id} .cell`);
        cells.forEach( (cell) => {
            cell.remove();
        });
    };
    const _renderTabs = () => {
        switch(game.whosTurn()) {
            case 1:
                boardContainer.classList.add(player1Class);
                boardContainer.classList.remove(player2Class);
                p1Tab.classList.remove(inactivePlayerClass);
                p2Tab.classList.add(inactivePlayerClass);
                break;
            case 2:
                boardContainer.classList.remove(player1Class);
                boardContainer.classList.add(player2Class);
                p1Tab.classList.add(inactivePlayerClass);
                p2Tab.classList.remove(inactivePlayerClass);
                break;
            default:
                console.log("invalid switch case in _renderTabs()");
        }
    };
    const _renderBoard = () => {
        _clearBoard();
        const localBoard = game.getBoard();
        for(let y = 0; y < localBoard.length; y++){
            for(let x = 0; x < localBoard[y].length; x++){
                const div = document.createElement("div");
                div.classList.add("cell");
                div.classList.add(`${x}-${y}`);
                switch (localBoard[y][x]) {
                    case 0:
                        div.appendChild(_makeSvc(blankSpaceSvcData[0],blankSpaceSvcData[1]));
                        break;
                    case 1:
                        div.appendChild(_makeSvc(player1SvcData[0],player1SvcData[1]));
                        break;
                    case 2:
                        div.appendChild(_makeSvc(player2SvcData[0],player2SvcData[1]));
                        break;
                    default:
                        console.log("invalid switch case in _renderBoard()");
                }
                dispBoard.appendChild(div);
            }
        }
    };
    const _addClickFunctions = () => {
        const cells = document.querySelectorAll(`#${id} .cell`);
        cells.forEach( (cell) => { 
            cell.addEventListener("click", (e) => {
                const coords = e.target.classList[1].toString();
                const x = Number(coords.charAt(0));
                const y = Number(coords.charAt(2));
                play(x, y);
            })
        });
    };
    const play = (x, y) => {
        const gameState = game.play(x, y);
        switch (gameState) {
            case 1: // p1 won
                _renderBoard();
                break;
            case 2: // p2 won
                _renderBoard();
                break;
            case -1: // tie
                _renderBoard();
                p1Tab.classList.add(inactivePlayerClass);
                p2Tab.classList.add(inactivePlayerClass);
                boardContainer.classList.remove(player1Class);
                boardContainer.classList.remove(player2Class);
                boardContainer.classList.add(tieClass);
                break;
            case 0:
            default:
                _render();
                _addClickFunctions();
        }
    };
    _render();
    _addClickFunctions();
    return { play, newGame };
};

let g = new t3Displayer("tic-tac-toe");