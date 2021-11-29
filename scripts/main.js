// Gameboard module
var gameBoard = (function() {
    'use strict';
    var _board = ["", "", "",
                 "", "", "",
                 "", "", ""];

    function _checkStraights() {
        let h1 = _board.slice(0, 3);
        let h2 = _board.slice(3, 6);
        let h3 = _board.slice(6, 9);
        let v1 = [_board[0], _board[3], _board[6]];
        let v2 = [_board[1], _board[4], _board[7]];
        let v3 = [_board[2], _board[5], _board[8]];
        let allStraights = [ h1, h2, h3, v1, v2, v3 ]

        for (let i=0; i < allStraights.length; i++) {
            if (arraysEqual(allStraights[i], ['X', 'X', 'X']) || arraysEqual(allStraights[i], ['O', 'O', 'O'])) return true;
        }
        return false;
    }

    function _checkDiags() {
        
    }

    function arraysEqual(a, b) {
        if (a === b) return true;
        if (a == null || b == null) return false;
        if (a.length !== b.length) return false;
           
        for (var i = 0; i < a.length; ++i) {
          if (a[i] !== b[i]) return false;
        }
        return true;
      }

    function updateBoard(num, counter) {
        _board[num-1] = counter;
        console.log(_board)
    }

    function returnBoard() {
        return _board;
    }

    function checkWinner() {
        if(_checkStraights()) return true;
        return false;
    }

    return {
        returnBoard, updateBoard, checkWinner
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

// Initialize players

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
        // console.log(gameBoard.checkWinner())
    }
});