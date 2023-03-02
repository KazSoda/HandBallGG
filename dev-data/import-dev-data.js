const dotenv = require('dotenv');
const mongoose = require('mongoose');
const fs = require('fs');
const Equipe = require('./../models/equipeModel');
const Match = require('./../models/matchModel');



dotenv.config({ path: './config.env' });

const db = process.env.DATABASE_mongodb

mongoose.connect(db, {
	useNewUrlParser: true,
	useCreateIndex: true,
	useFindAndModify: false,
	useUnifiedTopology: true
}).then(() => console.log("Connected to database"));


const Equipes = JSON.parse(fs.readFileSync(`${__dirname}/equipes.json`, 'UTF-8'));
const Matchs = JSON.parse(fs.readFileSync(`${__dirname}/matchs.json`, 'UTF-8'));

const importDatabase = async () => {
	try {
		await Equipe.create(Equipes);
		console.log("Equipes created");
		await Match.create(Matchs);
		console.log("Matchs created");
	} catch (e) {
		console.error(e)
	}
	process.exit();
}



const deleteData = async () => {
	try {
		await Equipe.deleteMany();
		console.log("Equipe deleted");
		await Match.deleteMany();
		console.log("Match deleted");
	} catch (e) {
		console.error(e);
	}
	process.exit();
}


if (process.argv[2] === '--import') {
	importDatabase();
} else if (process.argv[2] === '--delete') {
	deleteData();
}