const Match = require("../models/matchModel")
const APIFeatures = require("../utils/apiFeatures")
const catchAsync = require("../utils/catchAsync")
const AppError = require("../utils/appError")

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

    if (!match){
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
    if (!match){
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

    if(!match){
        return next(new AppError('Aucun match avec cet ID', 404));
    }

    res.status(204).json({
		status: 'success',
		data: null
	})
})