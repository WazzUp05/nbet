window.onload = function () {
    var input = document.querySelector('#phone');
    window.intlTelInput(input, {
        initialCountry: 'auto',
        geoIpLookup: (callback) => {
            fetch('https://ipapi.co/json')
                .then((res) => res.json())
                .then((data) => callback(data.country_code))
                .catch(() => callback('us'));
        },
        utilsScript: 'https://cdn.jsdelivr.net/npm/intl-tel-input@18.1.1/build/js/utils.js',
    });
};

// MODAL
const btnSubmit = document.querySelector('#btn-submit');
const modal = document.querySelector('.modal');
const close = document.querySelector('.close');
const inputPhone = document.querySelector('#phone');
const inputAgree = document.querySelector('.form-check-input');
const form = document.querySelector('.form');
const errorMsg = document.querySelector('#error-msg');
const validMsg = document.querySelector('#valid-msg');

// initialise plugin
const iti = window.intlTelInput(inputPhone, {
    utilsScript: 'https://cdn.jsdelivr.net/npm/intl-tel-input@18.1.1/build/js/utils.js',
});

// here, the index maps to the error code returned from getValidationError - see readme
const errorMap = ['Invalid number', 'Invalid country code', 'Too short number', 'Too long number', 'Invalid number'];

(function () {
    if (inputPhone.value.trim() !== 0) {
        btnSubmit.disabled = true;
    }
})();

const reset = () => {
    btnSubmit.disabled = false;
    errorMsg.innerHTML = '';
    errorMsg.classList.add('hide');
    validMsg.classList.add('hide');
};

// on blur: validate
inputPhone.addEventListener('blur', () => {
    reset();
    if (inputPhone.value.trim()) {
        if (iti.isValidNumber()) {
            validMsg.classList.remove('hide');
            btnSubmit.disabled = false;
        } else {
            btnSubmit.disabled = true;

            const errorCode = iti.getValidationError();

            errorMsg.innerHTML = errorMap[errorCode];
            errorMsg.classList.remove('hide');
        }
    }
});

// on keyup / change flag: reset
inputPhone.addEventListener('change', reset);
inputPhone.addEventListener('keyup', reset);

btnSubmit.addEventListener('click', function () {
    if (inputPhone.value.trim()) {
        if (iti.isValidNumber()) {
            if (inputAgree.checked) {
                console.log('checked');

                btnSubmit.disabled = false;
                modal.classList.add('open');
                const phone = inputPhone.value;
                localStorage.setItem('phone', phone);

                axios
                    .post('http://209.38.236.254/api/save-and-save', {
                        number: phone,
                    })
                    .then(function (response) {
                        console.log(response);
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            } else {
                btnSubmit.disabled = true;
                inputAgree.addEventListener('change', function () {
                    if (inputAgree.checked) {
                        btnSubmit.disabled = false;
                    } else btnSubmit.disabled = true;
                });
            }
        } else {
            btnSubmit.disabled = true;
        }
    } else btnSubmit.disabled = true;
});

close.addEventListener('click', function () {
    modal.classList.remove('open');
});
