var grid = [
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0]
    ];

var game = 2;
var turn = 1;
var completed = false;
var moves = 0;

function reset() {
    window.location.reload(true);
}

function two_player() {
    game = 2;
    setupGame();
}

function one_player() {
    game = 1;
    setupGame();
}

function zero_player() {
    game = 0;
    setupGame();
    setInterval(computerMove, 500);
}

function setupGame() {
    document.getElementById('field').style.display = 'block';
    document.getElementById('button_holder').style.display = 'none';
    document.getElementById('options').style.display = 'block';
}

function boardCheck(col) {
    if (completed) {
        return;
    }
    if (addPiece(turn, col) == null) {
        return;
    }
    moves++;
    
    if (turn === 1) {
        turn = 2;
    } else {
        turn = 1;
    }
    
    if (moves >= 49) {
        stop();
        document.getElementById("turn").innerHTML = '<h2 class="tie">TIE GAME!</h2>';
    }
    if (!completed) {
        document.getElementById("turn").innerHTML = "<h2>Player " + turn + "'s turn!</h2>";
    }
    
    if (game == 1) {
        if (turn == 2) {
            computerMove();
        }
    }
    return 1;
}

function addPiece(player_turn, col) {
    var i = 0; var r = 0; var c = col;
    if (grid[0][col-1] != 0) {
        return;
    }
    for (i = 6; i >= 0; --i) {
        if (grid[i][col-1] == 0) {
            grid[i][col-1] = turn;
            r = i + 1;
            i = 0;
        }
    }
    var str = "r_" + c + "-" + r;
    if (turn == 1) {
        var d = document.getElementById(str);
        d.className += " circle_r";
    } else {
        var d = document.getElementById(str);
        d.className += " circle_b";
    }
    checkWin(c-1,r-1);
    return 1;
}

function computerMove() {
    var randomc = Math.floor(Math.random()*7.0);
    var t = turn;
    if (boardCheck(randomc) == null) {
        turn = t;
    }
}

function checkWin(col, row) {
    //check up and down
    var r = row;
    for (var i = 0; i < 3; ++i) {
        if (r < 6 && grid[r+1][col] == turn) {
            r++;
        } else {
            break;
        }
        if (i == 2) {
            document.getElementById("turn").innerHTML = '<h2 class="winner">Player ' + turn + ' wins!</h2>';
            stop();
        }
    }
    
    // check left to right
    var r = row;  var c = col;
    while (c > 0 && grid[row][c-1] == turn) {
        c--;
    }
    for (var i = 0; i < 3; ++i) {
        if (c < 6 && grid[row][c+1] == turn) {
            c++;
        } else {
            break;
        }
        if (i == 2) {
            document.getElementById("turn").innerHTML = '<h2 class="winner">Player ' + turn + ' wins!</h2>';
            stop();
        }
    }
    
    // check diagonal rise
    var r = row;  var c = col;
    while (r < 6 && c > 0 && grid[r+1][c-1] == turn) {
        c--;
        r++;
    }
    for (var i = 0; i < 3; ++i) {
        if (c < 6 && r > 0 && grid[r-1][c+1] == turn) {
            c++;
            r--;
        } else {
            break;
        }
        if (i == 2) {
            document.getElementById("turn").innerHTML = '<h2 class="winner">Player ' + turn + ' wins!</h2>';
            stop();
        }
    }
    
    // check diagonal slope
    var r = row;  var c = col;
    while (c > 0 && r > 0 && grid[r-1][c-1] == turn) {
        c--;
        r--;
    }
    for (var i = 0; i < 3; ++i) {
        if (r < 6 && c < 6 && grid[r+1][c+1] == turn) {
            c++;
            r++;
        } else {
            break;
        }
        if (i == 2) {
            document.getElementById("turn").innerHTML = '<h2 class="winner">Player ' + turn + ' wins!</h2>';
            stop();
        }
    }
}

function stop() {
    completed = true;
}