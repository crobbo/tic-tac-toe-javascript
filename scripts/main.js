// Gameboard module

var gameBoard = (function() {
    'use strict';
    var _board = ["X", "O", "X",
                 "X", "O", "O",
                 "O", "X", "X"];

    function returnBoard() {
        return _board;
    }

    return {
        returnBoard
    };
})();

// Display module
var displayController = (function() {
    'use strict';

    function updateBoard(board) {
        var childDivs = document.getElementById('board').getElementsByTagName('div');
        for( let i=0; i < childDivs.length; i++ )
            {
            var childDiv = childDivs[i];
            childDiv.innerText = board[i]
            }
    }
    
    return {
        updateBoard
    };
})();


// Player Factory functory
const player = (function(counter) {
    'use strict';
    var _counter = counter;

    return {
        firstName, counter
    };
});

// const Player1 = Player('X');
// const Player2 = Player('O');

displayController.updateBoard(gameBoard.returnBoard());