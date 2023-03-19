import axios from "axios";
import { showAlert } from "./alert";


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