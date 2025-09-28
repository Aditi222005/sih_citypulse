// File: index.js (Corrected)

// Load environment variables FIRST
const dotenv = require('dotenv');
dotenv.config();

// Now, require other modules
const express = require('express');
const cors = require('cors');
const connectDB = require('./db/connectDB');
const authRoutes = require('./routes/auth');
const issueRoutes = require('./routes/issues');

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/issues', issueRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));