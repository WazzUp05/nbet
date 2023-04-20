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

// form.addEventListener('click', function (event) {
//     event.preventDefault();
// });

btnSubmit.addEventListener('click', function () {
    if (inputAgree.checked) {
        modal.classList.add('open');
        const phone = inputPhone.value;
        localStorage.setItem('phone', phone);
    }
});

close.addEventListener('click', function () {
    modal.classList.remove('open');
});
