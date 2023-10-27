// Tracks the score of the pieces for the win
let scoreB = 0;
let scoreR = 0;

// Changes the scoreboard
let piecesB = 12;
let piecesR = 12;

// Positions(IDs) of the pieces on the board
const board = [
    ['a1', 'b1', 'c1', 'd1', 'e1', 'f1', 'g1', 'h1'],
    ['a2', 'b2', 'c2', 'd2', 'e2', 'f2', 'g2', 'h2'],
    ['a3', 'b3', 'c3', 'd3', 'e3', 'f3', 'g3', 'h3'],
    ['a4', 'b4', 'c4', 'd4', 'e4', 'f4', 'g4', 'h4'],
    ['a5', 'b5', 'c5', 'd5', 'e5', 'f5', 'g5', 'h5'],
    ['a6', 'b6', 'c6', 'd6', 'e6', 'f6', 'g6', 'h6'],
    ['a7', 'b7', 'c7', 'd7', 'e7', 'f7', 'g7', 'h7'],
    ['a8', 'b8', 'c8', 'd8', 'e8', 'f8', 'g8', 'h8']
];

// This is the trackable positions of the pieces on the board
// 1 means red pieces, 2 means black pieces
let piecePositions = [
    [0, 2, 0, 2, 0, 2, 0, 2],
    [2, 0, 2, 0, 2, 0, 2, 0],
    [0, 2, 0, 2, 0, 2, 0, 2],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [1, 0, 1, 0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0]
];

// To create the pieces that we need, either red or black
function makePiece(spot, color) {
    let aPiece = document.createElement('div');
    aPiece.setAttribute('class', color+"-piece");
    let specificSpot = document.getElementById(spot);
    specificSpot.appendChild(aPiece);
}

// To create a board at the beginning of the game
// or restart the game
function makeBoard() {
    for (let i = 7; i >= 0; i--) {
        for (let j = 7; j >= 0; j--) {
            let spot = board[i][j];
            if(piecePositions[i][j] === 1){
                makePiece(spot, 'red');
            } else if(piecePositions[i][j] === 2){
                makePiece(spot, 'black');
            } else {}
        }
    }
}
makeBoard();



// To give the functionality of moving to the pieces
function movePiece() {
    
}

// If the opponent makes the move we switch the turn to us
// or viceversa
function switchTurn() {
    
}

// To check if the spot nearby are moveable
function moveableSpots() {
    
}

// To restrict the moves of the pieces to the allowable spots
function moveRestriction() {
    
}

// If one piece reaces to the opponent's first row
// then they become a king which can move in any direction
function makeKing() {
    
}

// To check the condition to win
function whoWins() {
    
}

// Add eventListeners for movement
