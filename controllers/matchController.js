const Match = require("../models/matchModel")
const APIFeatures = require("../utils/apiFeatures")
const catchAsync = require("../utils/catchAsync")
const AppError = require("../utils/appError")
const ics = require('ics')
const { writeFileSync, unlinkSync } = require('fs')


//getAll
exports.getAllMatch = catchAsync(async (req, res) => {
	//Execute query
	const features = new APIFeatures(Match.find(), req.query)
		.filter()
		.sort()
		.limitFields()
		.paginate()
		.sortDate();

	const matchs = await features.query;

	//send reponse
	res.status(200).json({
		status: 'success',
		results: matchs.length,
		data: {
			matchs
		}
	})
})

exports.getICS = catchAsync(async (req, res) => {
	//Execute query
	const features = new APIFeatures(Match.find(), req.query)
		.filter()
		.sort()
		.limitFields()
		.paginate()
		.sortDate();

	const matchs = await features.query;

	const formatedMatch = []

	matchs.forEach(match => {
		let tempMatch = {}
		tempMatch.attendees = [{ name: match.againstTeam }];
		tempMatch.organizer = { name: match.localTeam };
		tempMatch.location = match.gymnasium;
		tempMatch.start = [match.date.getFullYear(), match.date.getMonth() + 1, match.date.getDate(), match.date.getHours(), match.date.getMinutes()]
		tempMatch.uid = `${match._id}`.replace('"', '')
		tempMatch.duration = { minutes: 90 }

		formatedMatch.push(tempMatch)
	})

	const { error, value } = ics.createEvents(formatedMatch);
	if (error) {
		console.log(error)
	}

	// let icsFileName = `event-${Date.now()}.ics`


	res.send(value);

	// writeFileSync(`${__dirname}/${icsFileName}`, value)

	// send to the user the created file for him to download it
	// res.download(`${__dirname}/${icsFileName}`, (err) => {
	// 	if (err) {
	// 		console.log(err)
	// 	}
	// })


	// wait for the download to finish and then delete the file
	setTimeout(() => {
		unlinkSync(`${__dirname}/${icsFileName}`)
	}, 100000)


	


})


//createNewMatch
exports.createMatch = catchAsync(async (req, res) => {
	const newMatch = await Match.create(req.body);

	res.status(201).json({
		status: 'success',
		data: {
			match: newMatch
		}
	})
})

//getOneMatch
exports.getOneMatch = catchAsync(async (req, res, next) => {
	const match = await Match.findById(req.params.id);

	if (!match) {
		return next(new AppError('Aucun match avec cet ID', 404));
	}

	//send reponse
	res.status(200).json({
		status: 'success',
		data: {
			match
		}
	})
})

//updateMatch*
exports.updateMatch = catchAsync(async (req, res, next) => {
	const match = await Match.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
		runValidators: true
	})
	if (!match) {
		return next(new AppError('Aucun match avec cet ID', 404));
	}

	//send reponse
	res.status(200).json({
		status: 'success',
		data: {
			match
		}
	})
})

//deleteMatch
exports.deleteMatch = catchAsync(async (req, res, next) => {
	const match = await Match.findByIdAndDelete(req.params.id);

	if (!match) {
		return next(new AppError('Aucun match avec cet ID', 404));
	}

	res.status(204).json({
		status: 'success',
		data: null
	})
})