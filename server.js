// Import the required modules
const express = require('express');
const mongoose = require('mongoose');

// Set up the database connection
mongoose.connect('mongodb://localhost/mydatabase', { useNewUrlParser: true });

// Define the user schema
const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String
});

// Create a model for the user data
const User = mongoose.model('User', userSchema);

// Define the login function
function login(req, res) {
    // Get the username and password from the form input
    const username = req.body.username;
    const password = req.body.password;

    // Check if the username and password are valid
    User.findOne({ username: username }, function(err, user) {
        if (err) {
            console.error(err);
            return res.status(401).send('Invalid username or password');
        }

        // Check if the provided password is valid
        if (!user || !user.password || user.password !== password) {
            console.error('Invalid username or password');
            return res.status(401).send('Invalid username or password');
        }

        // Create a token for the user
        const token = user.username + 'token';
        const expires = Date.now() + 60 * 60 * 24 * 7; // Expire in 1 week
        res.send(`Welcome, ${user.username}! Your token is ${token}. (Expires in ${expires})`);
    });
}

// Define the sign up function
function signUp(req, res) {
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;

    // Check if the username and email are already taken
    User.findOne({ username: username, email: email }, function(err, user) {
        if (err) {
            console.error(err);
            return res.status(409).send('Username or email already taken');
        }

        // Create a new user if the username and email are not taken
        if (!user) {
            const newUser = new User({
                username: username,
                password: password,
                email: email
            });
            newUser.save((err, user) => {
                if (err) {
                    console.error(err);
                    return res.status(409).send('Error creating new user');
                }
                res.send(`Welcome, ${username}! Your token is ${user.token}. (Expires in ${expires})`);
            });
        } else {
            console.error('Username or email already taken');
            return res.status(409).send('Username or email already taken');
        }
    });
}