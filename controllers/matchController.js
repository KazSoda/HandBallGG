const Match = require("../models/matchModel")
const APIFeatures = require("../utils/apiFeatures")
const catchAsync = require("../utils/catchAsync")
const AppError = require("../utils/appError")

//getAll
exports.getAllMatch = catchAsync(async (req,res)=>{
    //Execute query
    const features = new APIFeatures(Match.find(), req.query)
        .filter()
        .sort()
        .limitFields()
        .paginate()
     
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
exports.createMatch = catchAsync(async (req,res)=>{
    const newMatch = await Match.create(req.body);

    res.status(201).json({
        status: 'success',
        data: {
            match: newMatch
        }
    })
})