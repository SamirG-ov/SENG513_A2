// Score for red pieces and black pieces.
let scoreR = 0;
let scoreB = 0;

// Represents the current turn, true for red, false for black
let turn = true;

let whoseTurn = document.querySelector('#whoseTurn');  // Display element for current player's turn
let scoreBTracker = document.querySelector('#scoreBTracker'); // Display element for black player's score
let scoreRTracker = document.querySelector('#scoreRTracker'); // Display element for red player's score
let win = document.querySelector('#win') // Display element for game win message
scoreBTracker.textContent = "Black's score: " + String(scoreB); // Initial display of black player's score
scoreRTracker.textContent = "Red's score: " + String(scoreR); // Initial display of red player's score

// 2D array representing the game board with spot positions
let board = [
    ['a8', 'b8', 'c8', 'd8', 'e8', 'f8', 'g8', 'h8'],
    ['a7', 'b7', 'c7', 'd7', 'e7', 'f7', 'g7', 'h7'],
    ['a6', 'b6', 'c6', 'd6', 'e6', 'f6', 'g6', 'h6'],
    ['a5', 'b5', 'c5', 'd5', 'e5', 'f5', 'g5', 'h5'],
    ['a4', 'b4', 'c4', 'd4', 'e4', 'f4', 'g4', 'h4'],
    ['a3', 'b3', 'c3', 'd3', 'e3', 'f3', 'g3', 'h3'],
    ['a2', 'b2', 'c2', 'd2', 'e2', 'f2', 'g2', 'h2'],
    ['a1', 'b1', 'c1', 'd1', 'e1', 'f1', 'g1', 'h1']
];

// 2D array to track positions of pieces
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

// Create and append a game piece of the specified color to a given spot
function makePiece(spot, color){
    let aPiece = document.createElement('div');
    aPiece.setAttribute('class', color+"-piece");
    aPiece.setAttribute('draggable', 'true');
    let specificSpot = document.getElementById(spot);
    specificSpot.appendChild(aPiece);
}

// Set up the initial game board with pieces in their starting positions
function makeBoard(){
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            let position = board[i][j];
            if(0 < piecePositions[i][j] && piecePositions[i][j] === 1){
                makePiece(position, 'red');
            } else if(piecePositions[i][j] === 2){
                makePiece(position, 'black');
            }
        }
    }
}
makeBoard(); // Initialize the game board

// Find the coordinates (x, y) of a given spot on the game board
function findId(selected){
    let x;
    let y;
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            if(selected.id === board[i][j]){
                x = j;
                y = i;
            }
        }
    }
    return [x, y]
}

// Update the piecePositions array based on the move made
function afterMove(selected, original){
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            if(turn){
                if(selected.id === board[i][j]){
                    piecePositions[i][j] = 1
                }
            } else {
                if(selected.id === board[i][j]){
                    piecePositions[i][j] = 2
                }
            }
            if(original.id === board[i][j]){
                piecePositions[i][j] = 0;
            }
        }
    }
}


let redPieces = document.querySelectorAll(".red-piece"); // Collection of all red game pieces
let blackPieces = document.querySelectorAll(".black-piece"); // Collection of all black game pieces

// Switch the turn between red and black players, update the display accordingly
function switchTurn(){
    if(turn === true){
        whoseTurn.textContent = "Red's turn";
        for (let i = 0; i < blackPieces.length; i++){
            redPieces[i].setAttribute('draggable', 'true');
            blackPieces[i].setAttribute('draggable', 'false');
        }
        turn = false;
    } else {
        for(let i = 0; i < redPieces.length; i++){
            whoseTurn.textContent = "Black's turn";
            blackPieces[i].setAttribute('draggable', 'true');
            redPieces[i].setAttribute('draggable', 'false');
        }
        turn = true;
    }
}
switchTurn(); // Set the initial turn

// Calculate the ID of the middle spot between two given coordinates
function a(start, end){
    let midSC = [((start[0] + end[0])/2), ((start[1] + end[1])/2)]
    let midSId = board[midSC[1]][midSC[0]];
    return midSId;
}

// Check if there is a piece of the opposing color between two given coordinates
function b(start, end){
    let midS = document.getElementById(a(start, end))
    if(midS.children[0]){
        if((midS.children[0].classList.contains('black-piece')) && (dp.classList.contains('red-piece'))){
            return true;
        } else if(midS.children[0].classList.contains('red-piece') && dp.classList.contains('black-piece')){
            return true;
        }
    }
}

// Move a game piece to a new spot on the game board
function c(selected, original){
    selected.style.backgroundColor = "";
    afterMove(selected, original);
    original.removeChild(dp);
    selected.append(dp);
}

// Check if a move is allowed based on piece limitations and turn valid spots yellow when hovered over
function moveableSpots(selected, original) {
    let start = findId(original);
    let end = findId(selected);

    if (dp.classList.contains('king')) {
        return validateKingMove(start, end);
    } else if (dp.classList.contains('black-piece')) {
        return validateBlackMove(start, end);
    } else if (dp.classList.contains('red-piece')) {
        return validateRedMove(start, end);
    }
}

 // Validate the move for a king piece
function validateKingMove(start, end) {
    if (
        (start[1] === end[1] - 1 || start[1] === end[1] + 1) &&
        (start[0] === end[0] - 1 || start[0] === end[0] + 1)
    ) {
        return true;
    } else if (
        (start[1] === end[1] - 2 || start[1] === end[1] + 2) &&
        (start[0] === end[0] - 2 || start[0] === end[0] + 2) &&
        b(start, end)
    ) {
        return true;
    }
}

// Validate the move for a red piece
function validateRedMove(start, end) {
    if (
        start[1] === end[1] + 1 &&
        (end[0] === start[0] + 1 || end[0] === start[0] - 1)
    ) {
        return true;
    } else if (
        start[1] === end[1] + 2 &&
        (start[0] === end[0] - 2 || start[0] === end[0] + 2) &&
        b(start, end)
    ) {
        return true;
    }
}

// Validate the move for a black piece
function validateBlackMove(start, end) {
    if (
        start[1] === end[1] - 1 &&
        (end[0] === start[0] + 1 || end[0] === start[0] - 1)
    ) {
        return true;
    } else if (
        start[1] === end[1] - 2 &&
        (start[0] === end[0] - 2 || start[0] === end[0] + 2) &&
        b(start, end)
    ) {
        return true;
    }
}


// Check if a move is within the restrictions for a specific piece
function moveRestriction(selected, original) {
    let start = findId(original);
    let end = findId(selected);

    if (dp.classList.contains('king')) {
        if(dp.classList.contains("red-piece")) {
          return processKingMove(start, end, "red-piece");
        } else {
          return processKingMove(start, end, "black-piece");
        }
    } else if (dp.classList.contains('red-piece')) {
        return processNonKingMove(start, end, 'red-piece', scoreR, scoreRTracker);
    } else {
        return processNonKingMove(start, end, 'black-piece', scoreB, scoreBTracker);
    }
}

// Process a move for a king piece, including capturing opponent pieces
function processKingMove(start, end, pieceColor) {
    if (
        (start[1] === end[1] - 1 || start[1] === end[1] + 1) &&
        (start[0] === end[0] - 1 || start[0] === end[0] + 1)
    ) {
        return true;
    } else if (
        (start[1] === end[1] - 2 || start[1] === end[1] + 2) &&
        (start[0] === end[0] - 2 || start[0] === end[0] + 2) &&
        b(start, end)
    ) {
      if(pieceColor === "red-piece") {
        scoreR=scoreR+1;
        scoreRTracker.textContent = `Red's Score: ${scoreR}`;
      } else if (pieceColor === "black-piece"){
        scoreB=scoreB+1;
        scoreBTracker.textContent = `Black's Score: ${scoreB}`;

      }
        processCapture(start, end);

        return true;
    }
    return false;
}

// Process a move for a non-king piece, including capturing opponent pieces
function processNonKingMove(start, end, pieceColor, score, scoreTracker) {
  let direction = pieceColor === 'red-piece' ? 1 : -1;

    if (
        start[1] === end[1] + direction &&
        (end[0] === start[0] + 1 || end[0] === start[0] - 1)
    ) {
        return true;
    } else if (
        start[1] === end[1] + 2 * direction &&
        (start[0] === end[0] - 2 || start[0] === end[0] + 2) &&
        b(start, end)
    ) {
        if(pieceColor === "red-piece") {
          scoreR=scoreR+1;
        } else if (pieceColor === "black-piece"){
          scoreB=scoreB+1;
        }
        processCapture(start, end);
        if(pieceColor === "red-piece") {
          scoreRTracker.textContent = `Red's Score: ${scoreR}`;
        } else if (pieceColor === "black-piece"){
          scoreBTracker.textContent = `Black's Score: ${scoreB}`;
        }
        return true;
    }
    return false;
}

// Remove a captured piece from the game board
function processCapture(start, end) {
    let middleSquare = document.getElementById(a(start, end));
    if (middleSquare) {
        middleSquare.innerHTML = "";
    }
}


// Add 'king' class to a game piece if it reaches the opposite row
function makeKing(selected){
    if(dp.classList.contains("black-piece") && selected.classList.contains("row1") && !dp.classList.contains("king")){
        dp.classList.add("king")
    } else if (dp.classList.contains("red-piece") && selected.classList.contains("row8") && !dp.classList.contains("king")){
        dp.classList.add("king")
    }
}

// Check if either player has won by reaching a score of 12, display the winner
function whoWins(){
    if(scoreR === 12){
        win.textContent = "Red wins!"
        whoseTurn.textContent = ""
    } else if(scoreB === 12){
        win.textContent = "Black wins!"
        whoseTurn.textContent = ""
    }
}

// Reload the game to restart
function restart(){
    window.location.reload();
}

let dp; // Represents the dragged piece

// Set background color to grey while dragging
document.addEventListener("drag", (event) => {
    event.target.style.backgroundColor = "grey";
}, false);

// Set the dragged piece and adjust its appearance during drag start
document.addEventListener("dragstart", (event) => {
    dp = event.target;
    event.target.style.opacity = "0.2";

}, false);

// Reset the dragged piece's appearance after drag ends
document.addEventListener("dragend", (event) => {
    event.target.style.opacity = "1";
    event.target.style.backgroundColor = '';
}, false);

// Allow dropping on dragover
document.addEventListener("dragover", (event) => {
    event.preventDefault();
}, false);

// Check if the drop target is a green spot and is empty, change color accordingly
document.addEventListener("dragenter", (event) => {
    let original = dp.parentNode;
    let selected = event.target;

    // Highlight the valid drop target
    if(selected.classList.contains("green-spot") && selected.innerHTML === ""){
        if(moveableSpots(selected, original)){
            selected.style.backgroundColor = "yellow";
        }
    }
}, false);

// Reset the background color when leaving a green spot
document.addEventListener("dragleave", (event) => {
    if(event.target.classList.contains("green-spot")){
            event.target.style.backgroundColor = "";
    }
}, false);

// When dropped move the piece, check for king promotion, switch turn, and check for a winner
document.addEventListener("drop", (event) => {
    event.preventDefault();
    let original = dp.parentNode;
    let selected = event.target;

    if(selected.classList.contains("green-spot") && selected.innerHTML === ""){
      // Check if the drop is on a valid spot and meets move restrictions
        if(moveRestriction(selected, original)){
            c(selected, original);
            makeKing(selected);
            switchTurn();
            whoWins();
        }
    }
}, false);
