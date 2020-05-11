/*
    x = columns
    y = rows
*/
let minesweeper = {firstClick:false,timer:0};
minesweeper.contextmenuhandler = function(){
    return false;
}
minesweeper.increaseTimer = function() {
    minesweeper.timer = minesweeper.timer + 1;
    console.log(minesweeper.timer);
}
minesweeper.checkMine = function(xPos, yPos) {
    xPos = Number(xPos);
    yPos = Number(yPos);
    if (minesweeper.map[xPos][yPos].indexOf("mine") > -1) {
        return true;
    } else {
        return false;
    }
}
minesweeper.random = function(min, max) {
    min = Number(min);
    max = Number(max);
    if (min > max) {
        return null;
    }
    return Math.round(Math.random() * (max - min) + min);
}
minesweeper.surroundCount = function(xPos, yPos) {
    xPos = Number(xPos);
    yPos = Number(yPos);
    var mineCount = 0;
    if (xPos > 0) {
        if (minesweeper.checkMine(xPos - 1, yPos)) {
            mineCount++;
        }
    }
    if (yPos > 0) {
        if (minesweeper.checkMine(xPos, yPos - 1)) {
            mineCount++;
        }
    }
    if (xPos > 0 && yPos > 0) {
        if (minesweeper.checkMine(xPos - 1, yPos - 1)) {
            mineCount++;
        }
    }
    if (xPos < minesweeper.sizeX - 1) {
        if (minesweeper.checkMine(xPos + 1, yPos)) {
            mineCount++;
        }
    }
    if (yPos < minesweeper.sizeY - 1) {
        if (minesweeper.checkMine(xPos, yPos + 1)) {
            mineCount++;
        }
    }
    if (xPos < minesweeper.sizeX - 1 && yPos < minesweeper.sizeY - 1) {
        if (minesweeper.checkMine(xPos + 1, yPos + 1)) {
            mineCount++;
        }
    }
    if (xPos < minesweeper.sizeX - 1 && yPos > 0) {
        if (minesweeper.checkMine(xPos + 1, yPos - 1)) {
            mineCount++;
        }
    }
    if (xPos > 0 && yPos < minesweeper.sizeY - 1) {
        if (minesweeper.checkMine(xPos - 1, yPos + 1)) {
            mineCount++;
        }
    }
    return mineCount;
}
minesweeper.surroundFlagCount = function(xPos, yPos) {
    xPos = Number(xPos);
    yPos = Number(yPos);
    var flagCount = 0;
    if (xPos > 0) {
        if (minesweeper.isFlagged(xPos - 1, yPos)) {
            flagCount++;
        }
    }
    if (yPos > 0) {
        if (minesweeper.isFlagged(xPos, yPos - 1)) {
            flagCount++;
        }
    }
    if (xPos > 0 && yPos > 0) {
        if (minesweeper.isFlagged(xPos - 1, yPos - 1)) {
            flagCount++;
        }
    }
    if (xPos < minesweeper.sizeX - 1) {
        if (minesweeper.isFlagged(xPos + 1, yPos)) {
            flagCount++;
        }
    }
    if (yPos < minesweeper.sizeY - 1) {
        if (minesweeper.isFlagged(xPos, yPos + 1)) {
            flagCount++;
        }
    }
    if (xPos < minesweeper.sizeX - 1 && yPos < minesweeper.sizeY - 1) {
        if (minesweeper.isFlagged(xPos + 1, yPos + 1)) {
            flagCount++;
        }
    }
    if (xPos < minesweeper.sizeX - 1 && yPos > 0) {
        if (minesweeper.isFlagged(xPos + 1, yPos - 1)) {
            flagCount++;
        }
    }
    if (xPos > 0 && yPos < minesweeper.sizeY - 1) {
        if (minesweeper.isFlagged(xPos - 1, yPos + 1)) {
            flagCount++;
        }
    }
    return flagCount;
}
minesweeper.updateSurroundings = function(x, y) {
    x = Number(x);
    y = Number(y);
    var flagCount = 0;
    if (x > 0) {
        minesweeper.updateTile(x - 1, y);
    }
    if (y > 0) {
        minesweeper.updateTile(x, y - 1);
    }
    if (x > 0 && y > 0) {
        minesweeper.updateTile(x - 1, y - 1);
    }
    if (x < minesweeper.sizeX - 1) {
        minesweeper.updateTile(x + 1, y);
    }
    if (y < minesweeper.sizeY - 1) {
        minesweeper.updateTile(x, y + 1);
    }
    if (x < minesweeper.sizeX - 1 && y < minesweeper.sizeY - 1) {
        minesweeper.updateTile(x + 1, y + 1);
    }
    if (x < minesweeper.sizeX - 1 && y > 0) {
        minesweeper.updateTile(x + 1, y - 1);
    }
    if (x > 0 && y < minesweeper.sizeY - 1) {
        minesweeper.updateTile(x - 1, y + 1);
    }
    return flagCount;
}
minesweeper.isFlagged = function(x, y) {
    if(document.getElementById(x + "-" + y).classList.contains("tile_flag")) {
        return true;
    } else {
        return false;
    }
}
minesweeper.isInRange = function(xPos, yPos, mouseX, mouseY) {
    xPos = Number(xPos);
    yPos = Number(yPos);
    mouseX = Number(mouseX);
    mouseY = Number(mouseY);
    if (Math.abs(mouseX - xPos) < 2) {
        if (Math.abs(mouseY - yPos) < 2) {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
}
minesweeper.gameOver = function() {
    clearInterval(minesweeper.timerInterval);
    document.getElementById("smile").classList.remove("up");
    document.getElementById("smile").classList.add("lose");
    for(var y = 0; y < document.getElementById("game").getElementsByClassName("row").length; y++) {
        for(var x = 0; x < document.getElementById("game").getElementsByClassName("row")[0].getElementsByTagName("div").length; x++) {
            if(minesweeper.checkMine(x, y)) {
                document.getElementById("game").getElementsByClassName("row")[y].getElementsByTagName("div")[x].classList.add("tile_mine");
                document.getElementById("game").getElementsByClassName("row")[y].getElementsByTagName("div")[x].classList.remove("tile_unknown");
                document.getElementById("game").getElementsByClassName("row")[y].getElementsByTagName("div")[x].classList.remove("tile_flag");
            } else if (minesweeper.surroundCount(x, y) == 0) {
                document.getElementById("game").getElementsByClassName("row")[y].getElementsByTagName("div")[x].classList.add("tile_empty");
                document.getElementById("game").getElementsByClassName("row")[y].getElementsByTagName("div")[x].classList.remove("tile_unknown");
                document.getElementById("game").getElementsByClassName("row")[y].getElementsByTagName("div")[x].classList.remove("tile_flag");
            } else {
                var tempClass = "tile_" + minesweeper.surroundCount(x, y);
                document.getElementById("game").getElementsByClassName("row")[y].getElementsByTagName("div")[x].classList.add(tempClass);
                document.getElementById("game").getElementsByClassName("row")[y].getElementsByTagName("div")[x].classList.remove("tile_unknown");
                document.getElementById("game").getElementsByClassName("row")[y].getElementsByTagName("div")[x].classList.remove("tile_flag");
            }
        }
    }
}
minesweeper.firsthandler = function(mouseX, mouseY, e) {
    minesweeper.timerInterval = setInterval(minesweeper.increaseTimer, 1000);
    var mouseX = Number(mouseX);
    var mouseY = Number(mouseY);
    var xPos = e.target.id.split("-")[0];
    var yPos = e.target.id.split("-")[1];
    var minesPlaced = 0;
    while (minesPlaced < minesweeper.mines) {
        var x = minesweeper.random(0, minesweeper.sizeX - 1);
        var y = minesweeper.random(0, minesweeper.sizeY - 1);
        if (minesweeper.isInRange(x, y, mouseX, mouseY) == false && minesweeper.map[x][y].indexOf("mine") == -1) {
            minesweeper.map[x][y].push("mine");
            minesPlaced++;
        }
    }
    minesweeper.updateTile(xPos, yPos);
}
minesweeper.updateTile = function(xPos, yPos) {
    if (document.getElementById(xPos + "-" + yPos).classList.contains("tile_empty")) {
        return;
    }
    if (document.getElementById(xPos + "-" + yPos).classList.contains("tile_flag")) {
        return;
    }
    xPos = Number(xPos);
    yPos = Number(yPos);
    if (minesweeper.checkMine(xPos, yPos)) {
        minesweeper.gameOver();
    } else if (minesweeper.surroundCount(xPos, yPos) == 0) {
        var tempClass = "tile_empty";
        document.getElementById(xPos + "-" + yPos).classList.add(tempClass);
        document.getElementById(xPos + "-" + yPos).classList.remove("tile_unknown");
        minesweeper.updateSurroundings(xPos, yPos);
    }else {
        var tempClass = "tile_" + minesweeper.surroundCount(xPos, yPos);
        document.getElementById(xPos + "-" + yPos).classList.add(tempClass);
        document.getElementById(xPos + "-" + yPos).classList.remove("tile_unknown");
        
    }
}
minesweeper.press = function(x, y) {
    var element = document.getElementById(x + "-" + y);
    if (element.classList.contains("tile_unknown")) {
        element.classList.add("tile_pressed");
    }
}
minesweeper.pressSurroundings = function(x, y) {
    x = Number(x);
    y = Number(y);
    var flagCount = 0;
    if (x > 0) {
        minesweeper.press(x - 1, y);
    }
    if (y > 0) {
        minesweeper.press(x, y - 1);
    }
    if (x > 0 && y > 0) {
        minesweeper.press(x - 1, y - 1);
    }
    if (x < minesweeper.sizeX - 1) {
        minesweeper.press(x + 1, y);
    }
    if (y < minesweeper.sizeY - 1) {
        minesweeper.press(x, y + 1);
    }
    if (x < minesweeper.sizeX - 1 && y < minesweeper.sizeY - 1) {
        minesweeper.press(x + 1, y + 1);
    }
    if (x < minesweeper.sizeX - 1 && y > 0) {
        minesweeper.press(x + 1, y - 1);
    }
    if (x > 0 && y < minesweeper.sizeY - 1) {
        minesweeper.press(x - 1, y + 1);
    }
    return flagCount;
}
minesweeper.mousehandler = function(e) {
    var x = e.target.id.split("-")[0];
    var y = e.target.id.split("-")[1];
    if (minesweeper.firstClick) {
        if (e.which == 1) {
            //First click
            minesweeper.firstClick = false;
            minesweeper.firsthandler(x, y, e);
        }
    } else if (e.which == 1) {
        //Left click
        document.getElementById("smile").classList.add("pressed");
    } else if (e.which == 2) {
        //Middle click
        document.getElementById("smile").classList.add("pressed");
        minesweeper.press(x, y);
        minesweeper.pressSurroundings(x, y);
    } else if (e.which == 3) {
        //Right click
        if (e.target.classList.contains("tile_flag")) {
            e.target.classList.remove("tile_flag");
            e.target.classList.add("tile_unknown");
        } else if(e.target.classList.contains("tile_unknown")) {
            e.target.classList.remove("tile_unknown");
            e.target.classList.add("tile_flag");
        }
    };
};
minesweeper.mouseuphandler = function(e) {
    var xPos = e.target.id.split("-")[0];
    var yPos = e.target.id.split("-")[1];
    if (e.which == 1) {
        //Left click
        document.getElementById("smile").classList.remove("pressed");
        if (minesweeper.isFlagged(xPos, yPos) == false) {
            minesweeper.updateTile(xPos, yPos);
        }
    } else if (e.which == 2) {
        //Middle click
        document.getElementById("smile").classList.remove("pressed");
        for (var x = 0; x < minesweeper.sizeX; x++) {
            for (var y = 0; y < minesweeper.sizeY; y++) {
                document.getElementById(x + "-" + y).classList.remove("tile_pressed");
            }
        }
        if (minesweeper.surroundFlagCount(xPos, yPos) == minesweeper.surroundCount(xPos, yPos) && e.target.classList.contains("tile_unknown") == false && e.target.classList.contains("tile_flag") == false) {
            minesweeper.updateSurroundings(xPos, yPos);
        }
    }
}
minesweeper.newGame = function() {
    if (minesweeper.timerInterval != null) {
        clearInterval(minesweeper.timerInterval);
    }
    minesweeper.init(30, 16, 99);
}
minesweeper.smileup = function() {
    document.getElementById("smile").classList.add("up");
    document.getElementById("smile").classList.remove("down");
    minesweeper.newGame();
}
minesweeper.smiledown = function() {
    document.getElementById("smile").classList.remove("up");
    document.getElementById("smile").classList.add("down");
}
minesweeper.init = function(x, y, mines) {
    minesweeper.timer = 0;
    x = Number(x);
    y = Number(y);
    mines = Number(mines);
    minesweeper.sizeX = x;
    minesweeper.sizeY = y;
    minesweeper.mines = mines;
    let game = document.createElement('div');
    game.id = "game";
    game.oncontextmenu = minesweeper.contextmenuhandler;
    var gameheader = document.createElement("div");
    gameheader.id = "game-header";
    var smile = document.createElement("div");
    smile.id = "smile";
    smile.classList.add("up");
    smile.onmouseup = minesweeper.smileup;
    smile.onmousedown = minesweeper.smiledown;
    gameheader.append(smile);
    game.append(gameheader);
    for (var y = 0; y < minesweeper.sizeY; y++) {
        var row = document.createElement("div");
        row.classList.add("row");
        for (var x = 0; x < minesweeper.sizeX; x++) {
            var tile = document.createElement("div");
            tile.id = String(x) + "-" + String(y);
            tile.classList.add("tile");
            tile.classList.add("tile_unknown");
            tile.onmousedown = minesweeper.mousehandler;
            tile.onmouseup = minesweeper.mouseuphandler;
            row.append(tile);
        }
        game.append(row);
    };
    minesweeper.map = [];
    for (var x = 0; x < minesweeper.sizeX; x++) {
        minesweeper.map.push([]);
        for (var y = 0; y < minesweeper.sizeY; y++) {
            minesweeper.map[minesweeper.map.length - 1].push([]);
        }
    }
    document.getElementById("game-wrapper").innerHTML = "";
    document.getElementById("game-wrapper").append(game);
    minesweeper.firstClick = true;
    document.getElementById("game-wrapper").classList.remove("loading");
    document.getElementById("game-wrapper").classList.add("loaded");
};
minesweeper.firstRun = function() {
    minesweeper.newGame();
}