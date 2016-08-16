var minutes = 5; //default value
var seconds = 0; //default value
var sessions = 4; //default value
var sessDone = 0;
var running = false;
var onBreak = false;
var breakMinutes = 1;

var longBreak = 25;

var work = moment.duration(minutes, 'minutes');
var breakm = moment.duration(breakMinutes, 'minutes');

var duration = work;
//load the sound ready for playing
var note = new Audio('./sounds/note.mp3');


var primaryButtons = $('.primary-button');
var sessionButtons = $('.session-btn');
var startBtn = $('.start-button');


$(document).ready(function() {
    renderValues();
    renderSessions();

    var increase = $('.increase');
    var decrease = $('.decrease');
    var sessBtn = $('.session-btn');
    var ranger = $('#ranger');

    ranger.on('mouseup', function() {
        var tempInput = parseInt($(this).val());

        if ((minutes + tempInput) < 60) {
            minutes = minutes + parseInt($(this).val());
            if(minutes <= 0){
                minutes = 1;
            }
            duration = moment.duration(minutes, 'minutes');
            renderValues();
        }
        ranger.val(0);
        document.getElementById('ranger').value = 0;
    });

    increase.on('click', function() {
        //do the same but give him a hint
        duration = duration.add(1, 'minutes');
        renderValues();
    });
    decrease.on('click', function() {
        if (duration.minutes() > 0) {
            duration = duration.subtract(1, 'minutes');
            minutes--;
            renderValues();
        } else {
            $(".minutes").animate({
                width: "swing",
                height: "swing"
            }, 200);
        }
    });
    sessBtn.on('click', function() {
        if ($(this).data('value') == 'increase') {
            if (sessions + 1 < 10) {
                sessions++;
            }
        } else {
            if ((sessions - 1) >= 2 && sessDone < 2) {
                sessions--;
            }
        }
        //render the sessions dots
        renderSessions();
    });
});

function renderValues() {
    $('.minutes').html(duration.minutes()); //set the value to the html
    $('.seconds').html(duration.seconds()); //set the value to the html
}

/**
 *
 * @return {void}
 */
function renderSessions() {
    var sessionTodo = '<li class="ion-ios-circle-outline"></li>';
    var sessionDone = '<li class="ion-ios-checkmark"></li>';
    var sessionCurrent = '<li class="ion-ios-circle-filled"></li>';
    var dots = $('.dots');

    dots.html('');

    for (var i = 0; i < sessions; i++) {

        if (sessDone == 0) {
            if (i == sessDone) {
                dots.append(sessionCurrent);
            } else {
                dots.append(sessionTodo);
            }
        } else {
            if (i + 1 <= sessDone) {
                dots.append(sessionDone);
            } else if (i == sessDone && running) {
                dots.append(sessionCurrent);
            } else {
                dots.append(sessionTodo);
            }
        }
    }
}

function start() {
    hideButtons();
    renderSessions();
    running = true;
    duration = moment.duration(minutes, 'minutes');
}

function pause() {
    running = false;
    //do some sound if in pause
}

function resume() {
    running = true;
}
/**
 * @param  {Date time}
 * @return {int}
 */
function update(duration, intervalSpeed) {
    duration = duration.subtract(intervalSpeed, 'milliseconds');
    if (duration.seconds() <= 0) {
        sessionEnd();
    }
    renderValues();
}

/**
 * @param  {Date time}
 * @return {int}
 */
function updateBreak(duration, intervalSpeed) {
    duration = duration.subtract(intervalSpeed, 'milliseconds');
    if (duration.seconds() <= 0) {
        endBreak();
    }
    renderValues();
}

/**
 * This will call for every second the function
 * @param  {callback}
 * @param  {repeat interval}
 * @return {void}
 */
var intervalSpeed = 1000;
setInterval(function() {
    if (running) {
        update(duration, intervalSpeed);
    } else if (onBreak) {
        updateBreak(duration, intervalSpeed);
    } else {
        // nextSession();
    }
}, 100);

function sessionEnd() {
    renderValues();
    sessDone++;
    running = false;
    renderSessions();
    note.play();
    onBreak = true;
    duration = moment.duration(breakMinutes, 'minutes');
}

function endBreak() {
    running = false;
    onBreak = false;
    note.play();
    renderValues();
    showButtons();
    duration = moment.duration(minutes, 'minutes');

}

function showButtons() {
    primaryButtons.fadeIn('fast');
    sessionButtons.fadeIn('fast');
    startBtn.fadeIn('fast');
}

function hideButtons() {
    primaryButtons.fadeOut('fast');
    sessionButtons.fadeOut('fast');
    startBtn.fadeOut('fast');
}