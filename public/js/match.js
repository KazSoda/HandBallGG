import axios from 'axios';
import { showAlert } from './alert';

export const matchInformation = async () => {
  try {
    const res = await axios({
      method: "get",
      url: "/api/v1/match",
    });
    if (res.data.status === "success") {
        init(res.data.data.matchs)
    }
  } catch (err) {
    showAlert("error", err.response.data.message);
  }
};

function init(queryResult){
    let inputSearchBar= document.querySelector("#searchInformation")
    let resSort = []
    queryResult.forEach((matchInfo,index,matchInfoFull) => {
        if(matchInfo.againstTeam.toUpperCase().includes(inputSearchBar.value.toUpperCase())||
        matchInfo.localTeam.toUpperCase().includes(inputSearchBar.value.toUpperCase())){
            resSort.push(matchInfo);
        }
    });
    console.log(resSort);
}