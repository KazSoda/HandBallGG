const mongoose = require('mongoose');
const validator = require('validator');

const matchSchema = new mongoose.Schema({

    localTeam: {
        type: String,
        trim: true,
        required: [true,'Vous devez spécifiez une équipe local'],
        maxLength: 64,
        minLength: 64,
    },

    isAtHome: {
        type: Boolean,
        trim: true,
        required: [true,"Vous devez spécifiez si l'équipe joue à domicile"],
    },

    againstTeam: {
        type: String,
        trim: true,
        required: [true,'Vous devez spécifiez une équipe adverse'],
        maxLength: 64,
        minLength: 64,
    },

    host: {
        type: String,
        trim: true,
        required: [true,'Vous devez spécifiez un hote'],
        maxLength: 64,
        minLength: 64,
        default: null,
    },

    date: {
        type: Date,
        trim: true,
        default: null,
    },

    weekNumber: {
        type: Number,
        trim: true,
        required: [true,'Vous devez spécifiez un numéro de semaine'],
        maxLength: 11,
        minLength: 11,
    },

    dayNumber: {
        type: Number,
        trim: true,
        required: [true,'Vous devez spécifiez un numéro de jour'],
        maxLength: 11,
        minLength: 11,
    },

    gymnasium: {
        type: String,
        trim: true,
        maxLength: 64,
        minLength: 64,
        default: null,
    },
})

const Match = mongoose.model('Match', matchSchema);
module.exports = Match;
