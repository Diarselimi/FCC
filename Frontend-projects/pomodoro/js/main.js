$(document).ready(function() {
    var minutes = 1; //default value
    var seconds = 00; //default value 
    var sessions = 4; //default value
    var sessDone = 0;

    renderValues(minutes, seconds);
    renderSessions(sessions, sessDone);

    var increase = $('.increase');
    var decrease = $('.decrease');
    var sessBtn = $('.session-btn');

    increase.on('click', function() {
        if (minutes + 1 < 60) {
            minutes++;
            renderValues(minutes, seconds);
        } else {
            //do the same but give him a hint
            minutes++;
            renderValues(minutes, seconds);
        }

    });

    decrease.on('click', function() {
        if (minutes - 1 > 0) {
            minutes--;
            renderValues(minutes, seconds);
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
        renderSessions(sessions, sessDone);
    })

});

function renderValues(val1, val2) {
    $('.minutes').html(val1); //set the value to the html
    $('.seconds').html(val2); //set the value to the html
}

function renderSessions(sessions, sessDone) {
    var sessionTodo = '<li class="ion-ios-circle-outline"></li>';
    var sessionDone = '<li class="ion-ios-checkmark"></li>';
    var sessionCurrent = '<li class="ion-ios-circle-filled"></li>';

    $('.dots').html('');

    for (var i = 1; i <= sessions; i++) {
        if (i == sessDone + 1) {
            $('#sessions .dots').append(sessionCurrent);
        } else {

            if (i <= sessDone) {
                $('#sessions .dots').append(sessionDone);
            } else {
                $('#sessions .dots').append(sessionTodo);
            }
        }

    }
}