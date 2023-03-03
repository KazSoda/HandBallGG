import axios from "axios";
import { showAlert } from "./alert";

export const matchInformation = async () => {
  let currentDate=new Date();
  let currentDate2=new Date();
  let threeWeekAgo = currentDate.addDays(- (7*3));
  let twoMonthAfter = currentDate2.addDays(7*8);
  try {
    const res = await axios({
      method: "get",
      url: `/api/v1/match?sort=date&date[gt]=${threeWeekAgo}&date[lt]=${twoMonthAfter}`,
    });
    if (res.data.status === "success") {
      let inputSearchBar = document.querySelector("#searchInformation");
      searchMatchByTeam(res.data.data.matchs, inputSearchBar);
    }
  } catch (err) {
    showAlert("error", err.response.data.message);
  }
};

function searchMatchByTeam(queryResult, enteredValue) {
  let mainSection = document.querySelector(".mainSection");
  let resSort = [];
  queryResult.forEach((matchInfo, index, matchInfoFull) => {
    if (
      matchInfo.againstTeam
        .toUpperCase()
        .includes(enteredValue.value.toUpperCase()) ||
      matchInfo.localTeam
        .toUpperCase()
        .includes(enteredValue.value.toUpperCase())
    ) {
      resSort.push(matchInfo);
    }
  });



  if (resSort.length == 0) {
    mainSection.innerHTML = `<h1>La recherche n'a pas donné de résultats</h1>`;
  } else {
    mainSection.innerHTML =''
    resSort.forEach(sortedMatch => {
      let date = new Date(sortedMatch.date).toDateString()

      



      mainSection.innerHTML += `


      <section class="matchSection">
      <section class="matchInformation">
      <section class="headerInformationMatch">
      <h1>${sortedMatch.gymnasium} : ${date}</h1>
        </section>
        <section class="bodyInformationMatch">
          <article class="firstEquipeInformation">
            <h1>${sortedMatch.localTeam}</h1>
          </article>
          <p>VS</p>
          <article class="secondEquipeInformation">
          <h1>${sortedMatch.againstTeam}</h1>
          </article>
        </section>
      </section>
    </section>

    `;
    });
  }
}



Date.prototype.addDays = function(days) {
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
}