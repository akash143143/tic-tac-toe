let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true; //playerX, playerO
let count = 0; // to track draw

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

// to reset game
const resetGame = () => {
    turnO = true;
    count = 0;
    // to enableBoxes to restart the game
    enableBoxes();
    // to hide message container 
    msgContainer.classList.add("hide");
}

boxes.forEach((box) => {
    box.addEventListener("click", () => {
       if(turnO){                  // player O
            box.innerText = "O";
            turnO = false;
       } else{                     // player X
            box.innerText = "X";
            turnO = true;
       }
       box.disabled = true;
       count++;
       // to check winner.
       let isWinner = checkWinner();

       if(count === 9 && !isWinner) {
            gameDraw();
       }
    });
});

const gameDraw = () => {
    msg.innerText = `Draw Game !`;
    msgContainer.classList.remove("hide");
    disableBoxes();
}

// to disable boxes after getting a winner
const disableBoxes = () => {
    for(let box of boxes){
        box.disabled = true;
    }
}

// to enableBoxes to restart the game
const enableBoxes = () => {
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
}


// to show winner
const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    // to disable boxes after getting a winner
    disableBoxes();
}


// to check winner
const checkWinner = () => {
    for(let pattern of winPatterns){
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if(pos1Val !== "" && pos2Val !== "" && pos3Val !== ""){
            if(pos1Val === pos2Val && pos2Val === pos3Val){
                console.log("winner", pos1Val);
                // to show winner
                showWinner(pos1Val);
                return true;
            }
        }
    }
};

// to trigger reset game
newGameBtn.addEventListener("click", resetGame);
// to apply on new game
resetBtn.addEventListener("click", resetGame);