// Antal rader, kolumner och minor (dessa kan ni ändra hur ni vill)
const numRows = 8;
const numCols = 8;
const numMines = 10;

// Spelplanen (som användaren ser) 
const gameBoard =
    document.getElementById(
        "gameBoard"
    );

// Spelplanen representerad som en array av arrayer (tom från början)
let board = [];


// Funktion för initialisering av spelplanen
function init() {
    //En plats (i,j) på spelplanne är ett uppslagsverk med tre fält:
    // isMine : Boolean
    // revealed : Boolean
    // count : int (antal intilliggande bomber)
    for (let i = 0; i < numRows; i++) {
        board[i] = [];
        for (
            let j = 0;
            j < numCols;
            j++
        ) {
            board[i][j] = {
                isMine: false,
                revealed: false,
                count: 0,
            };
        }
    }

    // Placera slumpmässigt ut minor
    place_mines();
    
    // Uppdatera count-fältet för varje position på spelplanen (board).
    update_counts();
    
}

/*
Uppgift 2: skriv en funktion som uppdaterar count-fältet i board så
att det stämmer överens med antalet intilliggande bomber.

Exempel: Om 

(i) board[0][1] och board[1][0] är bomber 
(ii) board[1][1] inte är en bomb

så ska board[0][0] ha count 2.
*/
function update_counts(){
    for (let i = 0; i < numRows; i++) {
        for (
            let j = 0;
            j < numCols;
            j++
        ) {
            if (!board[i][j].isMine) {
                let count = 0;
                for (
                    let dx = -1;
                    dx <= 1;
                    dx++
                ) {
                    for (
                        let dy = -1;
                        dy <= 1;
                        dy++
                    ) {
                        const ni =
                            i + dx;
                        const nj =
                            j + dy;
                        if (
                            ni >= 0 &&
                            ni <
                                numRows &&
                            nj >= 0 &&
                            nj <
                                numCols &&
                            board[ni][
                                nj
                            ].isMine
                        ) {
                            count++;
                        }
                    }
                }
                board[i][j].count =
                    count;
            }
        }
    }
}

/*
Uppgift 1: skriv en funktion som lägger till rätt antal minor på
planen (board).  Detta ska ske slumpmässigt. 

Tips: använd Math.random()
*/
function place_mines(){
    let minesPlaced = 0;
    while (minesPlaced < numMines) {
        const row = Math.floor(
            Math.random() * numRows
        );
        const col = Math.floor(
            Math.random() * numCols
        );
        if (!board[row][col].isMine) {
            board[row][
                col
            ].isMine = true;
            minesPlaced++;
        }
    }
}

/*
Uppgift 3: Skriv en funktion som tar två heltal (i,j) och avslöjar
huruvida board[i][j] är en bomb eller inte. Här kommer instruktioner:

1. Om positionen redan är avsöljad (revealed-fältet är true) eller
(i,j) inte är en giltig position så ska ingenting göras. Om detta inte
är fallet ska revealed sättas till true och vi går vidare till steg 2.

2. Om vi steg på en mina är spelet över och ett nedlåtande meddelande
ska skrivas ut till användaren.  

3. Om vi steg på en position som inte
har några minor som grannar ska vi även avslöja alla grannar. Tips:
rekursion.
*/
function revealCell(row, col) {
    if (
        row < 0 ||
        row >= numRows ||
        col < 0 ||
        col >= numCols ||
        board[row][col].revealed
    ) {
        return;
    }

    board[row][col].revealed = true;

    if (board[row][col].isMine) {
        // Handle game over
        alert(
            "Game Over! You stepped on a mine."
        );
    } else if (
        board[row][col].count === 0
    ) {
        // If cell has no mines nearby,
        // Reveal adjacent cells
        for (
            let dx = -1;
            dx <= 1;
            dx++
        ) {
            for (
                let dy = -1;
                dy <= 1;
                dy++
            ) {
                revealCell(
                    row + dx,
                    col + dy
                );
            }
        }
    }
    renderBoard();
}

//funktion som genererar spelplanen från board
function renderBoard() {
    gameBoard.innerHTML = "";

    for (let i = 0; i < numRows; i++) {
        for (let j = 0; j < numCols; j++) {
            const cell = document.createElement("div");
            cell.className = "cell";
            if (board[i][j].revealed) {
		cell.classList.add("revealed");
                if (board[i][j].isMine) {
                    cell.classList.add("mine");
                    cell.textContent = "????";
		}
		else if ( board[i][j].count >0 ) {
                    cell.textContent = board[i][j].count;
		}
            }
            cell.addEventListener("click", () => revealCell(i, j));
            gameBoard.appendChild(cell);
        }
        gameBoard.appendChild(document.createElement("br"));
    }
}

init();
renderBoard();
