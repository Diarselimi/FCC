var values = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
];

var winningCombinations = [
    [[0, 0], [0, 1], [0, 2]],
    [[1, 3], [1, 4], [1, 5]],
    [[2, 6], [2, 7], [2, 8]]
];

var drawMessages = [
    'It seems like a draw :)',
    'It\'s a draw :O',
    'Hey, it\'s a draw',
    'Hmmm, Lucky ',
    'Nice play',
    'Good game',
    'You seem like an experienced player'
];

var sameButtonMessages = [
    'C\'mon man choose another one !!',
    'That\'s filled out !',
    'This one is already selected :) ',
    'Nope you can\'t fool me ;) ',
    'Do you know how to play the game ?!'
];

var chars = {1: 'clear', 0: 'panorama_fish_eye'};
var playerChar;
var playerHasTheMove = (playerChar == 0);
var clickedBlock = [];
var isDisabled = false;

/**
 * This function will save the selected character of the user
 * @param key
 */
function selectCharacter(key) {
    playerChar = key;
    $('.your-character-place').html(chars[key]);
    $('.pc-character-place').html((key === 0) ? chars[1] : chars[0]);
    $('.play-btn').html('Reset').attr('onclick', 'reset()');
    $('#modal1').closeModal();
}

/**
 * This function will start the game
 */
function play() {
    if (playerChar === undefined) {
        $('#modal1').openModal();
        return false;
    }
    return true;
}

/**
 * This function will reset the game and character
 */
function reset() {
    playerChar = undefined;
    values.forEach(function (row, i) {
        row.forEach(function (ele, j) {
            values[i][j] = null;
        });
    });
    $('.play-btn').html('Play').attr('onclick', 'play()');
    renderBlocks();
}

function newGame() {
    isDisabled = false;
    values.forEach(function (row, i) {
        row.forEach(function (ele, j) {
            values[i][j] = null;
        });
    });
    renderBlocks();
}

/**
 * Check if the clicked field is valid
 */
function isValidField(field) {
    return values[$(field).data('row')][$(field).data('pos')] === null;
}

/**
 * This will warn the user if the button is already clicked
 */
function warnUser(field) {
    $(field).css({'background-color': '#212121', 'color': '#fff'});
    Materialize.toast(sameButtonMessages[Math.round(Math.random() * 4)], 2000, null, function () {
        $(field).css({'background-color': 'transparent', 'color': '#212121'});
    });
}

//This function will render the blocks in the view
function renderBlocks() {
    $('.board').html('');
    values.forEach(function (row, i) {
        row.forEach(function (ele, j) {
            var tempChar = '';
            if (ele != null) {
                tempChar = chars[ele];
            }
            var block = '<li class="item game-btn waves-effect" data-row="' + i + '" data-pos="' + j + '"><i class="material-icons f4">' + tempChar + '</i></li>';
            $('.board').append(block);
        });
    });
}

//this will fill the block with the specific key
function fillBlock(block) {
    clickedBlock = [$(block).data('row'), $(block).data('pos')];
    values[$(block).data('row')][$(block).data('pos')] = playerChar;
    renderBlocks();
}

//
function playerTurn() {

    if (playerHasTheMove) {
        playerHasTheMove = false;
        return true;
    }
    return false;
}

//play the move by the computer
function playComputer() {

    if (checkWinner()) {

    } else if (hasMoreBlocks()) {

        var x = Math.round(Math.random() * 2);
        var y = Math.round(Math.random() * 2);

        while (values[x][y] !== null) {
            x = Math.round(Math.random() * 2);
            y = Math.round(Math.random() * 2);
        }

        values[x][y] = (playerChar == 0) ? 1 : 0;
        playerHasTheMove = true;
        renderBlocks();
    } else {
        Materialize.toast(drawMessages[Math.round(Math.random() * drawMessages.length - 1)], 3000, null);
    }
}

function hasMoreBlocks() {
    var out = false;
    values.forEach(function (row, i) {
        row.forEach(function (ele, j) {
            if (values[i][j] == null) {
                out = true;
            }
        });
    });
    return out;
}

/**
 * This function will disable clicking on the blocks
 * @returns {boolean}
 */
function disableBlocks() {
    isDisabled = true;
}

function checkWinner() {
    var a = checkX(clickedBlock[0]);
    var b = checkY(clickedBlock[1]);
    var c = checkDiagonal();
    if (a !== false || b !== false || c !== false) {
        disableBlocks();
        Materialize.toast('The winner is the  <i class="material-icons">' + chars[c] + '</i> character.', 3000, null, function () {
            newGame();
        });
        return true;
    }
    return false;
}

function checkX(y) {
    var tempCheck = [];
    for (var x = 0; x < values.length; x++) {
        tempCheck[x] = values[y][x];
    }

    if (tempCheck[1] === tempCheck[2] && tempCheck[0] === tempCheck[1]) {
        for (var i = 0; i < values.length; i++) {
            tempCheck[i] = values[y][i];
            $('.board').find("[data-row='" + y + "'][data-pos='" + i + "']").addClass('winner-block');
        }
        return tempCheck[0];
    }
    return false;
}

function checkY(x) {
    var tempCheck = [];
    for (var y = 0; y < values.length; y++) {
        tempCheck[y] = values[y][x];
    }

    if (tempCheck[1] === tempCheck[2] && tempCheck[0] === tempCheck[1]) {
        for (var i = 0; i < values.length; i++) {
            tempCheck[i] = values[i][x];
            $('.board').find("[data-row='" + i + "'][data-pos='" + x + "']").addClass('winner-block');
        }
        return tempCheck[0];
    }
    return false;
}

function checkDiagonal() {

    if (values[0][0] === values[1][1] && values[1][1] === values[2][2] && values[2][2] !== null) {
        for (var d = 0; d < 3; d++) {
            $('.board').find("[data-row='" + d + "'][data-pos='" + d + "']").addClass('winner-block');
        }
        return values[1][1];
    }

    if (values[0][2] === values[1][1] && values[1][1] === values[2][0] && values[2][0] !== null) {
        for (var x = 0, y = 2; x < 3 && y >= 0; x++, y--) {
            $('.board').find("[data-row='" + x + "'][data-pos='" + y + "']").addClass('winner-block');
        }
        return values[1][1];
    }

    return false;
}

$(document).ready(function () {

    renderBlocks();

    $('body').on('click', '.game-btn', function () {
        if (play() && !isDisabled) {
            if (isValidField($(this))) {
                fillBlock($(this));
                playComputer();
            } else {
                warnUser($(this));
            }
        }
        return false;
    })
});