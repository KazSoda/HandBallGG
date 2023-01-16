const Equipe = require('../models/equipeModel')
const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/appError')
const APIFeatures = require('../utils/apiFeatures')

exports.getAllEquipes = catchAsync(async(req,res) => {
    const feature = new APIFeatures(Equipe.find(),req.query)
        .filter()
        .limitFields()
        .sort()
        .paginate();
    const equipes = await feature.query;

    res.status(200).json({
        status: 'success',
        results: equipes.length,
        data: {
            equipes
        }
    })   
})

exports.createEquipe = catchAsync(async(req,res) => {
    const newEquipe = await Equipe.create(req.body);

    res.status(201).json({
        status: 'success',
        data: {
            newEquipe
        }
    }) 
})