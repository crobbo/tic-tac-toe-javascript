// Event Listeners
    document.body.addEventListener("click", (e) => {
        if (e.target.classList.contains("js-place-counter")) {
            let num = parseInt(e.path[0].classList[0].slice(-1));
            let counter = '';
            
            if (gameBoard.isMultiPlayer()) {
                gameBoard.startUpCheck();
                gameBoard.setPlayerMove(num, counter);
                gameBoard.multiPlayerLogic(num, counter);
            } else if (gameBoard.isSinglePlayer()) {
                gameBoard.SinglePlayerLogic();
            }
        }
    });

    document.body.addEventListener("click", (e) => {
        if (e.target.classList.contains("js-restart")) {
            gameBoard.restartGame();
        }
    });

    // document.body.addEventListener("click", (e) => {
    //     if (e.target.classList.contains("")) {
            
    //     }
    // });

    // document.body.addEventListener("click", (e) => {
    //     if (e.target.classList.contains("")) {
            
    //     }
    // });

// Gameboard module  - controls the game logic.
var gameBoard = (function() {
    'use strict';
    // Private variables
    var _gameOver = false;
    var _board = ["", "", "",
                 "", "", "",
                 "", "", ""];
    var _count = 0;
    var _singlePlayer = false;
    var _mulitPlayer = false;


    // Private methods
    function _checkStraights() {
        let h1 = _board.slice(0, 3);
        let h2 = _board.slice(3, 6);
        let h3 = _board.slice(6, 9);
        let v1 = [_board[0], _board[3], _board[6]];
        let v2 = [_board[1], _board[4], _board[7]];
        let v3 = [_board[2], _board[5], _board[8]];
        let allStraights = [ h1, h2, h3, v1, v2, v3 ]

        for (let i=0; i < allStraights.length; i++) {
            if (_arraysEqual(allStraights[i], ['X', 'X', 'X']) || _arraysEqual(allStraights[i], ['O', 'O', 'O'])) return true;
        }
        return false;
    }

    function _checkDiags() {
        let diag1 = [_board[0], _board[4], _board[8]];
        let diag2 = [_board[2], _board[4], _board[6]];
        let allDiags = [ diag1, diag2 ];

        for (let i=0; i < allDiags.length; i++) {
            if (_arraysEqual(allDiags[i], ['X', 'X', 'X']) || _arraysEqual(allDiags[i], ['O', 'O', 'O'])) return true;
        }
        return false;
    }

    function _arraysEqual(a, b) {
        if (a === b) return true;
        if (a == null || b == null) return false;
        if (a.length !== b.length) return false;
            
        for (var i = 0; i < a.length; ++i) {
            if (a[i] !== b[i]) return false;
        }
        return true;
    }

    function _checkPlacement(num) {
        return gameBoard.returnBoard()[num-1] == "" ? true : false
    }

    // Public methods
    function multiPlayerLogic(num, counter) {
        if (_count === 9) { 
            _gameOver = true;
            return false
        }
        gameBoard.updateBoard(num, counter);
        displayController.displayCounters(num, gameBoard.returnBoard(), displayController.iconHtml());
        _count++
        displayController.gameInfo();
        if (checkForWinner()) return displayController.showRestartBtn()
    }

    function updateBoard(num, counter) {
        _board[num-1] = counter;
    }

    function returnBoard() {
        return _board;
    }

    function returnCount() {
      return _count;
    }

    function returnGameOver() {
        return _gameOver;
    }

    function checkForWinner() {
        if (_checkStraights() || _checkDiags()) {
            _gameOver = true;
            return true;
        }
        return false;
    }

    function restartGame() {
        _gameOver = false;
        _board = ["", "", "",
        "", "", "",
        "", "", ""];
        _count = 0
       displayController.clearCounters();
    }

    function startUpCheck() {
        if (gameBoard.returnGameOver() === true) {
            displayController.showRestartBtn();
            return
        }
      }

    function setPlayerMove(num, counter) {
        if (_checkPlacement(num)) {    
            if (Player1.returnMove()) {
                counter = Player1.returnCounter();
                Player1.setMove(false)
                Player2.setMove(true)
            } else {
                counter = Player2.returnCounter();
                Player2.setMove(false)
                Player1.setMove(true)
            }
            gameBoard.gameLogic(num, counter);
        } 
    }

    function isSinglePlayer() {
        return _isSinglePlayer;
    }

    function isMultiPlayer() { 
        return _multiPlayer;
    }

    return {
        returnBoard,
        updateBoard,
        checkForWinner,
        returnGameOver,
        returnCount,
        multiPlayerLogic,
        startUpCheck,
        setPlayerMove,
        isSinglePlayer,
        isMultiPlayer
    };

})();

// Display module - manipulates the UI
var displayController = (function() {
    'use strict';

    // Private methods
    function _displayInfo() {
        if (gameBoard.checkForWinner()) {
            return Player1.returnMove() ? "🏆 Player Two Wins! 🏆" : "🏆 Player One Wins! 🏆"
        } else if (gameBoard.returnCount() === 9) {
            displayController.showRestartBtn();
            return "Draw 😐"
        } else if (Player1.returnMove()) {
            return "Player One's Turn!";
        } else {
            return "Player Two's Turn!" 
        }
    }

    // Public methods
    function displayCounters(num, board, iconHtml) {
        var childDivs = document.getElementById('board').getElementsByTagName('div');
        
        for( let i=0; i < childDivs.length; i++ )
        {
            if ((i+1) === num) {
                let childDiv = childDivs[i];
                childDiv.innerHTML = iconHtml;
            }
        }
    }

    function gameInfo() {
        var displayInfo = document.getElementById('js-game-info')
        displayInfo.innerText = _displayInfo();
    }

    function iconHtml() {
        if (Player1.returnMove()){
            return Player2.returnCounterHtml();
        } else {
            return Player1.returnCounterHtml();
        }
    }

    function showRestartBtn() {
        document.querySelector('.js-restart').style.display = "flex"
    }

    function clearCounters() {
        var childDivs = document.getElementById('board').getElementsByTagName('div');
        
        for( let i=0; i < childDivs.length; i++ )
        {
                let childDiv = childDivs[i];
        }
    }

    return {
        displayCounters, gameInfo, iconHtml, showRestartBtn, clearCounters
    };
})();

// Player factory functon
const Player = (function(counter, move) {
    'use strict';

    // Private Variables
    var _counter = counter;
    var _move = move;
    var _counterHtml = counterHtml(); 

    // Private methods
    function counterHtml() {
        if (_counter === 'X') {
            return '<i class="fas fa-times"></i>'
        } else {
            return '<i class="far fa-circle"></i>'
        }
    }

    // Public methods
    function returnCounter() {
        return _counter;
    }

    function returnMove() {
        return _move;
    }

    function setMove(boolean) {
        _move = boolean
    }

    function returnCounterHtml() {
        return _counterHtml;
    }

    return {
        returnCounter, returnMove, setMove, returnCounterHtml
    };
});

// Initialize players
const Player1 = Player('X', true);
const Player2 = Player('O', false);

// Event Listeners
document.body.addEventListener("click", (e) => {
    if (e.target.classList.contains("js-place-counter")) {
        let num = parseInt(e.path[0].classList[0].slice(-1));
        let counter = '';
        
        gameBoard.startUpCheck();
        gameBoard.setPlayerMove(num, counter);
    }
});

document.body.addEventListener("click", (e) => {
    if (e.target.classList.contains("js-restart")) {
        gameBoard.restartGame();
    }
});
