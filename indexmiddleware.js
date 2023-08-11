const express = require('express');
const app = express();
const isAuthenticated = require('./authmiddleware');

// Public route
app.get('/', (req, res) => {
    res.send('Welcome to the public page!');
});

// Protected route
app.get('/profile', isAuthenticated, (req, res) => {
    res.send('Welcome to your profile!');
});

app.listen(8000, () => {
    console.log('Server is running on port 8000');
});