'use strict';
$(document).foundation();

let images;

// fetch error handler
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

const checkStatus = (response) => {
    if (response.ok) {
        return Promise.resolve(response);
    } else {
        return Promise.reject(new Error(response.statusText));
    }
};

document.querySelector('button.large').addEventListener('click', () => {
    const name = document.querySelector('input[name="username"]');
    const mail = document.querySelector('input[name="usermail"]');
    const text = document.querySelector('textarea');

    fetch('/report', {
        method: 'POST',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        body: JSON.stringify({ username: name.value, usermail: mail.value, message: text.value }),
    })
        .then(checkStatus)
        .catch((err) => console.log(err));
    name.value = '';
    mail.value = '';
    text.value = '';
});
