$(function () {
    const $filmTitle = $('.film-title');
    $('html, body').animate({
        scrollTop: $filmTitle.offset().top
    }, 1000);
});

