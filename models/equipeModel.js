
const mongoose = require('mongoose');
const validator = require('validator');

const equipeSchema = new mongoose.Schema({

	
	phone: {
		type: String,
		required: [true, 'Un equipe doit avoir un numéro de téléphone.'],
		trim: true,
		unique: true,
		maxLength: 10,
		minLength: 10,
		validate: [validator.isNumeric, 'Veuillez entrer un numéro de téléphone valide.'],
	}
	
})




const Equipe = mongoose.model('Equipe', equipeSchema);
module.exports = Equipe;