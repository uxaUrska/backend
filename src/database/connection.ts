import mongoose from 'mongoose';

export function connectMongoDb(database = 'vodenjestroskov') {
	// Obtaining environmental variables
	const DB_PROD = process.env.DB_PROD;
	const DB_USER = process.env.DB_USER;
	const DB_PASSWORD = process.env.DB_PASSWORD;
	const DB_ADDR = process.env.DB_ADDR;
	let DB_PORT = '27017';

	let mongoDbUrl = `mongodb://localhost:${DB_PORT}/${database}`;

	if (process.env.DB_PROD == 'true') {
		if (process.env.DB_DATABASE) {
			database = process.env.DB_DATABASE;
		}
		
        mongoDbUrl = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_ADDR}/${database}`;
		
	}
    mongoDbUrl = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_ADDR}/${database}`;
    console.log(mongoDbUrl);
	mongoose
		.connect(mongoDbUrl)
		.then(() => {
			console.log('Successfully connected.');
		})
		.catch(err => {
			console.log('Error connecting to database:', err);
		});

	mongoose.Promise = global.Promise;
}

export const getDb = () => {
	return mongoose.connection;
};