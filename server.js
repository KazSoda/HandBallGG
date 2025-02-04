const mongoose = require('mongoose');
const fs = require('fs');
const Equipe = require('./models/equipeModel');
const Match = require('./models/matchModel');
const dotenv = require('dotenv');
const catchAsync = require('./utils/catchAsync');


process.on('uncaughtException', err => {
	console.log(err);
	console.log(err.name, err.message);
	console.log('UNCAUGHT EXCEPTION! Shutting down1...');
	process.exit(1);
})


dotenv.config({ path: './config.env' });
const app = require('./app');




const db = process.env.DATABASE_mongodb

mongoose.set('strictQuery', false);

mongoose.connect(db, {
	useNewUrlParser: true,
	useUnifiedTopology: true
}).then(() => console.log("Connected to database"));


const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
	console.log(`Server is running on port http://localhost:${port}/`);
});


process.on('unhandledRejection', err => {
	console.log(err.name, err.message);
	console.log('UNHANDLED REJECTION! Shutting down...');
	server.close(() => {
		process.exit(1);
	})
})


/*-----------------------------------------------------------------------------------*/
/* -------------------- Importing data if the database is empty -------------------- */
/*-----------------------------------------------------------------------------------*/

const Equipes = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/equipes.json`, 'UTF-8'));
const importEquipes = catchAsync(async (req, res, next) => {

	const equipes = await Equipe.find();


	if (equipes.length <= 0) {
		const importDatabase = async () => {
			try {
				await Equipe.create(Equipes);
				console.log("Equipes created");
			} catch (e) {
				console.error(e)
			}
		}
		importDatabase();
	}
})
importEquipes()



const Matchs = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/matchs.json`, 'UTF-8'));
const importMatch = catchAsync(async (req, res, next) => {

	const matchs = await Match.find();


	if (matchs.length <= 0) {
		const importDatabase = async () => {
			try {
				await Match.create(Matchs);
				console.log("Matchs created");
			} catch (e) {
				console.error(e)
			}
		}
		importDatabase();
	}
})
importMatch()