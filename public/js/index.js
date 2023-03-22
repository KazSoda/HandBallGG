import '@babel/polyfill'
import { login, logout } from './login.js';
import { init, displayCalendar, resizeCalendar, changeWeek, changeCalendarView, animation, BannerHoverAdd, BannerHoverRemove } from './match.js';
import { registerUser, deleteUser, updateUser } from './user';
import { createEquipe, updateEquipe, deleteEquipe } from './equipe';
import axios from 'axios';
import { showAlert } from "./alert";

// Select elements from connexion pug page 
const loginForm = document.querySelector('.loginForm');

// Select elements from _navbarAdmin and _navbarUser pug pages
const logOutBtn = document.querySelector('.deconnexion');

const searchFormMatch = document.querySelector('#searchFormMatch');

// Select elements from equipe pug page
const manageEquipe = document.querySelector('.adminEquipeUD');
const createEquipeForm = document.querySelector('.adminEquipeC');
const updateEquipeForm = document.querySelectorAll('.adminEquipeUD .updateEquipe');

// Select elements from users pug page 
const manageUser = document.querySelector('.adminUserUD');
const updateUserForm = document.querySelectorAll('.adminUserUD .updateUser');

// Select elements from create user pug page
const registerForm = document.querySelector('.formCreateUser');


/*------------------------------------------------------------
                        ~ Matchs ~
------------------------------------------------------------*/
if (searchFormMatch) {
    init()
    searchFormMatch.addEventListener('submit', e => {
        e.preventDefault();
        init();
    })

    displayCalendar();
    resizeCalendar();

    window.addEventListener('resize', () => {
        resizeCalendar();
    })


    document.querySelector('.navbar-calendar .prev').addEventListener('click', () => {
        changeWeek('prev')
    })

    document.querySelector('.navbar-calendar .next').addEventListener('click', () => {
        changeWeek('next')
    })

    document.querySelector('.navbar-calendar .today').addEventListener('click', () => {
        changeWeek('today')
    })

    document.querySelector('.navbar-calendar .day').addEventListener('click', () => {
        changeCalendarView('day');
    })

    document.querySelector('.navbar-calendar .week').addEventListener('click', () => {
        changeCalendarView('week');
    })

    document.querySelector('.navbar-calendar .month').addEventListener('click', () => {
        changeCalendarView('month');
    })

    let banner = document.querySelector(".mainSection");
    banner.addEventListener("mouseover", BannerHoverAdd);
    banner.addEventListener("mouseout", BannerHoverRemove);

    window.addEventListener('load', (event) => {
        animation();
    })
}


/*------------------------------------------------------------
                        ~ login/logout ~
------------------------------------------------------------*/

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
                        ~ Create Users ~
------------------------------------------------------------*/

if (registerForm) {
    registerForm.addEventListener('submit', e => {
        e.preventDefault();
        const fname = document.querySelector('.fname').value;
        const lname = document.querySelector('.lname').value;
        let role = document.querySelector('input[name="role"]:checked').value;
        if (role === "Admin") role = "Admin";
        if (role === "User") role = "User";
        const email = document.querySelector('.email').value;
        const password = document.querySelector('.password').value;
        const passwordConfirm = document.querySelector('.passwordConfirm').value;

        console.log(fname, lname, role, email, password, passwordConfirm);

        registerUser(fname, lname, role, email, password, passwordConfirm);
    })
}

/*------------------------------------------------------------
                        ~ Delete Users ~
------------------------------------------------------------*/


if (manageUser) {
    let deleteUserList = document.querySelectorAll('.deleteUser');
    let askDelete = document.querySelectorAll('.askDeleteUser');
    
    for (let i = 0; i < askDelete.length; i++) {
        askDelete[i].addEventListener('click', e => {
            e.preventDefault();

            let confirmDelete = document.querySelectorAll('.confirmDelete')[i];

            // remove hidden class for confirmDelete
            confirmDelete.classList.remove('hidden');

            confirmDelete.style.display = "flex";
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

    let userID = "";

    for (let i = 0; i < deleteUserList.length; i++) {
        deleteUserList[i].addEventListener('click', e => {
            e.preventDefault();
            userID = e.target.className.split(' ')[3];
            deleteUser(userID, e.target.parentElement.parentElement)

            // get the parent element of the button and remove it
        })
    }
}

/*------------------------------------------------------------
                        ~ Update Users ~
------------------------------------------------------------*/

if (updateUserForm) {
    const modal = document.querySelector('.modal');
    const modalContent = document.querySelector('.updateUserForm');
    const modalFooter = document.querySelector('.updateUserForm .modal-footer');
    const validateForm = document.querySelector('.updateUserForm .btn-success');


    updateUserForm.forEach(el => {
        el.addEventListener('click', e => {
            e.preventDefault();

            let id = e.target.parentElement.parentElement.parentElement.className.split(' ')[3];

            if (e.target.parentElement.parentElement.className.split(' ').length === 4) {
                id = e.target.parentElement.parentElement.className.split(' ')[3];
            } else if (e.target.parentElement.className.split(' ').length === 4) {
                id = e.target.parentElement.className.split(' ')[3];
            } else if (e.target.className.split(' ').length === 4) {
                id = e.target.className.split(' ')[3];
            }

            async function findUser(id) {
                try {
                    const res = await axios({
                        method: 'get',
                        url: `/api/v1/users/${id}`,
                    })
                    if (res.data.status === 'success') {
                        let userData = res.data.data.user;

                        const firstNameForm = document.querySelector('.updateUserForm #firstName');
                        const lastNameForm = document.querySelector('.updateUserForm #lastName');
                        const emailForm = document.querySelector('.updateUserForm #email');

                        if (firstName !== null) firstNameForm.value = userData.firstName;
                        if (lastName !== null) lastNameForm.value = userData.lastName;
                        if (email !== null) emailForm.value = userData.email;

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

                            const selectRoleChanged = document.querySelector('.choiceRole input[name="role"]:checked');
                            let roleChanged = "";

                            if (selectRoleChanged !== null) {
                                roleChanged = selectRoleChanged.value;
                            }
                            const form = new FormData();

                            form.append('firstName', firstNameForm.value);
                            form.append('lastName', lastNameForm.value);
                            form.append('email', emailForm.value);

                            let dataUser = JSON.stringify({
                                'firstName': firstNameForm.value, 'lastName': lastNameForm.value, 'email': emailForm.value
                            });

                            let pwd = document.querySelector('.updateUserForm #password').value;
                            if (pwd === "") pwd = null;
                            updateUser(dataUser, id, pwd, roleChanged);

                            modal.classList.add('hidden');
                            modalContent.classList.add('hidden');

                            firstNameForm.textContent = "";
                            lastNameForm.textContent = "";
                            emailForm.textContent = "";
                        })
                    }
                }
                catch (err) {
                    showAlert('error', err.response.data.message);
                }
            }
            findUser(id);
        })
    })
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


            let team = e.target.parentElement.parentElement.parentElement.parentElement;
            let id = e.target.parentElement.parentElement.parentElement.className.split(' ')[3]
            // Get the team details to fill the form from the DOM (sometimes it was not withing with the first parentElement so I had to do it like this)
            if (e.target.parentElement.classList.contains('team')) {
                team = e.target.parentElement;
            } else if (e.target.parentElement.parentElement.classList.contains('team')) {
                team = e.target.parentElement.parentElement;
            } else if (e.target.parentElement.parentElement.parentElement.classList.contains('team')) {
                team = e.target.parentElement.parentElement.parentElement;
            } else if (e.target.parentElement.parentElement.parentElement.parentElement.classList.contains('team')) {
                team = e.target.parentElement.parentElement.parentElement.parentElement;
            }

            if (e.target.parentElement.parentElement.className.split(' ').length === 4) {
                id = e.target.parentElement.parentElement.className.split(' ')[3];
            } else if (e.target.parentElement.className.split(' ').length === 4) {
                id = e.target.parentElement.className.split(' ')[3];
            } else if (e.target.className.split(' ').length === 4) {
                id = e.target.className.split(' ')[3];
            }

            const wording = team.querySelector('.wording');
            const trainer = team.querySelector('.trainer');
            const slot = team.querySelector('.slot');
            const comment = team.querySelector('.comment');

            const wordingForm = document.querySelector('.updateEquipeForm #wording');
            const trainerForm = document.querySelector('.updateEquipeForm #trainer');
            const slotForm = document.querySelector('.updateEquipeForm #slot');
            const commentForm = document.querySelector('.updateEquipeForm #comment');

            if (wording !== null) wordingForm.value = wording.textContent;
            if (trainer !== null) trainerForm.value = trainer.textContent;
            if (slot !== null) slotForm.value = slot.textContent;
            if (comment !== null) commentForm.value = comment.textContent;

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

                updateEquipe(form, id, team);

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