
// //////////// REVIEWS//////////////

$(document).ready(function () {
    // Function to switch to the next client element
    function switchToNext() {
        var activeBlock = $('.client-single.active');
        var nextBlock = activeBlock.next('.client-single');

        if (!nextBlock.length) {
            nextBlock = $('.client-single:first-child');
        }

        var currentPos = nextBlock.attr('data-position');
        var newPos = activeBlock.attr('data-position');

        activeBlock.removeClass('active').removeClass(newPos).addClass('inactive').addClass(currentPos);
        activeBlock.attr('data-position', currentPos);

        nextBlock.addClass('active').removeClass('inactive').removeClass(currentPos).addClass(newPos);
        nextBlock.attr('data-position', newPos);
    }

    // Call switchToNext every 2 seconds
    var interval = setInterval(switchToNext, 3500);

    // Pause the interval on client-single click
    $('.client-single').on('click', function (event) {
        event.preventDefault();

        clearInterval(interval);

        var active = $(this).hasClass('active');

        var parent = $(this).parents('.testi-wrap');

        if (!active) {
            var activeBlock = parent.find('.client-single.active');

            var currentPos = $(this).attr('data-position');
            var newPos = activeBlock.attr('data-position');

            activeBlock.removeClass('active').removeClass(newPos).addClass('inactive').addClass(currentPos);
            activeBlock.attr('data-position', currentPos);

            $(this).addClass('active').removeClass('inactive').removeClass(currentPos).addClass(newPos);
            $(this).attr('data-position', newPos);
        }

        // Restart the interval after 2 seconds
        interval = setInterval(switchToNext, 3500);
    });
});
