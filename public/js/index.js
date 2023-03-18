import '@babel/polyfill'
import { login, logout } from './login.js';
import { init } from './match.js';
import { deleteEquipe } from './equipe';


// Select elements
const loginForm = document.querySelector('.loginForm');
const logOutBtn = document.querySelector('.deconnexion');

const searchFormMatch = document.querySelector('#searchFormMatch');
const manageEquipe = document.querySelector('.adminEquipeUD');

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
        const email = document.querySelector('#email').value;
        const password = document.querySelector('#password').value;
        login(email, password);
    })
}


if (logOutBtn) {
    logOutBtn.addEventListener('click', logout);
}


if (manageEquipe) {

    let updateEquipeList = document.querySelectorAll('.updateEquipe');
    let deleteEquipeList = document.querySelectorAll('.deleteEquipe');

    let equipeID = "";

    for (let i = 0; i < deleteEquipeList.length; i++) {
        deleteEquipeList[i].addEventListener('click', e => {
            e.preventDefault();
            equipeID = e.target.className.split(' ')[3];
            deleteEquipe(equipeID);
        })
    }

    // document.querySelector('.opSave').addEventListener('click', e => {
    //     if (operationID != "") {
    //         e.preventDefault();
    //         const name = document.querySelector('.opname').value;
    //         const price = document.querySelector('.opprice').value;
    //         const duration = document.querySelector('.opduration').value;

    //         updateOperation(operationID, name, price, duration);
    //     }
    // })

    // document.querySelector('.opDelete').addEventListener('click', e => {
    //     if (operationID != "") {
    //         deleteOperation(operationID);
    //     }
    // })
}
