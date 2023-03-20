import axios from "axios";
import { showAlert } from "./alert";
import Calendar from '@toast-ui/calendar';
import '@toast-ui/calendar/dist/toastui-calendar.min.css';


const calendar = new Calendar('#calendar', {
	defaultView: 'week',
	useFormPopup: false,
	useCreationPopup: false,
	useDetailPopup: true,
	isReadOnly: true,
	usageStatistics: false,
	allday: false,

	theme: {
		common: {
			backgroundColor: 'var(--bg-color)',
		},
	},
	week: {
		startDayOfWeek: 1,
		dayNames: ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'],
		narrowWeekend: true,	
		taskView: false,  // e.g. true, false, or ['task', 'milestone']
	},
	month: {
		startDayOfWeek: 1,
		dayNames: ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'],
		narrowWeekend: true,
		taskView: false,  // e.g. true, false, or ['task', 'milestone']
	},
	template: {
		time(event) {
			const { start, end, title } = event;

			return `<span style="color: black;">${formatTime(start)}~${formatTime(end)} ${title}</span>`;
		},
		allday(event) {
			return `<span style="color: gray;">${event.title}</span>`;
		},
	},
});


Date.prototype.addDays = function (days) {
	var date = new Date(this.valueOf());
	date.setDate(date.getDate() + days);
	return date;
}


const matchInformation = async () => {
	let currentDate = new Date();
	let currentDate2 = new Date();
	let threeWeekAgo = currentDate.addDays(- (7 * 3));
	let twoMonthAfter = currentDate2.addDays(7 * 8);
	try {
		const res = await axios({
			method: "get",
			url: `/api/v1/match?sort=date&date[gt]=${threeWeekAgo}&date[lt]=${twoMonthAfter}`,
		});
		if (res.data.status === "success") {
			return res.data.data.matchs;
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
				.includes(enteredValue.toUpperCase()) ||
			matchInfo.localTeam
				.toUpperCase()
				.includes(enteredValue.toUpperCase())
		) {
			resSort.push(matchInfo);
		}
	});

	if (resSort.length == 0) {
		mainSection.innerHTML = `<h1>La recherche n'a pas donné de résultats</h1>`;
	} else {



		mainSection.innerHTML = ''
		resSort.forEach(sortedMatch => {

			calendar.createEvents(sortedMatch);



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
								<img src="img/logo.png" alt="photo">
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





export const init = async () => {

	// let data = await matchInformation().then(result => result.data);
	let data = await matchInformation().then(result => result);

	// Search a match based on the url parameter
	const urlParams = new URLSearchParams(window.location.search);

	let name = urlParams.get('team');
	if (name !== null) {
		name = name.replace(/['"]/g, ""); // remove all occurrences of ' and "
		searchMatchByTeam(data, name);
		// remove the url parameter without reloading the page
		window.history.replaceState({}, document.title, "/" + "matchs");
	}

	// Search a match based on the input value
	let inputSearchBar = document.querySelector("#searchInformation").value;
	if (inputSearchBar !== "") {
		searchMatchByTeam(data, inputSearchBar);
	}

	// Search a match based on the select value
	document.querySelector("#searchMatchBySelect").addEventListener("change", (e) => {
		let select = document.getElementById("searchMatchBySelect").value;
		if (select != "0") {
			searchMatchByTeam(data, select);
		}
	});


}





export const displayCalendar = () => {

	calendar.render();
}
// execute a function on windows resize

export const resizeCalendar = () => {
	let width = window.innerWidth;
	if (width < 800) {
		calendar.changeView('day');
		calendar.render();
	} else if (width > 800) {
		calendar.changeView('week');
		calendar.render();
	}
};


export const changeWeek = (type) => {
	if (type == 'next') {
		calendar.move(1);
	}
	if (type == 'prev') {
		calendar.move(-1);
	}
}


Date.prototype.addDays = function (days) {
	var date = new Date(this.valueOf());
	date.setDate(date.getDate() + days);
	return date;
}

