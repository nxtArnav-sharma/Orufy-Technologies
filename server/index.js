const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection (Optional for demo)
if (process.env.MONGODB_URI && process.env.MONGODB_URI !== 'mongodb://localhost:27017/orufy_assignment') {
  mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log('MongoDB Connection Error (Using In-Memory Fallback):', err.message));
} else {
  console.log('Skipping MongoDB connection (Using In-Memory Fallback)');
}

// Routes
app.use('/api/products', require('./routes/productRoutes'));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
