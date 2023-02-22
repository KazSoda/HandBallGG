import axios from 'axios';
import { showAlert } from './alert';


export const login = async (email, password) => {

    let logo = document.querySelector('#logo');
    let info = document.querySelector('#logo section');

    info.innerHTML = '<div class="spinner"></div>'
    try {
        const res = await axios({
            method: 'post',
            url: '/api/v1/users/login',
            data: {
                email,
                password
            }
        })

        if (res.data.status === 'success') {

            logo.style.backgroundColor = 'green';
            info.innerHTML = `<p style="margin:0 ">Bienvenue ${res.data.fname}</p>`;



            if (res.data.role === 'admin') {
                window.setTimeout(() => {
                    location.assign('/accueilAdmin');
                }, 1500);
                // location.assign('/accueilAdmin');
            }
            if (res.data.role === 'chief') {
                window.setTimeout(() => {
                    location.assign('/accueilChef');
                }, 1500);
                // location.assign('/accueilChef');
            }
            if (res.data.role === 'employee') {
                window.setTimeout(() => {
                    location.assign('/accueilEmployee');
                }, 1500);
                // location.assign('/accueilEmployee');
            }
        }
    }
    catch (err) {
        logo.style.backgroundColor = '#b80000';
        info.innerHTML = `<p style="margin:0 ">${err.response.data.message}</p>`;
        // showAlert('error', err.response.data.message);
    }
}



export const logout = async () => {
    // console.log("logout");
    try {
        const res = await axios({
            method: 'get',
            url: '/api/v1/users/logout',
        })

        if (res.data.status === 'success') {
            // redirect to the login page
            location.assign('/connexion');
        }

    } catch (err) {
        showAlert('error', err.response.data.message);
    }
}