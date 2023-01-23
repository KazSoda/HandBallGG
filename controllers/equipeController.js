

const Equipe = require('../models/equipeModel')
const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/appError')
const APIFeatures = require('../utils/apiFeatures')

exports.getAllEquipes = catchAsync(async (req, res) => {
    const feature = new APIFeatures(Equipe.find(), req.query)
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

exports.createEquipe = catchAsync(async (req, res) => {
    const newEquipe = await Equipe.create(req.body);

    res.status(201).json({
        status: 'success',
        data: {
            newEquipe
        }
    }) 
})

exports.delEquipe = catchAsync(async(req,res, next) => {
    const delEquipe = await Equipe.findByIdAndDelete(req.params.id)

    if (!delEquipe){
        return next(new AppError('Aucune équipe trouvé à cette id',404))
    }

    res.status(204).json({
        status:'success',
        data:null
    })
})

exports.UpdateEquipe = catchAsync(async(req,res,next) => {
    const updateEquipe = await Equipe.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true
    })

    if (!updateEquipe){
        return next(new AppError('Aucune équipe trouvé à cette id',404))
    }

    res.status(200).json({
        status:'success',
        data:{
            updateEquipe
        }
    })


})

exports.getOneEquipe = catchAsync(async (req, res, next) => {
    const equipe = await Equipe.findById(req.params.id);

    if (!equipe){
        return next(new AppError('Aucun match avec cet ID', 404));
    }

    //send reponse
    res.status(200).json({
        status: 'success',
        data: {
            equipe
        }
    })
})