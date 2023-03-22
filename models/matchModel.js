const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema({

    localTeam: {
        type: String,
        trim: true,
        required: [true, 'Vous devez spécifiez une équipe local'],
        length: 64,
    },

    isAtHome: {
        type: Boolean,
        trim: true,
        // required: [true, "Vous devez spécifiez si l'équipe joue à domicile"],
    },

    againstTeam: {
        type: String,
        trim: true,
        required: [true, 'Vous devez spécifiez une équipe adverse'],
        length: 64,
    },

    host: {
        type: String,
        trim: true,
        // required: [true, 'Vous devez spécifiez un hote'],
        lenght: 64,
        default: null,
    },

    date: {
        type: Date,
        trim: true,
        default: null,
    },

    dateEnd: {
        type: Date,
        trim: true,
        default: null,
    },

    weekNumber: {
        type: Number,
        trim: true,
        // required: [true, 'Vous devez spécifiez un numéro de semaine'],
        length: 11,
    },

    dayNumber: {
        type: Number,
        trim: true,
        // required: [true, 'Vous devez spécifiez un numéro de jour'],
        length: 11,
    },

    gymnasium: {
        type: String,
        trim: true,
        length: 64,
        default: null,
    },
})

const Match = mongoose.model('Match', matchSchema);
module.exports = Match;
