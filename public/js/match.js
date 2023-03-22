import axios from "axios";
import { showAlert } from "./alert";
import Calendar from '@toast-ui/calendar';
import '@toast-ui/calendar/dist/toastui-calendar.min.css';
import 'tui-date-picker/dist/tui-date-picker.css';
import 'tui-time-picker/dist/tui-time-picker.css';


/**
 * Small functions to add some new properties to the Date object
 * These functions are used to add days and minutes to a date
 */
Date.prototype.addDays = function (days) {
	var date = new Date(this.valueOf());
	date.setDate(date.getDate() + days);
	return date;
}

Date.prototype.addMinutes = function (m) {
	this.setTime(this.getTime() + (m * 60 * 1000));
	return this;
}



/**
 * Create a new calendar instance based on the following library:
 * https://github.com/nhn/tui.calendar
 */
const calendar = new Calendar('#calendar', {
	defaultView: 'week',
	useCreationPopup: false,
	useFormPopup: true, // Can be always set to true because the routes to create and update or delete a match are protected
	isReadOnly: false, // Same here
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
		narrowWeekend: false, // Else the weekends are smaller
		taskView: false,
		eventView: ['time'],
		hourStart: 6,
		hourEnd: 23,
	},
	month: {
		startDayOfWeek: 1,
		dayNames: ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'],
		narrowWeekend: true,
		taskView: false,
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


// Get all the matches for the next 3 weeks and the 2 months after
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

// Filter matches from a specific team
function searchMatchByTeam(queryResult, enteredValue) {
	let mainSection = document.querySelector(".mainSection");
	let resSort = [];
	queryResult.forEach(matchInfo => {
		// Set all matches names to UPPERCASE to better check if the entered value is in the match name
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

		// empty the calendar
		mainSection.innerHTML = ''
		resSort.forEach(sortedMatch => {
			// Create a new match event based on the current envent to match the required format for the calendar
			let calendarMatchTemp = {}
			calendarMatchTemp.id = sortedMatch._id;
			calendarMatchTemp.title = sortedMatch.localTeam + " VS " + sortedMatch.againstTeam;
			calendarMatchTemp.start = sortedMatch.date;
			if (sortedMatch.dateEnd) {
				calendarMatchTemp.end = sortedMatch.dateEnd;
			} else {
				calendarMatchTemp.end = new Date(sortedMatch.date).addMinutes(90);
			}
			calendarMatchTemp.isAllDay = false;
			calendarMatchTemp.category = 'time';
			calendarMatchTemp.dueDateClass = '';
			calendarMatchTemp.location = sortedMatch.gymnasium;
			calendarMatchTemp.attendees = [sortedMatch.localTeam, sortedMatch.againstTeam];

			// Random green dark color for the calendar events
			let saturation = Math.floor(Math.random() * 100);
			let lightness = Math.floor(Math.random() * 20) + 10;
			calendarMatchTemp.backgroundColor = `hsl(120, ${saturation}%, ${lightness}%)`;
			calendarMatchTemp.color = '#ffffff';

			calendarMatch.push(calendarMatchTemp);

			// insert the new match into the carousel
			let date = new Date(sortedMatch.date).toLocaleString()

			// check if the image of the team exists
			let imgTest = new Image();
			imgTest.src = `img/rivals/${sortedMatch.againstTeam}.png`;
			imgTest.onerror = function () {
				imgTest.src = 'img/rivals/againstTeam.png';
				console.log(imgTest.src);
			};


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
      							<img src="${imgTest.src}" alt="photoEnemyTeam">
      							<h1>${sortedMatch.againstTeam}</h1>
      						</article>
      					</section>
      				</section>
    			</section>
    		`;
		});

		calendar.createEvents(calendarMatch);
		// launch the caroussel animation
		animation();
	}
}


// creating an event
calendar.on('beforeCreateEvent', async (eventObj) => {
	console.log(eventObj);

	let newEvent = {};
	if (eventObj.title.includes(" VS ")) {
		let title = eventObj.title.split(" VS ");
		newEvent.date = eventObj.start.d.d;
		newEvent.dateEnd = eventObj.end.d.d;
		newEvent.localTeam = title[0];
		newEvent.againstTeam = title[1];
		newEvent.gymnasium = eventObj.location;

		try {
			const res = await axios({
				method: "post",
				url: `/api/v1/match`,
				data: newEvent
			});


			if (res.data.status === "success") {
				newEvent.id = res.data.data.match._id;
				newEvent.start = eventObj.start;
				newEvent.end = eventObj.end;
				newEvent.title = eventObj.title;
				newEvent.location = eventObj.location;
				newEvent.attendee = [newEvent.localTeam, newEvent.againstTeam]

				showAlert("success", "Match ajouté avec succès");
				calendar.createEvents([newEvent]);
			}
		} catch (err) {
			showAlert("error", err.response.data.message);
		}
	} else {
		showAlert("error", "Le titre doit contenir ' VS ' pour séparer les deux équipes");
	}

});


// Update an event
calendar.on({
	'beforeUpdateEvent': function (e) {
		let updatedFields = {};
		if (e.changes.start) {
			updatedFields.date = e.changes.start.d.d;
		}
		if (e.changes.end) {
			updatedFields.dateEnd = e.changes.end.d.d;
		}
		if (e.changes.title) {
			let title = e.changes.title.split(" VS ");
			updatedFields.localTeam = title[0];
			updatedFields.againstTeam = title[1];
		}
		if (e.changes.location) {
			updatedFields.gymnasium = e.changes.location;
		}
		if (e.changes.attendees) {
			updatedFields.localTeam = e.changes.attendees[0];
			updatedFields.againstTeam = e.changes.attendees[1];
		}
		console.log('beforeUpdateSchedule', e);

		try {
			const res = axios({
				method: 'patch',
				url: `/api/v1/match/${e.event.id}`,
				data: updatedFields
			})

			if (res.data === '') {
				calendar.updateEvent(e.event.id, undefined, e.changes);
				showAlert("success", "Équipe modifiée avec succès");
			}
		} catch (err) {
			showAlert("error", err.response.data.message);
		}

	},
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

//BannerHoverAdd stop animation of the banner
export const BannerHoverAdd = (element) => {
	element.style.animationPlayState = "paused";
}

//BannerHoverRemove restart animation of the banner
export const BannerHoverRemove = (element) => {
	element.style.animationPlayState = "running";
}


// Caroussel animation to display all the matches
export const animation = () => {
	let mainSection = document.querySelector('.mainSection');
	let nbMatch = mainSection.children.length;
	let tempsTravel = 7 * nbMatch;
	let Distfin = -500 * nbMatch + document.querySelector('.bandeauDefilant').offsetWidth;
	let iterations = 0
	if (nbMatch > 1) {
		iterations = 'infinite'
	}
	mainSection.style.animationDuration = tempsTravel;
	// changing variables
	document.documentElement.style.setProperty('--animation-end',Distfin);
	document.documentElement.style.setProperty('--animation-iteration',iterations);
	document.documentElement.style.setProperty('--animation-temps',tempsTravel+'s');
}


// Init fuction that will be used to search some events
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




// render calendar
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


// switch between the weeks/days/months
export const changeWeek = (type) => {
	if (type == 'next') {
		calendar.move(1);
	}
	if (type == 'prev') {
		calendar.move(-1);
	}
	if (type == 'today') {
		calendar.today();
	}
}


// Change the calendar view
export const changeCalendarView = (type) => {
	calendar.changeView(type);
}

