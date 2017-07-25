const regForm = $('.container-register form');
const regInputs = $('.container-register input');

regForm.bootstrapValidator({
        live: 'enabled',
        trigger: null
    });

regInputs.focusin('click', function (event) {
    event.preventDefault();
    $('html, body').animate({
        scrollTop: regForm.offset().top
    }, 1000);
});