import '@babel/polyfill'
import { login, logout } from './login.js';


// Select elements
const loginForm = document.querySelector('.loginForm');
const logOutBtn = document.querySelector('.nav-right');






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
