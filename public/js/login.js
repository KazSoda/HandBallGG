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
            info.innerHTML = `<p style="margin:0 ">Bienvenue ${res.data.data.user.firstName}</p>`;

            window.setTimeout(() => {
                location.assign('/');
            }, 1500);
        }
    }
    catch (err) {
        logo.style.backgroundColor = '#b80000';
        info.innerHTML = `<p style="margin:0 ">${err.response.data.message}</p>`;
        // showAlert('error', err.response.data.message);
    }
}



export const logout = async () => {
    try {
        const res = await axios({
            method: 'get',
            url: '/api/v1/users/deconnexion',
        })

        if (res.data.status === 'success') {
            // redirect to the login page
            location.assign('/');
        }

    } catch (err) {
        showAlert('error', err.response.data.message);
    }
}