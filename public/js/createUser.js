import axios from "axios";
import { showAlert } from "./alert";

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