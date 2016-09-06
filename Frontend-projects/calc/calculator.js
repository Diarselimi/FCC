var textbox = "";

$(document).ready(function() {
    var calculated = [];
    $('button').on('click', function() {
        $('.error').html('').hide();
        if ($(this).val() === 'AC') {
            $('.textbox').val('');
            return false;
        }

        if ($(this).val() === 'CE') {
            $('.textbox').val($('.textbox').val().slice(0, -1));
            return false;
        }

        if ($(this).val() === '=') {
            try {
                textbox = eval($('.textbox').val());
                calculated.push(textbox);
            } catch (e) {
                $('.error').html(e).fadeIn(200);
            }
            $('.textbox').val(textbox);
        } else {
            $('.textbox').val($('.textbox').val() + '' + $(this).val());
        }
        $('.history').html();
        calculated.forEach(function(ele) {
            $('.history').append('h: ' + ele + ' <br> ');
        });
    });
});