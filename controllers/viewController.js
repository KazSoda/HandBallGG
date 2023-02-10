const catchAsync = require('../utils/catchAsync');
const Equipe = require('../models/equipeModel');
const Match = require('../models/matchModel');

exports.getHomePage = (req, res) => {
    res.status(200).render('homepage', {
        title: 'Accueil'
    })
}




/* ----------------------------------------------
                      News
---------------------------------------------- */


exports.getNewsPage = (req, res) => {
    res.status(200).render('news', {
        title: 'Actualités'
    })
}



/* ----------------------------------------------
                    The club
---------------------------------------------- */


exports.getPresentationPage = (req, res) => {
    res.status(200).render('aboutUs', {
        title: 'Présentation'
    })
}

exports.getHistoryPage = (req, res) => {
    res.status(200).render('history', {
        title: 'Historique'
    })
}

exports.getPartners = (req, res) => {
    res.status(200).render('partners', {
        title: 'Partenaires'
    })
}



/* ----------------------------------------------
                    Teams
---------------------------------------------- */


exports.getEquipesPage = catchAsync(async (req, res, next) => {
    const equipes = await Equipe.find();

    res.status(200).render('equipes', {
        title: 'Equipes',
        equipes
    })
})


/* ----------------------------------------------
                    Matches
---------------------------------------------- */

exports.getMatchsPage = catchAsync(async (req, res) => {
    const matchs = await Match.find();

    res.status(200).render('matchs', {
        title: 'Matchs',
        matchs
    })
})



/* ----------------------------------------------
                      Shop
---------------------------------------------- */

exports.getShopPage = (req, res) => {
    res.status(200).render('shop', {
        title: 'Boutique'
    }) 
}




/* ----------------------------------------------
                 Useful Links
---------------------------------------------- */

exports.getJoinUsPage = (req, res) => {
    res.status(200).render('joinUs', {
        title: 'Inscriptions'
    })
}

exports.getTrainingPage = (req, res) => {
    res.status(200).render('training', {
        title: 'Entrainements'
    })
}

exports.getPlanningBenevolesPage = (req, res) => {
    res.status(200).render('timetable', {
        title: 'Planning bénévoles'
    })
}

exports.getContactPage = (req, res) => {
    res.status(200).render('contact', {
        title: 'Contact'
    })
}

