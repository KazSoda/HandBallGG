import axios from "axios";
import { showAlert } from "./alert";


export const createEquipe = async (wording, trainer, slot, comment) => {
    try {
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

export const updateEquipe = async (data, id) => {
    try {
        const res = await axios({
            method: "PATCH",
            url: `/api/v1/equipe/${id}`,
            data
        });

        if (res.data.status === "success") {
            console.log(res.data.data);
            showAlert("success", "Équipe modifiée avec succès");
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


export const deleteEquipe = async (id, elToRemove) => {
    try {
        const res = await axios({
            method: "DELETE",
            url: `/api/v1/equipe/${id}`
        });


        if (res.data === "") {
            elToRemove.remove();
            showAlert("success", "Équipe supprimée avec succès");
        }

    } catch (err) {
        showAlert("error", err.response.data.message);
    }
}