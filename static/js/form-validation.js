const validatedForm = $('.container-register form');
const validatedInputs = $('.container-register input');

validatedForm.bootstrapValidator({
        live: 'enabled',
        trigger: null
    });

validatedInputs.focusin('click', function (event) {
    event.preventDefault();
    $('html, body').animate({
        scrollTop: validatedForm.offset().top
    }, 1000);
});