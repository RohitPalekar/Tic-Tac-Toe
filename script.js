// Select player buttons X and O
let X=document.querySelector("#x");
let O=document.querySelector("#o");

// Select all boxes and the container
let boxes=document.querySelectorAll(".grid-items");
let bigbox=document.querySelector(".container");

// Select reset button
let resetButton=document.querySelector("#reset");

// Variable to track whose turn it is (O starts by default)
let startWithO=true;

// Player X button changes turn to X
X.addEventListener("click",function(){
    startWithO=false;
    // Update turn display
    document.querySelector(".player-turn").textContent = "Player X's turn";
})

// Player O button changes turn to O
O.addEventListener("click",function(){
    startWithO=true;
    // Update turn display
    document.querySelector(".player-turn").textContent = "Player O's turn";
})

// Define all winning combinations on the board
let winningPatterns=
[
   [0, 1, 2], // Top row
    [0, 3, 6], // Left column
    [0, 4, 8], // Diagonal from top-left
    [1, 4, 7], // Middle column
    [2, 5, 8], // Right column
    [2, 4, 6], // Diagonal from top-right
    [3, 4, 5], // Middle row
    [6, 7, 8], // Bottom row
];

// Track number of moves played
let moves=0;

// Add click handler to each box
boxes.forEach((box)=>{
    box.addEventListener("click",function(){
        // Check if box is already filled
        if(box.innerText !== "") {
            return; // Skip if box is already filled
        }
        
        if(startWithO==true){
            // Fix: Changed innerHTMl to innerText and fixed "0" to "O"
            box.innerText = "O";
            startWithO=false;
            // Update turn display
            document.querySelector(".player-turn").textContent = "Player X's turn";
        }
        else{
            // Fix: Changed innerHTMl to innerText
            box.innerText = "X";
            startWithO=true;
            // Update turn display
            document.querySelector(".player-turn").textContent = "Player O's turn";
        }
        box.style.pointerEvents="none";
        moves++;
        if(moves>=5){
            checkWinner();
        }
        
        // Check for draw when all boxes are filled
        if(moves === 9) {
            document.querySelector(".player-turn").textContent = "It's a draw!";
        }
    })
});

// Function to check if someone has won
function checkWinner(){
    for (let pattern of winningPatterns){
        let pos1=bigbox.children[pattern[0]].innerText;
        let pos2=bigbox.children[pattern[1]].innerText;
        let pos3=bigbox.children[pattern[2]].innerText;  
        
        // Fix: Corrected the winning condition check
        if(pos1!=='' && pos2!=='' && pos3!==''){
             if(pos1===pos2 && pos2===pos3){
                document.querySelector(".player-turn").textContent = `Player ${pos1} wins!`;
                // Disable all boxes when game is over
                boxes.forEach(box => {
                    box.style.pointerEvents = "none";
                });
                
                // Highlight winning combination
                bigbox.children[pattern[0]].style.backgroundColor = "rgba(255, 255, 255, 0.3)";
                bigbox.children[pattern[1]].style.backgroundColor = "rgba(255, 255, 255, 0.3)";
                bigbox.children[pattern[2]].style.backgroundColor = "rgba(255, 255, 255, 0.3)";
                return; // Exit function after finding a winner
             }
        }
    }
}

// Reset game when reset button is clicked
resetButton.addEventListener('click',function(){
    boxes.forEach(box =>{
        box.innerText="";
        box.style.pointerEvents="auto";
        box.style.backgroundColor=""; // Clear highlighted winning pattern
    })
    // Reset moves counter
    moves=0;
    // Reset turn to default (O starts)
    startWithO=true;
    // Reset turn display
    document.querySelector(".player-turn").textContent = "Player O's turn";
})