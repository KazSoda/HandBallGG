const catchAsync = require('../utils/catchAsync');
const Equipe = require('../models/equipeModel');
const Match = require('../models/matchModel');
const User = require('../models/userModel');

exports.getHomePage = (req, res) => {
    res.status(200).render('homepage', {
        title: 'Accueil'
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
    const equipes = await Equipe.find();

    res.status(200).render('matchs', {
        title: 'Matchs',
        equipes,
    })
})

exports.getMatchsCalendarPage = catchAsync(async (req, res) => {
    const equipes = await Equipe.find();

    res.status(200).render('matchsCalendar', {
        title: 'Matchs',
        equipes,
    })
})

/* ----------------------------------------------
                ConsultationUtilisateur
---------------------------------------------- */

exports.getUsersPage = catchAsync(async (req, res) => {
    const users = await User.find();

    res.status(200).render('users', {
        title: 'Utilisateurs',
        users
    })
})

/* ----------------------------------------------
                CréationUtilisateur
---------------------------------------------- */

exports.getCreationUser = (req, res) => {
    res.status(200).render('creationUser', {
        title: 'Creation Utilisateur'
    })
}





/* ----------------------------------------------
                    Admin pages
---------------------------------------------- */
exports.getConnexionPage = (req, res) => {
    res.status(200).render('connexion', {
        title: 'Connexion'
    })
}