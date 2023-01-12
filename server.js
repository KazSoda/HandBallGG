const mongoose = require('mongoose');
const dotenv = require('dotenv');


process.on('uncaughtException', err => {
	console.log(err.name, err.message);
	console.log('UNCAUGHT EXCEPTION! Shutting down...');
	process.exit(1);
})


dotenv.config({ path: './config.env' });
const app = require('./app.js');




const db = process.env.DATABASE_mongodb



mongoose.connect(db, {
	useNewUrlParser: true,
	useCreateIndex: true,
	useFindAndModify: false,
	useUnifiedTopology: true
}).then(() => console.log("Connected to database"));


const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});


process.on('unhandledRejection', err => {
	console.log(err.name, err.message);
	console.log('UNHANDLED REJECTION! Shutting down...');
	server.close(() => {
		process.exit(1);
	})
})


