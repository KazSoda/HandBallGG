import axios from "axios";
import { showAlert } from "./alert";

//create equipe function with axios request to api
//parameters: wording, trainer, slot, comment
export const createEquipe = async (wording, trainer, slot, comment) => {
    try {
        //post request for create equipe
        const res = await axios({
            method: "POST",
            url: "/api/v1/equipe",
            data: {
                wording,
                trainer,
                slot,
                comment
            }
        });

        //if request is success, send message to user 
        if (res.data.status === "success") {
            showAlert("success", "Équipe créée avec succès");
            window.setTimeout(() => {
                const modal = document.querySelector('.modal');
                const modalContent = document.querySelector('.modal-content');

                modal.classList.add('hidden');
                modalContent.classList.add('hidden');

            }, 1500);
        }

    } catch (err) {
        showAlert("error", err.response.data.message);
    }
}

//update equipe function
//parameters: data, id, team
export const updateEquipe = async (data, id, team) => {
    try {
        //patch request for update equipe
        const res = await axios({
            method: "PATCH",
            url: `/api/v1/equipe/${id}`,
            data
        });

        //if request is success, send message to user
        if (res.data.status === "success") {
            showAlert("success", "Équipe modifiée avec succès");
            window.setTimeout(() => {
                const modal = document.querySelector('.modal');
                const modalContent = document.querySelector('.modal-content');

                //if data in team page is not empty, update the team
                if (data.get('wording') !== "") {
                    team.querySelector('.wording').textContent = data.get('wording');
                }
                if (data.get('trainer') !== "") {
                    team.querySelector('.trainer').textContent = data.get('trainer');
                }
                if (data.get('slot') !== "") {
                    team.querySelector('.slot').textContent = data.get('slot');
                }
                if (data.get('comment') !== "") {
                    team.querySelector('.comment').textContent = data.get('comment');
                }
                if (data.get('photo') !== "") {
                    team.querySelector('.photo').src = "img/equipes/" + res.data.data.updateEquipe.photo;
                }

                modal.classList.add('hidden');
                modalContent.classList.add('hidden');
            }, 1500);
        }
    } catch (err) {
        showAlert("error", err.response.data.message);
    }
}

//delete equipe function
export const deleteEquipe = async (id, elToRemove) => {
    console.log(id, elToRemove);
    try {
        //delete request for delete equipe
        const res = await axios({
            method: "DELETE",
            url: `/api/v1/equipe/${id}`
        });

        //if request is success, send message to user and remove the team from the DOM
        if (res.data === "") {
            elToRemove.parentElement.remove();
            showAlert("success", "Équipe supprimée avec succès");
        }
    } catch (err) {
        showAlert("error", err.response.data.message);
    }
}