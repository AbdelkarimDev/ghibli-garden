const regForm = $('.container-register form');
const regInputs = $('.container-register input');

regForm.bootstrapValidator({
        live: 'enabled',
        trigger: null
    });
console.log("Here")
regInputs.focusout('click', function (event) {
    event.preventDefault();
    const bootstrapValidator = regForm.data('bootstrapValidator');

});