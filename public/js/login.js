import axios from 'axios';
import { showAlert } from './alert';


//login function
export const login = async (email, password) => {

    let logo = document.querySelector('#logo');
    let info = document.querySelector('#logo section');
    info.innerHTML = '<div class="spinner"></div>'
    try {
        //post request for login
        const res = await axios({
            method: 'post',
            url: '/api/v1/users/login',
            data: {
                email,
                password
            }
        })

        //if request is success, change backgroundColor (green: success or red: error) and redirect to home page
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


//logout function
export const logout = async () => {
    try {
        //get request for logout
        const res = await axios({
            method: 'get',
            url: '/api/v1/users/deconnexion',
        })

        //if request is success, redirect to home page
        if (res.data.status === 'success') {
            location.assign('/');
        }

    } catch (err) {
        showAlert('error', err.response.data.message);
    }
}