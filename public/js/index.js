import '@babel/polyfill'
import { login, logout } from './login.js';
import { init } from './match.js';
import { createEquipe, updateEquipe, deleteEquipe } from './equipe';


// Select elements
const loginForm = document.querySelector('.loginForm');
const logOutBtn = document.querySelector('.deconnexion');

const searchFormMatch = document.querySelector('#searchFormMatch');
const manageEquipe = document.querySelector('.adminEquipeUD');
const createEquipeForm = document.querySelector('.adminEquipeC');
const updateEquipeForm = document.querySelectorAll('.adminEquipeUD .updateEquipe');

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








/*------------------------------------------------------------
                        ~ Equipes ~
------------------------------------------------------------*/
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

}

if (createEquipeForm) {

    const modal = document.querySelector('.modal');
    const modalContent = document.querySelector('.createEquipe');
    const modalFooter = document.querySelector('.createEquipe .modal-footer');
    const validateForm = document.querySelector('.createEquipe .btn-success');

    createEquipeForm.addEventListener('click', e => {
        modal.classList.remove('hidden');
        modalContent.classList.remove('hidden');
    })


    modal.addEventListener('click', e => {
        modal.classList.add('hidden');
        modalContent.classList.add('hidden');
    })

    modalFooter.addEventListener('click', e => {
        modal.classList.add('hidden');
        modalContent.classList.add('hidden');
    })

    validateForm.addEventListener('click', e => {
        e.preventDefault();

        const wording = document.querySelector('.createEquipe #wording').value;
        const trainer = document.querySelector('.createEquipe #trainer').value;
        const slot = document.querySelector('.createEquipe #slot').value;
        const comment = document.querySelector('.createEquipe #comment').value;


        createEquipe(wording, trainer, slot, comment);


        modal.classList.add('hidden');
        modalContent.classList.add('hidden');
    })
}



if (updateEquipeForm) {
    const modal = document.querySelector('.modal');
    const modalContent = document.querySelector('.updateEquipeForm');
    const modalFooter = document.querySelector('.updateEquipeForm .modal-footer');
    const validateForm = document.querySelector('.updateEquipeForm .btn-success');


    updateEquipeForm.forEach(el => {
        el.addEventListener('click', e => {
            e.preventDefault();

            const id = e.target.className.split(' ')[3];

            const wording = e.target.parentElement.parentElement.parentElement.parentElement.querySelector('.wording');
            const trainer = e.target.parentElement.parentElement.parentElement.parentElement.querySelector('.trainer');
            const slot = e.target.parentElement.parentElement.parentElement.parentElement.querySelector('.slot');
            const comment = e.target.parentElement.parentElement.parentElement.parentElement.querySelector('.comment');

            const wordingForm = document.querySelector('.updateEquipeForm #wording');
            const trainerForm = document.querySelector('.updateEquipeForm #trainer');
            const slotForm = document.querySelector('.updateEquipeForm #slot');
            const commentForm = document.querySelector('.updateEquipeForm #comment');

            wordingForm.value = wording.textContent;
            trainerForm.value = trainer.textContent;
            slotForm.value = slot.textContent;
            commentForm.value = comment.textContent;


            modal.classList.remove('hidden');
            modalContent.classList.remove('hidden');

            modal.addEventListener('click', e => {
                modal.classList.add('hidden');
                modalContent.classList.add('hidden');
            })

            modalFooter.addEventListener('click', e => {
                modal.classList.add('hidden');
                modalContent.classList.add('hidden');
            })

            validateForm.addEventListener('click', e => {
                e.preventDefault();

                const form = new FormData();

                form.append('wording', wordingForm.value);
                form.append('trainer', trainerForm.value);
                form.append('slot', slotForm.value);
                form.append('comment', commentForm.value);
                if (document.querySelector('.updateEquipeForm #photo').files[0] !== undefined) {
                    form.append('photo', document.querySelector('.updateEquipeForm #photo').files[0]);
                }

                console.log(document.querySelector('.updateEquipeForm #photo').files[0]);

                updateEquipe(form, id);

                modal.classList.add('hidden');
                modalContent.classList.add('hidden');

                wordingForm.textContent = "";
                trainerForm.textContent = "";
                slotForm.textContent = "";
                commentForm.textContent = "";

            })
        })
    })
}