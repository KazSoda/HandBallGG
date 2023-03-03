import '@babel/polyfill'
import { login, logout } from './login.js';
import { init } from './match.js';

// Select elements
const loginForm = document.querySelector('.loginForm');
const logOutBtn = document.querySelector('.nav-right');

const searchFormMatch = document.querySelector('#searchFormMatch');

if (searchFormMatch) {
    init()
    searchFormMatch.addEventListener('submit', e => {
        e.preventDefault();
        init();
    })
}

// Delegation
if (loginForm) {
    loginForm.addEventListener('submit', e => {
        e.preventDefault();
        // const email = document.querySelector('#email').value;
        // const password = document.querySelector('#password').value;
        login(email, password);
    })
}


if (logOutBtn) {
    logOutBtn.addEventListener('click', logout);
}











