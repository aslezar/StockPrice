const express = require('express');
const connectDB = require('./db/connect');
const cors = require('cors');
require('dotenv').config();
const path = require('path');

// Routes
const userRoutes = require('./routes/userRoutes');

// Express App
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/users', userRoutes);

// Serve static files
app.use(express.static(path.join(__dirname, 'dist')));

// Function Start
const PORT = process.env.PORT || 5000;

async function start() {
	try {
		await connectDB(process.env.MONGO_URL);
		console.log('Connected to the database successfully');
		app.listen(PORT, () => {
			console.log(`Server is listening on http://localhost:${PORT}`);
		});
	} catch (error) {
		console.log(`Error: ${error}`);
	}
}

start();
