function t3Displayer (displayID) {
    // constant values
    const player1SvgData = ["alpha-x-box-outline","M9,7H11L12,9.5L13,7H15L13,12L15,17H13L12,14.5L11,17H9L11,12L9,7M5,3H19A2,2 0 0,1 21,5V19A2,2 0 0,1 19,21H5A2,2 0 0,1 3,19V5A2,2 0 0,1 5,3M5,5V19H19V5H5Z"];
    const player2SvgData = ["alpha-o-box-outline","M5,3H19A2,2 0 0,1 21,5V19A2,2 0 0,1 19,21H5A2,2 0 0,1 3,19V5A2,2 0 0,1 5,3M5,5V19H19V5H5M11,7H13A2,2 0 0,1 15,9V15A2,2 0 0,1 13,17H11A2,2 0 0,1 9,15V9A2,2 0 0,1 11,7M11,9V15H13V9H11Z"];
    const blankSpaceSvgData = ["checkbox-blank-outline","M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3M19,5V19H5V5H19Z"];
    const player1Class = "player-1";
    const player2Class = "player-2";
    const inactivePlayerClass = "inactive-player";
    const tieClass = "tie";
    const cellSelector = `#${displayID} .cell`;
    const resetButtonText_reset = "Reset Game";
    const resetButtonText_replay = "Play Again";
    // element queries
    const boardContainer = document.querySelector(`#${displayID} .board-container`);
    const p1Tab = document.querySelector(`#${displayID} .player-tab.player-1`);
    const p2Tab = document.querySelector(`#${displayID} .player-tab.player-2`);
    const resetButton = document.querySelector(`#${displayID} .reset-button`);
    const displayBoard = document.querySelector(`#${displayID} .board`);
    // setup
    const game = ticTacToe();
    resetButton.addEventListener("click", () => {
        newGame();
    });
    // methods
    const newGame = () => {
        game.newGame();
        _render();
        _addClickFunctions();
        resetButton.innerText = resetButtonText_reset;
    };
    const play = (x, y) => {
        const gameState = game.play(x, y);
        switch (gameState) {
            case 1: // p1 won
                _renderBoard();
                resetButton.innerText = resetButtonText_replay;
                break;
            case 2: // p2 won
                resetButton.innerText = resetButtonText_replay;
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
                _render();
                _addClickFunctions();
                break;
            default:
                _render();
                _addClickFunctions();
                console.warn("invalid switch case in play()");
        }
    };
    // internal functions
    function _makeSvg(t, d) {
        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
        svg.setAttribute("viewBox", "0 0 24 24");
        const title = document.createElement("title");
        title.innerText = t;
        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttribute("d", d);
        svg.appendChild(title);
        svg.appendChild(path);
        return svg;
    }
    function _render() {
        _renderTabs();
        _renderBoard();
    }
    function _clearBoard() {
        const cells = document.querySelectorAll(cellSelector);
        cells.forEach( cell => cell.remove() );
    }
    function _renderTabs() {
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
                console.error("invalid switch case in _renderTabs()");
        }
    }
    function _renderBoard() {
        _clearBoard();
        const localBoard = game.getBoard();
        for(let y = 0; y < localBoard.length; y++){
            for(let x = 0; x < localBoard[y].length; x++){
                const div = document.createElement("div");
                div.classList.add("cell");
                div.classList.add(`${x}-${y}`);
                let svgTitle, svgPath;
                switch (localBoard[y][x]) {
                    case 0:
                        svgTitle = blankSpaceSvgData[0];
                        svgPath = blankSpaceSvgData[1];
                        break;
                    case 1:
                        svgTitle = player1SvgData[0];
                        svgPath = player1SvgData[1];
                        break;
                    case 2:
                        svgTitle = player2SvgData[0];
                        svgPath = player2SvgData[1];
                        break;
                    default:
                        console.error("invalid switch case in _renderBoard()");
                }
                div.appendChild(_makeSvg(svgTitle, svgPath));
                displayBoard.appendChild(div);
            }
            
        }
    }
    function _addClickFunctions() {
        const cells = document.querySelectorAll(cellSelector);
        cells.forEach( (cell) => { 
            cell.addEventListener("click", (e) => {
                const coords = e.target.classList[1].toString();
                const x = Number(coords.charAt(0));
                const y = Number(coords.charAt(2));
                play(x, y);
            })
        });
    }
    // initialization
    _render();
    _addClickFunctions();
    return { play, newGame };
};

let g = new t3Displayer("tic-tac-toe");