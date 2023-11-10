// Tracks the score of the pieces for the win
let scoreB = 0;
let scoreR = 0;

// Changes the scoreboard
let leftB = 12;
let leftR = 12;

let piecesR = document.querySelectorAll(".red-piece");
let piecesB = document.querySelectorAll(".black-piece");

// if this is true that means it's red's turn
let turn = true;

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
    aPiece.setAttribute('draggable', 'true');
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

// Find a spot's ID
function findID(spotID) {
    let x;
    let y;  
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            if(spotID.id === board[i][j]){
                x = j;
                y = i;
            }
        }
    }
    return [x, y];
}

// Change the position of the pieces every turn
function afterMove(original, selected) {
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            if(turn){
                if(selected.id === board[i][j]){
                    piecePositions[i][j] = 2
                }
            } else {
                if(selected.id === board[i][j]){
                    piecePositions[i][j] = 1
                }
            }
            if(original.id === board[i][j]){
                piecePositions[i][j] = 0;
            }
        }
    }
}

// If the opponent makes the move we switch the turn to us
// or viceversa
function switchTurn() {
    if(turn === true){
        whoseTurn.textContent = "Red's turn";
        for (let i = 0; i < piecesB.length; i++){
            piecesR[i].setAttribute('draggable', 'true');
            piecesB[i].setAttribute('draggable', 'false');
        }
        turn = false;
    } else {
        for(let i = 0; i < piecesR.length; i++){
            whoseTurn.textContent = "Black's turn";
            piecesR[i].setAttribute('draggable', 'true');
            piecesB[i].setAttribute('draggable', 'false');
        }
        turn = true;
    }
}
switchTurn();

function a(start, end) {
    let midCoords = [((start[0] + end[0])/2), ((start[1] + end[1])/2)];
    let midID = board[midCoords[1]][midCoords[0]]
    return midID;
}

// To check if the spot nearby are moveable
function moveableSpots(original, selected) {
    let startCoords = findID(original);
    let endCoords = findID(selected);

    let mid = document.getElementById(a(startCoords, endCoords));

    if (dp.classList.contains('king')) {
        let isAdjacent = Math.abs(startCoords[1] - endCoords[1]) === 1 && Math.abs(startCoords[0] - endCoords[0]) === 1;
        let isCapture = Math.abs(startCoords[1] - endCoords[1]) === 2 && Math.abs(startCoords[0] - endCoords[0]) === 2;

        if (isAdjacent || (isCapture && mid.children[0] &&
            ((mid.children[0].classList.contains('red-piece') && dp.classList.contains('black-piece')) ||
            (mid.children[0].classList.contains('black-piece') && dp.classList.contains('red-piece'))))) {
            return true;
        }
    } else {
        let direction = (dp.classList.contains('black-piece')) ? 1 : -1;

        let isAdjacent = startCoords[1] === endCoords[1] + direction &&
            (endCoords[0] === startCoords[0] + 1 || endCoords[0] === startCoords[0] - 1);
        let isCapture = startCoords[1] === endCoords[1] + 2 * direction &&
            (startCoords[0] === endCoords[0] - 2 || startCoords[0] === endCoords[0] + 2) &&
            mid.children[0] && mid.children[0].classList.contains((dp.classList.contains('red-piece')) ? 'black-piece' : 'red-piece');

        if (isAdjacent || (isCapture)) {
            return true;
        }
    }

    return false;
}

// To restrict the moves of the pieces to the allowable spots
function moveRestriction(original, selected) {
    let startCoords = findID(original);
    let endCoords = findID(selected);

    if (moveableSpots(original, selected)) {
    
        let mid = document.getElementById(a(startCoords, endCoords));

        if (dp.classList.contains('king') && Math.abs(startCoords[1] - endCoords[1]) === 2 && Math.abs(startCoords[0] - endCoords[0]) === 2) {
            mid.innerHTML = "";
            if (dp.classList.contains('red-piece')) {
                scoreR += 1;
            } else {
                scoreB += 1;
            }
            return true;
        } else if (Math.abs(startCoords[1] - endCoords[1]) === 1 && Math.abs(startCoords[0] - endCoords[0]) === 1) {
            return true;
        }
    }

    return false;
}

// If one piece reaces to the opponent's first row
// then they become a king which can move in any direction
function makeKing() {
     // Check if the moved piece has the class "red-piece" and is in the 8th row and is not already a king
     if(dp.classList.contains("red-piece") && chosenSquare.classList.contains("row8") && !dp.classList.contains("king")){
        dp.classList.add("king"); 
    } 
    // Check if the moved piece has the class "black-piece" and is in the 1st row and is not already a king
    else if (dp.classList.contains("black-piece") && chosenSquare.classList.contains("row1") && !dp.classList.contains("king")){
        dp.classList.add("king"); 
    }
}

// To check the condition to win
function updateWinStatus(winner) {
    
}

function whoWins() {
    if (scoreR === 12) {
        updateWinStatus("Red");
    } else if (scoreB === 12) {
        updateWinStatus("Black");
    }
}

// Add eventListeners for movement
// Got the idea of the event Listeners from https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/drag_event

let dp; // dragged piece

/* events fired on the draggable target */
document.addEventListener("drag", (event) => {
    console.log("dragging");
});

document.addEventListener("dragstart", (event) => {
    // store a reference on the dp element
    dp = event.target;
    // make it half transparent
    event.target.classList.add("dragging");
});

document.addEventListener("dragend", (event) => {
    // reset the transparency
    event.target.classList.remove("dragging");
});

/* events fired on the drop targets */
document.addEventListener("dragover", (event) => {
    // prevent default to allow drop
    event.preventDefault();
    },
    false
);

// highlight potential drop target when the draggable element enters it
document.addEventListener("dragenter", (event) => {
    let original = dp.parentNode;
    let selected = event.target;

    if(selected.classList.contains("green-spot") && selected.innerHTML === ""){
        if(moveRestriction(selected, original)){
            selected.style.backgroundColor = "grey";
        }
    }
});

document.addEventListener("dragleave", (event) => {
    // reset background of potential drop target when the draggable element leaves it
    if (event.target.classList.contains("green-spot")) {
        event.target.style.backgroundColor = "";
      }
});

document.addEventListener("drop", (event) => {
    // prevent default action (open as link for some elements)
    event.preventDefault();
    // move dp element to the selected drop target
    let original = dp.parentNode;
    let selected = event.target;

    if(selected.classList.contains("green-spot") && selected.innerHTML === ""){
        if(moveRestriction(selected, original)){
            selected.style.backgroundColor = "";
            afterMove(original, selected);
            original.removeChild(dp);
            selected.append(dp);
            whoWins();
            makeKing();
            switchTurn();
        }
    }
});