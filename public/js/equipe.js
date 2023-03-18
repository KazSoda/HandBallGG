import axios from "axios";
import { showAlert } from "./alert";


export const deleteEquipe = async (id) => {
    try {
        const res = await axios({
            method: "DELETE",
            url: `/api/v1/equipe/${id}`
        });


        if (res.data === "") {
            showAlert("success", "Équipe supprimée avec succès");
            // window.setTimeout(() => {
            //     location.assign("/equipes");
            // }, 1500);
        }
    } catch (err) {
        showAlert("error", err.response.data.message);
    }
}