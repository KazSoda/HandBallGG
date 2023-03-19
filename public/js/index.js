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

    let askDelete = document.querySelectorAll('.askDeleteEquipe');
    for (let i = 0; i < askDelete.length; i++) {
        askDelete[i].addEventListener('click', e => {
            e.preventDefault();
            let confirmDelete = document.querySelectorAll('.confirmDelete')[i]
            let parentHeight = e.target.parentElement.parentElement.parentElement.parentElement.clientHeight;

            confirmDelete.style.display = "flex";
            confirmDelete.style.height = `${parentHeight}px`;
        })
    }

    let deleteNo = document.querySelectorAll('.deleteNo')

    deleteNo.forEach(el => {
        el.addEventListener('click', e => {
            e.preventDefault();
            document.querySelectorAll('.confirmDelete').forEach(item => {
                item.style.display = "none"
            })
        })
    })

    let equipeID = "";

    for (let i = 0; i < deleteEquipeList.length; i++) {
        deleteEquipeList[i].addEventListener('click', e => {
            e.preventDefault();
            equipeID = e.target.className.split(' ')[3];
            deleteEquipe(equipeID, e.target.parentElement.parentElement)

            // get the parent element of the button and remove it
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






/*------------------------------------------------------------
                    ~ Hamburger Menu ~
------------------------------------------------------------*/

let ouvert = false;
const menu = document.querySelector('nav>section');

document.querySelector('.hambuger').addEventListener('click', hamburgerMenu);


function hamburgerMenu() {
    if (ouvert) {
        menu.classList.add('hidden');
        ouvert = false;
    } else {
        menu.classList.remove('hidden');
        ouvert = true;
    }
}

const menuLinks = document.querySelectorAll('nav>section>a');



for (let i = 0; i < menuLinks.length; i++) {
    menuLinks[i].addEventListener('click', closeMenu)
}

function closeMenu() {

    if (window.innerWidth < 980) {
        menu.classList.add('hidden');
        ouvert = false;
    }
}



if (window.innerWidth > 980) {
    menu.classList.remove('hidden');
}



if (window.innerWidth < 980) {
    menu.classList.add('hidden');
}