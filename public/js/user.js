import axios from "axios";
import { showAlert } from "./alert";
const bcrypt = require("bcryptjs");

export const registerUser = async (fname, lname, role, email, password, passwordConfirm) => {
    try {
        const res = await axios({
            method: 'post',
            url: '/api/v1/users/signup',
            data: {
                firstName:fname,
                lastName:lname,
                role,
                email,
                password,
                passwordConfirm
            }
        })

        if (res.data.status === 'success') {
            const fname2 = document.querySelector('.fname');
            const lname2 = document.querySelector('.lname');
            let role2 = document.querySelector('input[name="role"]:checked');
            const email2 = document.querySelector('.email');
            const password2 = document.querySelector('.password');
            const passwordConfirm2 = document.querySelector('.passwordConfirm');

            fname2.value = '';
            lname2.value = '';
            email2.value = '';
            password2.value = '';
            passwordConfirm2.value = '';
        
            showAlert('success', 'Inscription réussie !');
            // window.setTimeout(() => {
            //     location.assign('/connexion');
            // }, 1500);
        }
    }
    catch (err) {
        showAlert('error', err.response.data.message);
    }
}

export const updateUser = async (result, id, pwd, roleChanged) => {
    let data = JSON.parse(result);

    if (roleChanged) {
        //add roleChanged to data object for patch request
        data.role = roleChanged;
    }
    if (pwd) {
        //add passwordChanged hash to data object for patch request
        pwd = await bcrypt.hash(pwd, 14);
        data.password = pwd;
    }
    try {
        const res = await axios({
            method: "PATCH",
            url: `/api/v1/users/${id}`,
            data,
        });

        if (res.data.status === "success") {
            showAlert("success", "Utilisateur modifié avec succès");
            window.setTimeout(() => {
                const modal = document.querySelector('.modal');
                const modalContent = document.querySelector('.modal-content');
                modal.classList.add('hidden');
                modalContent.classList.add('hidden');
            }, 1500);
            window.location.reload();
        }

    } catch (err) {
        showAlert("error", err.response.data.message);
    }
}


export const deleteUser = async (id, elToRemove) => {
    try {
        const res = await axios({
            method: "DELETE",
            url: `/api/v1/users/${id}`
        });

        console.log(res.data);

        if (res.data === "") {
            elToRemove.parentElement.parentElement.remove();
            showAlert("success", "Utilisateur supprimé avec succès");
        }

    } catch (err) {
        showAlert("error", err.response.data);
    }
}