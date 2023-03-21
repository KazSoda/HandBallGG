import axios from "axios";
import { showAlert } from "./alert";
import Calendar from '@toast-ui/calendar';
import '@toast-ui/calendar/dist/toastui-calendar.min.css';
import 'tui-date-picker/dist/tui-date-picker.css';
import 'tui-time-picker/dist/tui-time-picker.css';

function formatTime(time) {
	const hours = time.getHours();
	const minutes = time.getMinutes();
	return `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
}


Date.prototype.addDays = function (days) {
	var date = new Date(this.valueOf());
	date.setDate(date.getDate() + days);
	return date;
}

Date.prototype.addMinutes = function (m) {
	this.setTime(this.getTime() + (m * 60 * 1000));
	return this;
}




const calendar = new Calendar('#calendar', {
	defaultView: 'week',
	useCreationPopup: true,
	useFormPopup: true,
	isReadOnly: false,

	useDetailPopup: true,
	usageStatistics: false,

	theme: {
		common: {
			backgroundColor: 'var(--nav-bg-color)',
			border: '1px solid var(--border-norm)',
			color: 'var(--nav-text-color)',

		},
	},
	week: {
		startDayOfWeek: 1,
		dayNames: ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'],
		narrowWeekend: false,
		taskView: false,  // e.g. true, false, or ['task', 'milestone']
		hourStart: 6,
		eventView: ['time'],
	},
	month: {
		startDayOfWeek: 1,
		dayNames: ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'],
		narrowWeekend: true,
		taskView: false,  // e.g. true, false, or ['task', 'milestone']
		hourStart: 6,
		eventView: ['time'],
	},
	template: {
		time(event) {
			const { start, end, title } = event;
			return `<span>${title}</span>`;
		},
		allday(event) {
			return `<span style="color: gray;">${event.title}</span>`;
		},
	},
});


calendar.setTheme({
	week: {
		timeGridLeft: {
			width: '50px',
		},
		timeGridHalfHourLine: {
			borderBottom: '1px dotted #e5e5e550',
		},
	},
});

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

		let calendarMatch = []

		mainSection.innerHTML = ''
		resSort.forEach(sortedMatch => {
			let calendarMatchTemp = {}
			calendarMatchTemp.id = sortedMatch._id;
			calendarMatchTemp.title = sortedMatch.localTeam + " VS " + sortedMatch.againstTeam;
			calendarMatchTemp.start = sortedMatch.date;
			calendarMatchTemp.end = new Date(sortedMatch.date).addMinutes(90);
			calendarMatchTemp.isAllDay = false;
			calendarMatchTemp.category = 'time';
			calendarMatchTemp.dueDateClass = '';
			calendarMatchTemp.location = sortedMatch.gymnasium;
			calendarMatchTemp.attendees = [sortedMatch.localTeam, sortedMatch.againstTeam];
			let saturation = Math.floor(Math.random() * 100);
			let lightness = Math.floor(Math.random() * 20) + 10;
			calendarMatchTemp.backgroundColor = `hsl(120, ${saturation}%, ${lightness}%)`;

			// calendarMatchTemp.backgroundColor = '#' + (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6);
			calendarMatchTemp.color = '#ffffff';

			calendarMatch.push(calendarMatchTemp);


			let date = new Date(sortedMatch.date).toLocaleString()
			mainSection.innerHTML += `
      			<section class="matchSection">
      				<section class="matchInformation">
      					<section class="headerInformationMatch">
      						<h1>${sortedMatch.gymnasium} : ${date}</h1>
      					</section>
      					<section class="bodyInformationMatch">
      						<article class="firstEquipeInformation">
      							<h1>Equipe locale</h1>
								<img src="img/logo.png" alt="photo">
								<h1>${sortedMatch.localTeam}</h1>
      						</article>
      						<p>VS</p>
      						<article class="secondEquipeInformation">
      							<h1>Equipe adverse</h1>
      							<img src="img/rivals/${sortedMatch.againstTeam}.png" alt="photoEnemyTeam">
      							<h1>${sortedMatch.againstTeam}</h1>
      						</article>
      					</section>
      				</section>
    			</section>
    		`;
		});

		calendar.createEvents(calendarMatch);

		animation();
	}
}


// creating an event
calendar.on('beforeCreateEvent', (eventObj) => {
	console.log(eventObj);
	// calendar.createEvents([
	// 	{
	// 		...eventObj,
	// 		id: uuid(),
	// 	},
	// ]);
});


// updating an event
calendar.on('beforeUpdateEvent', ({ event, change }) => {
	console.log(change);
	// calendar.updateEvent(event.id, event.calendarId, change);
});


// deleting an event
calendar.on('beforeDeleteEvent', async (eventObj) => {
	console.log(eventObj.id, eventObj.calendarId);

	try {
		const res = await axios({
			method: 'delete',
			url: `/api/v1/match/${eventObj.id}`,
		})

		if (res.data === '') {
			calendar.deleteEvent(eventObj.id, eventObj.calendarId);
			showAlert("success", "Équipe supprimée avec succès");
		}

	} catch (err) {
		showAlert("error", err.response.data.message);
	}
});




export const animation = () => {
	let anim = document.querySelector('.mainSection');
	let nbMatch = anim.children.length;
	let oui = -500 * nbMatch + document.querySelector('.bandeauDefilant').offsetWidth;
	let iterations = 0
	if (nbMatch > 1) {
		iterations = Infinity
	}
	anim.animate(
		[
			// keyframes
			{ transform: "translateX(0%)" },
			{ transform: "translateX(" + oui + "px)" },
		],
		{
			// timing options
			duration: 4000 * nbMatch,
			iterations,
		}
	);
}

export const init = async () => {

	// let data = await matchInformation().then(result => result.data);
	let data = await matchInformation().then(result => result);

	// Search a match based on the url parameter
	const urlParams = new URLSearchParams(window.location.search);

	let name = urlParams.get('team');
	let inputSearchBar = document.querySelector("#searchInformation").value;

	if (name !== null) {
		name = name.replace(/['"]/g, ""); // remove all occurrences of ' and "
		calendar.clear();
		searchMatchByTeam(data, name);
		// remove the url parameter without reloading the page
		window.history.replaceState({}, document.title, "/" + "matchs");
		displayCalendar();
	} else if (inputSearchBar !== "") {
		// Search a match based on the input value
		calendar.clear();
		searchMatchByTeam(data, inputSearchBar);
		displayCalendar();
	} else {
		calendar.clear();
		searchMatchByTeam(data, "");
		displayCalendar();
	}


	// Search a match based on the select value
	document.querySelector("#searchMatchBySelect").addEventListener("change", (e) => {
		let select = document.getElementById("searchMatchBySelect").value;
		if (select != "0") {
			calendar.clear();
			searchMatchByTeam(data, select);
			displayCalendar();
		}
	});

	animation();



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


// add the calendar display dates range to the .navbar--range using the calendar.getDate() method and translate the dates to a readable format in french
function displayCalendarRange() {
	let dateRange = calendar.getDate().d.d.addDays(-1).toLocaleDateString('fr-FR') + ' - ' + calendar.getDate().d.d.addDays(5).toLocaleDateString('fr-FR');
	document.querySelector('.navbar--range').innerHTML = dateRange;
}

export const changeWeek = (type) => {
	if (type == 'next') {
		calendar.move(1);
		displayCalendarRange();
	}
	if (type == 'prev') {
		calendar.move(-1);
		displayCalendarRange();
	}
	if (type == 'today') {
		calendar.today();
		displayCalendarRange();
	}
}


export const changeCalendarView = (type) => {
	calendar.changeView(type);
}

