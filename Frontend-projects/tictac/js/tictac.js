var values = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
];

var winningCombinations = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [7, 4, 1],
    [8, 5, 2],
    [9, 6, 3],
    [9, 5, 1],
    [7, 5, 3]
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

/**
 * This function will save the selected character of the user
 * @param key
 */
function selectCharacter(key) {
    playerChar = key;
    $('.your-character-place').html(chars[key]);
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
    if (hasMoreBlocks()) {

        var x = Math.round(Math.random() * 2);
        var y = Math.round(Math.random() * 2);

        while (values[x][y] !== null) {
            x = Math.round(Math.random() * 2);
            y = Math.round(Math.random() * 2);
        }

        values[x][y] = (playerChar == 0) ? 1 : 0;
        playerHasTheMove = true;
        renderBlocks();
    }else{
        Materialize.toast(drawMessages[Math.round(Math.random() * drawMessages.length-1)], 3000, null);
    }
}

function hasMoreBlocks() {
    var out = false;
    values.forEach(function (row, i) {
        row.forEach(function (ele, j) {
            if(values[i][j] == null) {
                out = true;
            }
        });
    });
    return out;
}

function checkWinner() {
    var user = null;
    winningCombinations.forEach(function (combination) {
        combination.forEach(function (num) {
        });
    });
}

$(document).ready(function () {

    renderBlocks();

    $('body').on('click', '.game-btn', function () {
        if (play()) {
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