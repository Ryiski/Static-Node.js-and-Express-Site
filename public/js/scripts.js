'use strict';
$(document).foundation();

// array of icon images
let images;

// get fetch error handler
const handleErrors = (res) => {
    if (!res.ok) {
        console.error(response.statusText);
    }
    return res.json();
};

// fetch icon images from teamtreehouse
fetch('https://teamtreehouse.com/adelak.json')
    .then(handleErrors)
    .then((data) => {
        // map icons url
        images = data.badges.map((img) => img.icon_url);
    })
    .catch((err) => console.error(err));

// every 10 sec change the image of the background
setInterval(() => {
    const randomNumber = Math.floor(Math.random() * images.length);
    $('#bg').fadeOut(2000);
    // to improve image animation setTimeout and change image source to a random url from images array
    setTimeout(() => {
        $('#bg').attr('src', `${images[randomNumber]}`);
    }, 1700);
    $('#bg').fadeIn(2000);
}, 10000);

// post fetch error handler
const checkStatus = (response) => {
    if (response.ok) {
        return Promise.resolve(response);
    } else {
        return Promise.reject(new Error(response.statusText));
    }
};

const reportButton = document.querySelector('button.large');

// to avoid error in console check for reportButton then add EventListener if its true
if (reportButton) {
    reportButton.addEventListener('click', () => {
        const name = document.querySelector('input[name="username"]');
        const mail = document.querySelector('input[name="usermail"]');
        const text = document.querySelector('textarea');
        const postOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: name.value, usermail: mail.value, message: text.value }),
        };

        // post input values to report path
        fetch('/report', postOptions)
            .then(checkStatus)
            .catch((err) => console.log(err));
        // empty from once
        name.value = '';
        mail.value = '';
        text.value = '';
    });
}
