
const mongoose = require('mongoose');
const validator = require('validator');

const equipeSchema = new mongoose.Schema({

	wording: {
		type:String,
		required: [true,'Une équipe doit avoir un libelle'],
		trim: true,
		unique: true,
		maxLength: 64,
	},

	trainer: {
		type:String,
		required:[true,'Une équipe doit avoir un entraineur'],
		trim: true,
		maxLength:128,
	},

	slot: {
		type:String,
		required: [true, 'Une équipe doit avoir un creneaux'],
		trim: true,
		maxLength:128,
	},

	urlPhoto: {
		type:String,
		required: [true, 'Une équipe doit avoir une photo'],
		trim:true,
		maxLength:512,
	},

	urlCalendar: {
		type:String,
		required: [true, 'Une équipe doit avoir un calendrier'],
		trim:true,
		maxLength:512,
	},

	comment: {
		type:String,
		trim: true,
	}
	
})




const Equipe = mongoose.model('Equipe', equipeSchema);
module.exports = Equipe;