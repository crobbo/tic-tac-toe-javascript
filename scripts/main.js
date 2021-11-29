// Gameboard module

var gameBoard = (function() {
    'use strict';
    var _board = ["", "", "",
                 "", "", "",
                 "", "", ""];

    function updateBoard(num, counter) {
        _board[num-1] = counter;
        console.log(_board)
    }

    function returnBoard() {
        return _board;
    }

    return {
        returnBoard, updateBoard
    };
})();

// Display module
var displayController = (function() {
    'use strict';

    function displayCounters(board) {
        var childDivs = document.getElementById('board').getElementsByTagName('div');
        for( let i=0; i < childDivs.length; i++ )
            {
            var childDiv = childDivs[i];
            childDiv.innerText = board[i]
            }
    }

    return {
        displayCounters
    };
})();


// Player Factory functory
const Player = (function(counter, move) {
    'use strict';
    var _counter = counter;
    var _move = move;

    function returnCounter() {
        return _counter;
    }

    function returnMove() {
        return _move;
    }

    function setMove(boolean) {
        _move = boolean
    }

    return {
        returnCounter, returnMove, setMove
    };
});

// Initialize game
displayController.displayCounters(gameBoard.returnBoard());

const Player1 = Player('X', true);
const Player2 = Player('O', false);

// Event Listener
document.body.addEventListener("click", (e) => {
    if (e.target.classList.contains("js-place-counter")) {
        let num = parseInt(e.path[0].classList[0].slice(-1))
        let counter = ''
        if (Player1.returnMove()) {
            counter = Player1.returnCounter();
            Player1.setMove(false)
            Player2.setMove(true)
        } else {
            counter = Player2.returnCounter();
            Player2.setMove(false)
            Player1.setMove(true)
        }
        gameBoard.updateBoard(num, counter);
        displayController.displayCounters(gameBoard.returnBoard());
    }
});
