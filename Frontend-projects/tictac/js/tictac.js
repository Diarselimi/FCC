var values = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
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

var chars = {1: 'clear', 0: 'panorama_fish_eye'};
var playerChar;

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
    $('.play-btn').html('Play').attr('onclick', 'play()');
}

/**
 * Check if the clicked field is valid
 */
function isValidField(field) {
    return $(field).find('i').html() === "";

}

/**
 * This will warn the user if the button is already clicked
 */
function warnUser(field) {
    $(field).css({'background-color': '#212121', 'color': '#fff'});
    Materialize.toast('This is already selected!', 2000, null, function () {
        $(field).css({'background-color': 'transparent', 'color': '#212121'});
    });
}

$(document).ready(function () {
    $('.game-btn').on('click', function () {
        if (play()) {
            if (isValidField($(this))) {
                $(this).find('i').html(chars[playerChar]);
            } else {
                warnUser($(this));
            }
        }
        return false;
    })
});