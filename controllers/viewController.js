const catchAsync = require('../utils/catchAsync');
const Equipe = require('../models/equipeModel');

exports.getHomePage = (req, res) => {
    res.status(200).render('homepage', {
        title: 'Accueil'
    })
}


exports.getEquipesPage = catchAsync(async (req, res, next) => {
    const equipes = await Equipe.find();

    res.status(200).render('equipes', {
        title: 'Equipes',
        equipes
    })
})



exports.getPartners = (req, res) => {
    res.status(200).render('partners', {
        title: 'Partenaires'
    })
}