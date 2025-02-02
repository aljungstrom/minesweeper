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
    placeMines();
    
    // Uppdatera count-fältet för varje position på spelplanen (board).
    updateCounts();
    
}

/*
Uppgift 1: skriv en funktion som lägger till rätt antal minor på
planen (board).  Detta ska ske slumpmässigt. 

Tips: använd Math.random()
*/
function placeMines(){
    //complete me
}

/*
Uppgift 2: skriv en funktion som uppdaterar count-fältet i board så
att det stämmer överens med antalet intilliggande bomber.

Exempel: Om 

(i) board[0][1] och board[1][0] är bomber 
(ii) board[1][1] inte är en bomb

så ska board[0][0] ha count 2.
*/
function updateCounts(){
    //complete me
}

/*
Uppgift 3: Skriv en funktion som tar två heltal (i,j) och avslöjar
huruvida board[i][j] är en bomb eller inte. Här kommer instruktioner:

1. Om positionen redan är avsöljad (revealed-fältet är true) eller
(i,j) inte är en giltig position så ska ingenting mer göras. Om detta inte
är fallet ska revealed sättas till true och vi går vidare till steg 2.

2. Om vi steg på en mina är spelet över och ett nedlåtande meddelande
ska skrivas ut till användaren.  

3. Om vi steg på en position som inte
har några minor som grannar ska vi även avslöja alla grannar. Tips:
rekursion.

4. När detta är klart kallar vi på renderBoard() för att uppdatera
spelplanen för användaren.
*/
function revealCell(i,j) {
    // complete me
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
