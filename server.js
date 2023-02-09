const mongoose = require('mongoose');
const dotenv = require('dotenv');


process.on('uncaughtException', err => {
	console.log(err);
	console.log(err.name, err.message);
	console.log('UNCAUGHT EXCEPTION! Shutting down1...');
	process.exit(1);
})


dotenv.config({ path: './config.env' });
const app = require('./app');




const db = process.env.DATABASE_mongodb

mongoose.set('strictQuery', true);

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


