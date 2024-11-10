import {createServer} from 'http';
import express from 'express';
import {connectMongoDb} from './database/connection';

import * as dotenv from 'dotenv';
dotenv.config();

const app = express()
app.use(express.json());
app.use(express.urlencoded({extended: false}));

const port = 3000


connectMongoDb();

export const startServer = () => {
	// Setup HTTP server
	const httpServer = createServer(app);
	console.log('Listening...');
	httpServer.listen(3000);
	return httpServer;
};

export default app;

if (process.env.NODE_ENV !== 'test') {
	startServer();
}