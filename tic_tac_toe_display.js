function t3Displayer (displayID) {
    const player1 = ["alpha-x-box-outline","M9,7H11L12,9.5L13,7H15L13,12L15,17H13L12,14.5L11,17H9L11,12L9,7M5,3H19A2,2 0 0,1 21,5V19A2,2 0 0,1 19,21H5A2,2 0 0,1 3,19V5A2,2 0 0,1 5,3M5,5V19H19V5H5Z"];
    const player2 = ["alpha-o-box-outline","M5,3H19A2,2 0 0,1 21,5V19A2,2 0 0,1 19,21H5A2,2 0 0,1 3,19V5A2,2 0 0,1 5,3M5,5V19H19V5H5M11,7H13A2,2 0 0,1 15,9V15A2,2 0 0,1 13,17H11A2,2 0 0,1 9,15V9A2,2 0 0,1 11,7M11,9V15H13V9H11Z"];
    const blankSp = ["checkbox-blank-outline","M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3M19,5V19H5V5H19Z"];
    const player1Class = "player-1";
    const player2Class = "player-2";
    const id = displayID;
    const game = ticTacToe();
    const makeSvc = (t, d) => {
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
    };
    const clearBoard = () => {
        const cells = document.querySelectorAll(`#${id} .cell`);
        cells.forEach( (cell) => {
            cell.remove();
        });
    };
    const render = () => {
        clearBoard();
        renderTabs();
        renderBoard();
    }
    const renderBoard = () => {
        const localBoard = game.getBoard();
        const dispBoard = document.querySelector(`#${id} .board`);
        for(let y = 0; y < localBoard.length; y++){
            for(let x = 0; x < localBoard[y].length; x++){
                const div = document.createElement("div");
                div.classList.add("cell");
                div.classList.add(`${x}-${y}`);
                switch (localBoard[y][x]) {
                    case 0:
                        div.appendChild(makeSvc(blankSp[0],blankSp[1]));
                        break;
                    case 1:
                        div.appendChild(makeSvc(player1[0],player1[1]));
                        break;
                    case 2:
                        div.appendChild(makeSvc(player2[0],player2[1]));
                        break;
                }
                dispBoard.appendChild(div);
            }
        }
    };
    const renderTabs = () => {
        const boardContainer = document.querySelector(`#${id} .board-container`);
        const p1t = document.querySelector(`#${id} .player-tab.player-1`);
        const p2t = document.querySelector(`#${id} .player-tab.player-2`);
        switch(game.whosTurn()) {
            case 1:
                boardContainer.classList.add(player1Class);
                boardContainer.classList.remove(player2Class);
                p1t.classList.remove("inactive-player");
                p2t.classList.add("inactive-player");
                break;
            case 2:
                boardContainer.classList.remove(player1Class);
                boardContainer.classList.add(player2Class);
                p1t.classList.add("inactive-player");
                p2t.classList.remove("inactive-player");
                break;
        }
    };
    const addClickFunctions = () => {
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
        const response = game.play(x, y);
        render();
        addClickFunctions();
    };
    render();
    addClickFunctions();
    return { play, newGame };
};

let g = new t3Displayer("tic-tac-toe");